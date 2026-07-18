import { FileText, Settings, Download } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <FileText className="h-6 w-6 text-indigo-600 dark:text-violet-400" />,
      title: "Input Text Script",
      desc: "Paste your audio scripts, articles, or books into our dashboard text editor or push data instantly using our REST API endpoint.",
    },
    {
      num: "02",
      icon: <Settings className="h-6 w-6 text-indigo-600 dark:text-violet-400" />,
      title: "Select or Clone a Voice",
      desc: "Choose from our high-fidelity library of voice profiles, adjust speech rates, or clone your voice by uploading a 15-second sound file.",
    },
    {
      num: "03",
      icon: <Download className="h-6 w-6 text-indigo-600 dark:text-violet-400" />,
      title: "Generate & Export",
      desc: "Our neural model synthesizes realistic speech waves within milliseconds. Preview the output file, share links, and download high-quality files.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-zinc-55/30 dark:bg-zinc-950 transition-colors border-y border-zinc-200/50 dark:border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-violet-400">
            Workflow Path
          </h2>
          <p className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            From Script to Natural Speech in 3 Steps
          </p>
          <p className="text-lg text-zinc-640 dark:text-zinc-400">
            Streamlined speech generation that simplifies bulk audio rendering for content teams and developer platforms.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector bars (visible on desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-y-12 -z-10" />

          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
              {/* Step indicator */}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white border-2 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 group-hover:border-indigo-500 dark:group-hover:border-violet-500 shadow-md transition-colors duration-300">
                {step.icon}
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold shadow dark:bg-violet-650">
                  {step.num}
                </span>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-150 pt-2">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
