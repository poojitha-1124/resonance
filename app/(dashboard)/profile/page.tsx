"use client"

import * as React from "react"
import { useUser } from "@/lib/auth-context"
import { Zap, ShieldCheck, Mail, User, Check, Save } from "lucide-react"

export default function ProfilePage() {
  const { user } = useUser()
  const [fullName, setFullName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)
  const [saveSuccess, setSaveSuccess] = React.useState(false)

  React.useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setFullName(user.fullName || user.firstName || "")
        setEmail(user.primaryEmailAddress?.emailAddress || "")
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [user])

  const userInitials = user?.firstName
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ""}`.toUpperCase()
    : "R"

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveSuccess(false)
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1200)
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-909 dark:text-white">Account Settings: Profile</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Manage your account credentials, view memberships, and track usage data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Card & Details Form (8 cols) */}
        <form onSubmit={handleSave} className="lg:col-span-8 border border-zinc-200 bg-white p-6 rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 space-y-6 relative">
          <div className="flex items-center gap-4 pb-4 border-b border-zinc-150 dark:border-zinc-900">
            {user?.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={user.imageUrl} className="h-16 w-16 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800" alt="Avatar" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-650 flex items-center justify-center text-white font-extrabold text-xl">
                {userInitials}
              </div>
            )}
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{fullName}</h3>
              <p className="text-xs text-zinc-450 dark:text-zinc-500">{email}</p>
              {user?.createdAt && (
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 font-medium">
                  Joined: {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              )}
            </div>
          </div>

          {/* Profile fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-xs font-semibold rounded-xl border border-zinc-200 bg-white p-3 text-zinc-800 focus:border-indigo-500 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-violet-500 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs font-semibold rounded-xl border border-zinc-200 bg-white p-3 text-zinc-800 focus:border-indigo-500 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-violet-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-150 dark:border-zinc-900 flex justify-between items-center gap-4">
            <span className="text-[10px] text-zinc-400 font-semibold">Changes are saved locally</span>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:opacity-90 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-all shrink-0"
            >
              {isSaving ? (
                <span>Saving Details...</span>
              ) : saveSuccess ? (
                <>
                  <Check className="h-4 w-4 text-green-505" />
                  <span>Profile Saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Member Package Scope info card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-500">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-909 dark:text-zinc-100 text-xs">Premium Plan</h4>
                <p className="text-[10px] text-zinc-500 font-medium">Renews Aug 1, 2026</p>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-900 leading-relaxed">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500 font-medium font-semibold">Monthly Quota Characters</span>
                <span className="font-bold font-mono text-zinc-800 dark:text-zinc-200">28.3% Used</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-1.5 dark:bg-zinc-800">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: "28.3%" }} />
              </div>
              <p className="text-[10px] text-zinc-500 font-medium">42,500 of 150,000 characters generated</p>
            </div>
          </div>

          <div className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-455 uppercase tracking-wide">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Verified Account</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
              Your profile is verified and active. All neural clones and preset models are unlocked.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
