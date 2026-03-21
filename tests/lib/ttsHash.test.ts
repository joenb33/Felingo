import { describe, it, expect } from "vitest";
import {
  normalizeTextForTts,
  sha256HexShort,
  sha256HexShortSync,
  textForTtsPlayback,
} from "@/lib/ttsHash";

describe("ttsHash", () => {
  it("normalizes whitespace", () => {
    expect(normalizeTextForTts("  hello   world  ")).toBe("hello world");
  });

  it("strips underscore blanks for TTS", () => {
    expect(textForTtsPlayback("A fan at ___ and ___.")).toBe("A fan at and.");
  });

  it("produces stable short sha256 hex", async () => {
    const a = await sha256HexShort("Hello, Eurovision.");
    const b = await sha256HexShort("Hello, Eurovision.");
    expect(a).toHaveLength(32);
    expect(a).toBe(b);
  });

  it("matches the generate-elevenlabs-audio.mjs algorithm (same normalize + sha256 slice)", async () => {
    const sample = "  Can   you repeat that?  ";
    const normalized = normalizeTextForTts(sample);
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalized));
    const expected = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 32);
    expect(await sha256HexShort(sample)).toBe(expected);
    expect(sha256HexShortSync(sample)).toBe(expected);
  });
});
