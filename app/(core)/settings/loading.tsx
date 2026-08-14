export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse space-y-4">
      <div className="h-7 w-40 rounded bg-card" />
      <div className="h-48 w-full rounded-lg border border-border bg-card" />
      <div className="h-48 w-full rounded-lg border border-border bg-card" />
    </div>
  );
}
