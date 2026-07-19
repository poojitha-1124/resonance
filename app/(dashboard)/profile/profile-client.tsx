"use client"

import * as React from "react"
import { useUser, SignOutButton } from "@/lib/auth-context"
import { updateProfile } from "./actions"
import { 
  Zap, 
  ShieldCheck, 
  Mail, 
  User as UserIcon, 
  Check, 
  Save, 
  Globe, 
  Key, 
  Clock, 
  Settings2, 
  LogOut, 
  Copy, 
  UserCheck2,
  Database,
  Fingerprint,
  FileText
} from "lucide-react"

interface ProfileClientProps {
  dbUserId: string
  clerkUserId: string
  dbUserFullName: string | null
  dbUserEmail: string
  dbUserUsername: string | null
  dbUserBio: string | null
  databaseJoinedDate: string
  isEmailVerified: boolean
  totalGenerations: number
  totalVoices: number
  lastActiveDate: string
}

export function ProfileClient({
  dbUserId,
  clerkUserId,
  dbUserFullName,
  dbUserEmail,
  dbUserUsername,
  dbUserBio,
  databaseJoinedDate,
  isEmailVerified,
  totalGenerations,
  totalVoices,
  lastActiveDate
}: ProfileClientProps) {
  const { user } = useUser()
  const [fullName, setFullName] = React.useState(dbUserFullName || "")
  const [username, setUsername] = React.useState(dbUserUsername || "")
  const [bio, setBio] = React.useState(dbUserBio || "")
  const [isSaving, setIsSaving] = React.useState(false)
  const [saveSuccess, setSaveSuccess] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  
  const [copiedDbId, setCopiedDbId] = React.useState(false)
  const [copiedClerkId, setCopiedClerkId] = React.useState(false)

  // Copy helper function
  const handleCopy = (text: string, type: "db" | "clerk") => {
    navigator.clipboard.writeText(text)
    if (type === "db") {
      setCopiedDbId(true)
      setTimeout(() => setCopiedDbId(false), 2000)
    } else {
      setCopiedClerkId(true)
      setTimeout(() => setCopiedClerkId(false), 2000)
    }
  }

  // Handle Clerk Account Management profile popup
  const handleManageAccount = () => {
    const isBypass = process.env.NEXT_PUBLIC_AUTH_BYPASS === "true"
    if (isBypass) {
      alert("Clerk Identity Management: In local development mode, login is simulated and credential settings are handled in-memory.")
    } else {
      const win = window as unknown as { Clerk?: { openUserProfile: () => void } }
      if (win.Clerk) {
        win.Clerk.openUserProfile()
      } else {
        alert("Opening Clerk security configuration options...")
      }
    }
  }

  // Submit profile forms changes to Database
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveSuccess(false)
    setErrorMsg(null)

    try {
      const res = await updateProfile({
        fullName,
        username: username.trim() || null,
        bio: bio.trim() || null
      })

      if (res.success) {
        setSaveSuccess(true)
        if (res.user) {
          setFullName(res.user.fullName || "")
          setUsername(res.user.username || "")
          setBio(res.user.bio || "")
        }
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        setErrorMsg(res.error || "Failed to persist profile configuration updates.")
      }
    } catch {
      setErrorMsg("An unexpected client error occurred while updates were saving.")
    } finally {
      setIsSaving(false)
    }
  }

  const userInitials = fullName
    ? fullName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)
    : "R"

  return (
    <div className="space-y-6 pb-12 animate-fade-in select-none">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Account Settings: Profile</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Manage your personal identifiers, trace workspace account storage logs, and update credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Edits Form */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSave} className="border border-zinc-200 bg-white p-6 rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 space-y-6 relative">
            <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-zinc-150 dark:border-zinc-900">
              {user?.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={user.imageUrl} className="h-16 w-16 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-950" alt="Avatar" />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-extrabold text-xl">
                  {userInitials}
                </div>
              )}
              <div>
                <h3 className="font-bold text-zinc-909 dark:text-zinc-100 text-sm">
                  {fullName || "Resonance Developer"} 
                  {username && <span className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold ml-2">@{username}</span>}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{dbUserEmail}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[9px] uppercase tracking-wider bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 px-2 py-0.5 rounded font-bold">
                    Primary Profile
                  </span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold">
                    Joined {databaseJoinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Editing fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                  <UserIcon className="h-3.5 w-3.5" />
                  <span>Display Name</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs font-semibold rounded-xl border border-zinc-200 bg-white p-3 text-zinc-800 focus:border-indigo-500 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-indigo-650 transition-colors"
                  required
                  placeholder="e.g. John Doe"
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" />
                  <span>Username</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-xs font-semibold rounded-xl border border-zinc-200 bg-white p-3 text-zinc-800 focus:border-indigo-500 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-indigo-650 transition-colors"
                  placeholder="e.g. johndoe_resonance"
                />
              </div>

              {/* Read-only Email Address */}
              <div className="sm:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email (Managed by Provider)</span>
                </label>
                <input
                  type="email"
                  value={dbUserEmail}
                  disabled
                  className="w-full text-xs font-semibold rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-900/30 p-3 text-zinc-450 dark:text-zinc-550 cursor-not-allowed cursor-not-allowed dark:border-zinc-850"
                />
              </div>

              {/* Bio Field */}
              <div className="sm:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Short Biography</span>
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  maxLength={300}
                  className="w-full text-xs font-semibold rounded-xl border border-zinc-200 bg-white p-3 text-zinc-800 focus:border-indigo-505 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-indigo-650 transition-colors resize-none leading-relaxed"
                  placeholder="Tell us about yourself and your voice synthesis goals..."
                />
                <div className="text-right text-[9px] text-zinc-450 dark:text-zinc-550 font-bold uppercase">
                  {300 - bio.length} Characters Left
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-50 text-red-750 dark:bg-red-955/20 dark:text-red-400 rounded-xl text-xs font-bold">
                ⚠️ {errorMsg}
              </div>
            )}

            <div className="pt-4 border-t border-zinc-150 dark:border-zinc-900 flex flex-wrap justify-between items-center gap-4">
              <span className="text-[10px] text-zinc-450 dark:text-zinc-550 font-bold uppercase tracking-wider">
                Changes Sync to database
              </span>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-all shrink-0"
              >
                {isSaving ? (
                  <span>Saving details...</span>
                ) : saveSuccess ? (
                  <>
                    <Check className="h-4 w-4 text-white" />
                    <span>Profile Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save profile settings</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Account Identifiers */}
          <div className="border border-zinc-200 bg-white p-6 rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/40 space-y-4">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs flex items-center gap-1.5 uppercase tracking-wide">
              <Fingerprint className="h-4 w-4 text-indigo-500" />
              <span>Identity Specifications</span>
            </h4>

            <div className="space-y-3.5">
              {/* Database User ID */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-3">
                <div>
                  <span className="text-[10px] text-zinc-450 dark:text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="h-3.5 w-3.5" />
                    <span>Database ID</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
                    {dbUserId}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(dbUserId, "db")}
                  className="flex items-center gap-1 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-850 rounded-xl text-[10px] font-semibold text-zinc-600 dark:text-zinc-350 cursor-pointer self-start sm:self-center"
                >
                  {copiedDbId ? <Check className="h-3.5 w-3.5 text-green-550" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedDbId ? "Copied ID" : "Copy ID"}</span>
                </button>
              </div>

              {/* Clerk Subject ID */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-zinc-450 dark:text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck2 className="h-3.5 w-3.5" />
                    <span>Clerk Subject ID</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
                    {clerkUserId}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(clerkUserId, "clerk")}
                  className="flex items-center gap-1 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-105 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-850 rounded-xl text-[10px] font-semibold text-zinc-600 dark:text-zinc-350 cursor-pointer self-start sm:self-center"
                >
                  {copiedClerkId ? <Check className="h-3.5 w-3.5 text-green-550" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedClerkId ? "Copied ID" : "Copy ID"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Package details, statistics, and settings */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Membership Info */}
          <div className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-500">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-909 dark:text-zinc-100 text-xs">Resonance Tier quota</h4>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Free Membership</p>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-900 leading-relaxed">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500 font-semibold">Verification Status</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                  isEmailVerified 
                    ? "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-955/20 dark:text-amber-400"
                }`}>
                  {isEmailVerified ? "Email Verified" : "Verification Pending"}
                </span>
              </div>
              <div className="flex justify-between text-xs pt-1">
                <span className="text-zinc-500 font-semibold">Auth Provider</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 font-mono text-[10px]">
                  Clerk Identity
                </span>
              </div>
            </div>
            
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-850 rounded-2xl flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-550 shrink-0" />
              <p className="text-[10px] text-zinc-550 leading-relaxed font-semibold">
                Your profile is active. Preset library elements are fully unlocked.
              </p>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-4">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs flex items-center gap-1.5 uppercase tracking-wide">
              <Clock className="h-4 w-4 text-indigo-500" />
              <span>Workspace Statistics</span>
            </h4>

            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500 font-semibold">Voice Profiles</span>
                <span className="font-extrabold text-zinc-800 dark:text-zinc-100 font-mono bg-zinc-50 dark:bg-zinc-900 px-2 py-1 rounded-md">
                  {totalVoices} Models
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500 font-semibold">Voice Generations</span>
                <span className="font-extrabold text-zinc-800 dark:text-zinc-100 font-mono bg-zinc-50 dark:bg-zinc-900 px-2 py-1 rounded-md">
                  {totalGenerations} Audios
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500 font-semibold">Last Active</span>
                <span className="text-zinc-650 dark:text-zinc-350 font-semibold text-[10px]">
                  {lastActiveDate}
                </span>
              </div>
            </div>
          </div>

          {/* Security Management section */}
          <div className="p-5 border border-zinc-200 bg-white rounded-3xl dark:border-zinc-900 dark:bg-zinc-950/30 space-y-4">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs flex items-center gap-1.5 uppercase tracking-wide">
              <Settings2 className="h-4 w-4 text-indigo-500" />
              <span>Security Panel</span>
            </h4>

            <div className="space-y-2">
              <button
                onClick={handleManageAccount}
                className="w-full flex items-center justify-between text-left px-3 py-2.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-850 rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-200 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-indigo-500" />
                  <span>Update Password / Details</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Clerk</span>
              </button>

              <button
                onClick={handleManageAccount}
                className="w-full flex items-center justify-between text-left px-3 py-2.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-850 rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-200 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-indigo-500" />
                  <span>MFA & Authentication</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Clerk</span>
              </button>

              <SignOutButton redirectUrl="/">
                <button
                  className="w-full flex items-center gap-2 px-3 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/15 dark:hover:bg-red-955/35 rounded-xl text-xs font-bold text-red-650 dark:text-red-405 cursor-pointer transition-colors mt-2"
                >
                  <LogOut className="h-4.5 w-4.5" />
                  <span>Sign Out of resonance</span>
                </button>
              </SignOutButton>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
