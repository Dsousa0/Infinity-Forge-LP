import RuneField from "@/components/RuneField";

export default function ProblemSection() {
  const problems = [
    "Projetos que nunca terminam",
    "Custos imprevisíveis",
    "Falta de transparência",
    "Sistemas que não escalam",
  ];

  return (
    <section className="section-spacing section-divider relative overflow-hidden bg-background">
      <RuneField seed="problem" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-4xl font-bold text-foreground md:text-5xl">
            Seu software não pode esperar
            <br />
            <span className="text-primary">meses para existir</span>
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {problems.map((problem, index) => (
              <div key={index} className="nordic-panel nordic-panel-hover group">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-xl text-accent">ᛉ</div>
                  <p className="text-lg font-mono text-foreground transition-colors group-hover:text-primary">{problem}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="nordic-panel mt-12">
            <p className="text-xl font-mono text-primary">A Infinity Forge nasceu para resolver exatamente isso.</p>
          </div>
        </div>
      </div>
    </section>
  );
}