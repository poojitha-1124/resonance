"use client"

import * as React from "react"
import { Search, Bell, User, Settings, LogOut, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = React.useState(false)
  const [showProfileMenu, setShowProfileMenu] = React.useState(false)

  const notificationRef = React.useRef<HTMLDivElement>(null)
  const profileRef = React.useRef<HTMLDivElement>(null)

  // Close menus when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const mockAlerts = [
    { id: 1, text: "Vocal profile 'MyClonedVoice' matches 99.4% context.", time: "10m ago", read: false },
    { id: 2, text: "Credits topped up successfully (+1,000 chars).", time: "2h ago", read: true },
    { id: 3, text: "Your generated audio 'narration_draft_2' is ready.", time: "Yesterday", read: true },
  ]

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white/80 px-6 backdrop-blur-md dark:border-zinc-900 dark:bg-zinc-950/80 transition-colors">
      {/* Search Input Bar (Visible on desktop, trigger button on mobile) */}
      <div className="flex items-center gap-4 flex-1">
        {/* Toggle burger on mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        >
          <Menu className="h-5.5 w-5.5" />
        </button>

        <div className="relative max-w-md w-full hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
            <Search className="h-4.5 w-4.5" />
          </span>
          <input
            type="search"
            placeholder="Search audio, speech scripts, or voice settings..."
            className="w-full text-xs rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 py-2.5 text-zinc-800 focus:border-indigo-500 focus:outline-none dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      {/* Control Widgets (Notifications, Toggles, Avatars) */}
      <div className="flex items-center gap-4">
        {/* Theme Switching Button */}
        <ThemeToggle />

        {/* Dynamic Notification Dropper */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-zinc-500 rounded-lg hover:bg-zinc-50 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200 transition-all duration-200"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 z-50">
              <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-900">
                <h4 className="text-xs font-bold text-zinc-805 dark:text-zinc-205">Notifications</h4>
              </div>
              <div className="py-2 space-y-1">
                {mockAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-xl transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer flex justify-between gap-2 ${
                      !alert.read ? "bg-indigo-50/20 dark:bg-violet-955/15" : ""
                    }`}
                  >
                    <div>
                      <p className="text-xs text-zinc-700 dark:text-zinc-205 leading-relaxed">{alert.text}</p>
                      <span className="text-[10px] text-zinc-400 mt-1 block">{alert.time}</span>
                    </div>
                    {!alert.read && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Account Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-full group cursor-pointer focus:outline-none"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-650 flex items-center justify-center text-white font-bold text-xs ring-2 ring-transparent group-hover:ring-indigo-500/50 dark:group-hover:ring-violet-500/50 transition-all">
              JD
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 z-50">
              <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-900">
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100">John Doe</p>
                <p className="text-[10px] text-zinc-500 truncate mt-0.5">john@resonance.ai</p>
              </div>

              <div className="py-2.5 space-y-1">
                <Link
                  href="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-650 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-650 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Account Settings</span>
                </Link>
                <Link
                  href="/"
                  className="flex w-full items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-colors border-t border-zinc-100 dark:border-zinc-900 pt-2 mt-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
