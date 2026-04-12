interface ProcessStage {
  icon: string;
  title: string;
  description: string;
}

interface AgileForgeSectionProps {
  processImageUrl?: string;
}

export default function AgileForgSection({ processImageUrl }: AgileForgeSectionProps) {
  const stages: ProcessStage[] = [
    {
      icon: "ᚠ",
      title: "Discovery Forge",
      description: "Imersão no negócio, definição técnica objetiva e desenho do MVP estratégico.",
    },
    {
      icon: "ᛟ",
      title: "Sprint Build",
      description: "Ciclos curtos com entregas reais, validação contínua e deploy frequente.",
    },
    {
      icon: "ᚱ",
      title: "Transparent Flow",
      description: "Visibilidade total da evolução, métricas claras e comunicação sem ruído.",
    },
    {
      icon: "ᚷ",
      title: "Scale & Optimize",
      description: "Evolução orientada por dados, performance e estabilidade em produção.",
    },
  ];

  return (
    <section id="process" className="section-spacing section-divider bg-background">
      <div className="container">
        <div className="mx-auto mb-16 max-w-4xl">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">O Método Forge</h2>
          <p className="text-lg text-muted-foreground">Execução enxuta, estética limpa e previsibilidade de entrega.</p>
        </div>

        {processImageUrl && (
          <div className="mb-16 overflow-hidden rounded-2xl border border-primary/20 shadow-sm">
            <img src={processImageUrl} alt="Agile Forge Process" className="h-auto w-full" />
          </div>
        )}

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
          <p className="text-xl font-mono font-bold text-primary md:text-2xl">Resultado frequente, sem mar aberto de incerteza.</p>
        </div>
      </div>
    </section>
  );
}
