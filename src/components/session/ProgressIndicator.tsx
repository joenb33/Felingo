import { ProgressBar } from "@/components/ui/ProgressBar";
import { ui } from "@/i18n/ui";

interface ProgressIndicatorProps {
  current: number;
  total: number;
  progress: number;
}

export function ProgressIndicator({
  current,
  total,
  progress,
}: ProgressIndicatorProps) {
  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between text-xs font-medium tracking-wide text-text-muted sm:text-[13px]">
        <span>
          {ui.progress.cardOf(Math.min(current + 1, total), total)}
        </span>
        <span className="tabular-nums text-text-secondary">
          {Math.round(progress * 100)}%
        </span>
      </div>
      <ProgressBar value={progress} />
    </div>
  );
}
