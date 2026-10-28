export default function SolutionsLoading() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="mx-auto mb-8 h-14 w-3/4 max-w-2xl rounded bg-background-elevated" />
      <div className="mx-auto mb-12 h-6 w-1/2 max-w-md rounded bg-background-elevated" />
      <div className="grid gap-8 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-background-card p-8">
            <div className="mb-4 h-12 w-12 rounded-lg bg-background-elevated" />
            <div className="mb-3 h-6 w-3/4 rounded bg-background-elevated" />
            <div className="h-4 w-full rounded bg-background-elevated" />
            <div className="mt-2 h-4 w-5/6 rounded bg-background-elevated" />
          </div>
        ))}
      </div>
    </div>
  );
}
