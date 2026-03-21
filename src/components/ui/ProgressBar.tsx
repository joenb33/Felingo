import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className = "" }: ProgressBarProps) {
  const percentage = Math.min(Math.max(value, 0), 1) * 100;

  return (
    <div
      className={`h-2 overflow-hidden rounded-full bg-white/[0.07] ring-1 ring-inset ring-black/30 sm:h-2.5 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-yellow shadow-[0_0_20px_rgba(79,150,255,0.45)]"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
