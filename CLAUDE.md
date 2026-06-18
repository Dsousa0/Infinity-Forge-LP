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
npm run dev       # Dev server em http://localhost:3003 (porta fixa, strictPort)
npm run build     # Build client (Vite) + server (esbuild) → dist/
npm start         # Serve produção (NODE_ENV=production)
npm run check     # Type-check TypeScript (sem emitir)
npm run format    # Prettier em todo o projeto
```

> O projeto usa **npm** (`package-lock.json` é o único lockfile). Resíduos de pnpm
> (lockfile, `packageManager`, patches do Manus) foram removidos na consolidação.

---

## Arquitetura

**Monorepo fullstack com três camadas:**

```
client/      → React 19 SPA (raiz do Vite)
server/      → Express (index.ts), buildado via esbuild
shared/      → Código compartilhado
```

### Client (`client/src/`)

- **Roteamento:** `wouter` — rotas definidas em `App.tsx` (rota `/` → `HomeV2`)
- **Tema:** `ThemeProvider` em `contexts/ThemeContext.tsx`; tema padrão `dark`; para tornar alternável, passar prop `switchable`
- **Página única (V2):** `pages/HomeV2.tsx` orquestra a landing como uma sequência de "chapters" com scroll-spy, navegação lateral e barra de progresso
- **Chapters:** cada bloco é um componente em `components/v2/chapters/` — `HeroChapter`, `ServicesChapter`, `ProcessChapter`, `StackChapter`, `WorkChapter`, `StatsChapter`, `ContactChapter`
- **Chrome da V2:** `components/v2/` — `TopBar`, `NavRail` (navegação por capítulo), `BottomBar`
- **Conteúdo/i18n:** todo o texto vem de `lib/i18n-v2.ts` (objeto `I18N_PT`), passado como prop `t` para cada chapter
- **Estilos da V2:** `styles/v2.css` (importado por `HomeV2`), além do `index.css` global
- **UI primitives:** shadcn/ui via `components/ui/` (Radix UI por baixo) — mantidos apenas os usados: `button`, `card`, `sonner`, `tooltip`. Para adicionar mais, use o CLI do shadcn (`npx shadcn@latest add <componente>`)
- **Animações:** framer-motion
- **Estilos:** Tailwind CSS v4 via plugin Vite (`@tailwindcss/vite`) — sem `tailwind.config.js`

> **Histórico:** existia uma V1 (`pages/Home.tsx` + componentes `*Section` + `Header`/`Footer`/`RuneField`)
> que foi removida na consolidação para versão única. A V2 é a única landing ativa.

### Path aliases

| Alias | Resolve para |
|---|---|
| `@/` | `client/src/` |
| `@shared/` | `shared/` |

### Vite config

- Raiz do Vite é `client/` (não a raiz do repo)
- Dev server em porta fixa `3003` (`strictPort: true`)
- Build emite em `dist/public/`

### Design

- **Tipografia:** `Cinzel` (serifada) para títulos/display, `IBM Plex Mono` para labels e textos pequenos (caixa alta, letter-spacing alto), `Noto Sans Runic` para as runas decorativas
- **Paleta:** preto profundo (`--obsidian`/`--stone`), dourado/laranja forge (`--ember`) — definida em `styles/v2.css` via CSS custom properties
- Espaço negativo abundante; animações sutis; estética de "forja"/engenharia
