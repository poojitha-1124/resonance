"use client"

import * as React from "react"
import { Search, Heart, Play, Pause, ShieldCheck, Filter, Plus, Mic, HelpCircle } from "lucide-react"
import Link from "next/link"

interface VoiceProfileType {
  id: string
  userId: string
  name: string
  type: string // "PRESET" or "CLONED"
  description: string | null
  audioUrl: string | null
  status: string // "ACTIVE", "PROCESSING", "FAILED"
  createdAt: Date | string
  updatedAt: Date | string
}

interface VoiceLibraryClientProps {
  voiceProfiles: VoiceProfileType[]
}

// Maps voice names to their appropriate local accent indicator representation
function getVoiceLanguage(name: string): string {
  const lowercaseName = name.toLowerCase()
  if (lowercaseName.includes("rachel")) return "English (UK)"
  if (lowercaseName.includes("adam")) return "English (US)"
  if (lowercaseName.includes("bella")) return "English (AU)"
  if (lowercaseName.includes("victor")) return "English (US)"
  if (lowercaseName.includes("elena")) return "Spanish (ES)"
  return "English (US)"
}

export function VoiceLibraryClient({ voiceProfiles }: VoiceLibraryClientProps) {
  const [search, setSearch] = React.useState("")
  const [filterType, setFilterType] = React.useState<"ALL" | "PRESETS" | "CLONED">("ALL")
  const [playingName, setPlayingName] = React.useState<string | null>(null)
  const synthRef = React.useRef<SpeechSynthesis | null>(null)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  const handlePreview = (name: string) => {
    if (!synthRef.current) return

    if (playingName === name) {
      synthRef.current.cancel()
      setPlayingName(null)
      return
    }

    synthRef.current.cancel() // stop any active speech
    
    const textDesc = `This is a preview of the ${name} voice model. Synthesized content is ready for generation.`
    const utterance = new SpeechSynthesisUtterance(textDesc)
    
    const systemVoices = synthRef.current.getVoices()
    const mappedLang = getVoiceLanguage(name)
    const localeMap: Record<string, string> = { 
      "English (US)": "en-US", 
      "English (UK)": "en-GB", 
      "English (AU)": "en-AU", 
      "Spanish (ES)": "es-ES" 
    }
    const matchLang = localeMap[mappedLang] || "en"
    
    const matchedVoice = systemVoices.find(v => 
      v.lang.startsWith(matchLang) || v.name.toLowerCase().includes(name.split(" ")[0].toLowerCase())
    )
    
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

  // Filter voices based on search and type
  const presetsList = voiceProfiles.filter(voice => {
    const isPreset = voice.type === "PRESET"
    const matchesSearch = voice.name.toLowerCase().includes(search.toLowerCase()) || 
      (voice.description && voice.description.toLowerCase().includes(search.toLowerCase()))
    return isPreset && matchesSearch
  })

  const clonedList = voiceProfiles.filter(voice => {
    const isCloned = voice.type === "CLONED"
    const matchesSearch = voice.name.toLowerCase().includes(search.toLowerCase()) || 
      (voice.description && voice.description.toLowerCase().includes(search.toLowerCase()))
    return isCloned && matchesSearch
  })

  // Format date readable
  const formatDate = (dateValue: Date | string) => {
    return new Date(dateValue).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Workspace: Custom Voice Library</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Preview standard presets vocoder models or manage your zero-shot voice clones.
          </p>
        </div>
        <Link
          href="/voice-cloning"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md transition-all cursor-pointer"
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
            className="w-full text-xs font-semibold rounded-xl border border-zinc-200 bg-white pl-9 pr-3 py-2 text-zinc-800 focus:outline-none dark:border-zinc-850 dark:bg-zinc-909 dark:text-zinc-100 dark:focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 dark:text-zinc-550 font-bold uppercase tracking-wider flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter Category:</span>
          </span>
          <div className="flex bg-zinc-200/50 dark:bg-zinc-900 p-0.5 rounded-xl border border-zinc-200/40 dark:border-zinc-850">
            <button
              onClick={() => setFilterType("ALL")}
              className={`text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                filterType === "ALL"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-350"
              }`}
            >
              All Voices
            </button>
            <button
              onClick={() => setFilterType("PRESETS")}
              className={`text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                filterType === "PRESETS"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-105"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-350"
              }`}
            >
              System Presets
            </button>
            <button
              onClick={() => setFilterType("CLONED")}
              className={`text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                filterType === "CLONED"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-105"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-350"
              }`}
            >
              Custom Clones
            </button>
          </div>
        </div>
      </div>

      {/* Grid Roster Sections */}
      <div className="space-y-10">
        
        {/* Section 1: Presets */}
        {(filterType === "ALL" || filterType === "PRESETS") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-l-2 border-indigo-500 pl-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-640 dark:text-zinc-400">System Preset Voices</h3>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 font-bold px-2 py-0.5 rounded-md">
                {presetsList.length} Vocals Available
              </span>
            </div>

            {presetsList.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 border border-dashed border-zinc-200 dark:border-zinc-850 rounded-3xl bg-zinc-50/20 text-center space-y-2">
                <HelpCircle className="h-6 w-6 text-zinc-400" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">No preset voices match your search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {presetsList.map((voice) => (
                  <div
                    key={voice.id}
                    className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 relative overflow-hidden flex flex-col justify-between h-48 hover:border-zinc-320 dark:hover:border-zinc-800 transition-all hover:shadow-xs leading-relaxed"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 text-zinc-650 dark:bg-zinc-900/80 dark:text-zinc-400">
                          System Preset
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] bg-zinc-50 dark:bg-zinc-900 text-zinc-505 px-2 py-0.5 rounded-md font-semibold">
                            Preset Model
                          </span>
                          <button className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer" aria-label="Favorite preset">
                            <Heart className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-bold text-zinc-909 dark:text-zinc-100 text-sm mt-3">{voice.name}</h4>
                      <p className="text-xs text-zinc-500 mt-1">{getVoiceLanguage(voice.name)}</p>
                      {voice.description && (
                        <p className="text-[10px] text-zinc-450 dark:text-zinc-500 mt-1.5 line-clamp-2">
                          {voice.description}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between items-center border-t border-zinc-100 dark:border-zinc-900 pt-3 mt-4">
                      <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                        Sample: Browser Engine
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePreview(voice.name)}
                          className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                            playingName === voice.name
                              ? "bg-red-50 text-red-550 border-red-200 dark:bg-red-955/20 dark:text-red-400 dark:border-red-955"
                              : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                          }`}
                          title="Preview voice sample via speech synthesis"
                        >
                          {playingName === voice.name ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                        </button>
                        
                        <span className="inline-flex items-center gap-1 text-[10px] text-green-600 dark:text-green-450 font-bold select-none">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>Active</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Section 2: Custom Clones */}
        {(filterType === "ALL" || filterType === "CLONED") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-l-2 border-indigo-500 pl-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-640 dark:text-zinc-400">Custom Cloned Voices</h3>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 font-bold px-2 py-0.5 rounded-md">
                {clonedList.length} Clones Found
              </span>
            </div>

            {clonedList.length === 0 ? (
              /* Custom empty state when there are zero cloned models created yet */
              <div className="flex flex-col items-center justify-center p-10 border border-dashed border-zinc-200 dark:border-zinc-850 rounded-3xl bg-white dark:bg-zinc-950/20 text-center space-y-5 shadow-sm max-w-2xl mx-auto">
                <div className="p-4 bg-indigo-50/50 dark:bg-zinc-900 rounded-full text-indigo-650 dark:text-indigo-400 mt-2">
                  <Mic className="h-8 w-8" />
                </div>
                
                <div className="space-y-1.5 max-w-md">
                  <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">No Custom Clones Found</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
                    You haven&apos;t created any custom voices yet. Start cloning your voice to personalize your AI experience.
                  </p>
                </div>

                <Link
                  href="/voice-cloning"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-all mb-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Go to Voice Cloning</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {clonedList.map((voice) => (
                  <div
                    key={voice.id}
                    className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 relative overflow-hidden flex flex-col justify-between h-48 hover:border-zinc-320 dark:hover:border-zinc-800 transition-all hover:shadow-xs leading-relaxed"
                  >
                    {/* Ambient glow highlight effect for cloned profiles */}
                    <div className="absolute top-0 right-0 h-24 w-24 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_60%)] filter blur-md pointer-events-none" />

                    <div>
                      <div className="flex justify-between items-start">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-955/20 dark:text-indigo-400">
                          Custom Clone
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] bg-zinc-50 dark:bg-zinc-900 text-zinc-505 px-2 py-0.5 rounded-md font-semibold">
                            {formatDate(voice.createdAt)}
                          </span>
                          <button className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer" aria-label="Favorite custom voice">
                            <Heart className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-bold text-zinc-909 dark:text-zinc-100 text-sm mt-3">{voice.name}</h4>
                      <p className="text-xs text-zinc-500 mt-1">{getVoiceLanguage(voice.name)}</p>
                      {voice.description && (
                        <p className="text-[10px] text-zinc-450 dark:text-zinc-500 mt-1.5 line-clamp-2">
                          {voice.description}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between items-center border-t border-zinc-100 dark:border-zinc-900 pt-3 mt-4">
                      <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                        {voice.audioUrl ? "Sample: File Verified" : "Sample: Mic Recorded"}
                      </span>
                      <div className="flex items-center gap-2">
                        {/* Previews are using SpeechSynthesis on browser model for preview play mock */}
                        <button
                          onClick={() => handlePreview(voice.name)}
                          className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                            playingName === voice.name
                              ? "bg-red-50 text-red-550 border-red-200 dark:bg-red-955/20 dark:text-red-400 dark:border-red-955"
                              : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                          }`}
                          title="Preview custom synthesis"
                          disabled={voice.status !== "ACTIVE"}
                        >
                          {playingName === voice.name ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                        </button>
                        
                        {voice.status === "ACTIVE" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-green-600 dark:text-green-450 font-bold select-none">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>Deployed</span>
                          </span>
                        ) : voice.status === "PROCESSING" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-500 font-bold select-none animate-pulse">
                            <span>Processing...</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] text-red-500 font-bold select-none">
                            <span>Failed</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
