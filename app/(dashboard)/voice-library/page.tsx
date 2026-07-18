import { Search, ShieldCheck, Heart } from "lucide-react"

export default function VoiceLibraryPage() {
  const customSpeakers = [
    { name: "MyClonedVoice v1", lang: "English (US)", match: "99.4%", status: "Deployed", isCloned: true },
    { name: "Rachel (Narrator)", lang: "English (UK)", match: "Standard Presets", status: "Active", isCloned: false },
    { name: "Adam (Developer)", lang: "English (US)", match: "Standard Presets", status: "Active", isCloned: false },
    { name: "Bella (Educator)", lang: "English (AU)", match: "Standard Presets", status: "Active", isCloned: false },
  ]

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Voice Library</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Manage system preset voices or review your custom speaker models.
        </p>
      </div>

      {/* Toolbar layout */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-900 pb-4">
        <div className="relative max-w-xs w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="search"
            placeholder="Filter speaker styles..."
            className="w-full text-xs rounded-xl border border-zinc-200 bg-white pl-9 pr-3 py-2 text-zinc-800 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>

        <div className="flex gap-2">
          <button className="text-xs px-3 py-2 rounded-lg bg-zinc-900 text-white font-bold dark:bg-white dark:text-black">All Models</button>
          <button className="text-xs px-3 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors">Custom Clones</button>
          <button className="text-xs px-3 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors">Favorites</button>
        </div>
      </div>

      {/* Grid Collections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {customSpeakers.map((speaker, index) => (
          <div
            key={index}
            className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 relative overflow-hidden flex flex-col justify-between h-44 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all hover:shadow-sm"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  speaker.isCloned
                    ? "bg-indigo-50 text-indigo-700 dark:bg-violet-955/20 dark:text-violet-400"
                    : "bg-zinc-150 text-zinc-650 dark:bg-zinc-900 dark:text-zinc-400"
                }`}>
                  {speaker.isCloned ? "Custom Clone" : "System Preset"}
                </span>
                <button className="text-zinc-400 hover:text-red-500 transition-colors">
                  <Heart className="h-4.5 w-4.5" />
                </button>
              </div>

              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm mt-3">{speaker.name}</h4>
              <p className="text-xs text-zinc-500 mt-0.5">{speaker.lang}</p>
            </div>

            <div className="flex justify-between items-center border-t border-zinc-100 dark:border-zinc-900 pt-3">
              <span className="text-[10px] text-zinc-450 dark:text-zinc-500 font-semibold uppercase">{speaker.match}</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-green-600 dark:text-green-400 font-bold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{speaker.status}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
