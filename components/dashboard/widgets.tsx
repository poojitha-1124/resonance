"use client"

import * as React from "react"
import Link from "next/link"
import { Play, Pause, Download, Volume2, Mic, Library, Clock, ArrowUpRight, Sparkles, TrendingUp, Cpu } from "lucide-react"

interface WelcomeCardProps {
  userName?: string | null
  usedCharacters: number
  remainingCharacters: number
  clonedProfilesCount: number
}

// Welcome Card widget wrapper
export function WelcomeCard({ userName, usedCharacters, remainingCharacters, clonedProfilesCount }: WelcomeCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-zinc-900 px-6 py-8 shadow-lg border border-zinc-800 text-white select-none">
      <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent_60%)] filter blur-xl pointer-events-none" />
      <div className="absolute top-0 right-0 -z-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.06),transparent_60%)] filter blur-2xl pointer-events-none" />

      <div className="space-y-4 max-w-xl">
        <span className="inline-flex items-center gap-1 bg-indigo-500/10 text-indigo-350 border border-indigo-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <Sparkles className="h-3 w-3" />
          <span>PRO SUITE ACTIVATED</span>
        </span>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Welcome back, {userName || "Developer"}!</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Create high-fidelity vocal overlays or profile speaker vectors. You have utilized <strong className="text-zinc-100">{usedCharacters.toLocaleString()} characters</strong> of your monthly allocation.
        </p>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <div>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">REMAINING LIMIT</p>
            <p className="text-lg font-mono font-bold text-indigo-400">{remainingCharacters.toLocaleString()} chars</p>
          </div>
          <div className="border-l border-zinc-800 pl-6">
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">CLONED PROFILES</p>
            <p className="text-lg font-mono font-bold text-violet-400">{clonedProfilesCount} active</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Quick Actions panel
