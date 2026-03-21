import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSession } from "@/hooks/useSession";
import { SessionPlayer } from "@/components/session/SessionPlayer";
import { Button } from "@/components/ui/Button";
import { SECTION_META, type Section } from "@/data/schema";
import { ui } from "@/i18n/ui";

const VALID_SECTIONS: Section[] = [
  "fan-talk",
  "interview",
  "backstage",
  "panic",
];

const sectionAccentColor: Record<Section, string> = {
  "fan-talk": "#0A84FF",
  interview: "#BF5AF2",
  backstage: "#30D158",
  panic: "#FF375F",
};

export function SessionPage() {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();

  const validSection = VALID_SECTIONS.includes(section as Section)
    ? (section as Section)
    : "fan-talk";

  const {
    cards,
    currentIndex,
    currentCard,
    isComplete,
    progress,
    next,
    previous,
    restart,
  } = useSession(validSection);

  const meta = SECTION_META[validSection];
  const accent = sectionAccentColor[validSection];

  if (isComplete) {
    return (
      <main className="flex flex-1 items-center justify-center py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="layout-narrow text-center"
        >
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#BF5AF2] to-[#FF375F] text-[38px] shadow-[0_8px_32px_rgba(191,90,242,0.4)]">
            🎉
          </div>
          <h2 className="mb-4 text-[26px] font-bold tracking-[-0.5px] text-white md:text-[30px]">
            {ui.session.completeTitle}
          </h2>
          <p className="mb-10 text-[16px] leading-relaxed text-[rgba(235,235,245,0.55)]">
            {ui.session.completeBody(cards.length, meta.title)}
          </p>
          <div className="flex flex-col gap-3.5 max-w-sm mx-auto w-full">
            <Button onClick={restart} size="lg" fullWidth>
              {ui.session.practiceMore}
            </Button>
            <Link to="/" className="block w-full">
              <Button variant="secondary" size="lg" fullWidth>
                {ui.session.backHome}
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="layout-narrow flex min-h-0 flex-1 flex-col py-5 pb-36 md:py-8 md:pb-10">
      {/* ── Session header ── */}
      <div className="mb-6 md:mb-8">
        {/* Back + title + counter */}
        <div className="mb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[rgba(255,255,255,0.09)] text-[rgba(235,235,245,0.7)] transition-all hover:bg-[rgba(255,255,255,0.15)] hover:text-white active:scale-[0.94]"
            aria-label={ui.session.backAria}
          >
            <svg
              width="18"
              height="18"
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
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-[20px]"
              style={{
                background: `rgba(${parseInt(accent.slice(1, 3), 16)}, ${parseInt(accent.slice(3, 5), 16)}, ${parseInt(accent.slice(5, 7), 16)}, 0.15)`,
              }}
            >
              {meta.icon}
            </span>
            <div className="min-w-0">
              <span className="block truncate text-[16px] font-semibold text-white tracking-[-0.3px] leading-tight">
                {meta.title}
              </span>
              <span className="block text-[12px] text-[rgba(235,235,245,0.38)] leading-tight mt-1">
                {ui.session.practiceSession}
              </span>
            </div>
          </div>

          {/* Card counter */}
          <span className="shrink-0 rounded-full bg-[rgba(255,255,255,0.08)] px-3.5 py-1.5 text-[13px] font-medium text-[rgba(235,235,245,0.5)]">
            {currentIndex + 1} / {cards.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] overflow-hidden rounded-full bg-[rgba(255,255,255,0.07)]">
          <motion.div
            className="h-full rounded-full"
            style={{ background: accent }}
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* ── Card ── */}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain md:py-4 [-webkit-overflow-scrolling:touch]">
        <div className="w-full min-w-0 md:flex md:items-start md:justify-center">
          {currentCard && <SessionPlayer card={currentCard} />}
        </div>
      </div>

      {/* ── Navigation bar (fixed on mobile) ── */}
      <div className="max-md:fixed max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:z-40 max-md:glass-strong max-md:border-t max-md:border-[rgba(255,255,255,0.08)] max-md:shadow-[0_-16px_48px_rgba(0,0,0,0.6)] max-md:pt-3 max-md:pb-safe max-md:px-4 mt-6 md:mt-10 md:pb-2">
        <div className="mx-auto flex w-full max-w-2xl gap-3 sm:max-w-3xl md:px-0">
          <Button
            variant="secondary"
            size="lg"
            onClick={previous}
            disabled={currentIndex === 0}
            className="flex-1 min-w-0"
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
            {ui.session.back}
          </Button>
          <Button size="lg" onClick={next} className="flex-1 min-w-0">
            {ui.session.next}
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
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Button>
        </div>
      </div>
    </main>
  );
}
