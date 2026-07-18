"use client"

import * as React from "react"
import { Mic, Upload, CheckCircle2, Activity, Trash2, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VoiceCloning() {
  const [isRecording, setIsRecording] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0)
  const [recordingUploaded, setRecordingUploaded] = React.useState(false)
  const [similarity, setSimilarity] = React.useState<number | null>(null)
  const [statusText, setStatusText] = React.useState("Ready for sample upload")

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined

    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 15) {
            setIsRecording(false)
            setRecordingUploaded(true)
            setStatusText("Synthesizing voice vector...")
            simulateVectorMapping()
            return 0;
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const startRecordSimulation = () => {
    setSeconds(0)
    setRecordingUploaded(false)
    setSimilarity(null)
    setIsRecording(true)
    setStatusText("Recording audio sample...")
  }

  const simulateVectorMapping = () => {
    setTimeout(() => {
      setSimilarity(99.4)
      setStatusText("Voice Cloned Successfully!")
    }, 2800)
  }

  const resetSimulation = () => {
    setIsRecording(false)
    setSeconds(0)
    setRecordingUploaded(false)
    setSimilarity(null)
    setStatusText("Ready for sample upload")
  }

  return (
    <section className="py-20 bg-white dark:bg-zinc-900 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Mockup Card */}
          <div className="order-2 lg:order-1 lg:col-span-6 relative flex justify-center">
            <div className="absolute top-[20%] left-[-10%] w-64 h-64 bg-indigo-500/5 dark:bg-violet-500/5 rounded-full filter blur-3xl" />

            <div className="w-full max-w-md rounded-3xl border border-zinc-200/80 bg-zinc-55/10 p-6 dark:border-zinc-800 dark:bg-zinc-950/40 shadow-lg">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-850 pb-4 mb-4">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-150">Resonance Cloner</h3>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-150/40 text-indigo-700 dark:bg-violet-950/40 dark:text-violet-300">
                  <Activity className="h-3 w-3 animate-pulse" />
                  <span>Module Status: {statusText}</span>
                </span>
              </div>

              {/* Simulation panel body */}
              <div className="space-y-6">
                {!recordingUploaded && !isRecording && (
                  <div className="border border-dashed border-zinc-200 rounded-2xl p-8 text-center dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer group">
                    <Upload className="mx-auto h-8 w-8 text-sky-500 group-hover:scale-105 transition-transform" />
                    <p className="mt-3 text-sm font-bold text-zinc-805 dark:text-zinc-200">Upload sample audio file</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 max-w-[200px] mx-auto">
                      Drag and drop MP3, WAV or M4A (15-30s recommended)
                    </p>
                  </div>
                )}

                {isRecording && (
                  <div className="border border-zinc-200 rounded-2xl p-8 text-center dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-150 dark:bg-red-950/30 mb-4">
                      <span className="absolute inset-0 rounded-full bg-red-400 opacity-20 animate-ping" />
                      <Mic className="h-7 w-7 text-red-500" />
                    </div>
                    <p className="text-xl font-bold text-zinc-900 dark:text-zinc-150 font-mono tracking-widest">
                      0:{(seconds < 10 ? "0" : "") + seconds} / 0:15
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">Speak clearly into your microphone...</p>
                  </div>
                )}

                {recordingUploaded && !similarity && (
                  <div className="border border-zinc-200 rounded-2xl p-8 text-center dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <div className="flex justify-center items-center gap-2 mb-4">
                      <div className="h-3 w-3 rounded-full bg-indigo-500 animate-bounce" />
                      <div className="h-3 w-3 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "100ms" }} />
                      <div className="h-3 w-3 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "200ms" }} />
                    </div>
                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-150">Generating Vocal Embeddings</p>
                    <p className="text-xs text-zinc-550 mt-1">Mapping mouth clicks, frequencies, and accent models...</p>
                  </div>
                )}

                {similarity && (
                  <div className="border border-zinc-200/80 rounded-2xl p-6 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-inner space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-150">MyClonedVoice v1</h4>
                      </div>
                      <span className="text-xs font-mono font-semibold text-green-600 dark:text-green-400">
                        {similarity}% Match
                      </span>
                    </div>

                    {/* Progress Matching Meter */}
                    <div className="w-full bg-zinc-100 rounded-full h-2 dark:bg-zinc-800">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${similarity}%` }}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button size="xs" variant="outline" className="flex-1 text-xs gap-1">
                        <span>Deploy Model</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Button>
                      <button
                        onClick={resetSimulation}
                        className="p-2 border border-zinc-200 rounded-lg hover:bg-red-50 hover:text-red-550 dark:border-zinc-800 dark:hover:bg-zinc-900 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Simulation command block */}
                {!isRecording && !recordingUploaded && (
                  <div className="flex flex-col gap-2">
                    <Button onClick={startRecordSimulation} className="w-full py-5 rounded-xl bg-indigo-600 hover:bg-indigo-650 text-white font-semibold">
                      <Mic className="h-4.5 w-4.5 mr-2" />
                      Record 15s Sample
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description Text Column */}
          <div className="order-1 lg:order-2 lg:col-span-6 space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-650 dark:text-violet-405">
              Voice Cloning Module
            </h2>
            <p className="text-3xl font-bold tracking-tight text-zinc-905 sm:text-4xl dark:text-zinc-50">
              Zero-Shot Vocal Cloning
            </p>
            <p className="text-lg text-zinc-620 dark:text-zinc-400 leading-relaxed">
              Create an identical voice model simply by uploading a brief sample of speech. Our zero-shot model constructs the voice vector without training delay.
            </p>

            <ul className="space-y-3 pt-2 text-sm text-zinc-650 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-indigo-505 dark:text-violet-400" />
                <span>Requires only 10-15 seconds of high-quality vocal samples.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-indigo-505 dark:text-violet-400" />
                <span>Synthesize natural vocal inflections, pacing, and organic breaths.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-indigo-505 dark:text-violet-400" />
                <span>Embedded watermarking and security checks prevent unauthorized voice spoofing.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
