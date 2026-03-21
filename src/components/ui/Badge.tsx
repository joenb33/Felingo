import type { ReactNode } from "react";

type BadgeVariant = "default" | "blue" | "yellow" | "purple" | "red";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[rgba(255,255,255,0.08)] text-[rgba(235,235,245,0.55)] border-[rgba(255,255,255,0.08)]",
  blue: "bg-[rgba(10,132,255,0.12)] text-[#409CFF] border-[rgba(10,132,255,0.2)]",
  yellow: "bg-[rgba(255,214,10,0.10)] text-[#FFD60A] border-[rgba(255,214,10,0.18)]",
  purple: "bg-[rgba(191,90,242,0.12)] text-[#BF5AF2] border-[rgba(191,90,242,0.22)]",
  red: "bg-[rgba(255,55,95,0.10)] text-[#FF375F] border-[rgba(255,55,95,0.18)]",
};

export function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full border px-3 py-1
        text-[11px] font-semibold uppercase tracking-[0.12em]
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
