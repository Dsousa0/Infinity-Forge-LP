# Redesign V3 — Cockpit HUD Nórdico-Futurista — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remodelar o visual da landing InfinityForge para uma estética HUD nórdico-futurista, com uma casca de "cockpit" persistente envolvendo os 7 módulos de conteúdo.

**Architecture:** Mantém a página `HomeV2` e o scroll-spy existentes. Adiciona uma casca `CockpitFrame` (brackets de canto, TopBar com telemetria, NavRail lateral, BottomBar com ticker, scanline) que envolve o `<main>` rolável. Cada chapter (`components/v2/chapters/*`) é refatorado para tratamento HUD. Estilos da casca/primitivos num novo `styles/cockpit.css`; estilos por módulo seguem em `styles/v2.css`.

**Tech Stack:** Vite 7 + React 19 + TypeScript, Tailwind v4 (via plugin, sem config), CSS custom properties. Fontes: Cinzel (display) + IBM Plex Mono (mono) + Noto Sans Runic (runas).

## Global Constraints

- **Gerenciador:** npm (único lockfile `package-lock.json`). Dev server fixo na **porta 3003**.
- **Sem runner de testes de componente.** Verificação por task = `npm run check` (tsc --noEmit) + `npm run build` quando relevante + checagem visual via Playwright (desktop 1440×900 e mobile 390×844) + **console com 0 erros**.
- **Acessibilidade:** todo efeito de movimento DEVE ter fallback em `@media (prefers-reduced-motion: reduce)`.
- **Performance:** animar apenas `transform`/`opacity`; faíscas/partículas removidas ao terminar; nada de reflow em loop.
- **Tokens da marca (não alterar valores):** `--ember:#d2aa68`, `--ember-2:#e7c485`, `--frost:#6fb0c4`, `--frost-2:#a8d0db`, `--ink:#0a0e12`, `--stone-3:#e8ece5`. Novo: `--line:rgba(127,182,196,.20)`.
- **Conteúdo:** não alterar copy; todo texto vem de `lib/i18n-v2.ts` (objeto `I18N_PT`, passado como prop `t`).
- **Branch:** `redesign-cockpit-hud`. Commits frequentes, um por task.
- **Fonte de verdade da casca:** o mockup verificado `scratchpad/cockpit-mockup.html` (CSS/markup já validados no navegador) — portar para React/CSS.

## File Structure

| Arquivo | Responsabilidade | Ação |
|---|---|---|
| `client/src/styles/cockpit.css` | Primitivos HUD + casca (brackets, bars, rail, scanline, módulo-tag, hud-panel) | Criar |
| `client/src/components/v2/cockpit/CockpitFrame.tsx` | Orquestra a casca persistente; recebe `chapters`, `activeIdx`, `scrollProgress`, `onJump` | Criar |
| `client/src/components/v2/TopBar.tsx` | Marca + telemetria + relógio ao vivo | Modificar |
| `client/src/components/v2/NavRail.tsx` | Trilha lateral vertical com tick ativo | Modificar |
| `client/src/components/v2/BottomBar.tsx` | Índice de módulo + ticker + dica | Modificar |
| `client/src/pages/HomeV2.tsx` | Envolver `<main>` no `CockpitFrame`; importar `cockpit.css` | Modificar |
| `client/src/components/v2/chapters/HeroChapter.tsx` | Módulo Origem (reticle + faíscas + tag) | Modificar |
| `client/src/components/v2/chapters/ServicesChapter.tsx` | Módulo Serviços (painéis HUD) | Modificar |
| `client/src/components/v2/chapters/ProcessChapter.tsx` | Módulo Processo (timeline de calibração) | Modificar |
| `client/src/components/v2/chapters/StackChapter.tsx` | Módulo Stack (radar/scanner) | Modificar |
| `client/src/components/v2/chapters/WorkChapter.tsx` | Módulo Cases (registros de missão) | Modificar |
| `client/src/components/v2/chapters/StatsChapter.tsx` | Módulo Números (telemetria + count-up) | Modificar |
| `client/src/components/v2/chapters/ContactChapter.tsx` | Módulo Contato (console de transmissão) | Modificar |
| `client/src/styles/v2.css` | Regras por módulo + responsividade | Modificar |

> **Antes de cada task de módulo (6–12): leia o componente atual e a seção correspondente de `v2.css`.** O implementador aplica as mudanças descritas sobre o estado atual (não recria do zero).

