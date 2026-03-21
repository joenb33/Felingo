/**
 * One-time / maintenance: merges Swedish fields from scripts/sv/*.json
 * into src/data/{fan-talk,interview,backstage,panic}.json
 *
 *   node scripts/merge-sv.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const choiceSv = JSON.parse(
  fs.readFileSync(path.join(__dirname, "sv", "choice-feedback-sv.json"), "utf8"),
);
const dialogueSv = JSON.parse(
  fs.readFileSync(path.join(__dirname, "sv", "dialogue-lines-sv.json"), "utf8"),
);
const funSv = JSON.parse(
  fs.readFileSync(path.join(__dirname, "sv", "fun-cards-sv.json"), "utf8"),
);

const files = ["fan-talk", "interview", "backstage", "panic"];

for (const name of files) {
  const p = path.join(ROOT, "src", "data", `${name}.json`);
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const card of data) {
    if (card.type === "choice") {
      const arr = choiceSv[card.id];
      if (!arr || arr.length !== card.options.length) {
        throw new Error(
          `choice ${card.id}: need ${card.options.length} feedbackSv, got ${arr?.length}`,
        );
      }
      card.options.forEach((o, i) => {
        o.feedbackSv = arr[i];
      });
    }
    if (card.type === "dialogue") {
      const arr = dialogueSv[card.id];
      if (!arr || arr.length !== card.lines.length) {
        throw new Error(
          `dialogue ${card.id}: need ${card.lines.length} textSv, got ${arr?.length}`,
        );
      }
      card.lines.forEach((line, i) => {
        line.textSv = arr[i];
      });
    }
    if (card.type === "fun") {
      const f = funSv[card.id];
      if (!f) throw new Error(`missing funCards entry: ${card.id}`);
      card.promptSv = f.promptSv;
      card.templatesSv = f.templatesSv;
      if (card.templatesSv.length !== card.templates.length) {
        throw new Error(`fun ${card.id}: templatesSv length mismatch`);
      }
    }
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
  console.log("merged", name);
}
