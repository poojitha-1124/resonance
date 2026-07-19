import { redirect } from "next/navigation"
import { getSessionUser } from "@/lib/auth-sync"
import { VoiceLibraryClient } from "./voice-library-client"

export const dynamic = "force-dynamic"

export default async function VoiceLibraryPage() {
  const dbUser = await getSessionUser()

  if (!dbUser) {
    redirect("/sign-in")
  }

  // Ensure voiceProfiles exists as an array
  const voiceProfiles = dbUser.voiceProfiles || []

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Database Offline Warning Alert Banner (Consistent with Main Dashboard) */}
      {"isOfflineFallback" in dbUser && dbUser.isOfflineFallback && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-4 rounded-2xl flex items-center justify-between text-xs font-bold leading-none animate-pulse select-none">
          <span>⚠️ PostgreSQL Connection Offline. Displaying Local Memory Sandbox state.</span>
          <span className="bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-lg text-[9px] uppercase tracking-wider">
            Local Simulation
          </span>
        </div>
      )}

      {/* Dynamic Client Wrapper */}
      <VoiceLibraryClient voiceProfiles={voiceProfiles} />
    </div>
  )
}