---

## Phase 0 — Fundações

### Task 1: Primitivos HUD em `cockpit.css`

**Files:**
- Create: `client/src/styles/cockpit.css`
- Modify: `client/src/pages/HomeV2.tsx` (adicionar `import '@/styles/cockpit.css';` logo após o import de `v2.css`)

**Interfaces:**
- Produces: classes CSS `.ck-frame`, `.ck-bracket` (`.tl/.tr/.bl/.br`), `.ck-scanline`, `.ck-topbar`, `.ck-rail`, `.ck-bottombar`, `.ck-tele`, `.ck-ticker`, `.mod-tag`, `.hud-panel`; variável `--line`.

- [ ] **Step 1: Criar `client/src/styles/cockpit.css` com os primitivos**

```css
/* client/src/styles/cockpit.css — casca do cockpit HUD + primitivos */
:root { --line: rgba(127,182,196,.20); }

/* fundo limpo do cockpit (sem grid) */
body.v2 {
  background:
    radial-gradient(ellipse at 80% 20%, rgba(210,170,104,.07), transparent 55%),
    radial-gradient(ellipse at 10% 80%, rgba(127,182,196,.06), transparent 55%),
    var(--ink);
}

/* ── moldura + brackets ── */
.ck-frame { position: fixed; inset: 0; pointer-events: none; z-index: 40; }
.ck-bracket { position: absolute; width: 26px; height: 26px; border: 1.5px solid var(--frost); opacity: .55; }
.ck-bracket.tl { top: 16px; left: 16px; border-right: 0; border-bottom: 0; }
.ck-bracket.tr { top: 16px; right: 16px; border-left: 0; border-bottom: 0; }
.ck-bracket.bl { bottom: 16px; left: 16px; border-right: 0; border-top: 0; }
.ck-bracket.br { bottom: 16px; right: 16px; border-left: 0; border-top: 0; }

/* ── scanline global ── */
.ck-scanline {
  position: fixed; left: 0; right: 0; height: 2px; z-index: 41; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(127,182,196,.5), transparent);
  box-shadow: 0 0 14px rgba(127,182,196,.4); opacity: .4;
  animation: ck-scan 7s linear infinite;
}
@keyframes ck-scan { 0% { top: -2%; } 100% { top: 102%; } }

/* ── tag de cabeçalho de módulo (MÓDULO NN · Nome) ── */
.mod-tag {
  font-family: var(--mono); font-size: 10.5px; letter-spacing: .3em; text-transform: uppercase;
  color: var(--frost); display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
}
.mod-tag::before { content: ""; width: 30px; height: 1px; background: linear-gradient(90deg, transparent, var(--ember)); }

/* ── painel HUD reutilizável ── */
.hud-panel {
  border: 1px solid var(--line); border-radius: 10px; position: relative;
  background: linear-gradient(180deg, rgba(127,182,196,.04), transparent);
}
.hud-panel.accent::after {
  content: ""; position: absolute; top: 0; left: 0; height: 2px; width: 100%;
  background: linear-gradient(90deg, var(--ember), transparent);
}

@media (prefers-reduced-motion: reduce) {
  .ck-scanline { animation: none; display: none; }
}
```

- [ ] **Step 2: Importar em `HomeV2.tsx`**

Em `client/src/pages/HomeV2.tsx`, logo após `import '@/styles/v2.css';` adicionar:
```tsx
import '@/styles/cockpit.css';
```

- [ ] **Step 3: Verificar type-check e build**

Run: `npm run check && npm run build`
Expected: ambos com exit 0; `dist/public/index.html` gerado.

- [ ] **Step 4: Commit**

```bash
git add client/src/styles/cockpit.css client/src/pages/HomeV2.tsx
git commit -m "feat(cockpit): primitivos HUD e cockpit.css"
```

---

## Phase 1 — Casca do Cockpit

### Task 2: `CockpitFrame` (brackets + scanline + slots das barras)

**Files:**
- Create: `client/src/components/v2/cockpit/CockpitFrame.tsx`
- Modify: `client/src/pages/HomeV2.tsx`

