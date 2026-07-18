"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Mic,
  FolderLock,
  History,
  User,
  Settings,
  LogOut,
  AudioLines,
  X,
  Volume2,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function Sidebar({ isOpen, onClose, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Generate Voice", href: "/generate-voice", icon: Volume2 },
    { name: "Clone Voice", href: "/voice-cloning", icon: Mic },
    { name: "Voice Library", href: "/voice-library", icon: FolderLock },
    { name: "Audio History", href: "/audio-history", icon: History },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <>
      {/* Sliding Mobile Drawer drawer backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sliding Left bar container */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 lg:static lg:block transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        <div className="flex h-full flex-col bg-white border-r border-zinc-200 dark:bg-zinc-950 dark:border-zinc-900 transition-colors duration-300">
          {/* Brand logo header */}
          <div className={`flex h-16 items-center justify-between border-b border-zinc-200/80 dark:border-zinc-900 ${
            isCollapsed ? "px-4 justify-center" : "px-6"
          }`}>
            <Link href="/dashboard" className="flex items-center gap-2 group shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-black">
                <AudioLines className="h-4.5 w-4.5 text-indigo-505 dark:text-violet-505" />
              </div>
              {!isCollapsed && (
                <span className="text-lg font-bold tracking-tight text-zinc-905 dark:text-white transition-opacity duration-300">
                  Resonance
                </span>
              )}
            </Link>

            {/* Collapse/Expand toggle action (desktop only) */}
            {!isCollapsed && onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex p-1 rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-650 dark:hover:bg-zinc-900 transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>
            )}

            {isCollapsed && onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex absolute right-[-14px] top-4 p-1 rounded-full border border-zinc-200 bg-white text-zinc-450 hover:text-zinc-650 dark:border-zinc-800 dark:bg-zinc-955 shadow-sm transition-colors z-50 cursor-pointer"
                title="Expand sidebar"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Mobile close toggle */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-650 dark:hover:bg-zinc-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow space-y-1 px-3 py-6 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
                  } ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-violet-955/20 dark:text-violet-400"
                      : "text-zinc-550 hover:bg-zinc-55 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-150"
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-indigo-550 dark:text-violet-405" : "text-zinc-400 dark:text-zinc-500"}`} />
                  {!isCollapsed && <span className="transition-opacity duration-300">{item.name}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Footer / User Details & LogOut */}
          <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-900">
            {isCollapsed ? (
              <div className="flex flex-col items-center gap-4 py-2">
                <div
                  className="h-9 w-9 rounded-full bg-indigo-500/20 text-indigo-650 dark:text-violet-455 flex items-center justify-center font-bold text-sm"
                  title="John Doe (john@resonance.ai)"
                >
                  JD
                </div>
                <Link
                  href="/"
                  className="flex items-center justify-center p-2.5 rounded-xl text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="h-4.5 w-4.5" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                  <div className="h-9 w-9 rounded-full bg-indigo-500/20 text-indigo-650 dark:text-violet-455 flex items-center justify-center font-bold text-sm">
                    JD
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100 truncate">John Doe</p>
                    <p className="text-[10px] text-zinc-500 truncate">john@resonance.ai</p>
                  </div>
                </div>
                <Link
                  href="/"
                  className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all duration-200"
                >
                  <LogOut className="h-4.5 w-4.5" />
                  <span>Logout</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
