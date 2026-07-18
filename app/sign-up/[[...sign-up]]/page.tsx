"use client"

import { SignUp } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import Link from "next/link"
import { AudioLines, Mic, Volume2 } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full select-none bg-zinc-950 text-white">
      {/* Left side: Premium Mockup (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-zinc-950 border-r border-zinc-900 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-100px] left-[-100px] h-[300px] w-[300px] bg-indigo-500/10 rounded-full filter blur-[80px]" />
        <div className="absolute bottom-[-100px] right-[-100px] h-[350px] w-[350px] bg-purple-500/10 rounded-full filter blur-[90px]" />

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group relative z-10 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-lg">
            <AudioLines className="h-5 w-5 text-indigo-650" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Resonance
          </span>
        </Link>

        {/* Pitch content */}
        <div className="space-y-8 relative z-10 max-w-md my-auto">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              Begin Synthesizing High-fidelity <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Voices</span>.
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed font-semibold">
              Join Resonance today and experience next-generation speech pipelines. Clone speaker presets and orchestrate audio files seamlessly.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-905">
            {/* Metric Card 1 */}
            <div className="flex gap-4 p-4 rounded-2xl border border-zinc-900 bg-zinc-900/40">
              <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                <Volume2 className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="font-bold text-xs">Dynamic Voice Modifiers</h4>
                <p className="text-[10px] text-zinc-500 mt-0.5">Preset accent parameters that adjust speed rates and pitch stability on the fly.</p>
              </div>
            </div>

            {/* Metric Card 2 */}
            <div className="flex gap-4 p-4 rounded-2xl border border-zinc-900 bg-zinc-900/40">
              <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <Mic className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="font-bold text-xs">Biometrics Encryption Safe</h4>
                <p className="text-[10px] text-zinc-500 mt-0.5">All voice parameters remain encrypted. Outputs are marked with verification compliance logs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-[10px] text-zinc-650 relative z-10 font-semibold uppercase tracking-wider">
          © 2026 Resonance AI Platform. Protected by Clerk Security.
        </div>
      </div>

      {/* Right side: centered sign-up card */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03),transparent_70%)] pointer-events-none" />

        {/* Mobile Header Branding */}
        <div className="lg:hidden mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black shadow-lg">
              <AudioLines className="h-4.5 w-4.5 text-indigo-650" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Resonance
            </span>
          </Link>
          <p className="text-[10px] text-zinc-450 mt-2">Create an account to start synthesizing voices</p>
        </div>

        {process.env.NEXT_PUBLIC_AUTH_BYPASS === "true" ? (
          <div className="w-full max-w-md border border-zinc-900 bg-zinc-950/80 shadow-2xl rounded-3xl p-8 space-y-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-505/10 rounded-full blur-xl pointer-events-none" />
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-bold tracking-tight text-white">Create Developer Account</h2>
              <p className="text-[10px] text-zinc-400">Offline Bypass mode is enabled in your environment variables</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Default Developer ID</label>
                <div className="py-2.5 px-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono">
                  john@resonance.ai
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Access Scope</label>
                <div className="py-2.5 px-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                  Full Authenticated Sandbox
                </div>
              </div>
            </div>

            <button
              onClick={() => window.location.href = "/dashboard"}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 cursor-pointer font-bold shadow-md text-xs transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Initialize Session Sandbox</span>
            </button>
          </div>
        ) : (
          <SignUp
            appearance={{
              baseTheme: dark,
              variables: {
                colorPrimary: "#6366f1",
                colorBackground: "#09090b",
              },
              elements: {
                card: "border border-zinc-900 bg-zinc-950/80 shadow-2xl rounded-3xl",
                footerActionLink: "text-indigo-400 hover:text-indigo-305 hover:underline",
                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2.5 cursor-pointer font-bold shadow-md",
              }
            } as React.ComponentProps<typeof SignUp>["appearance"]}
          />
        )}
      </div>
    </div>
  )
}