**Interfaces:**
- Consumes (de HomeV2): `chapters: {id:string,label:string}[]`, `activeIdx:number`, `scrollProgress:number`, `onJump:(i:number)=>void`.
- Produces: componente `CockpitFrame` que renderiza `ck-frame`+brackets, `ck-scanline`, e dentro dele `<TopBar/>`, `<NavRail .../>`, `<BottomBar .../>` (componentes existentes), além de `children` (o `<main>`).

- [ ] **Step 1: Criar `CockpitFrame.tsx`**

```tsx
// client/src/components/v2/cockpit/CockpitFrame.tsx
import type { ReactNode } from 'react';
import TopBar from '@/components/v2/TopBar';
import NavRail from '@/components/v2/NavRail';
import BottomBar from '@/components/v2/BottomBar';

interface Chapter { id: string; label: string; }
interface CockpitFrameProps {
  chapters: Chapter[];
  activeIdx: number;
  scrollProgress: number;
  onJump: (i: number) => void;
  children: ReactNode;
}

export default function CockpitFrame({ chapters, activeIdx, scrollProgress, onJump, children }: CockpitFrameProps) {
  return (
    <>
      <div className="ck-frame" aria-hidden="true">
        <span className="ck-bracket tl" /><span className="ck-bracket tr" />
        <span className="ck-bracket bl" /><span className="ck-bracket br" />
      </div>
      <div className="ck-scanline" aria-hidden="true" />
      <TopBar />
      <NavRail chapters={chapters} activeIdx={activeIdx} onJump={onJump} />
      {children}
      <BottomBar chapters={chapters} activeIdx={activeIdx} />
    </>
  );
}
```

- [ ] **Step 2: Refatorar `HomeV2.tsx` para usar `CockpitFrame`**

Substituir o bloco que hoje renderiza `<TopBar/>`, `<NavRail/>`, `<main>...</main>`, `<BottomBar/>` por:
```tsx
import CockpitFrame from '@/components/v2/cockpit/CockpitFrame';
// ...
return (
  <>
    <div className="v2-progress" style={{ width: scrollProgress + '%' }} />
    <CockpitFrame chapters={[...CHAPTERS]} activeIdx={activeChapter} scrollProgress={scrollProgress} onJump={jump}>
      <main className="v2-scroll">
        {/* ...as mesmas <section> dos chapters, inalteradas... */}
      </main>
    </CockpitFrame>
  </>
);
```
(Manter as `<section id="v2-...">` exatamente como estão; só o chrome muda de lugar.)

- [ ] **Step 3: Verificar type-check**

Run: `npm run check`
Expected: exit 0.

- [ ] **Step 4: Verificação visual — casca aparece sobre os chapters atuais**

Subir dev: `npm run dev` (porta 3003). Via Playwright, abrir `http://localhost:3003`, screenshot desktop.
Expected: brackets nos 4 cantos, scanline visível, TopBar/NavRail/BottomBar presentes, conteúdo dos chapters intacto. Console 0 erros.

- [ ] **Step 5: Commit**

```bash
git add client/src/components/v2/cockpit/CockpitFrame.tsx client/src/pages/HomeV2.tsx
git commit -m "feat(cockpit): CockpitFrame com brackets e scanline envolvendo os módulos"
```

### Task 3: TopBar com telemetria + relógio

**Files:**
- Modify: `client/src/components/v2/TopBar.tsx`
- Modify: `client/src/styles/cockpit.css`

**Interfaces:**
- Produces: TopBar renderiza `.ck-topbar` com `.brand` (logo + nome) à esquerda e `.ck-tele` (status + coordenada + relógio `id`-less, via state) à direita.

- [ ] **Step 1: Reescrever `TopBar.tsx`**

