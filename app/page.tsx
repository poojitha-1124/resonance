import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { VoiceGen } from "@/components/landing/voice-gen";
import { VoiceCloning } from "@/components/landing/voice-cloning";
import { WhyChoose } from "@/components/landing/why-choose";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 font-sans antialiased selection:bg-indigo-505 selection:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <VoiceGen />
        <VoiceCloning />
        <WhyChoose />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

