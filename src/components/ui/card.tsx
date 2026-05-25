import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 shadow-[0_18px_60px_-36px_rgba(10,10,10,0.55)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
