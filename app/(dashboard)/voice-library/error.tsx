"use client"

import * as React from "react"
import { AlertCircle, RefreshCcw, Home } from "lucide-react"

export default function VoiceLibraryError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error("Voice Library error boundary caught exception:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center animate-fade-in space-y-6">
      <div className="p-4 bg-red-50 dark:bg-red-955/20 border border-red-250 dark:border-red-955/50 rounded-full text-red-650 dark:text-red-400">
        <AlertCircle className="h-8 w-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-xl font-bold tracking-tight text-zinc-909 dark:text-zinc-100">
          Database Connection Offline
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Resonance was unable to load your voice profiles from the Postgres database. This can be caused by network timeouts, database host unreachable, or incorrect secrets pool variables.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-indigo-650 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer shadow-md transition-all"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          <span>Retry Connection</span>
        </button>

        <button
          onClick={() => window.location.href = "/dashboard"}
          className="inline-flex items-center gap-2 border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-705 dark:text-zinc-205 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-all"
        >
          <Home className="h-3.5 w-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {error.digest && (
        <span className="text-[10px] text-zinc-400 font-mono select-all">
          Error Signature ID: {error.digest}
        </span>
      )}
    </div>
  )
}
