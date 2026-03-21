/**
 * Generates MP3 files under public/audio/ for every English string used with TTS in the app.
 *
 * Setup:
 *   cp .env.example .env
 *   # Add ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID
 *
 * Run:
 *   npm run generate:tts              # all strings
 *   npm run generate:tts:sample       # first 3 strings only (quality check)
 *
 * Options:
 *   --force          Regenerate even if the file already exists
 *   --limit N        Only process the first N strings (alphabetically sorted set)
 *   --text "..."     Generate a single phrase (quote if it contains spaces)
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function loadDotEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadDotEnv();

function normalizeTextForTts(text) {
  return text.trim().replace(/\s+/g, " ");
}

/** Keep in sync with `src/lib/ttsHash.ts` `textForTtsPlayback`. */
function textForTtsPlayback(raw) {
  const withoutBlanks = raw.replace(/_+/g, " ");
  let s = normalizeTextForTts(withoutBlanks);
  s = s.replace(/\s+([.,!?;:])/g, "$1");
  return normalizeTextForTts(s);
}

function sha256HexShort(text) {
  return crypto
    .createHash("sha256")
    .update(normalizeTextForTts(text), "utf8")
    .digest("hex")
    .slice(0, 32);
}

function collectFromCard(card) {
  const out = [];
  if (!card || typeof card !== "object") return out;
  switch (card.type) {
    case "phrase":
      if (card.en) out.push(card.en);
      break;
    case "dialogue":
      // Favorites page speaks `scenario`; session view speaks each `line` — include both.
      if (card.scenario) out.push(card.scenario);
      for (const line of card.lines || []) {
        if (line.text) out.push(line.text);
      }
      break;
    case "choice":
      if (card.prompt) out.push(card.prompt);
      break;
    case "fun":
      // Favorites page speaks `prompt`; card body speaks each template line.
      if (card.prompt) out.push(card.prompt);
      for (const t of card.templates || []) {
        if (t) out.push(t);
      }
      break;
    default:
      break;
  }
  return out;
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function parseCli() {
  const argv = process.argv.slice(2);
  const force = argv.includes("--force");
  let limit = null;
  const limitIdx = argv.indexOf("--limit");
  if (limitIdx !== -1) {
    const n = parseInt(argv[limitIdx + 1] ?? "", 10);
    if (Number.isNaN(n) || n < 1) {
      console.error("Usage: --limit <positive number>");
      process.exit(1);
    }
    limit = n;
  }
  let textOnly = null;
  const textIdx = argv.indexOf("--text");
  if (textIdx !== -1) {
    textOnly = argv[textIdx + 1];
    if (!textOnly) {
      console.error('Usage: --text "Your phrase here"');
      process.exit(1);
    }
  }
  return { force, limit, textOnly };
}

async function main() {
  const { force, limit, textOnly } = parseCli();
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const modelId = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";

  if (!apiKey || !voiceId) {
    console.error(
      "Missing ELEVENLABS_API_KEY or ELEVENLABS_VOICE_ID in environment (.env).",
    );
    process.exit(1);
  }

  const dataFiles = [
    "fan-talk.json",
    "interview.json",
    "backstage.json",
    "panic.json",
  ];

  const strings = new Set();

  if (textOnly) {
    const n = textForTtsPlayback(textOnly);
    if (!n) {
      console.error("--text is empty after processing.");
      process.exit(1);
    }
    strings.add(n);
  } else {
    for (const name of dataFiles) {
      const arr = readJson(path.join(ROOT, "src", "data", name));
      for (const card of arr) {
        for (const s of collectFromCard(card)) {
          const n = textForTtsPlayback(s);
          if (n) strings.add(n);
        }
      }
    }

    const panicQuick = readJson(
      path.join(ROOT, "src", "data", "panic-quick-phrases.json"),
    );
    for (const row of panicQuick) {
      if (row.en) {
        const n = textForTtsPlayback(row.en);
        if (n) strings.add(n);
      }
    }
  }

  const outDir = path.join(ROOT, "public", "audio");
  fs.mkdirSync(outDir, { recursive: true });

  let sorted = [...strings].sort();
  const totalUnique = sorted.length;
  if (limit !== null) {
    sorted = sorted.slice(0, limit);
  }

  if (textOnly) {
    console.log(`Single phrase (--text): ${sorted[0]}`);
  } else {
    console.log(`Unique strings in project: ${totalUnique}`);
    if (limit !== null) {
      console.log(
        `Processing first ${sorted.length} of ${totalUnique} (--limit ${limit})`,
      );
    }
  }

  let created = 0;
  let skipped = 0;

  for (let i = 0; i < sorted.length; i++) {
    const text = sorted[i];
    const hash = sha256HexShort(text);
    const filePath = path.join(outDir, `${hash}.mp3`);

    if (!force && fs.existsSync(filePath)) {
      skipped++;
      continue;
    }

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.45,
          similarity_boost: 0.8,
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Failed for hash ${hash}: ${res.status} ${errText}`);
      process.exit(1);
    }

    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buf);
    created++;
    console.log(
      `[${i + 1}/${sorted.length}] ${hash}.mp3  ← ${text.slice(0, 72)}${text.length > 72 ? "…" : ""}`,
    );

    await new Promise((r) => setTimeout(r, 120));
  }

  console.log(`Done. Created: ${created}, skipped (existing): ${skipped}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
