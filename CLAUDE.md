# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Acervo de referência (agnostic-core)

**Antes de planejar ou implementar qualquer coisa, consulte o acervo em `.agnostic-core/`.**

Leia o índice de skills disponíveis:
- `.agnostic-core/README.md` — visão geral de todas as categorias
- `.agnostic-core/CLAUDE.md` — regras de comportamento do Claude neste workspace

Skills relevantes para este projeto:

| Necessidade | Arquivo |
|---|---|
| Segurança de API | `.agnostic-core/skills/security/` |
| Governança CSS / Tailwind | `.agnostic-core/skills/frontend/` |
| UX e hierarquia visual | `.agnostic-core/skills/ux-ui/` |
| Auditoria de performance | `.agnostic-core/skills/performance/` |
| Revisão de código | `.agnostic-core/skills/audit/` |
| Workflows de processo | `.agnostic-core/commands/workflows/` |

Agentes especializados disponíveis: `.agnostic-core/agents/`

---

## Comandos

```bash
pnpm dev          # Dev server em http://localhost:3000
pnpm build        # Build client (Vite) + server (esbuild) → dist/
pnpm start        # Serve produção (NODE_ENV=production)
pnpm check        # Type-check TypeScript (sem emitir)
pnpm format       # Prettier em todo o projeto
```

> O projeto usa `pnpm`. Não usar `npm` ou `yarn`.

---

## Arquitetura

**Monorepo fullstack com três camadas:**

```
client/      → React 19 SPA (raiz do Vite)
server/      → Express (index.ts), buildado via esbuild
shared/      → Código compartilhado
```

### Client (`client/src/`)

- **Roteamento:** `wouter` — rotas definidas em `App.tsx`
- **Tema:** `ThemeProvider` em `contexts/ThemeContext.tsx`; tema padrão `dark`; para tornar alternável, passar prop `switchable`
- **Página única:** `pages/Home.tsx` compõe todas as seções da LP em ordem linear
- **Seções:** cada bloco da landing é um componente isolado em `components/` (Header, HeroSection, ProblemSection, AgileForgSection, ServicesSection, DifferentialsSection, HowToStartSection, AboutSection, CTAFinalSection, Footer)
- **UI primitives:** shadcn/ui via `components/ui/` (Radix UI por baixo)
- **Animações:** framer-motion
- **Estilos:** Tailwind CSS v4 via plugin Vite (`@tailwindcss/vite`) — sem `tailwind.config.js`

### Path aliases

| Alias | Resolve para |
|---|---|
| `@/` | `client/src/` |
| `@shared/` | `shared/` |

### Vite config

- Raiz do Vite é `client/` (não a raiz do repo)
- Build emite em `dist/public/`
- Plugin `vitePluginManusDebugCollector` captura logs do browser em `.manus-logs/` durante dev — não remover

### Design

- Tipografia monospace (IBM Plex Mono) para títulos — reforça identidade de engenharia
- Paleta: preto profundo, azul elétrico, laranja forge
- Espaço negativo abundante; animações sutis; layout assimétrico
- Componente `RuneField` renderiza runas decorativas deterministicamente (sem `Math.random()`)
