"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, AudioLines } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black group-hover:scale-105 transition-transform duration-200">
                <AudioLines className="h-5 w-5 text-indigo-500 dark:text-violet-500 animate-pulse" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-violet-400 transition-colors">
                Resonance
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-zinc-650 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-violet-450 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-zinc-650 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-violet-450 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-zinc-650 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-violet-450 transition-colors"
            >
              Pricing
            </Link>
          </nav>

          {/* Action Items */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" className="text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-950">
              Sign In
            </Button>
            <Button className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-md">
              Get Started for Free
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-45 w-full bg-white dark:bg-zinc-950 border-t border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex flex-col gap-4 text-lg font-medium">
            <Link
              href="#features"
              onClick={() => setIsOpen(false)}
              className="text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-violet-400 py-2 border-b border-zinc-100 dark:border-zinc-900"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setIsOpen(false)}
              className="text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-violet-400 py-2 border-b border-zinc-100 dark:border-zinc-900"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-violet-400 py-2 border-b border-zinc-100 dark:border-zinc-900"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex flex-col gap-3 mt-auto pb-8">
            <Button variant="outline" className="w-full justify-center">
              Sign In
            </Button>
            <Button className="w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black justify-center shadow-lg">
              Get Started for Free
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
