import RuneField from "@/components/RuneField";

export default function AboutSection() {
  const values = [
    {
      title: "Mentalidade de Engenharia",
      description: "Pensamos como engenheiros, não como agência. Cada decisão é técnica e estratégica.",
    },
    {
      title: "Experiência Prática",
      description: "Anos de experiência em produção, escalabilidade e arquitetura de sistemas complexos.",
    },
    {
      title: "Cultura Ágil Real",
      description: "Não é apenas metodologia. É como trabalhamos, pensamos e entregamos valor.",
    },
    {
      title: "Parceria de Longo Prazo",
      description: "Seu sucesso é nosso sucesso. Crescemos juntos, não apenas entregamos projetos.",
    },
  ];

  return (
    <section className="section-spacing section-divider relative overflow-hidden bg-background">
      <RuneField seed="about" />
      <div className="container relative z-10 mx-auto px-4">
        {/* Heading */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-foreground">
            Quem está por trás
            <br />
            <span className="text-accent">da Forge</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Uma equipe de engenheiros apaixonados por construir tecnologia de qualidade
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="nordic-panel nordic-panel-hover group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <span className="text-lg font-mono font-bold text-accent">✓</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-mono font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="nordic-panel mt-16 max-w-3xl mx-auto text-center">
          <p className="text-lg text-foreground leading-relaxed">
            Humanizamos sem perder autoridade. Somos técnicos, mas entendemos negócio. Somos ágeis, mas
            entregamos qualidade. Somos parceiros, não fornecedores.
          </p>
        </div>
      </div>
    </section>
  );
}
