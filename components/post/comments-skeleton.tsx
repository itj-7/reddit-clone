export function CommentsSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-20 w-full rounded-lg border border-border bg-muted/30" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 w-full rounded-lg bg-muted/30" />
        ))}
      </div>
    </div>
  );
}
