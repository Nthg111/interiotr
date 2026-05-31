import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

// Button variants define the visual styling for each supported type.
const variantStyles = {
  default:
    "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] shadow-[0_20px_45px_-20px_rgba(199,166,110,0.7)] hover:-translate-y-0.5 hover:shadow-[0_24px_55px_-18px_rgba(199,166,110,0.85)]",
  secondary:
    "bg-[color:var(--surface)]/85 text-[color:var(--foreground)] hover:bg-[color:var(--surface)]",
  outline:
    "border border-[color:var(--border)] bg-transparent text-[color:var(--foreground)] hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)]/10",
  ghost:
    "bg-transparent text-[color:var(--foreground)] hover:bg-white/5",
};

// Size styles define button height and padding for the supported sizes.
const sizeStyles = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-6 text-base",
};

// Reusable button component with variant and size props.
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border border-transparent font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
