// client/src/lib/i18n-v2.ts

export interface ServiceItem {
  rune: string;
  name: string;
  desc: string;
}

export interface ProcessStep {
  rune: string;
  name: string;
  sub: string;
  desc: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface WorkItem {
  tag: string;
  title: string;
  desc: string;
  metric: string;
}

export interface StatItem {
  num: string;
  label: string;
  rune: string;
}

export interface I18nContent {
  cta: {
    primary: string;
    secondary: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    sub: string;
  };
  services: {
    eyebrow: string;
    title: string;
    sub: string;
    list: ServiceItem[];
  };
  process: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: ProcessStep[];
  };
  stack: {
    eyebrow: string;
    title: string;
    sub: string;
    groups: StackGroup[];
  };
  work: {
    eyebrow: string;
    title: string;
    sub: string;
    items: WorkItem[];
  };
  stats: {
    eyebrow: string;
    title: string;
    sub: string;
    items: StatItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
    email: string;
    ph_name: string;
    ph_email: string;
    ph_company: string;
    ph_msg: string;
  };
}

export const I18N_PT: I18nContent = {
  cta: {
    primary: 'Forjar projeto',
    secondary: 'Conversar com a equipe',
  },
  hero: {
    eyebrow: 'Engenharia de software escalável',
    title1: 'Forjamos software',
    title2: 'à prova de tempo',
    sub: 'Da descoberta ao deploy, transformamos ideias em sistemas duradouros — soluções sob medida para empresas que constroem para o longo prazo.',
  },
  services: {
    eyebrow: '⌁ Serviços',
    title: 'O que sai da forja',
    sub: 'Cada disciplina tem seu nome — e seu propósito.',
    list: [
      { rune: 'Mjölnir',     name: 'Aplicativos Mobile',               desc: 'iOS e Android nativos ou híbridos. Performance, offline-first e UX que aguenta o impacto do uso real.' },
      { rune: 'Yggdrasil',   name: 'Arquitetura & Software sob medida', desc: 'Sistemas críticos com raízes profundas. Desenhamos a árvore-mundo do seu produto.' },
      { rune: 'Bifröst',     name: 'APIs & Integrações',                desc: 'Pontes entre sistemas legados, ERPs, gateways e serviços modernos. Confiáveis em qualquer travessia.' },
      { rune: 'Asgard',      name: 'Cloud, DevOps & Infra',             desc: 'AWS, GCP, Azure. CI/CD, observabilidade, segurança. A morada dos seus serviços.' },
      { rune: 'Huginn',      name: 'IA & Automação',                    desc: 'Agentes, RAG, automação de processos. Os corvos de Odin observando seus dados.' },
      { rune: 'Skidbladnir', name: 'Aplicações Web & SaaS',             desc: 'O navio dobrável dos deuses — web apps que se adaptam a qualquer escala.' },
      { rune: 'Mímir',       name: 'Consultoria & Arquitetura',         desc: 'O guardião da sabedoria. Auditoria, due diligence técnica, decisões de stack.' },
      { rune: 'Idunn',       name: 'UX/UI Design',                      desc: 'A guardiã das maçãs douradas. Interfaces que mantêm seu produto eternamente jovem.' },
    ],
  },
  process: {
    eyebrow: '⌁ Processo',
    title: 'Quatro estágios da forja',
    sub: 'Como transformamos minério em lâmina.',
    steps: [
      { rune: 'I',   name: 'Descoberta', sub: 'Mineração',          desc: 'Imersão no problema, no negócio e nos usuários. Mapeamos restrições, riscos e oportunidades.' },
      { rune: 'II',  name: 'Forja',      sub: 'Modelagem ao calor', desc: 'Arquitetura, design e desenvolvimento iterativo. Demonstrações semanais, decisões reversíveis.' },
      { rune: 'III', name: 'Têmpera',    sub: 'Endurecimento',      desc: 'Testes, performance, segurança. Resfriamento controlado para que a lâmina não trinque em produção.' },
      { rune: 'IV',  name: 'Entrega',    sub: 'Lâmina afiada',      desc: 'Deploy, observabilidade e suporte contínuo. Treinamos seu time e mantemos a forja acesa.' },
    ],
  },
  stack: {
    eyebrow: '⌁ Stack',
    title: 'Ferramentas da bigorna',
    sub: 'Tecnologias maduras, escolhidas com critério — não por modismo.',
    groups: [
      { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'React Native', 'Flutter', 'Vue'] },
      { label: 'Backend',  items: ['Node.js', 'Python', '.NET', 'Go', 'Rust', 'Java'] },
      { label: 'Dados',    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'BigQuery', 'Kafka'] },
      { label: 'Cloud',    items: ['AWS', 'GCP', 'Azure', 'Cloudflare', 'Kubernetes', 'Terraform'] },
      { label: 'IA',       items: ['OpenAI', 'Anthropic', 'LangChain', 'Hugging Face', 'Vector DBs', 'MLOps'] },
    ],
  },
  work: {
    eyebrow: '⌁ Cases',
    title: 'Lâminas já forjadas',
    sub: 'Uma seleção do que entregamos. Pedimos NDA quando preciso.',
    items: [
      { tag: 'Fintech',    title: 'Plataforma de crédito B2B',        desc: 'Sistema de análise e concessão. 40k análises/mês, decisão em <2s.',             metric: '↓ 73% no tempo de aprovação' },
      { tag: 'Healthtech', title: 'Prontuário eletrônico distribuído', desc: 'Multi-clínica, offline-first, com sincronização eventual.',                      metric: '99.99% uptime em 18 meses' },
      { tag: 'Logística',  title: 'Roteirização com IA',               desc: 'Otimização de frota com restrições reais (janelas, jornada, peso).',              metric: '↓ 28% custo por entrega' },
      { tag: 'Indústria',  title: 'IIoT — chão de fábrica',           desc: 'Coleta em tempo real de 600+ sensores, dashboards e alertas.',                   metric: '↑ 12% OEE em 6 meses' },
    ],
  },
  stats: {
    eyebrow: '⌁ Números',
    title: 'A bigorna em números',
    sub: 'Resultado de oito anos batendo aço — sem rotatividade, sem terceirização.',
    items: [
      { num: '120+',   label: 'Projetos entregues', rune: 'ᚠ' },
      { num: '8',      label: 'Anos forjando',       rune: 'ᚱ' },
      { num: '99.98%', label: 'Uptime médio',        rune: 'ᚦ' },
      { num: '24h',    label: 'Resposta média',      rune: 'ᛟ' },
    ],
  },
  contact: {
    eyebrow: '⌁ Acendam a forja',
    title: 'Vamos forjar o próximo capítulo',
    sub: 'Conte sobre seu projeto. Respondemos em 24h úteis com uma proposta inicial e uma conversa exploratória — sem custo, sem pressão.',
    cta: 'Iniciar conversa',
    email: 'contato@infinityforge.com.br',
    ph_name: 'Seu nome',
    ph_email: 'E-mail corporativo',
    ph_company: 'Empresa',
    ph_msg: 'Conte sobre o projeto…',
  },
};
