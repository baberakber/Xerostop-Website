export default function InsightsLoading() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="mx-auto mb-12 h-12 w-3/4 max-w-2xl rounded bg-background-elevated" />
      <div className="mx-auto mb-8 h-6 w-1/2 max-w-md rounded bg-background-elevated" />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-border bg-background-card">
            <div className="aspect-[16/10] bg-background-elevated" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-20 rounded-full bg-background-elevated" />
              <div className="h-6 w-full rounded bg-background-elevated" />
              <div className="h-4 w-4/5 rounded bg-background-elevated" />
              <div className="h-4 w-full rounded bg-background-elevated" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
