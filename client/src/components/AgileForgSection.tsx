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
      icon: "🔥",
      title: "Discovery Forge",
      description: "Entendimento profundo do negócio, definição técnica rápida e MVP estratégico",
    },
    {
      icon: "⚙️",
      title: "Sprint Build",
      description: "Sprints semanais ou quinzenais com entregas funcionais constantes e deploy contínuo",
    },
    {
      icon: "👁️",
      title: "Transparent Flow",
      description: "Cliente acompanha tudo, dashboard de progresso e comunicação direta com devs",
    },
    {
      icon: "🚀",
      title: "Scale & Optimize",
      description: "Monitoramento contínuo, performance e evolução contínua do sistema",
    },
  ];

  return (
    <section id="process" className="section-spacing section-divider bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-foreground">
            O Agile Forge
          </h2>
          <p className="text-lg text-muted-foreground">
            Nosso método de construção exclusivo que garante resultados contínuos
          </p>
        </div>

        {/* Process Image */}
        {processImageUrl && (
          <div className="mb-16 rounded-lg overflow-hidden border border-border/30">
            <img
              src={processImageUrl}
              alt="Agile Forge Process"
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Process Stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-border/30 bg-card/50 hover:border-accent/50 transition-all duration-300 group"
            >
              {/* Stage Number */}
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-accent/50 group-hover:border-accent transition-colors">
                  <span className="text-lg font-mono font-bold text-accent">{index + 1}</span>
                </div>
              </div>

              {/* Icon */}
              <div className="text-4xl mb-4">{stage.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-mono font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                {stage.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Message */}
        <div className="mt-16 p-8 rounded-lg border border-accent/30 bg-accent/5 text-center">
          <p className="text-xl md:text-2xl font-mono font-bold text-accent">
            Você nunca fica meses sem ver resultado.
          </p>
        </div>
      </div>
    </section>
  );
}
