import RuneField from "@/components/RuneField";

interface Differential {
  title: string;
  description: string;
}

export default function DifferentialsSection() {
  const differentials: Differential[] = [
    {
      title: "Arquitetura orientada a domínio",
      description: "Sistemas que espelham seu negócio. Arquitetura desenhada para evoluir com as suas regras, independente das tecnologias de mercado",
    },
    {
      title: "Microsserviços quando necessário",
      description: "Escalabilidade consciente. Desenvolvemos sistemas modulares que crescem conforme a demanda, evitando o custo da complexidade prematura",
    },
    {
      title: "Código versionado e auditável",
      description: "Transparência técnica total. Rastreabilidade completa e histórico de evolução para garantir a integridade e a segurança do seu ativo digital",
    },
    {
      title: "Observabilidade desde o dia zero",
      description: "Visibilidade total do sistema. Implementamos métricas e logs em tempo real para identificar e resolver problemas antes mesmo que eles afetem o usuário",
    },
    {
      title: "Segurança integrada",
      description: "Segurança nativa. Proteção de dados e blindagem de aplicações integradas em cada etapa do ciclo de vida do desenvolvimento.",
    },
    {
      title: "Performance como requisito",
      description: "Software de alta resposta. A performance não é um ajuste final, é uma diretriz arquitetural para garantir velocidade e eficiência sob carga",
    },
  ];

  return (
    <section id="differentials" className="section-spacing relative overflow-hidden bg-background">
      <RuneField seed="differentials" />
      <div className="container relative z-10 mx-auto px-4">
        {/* Heading */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-mono font-bold mb-4 text-foreground md:text-4xl lg:text-5xl">
            Engenharia de Software,
            <br />
            <span className="text-accent">Não apenas desenvolvimento</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Engenharia de Software de alto nível: construindo legados, não apenas código
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