export function QuickActions() {
  const actions = [
    {
      title: "Synthesize Text",
      desc: "Convert text script to natural speech waves",
      href: "/generate-voice",
      icon: Volume2,
      color: "text-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20"
    },
    {
      title: "Clone Voice",
      desc: "Record bio sample to extract voice contour",
      href: "/voice-cloning",
      icon: Mic,
      color: "text-violet-500 bg-violet-50/50 dark:bg-violet-950/20"
    },
    {
      title: "Saved Library",
      desc: "Manage custom speaker vectors list",
      href: "/voice-library",
      icon: Library,
      color: "text-rose-500 bg-rose-50/55 dark:bg-rose-950/20"
    },
    {
      title: "Audio History",
      desc: "Preview and download processed tracks",
      href: "/audio-history",
      icon: Clock,
      color: "text-sky-500 bg-sky-50/50 dark:bg-sky-950/20"
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act, i) => {
          const Icon = act.icon
          return (
            <Link
              key={i}
              href={act.href}
              className="group flex flex-col justify-between p-5 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-900 dark:bg-zinc-950/60 dark:hover:border-zinc-800 transition-all hover:shadow-sm"
            >
              <div className="space-y-3">
                <div className={`p-2.5 rounded-xl w-fit ${act.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 group-hover:text-indigo-650 dark:text-zinc-150 dark:group-hover:text-violet-400 text-sm">
                    {act.title}
                  </h4>
                  <p className="text-xs text-zinc-505 dark:text-zinc-500 mt-1">{act.desc}</p>
                </div>
              </div>
              <div className="flex justify-end pt-4 text-zinc-400 group-hover:text-zinc-650 dark:group-hover:text-zinc-200 transition-colors">
                <ArrowUpRight className="h-4.5 w-4.5" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

interface StatsGridProps {
  totalGenerationsCount: number
  clonedProfilesCount: number
  remainingCharacters: number
}

// Voice Statistics Cards Grid
export function StatsGrid({ totalGenerationsCount, clonedProfilesCount, remainingCharacters }: StatsGridProps) {
  const stats = [
    { title: "Total Speech Renditions", value: `${totalGenerationsCount} files`, change: "Dynamic statistics", icon: TrendingUp },
    { title: "Saved Voice Profiles", value: `${clonedProfilesCount} active`, change: "Cloned presets count", icon: Cpu },
    { title: "Remaining Synth Credit", value: `${remainingCharacters.toLocaleString()} chars`, change: "Pro bundle active", icon: Volume2 },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Overview Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="p-5 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-semibold">{stat.title}</span>
                <Icon className="h-4.5 w-4.5 text-zinc-400" />
              </div>
              <p className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-3 font-mono">
                {stat.value}
              </p>
              <p className="text-[10px] text-zinc-450 dark:text-zinc-500 font-medium mt-1">
                {stat.change}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface GeneratedAudioDetail {
  id: string
  text: string
  audioUrl: string
  duration: number
  fileSize: number
  language: string
  createdAt: Date
  voiceProfile: {
    name: string
  } | null
}

interface RecentGenerationsProps {
  generations: GeneratedAudioDetail[]
}

// Recent Voice Generations table (with mini client audio visualizer player mock)
export function RecentGenerations({ generations }: RecentGenerationsProps) {
  const [playingId, setPlayingId] = React.useState<string | null>(null)

  const togglePlayback = (id: string) => {
    if (playingId === id) {
      setPlayingId(null)
    } else {
      setPlayingId(id)
    }
  }

  if (generations.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Recent Syntheses</h3>
          <Link href="/audio-history" className="text-xs font-semibold text-indigo-650 hover:underline dark:text-violet-405">
            See All History
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-200 dark:border-zinc-900 rounded-2xl bg-white dark:bg-zinc-950/40 text-center space-y-4">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-full">
            <Volume2 className="h-6 w-6 text-zinc-400" />
          </div>
          <div>
            <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">No synthesis matches</h4>
            <p className="text-xs text-zinc-505 dark:text-zinc-500 mt-1 max-w-sm">Use the workspace generator panel to synthesize custom voices from script lines.</p>
          </div>
          <Link
            href="/generate-voice"
            className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer"
          >
            Create Speech
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Recent Syntheses</h3>
        <Link href="/audio-history" className="text-xs font-semibold text-indigo-650 hover:underline dark:text-violet-405">
          See All History
        </Link>
      </div>

      <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-900 rounded-2xl bg-white dark:bg-zinc-950/40">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-900 text-zinc-500 dark:text-zinc-550 bg-zinc-50/50 dark:bg-zinc-900/10">
              <th className="p-4 font-bold">Audio File Name</th>
              <th className="p-4 font-bold">Speaker Profile</th>
              <th className="p-4 font-bold hidden sm:table-cell">Usage Character Count</th>
              <th className="p-4 font-bold hidden md:table-cell">Date Created</th>
              <th className="p-4 font-bold text-center">Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-900">
            {generations.map((audio) => {
              const fileName = audio.audioUrl.split("/").pop() || "synthesized_speech.mp3"
              return (
                <tr key={audio.id} className="hover:bg-zinc-50/30 dark:hover:bg-zinc-900/10 transition-colors">
                  <td className="p-4 font-bold text-zinc-800 dark:text-zinc-200">{fileName}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full font-medium bg-zinc-100 text-zinc-650 dark:bg-zinc-900 dark:text-zinc-350">
                      {audio.voiceProfile?.name || "Default Preset"}
                    </span>
                  </td>
                  <td className="p-4 font-mono hidden sm:table-cell">{audio.text.length} chars</td>
                  <td className="p-4 text-zinc-550 hidden md:table-cell">
                    {new Date(audio.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => togglePlayback(audio.id)}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          playingId === audio.id
                            ? "bg-red-50 text-red-550 border-red-200 dark:bg-red-955/20 dark:text-red-400 dark:border-red-955"
                            : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {playingId === audio.id ? (
                          <Pause className="h-3.5 w-3.5 fill-current" />
                        ) : (
                          <Play className="h-3.5 w-3.5 fill-current" />
                        )}
                      </button>
                      <button className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// AI Recommendations feeds
export function AIRecommendations() {
  const recommendations = [
    {
      id: 1,
      tag: "Vocal Optimizer",
      text: "Improve 'MyClonedVoice' match rate to >99.8% by uploading an additional 15s speaking sample.",
      actionText: "Refine Clone Model",
      href: "/voice-cloning"
    },
    {
      id: 2,
      tag: "Vocal Release",
      text: "Try the new 'Bella (Educator)' voice preset. Designed for natural cadence in tutorial scripts.",
      actionText: "Test Voice Preset",
      href: "/generate-voice"
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">AI Recommendations</h3>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-5 rounded-2xl border border-zinc-200 bg-white space-y-3 dark:border-zinc-900 dark:bg-zinc-950/40 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-16 w-16 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_60%)] filter blur-md" />
            
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-650 dark:text-violet-405 uppercase tracking-wide">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{rec.tag}</span>
            </div>

            <p className="text-xs text-zinc-620 dark:text-zinc-400 leading-relaxed">
              {rec.text}
            </p>

            <Link
              href={rec.href}
              className="inline-flex items-center gap-1 text-xs font-bold text-zinc-900 dark:text-zinc-150 hover:underline pt-1"
            >
              <span>{rec.actionText}</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
