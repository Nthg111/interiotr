import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[color:var(--border)] bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--muted)] backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
