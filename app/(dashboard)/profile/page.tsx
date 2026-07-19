import * as React from "react"
import { getSessionUser } from "@/lib/auth-sync"
import { redirect } from "next/navigation"
import { ProfileClient } from "./profile-client"
import { currentUser } from "@clerk/nextjs/server"

export default async function ProfilePage() {
  const dbUser = await getSessionUser()

  if (!dbUser) {
    redirect("/sign-in")
  }

  // Determine email verification status from Clerk or sandbox modes
  let isEmailVerified = true
  const isBypass = process.env.NEXT_PUBLIC_AUTH_BYPASS === "true"

  if (!isBypass) {
    try {
      const clerkUser = await currentUser()
      if (clerkUser) {
        const primaryEmail = clerkUser.emailAddresses.find(
          (email) => email.id === clerkUser.primaryEmailAddressId
        )
        isEmailVerified = primaryEmail?.verification?.status === "verified"
      }
    } catch (e) {
      console.warn("Clerk fetch user failed in Server Component, defaulting email verifications.", e)
      isEmailVerified = true
    }
  }

  // Compile dates and attributes
  const dateJoinedText = new Date(dbUser.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  // Determine user's last dynamic activity timestamp
  const lastActiveText = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })

  const rawVoicesCount = dbUser.voiceProfiles?.length || 0
  const rawGenerationsCount = dbUser.generatedAudios?.length || 0

  return (
    <ProfileClient
      dbUserId={dbUser.id}
      clerkUserId={dbUser.clerkId}
      dbUserFullName={dbUser.fullName}
      dbUserEmail={dbUser.email}
      dbUserUsername={"username" in dbUser ? (dbUser.username as string | null) : null}
      dbUserBio={"bio" in dbUser ? (dbUser.bio as string | null) : null}
      databaseJoinedDate={dateJoinedText}
      isEmailVerified={isEmailVerified}
      totalGenerations={rawGenerationsCount}
      totalVoices={rawVoicesCount}
      lastActiveDate={lastActiveText}
    />
  )
}
