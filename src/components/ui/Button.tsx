import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "panic" | "accent";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-[#0C0B10] font-semibold shadow-[0_2px_12px_rgba(255,255,255,0.12)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.18)] hover:brightness-[0.96] active:brightness-[0.92]",
  secondary:
    "border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] text-white font-medium hover:bg-[rgba(255,255,255,0.13)] hover:border-[rgba(255,255,255,0.2)] active:bg-[rgba(255,255,255,0.09)]",
  ghost:
    "bg-transparent text-[rgba(235,235,245,0.6)] font-medium hover:bg-[rgba(255,255,255,0.08)] hover:text-white",
  panic:
    "bg-gradient-to-r from-[#FF375F] to-[#FF453A] text-white font-bold shadow-[0_4px_20px_rgba(255,55,95,0.4)] hover:shadow-[0_6px_28px_rgba(255,55,95,0.5)] hover:brightness-[1.05] active:brightness-[0.96]",
  accent:
    "bg-gradient-to-r from-[#BF5AF2] to-[#FF375F] text-white font-semibold shadow-[0_4px_20px_rgba(191,90,242,0.4)] hover:shadow-[0_6px_28px_rgba(191,90,242,0.5)] hover:brightness-[1.04] active:brightness-[0.96]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm:  "min-h-10 px-5 py-2.5 text-[13px] rounded-[11px]",
  md:  "min-h-12 px-6 py-3   text-[14px] rounded-[13px]",
  lg:  "min-h-[3.5rem] px-8 py-4 text-[16px] rounded-[15px]",
  xl:  "min-h-[3.75rem] px-10 py-4.5 text-[17px] rounded-[16px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2.5
          transition-all duration-200 ease-out
          active:scale-[0.97] disabled:opacity-35 disabled:pointer-events-none
          cursor-pointer tracking-[-0.1px]
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
