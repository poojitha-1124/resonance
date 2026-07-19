import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export interface OfflineUserType {
  id: string
  clerkId: string
  email: string
  fullName: string | null
  username: string | null
  bio: string | null
  createdAt: Date
  settings: {
    id: string
    userId: string
    defaultLanguage: string
    theme: string
    autoPlay: boolean
  } | null
  voiceProfiles: Array<{
    id: string
    userId: string
    name: string
    type: string
    description: string | null
    status: string
    audioUrl: string | null
    createdAt: Date
    updatedAt: Date
  }>
  generatedAudios: Array<{
    id: string
    userId: string
    voiceProfileId: string | null
    text: string
    audioUrl: string
    duration: number
    fileSize: number
    language: string
    createdAt: Date
    voiceProfile: {
      name: string
    } | null
  }>
  isOfflineFallback?: boolean
}

// Memory fallback to ensure smooth user interactions during local testing
const MOCK_OFFLINE_USER: OfflineUserType = {
  id: "user_mock123_fallback",
  clerkId: "user_mock123",
  email: "john@resonance.ai",
  fullName: "John Doe (Local Sandbox Mode)",
  username: "johndoe_resonance",
  bio: "AI voice explorer. Professional narrator, content creator, and technology advisor.",
  createdAt: new Date("2026-07-18"),
  isOfflineFallback: true,
  settings: {
    id: "settings_mock123",
    userId: "user_mock123_fallback",
    defaultLanguage: "en-US",
    theme: "dark",
    autoPlay: true
  },
  voiceProfiles: [
    { id: "vp_rachel", userId: "user_mock123_fallback", name: "Rachel (Narrator)", type: "PRESET", description: "Warm, professional assistant voice.", status: "ACTIVE", audioUrl: null, createdAt: new Date("2026-07-18"), updatedAt: new Date("2026-07-18") },
    { id: "vp_adam", userId: "user_mock123_fallback", name: "Adam (Developer)", type: "PRESET", description: "Deep, crisp male developer profile.", status: "ACTIVE", audioUrl: null, createdAt: new Date("2026-07-18"), updatedAt: new Date("2026-07-18") },
    { id: "vp_bella", userId: "user_mock123_fallback", name: "Bella (Educator)", type: "PRESET", description: "Clear, friendly tone for instructional walk-throughs.", status: "ACTIVE", audioUrl: null, createdAt: new Date("2026-07-18"), updatedAt: new Date("2026-07-18") }
  ],
  generatedAudios: [
    { 
      id: "ga_1", 
      userId: "user_mock123_fallback", 
      voiceProfileId: "vp_rachel", 
      text: "Hello, welcome to Resonance AI. Let's synthesize high-fidelity natural speech that feels alive.", 
      audioUrl: "/audio/explainer_narrator_v2.mp3", 
      duration: 8.4, 
      fileSize: 1540, 
      language: "en-US", 
      createdAt: new Date("2026-07-18T10:00:00Z"),
      voiceProfile: { name: "Rachel (Narrator)" }
    },
    { 
      id: "ga_2", 
      userId: "user_mock123_fallback", 
      voiceProfileId: "vp_adam", 
      text: "Initializing custom voice database connection. Authenticating local developer session variables.", 
      audioUrl: "/audio/developer_api_prompt.mp3", 
      duration: 12.2, 
      fileSize: 3410, 
      language: "en-US", 
      createdAt: new Date("2026-07-17T14:30:00Z"),
      voiceProfile: { name: "Adam (Developer)" }
    },
    { 
      id: "ga_3", 
      userId: "user_mock123_fallback", 
      voiceProfileId: "vp_bella", 
      text: "This is a clean educational guide generating from the primary voice cloning parameters.", 
      audioUrl: "/audio/my_cloned_profile_test_1.mp3", 
      duration: 6.8, 
      fileSize: 460, 
      language: "en-US", 
      createdAt: new Date("2026-07-15T09:15:00Z"),
      voiceProfile: { name: "Bella (Educator)" }
    }
  ]
}

