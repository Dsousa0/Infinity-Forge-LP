import { Button } from "@/components/ui/button";
import { useMemo } from "react";

interface HeroSectionProps {
  heroImageUrl?: string;
}

export default function HeroSection({ heroImageUrl }: HeroSectionProps) {
  const floatingRunes = useMemo(() => {
    const runes = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛋ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛟ"];
    const seededValue = (index: number, seedOffset: number) => {
      const x = Math.sin((index + 1) * 12.9898 + seedOffset * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    return Array.from({ length: 34 }, (_, index) => ({
      id: `rune-${index}`,
      glyph: runes[Math.floor(seededValue(index, 1) * runes.length)],
      top: `${seededValue(index, 2) * 100}%`,
      left: `${seededValue(index, 3) * 100}%`,
      size: `${0.95 + seededValue(index, 4) * 1.2}rem`,
      opacity: 0.25 + seededValue(index, 5) * 0.45,
      duration: `${10 + seededValue(index, 6) * 8}s`,
      delay: `${seededValue(index, 7) * 5}s`,
    }));
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      {heroImageUrl && (
        <div
          className="absolute inset-0 z-0 opacity-15 mix-blend-multiply"
          style={{
            backgroundImage: `url('${heroImageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="rune-field absolute inset-0 z-0" aria-hidden="true">
        {floatingRunes.map((rune) => (
          <span
            key={rune.id}
            className="floating-rune"
            style={{
              top: rune.top,
              left: rune.left,
              fontSize: rune.size,
              opacity: rune.opacity,
              animationDuration: rune.duration,
              animationDelay: rune.delay,
            }}
          >
            {rune.glyph}
          </span>
        ))}
      </div>

      <div className="container relative z-10 py-20">
        <div className="mx-auto max-w-4xl text-center fade-in-up">
          <div className="mb-7 flex flex-wrap justify-center gap-3">
            <span className="rune-chip">ᚱ Engenharia de Sofware</span>
            <span className="rune-chip">ᚠ Produto Escalável</span>
            <span className="rune-chip">ᛟ Entrega Contínua</span>
          </div>

          <h1 className="hero-text mb-7 text-5xl font-bold text-foreground md:text-7xl">
            Software com DNA
            <br />
            <span className="text-primary">inovador</span> e o rigor
            <br />
            da  <span className="text-primary">engenharia</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Transformamos complexidade em fluidez: plataformas de arquitetura sólida com interfaces limpas, entregando a experiência premium que sua marca merece.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="rounded-xl bg-primary px-8 font-mono text-base text-primary-foreground hover:bg-primary/90">
              Iniciar Meu Projeto
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl border-primary/60 px-8 font-mono text-base text-primary hover:bg-primary/10">
              Conhecer o Método
            </Button>
          </div>
          <div className="mt-10 flex justify-center">
            <div className="ornament-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
