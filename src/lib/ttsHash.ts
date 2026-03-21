import { sha256 } from "js-sha256";

/**
 * `normalizeTextForTts` and `textForTtsPlayback` must match
 * `scripts/generate-elevenlabs-audio.mjs` so hashed filenames line up with MP3s.
 */
export function normalizeTextForTts(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

/**
 * Text used for hashing and for ElevenLabs / playback. Strips underscore
 * placeholders (fill-in blanks) so TTS does not read "underscore" sounds.
 */
export function textForTtsPlayback(raw: string): string {
  const withoutBlanks = raw.replace(/_+/g, " ");
  let s = normalizeTextForTts(withoutBlanks);
  s = s.replace(/\s+([.,!?;:])/g, "$1");
  return normalizeTextForTts(s);
}

/**
 * Synchronous SHA-256 (first 32 hex chars). Use this when computing the audio URL
 * inside a user gesture — iOS Safari blocks `HTMLAudioElement.play()` if an
 * `await` ran first (e.g. async Web Crypto), even when the tap handler started the chain.
 */
export function sha256HexShortSync(text: string): string {
  const normalized = normalizeTextForTts(text);
  return sha256(normalized).slice(0, 32);
}

/** Same digest as `sha256HexShortSync`; kept async for tests / callers that expect a Promise. */
export async function sha256HexShort(text: string): Promise<string> {
  return sha256HexShortSync(text);
}