```tsx
// client/src/components/v2/TopBar.tsx
import { useState, useEffect } from 'react';

export default function TopBar() {
  const [clock, setClock] = useState('--:--:--');
  useEffect(() => {
    const tick = () => setClock(new Date().toTimeString().slice(0, 8));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <header className="ck-topbar">
      <div className="brand">
        <img src="/logo.png" alt="Infinity Forge" />
        <span>INFINITY FORGE</span>
      </div>
      <div className="ck-tele">
        <span><b>◇</b> SYS.ONLINE</span>
        <span>FORGE.v2</span>
        <span>LAT 64°N</span>
        <span>{clock}</span>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Adicionar CSS da TopBar em `cockpit.css`**

```css
.ck-topbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 45;
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 54px; font-size: 10.5px; letter-spacing: .22em; text-transform: uppercase; color: #5c6b72;
  background: linear-gradient(to bottom, rgba(8,11,15,.9), transparent);
}
.ck-topbar .brand { display: flex; align-items: center; gap: 11px; color: var(--stone-3); font-weight: 700; letter-spacing: .24em; }
.ck-topbar .brand img { width: 28px; height: 28px; object-fit: contain; }
.ck-tele { display: flex; gap: 20px; font-family: var(--mono); }
.ck-tele b { color: var(--ember); font-weight: 400; }
@media (max-width: 900px) { .ck-topbar { padding: 14px 24px; } .ck-tele { display: none; } }
```

- [ ] **Step 3: Verificar tipos + visual**

Run: `npm run check` (exit 0). Playwright: screenshot do topo desktop → telemetria + relógio visíveis; mobile 390px → telemetria some, marca permanece. Console 0 erros.

- [ ] **Step 4: Commit**

```bash
git add client/src/components/v2/TopBar.tsx client/src/styles/cockpit.css
git commit -m "feat(cockpit): TopBar com telemetria e relógio ao vivo"
```

### Task 4: NavRail vertical com tick ativo

**Files:**
- Modify: `client/src/components/v2/NavRail.tsx`
- Modify: `client/src/styles/cockpit.css`

**Interfaces:**
- Consumes: props já existentes `chapters: {id,label}[]`, `activeIdx:number`, `onJump:(i:number)=>void`.
- Produces: `.ck-rail` com itens `<button>`; item ativo recebe classe `on`.

- [ ] **Step 1: Reescrever `NavRail.tsx`**

```tsx
// client/src/components/v2/NavRail.tsx
interface Chapter { id: string; label: string; }
interface NavRailProps { chapters: Chapter[]; activeIdx: number; onJump: (i: number) => void; }

