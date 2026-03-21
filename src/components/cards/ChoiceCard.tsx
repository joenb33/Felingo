import { useState } from "react";
import type { ChoiceCard as ChoiceCardType } from "@/data/schema";
import { CardShell } from "@/components/ui/CardShell";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { ui } from "@/i18n/ui";

interface ChoiceCardProps {
  card: ChoiceCardType;
}

export function ChoiceCard({ card }: ChoiceCardProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
  };

  return (
    <CardShell>
      {/* Top row */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <Badge variant="yellow">{ui.badges.quiz}</Badge>
        <FavoriteButton cardId={card.id} />
      </div>

      {/* Prompt */}
      <div className="mb-7 space-y-3">
        <p className="text-[13px] leading-relaxed text-[rgba(235,235,245,0.38)]">
          {card.promptSv}
        </p>
        <div className="flex items-start gap-4">
          <p className="min-w-0 flex-1 text-pretty break-words text-[20px] font-bold leading-[1.35] text-white tracking-[-0.4px] sm:text-[23px]">
            {card.prompt}
          </p>
          <SpeakButton text={card.prompt} className="shrink-0 mt-1" />
        </div>
      </div>

      {/* Divider */}
      <div className="mb-5 h-px bg-[rgba(255,255,255,0.08)]" />

      {/* Options */}
      <div className="space-y-3">
        {card.options.map((option, i) => {
          const isSelected = selected === i;
          const showResult = selected !== null;

          let bg =
            "bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.09)] border-[rgba(255,255,255,0.09)] hover:border-[rgba(255,255,255,0.16)] cursor-pointer";
          let textColor = "text-white";
          let labelBg =
            "bg-[rgba(255,255,255,0.09)] text-[rgba(235,235,245,0.55)]";

          if (showResult) {
            if (option.correct) {
              bg = "bg-[rgba(48,209,88,0.10)] border-[rgba(48,209,88,0.28)]";
              textColor = "text-[#30D158]";
              labelBg = "bg-[rgba(48,209,88,0.18)] text-[#30D158]";
            } else if (isSelected && !option.correct) {
              bg = "bg-[rgba(255,69,58,0.10)] border-[rgba(255,69,58,0.28)]";
              textColor = "text-[#FF453A]";
              labelBg = "bg-[rgba(255,69,58,0.18)] text-[#FF453A]";
            } else {
              bg =
                "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)] opacity-35";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`
                w-full rounded-[16px] border px-4 py-4 text-left transition-all duration-200
                disabled:cursor-default active:scale-[0.99]
                ${bg}
              `}
            >
              <div className="flex items-start gap-3.5">
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${labelBg}`}
                >
                  {showResult && option.correct ? (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : showResult && isSelected ? (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <div className="min-w-0 flex-1 py-0.5">
                  <span
                    className={`text-[15px] leading-relaxed text-pretty break-words ${textColor}`}
                  >
                    {option.text}
                  </span>
                  <AnimatePresence>
                    {showResult && (isSelected || option.correct) && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 text-[13px] leading-relaxed text-[rgba(235,235,245,0.55)]"
                      >
                        {option.feedbackSv}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </CardShell>
  );
}
