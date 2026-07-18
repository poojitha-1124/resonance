import { Key, Shield, Eye, Volume2 } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Account Settings</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Customize options, configure API credentials, and review permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings panels */}
        <div className="lg:col-span-8 border border-zinc-200 bg-white p-6 rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 space-y-6">
          {/* API keys configuration */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-indigo-500" />
              <h3 className="font-bold text-zinc-900 dark:text-zinc-150 text-sm">Developer API Settings</h3>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Secret API Key</label>
              <div className="relative max-w-md">
                <input
                  type="password"
                  readOnly
                  value="res_live_79a32bc56ee3b1a92e1069aa"
                  className="w-full text-xs rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 pr-10 text-zinc-800 dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 focus:outline-none font-mono"
                />
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-650 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[10px] text-zinc-500">Provide direct integration slots inside your code models using this endpoints secret.</p>
            </div>
          </div>

          {/* Preferences */}
          <div className="pt-6 border-t border-zinc-150 dark:border-zinc-900 space-y-4">
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-indigo-500" />
              <h3 className="font-bold text-zinc-900 dark:text-zinc-150 text-sm">Synthesis Settings</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-55/20 border border-zinc-200/50 dark:bg-zinc-900/30 dark:border-zinc-850">
                <div>
                  <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-200">Auto Watermarking</h4>
                  <p className="text-[10px] text-zinc-500">Automatically seal voice profiles verification logs inside completed files exports.</p>
                </div>
                <div className="h-5 w-9 rounded-full bg-indigo-600 p-0.5 cursor-pointer flex justify-end">
                  <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informational columns */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 border border-zinc-205 bg-indigo-500/5 rounded-2xl border-indigo-500/10 dark:bg-violet-950/5 dark:border-violet-900/10 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-violet-405 uppercase tracking-wide">
              <Shield className="h-4.5 w-4.5" />
              <span>Permission Lock</span>
            </div>
            <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-medium">
              API changes and key regenerations require logging back. Access credentials expire dynamically every 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
