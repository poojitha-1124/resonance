"use client"

import * as React from "react"
import { Key, Shield, Eye, EyeOff, Copy, Check, Volume2, HelpCircle } from "lucide-react"

export default function SettingsPage() {
  const [apiKey, setApiKey] = React.useState("res_live_79a32bc56ee3b1a92e1069aa")
  const [showKey, setShowKey] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  
  // Preference states
  const [watermarking, setWatermarking] = React.useState(true)
  const [accentMatching, setAccentMatching] = React.useState(false)
  const [sampleRate, setSampleRate] = React.useState("44100")

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRegenerateKey = () => {
    const confirmation = window.confirm("Regenerating the API Key will void any active integrations. Do you wish to continue?")
    if (confirmation) {
      const newKey = "res_live_" + Array.from({length: 24}, () => Math.random().toString(36)[2]).join('')
      setApiKey(newKey)
    }
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-909 dark:text-white">Workspace Configuration</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Customize options, configure API credentials, and review permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings panels (8 cols) */}
        <div className="lg:col-span-8 border border-zinc-200 bg-white p-6 rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 space-y-6">
          {/* API keys configuration */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-indigo-500" />
              <h3 className="font-bold text-zinc-900 dark:text-zinc-150 text-sm">Developer API Settings</h3>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Secret API Key</label>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative max-w-md w-full">
                  <input
                    type={showKey ? "text" : "password"}
                    readOnly
                    value={apiKey}
                    className="w-full text-xs rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 pr-10 text-zinc-800 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 font-mono"
                  />
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-650 transition-colors cursor-pointer"
                    title={showKey ? "Hide API key" : "Show API key"}
                  >
                    {showKey ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-330 cursor-pointer"
                    title="Copy API key to clipboard"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>

                  <button
                    onClick={handleRegenerateKey}
                    className="text-xs font-bold border border-zinc-200 hover:bg-zinc-50 bg-white text-zinc-700 dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-150 dark:hover:bg-zinc-800 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Regenerate Key
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-zinc-500 font-medium">Provide direct integration slots inside your code models using this endpoints secret.</p>
            </div>
          </div>

          {/* Preferences */}
          <div className="pt-6 border-t border-zinc-150 dark:border-zinc-900 space-y-6">
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-indigo-500" />
              <h3 className="font-bold text-zinc-900 dark:text-zinc-150 text-sm">Synthesis Defaults</h3>
            </div>

            <div className="space-y-4">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50/50 border border-zinc-200/50 dark:bg-zinc-900/30 dark:border-zinc-850">
                <div>
                  <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-200">Auto Watermarking</h4>
                  <p className="text-[10px] text-zinc-550 dark:text-zinc-400">Automatically seal voice profiles verification logs inside completed files exports.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setWatermarking(!watermarking)}
                  className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    watermarking ? "bg-indigo-600 dark:bg-violet-650" : "bg-zinc-300 dark:bg-zinc-800"
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-250 ${
                    watermarking ? "translate-x-4" : "translate-x-0"
                  }`} />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50/50 border border-zinc-200/50 dark:bg-zinc-900/30 dark:border-zinc-850">
                <div>
                  <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-200">Accent Normalization</h4>
                  <p className="text-[10px] text-zinc-550 dark:text-zinc-400">Force vocoder models to match local accent rules strictly.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAccentMatching(!accentMatching)}
                  className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    accentMatching ? "bg-indigo-600 dark:bg-violet-650" : "bg-zinc-300 dark:bg-zinc-800"
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-250 ${
                    accentMatching ? "translate-x-4" : "translate-x-0"
                  }`} />
                </button>
              </div>

              {/* Dropdown */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50/50 border border-zinc-200/50 dark:bg-zinc-900/30 dark:border-zinc-850">
                <div>
                  <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-200">Sampling Rate</h4>
                  <p className="text-[10px] text-zinc-550 dark:text-zinc-400">Default audio rendering frequency quality.</p>
                </div>
                <select
                  value={sampleRate}
                  onChange={(e) => setSampleRate(e.target.value)}
                  className="text-xs font-bold rounded-xl border border-zinc-200 bg-white p-2 dark:border-zinc-850 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-150 focus:outline-none cursor-pointer"
                >
                  <option value="44100">44.1 kHz (CD Quality)</option>
                  <option value="48000">48.0 kHz (Studio Quality)</option>
                  <option value="22050">22.0 kHz (Standard speech)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Informational columns (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-violet-405 uppercase tracking-wide">
              <Shield className="h-4.5 w-4.5 text-indigo-500" />
              <span>Security Protocols</span>
            </div>
            <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-semibold">
              API changes and key regenerations require logging back. Access credentials expire dynamically every 30 days.
            </p>
          </div>

          <div className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
              <HelpCircle className="h-4.5 w-4.5 text-indigo-500" />
              <span>Need Help?</span>
            </div>
            <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-medium">
              Review our documentation API endpoints guide to build custom speech bots or text synthesis pipes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
