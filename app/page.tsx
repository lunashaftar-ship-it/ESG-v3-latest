import Hero from "@/components/landing/hero";
import ImpactNumbers from "@/components/landing/impact-number";
import PillarsGallery from "@/components/landing/pillars-gallery";
import CEOTeaser from "@/components/landing/ceo-teaser";
import ReportCTA from "@/components/landing/report-cta";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <main className="mt-header">
        <Hero />
        <ImpactNumbers />
        <PillarsGallery />
        <CEOTeaser />
        <ReportCTA />
      </main>
      <Footer />
    </>
  );
}
