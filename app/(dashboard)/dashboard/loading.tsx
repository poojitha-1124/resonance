import * as React from "react"

export default function DashboardLoading() {
  return (
    <div className="space-y-8 pb-12 animate-pulse">
      {/* Welcome Card Skeleton */}
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900 dark:bg-zinc-950 px-6 py-8 border border-zinc-800 text-white select-none h-[220px] flex flex-col justify-between">
        <div className="space-y-4 max-w-xl">
          <div className="h-4.5 w-32 bg-zinc-800 rounded-full" />
          <div className="h-8 w-64 bg-zinc-800 rounded-xl" />
          <div className="h-4 w-full bg-zinc-850 rounded-lg" />
          
          <div className="flex gap-6 pt-2">
            <div className="space-y-2">
              <div className="h-3 w-16 bg-zinc-800 rounded" />
              <div className="h-5 w-24 bg-zinc-800 rounded-lg" />
            </div>
            <div className="space-y-2 border-l border-zinc-800 pl-6">
              <div className="h-3 w-20 bg-zinc-850 rounded" />
              <div className="h-5 w-16 bg-zinc-855 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-zinc-205 bg-white dark:border-zinc-900 dark:bg-zinc-950/40 h-[120px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-850 rounded" />
              </div>
              <div className="h-6 w-24 bg-zinc-250 dark:bg-zinc-800 rounded-lg mt-3" />
              <div className="h-3.5 w-20 bg-zinc-200 dark:bg-zinc-850 rounded mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-24 bg-zinc-205 dark:bg-zinc-800 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950/60 h-[160px] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
                <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-3 w-full bg-zinc-150 dark:bg-zinc-850 rounded" />
              </div>
              <div className="flex justify-end">
                <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-850 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Split Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Syntheses Table Skeleton */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-900 rounded-2xl bg-white dark:bg-zinc-950/40 h-[220px] p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-105 dark:border-zinc-900 last:border-0">
                <div className="h-4.5 w-32 bg-zinc-150 dark:bg-zinc-800 rounded" />
                <div className="h-4.5 w-20 bg-zinc-200 dark:bg-zinc-805 rounded-full" />
                <div className="h-4.5 w-16 bg-zinc-100 dark:bg-zinc-850 rounded hidden sm:block" />
                <div className="h-8 w-16 bg-zinc-200 dark:bg-zinc-850 rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations Skeleton */}
        <div className="lg:col-span-4 space-y-4">
          <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950/40 h-[140px] flex flex-col justify-between"
              >
                <div className="h-3.5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-3 w-full bg-zinc-150 dark:bg-zinc-850 rounded" />
                <div className="h-3.5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