export default function NavRail({ chapters, activeIdx, onJump }: NavRailProps) {
  return (
    <nav className="ck-rail" aria-label="Módulos">
      {chapters.map((c, i) => (
        <button key={c.id} className={i === activeIdx ? 'on' : ''} onClick={() => onJump(i)}>
          <span className="tick" />{c.label}
        </button>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Adicionar CSS da rail em `cockpit.css`**

```css
.ck-rail { position: fixed; left: 30px; top: 50%; transform: translateY(-50%); z-index: 45; display: flex; flex-direction: column; gap: 2px; }
.ck-rail button { display: flex; align-items: center; gap: 12px; background: none; border: 0; cursor: pointer;
  color: #5c6b72; font-family: var(--mono); font-size: 10px; letter-spacing: .18em; text-transform: uppercase; padding: 7px 0; transition: color .3s; }
.ck-rail .tick { width: 22px; height: 1px; background: currentColor; transition: all .3s; }
.ck-rail button.on { color: var(--ember); }
.ck-rail button.on .tick { width: 40px; height: 2px; box-shadow: 0 0 8px var(--ember); }
.ck-rail button:hover { color: var(--frost-2); }
@media (max-width: 900px) { .ck-rail { display: none; } }
```

- [ ] **Step 3: Verificar tipos + visual + scroll-spy**

Run: `npm run check` (exit 0). Playwright desktop: rail à esquerda; rolar até `#v2-numbers` → item "Números" fica dourado com tick estendido. Mobile: rail some. Console 0 erros.

- [ ] **Step 4: Commit**

```bash
git add client/src/components/v2/NavRail.tsx client/src/styles/cockpit.css
git commit -m "feat(cockpit): NavRail vertical com indicador ativo via scroll-spy"
```

### Task 5: BottomBar com índice + ticker

**Files:**
- Modify: `client/src/components/v2/BottomBar.tsx`
- Modify: `client/src/styles/cockpit.css`

**Interfaces:**
- Consumes: `chapters`, `activeIdx`.
- Produces: `.ck-bottombar` com `.idx` (MÓDULO NN / total), `.ck-ticker`, e dica à direita.

- [ ] **Step 1: Reescrever `BottomBar.tsx`**

```tsx
// client/src/components/v2/BottomBar.tsx
interface Chapter { id: string; label: string; }
interface BottomBarProps { chapters: Chapter[]; activeIdx: number; }

export default function BottomBar({ chapters, activeIdx }: BottomBarProps) {
  const total = String(chapters.length).padStart(2, '0');
  const idx = String(activeIdx + 1).padStart(2, '0');
  return (
    <footer className="ck-bottombar">
      <div className="idx">MÓDULO <b>{idx}</b> / {total}</div>
      <div className="ck-ticker">
        <span>FORJANDO SISTEMAS DURADOUROS · ARQUITETURA SÓLIDA · ENGENHARIA NÓRDICA · UPTIME 99.98% · DA DESCOBERTA AO DEPLOY · ᚠᛟᚱᚷᛖ ·&nbsp;&nbsp;</span>
      </div>
      <div className="hint">ROLE · NAVEGUE PELO COCKPIT</div>
    </footer>
  );
}
```

- [ ] **Step 2: Adicionar CSS da BottomBar em `cockpit.css`**

```css
.ck-bottombar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 45; display: flex; justify-content: space-between; align-items: center;
  padding: 14px 54px; font-family: var(--mono); font-size: 10.5px; letter-spacing: .2em; text-transform: uppercase; color: #5c6b72;
  background: linear-gradient(to top, rgba(8,11,15,.92), transparent); }
.ck-bottombar .idx b { color: var(--ember-2); }
.ck-ticker { overflow: hidden; white-space: nowrap; max-width: 46vw; color: var(--frost); }
.ck-ticker span { display: inline-block; padding-left: 100%; animation: ck-tick 18s linear infinite; }
@keyframes ck-tick { to { transform: translateX(-100%); } }
@media (max-width: 900px) { .ck-bottombar { padding: 12px 24px; } .ck-ticker, .ck-bottombar .hint { display: none; } }
@media (prefers-reduced-motion: reduce) { .ck-ticker span { animation: none; padding-left: 0; } }
```

- [ ] **Step 3: Verificar tipos + visual**

Run: `npm run check` (exit 0). Playwright desktop: índice atualiza ao rolar (01→07), ticker corre. Mobile: ticker/dica somem, índice permanece. Console 0 erros.

- [ ] **Step 4: Commit**

```bash
git add client/src/components/v2/BottomBar.tsx client/src/styles/cockpit.css
git commit -m "feat(cockpit): BottomBar com índice de módulo e ticker"
```

---

## Phase 2 — Módulos (tratamento HUD)

> Cada task: **leia o componente atual e sua seção em `v2.css` primeiro**. Adicione o cabeçalho `mod-tag` no topo do conteúdo do módulo (formato `Módulo NN · Nome`) e aplique o tratamento descrito. Verificação ao fim: `npm run check` + dev server + Playwright (desktop + mobile no `#v2-<id>` correspondente) + console 0 erros + commit.

### Task 6: Módulo Origem (Hero) — reticle + faíscas

**Files:**
- Modify: `client/src/components/v2/chapters/HeroChapter.tsx`
- Modify: `client/src/styles/v2.css`

**Interfaces:**
- Consumes: `t: I18nContent`, `onJump`. Mantém o raio responsivo das runas (já implementado) e a estrutura `.v2-sigil`.
- Produces: pulso central + emissão de faíscas no núcleo do sigil.

- [ ] **Step 1: Adicionar `mod-tag` e o pulso no JSX do hero**

No `.v2-hero-left`, antes do `.v2-hero-eyebrow`, inserir:
```tsx
<div className="mod-tag">Módulo 01 · Origem</div>
```
Dentro de `.v2-sigil`, após `<div className="v2-sigil-pulse" />`, garantir que existe o núcleo; adicionar um container de faíscas:
```tsx
<div className="v2-sigil-sparks" ref={sparksRef} />
```
E `const sparksRef = useRef<HTMLDivElement>(null);` junto aos refs.

- [ ] **Step 2: Emitir faíscas via Web Animations API (respeitando reduced-motion)**

Adicionar effect:
```tsx
useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const host = sparksRef.current;
  if (!host) return;
  const id = setInterval(() => {
    for (let i = 0; i < 4; i++) {
      const s = document.createElement('div');
      s.className = 'v2-spark';
      const dx = (Math.random() - 0.5) * 180, dy = -40 - Math.random() * 110;
      host.appendChild(s);
      s.animate(
        [{ transform: 'translate(-50%,-50%)', opacity: 1 },
         { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px))`, opacity: 0 }],
        { duration: 1100 + Math.random() * 600, easing: 'cubic-bezier(.2,.6,.2,1)' }
      ).onfinish = () => s.remove();
    }
  }, 900);
  return () => clearInterval(id);
}, []);
```

- [ ] **Step 3: CSS das faíscas em `v2.css`**

```css
.v2-sigil-sparks { position: absolute; left: 50%; top: 50%; width: 0; height: 0; pointer-events: none; }
.v2-spark { position: absolute; left: 0; top: 0; width: 3px; height: 3px; border-radius: 50%; background: var(--ember-2); box-shadow: 0 0 6px var(--ember); }
```

- [ ] **Step 4: Verificar + commit**

Run: `npm run check`. Playwright `#v2-hero` desktop+mobile: tag de módulo presente, faíscas saindo do núcleo, sem sobreposição nos CTAs (mobile). Console 0 erros.
```bash
git add client/src/components/v2/chapters/HeroChapter.tsx client/src/styles/v2.css
git commit -m "feat(module): Origem com tag de módulo e faíscas da forja"
```

