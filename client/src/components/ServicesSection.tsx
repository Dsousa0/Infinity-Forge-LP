interface Service {
  icon: string;
  title: string;
  description: string;
  items: string[];
}

export default function ServicesSection() {
  const services: Service[] = [
    {
      icon: "🧩",
      title: "Sistemas Web Sob Medida",
      description: "Plataformas digitais robustas e escaláveis",
      items: ["Dashboards corporativos", "ERPs personalizados", "Plataformas SaaS", "Integrações complexas"],
    },
    {
      icon: "📱",
      title: "Aplicativos de Alta Performance",
      description: "Experiências mobile que impressionam",
      items: ["Mobile nativo ou híbrido", "APIs escaláveis", "UX focado em performance"],
    },
    {
      icon: "☁️",
      title: "Cloud & DevOps Engineering",
      description: "Infraestrutura preparada para crescimento",
      items: ["Infraestrutura em nuvem", "CI/CD automatizado", "Containers & Docker", "Arquitetura escalável"],
    },
  ];

  return (
    <section id="services" className="section-spacing section-divider bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-foreground">
            Soluções Criadas para
            <br />
            <span className="text-accent">Escalar</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            O que forjamos para seus negócios
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border border-border/30 bg-card/50 hover:border-accent/50 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="text-5xl mb-6">{service.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-mono font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Items List */}
              <ul className="space-y-3">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1">→</span>
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
