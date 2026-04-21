import RuneField from "@/components/RuneField";

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
      description: "Plataformas de alta complexidade com arquitetura modular, prontas para sustentar o crescimento do seu negócio.",
      items: ["BI & Dashboards Corporativos", "Sistemas ERP & CRM Customizados", "Ecossistemas SaaS Escaláveis", "Integrações e APIs de Terceiros"],
    },
    {
      icon: "ᛒ",
      title: "Aplicativos de Alta Performance",
      description: "Experiências mobile nativas e híbridas desenvolvidas com foco em responsividade, estabilidade e performance extrema.",
      items: ["Desenvolvimento Nativo (iOS/Android) ou Híbrido", "Arquitetura Mobile-First", "Backends de Alta Disponibilidade", "UX/UI focada em Retenção e Conversão"],
    },
    {
      icon: "ᛞ",
      title: "Cloud & DevOps Engineering",
      description: "Infraestrutura resiliente e automação inteligente para garantir segurança e agilidade no ciclo de vida do software.",
      items: ["Arquitetura em Nuvem", "Pipeline de CI/CD e Automação de Testes", "Orquestração de Containers", "Monitoramento e Observabilidade 24/7"],
    },
  ];

  return (
    <section id="services" className="section-spacing relative overflow-hidden bg-background">
      <RuneField seed="services" />
      <div className="container relative z-10">
        <div className="mx-auto mb-16 max-w-4xl">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Soluções criadas para
            <br />
            <span className="text-primary">escala sustentável</span>
          </h2>
          <p className="text-lg text-muted-foreground">Arquitetura, produto e engenharia integrados em uma visão de longo prazo</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="nordic-panel nordic-panel-hover group">
              <div className="mb-6 font-mono text-4xl text-accent">{service.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary md:text-2xl">{service.title}</h3>
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