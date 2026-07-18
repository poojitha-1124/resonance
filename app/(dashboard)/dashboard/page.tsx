import {
  WelcomeCard,
  QuickActions,
  StatsGrid,
  RecentGenerations,
  AIRecommendations
} from "@/components/dashboard/widgets"

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Welcome banner segment */}
      <WelcomeCard />

      {/* Grid of stats */}
      <StatsGrid />

      {/* Grid of Quick links */}
      <QuickActions />

      {/* Main split logs + recommendations block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Recent audio syntheses list table (2/3 width) */}
        <div className="lg:col-span-8">
          <RecentGenerations />
        </div>

        {/* Right Side: AI optimization recommendations list (1/3 width) */}
        <div className="lg:col-span-4">
          <AIRecommendations />
        </div>
      </div>
    </div>
  )
}
