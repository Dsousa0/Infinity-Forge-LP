import { Button } from "@/components/ui/button";

interface Step {
  number: string;
  title: string;
  description: string;
}

export default function HowToStartSection() {
  const steps: Step[] = [
    {
      number: "1️⃣",
      title: "Conversa estratégica",
      description: "30 minutos para entender seus objetivos e desafios",
    },
    {
      number: "2️⃣",
      title: "Proposta técnica clara",
      description: "Plano detalhado com timeline, tecnologias e investimento",
    },
    {
      number: "3️⃣",
      title: "Primeira Sprint em poucos dias",
      description: "Começamos a trabalhar imediatamente com resultados visíveis",
    },
  ];

  return (
    <section className="section-spacing section-divider bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-foreground">
            Começar é
            <br />
            <span className="text-accent">simples</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Três passos para transformar sua ideia em realidade
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-8 items-start">
                {/* Number */}
                <div className="flex-shrink-0">
                  <div className="text-5xl">{step.number}</div>
                </div>

                {/* Content */}
                <div className="flex-grow pt-2">
                  <h3 className="text-2xl font-mono font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Divider */}
                {index < steps.length - 1 && (
                  <div className="absolute left-12 w-0.5 h-24 bg-gradient-to-b from-accent to-transparent mt-20" />
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-lg border border-accent/30 bg-accent/5 text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Pronto para começar?
            </p>
            <Button
              size="lg"
              className="font-mono font-semibold bg-accent hover:bg-accent/90 text-background text-base"
            >
              👉 Agendar Diagnóstico Gratuito
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
