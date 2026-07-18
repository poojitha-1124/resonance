"use client"

import * as React from "react"
import { Play, Pause, Download, Trash2, Search, FileText } from "lucide-react"

export default function AudioHistoryPage() {
  const [playingId, setPlayingId] = React.useState<number | null>(null)

  const items = [
    { id: 1, name: "explainer_narrator_v2.mp3", voice: "Rachel (Narrator)", chars: 1540, date: "July 18, 2026 12:45 PM" },
    { id: 2, name: "my_cloned_profile_test_1.mp3", voice: "MyClonedVoice (Cloned)", chars: 460, date: "July 17, 2026 8:20 PM" },
    { id: 3, name: "developer_api_prompt.mp3", voice: "Adam (Developer)", chars: 3410, date: "July 15, 2026 10:12 AM" },
    { id: 4, name: "tutorial_voiceover_draft.mp3", voice: "Bella (Educator)", chars: 2100, date: "July 12, 2026 4:05 PM" },
  ]

  const togglePlayback = (id: number) => {
    setPlayingId(playingId === id ? null : id)
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Audio History</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Review, play, downlaod, or delete your previously synthesized voice tracks.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-900 pb-4">
        <div className="relative max-w-xs w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="search"
            placeholder="Search audio titles..."
            className="w-full text-xs rounded-xl border border-zinc-200 bg-white pl-9 pr-3 py-2 text-zinc-800 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>

      {/* Historical List */}
      <div className="border border-zinc-200 dark:border-zinc-900 rounded-3xl bg-white dark:bg-zinc-950/40 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-900 text-zinc-505 dark:text-zinc-550 bg-zinc-50/50 dark:bg-zinc-900/10">
              <th className="p-4 font-bold">File Name</th>
              <th className="p-4 font-bold">Voice Preset</th>
              <th className="p-4 font-bold">Character Weight</th>
              <th className="p-4 font-bold">Synthesis Date</th>
              <th className="p-4 font-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-900">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50/30 dark:hover:bg-zinc-900/10 transition-colors">
                <td className="p-4 flex items-center gap-2 font-bold text-zinc-800 dark:text-zinc-200">
                  <FileText className="h-4 w-4 text-indigo-500" />
                  <span>{item.name}</span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-650 dark:bg-zinc-900 dark:text-zinc-350">
                    {item.voice}
                  </span>
                </td>
                <td className="p-4 font-mono">{item.chars} chars</td>
                <td className="p-4 text-zinc-500">{item.date}</td>
                <td className="p-4">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => togglePlayback(item.id)}
                      className={`p-2.5 rounded-xl border transition-colors ${
                        playingId === item.id
                          ? "bg-red-50 text-red-550 border-red-200 dark:bg-red-955/20 dark:text-red-400 dark:border-red-955"
                          : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {playingId === item.id ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                    </button>
                    <button className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-2.5 rounded-xl border border-zinc-250 bg-white text-zinc-400 hover:text-red-550 hover:bg-red-50/50 dark:border-zinc-850 dark:bg-zinc-900 dark:hover:bg-red-955/10 transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
