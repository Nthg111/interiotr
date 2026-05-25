import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white/5 px-4 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] transition-all duration-300 focus:border-[color:var(--accent)] focus:bg-white/[0.08] focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
