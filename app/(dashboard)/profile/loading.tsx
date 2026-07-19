import * as React from "react"

export default function ProfileLoading() {
  return (
    <div className="space-y-6 pb-12 animate-pulse select-none">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        <div className="h-4 w-96 bg-zinc-150 dark:bg-zinc-850 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Container (8 cols) */}
        <div className="lg:col-span-8 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 p-6 rounded-3xl space-y-6 h-[420px] flex flex-col justify-between">
          <div className="flex items-center gap-4 pb-4 border-b border-zinc-150 dark:border-zinc-905">
            <div className="h-16 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-3 w-56 bg-zinc-150 dark:bg-zinc-850 rounded-md" />
              <div className="h-3 w-28 bg-zinc-100 dark:bg-zinc-900 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-3 w-16 bg-zinc-150 dark:bg-zinc-850 rounded" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 bg-zinc-150 dark:bg-zinc-850 rounded" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-150 dark:border-zinc-905 flex justify-between items-center">
            <div className="h-3.5 w-32 bg-zinc-150 dark:bg-zinc-850 rounded" />
            <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
          </div>
        </div>

        {/* Package Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 rounded-3xl h-[160px] flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
              <div className="space-y-2">
                <div className="h-4.5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                <div className="h-3 w-16 bg-zinc-150 dark:bg-zinc-850 rounded" />
              </div>
            </div>
            <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-900 pt-3">
              <div className="h-3.5 w-full bg-zinc-150 dark:bg-zinc-850 rounded" />
              <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full" />
            </div>
          </div>

          <div className="p-5 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 rounded-3xl h-[120px] flex flex-col justify-between">
            <div className="h-4.5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            <div className="h-3 w-full bg-zinc-150 dark:bg-zinc-850 rounded-md" />
            <div className="h-3 w-3/4 bg-zinc-100 dark:bg-zinc-900 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
