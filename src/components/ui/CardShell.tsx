import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardShellProps {
  children: ReactNode;
  className?: string;
}

export function CardShell({ children, className = "" }: CardShellProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.99 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.11)]
        bg-[#211E2E]
        p-7 sm:p-9 md:p-11
        ${className}
      `}
      style={{
        boxShadow:
          "0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(0,0,0,0.25)",
      }}
    >
      {/* Subtle top highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.12) 60%, transparent 100%)",
        }}
        aria-hidden
      />
      {/* Soft inner glow at top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(191,90,242,0.18), transparent)",
        }}
        aria-hidden
      />
      <div className="relative z-[1]">{children}</div>
    </motion.article>
  );
}
