import * as React from "react"

export default function VoiceLibraryLoading() {
  return (
    <div className="space-y-6 pb-12 animate-pulse select-none">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-805 rounded-xl" />
        <div className="h-4 w-96 bg-zinc-150 dark:bg-zinc-900 rounded-lg" />
      </div>

      {/* Toolbar Skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-900 pb-4">
        <div className="h-9 w-64 bg-zinc-200 dark:bg-zinc-900 rounded-xl" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 bg-zinc-150 dark:bg-zinc-900 rounded" />
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-900 rounded-xl" />
        </div>
      </div>

      {/* Section 1: Preset Voices Skeleton */}
      <div className="space-y-4">
        <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-805 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-5 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 rounded-3xl h-48 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-4.5 w-24 bg-zinc-150 dark:bg-zinc-900 rounded-full" />
                  <div className="h-4.5 w-16 bg-zinc-100 dark:bg-zinc-850 rounded" />
                </div>
                <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg mt-3" />
                <div className="h-3.5 w-20 bg-zinc-150 dark:bg-zinc-850 rounded" />
              </div>
              <div className="flex justify-between items-center border-t border-zinc-100 dark:border-zinc-900 pt-3">
                <div className="h-3 w-16 bg-zinc-150 dark:bg-zinc-900 rounded" />
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-zinc-205 dark:bg-zinc-900 rounded-xl" />
                  <div className="h-4 w-12 bg-zinc-150 dark:bg-zinc-900 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Cloned Voices Skeleton */}
      <div className="space-y-4 pt-6">
        <div className="h-5 w-36 bg-zinc-205 dark:bg-zinc-805 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-5 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 rounded-3xl h-48 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-4.5 w-28 bg-zinc-150 dark:bg-zinc-900 rounded-full" />
                  <div className="h-4.5 w-16 bg-zinc-100 dark:bg-zinc-850 rounded" />
                </div>
                <div className="h-5 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-lg mt-3" />
                <div className="h-3.5 w-20 bg-zinc-150 dark:bg-zinc-850 rounded" />
              </div>
              <div className="flex justify-between items-center border-t border-zinc-100 dark:border-zinc-900 pt-3">
                <div className="h-3 w-16 bg-zinc-150 dark:bg-zinc-900 rounded" />
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-zinc-205 dark:bg-zinc-900 rounded-xl" />
                  <div className="h-4 w-12 bg-zinc-150 dark:bg-zinc-900 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
