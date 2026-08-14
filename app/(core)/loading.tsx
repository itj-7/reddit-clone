function PostCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border bg-card p-4">
      <div className="mb-3 h-3 w-32 rounded bg-muted" />
      <div className="mb-2 h-5 w-3/4 rounded bg-muted" />
      <div className="h-4 w-1/2 rounded bg-muted" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex gap-8">
      <div className="min-w-0 flex-1 space-y-4">
        <div className="mb-4 h-9 w-64 animate-pulse rounded-lg bg-card" />
        {Array.from({ length: 6 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
      <aside className="hidden w-72 shrink-0 space-y-6 lg:block">
        <div className="h-64 animate-pulse rounded-xl border border-border bg-card" />
      </aside>
    </div>
  );
}
