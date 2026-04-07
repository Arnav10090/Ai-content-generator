export default function DashboardLoading() {
  return (
    <div className="space-y-8 p-8 animate-pulse">
      <div className="space-y-3">
        <div className="h-10 w-56 rounded-lg bg-slate-200 dark:bg-gray-800" />
        <div className="h-4 w-80 max-w-full rounded-lg bg-slate-200 dark:bg-gray-800" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-48 rounded-2xl border border-slate-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 h-12 w-full rounded-xl bg-slate-200 dark:bg-gray-800" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-14 rounded-xl bg-slate-200 dark:bg-gray-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
