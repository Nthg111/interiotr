export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--background)] px-6">
      <div className="w-full max-w-xl space-y-6 rounded-[2rem] border border-[color:var(--border)] bg-white/5 p-8 shadow-[0_24px_80px_-50px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between">
          <div className="h-14 w-14 animate-pulse rounded-full border border-[color:var(--border)] bg-white/6" />
          <div className="h-4 w-24 animate-pulse rounded-full bg-white/8" />
        </div>
        <div className="space-y-3">
          <div className="h-8 w-2/3 animate-pulse rounded-full bg-white/8" />
          <div className="h-8 w-5/6 animate-pulse rounded-full bg-white/8" />
          <div className="h-8 w-1/2 animate-pulse rounded-full bg-white/8" />
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/8">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[color:var(--accent)]/60" />
        </div>
      </div>
    </div>
  );
}
