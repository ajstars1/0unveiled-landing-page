import { Toaster } from "sonner"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import HowItWorksScroller from "@/components/HowItWorksScroller"
import LeaderboardTeaser from "@/components/LeaderboardTeaser"
import RecruitmentToolsDemo from "@/components/RecruitmentToolsDemo"
import TrustGalaxy from "@/components/TrustGalaxy"
import SignUpCTA from "@/components/SignUpCTA"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
      
      <Navbar />
      
      <Hero />
      
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <HowItWorksScroller />
        </div>
      </section>
      
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <LeaderboardTeaser />
        </div>
      </section>
      
      <section className="py-16 lg:py-24">
        <RecruitmentToolsDemo />
      </section>
      
      <TrustGalaxy />
      
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <SignUpCTA />
        </div>
      </section>
      
      <Footer />
    </main>
  )
}