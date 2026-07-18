import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section id="pricing" className="py-20 bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-900 px-8 py-16 shadow-2xl dark:bg-zinc-900 border border-zinc-800 text-center space-y-8">
          {/* Accent glow bubbles */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.15),transparent_60%)] filter blur-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.08),transparent_60%)] filter blur-3xl pointer-events-none animate-pulse" />

          {/* Icon indicator */}
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-indigo-400 border border-zinc-700 shadow shadow-indigo-500/20">
            <Sparkles className="h-5 w-5" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to give your ideas a voice?
          </h2>
          <p className="mx-auto max-w-xl text-zinc-400 text-sm leading-relaxed">
            Join thousands of students, creators, and developers who trust Resonance to synthesize custom voices in real-time. Start generation on our free tier today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full rounded-xl border border-zinc-750 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 shadow-inner focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800"
            />
            <Button className="w-full sm:w-auto px-6 py-3 font-semibold bg-white text-zinc-900 hover:bg-zinc-150 transition-colors shadow">
              <span>Sign Up Free</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>

          <p className="text-[10px] text-zinc-500 tracking-wide uppercase">
            No credit card required • Instant dashboard preview access
          </p>
        </div>
      </div>
    </section>
  )
}
