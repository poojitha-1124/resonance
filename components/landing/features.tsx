import { CheckCircle2, Mic, Bot, Library, Cpu, SlidersHorizontal } from "lucide-react"

export function Features() {
  const items = [
    {
      icon: <Mic className="h-6 w-6 text-indigo-500 dark:text-violet-400" />,
      title: "Zero-Shot Voice Cloning",
      desc: "Instantly mimic any voice with a short audio specimen. Our neural network analyzes phonetic markers to construct identical synthesis models.",
    },
    {
      icon: <Bot className="h-6 w-6 text-indigo-500 dark:text-violet-400" />,
      title: "Expressive Tone Dynamics",
      desc: "Adjust speed, pitch, and voice expressions (whisper, excitement, professional narration) to fine-tune synthesized speech to your exact mood.",
    },
    {
      icon: <SlidersHorizontal className="h-6 w-6 text-indigo-500 dark:text-violet-400" />,
      title: "Configurable Speech Synthesizer",
      desc: "Full voice parameters controls. Adapt synthesis speeds, word spacing, and audio rendering codecs for seamless application execution.",
    },
    {
      icon: <Library className="h-6 w-6 text-indigo-500 dark:text-violet-400" />,
      title: "Omni-Library & Storage",
      desc: "Save your voice clones, prompt settings, and generated audio files. Stream clips, favorite records, and download lossy or lossless audio.",
    },
    {
      icon: <Cpu className="h-6 w-6 text-indigo-500 dark:text-violet-400" />,
      title: "Developer Integration Hub",
      desc: "Fully documented REST APIs, webhook triggers, and code SDKs that let developers connect Resonance text-to-speech to their pipeline in minutes.",
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-indigo-500 dark:text-violet-400" />,
      title: "Commercial Use Permissions",
      desc: "Own your generation files. Create podcasts, audiobooks, marketing material, video voiceovers, or game voice dynamics with complete rights.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white dark:bg-zinc-900 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-violet-400">
            Platform Capabilities
          </h2>
          <p className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Powered by Next-Gen Vocal Intelligence
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            From zero-shot voice replication to developer REST APIs, Resonance brings everything you need to scale human-realistic audio production.
          </p>
        </div>

        {/* Grid Area */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-zinc-200/60 bg-zinc-55/30 p-8 shadow-sm hover:shadow-md hover:border-indigo-400 dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-violet-550 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Outer light glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-violet-950/40 group-hover:scale-105 transition-transform duration-200 mb-6">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-150 mb-2 group-hover:text-indigo-600 dark:group-hover:text-violet-455 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
