"use client"

import * as React from "react"
import { Search, Heart, Play, Pause, ShieldCheck, Filter, Plus } from "lucide-react"
import Link from "next/link"

export default function VoiceLibraryPage() {
  const [search, setSearch] = React.useState("")
  const [filterType, setFilterType] = React.useState("ALL")
  const [playingName, setPlayingName] = React.useState<string | null>(null)
  const synthRef = React.useRef<SpeechSynthesis | null>(null)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  const initialSpeakers = [
    { name: "My Cloned Voice v1", lang: "English (US)", match: "99.4% Match", status: "Deployed", isCloned: true, type: "Executive" },
    { name: "Rachel (Narrator)", lang: "English (UK)", match: "Standard Preset", status: "Active", isCloned: false, type: "Narrative" },
    { name: "Adam (Developer)", lang: "English (US)", match: "Standard Preset", status: "Active", isCloned: false, type: "Technical" },
    { name: "Bella (Educator)", lang: "English (AU)", match: "Standard Preset", status: "Active", isCloned: false, type: "Educational" },
    { name: "Victor (Corporate)", lang: "English (US)", match: "Standard Preset", status: "Active", isCloned: false, type: "Business" },
    { name: "Elena (Casual)", lang: "Spanish (ES)", match: "Standard Preset", status: "Active", isCloned: false, type: "Conversational" },
  ]

  const handlePreview = (name: string, lang: string) => {
    if (!synthRef.current) return

    if (playingName === name) {
      synthRef.current.cancel()
      setPlayingName(null)
      return
    }

    synthRef.current.cancel() // stop any active speech
    
    // Choose appropriate greeting text
    const textDesc = `This is a preview of the ${name} voice model. Synthesized content is ready for generation.`
    const utterance = new SpeechSynthesisUtterance(textDesc)
    
    // Attempt to match matching voice in browser
    const systemVoices = synthRef.current.getVoices()
    const localeMap: Record<string, string> = { "English (US)": "en-US", "English (UK)": "en-GB", "English (AU)": "en-AU", "Spanish (ES)": "es-ES" }
    const matchLang = localeMap[lang] || "en"
    
    // Try to find a voice that matches language accent or default
    const matchedVoice = systemVoices.find(v => v.lang.startsWith(matchLang) || v.name.includes(name.split(" ")[0]))
    if (matchedVoice) {
      utterance.voice = matchedVoice
    }

    utterance.onend = () => {
      setPlayingName(null)
    }
    utterance.onerror = () => {
      setPlayingName(null)
    }

    setPlayingName(name)
    synthRef.current.speak(utterance)
  }

  React.useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  // Filtered speaker list
  const filteredSpeakers = initialSpeakers.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.type.toLowerCase().includes(search.toLowerCase())
    if (filterType === "ALL") return matchesSearch
    if (filterType === "CLONED") return matchesSearch && item.isCloned
    if (filterType === "PRESETS") return matchesSearch && !item.isCloned
    return matchesSearch
  })

  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-909 dark:text-white">Workspace: Custom Voice Library</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Preview standard presets vocoder models or manage your zero-shot voice clones.
          </p>
        </div>
        <Link
          href="/voice-cloning"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Clone New Voice</span>
        </Link>
      </div>

      {/* Toolbar controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-900 pb-4">
        {/* Search */}
        <div className="relative max-w-xs w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search voice names or styles..."
            className="w-full text-xs font-semibold rounded-xl border border-zinc-200 bg-white pl-9 pr-3 py-2 text-zinc-800 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter:</span>
          </span>
          <div className="flex bg-zinc-200/50 dark:bg-zinc-900 p-0.5 rounded-xl border border-zinc-200/40 dark:border-zinc-850">
            <button
              onClick={() => setFilterType("ALL")}
              className={`text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all ${
                filterType === "ALL"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              }`}
            >
              All Voices
            </button>
            <button
              onClick={() => setFilterType("CLONED")}
              className={`text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all ${
                filterType === "CLONED"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              }`}
            >
              Custom Clones
            </button>
            <button
              onClick={() => setFilterType("PRESETS")}
              className={`text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all ${
                filterType === "PRESETS"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              }`}
            >
              Presets
            </button>
          </div>
        </div>
      </div>

      {/* Roster of Speakers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpeakers.map((speaker, index) => (
          <div
            key={index}
            className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 relative overflow-hidden flex flex-col justify-between h-48 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all hover:shadow-sm leading-relaxed"
          >
            {/* Ambient indicator gradient for custom clones */}
            {speaker.isCloned && (
              <div className="absolute top-0 right-0 h-24 w-24 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_60%)] filter blur-md pointer-events-none" />
            )}

            <div>
              <div className="flex justify-between items-start">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  speaker.isCloned
                    ? "bg-indigo-50 text-indigo-700 dark:bg-violet-955/20 dark:text-violet-400"
                    : "bg-zinc-100 text-zinc-650 dark:bg-zinc-900 dark:text-zinc-400"
                }`}>
                  {speaker.isCloned ? "Custom Clone Voice" : "System Preset"}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-zinc-50 dark:bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded-md font-semibold">{speaker.type}</span>
                  <button className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer">
                    <Heart className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm mt-3">{speaker.name}</h4>
              <p className="text-xs text-zinc-500 mt-1">{speaker.lang}</p>
            </div>

            <div className="flex justify-between items-center border-t border-zinc-100 dark:border-zinc-900 pt-3 mt-4">
              <span className="text-[10px] text-zinc-450 dark:text-zinc-500 font-semibold uppercase">{speaker.match}</span>
              <div className="flex items-center gap-2">
                {/* Play Preview button */}
                <button
                  onClick={() => handlePreview(speaker.name, speaker.lang)}
                  className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    playingName === speaker.name
                      ? "bg-red-50 text-red-550 border-red-200 dark:bg-red-955/20 dark:text-red-400 dark:border-red-955"
                      : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  }`}
                  title="Audibly preview voice card"
                >
                  {playingName === speaker.name ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                </button>
                <span className="inline-flex items-center gap-1 text-[10px] text-green-600 dark:text-green-450 font-bold select-none">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{speaker.status}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
