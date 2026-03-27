import Hero from "@/components/home/Hero";
import ImpactCounters from "@/components/home/ImpactCounters";
import DraftedPlayersSection from "@/components/home/DraftedPlayers";
import AboutTeaser from "@/components/home/AboutTeaser";
import EventsStrip from "@/components/home/EventsStrip";
import ImpactWall from "@/components/home/ImpactWall";
import VideoShowcase from "@/components/home/VideoShowcase";
import TestimonialsSection from "@/components/home/Testimonials";
import DonationCTA from "@/components/home/DonationCTA";
import LiveNewsFeed from "@/components/home/LiveNewsFeed";
import MerchPreview from "@/components/home/MerchPreview";
import Partners from "@/components/home/Partners";

function StitchingDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-px ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 8px, var(--stitch-color, rgba(245,166,35,0.3)) 8px, var(--stitch-color, rgba(245,166,35,0.3)) 16px)",
          backgroundSize: "24px 1px",
        }}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* 1. Hero — full viewport */}
      <Hero />

      {/* 2. Impact stats counter */}
      <ImpactCounters />

      <StitchingDivider />

      {/* 3. Drafted players showcase */}
      <DraftedPlayersSection />

      {/* 4. About BBG teaser */}
      <AboutTeaser />

      {/* 5. Upcoming events horizontal strip */}
      <EventsStrip />

      <StitchingDivider />

      {/* 6. Impact stories + Instagram wall */}
      <ImpactWall />

      <StitchingDivider />

      {/* 7. Video Showcase — See It In Action */}
      <VideoShowcase />

      {/* 8. Testimonials carousel */}
      <TestimonialsSection />

      {/* 9. Donation call-to-action */}
      <DonationCTA />

      <StitchingDivider />

      {/* 10. BBG Players in the Spotlight */}
      <LiveNewsFeed />

      {/* 11. Merch preview */}
      <MerchPreview />

      {/* 12. MLB Partners & Affiliations */}
      <Partners />
    </main>
  );
}
