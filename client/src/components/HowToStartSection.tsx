import { Button } from "@/components/ui/button";
import RuneField from "@/components/RuneField";

interface Step {
  number: string;
  title: string;
  description: string;
}

export default function HowToStartSection() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Conversa estratégica",
      description: "Entendemos objetivos, contexto técnico e riscos prioritários.",
    },
    {
      number: "02",
      title: "Proposta técnica clara",
      description: "Plano com arquitetura, escopo incremental e previsibilidade de investimento.",
    },
    {
      number: "03",
      title: "Primeiro sprint em poucos dias",
      description: "Execução rápida com entregas visíveis desde o início.",
    },
  ];

  return (
    <section className="section-spacing section-divider relative overflow-hidden bg-background">
      <RuneField seed="how-to-start" />
      <div className="container relative z-10">
        <div className="mx-auto mb-16 max-w-4xl">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Começar é
            <br />
            <span className="text-primary">simples</span>
          </h2>
          <p className="text-lg text-muted-foreground">Três passos para transformar visão em plataforma.</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="nordic-panel flex items-start gap-6">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/60 bg-accent/10 font-mono font-semibold text-accent">
                {step.number}
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold text-foreground">{step.title}</h3>
                <p className="text-lg text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}

          <div className="nordic-panel mt-10 text-center">
            <p className="mb-6 text-lg text-muted-foreground">Pronto para começar?</p>
            <Button size="lg" className="rounded-xl bg-accent px-8 font-mono text-base text-accent-foreground hover:bg-accent/90">
              Agendar Diagnóstico Gratuito
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}