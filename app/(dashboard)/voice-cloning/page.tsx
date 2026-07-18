import { Sparkles, Mic, FileAudio, ShieldAlert } from "lucide-react"

export default function VoiceCloningPage() {
  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Zero-Shot Voice Cloning</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Profile your vocal embeddings by uploading short speaker speech logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main layout workspace */}
        <div className="lg:col-span-8 border border-zinc-200 bg-white p-8 rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 h-40 w-40 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent_60%)] filter blur-md" />

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-500">
              <Mic className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-905 dark:text-zinc-150 text-sm">Vocal Vector Workspace</h3>
              <p className="text-xs text-zinc-450 dark:text-zinc-500 mt-0.5">Capture, clean, and profile organic speech samples</p>
            </div>
          </div>

          <div className="border border-dashed border-zinc-200 dark:border-zinc-850 rounded-2xl p-16 text-center space-y-4">
            <FileAudio className="mx-auto h-10 w-10 text-zinc-350 dark:text-zinc-700 animate-pulse" />
            <h4 className="font-bold text-zinc-800 dark:text-zinc-300 text-sm">Vocal Profiler Pending</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
              This panel will handle speaker recording, upload processing, and match checking. Integration with zero-shot cloning architectures will launch in this screen in future modules.
            </p>
          </div>
        </div>

        {/* Informational column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 border border-zinc-200 bg-white rounded-2xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-650 dark:text-violet-405 uppercase tracking-wide">
              <ShieldAlert className="h-4.5 w-4.5" />
              <span>Safety & Biometrics</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We embed unique audio watermarks inside finished speaker vectors. Users can only clone voice profiles for which they possess verbal authorization or direct recording rights.
            </p>
          </div>

          <div className="p-5 border border-zinc-205 bg-indigo-500/5 rounded-2xl border-indigo-500/10 dark:bg-violet-950/5 dark:border-violet-900/10 space-y-2">
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-700 dark:text-violet-400 uppercase tracking-wide">
              <Sparkles className="h-4 w-4" />
              <span>Optimizing Matching</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              For best results, record scripts inside quiet places using high-quality boundary microphones.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
