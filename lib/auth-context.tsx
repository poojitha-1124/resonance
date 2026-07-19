"use client"

import * as React from "react"
import { useUser as useClerkUser, SignOutButton as ClerkSignOutButton, UserButton as ClerkUserButton } from "@clerk/nextjs"

const isBypass = process.env.NEXT_PUBLIC_AUTH_BYPASS === "true"

export function useUser() {
  if (isBypass) {
    return {
      isLoaded: true,
      isSignedIn: true,
      user: {
        id: "user_mock123",
        fullName: "John Doe",
        firstName: "John",
        lastName: "Doe",
        imageUrl: "", // empty forces initials renderer
        primaryEmailAddress: { emailAddress: "john@resonance.ai" },
        createdAt: new Date("2026-07-18")
      }
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useClerkUser()
}

export function SignOutButton({ children, redirectUrl }: { children: React.ReactNode; redirectUrl?: string }) {
  if (isBypass) {
    const handleMockSignOut = (e: React.MouseEvent) => {
      e.preventDefault()
      window.location.href = redirectUrl || "/"
    }
    return (
      <div onClick={handleMockSignOut} className="w-full">
        {children}
      </div>
    )
  }
  return <ClerkSignOutButton redirectUrl={redirectUrl}>{children}</ClerkSignOutButton>
}

export function UserButton({ appearance }: { appearance?: unknown }) {
  if (isBypass) {
    return (
      <div 
        onClick={() => window.location.href = "/profile"}
        className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-505 to-purple-650 flex items-center justify-center text-white font-bold text-xs ring-2 ring-zinc-200 dark:ring-zinc-800 hover:ring-indigo-500 dark:hover:ring-violet-500 transition-all cursor-pointer"
        title="John Doe (john@resonance.ai) - Mock Settings"
      >
        JD
      </div>
    )
  }
  return <ClerkUserButton appearance={appearance as React.ComponentProps<typeof ClerkUserButton>["appearance"]} />
}
