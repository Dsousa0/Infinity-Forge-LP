export default function ProblemSection() {
  const problems = [
    "Projetos que nunca terminam",
    "Custos imprevisíveis",
    "Falta de transparência",
    "Sistemas que não escalam",
  ];

  return (
    <section className="section-spacing section-divider bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-12 text-foreground">
            Seu software não pode esperar
            <br />
            <span className="text-accent">meses para existir</span>
          </h2>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-border/30 bg-card/50 hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-destructive flex-shrink-0 mt-1">❌</div>
                  <p className="text-lg font-mono text-foreground group-hover:text-accent transition-colors">
                    {problem}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Transition Message */}
          <div className="mt-12 p-8 rounded-lg border border-accent/30 bg-accent/5">
            <p className="text-xl font-mono text-accent">
              👉 A InfinityForge nasceu para resolver exatamente isso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
