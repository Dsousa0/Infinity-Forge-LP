interface Differential {
  title: string;
  description: string;
}

export default function DifferentialsSection() {
  const differentials: Differential[] = [
    {
      title: "Arquitetura orientada a domínio",
      description: "Design focado em regras de negócio, não em frameworks",
    },
    {
      title: "Microsserviços quando necessário",
      description: "Escalabilidade sem complexidade desnecessária",
    },
    {
      title: "Código versionado e auditável",
      description: "Rastreabilidade completa de todas as mudanças",
    },
    {
      title: "Observabilidade desde o dia zero",
      description: "Monitoramento integrado desde o início do projeto",
    },
    {
      title: "Segurança integrada",
      description: "Práticas de segurança em todas as camadas",
    },
    {
      title: "Performance como requisito",
      description: "Otimização contínua desde a arquitetura",
    },
  ];

  return (
    <section id="differentials" className="section-spacing section-divider bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-foreground">
            Engenharia de Software,
            <br />
            <span className="text-accent">não apenas desenvolvimento</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Diferenciais técnicos que garantem qualidade e longevidade
          </p>
        </div>


        {/* Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentials.map((diff, index) => (
            <div
              key={index}
              className="nordic-panel nordic-panel-hover group"
            >
              {/* Number */}
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 border border-accent/30 group-hover:bg-accent/20 transition-colors">
                  <span className="text-sm font-mono font-bold text-accent">{String(index + 1).padStart(2, "0")}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-mono font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                {diff.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {diff.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
