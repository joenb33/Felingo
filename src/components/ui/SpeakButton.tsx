import { useSpeech } from "@/hooks/useSpeech";
import { ui } from "@/i18n/ui";
import { textForTtsPlayback } from "@/lib/ttsHash";
import {
  SPEAK_ICON_ACTIVE_CLASS,
  SPEAK_ICON_IDLE_CLASS,
} from "@/components/ui/speakButtonStyles";

interface SpeakButtonProps {
  text: string;
  className?: string;
}

export function SpeakButton({ text, className = "" }: SpeakButtonProps) {
  const { speak, stop, isSpeaking, speakingText, isSupported } = useSpeech();
  const norm = textForTtsPlayback(text);
  const isThisPhrase =
    isSpeaking && speakingText !== null && speakingText === norm;

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={() => (isThisPhrase ? stop() : speak(text))}
      className={`
        flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full
        border transition-all duration-200
        ${isThisPhrase ? SPEAK_ICON_ACTIVE_CLASS : SPEAK_ICON_IDLE_CLASS}
        ${className}
      `}
      aria-label={isThisPhrase ? ui.aria.stop : ui.aria.listen}
      title={isThisPhrase ? ui.aria.stop : ui.aria.listen}
    >
      {isThisPhrase ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <rect x="6" y="4" width="4" height="16" rx="1.5" />
          <rect x="14" y="4" width="4" height="16" rx="1.5" />
        </svg>
      ) : (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}
