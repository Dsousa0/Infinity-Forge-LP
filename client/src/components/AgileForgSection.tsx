import RuneField from "@/components/RuneField";

interface ProcessStage {
  icon: string;
  title: string;
  description: string;
}

export default function AgileForgSection() {
  const stages: ProcessStage[] = [
    {
      icon: "ᚠ",
      title: "Discovery Forge",
      description: "Imersão profunda no ecossistema do negócio, definição de requisitos técnicos e arquitetura estratégica para um MVP de alto impacto.",
    },
    {
      icon: "ᛟ",
      title: "Sprint Build",
      description: "Ciclos ágeis de desenvolvimento com entregas tangíveis. Validação contínua de funcionalidades e deploys em alta frequência.",
    },
    {
      icon: "ᚱ",
      title: "Transparent Flow",
      description: "Monitoramento total da evolução do projeto através de métricas de performance e comunicação direta, garantindo um fluxo livre de ruídos.",
    },
    {
      icon: "ᚷ",
      title: "Scale & Optimize",
      description: "Otimização contínua baseada em dados reais. Escalonamento de infraestrutura, foco em estabilidade e máxima performance em produção.",
    },
  ];

  return (
    <section id="process" className="section-spacing section-divider relative overflow-hidden bg-background">
      <RuneField seed="process" />
      <div className="container relative z-10">
        <div className="mx-auto mb-16 max-w-4xl">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">O Método Forge</h2>
          <p className="text-lg text-muted-foreground">Engenharia de alta precisão, interfaces intuitivas e cronogramas sem imprevistos</p>
        </div>


        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <div key={index} className="nordic-panel nordic-panel-hover group">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                <span className="font-mono text-lg font-bold text-primary">{index + 1}</span>
              </div>
              <div className="mb-3 font-mono text-2xl text-accent">{stage.icon}</div>
              <h3 className="mb-3 text-lg font-bold text-foreground transition-colors group-hover:text-primary">{stage.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
            </div>
          ))}
        </div>

        <div className="nordic-panel mt-16 text-center">
          <p className="text-xl font-mono font-bold text-primary md:text-2xl">Resultados consistentes em terra firme, longe do mar de incertezas</p>
        </div>
      </div>
    </section>
  );
}