### Task 7: Módulo Serviços — painéis HUD

**Files:**
- Modify: `client/src/components/v2/chapters/ServicesChapter.tsx`
- Modify: `client/src/styles/v2.css`

- [ ] **Step 1:** Ler o componente. Adicionar `<div className="mod-tag">Módulo 02 · Serviços</div>` no topo do conteúdo. Em cada card de serviço, garantir a classe `hud-panel accent` no container e adicionar a numeração técnica `<span className="v2-card-num">0N</span>` (N = índice+1, com `padStart(2,'0')`).
- [ ] **Step 2:** CSS em `v2.css`:
```css
.v2-card-num { position: absolute; top: 14px; right: 16px; font-family: var(--mono); font-size: 10px; letter-spacing: .2em; color: var(--ember); }
```
(Reaproveitar `.hud-panel`/`.accent` de `cockpit.css`; ajustar paddings dos cards existentes se necessário para `padding: 22px`.)
- [ ] **Step 3:** `npm run check` + Playwright `#v2-services` (desktop grid + mobile 2×1/1col) + console limpo.
- [ ] **Step 4:** Commit: `feat(module): Serviços como painéis HUD numerados`.

### Task 8: Módulo Processo — sequência de calibração

**Files:**
- Modify: `client/src/components/v2/chapters/ProcessChapter.tsx`
- Modify: `client/src/styles/v2.css`

- [ ] **Step 1:** Ler o componente (timeline de 4 estágios + bigorna SVG). Adicionar `<div className="mod-tag">Módulo 03 · Processo</div>`. Transformar a lista de estágios `.v2-stages-list` num "trilho de calibração": adicionar um conector vertical e marcadores de etapa numerados (`I…IV`). Manter a ordem mobile já corrigida (título antes da bigorna via `order`).
- [ ] **Step 2:** CSS em `v2.css` (conector + marcador):
```css
.v2-stages-list { position: relative; }
.v2-stages-list::before { content: ""; position: absolute; left: 11px; top: 8px; bottom: 8px; width: 1px; background: linear-gradient(var(--ember), transparent); opacity: .4; }
.v2-stage { position: relative; padding-left: 34px; }
.v2-stage::before { content: ""; position: absolute; left: 6px; top: 12px; width: 11px; height: 11px; border: 1px solid var(--frost); border-radius: 50%; background: var(--ink); transition: .3s; }
.v2-stage.active::before { border-color: var(--ember); box-shadow: 0 0 10px var(--ember); background: var(--ember); }
```
- [ ] **Step 3:** `npm run check` + Playwright `#v2-process` (desktop: trilho com marcador ativo seguindo hover/clique; mobile: título antes da bigorna) + console limpo.
- [ ] **Step 4:** Commit: `feat(module): Processo como sequência de calibração HUD`.

### Task 9: Módulo Stack — radar/scanner

**Files:**
- Modify: `client/src/components/v2/chapters/StackChapter.tsx`
- Modify: `client/src/styles/v2.css`

