import { Zap } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">My Profile</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Manage your account credentials, view memberships, and track usage data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Card & Details Form */}
        <div className="lg:col-span-8 border border-zinc-200 bg-white p-6 rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-zinc-150 dark:border-zinc-900">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-650 flex items-center justify-center text-white font-extrabold text-xl">
              JD
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">John Doe</h3>
              <p className="text-xs text-zinc-500">john@resonance.ai</p>
            </div>
          </div>

          {/* Dummy Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Full Name</label>
              <input
                type="text"
                readOnly
                value="John Doe"
                className="w-full text-xs rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 text-zinc-800 dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Email Address</label>
              <input
                type="text"
                readOnly
                value="john@resonance.ai"
                className="w-full text-xs rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 text-zinc-800 dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Member Package Scope info card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 border border-zinc-200 bg-white rounded-2xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-500">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Premium Plan</h4>
                <p className="text-[10px] text-zinc-500">Auto-renews Aug 1, 2026</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-900">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Monthly Usage</span>
                <span className="font-semibold font-mono text-zinc-800 dark:text-zinc-200">28.3%</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-1.5 dark:bg-zinc-800">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: "28.3%" }} />
              </div>
              <p className="text-[10px] text-zinc-500">42,500 of 150,000 characters generated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
