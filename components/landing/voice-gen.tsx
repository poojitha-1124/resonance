"use client"

import * as React from "react"
import { Play, Square, Volume2, MessageSquareDot } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VoiceGen() {
  const [text, setText] = React.useState(
    "Welcome to Resonance. Type any script in this box, adjust the sliders, and click generate to test speech synthesis in real-time."
  )
  const [voiceName, setVoiceName] = React.useState("")
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([])
  const [rate, setRate] = React.useState(1.0)
  const [pitch, setPitch] = React.useState(1.0)
  const [isSpeaking, setIsSpeaking] = React.useState(false)
  const synthRef = React.useRef<SpeechSynthesis | null>(null)

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis
      
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices()
        setVoices(availableVoices.filter(v => v.lang.includes("en")))
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

  return (
    <section className="py-20 bg-zinc-55/20 dark:bg-zinc-950 border-t border-zinc-200/50 dark:border-zinc-900 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-650 dark:text-violet-405">
            Voice Generation Module
          </h2>
          <p className="text-3xl font-bold tracking-tight text-zinc-905 sm:text-4xl dark:text-zinc-50">
            Synthesize Conversational Audio
          </p>
          <p className="text-lg text-zinc-620 dark:text-zinc-400">
            Write or paste copy, pick natural voice contours, and test the speech characteristics dynamically.
          </p>
        </div>

        {/* Panel Container */}
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 border border-zinc-200/80 rounded-3xl bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950/60 shadow-xl backdrop-blur-md">
          {/* Controls Box */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                <MessageSquareDot className="h-4 w-4 text-indigo-500 dark:text-violet-405" />
                <span>Text Script</span>
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                maxLength={450}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800 focus:border-indigo-500 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-violet-500 transition-colors"
                placeholder="Enter character script..."
              />
              <div className="flex justify-end text-[10px] text-zinc-400">
                {text.length}/450 characters
              </div>
            </div>

            {/* Config parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Voice selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider">
                  Speaker Preset
                </label>
                <select
                  value={voiceName}
                  onChange={(e) => setVoiceName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-zinc-850 focus:border-indigo-500 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-150 dark:focus:border-violet-500"
                >
                  {voices.length > 0 ? (
                    voices.map((v, i) => (
                      <option key={i} value={v.name}>
                        {v.name.replace("Microsoft", "").trim()} ({v.lang})
                      </option>
                    ))
                  ) : (
                    <option value="">Default Browser Voice</option>
                  )}
                </select>
              </div>

              {/* Sliders bundle */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-500">Speed Rate</span>
                    <span className="font-mono text-zinc-650 dark:text-zinc-400">{rate}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600 dark:accent-violet-505"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-500">Vocal Pitch</span>
                    <span className="font-mono text-zinc-650 dark:text-zinc-400">{pitch}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600 dark:accent-violet-505"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Output Card */}
          <div className="md:col-span-5 flex flex-col justify-between rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-900/60 border border-zinc-150 dark:border-zinc-850">
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-605 dark:bg-violet-950/40 dark:text-violet-400 shadow-sm">
                <Volume2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-905 dark:text-zinc-150">Voice Output Spec</h3>
              <p className="text-xs text-zinc-500 leading-relaxed dark:text-zinc-400">
                Click play below to synthesize the text on your local browser engine.
              </p>
            </div>

            {/* Vocal bounce graph */}
            <div className="my-8 flex justify-center items-end gap-1 h-8">
              {[2, 4, 3, 5, 2, 4, 3, 6, 8, 3, 5, 2, 4, 3, 5, 2].map((height, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full bg-indigo-505 dark:bg-violet-455 transition-all duration-300 ${
                    isSpeaking ? "animate-pulse" : "opacity-40"
                  }`}
                  style={{
                    height: `${isSpeaking ? height * 4 : 6}px`,
                    animationDelay: `${i * 40}ms`,
                  }}
                />
              ))}
            </div>

            <Button
              onClick={handleSpeak}
              className={`w-full py-6 rounded-xl font-bold shadow-md gap-2 ${
                isSpeaking
                  ? "bg-red-500 hover:bg-red-650 text-white dark:bg-red-600 dark:hover:bg-red-750"
                  : "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
              }`}
            >
              {isSpeaking ? (
                <>
                  <Square className="h-4 w-4 fill-white text-white" />
                  <span>Stop Speech</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-current" />
                  <span>Synthesize Preview</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
