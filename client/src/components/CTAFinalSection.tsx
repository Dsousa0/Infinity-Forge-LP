import { Button } from "@/components/ui/button";

export default function CTAFinalSection() {
  return (
    <section className="section-spacing section-divider bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-8 text-foreground">
            Vamos construir seu
            <br />
            <span className="text-accent">próximo sistema?</span>
          </h2>

          {/* Subheading */}
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            Sua ideia merece uma equipe que entenda engenharia. Vamos conversar sobre como transformar
            sua visão em realidade.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="font-mono font-semibold bg-accent hover:bg-accent/90 text-background text-base"
            >
              🔥 Iniciar Projeto
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-mono font-semibold border-accent/50 text-accent hover:bg-accent/10 text-base"
            >
              📅 Agendar Reunião
            </Button>
          </div>

          {/* Contact Info */}
          <div className="p-8 rounded-lg border border-border/30 bg-card/50">
            <p className="text-sm text-muted-foreground mb-4">
              Tempo médio de resposta: <span className="text-accent font-mono">2 horas</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Contato direto: <a href="mailto:contato@infinityforge.com" className="text-accent hover:underline">
                contato@infinityforge.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
