"use client"

import * as React from "react"
import { Play, Sparkles, Code, GraduationCap, Laptop, Podcast, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [isPlaying, setIsPlaying] = React.useState(false)

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,var(--color-indigo-100),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_50%)] opacity-70 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* SaaS Announcement Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-violet-800/40 dark:bg-violet-950/20 dark:text-violet-300 mx-auto lg:mx-0 shadow-sm animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 dark:text-violet-400" />
              <span>Next-Gen Speech Synthesis v2.5 released</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-zinc-50">
              Give Your Ideas a{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-pink-400">
                Natural Voice
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl text-lg sm:text-xl text-zinc-650 dark:text-zinc-400 leading-relaxed mx-auto lg:mx-0">
              Synthesize high-fidelity voice output, clone custom vocal cards in seconds, and power your audio library with a developer-first AI speech system.
            </p>

            {/* CTA Gates */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white dark:bg-violet-600 dark:hover:bg-violet-500 shadow-lg shadow-indigo-500/20 dark:shadow-violet-600/10 font-semibold gap-2">
                <span>Start Generating</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto hover:bg-zinc-100 dark:hover:bg-zinc-900 font-semibold gap-2">
                <span>Watch Demonstration</span>
              </Button>
            </div>

            {/* Target Audience Indicators */}
            <div className="pt-4 space-y-3">
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-600 tracking-wider uppercase">
                Vocalizing projects for:
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 px-2.5 py-1.5 rounded-lg shadow-sm">
                  <GraduationCap className="h-3.5 w-3.5 text-indigo-500 dark:text-violet-400" /> Students
                </span>
                <span className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 px-2.5 py-1.5 rounded-lg shadow-sm">
                  <Podcast className="h-3.5 w-3.5 text-indigo-500 dark:text-violet-400" /> Content Creators
                </span>
                <span className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 px-2.5 py-1.5 rounded-lg shadow-sm">
                  <Code className="h-3.5 w-3.5 text-indigo-500 dark:text-violet-400" /> Developers
                </span>
                <span className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 px-2.5 py-1.5 rounded-lg shadow-sm">
                  <Laptop className="h-3.5 w-3.5 text-indigo-500 dark:text-violet-400" /> Professionals
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Soundwave Panel */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual Backdrops */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 dark:bg-violet-500/10 rounded-full filter blur-3xl animate-pulse" />

            <div className="client-mockup relative w-full max-w-sm rounded-2xl border border-zinc-250/70 bg-white/70 p-6 backdrop-blur-md shadow-xl dark:border-zinc-800/80 dark:bg-zinc-950/70">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-905 pb-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-zinc-500 font-mono tracking-tight">resonance-engine.wav</span>
              </div>

              {/* Speech Input Box */}
              <div className="space-y-4">
                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-100 dark:border-zinc-850">
                  <p className="text-xs text-zinc-500 dark:text-zinc-600 font-semibold mb-1 uppercase tracking-wide">Speech Input Text</p>
                  <p className="text-sm text-zinc-800 dark:text-zinc-200">
                    &ldquo;AI speech is no longer mechanical. Resonance reconstructs organic tone dynamics and natural pauses in real-time.&rdquo;
                  </p>
                </div>

                {/* Animated Waves */}
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="flex items-end gap-1 h-12 w-full justify-center px-4">
                    {[3, 7, 5, 9, 4, 8, 2, 7, 6, 8, 3, 5, 9, 6, 4, 7, 3, 6, 8, 5, 2, 6, 4].map((height, i) => (
                      <span
                        key={i}
                        className={`w-1 bg-gradient-to-t from-indigo-500 to-purple-600 rounded-full transition-all duration-300 ${
                          isPlaying ? "animate-bounce" : "opacity-60"
                        }`}
                        style={{
                          height: `${isPlaying ? height * 5 : 8}px`,
                          animationDelay: `${i * 60}ms`,
                          animationDuration: "600ms",
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-650 font-medium mt-4">
                    {isPlaying ? "Generating speech audio..." : "Tap play program preview"}
                  </span>
                </div>

                {/* Play Trigger */}
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`w-full py-5 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                    isPlaying
                      ? "bg-red-500 hover:bg-red-650 text-white dark:bg-red-600 dark:hover:bg-red-700"
                      : "bg-indigo-600 hover:bg-indigo-650 text-white dark:bg-violet-600 dark:hover:bg-violet-700"
                  }`}
                >
                  <Play className={`h-4.5 w-4.5 mr-2 ${isPlaying ? "hidden" : "block fill-white"}`} />
                  <span>{isPlaying ? "Pause Synthesis" : "Generate Waveform"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
