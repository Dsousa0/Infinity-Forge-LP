import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  heroImageUrl?: string;
}

export default function HeroSection({ heroImageUrl }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      {heroImageUrl && (
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `url('${heroImageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-background via-background/80 to-background" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center fade-in-up">
          {/* Badges */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <div className="tech-badge">🔥 Agile Driven</div>
            <div className="tech-badge">☁️ Cloud Native</div>
            <div className="tech-badge">🚀 DevOps Ready</div>
          </div>

          {/* Main Headline */}
          <h1 className="hero-text text-5xl md:text-7xl font-mono font-bold mb-6 text-foreground">
            Forjando Sistemas
            <br />
            <span className="text-accent">Escaláveis</span> com
            <br />
            Agilidade Infinita
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Transformamos ideias complexas em plataformas digitais robustas através de desenvolvimento ágil,
            arquitetura moderna e entregas contínuas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="font-mono font-semibold bg-accent hover:bg-accent/90 text-background text-base"
            >
              👉 Iniciar Meu Projeto
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-mono font-semibold border-accent/50 text-accent hover:bg-accent/10 text-base"
            >
              👉 Ver Como Trabalhamos
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="text-accent text-2xl">↓</div>
      </div>
    </section>
  );
}
