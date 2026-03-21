import type { PhraseCard as PhraseCardType } from "@/data/schema";
import { CardShell } from "@/components/ui/CardShell";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { Badge } from "@/components/ui/Badge";
import { ui } from "@/i18n/ui";

interface PhraseCardProps {
  card: PhraseCardType;
}

export function PhraseCard({ card }: PhraseCardProps) {
  return (
    <CardShell>
      {/* Top row: badge + actions */}
      <div className="mb-9 flex items-center justify-between gap-4">
        <Badge variant="blue">{ui.badges.phrase}</Badge>
        <div className="flex shrink-0 gap-2.5">
          <SpeakButton text={card.en} />
          <FavoriteButton cardId={card.id} />
        </div>
      </div>

      {/* Main phrase */}
      <p className="mb-9 text-pretty break-words text-[24px] font-bold leading-[1.4] tracking-[-0.4px] text-white sm:text-[28px] md:text-[32px]">
        {card.en}
      </p>

      {/* Swedish translation */}
      <div className="flex items-start gap-4 rounded-[16px] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] px-5 py-5 sm:px-6 sm:py-6">
        <span className="mt-[3px] shrink-0 text-[9px] font-bold uppercase tracking-[0.2em] text-[rgba(255,214,10,0.75)]">
          {ui.phraseCard.svLabel}
        </span>
        <p className="min-w-0 text-pretty break-words text-[15px] leading-relaxed text-[rgba(235,235,245,0.62)] md:text-[16px]">
          {card.sv}
        </p>
      </div>

      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2 border-t border-[rgba(255,255,255,0.07)] pt-8">
          {card.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}
    </CardShell>
  );
}
