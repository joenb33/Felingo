import { Link } from "react-router-dom";
import { useSpeech } from "@/hooks/useSpeech";
import { motion } from "framer-motion";
import { ui } from "@/i18n/ui";
import panicQuickPhrases from "@/data/panic-quick-phrases.json";
import { textForTtsPlayback } from "@/lib/ttsHash";
import {
  SPEAK_ICON_ACTIVE_CLASS,
  SPEAK_ICON_IDLE_CLASS,
} from "@/components/ui/speakButtonStyles";

const PANIC_PHRASES = panicQuickPhrases as { en: string; sv: string }[];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function PanicPage() {
  const { speak, stop, isSpeaking, speakingText, isSupported } = useSpeech();

  return (
    <main
      className="relative flex min-h-0 flex-1 flex-col"
      style={{ background: "#0C0B10" }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% -5%, rgba(255,55,95,0.2), transparent 50%)",
        }}
      />

      <div className="relative flex min-h-0 flex-1 flex-col pt-safe">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-[rgba(255,255,255,0.07)] glass px-[max(1.25rem,env(safe-area-inset-left))] py-3.5">
          <div className="mx-auto flex max-w-2xl items-center gap-4">
            <Link
              to="/"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)] text-[rgba(235,235,245,0.7)] transition-all hover:bg-[rgba(255,255,255,0.13)] hover:text-white active:scale-[0.95]"
              aria-label={ui.panic.backAria}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <div className="flex-1 min-w-0 text-center">
              <h1 className="text-[16px] font-bold text-white tracking-[-0.3px]">
                ⚡ {ui.panic.title}
              </h1>
              <p className="mt-0.5 text-[12px] text-[rgba(235,235,245,0.4)]">
                {ui.panic.subtitle}
              </p>
            </div>
            <div className="h-9 w-9 shrink-0" aria-hidden />
          </div>
        </header>

        {/* Grid of phrase buttons */}
        <div className="mx-auto w-full max-w-2xl flex-1 overflow-y-auto px-[max(1.25rem,env(safe-area-inset-left))] pb-[max(2rem,env(safe-area-inset-bottom))] pt-5 pr-[max(1.25rem,env(safe-area-inset-right))]">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid gap-3 sm:grid-cols-2"
          >
            {PANIC_PHRASES.map((phrase) => {
              const norm = textForTtsPlayback(phrase.en);
              const isThisPhrase =
                isSpeaking && speakingText !== null && speakingText === norm;

              return (
                <motion.button
                  key={phrase.en}
                  variants={item}
                  type="button"
                  onClick={() => {
                    if (!isSupported) return;
                    if (isThisPhrase) stop();
                    else speak(phrase.en);
                  }}
                  className="group w-full cursor-pointer rounded-[16px] text-left transition-all duration-200 active:scale-[0.97]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.05) 100%)",
                    border: "1px solid rgba(255,255,255,0.11)",
                    boxShadow:
                      "0 2px 16px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
                    padding: "18px 20px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "linear-gradient(135deg, rgba(255,55,95,0.18) 0%, rgba(255,55,95,0.08) 100%)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(255,55,95,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.05) 100%)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(255,255,255,0.11)";
                  }}
                  aria-label={isThisPhrase ? ui.aria.stop : ui.aria.listen}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-200
                        ${isThisPhrase ? SPEAK_ICON_ACTIVE_CLASS : SPEAK_ICON_IDLE_CLASS}
                      `}
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
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-pretty break-words text-[16px] font-semibold leading-snug text-white tracking-[-0.2px]">
                        {phrase.en}
                      </p>
                      <p className="mt-2 text-[13px] text-[rgba(235,235,245,0.42)]">
                        {phrase.sv}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
