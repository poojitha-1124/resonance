import { Shield, Zap } from "lucide-react"

export function WhyChoose() {
  const stats = [
    {
      metric: "< 150ms",
      title: "Real-time Latency",
      desc: "Our high-throughput server architecture guarantees near-instant audio generation, keeping response time under 150ms.",
    },
    {
      metric: "99.8%",
      title: "Cloning Matching",
      desc: "Phenotypical analysis ensures cloned audio captures specific mouth clicks, accent attributes, and emotional breathing patterns.",
    },
    {
      metric: "40+",
      title: "Language Models",
      desc: "Speak worldwide. Build localization models with native pronunciation across 40 global languages and dial-in dialects.",
    },
    {
      metric: "99.99%",
      title: "System Uptime",
      desc: "Enterprise-grade load balancers distribute requests securely to prevent outages, ensuring continuous synthesis delivery.",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-zinc-900 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main info column */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-650 dark:text-violet-405">
              Architectural Edge
            </h2>
            <p className="text-3xl font-bold tracking-tight text-zinc-905 sm:text-4xl dark:text-zinc-50">
              Why Professionals and Developers Choose Resonance
            </p>
            <p className="text-zinc-620 dark:text-zinc-400">
              By combining state-of-the-art vocoders and robust cloud infrastructure, Resonance sets the standard for production-ready custom vocal scaling.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 mt-1 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-150 text-sm">Security First Cloning</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Biometric tags are embedded into custom cloned profiles to prevent unauthorized voice duplication.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 mt-1 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-violet-950/30 dark:text-violet-400">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-150 text-sm">Zero API Cold Starts</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Pre-heated server nodes process voice syntheses synchronously without response lags.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Grid columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-zinc-55/40 border border-zinc-200/50 p-6 rounded-2xl dark:bg-zinc-950/40 dark:border-zinc-800 shadow-sm"
              >
                <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-650 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                  {stat.metric}
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-150 mt-2 text-sm">{stat.title}</h3>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1 leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
