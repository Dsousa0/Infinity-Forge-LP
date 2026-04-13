import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import AgileForgSection from "@/components/AgileForgSection";
import ServicesSection from "@/components/ServicesSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import HowToStartSection from "@/components/HowToStartSection";
import AboutSection from "@/components/AboutSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import Footer from "@/components/Footer";
import NordicRunesOverlay from "@/components/NordicRunesOverlay";

/**
 * InfinityForge Landing Page
 *
 * Design Philosophy: Minimalist Engineering
 * - Tipografia monospace (IBM Plex Mono) para títulos transmitindo engenharia
 * - Espaço negativo abundante
 * - Paleta: Preto profundo, azul elétrico, laranja forge
 * - Animações sutis e controladas
 * - Layout assimétrico com precisão
 */
export default function Home() {
  // Asset URLs from webdev project CDN
  const heroImageUrl =
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663032701910/47FFEKKvjbQg6NeYkd29nW/hero-forge-abstract-iPEXvMxdGotN4bfWssvZBA.webp";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <NordicRunesOverlay />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection heroImageUrl={heroImageUrl} />
          <ProblemSection />
          <AgileForgSection />
          <ServicesSection />
          <DifferentialsSection />
          <HowToStartSection />
          <AboutSection />
          <CTAFinalSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
