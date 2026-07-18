"use client"

import * as React from "react"
import { Mic, Upload, Activity, ShieldAlert, Sparkles, Wand2, CheckCircle2, ChevronRight } from "lucide-react"

export default function VoiceCloningPage() {
  const [profileName, setProfileName] = React.useState("My Cloned Voice v1")
  const [lang, setLang] = React.useState("English (US)")
  const [isRecording, setIsRecording] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0)
  const [recordingUploaded, setRecordingUploaded] = React.useState(false)
  const [similarity, setSimilarity] = React.useState<number | null>(null)
  const [statusText, setStatusText] = React.useState("Ready for sample upload")
  const [authorized, setAuthorized] = React.useState(false)

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined

    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 10) {
            setIsRecording(false)
            setRecordingUploaded(true)
            setStatusText("Synthesizing voice vector...")
            simulateVectorMapping()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const startRecordSimulation = () => {
    if (!authorized) {
      alert("Please confirm the voice consent authorization before recording.")
      return
    }
    setSeconds(0)
    setRecordingUploaded(false)
    setSimilarity(null)
    setIsRecording(true)
    setStatusText("Recording audio sample...")
  }

  const simulateVectorMapping = () => {
    setTimeout(() => {
      setSimilarity(99.4)
      setStatusText("Voice Cloned Successfully!")
    }, 2500)
  }

  const handleFileUpload = () => {
    if (!authorized) {
      alert("Please confirm the voice consent authorization before uploading.")
      return
    }
    setRecordingUploaded(true)
    setStatusText("Analyzing uploaded vocal file...")
    setTimeout(() => {
      setStatusText("Synthesizing voice vector...")
      simulateVectorMapping()
    }, 1500)
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-909 dark:text-white">Workspace: Zero-Shot Vocal Cloner</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Clone highly-accurate speaker profiles with short, organic audio files.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Parameters Form and Audio Upload (8 cols) */}
        <div className="lg:col-span-8 border border-zinc-200 bg-white p-6 rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 h-40 w-40 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.04),transparent_60%)] filter blur-md pointer-events-none" />

          {/* Profile Basic configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-405 dark:text-zinc-400 uppercase tracking-wide">Voice Profile Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full text-xs font-semibold rounded-xl border border-zinc-200 bg-white p-3 text-zinc-800 focus:border-indigo-500 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-violet-500 transition-colors"
                placeholder="e.g. Rachel Personal Voice"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-405 dark:text-zinc-400 uppercase tracking-wide">Base Language Accent</label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full text-xs font-semibold rounded-xl border border-zinc-200 bg-white p-3 text-zinc-800 focus:border-indigo-500 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-violet-500 transition-colors"
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="Spanish (ES)">Spanish (ES)</option>
                <option value="French (FR)">French (FR)</option>
              </select>
            </div>
          </div>

          {/* Consent Verification Gate */}
          <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-55/10 dark:border-zinc-900 dark:bg-zinc-900/10 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-200">
              <ShieldAlert className="h-4.5 w-4.5 text-amber-500" />
              <span>Voice Consent Agreement</span>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">
              By confirming, you attest that you are authorized to clone the voice profile and embed custom biometrics verification watermarks into outputs.
            </p>
            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={authorized}
                onChange={(e) => setAuthorized(e.target.checked)}
                className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:bg-zinc-900 dark:border-zinc-805"
              />
              <span className="text-[10px] font-bold text-zinc-705 dark:text-zinc-300">I authorize compiling biometrics matching keys</span>
            </label>
          </div>

          {/* Interactive Recording Card Console */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-900">
            {/* Record Live Card */}
            <div className="border border-zinc-200 rounded-2xl bg-zinc-50/50 p-6 dark:border-zinc-900 dark:bg-zinc-950/20 text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                <Mic className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">Record speech clip</h4>
                <p className="text-[10px] text-zinc-500">Record a 10s voice description log</p>
              </div>

              {!isRecording ? (
                <button
                  onClick={startRecordSimulation}
                  className="w-full text-xs font-bold bg-zinc-900 text-white dark:bg-white dark:text-black py-2.5 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Start Recording
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-center items-center gap-2">
                    <Activity className="h-4 w-4 text-red-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-red-500">{seconds}s / 10s</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1">
                    <div className="bg-red-500 h-1 rounded-full animate-pulseTransition" style={{ width: `${seconds * 10}%` }} />
                  </div>
                </div>
              )}
            </div>

            {/* Upload File Card */}
            <div className="border border-zinc-200 rounded-2xl bg-zinc-50/50 p-6 dark:border-zinc-900 dark:bg-zinc-950/20 text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <Upload className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">Upload WAV clip</h4>
                <p className="text-[10px] text-zinc-500">Drag sample file directly in here</p>
              </div>
              <button
                onClick={handleFileUpload}
                className="w-full text-xs font-bold border border-zinc-200 hover:bg-zinc-100 bg-white text-zinc-700 dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-150 dark:hover:bg-zinc-800 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Upload Audio File
              </button>
            </div>
          </div>

          {/* Simulating Mapping Metrics */}
          {recordingUploaded && (
            <div className="mt-4 p-5 rounded-2xl border border-indigo-550/20 bg-indigo-500/5 dark:bg-violet-955/10 dark:border-violet-850/50 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-705 dark:text-zinc-300 font-semibold">{statusText}</span>
                {similarity !== null ? (
                  <span className="text-green-600 dark:text-green-405 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Accuracy: {similarity}%</span>
                  </span>
                ) : (
                  <Activity className="h-4 w-4 text-indigo-500 animate-spin" />
                )}
              </div>
              {similarity !== null && (
                <div className="space-y-2">
                  <div className="w-full bg-zinc-200 dark:bg-zinc-900 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full transition-all duration-700" style={{ width: `${similarity}%` }} />
                  </div>
                  <p className="text-[10px] text-zinc-550 dark:text-zinc-450 leading-relaxed font-medium">
                    Cloning matching is resolved! You can now use the new model (<strong>{profileName}</strong>) in the <strong>Speech Generate Workspace</strong>.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Tips and Accent details (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-650 dark:text-violet-405 uppercase tracking-wide">
              <Wand2 className="h-4.5 w-4.5" />
              <span>Cloning Guidelines</span>
            </div>
            <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed font-semibold">
              Avoid pauses or dynamic background static. Aim to maintain an even speed and volume calibration throughout your recordings.
            </p>
          </div>

          <div className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-4">
            <h4 className="text-xs font-bold text-zinc-405 dark:text-zinc-500 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-indigo-500" />
              <span>Voice Security Info</span>
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              <div className="flex gap-2">
                <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <p>Private models are encrypted inside matching libraries and cannot be shared.</p>
              </div>
              <div className="flex gap-2">
                <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <p>Audio outputs seal structural biometrics headers to comply with safety compliance layers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
