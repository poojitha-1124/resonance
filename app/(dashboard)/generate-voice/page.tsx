"use client"

import * as React from "react"
import { Play, Square, Sliders, Info, Sparkles, Wand2, FileText } from "lucide-react"

export default function GenerateVoicePage() {
  const [text, setText] = React.useState(
    "Type any speech script in this editor window. Resonance will compile your script into natural vocal cadence dynamically."
  )
  const [voiceName, setVoiceName] = React.useState("")
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([])
  const [rate, setRate] = React.useState(1.0)
  const [pitch, setPitch] = React.useState(1.0)
  const [isSpeaking, setIsSpeaking] = React.useState(false)
  const [accentFilter, setAccentFilter] = React.useState("ALL")
  const synthRef = React.useRef<SpeechSynthesis | null>(null)

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis
      
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices()
        // Filter english voices as base
        setVoices(availableVoices.filter(v => v.lang.includes("en") || v.lang.includes("es") || v.lang.includes("fr")))
        if (availableVoices.length > 0 && !voiceName) {
          const defaultVoice = availableVoices.find(v => v.lang.startsWith("en")) || availableVoices[0]
          setVoiceName(defaultVoice.name)
        }
      }

      loadVoices()
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices
      }
    }
  }, [voiceName])

  const handleSpeak = () => {
    if (!synthRef.current) return

    if (isSpeaking) {
      synthRef.current.cancel()
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    const selected = voices.find((v) => v.name === voiceName)
    if (selected) {
      utterance.voice = selected
    }
    utterance.rate = rate
    utterance.pitch = pitch

    utterance.onend = () => {
      setIsSpeaking(false)
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
    }

    setIsSpeaking(true)
    synthRef.current.speak(utterance)
  }

  React.useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  // Filter voices based on accent choice
  const filteredVoices = voices.filter(v => {
    if (accentFilter === "ALL") return true
    if (accentFilter === "US") return v.lang.includes("US")
    if (accentFilter === "GB") return v.lang.includes("GB") || v.lang.includes("UK")
    return true
  })

  // Quick script helpers
  const applyPreset = (presetText: string) => {
    setText(presetText)
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-909 dark:text-white">Workspace: Speech Synthesizer</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Synthesize high-fidelity voice profiles from scripts using custom accent parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Script Input & Parameters (8 cols) */}
        <div className="lg:col-span-8 border border-zinc-200 bg-white p-6 rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 h-40 w-40 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.04),transparent_60%)] filter blur-md pointer-events-none" />

          {/* Script Input Panel */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-indigo-500" />
                <span>Text Script Editor</span>
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => applyPreset("This is a marketing announcement. Resonance simplifies vocal production pipelines.")}
                  className="text-[10px] font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-850 px-2.5 py-1 rounded-lg"
                >
                  Promo Script
                </button>
                <button
                  onClick={() => applyPreset("Welcome back student. Today we are exploring the foundational concepts of audio vocoding.")}
                  className="text-[10px] font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-850 px-2.5 py-1 rounded-lg"
                >
                  Edu Script
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={2000}
              rows={6}
              placeholder="Start drafting your audio script here..."
              className="w-full text-xs font-medium rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 text-zinc-805 focus:border-indigo-500 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900/60 dark:text-zinc-150 dark:focus:border-violet-500 resize-none leading-relaxed transition-all"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-semibold px-1">
              <span>SpeechSynthesis API Active</span>
              <span>{text.length}/2000 characters</span>
            </div>
          </div>

          {/* Parameters sliders */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 space-y-6">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="h-4 w-4 text-indigo-500" />
              <span>Voice Controls</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Speed Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-600 dark:text-zinc-400">Tempo (Rate)</span>
                  <span className="font-mono text-indigo-500">{rate.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full h-1 bg-zinc-250 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-650 dark:accent-violet-500"
                />
              </div>

              {/* Pitch Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-600 dark:text-zinc-400">Tone (Pitch)</span>
                  <span className="font-mono text-indigo-500">{pitch.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full h-1 bg-zinc-250 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-650 dark:accent-violet-500"
                />
              </div>
            </div>
          </div>

          {/* Action Synthesis controls */}
          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-550 dark:text-zinc-400 font-semibold">Speaker Profile:</span>
              <select
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
                className="text-xs font-semibold rounded-xl border border-zinc-200 bg-white p-2.5 dark:border-zinc-850 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-150 focus:outline-none"
              >
                {filteredVoices.length === 0 ? (
                  <option>Loading Local Voices...</option>
                ) : (
                  filteredVoices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))
                )}
              </select>
            </div>

            <button
              onClick={handleSpeak}
              disabled={!text.trim()}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white transition-all shadow-md cursor-pointer ${
                isSpeaking
                  ? "bg-red-500 hover:bg-red-600 shadow-red-500/10"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/10 dark:bg-violet-600 dark:hover:bg-violet-700"
              }`}
            >
              {isSpeaking ? (
                <>
                  <Square className="h-4 w-4 fill-current" />
                  <span>Stop Synthesis</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-current" />
                  <span>Generate Speech</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Informational feeds & accent filters (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Accent categories */}
          <div className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-405 dark:text-zinc-500 uppercase tracking-wide">
              <Wand2 className="h-4 w-4 text-indigo-500" />
              <span>Accent Regions</span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setAccentFilter("ALL")}
                className={`w-full text-left text-xs font-bold p-3 rounded-xl border transition-all ${
                  accentFilter === "ALL"
                    ? "bg-indigo-50/50 border-indigo-200 text-indigo-700 dark:bg-violet-955/15 dark:border-violet-900/35 dark:text-violet-400"
                    : "border-zinc-150 bg-zinc-50/20 hover:bg-zinc-50 dark:border-zinc-900 dark:bg-transparent"
                }`}
              >
                All Available Local Voices
              </button>
              <button
                onClick={() => setAccentFilter("US")}
                className={`w-full text-left text-xs font-bold p-3 rounded-xl border transition-all ${
                  accentFilter === "US"
                    ? "bg-indigo-50/50 border-indigo-200 text-indigo-700 dark:bg-violet-955/15 dark:border-violet-900/35 dark:text-violet-400"
                    : "border-zinc-150 bg-zinc-50/20 hover:bg-zinc-50 dark:border-zinc-900 dark:bg-transparent"
                }`}
              >
                US Regional Voces
              </button>
              <button
                onClick={() => setAccentFilter("GB")}
                className={`w-full text-left text-xs font-bold p-3 rounded-xl border transition-all ${
                  accentFilter === "GB"
                    ? "bg-indigo-50/50 border-indigo-200 text-indigo-700 dark:bg-violet-955/15 dark:border-violet-900/35 dark:text-violet-400"
                    : "border-zinc-150 bg-zinc-50/20 hover:bg-zinc-50 dark:border-zinc-900 dark:bg-transparent"
                }`}
              >
                UK & British Voces
              </button>
            </div>
          </div>

          {/* Quick Guide and safety warning */}
          <div className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-650 dark:text-violet-405 uppercase tracking-wide">
              <Info className="h-4.5 w-4.5" />
              <span>Synthesis Guidelines</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
              Separate paragraph scripts with proper commas or periods. Spikes in pitch can be moderated using custom model layers in future builds.
            </p>
          </div>

          <div className="p-5 border border-indigo-500/10 bg-indigo-500/5 rounded-3xl dark:border-violet-900/10 dark:bg-violet-950/5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-violet-400 uppercase tracking-wide">
              <Sparkles className="h-4 w-4" />
              <span>Neural Presets</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Synthesized audios can be downloaded from your <strong>Audio History</strong> drawer automatically on completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
