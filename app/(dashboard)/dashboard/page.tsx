import { redirect } from "next/navigation"
import { getSessionUser } from "@/lib/auth-sync"
import {
  WelcomeCard,
  QuickActions,
  StatsGrid,
  RecentGenerations,
  AIRecommendations
} from "@/components/dashboard/widgets"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const dbUser = await getSessionUser()

  if (!dbUser) {
    redirect("/sign-in")
  }

  // Calculate dynamic character usage stats
  const usedCharacters = dbUser.generatedAudios.reduce((acc, curr) => acc + curr.text.length, 0)
  const remainingCharacters = Math.max(0, 150000 - usedCharacters)
  
  // Count custom cloned profiles vs preset profiles
  const clonedProfilesCount = dbUser.voiceProfiles.filter(p => p.type === "CLONED").length

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Database Offline Warning Alert Banner */}
      {"isOfflineFallback" in dbUser && dbUser.isOfflineFallback && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-4 rounded-2xl flex items-center justify-between text-xs font-bold leading-none animate-pulse">
          <span>⚠️ PostgreSQL Connection Offline. Displaying Local Memory Sandbox state.</span>
          <span className="bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-lg text-[9px] uppercase tracking-wider">
            Local Simulation
          </span>
        </div>
      )}

      {/* Welcome banner segment */}
      <WelcomeCard 
        userName={dbUser.fullName}
        usedCharacters={usedCharacters}
        remainingCharacters={remainingCharacters}
        clonedProfilesCount={clonedProfilesCount}
      />

      {/* Grid of stats */}
      <StatsGrid 
        totalGenerationsCount={dbUser.generatedAudios.length}
        clonedProfilesCount={dbUser.voiceProfiles.length}
        remainingCharacters={remainingCharacters}
      />

      {/* Grid of Quick links */}
      <QuickActions />

      {/* Main split logs + recommendations block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Recent audio syntheses list table (2/3 width) */}
        <div className="lg:col-span-8">
          <RecentGenerations generations={dbUser.generatedAudios} />
        </div>

        {/* Right Side: AI optimization recommendations list (1/3 width) */}
        <div className="lg:col-span-4">
          <AIRecommendations />
        </div>
      </div>
    </div>
  )
}
