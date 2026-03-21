import { useState } from "react";
import type { DialogueCard as DialogueCardType } from "@/data/schema";
import { CardShell } from "@/components/ui/CardShell";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ui } from "@/i18n/ui";
import { motion } from "framer-motion";

interface DialogueCardProps {
  card: DialogueCardType;
}

export function DialogueCard({ card }: DialogueCardProps) {
  const [visibleLines, setVisibleLines] = useState(1);
  const allRevealed = visibleLines >= card.lines.length;

  return (
    <CardShell>
      {/* Top row */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <Badge variant="purple">{ui.badges.dialogue}</Badge>
        <FavoriteButton cardId={card.id} />
      </div>

      {/* Scenario */}
      <div className="mb-7 space-y-2.5">
        <p className="text-[13px] leading-relaxed text-[rgba(235,235,245,0.38)]">
          {card.scenarioSv}
        </p>
        <p className="text-pretty break-words text-[20px] font-bold leading-snug text-white tracking-[-0.4px] sm:text-[22px]">
          {card.scenario}
        </p>
      </div>

      {/* Divider */}
      <div className="mb-7 h-px bg-[rgba(255,255,255,0.08)]" />

      {/* Dialogue lines */}
      <div className="space-y-4">
        {card.lines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={`${card.id}-line-${i}`}
            initial={{ opacity: 0, x: line.speaker === "you" ? 12 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-end gap-3 min-w-0 ${line.speaker === "you" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div
              className={`
                  shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold
                  ${
                    line.speaker === "you"
                      ? "bg-gradient-to-br from-[#BF5AF2] to-[#FF375F] text-white"
                      : "bg-[rgba(255,255,255,0.1)] text-[rgba(235,235,245,0.7)]"
                  }
                `}
            >
              {line.speaker === "you" ? "Du" : "🗣"}
            </div>
            {/* Bubble */}
            <div
              className={`
                  min-w-0 max-w-[82%] rounded-[18px] px-5 py-4
                  ${
                    line.speaker === "you"
                      ? "bg-[rgba(191,90,242,0.16)] border border-[rgba(191,90,242,0.22)] rounded-br-[6px]"
                      : "bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.09)] rounded-bl-[6px]"
                  }
                `}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 flex flex-col gap-1.5">
                  <span className="text-[15px] leading-relaxed text-pretty break-words text-white sm:text-[16px]">
                    {line.text}
                  </span>
                  <span className="text-[13px] leading-relaxed text-[rgba(235,235,245,0.42)]">
                    {line.textSv}
                  </span>
                </div>
                <div className="shrink-0 mt-0.5">
                  <SpeakButton text={line.text} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reveal / Complete */}
      {!allRevealed && (
        <div className="mt-8 text-center">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setVisibleLines((v) => v + 1)}
          >
            {ui.dialogue.revealNext}
          </Button>
        </div>
      )}

      {allRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full bg-[rgba(48,209,88,0.12)] border border-[rgba(48,209,88,0.22)] px-5 py-3 text-[14px] font-medium text-[#30D158]">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {ui.dialogue.complete}
          </div>
        </motion.div>
      )}
    </CardShell>
  );
}
