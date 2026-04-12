interface Service {
  icon: string;
  title: string;
  description: string;
  items: string[];
}

export default function ServicesSection() {
  const services: Service[] = [
    {
      icon: "ᚢ",
      title: "Sistemas Web Sob Medida",
      description: "Plataformas robustas com estrutura clara e preparada para evolução.",
      items: ["Dashboards corporativos", "ERPs personalizados", "Plataformas SaaS", "Integrações complexas"],
    },
    {
      icon: "ᛒ",
      title: "Aplicativos de Alta Performance",
      description: "Experiências mobile fluidas com foco em estabilidade e velocidade.",
      items: ["Nativo ou híbrido", "APIs escaláveis", "UX orientado a conversão"],
    },
    {
      icon: "ᛞ",
      title: "Cloud & DevOps Engineering",
      description: "Infraestrutura confiável para crescer com segurança.",
      items: ["Infraestrutura em nuvem", "CI/CD automatizado", "Containers", "Arquitetura escalável"],
    },
  ];

  return (
    <section id="services" className="section-spacing section-divider bg-background">
      <div className="container">
        <div className="mx-auto mb-16 max-w-4xl">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Soluções criadas para
            <br />
            <span className="text-primary">escala sustentável</span>
          </h2>
          <p className="text-lg text-muted-foreground">Arquitetura, produto e operação com uma única visão.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="nordic-panel nordic-panel-hover group">
              <div className="mb-6 font-mono text-4xl text-accent">{service.icon}</div>
              <h3 className="mb-2 text-2xl font-bold text-foreground transition-colors group-hover:text-primary">{service.title}</h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">{service.description}</p>

              <ul className="space-y-3">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
