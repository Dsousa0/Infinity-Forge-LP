import { Button } from "@/components/ui/button";

export default function CTAFinalSection() {
  return (
    <section id="contact" className="section-spacing section-divider bg-background">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-4xl font-bold text-foreground md:text-5xl">
            Vamos construir seu
            <br />
            <span className="text-primary">próximo sistema</span>?
          </h2>

          <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
            Estratégia enxuta, design elegante e engenharia de ponta para transformar sua visão em produto digital.
          </p>

          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="rounded-xl bg-primary px-8 font-mono text-base text-primary-foreground hover:bg-primary/90">
              Iniciar Projeto
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl border-primary/50 px-8 font-mono text-base text-primary hover:bg-primary/10">
              Agendar Reunião
            </Button>
          </div>

          <div className="nordic-panel">
            <p className="mb-4 text-sm text-muted-foreground">
              Tempo médio de resposta: <span className="font-mono text-primary">2 horas</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Contato direto: <a href="mailto:contato@infinityforge.com" className="text-primary hover:underline">contato@infinityforge.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
