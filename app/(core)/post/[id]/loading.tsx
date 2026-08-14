export default function Loading() {
  return (
    <div className="flex gap-8">
      <div className="min-w-0 flex-1 animate-pulse">
        <div className="mb-4 h-4 w-24 rounded bg-card" />
        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="mb-4 h-4 w-40 rounded bg-muted" />
          <div className="mb-3 h-7 w-3/4 rounded bg-muted" />
          <div className="mb-2 h-4 w-full rounded bg-muted" />
          <div className="mb-2 h-4 w-full rounded bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
        </div>
        <div className="mt-8 rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="mb-4 h-5 w-32 rounded bg-muted" />
          <div className="h-20 w-full rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