- [ ] **Step 1:** Ler o componente (órbita de tecnologias). Adicionar `<div className="mod-tag">Módulo 04 · Stack</div>`. Sobre a área de órbita (`.v2-stack-orbit`), adicionar um anel de varredura giratório `<div className="v2-radar-sweep" />` como filho do container do orbit.
- [ ] **Step 2:** CSS em `v2.css`:
```css
.v2-stack-orbit { position: relative; }
.v2-radar-sweep { position: absolute; inset: 0; border-radius: 50%; pointer-events: none;
  background: conic-gradient(from 0deg, rgba(127,182,196,.18), transparent 25%); animation: v2-sweep 6s linear infinite; mix-blend-mode: screen; }
@keyframes v2-sweep { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .v2-radar-sweep { animation: none; opacity: .12; } }
```
- [ ] **Step 3:** `npm run check` + Playwright `#v2-stack` (varredura girando atrás dos pills; mobile mantém `overflow:hidden` a 360px) + console limpo.
- [ ] **Step 4:** Commit: `feat(module): Stack com varredura de radar`.

### Task 10: Módulo Cases — registros de missão

**Files:**
- Modify: `client/src/components/v2/chapters/WorkChapter.tsx`
- Modify: `client/src/styles/v2.css`

- [ ] **Step 1:** Ler o componente (cards de cases). Adicionar `<div className="mod-tag">Módulo 05 · Cases</div>`. Dar aos cards a classe `hud-panel`, e adicionar um rótulo de metadado em mono no topo de cada card: `<span className="v2-case-meta">REGISTRO 0N</span>` (mantendo o setor/métrica já existentes).
- [ ] **Step 2:** CSS em `v2.css`:
```css
.v2-case-meta { font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--frost); display: block; margin-bottom: 10px; }
```
- [ ] **Step 3:** `npm run check` + Playwright `#v2-work` (desktop 2col, mobile 1col) + console limpo.
- [ ] **Step 4:** Commit: `feat(module): Cases como registros de missão`.

### Task 11: Módulo Números — telemetria + count-up

**Files:**
- Modify: `client/src/components/v2/chapters/StatsChapter.tsx`
- Modify: `client/src/styles/v2.css`

**Interfaces:**
- Produces: contador animado nos valores ao entrar na viewport; cada gauge usa `.hud-panel.accent`.

- [ ] **Step 1:** Ler o componente. Adicionar `<div className="mod-tag">Módulo 06 · Números</div>`. Dar a cada célula de estatística a classe `hud-panel accent`. Implementar count-up: marcar cada valor numérico com `data-to` e animar quando o módulo entra na viewport.

Adicionar hook de count-up:
```tsx
import { useRef, useEffect } from 'react';
// dentro do componente:
const rootRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  const root = rootRef.current;
  if (!root) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = Array.from(root.querySelectorAll<HTMLElement>('[data-to]'));
  const run = () => els.forEach(el => {
    const to = parseFloat(el.dataset.to || '0');
    const suf = el.dataset.suf || '';
    const dec = to % 1 !== 0 ? 2 : 0;
    if (reduce) { el.textContent = to.toFixed(dec) + suf; return; }
    let t0: number | null = null;
    const step = (t: number) => {
      if (t0 === null) t0 = t;
      const p = Math.min((t - t0) / 1400, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => { if (en.isIntersecting) { run(); obs.disconnect(); } });
  }, { threshold: 0.4 });
  io.observe(root);
  return () => io.disconnect();
}, []);
```
Aplicar `ref={rootRef}` no container das estatísticas; nos valores usar p.ex. `<span data-to="120" data-suf="+">0</span>` substituindo o valor estático (mapear os 4 valores atuais: 120+, 8, 99.98%, 24H).

- [ ] **Step 2:** CSS em `v2.css` (acento já vem de `.hud-panel.accent`; ajustar tipografia do valor se necessário usando `var(--display)`).
- [ ] **Step 3:** `npm run check` + Playwright `#v2-numbers`: valores contam de 0 até o alvo ao entrar na tela; com reduced-motion mostram direto. Console limpo.
- [ ] **Step 4:** Commit: `feat(module): Números como telemetria com count-up`.

### Task 12: Módulo Contato — console de transmissão

**Files:**
- Modify: `client/src/components/v2/chapters/ContactChapter.tsx`
- Modify: `client/src/styles/v2.css`

