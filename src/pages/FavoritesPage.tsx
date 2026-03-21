import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { getCardById } from "@/lib/content-loader";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { Button } from "@/components/ui/Button";
import type { ContentCard } from "@/data/schema";
import { ui } from "@/i18n/ui";

export function FavoritesPage() {
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  const favoriteCards = favorites
    .map(getCardById)
    .filter((card): card is ContentCard => card !== undefined);

  if (favoriteCards.length === 0) {
    return (
      <main className="flex flex-1 items-center justify-center py-12 md:py-16">
        <div className="layout-narrow text-center">
          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#FFD60A] to-[#FF9F0A] text-[38px] shadow-[0_8px_32px_rgba(255,214,10,0.3)]">
            ⭐
          </div>
          <h2 className="mb-3 text-[26px] font-bold tracking-[-0.5px] text-white">
            {ui.favorites.emptyTitle}
          </h2>
          <p className="mb-8 text-[15px] leading-relaxed text-[rgba(235,235,245,0.5)]">
            {ui.favorites.emptyBody}
          </p>
          <Link to="/" className="mx-auto inline-block w-full max-w-xs">
            <Button size="lg" fullWidth>
              {ui.favorites.startCta}
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="layout-narrow flex-1 py-7 pb-12 md:py-9">
      {/* Header */}
      <div className="mb-7 flex items-end justify-between gap-4 border-b border-[rgba(255,255,255,0.07)] pb-6">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.5px] text-white md:text-[28px]">
            {ui.favorites.title}
          </h1>
          <p className="mt-1.5 text-[13px] text-[rgba(235,235,245,0.45)]">
            {ui.favorites.subtitle}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-[rgba(255,255,255,0.08)] px-3.5 py-1.5 text-[13px] font-medium text-[rgba(235,235,245,0.55)]">
          {favoriteCards.length} {ui.favorites.savedCount}
        </span>
      </div>

      {/* List */}
      <AnimatePresence>
        <div className="space-y-3">
          {favoriteCards.map((card) => {
            const text =
              card.type === "phrase"
                ? card.en
                : card.type === "choice"
                  ? card.prompt
                  : card.type === "dialogue"
                    ? card.scenario
                    : card.prompt;

            const subtext =
              card.type === "phrase"
                ? card.sv
                : card.type === "choice"
                  ? card.promptSv
                  : card.type === "dialogue"
                    ? card.scenarioSv
                    : card.type === "fun"
                      ? card.promptSv
                      : undefined;

            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -80, transition: { duration: 0.2 } }}
                className="flex min-w-0 items-center gap-4 rounded-[18px] border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.05)] p-5 sm:gap-5 sm:p-6"
                style={{
                  boxShadow: "0 2px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-pretty break-words text-[16px] font-semibold leading-snug text-white tracking-[-0.2px]">
                    {text}
                  </p>
                  {subtext && (
                    <p className="mt-2 text-pretty break-words text-[14px] leading-relaxed text-[rgba(235,235,245,0.48)]">
                      {subtext}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <SpeakButton text={text} />
                  <button
                    onClick={() => toggleFavorite(card.id)}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)] text-[rgba(235,235,245,0.45)] transition-all hover:border-[rgba(255,69,58,0.3)] hover:bg-[rgba(255,69,58,0.1)] hover:text-[#FF453A] active:scale-[0.96]"
                    aria-label={ui.favorites.removeAria}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>
    </main>
  );
}
