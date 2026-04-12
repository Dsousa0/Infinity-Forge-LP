import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  heroImageUrl?: string;
}

export default function HeroSection({ heroImageUrl }: HeroSectionProps) {
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