- [ ] **Step 1:** Ler o componente (form visual). Adicionar `<div className="mod-tag">Módulo 07 · Contato</div>`. Estilizar os inputs como entradas de terminal: borda fina `var(--line)`, prefixo `▸` em mono nos labels/placeholder, foco com glow dourado. **Não** adicionar backend (fora de escopo — item 5).
- [ ] **Step 2:** CSS em `v2.css`:
```css
#v2-contact input, #v2-contact textarea { background: rgba(127,182,196,.04); border: 1px solid var(--line); border-radius: 8px; color: var(--stone-3); font-family: var(--mono); transition: border-color .25s, box-shadow .25s; }
#v2-contact input:focus, #v2-contact textarea:focus { outline: none; border-color: var(--ember); box-shadow: 0 0 0 1px var(--ember), 0 0 18px rgba(210,170,104,.25); }
```
- [ ] **Step 3:** `npm run check` + Playwright `#v2-contact` (desktop + mobile; botão "Iniciar conversa" limpando a BottomBar) + console limpo.
- [ ] **Step 4:** Commit: `feat(module): Contato como console de transmissão`.

---

## Phase 3 — Polimento

### Task 13: Passo global de `prefers-reduced-motion` + performance

**Files:**
- Modify: `client/src/styles/cockpit.css` e/ou `client/src/styles/v2.css`

- [ ] **Step 1:** Auditar todas as animações adicionadas (scanline, ticker, sweep, faíscas, count-up, spins do sigil) e garantir fallback num bloco `@media (prefers-reduced-motion: reduce)` consolidado (desligar/segurar em estado final). Faíscas e count-up já checam via JS — confirmar.
- [ ] **Step 2:** Verificar via Playwright emulando reduced-motion (`browser_evaluate` setando `matchMedia` não basta; usar a emulação do CDP se disponível, senão inspecionar o CSS e os guards JS manualmente). Confirmar ausência de animação contínua.
- [ ] **Step 3:** `npm run check && npm run build` (exit 0).
- [ ] **Step 4:** Commit: `a11y(cockpit): fallback completo de prefers-reduced-motion`.

### Task 14: Passo de responsividade mobile (cockpit + módulos)

**Files:**
- Modify: `client/src/styles/cockpit.css`, `client/src/styles/v2.css`

- [ ] **Step 1:** Sweep mobile (390×844) via Playwright em todos os 7 módulos. Verificar: rail/telemetria/ticker ocultos; brackets não competindo com conteúdo (reduzir para 18px e recuar se necessário); grids colapsados; reticle/radar a 360px; ritmo vertical (padding 88/56, última seção 96px) preservado.
- [ ] **Step 2:** Ajustar regras `@media (max-width: 900px)` conforme achados.
- [ ] **Step 3:** `npm run check` + sweep visual mobile final + console limpo.
- [ ] **Step 4:** Commit: `fix(cockpit): responsividade mobile do cockpit e módulos`.

### Task 15: Verificação final + fechamento da branch

- [ ] **Step 1:** `npm run check` (exit 0) e `npm run build` (exit 0; `index.html` ~1.7KB, sem regressão).
- [ ] **Step 2:** Sweep visual completo desktop (1440×900) e mobile (390×844) dos 7 módulos + casca; console 0 erros em ambos.
- [ ] **Step 3:** Atualizar `CLAUDE.md` (seção Design/Arquitetura) descrevendo a casca `CockpitFrame` e os primitivos HUD.
- [ ] **Step 4:** Commit final: `docs: atualiza CLAUDE.md com a arquitetura do cockpit`. Branch `redesign-cockpit-hud` pronta para PR/merge na `main` (decisão do usuário via finishing-a-development-branch).

---

## Self-Review (cobertura da spec)

- Casca persistente (brackets, TopBar+telemetria+relógio, NavRail+scroll-spy, BottomBar+ticker, scanline) → Tasks 1–5. ✔
- 7 módulos com tratamento HUD → Tasks 6–12 (Origem, Serviços, Processo, Stack, Cases, Números, Contato). ✔
- Movimento rico (scanline, faíscas, sweep, ticker, count-up, spins) → distribuído nos módulos + casca; consolidação a11y na Task 13. ✔
- `prefers-reduced-motion` → Task 13 (+ guards JS nas Tasks 6 e 11). ✔
- Responsividade → Task 14 (+ regras pontuais em cada task). ✔
- Mapa técnico (cockpit.css, components/v2/cockpit, refactor de HomeV2 e chapters) → File Structure + Tasks. ✔
- Fora de escopo (backend do contato, vulnerabilidades, copy) → respeitado (Task 12 não toca backend). ✔
- Tokens/fontes/porta/npm → Global Constraints. ✔
