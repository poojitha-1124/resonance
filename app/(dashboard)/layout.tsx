"use client"

import * as React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Dynamic Left Nav Sidebar (Static on desktop, sliding drawer block on mobile) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Container Column */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header navbar */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Dynamic Inner Body Content */}
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
