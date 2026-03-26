import Hero from "@/components/home/Hero";
import ImpactCounters from "@/components/home/ImpactCounters";
import AboutTeaser from "@/components/home/AboutTeaser";
import EventsStrip from "@/components/home/EventsStrip";
import ImpactWall from "@/components/home/ImpactWall";
import DonationCTA from "@/components/home/DonationCTA";
import MerchPreview from "@/components/home/MerchPreview";

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
      {/* Hero — full viewport */}
      <Hero />

      {/* Impact stats counter */}
      <ImpactCounters />

      <StitchingDivider />

      {/* About BBG teaser */}
      <AboutTeaser />

      {/* Upcoming events horizontal strip */}
      <EventsStrip />

      <StitchingDivider />

      {/* Impact stories + Instagram wall */}
      <ImpactWall />

      <StitchingDivider />

      {/* Donation call-to-action */}
      <DonationCTA />

      {/* Merch preview */}
      <MerchPreview />
    </main>
  );
}
