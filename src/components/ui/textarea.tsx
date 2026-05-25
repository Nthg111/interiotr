import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-3xl border border-[color:var(--border)] bg-white/5 px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] transition-all duration-300 focus:border-[color:var(--accent)] focus:bg-white/[0.08] focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