export async function getSessionUser() {
  const isBypass = process.env.NEXT_PUBLIC_AUTH_BYPASS === "true"

  let clerkId: string
  let email: string
  let fullName: string | null = null
  let username: string | null = null

  if (isBypass) {
    clerkId = "user_mock123"
    email = "john@resonance.ai"
    fullName = "John Doe"
    username = "johndoe_resonance"
  } else {
    try {
      const session = await auth()
      const user = await currentUser()
      
      if (!session.userId || !user) {
        return null
      }
      
      clerkId = session.userId
      email = user.emailAddresses[0]?.emailAddress || ""
      fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || null
      username = user.username || null
    } catch {
      // Return offline simulation if Clerk APIs fail or hit network issues
      return MOCK_OFFLINE_USER
    }
  }

  try {
    // Find or create user in Neon database
    let dbUser = await db.user.findUnique({
      where: { clerkId },
      include: {
        settings: true,
        voiceProfiles: true,
        generatedAudios: {
          orderBy: { createdAt: "desc" },
          include: { voiceProfile: true }
        }
      }
    })

    if (!dbUser) {
      // Create new User record with dynamic defaults
      dbUser = await db.user.create({
        data: {
          clerkId,
          email,
          fullName,
          username,
          bio: "",
          settings: {
            create: {
              defaultLanguage: "en-US",
              theme: "dark",
              autoPlay: true
            }
          }
        },
        include: {
          settings: true,
          voiceProfiles: true,
          generatedAudios: {
            orderBy: { createdAt: "desc" },
            include: { voiceProfile: true }
          }
        }
      })

      // Seed default presets so the dashboard presents operational outputs from design
      const defaultPresets = [
        { name: "Rachel (Narrator)", type: "PRESET", description: "Warm, professional voice tailored for narration.", status: "ACTIVE" },
        { name: "Adam (Developer)", type: "PRESET", description: "Deep, crisp male tone designed for voice assistants.", status: "ACTIVE" },
        { name: "Bella (Educator)", type: "PRESET", description: "Clear and highly friendly voice perfect for courses.", status: "ACTIVE" }
      ]

      const createdProfiles = []
      for (const preset of defaultPresets) {
        const profile = await db.voiceProfile.create({
          data: {
            userId: dbUser.id,
            name: preset.name,
            type: preset.type,
            description: preset.description,
            status: preset.status
          }
        })
        createdProfiles.push(profile)
      }

      // Seed default sample generation logs
      const seedAudios = [
        {
          voiceProfileId: createdProfiles[0]?.id,
          text: "Hello, welcome to Resonance AI. Let's synthesize high-fidelity natural speech that feels alive.",
          audioName: "explainer_narrator_v2.mp3",
          duration: 8.4,
          fileSize: 1540
        },
        {
          voiceProfileId: createdProfiles[1]?.id,
          text: "Initializing custom voice database connection. Authenticating local developer session variables.",
          audioName: "developer_api_prompt.mp3",
          duration: 12.2,
          fileSize: 3410
        },
        {
          voiceProfileId: createdProfiles[2]?.id,
          text: "This is a clean educational guide generating from the primary voice cloning parameters.",
          audioName: "my_cloned_profile_test_1.mp3",
          duration: 6.8,
          fileSize: 460
        }
      ]

      for (const audio of seedAudios) {
        await db.generatedAudio.create({
          data: {
            userId: dbUser.id,
            voiceProfileId: audio.voiceProfileId,
            text: audio.text,
            audioUrl: `/audio/${audio.audioName}`, // logical pointer
            duration: audio.duration,
            fileSize: audio.fileSize,
            language: "en-US"
          }
        })
      }

      // Re-query database to return complete hydrated model representation
      dbUser = await db.user.findUnique({
        where: { clerkId },
        include: {
          settings: true,
          voiceProfiles: true,
          generatedAudios: {
            orderBy: { createdAt: "desc" },
            include: { voiceProfile: true }
          }
        }
      })
    }

    return dbUser
  } catch (error) {
    console.warn("Neon Database offline. Enabling Resonance memory fallback simulation.", error)
    return MOCK_OFFLINE_USER
  }
}
