import type { FunCard as FunCardType } from "@/data/schema";
import { CardShell } from "@/components/ui/CardShell";
import { Badge } from "@/components/ui/Badge";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { ui } from "@/i18n/ui";

interface FunCardProps {
  card: FunCardType;
}

export function FunCard({ card }: FunCardProps) {
  return (
    <CardShell>
      <div className="mb-8">
        <Badge variant="yellow">{ui.badges.fun}</Badge>
      </div>

      <div className="mb-7 space-y-2.5">
        <p className="text-[13px] leading-relaxed text-[rgba(235,235,245,0.38)]">
          {card.promptSv}
        </p>
        <p className="text-pretty break-words text-[22px] font-bold leading-[1.35] text-white tracking-[-0.4px] sm:text-[25px]">
          {card.prompt}
        </p>
      </div>

      <div className="h-px mb-7 bg-[rgba(255,255,255,0.08)]" />

      <div className="space-y-3">
        {card.templates.map((template, i) => (
          <div
            key={i}
            className="flex min-w-0 items-center gap-4 rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-5 py-4 transition-colors hover:bg-[rgba(255,255,255,0.09)]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(255,214,10,0.15)] text-[12px] font-bold text-[#FFD60A]">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-pretty break-words text-[15px] leading-relaxed text-[rgba(235,235,245,0.85)]">
                {template}
              </p>
              <p className="mt-1.5 text-pretty break-words text-[13px] leading-relaxed text-[rgba(235,235,245,0.38)]">
                {card.templatesSv[i]}
              </p>
            </div>
            <SpeakButton text={template} />
          </div>
        ))}
      </div>
    </CardShell>
  );
}
