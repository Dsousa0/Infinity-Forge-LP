# InfinityForge LP — v2 Landing Page

**Date:** 2026-04-26  
**Source:** IF-handoff bundle (claude.ai/design export)  
**Scope:** Replace current v1 Home with v2 design. PT-only. No language toggle.

---

## Architecture

The v2 landing page replaces `client/src/pages/Home.tsx` as the component rendered at route `/`. The v1 component files remain on disk but are no longer referenced by the router.

### File structure

```
client/src/
├── pages/
│   └── HomeV2.tsx
├── components/v2/
│   ├── TopBar.tsx
│   ├── NavRail.tsx
│   ├── BottomBar.tsx
│   └── chapters/
│       ├── HeroChapter.tsx
│       ├── ServicesChapter.tsx
│       ├── ProcessChapter.tsx
│       ├── StackChapter.tsx
│       ├── WorkChapter.tsx
│       ├── StatsChapter.tsx
│       └── ContactChapter.tsx
├── lib/
│   └── i18n-v2.ts
└── styles/
    └── v2.css
```

### Router change

`App.tsx`: import `HomeV2` instead of `Home` for the `"/"` route.

---

## CSS Strategy

`client/src/styles/v2.css` is imported directly in `HomeV2.tsx`. It contains:

1. **Token aliases** at the top, bridging the prototype's variables to the existing dark-theme tokens:
   ```css
   :root {
     --ember:   var(--accent);        /* #d2aa68 */
     --frost:   var(--primary);       /* #6fb0c0 */
     --ink:     var(--background);    /* #0f1920 */
     --stone-3: var(--foreground);    /* #e8ece5 */
     --petrol:  var(--card);          /* #132730 */
     --mono:    'IBM Plex Mono', monospace;
     --display: 'IBM Plex Mono', monospace;
     --sans:    system-ui, sans-serif;
     --ease:    cubic-bezier(0.4, 0, 0.2, 1);
     --r-md:    0.5rem;
   }
   ```
2. **All rules from `styles-v2.css`** in the handoff, copied verbatim — no Tailwind rewrite.

No changes to `index.css` or existing design tokens.

---

## Components

### `HomeV2.tsx`

State:
- `activeChapter: number` (0–6)
- `scrollProgress: number` (0–100)

Behaviour:
- On mount: `scroll` + `resize` listeners update `activeChapter` (section whose `offsetTop ≤ scrollY + vh×0.33`) and `scrollProgress` (`scrollY / maxScroll × 100`).
- `jump(i)`: calls `getElementById('v2-' + chapters[i].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })`.

Renders (in order):
1. `<div className="v2-progress" style={{ width: scrollProgress + '%' }} />` — fixed amber bar
2. `<TopBar />`
3. `<NavRail chapters={CHAPTERS} activeIdx={activeChapter} onJump={jump} />`
4. `<main className="v2-scroll">` — 7 `<section id="v2-{id}" className="v2-section">` wrappers
5. `<BottomBar chapters={CHAPTERS} activeIdx={activeChapter} />`

### `TopBar.tsx`

Fixed top bar. Displays logo image + "Infinity Forge" brand name + "Jornada · v2" sub-label. No language toggle. No v1 link.

Logo path: `/logo.png` (served from `client/public/logo.png`).

### `NavRail.tsx`

Props: `chapters: { id: string; label: string }[]`, `activeIdx: number`, `onJump: (i: number) => void`

Fixed right-rail dots. Each button shows label + zero-padded number. Active dot styled with `--ember`. Invisible on mobile (CSS `display: none` at ≤900px).

### `BottomBar.tsx`

Props: `chapters`, `activeIdx`

Fixed bottom bar. Left: "Capítulo" eyebrow + `01/07 · Label` counter. Right: "role · clique nos pontos" hint.

### `HeroChapter.tsx`

State: `hotRune: number` (-1 initial)

- 12 Elder Futhark runes arranged in a circle (r=240px) around the sigil center using trigonometry.
- `setInterval` every 1400ms randomly sets `hotRune`.
- Mouse `mousemove` on the section wrapper applies 3D `rotateY`/`rotateX` to the sigil and a translate offset to the left copy — same as prototype.
- CTA primary button calls `onJump(6)` (Contact). Ghost button calls `onJump(2)` (Process).
- Sigil center: logo image with `drop-shadow` filter.

### `ServicesChapter.tsx`

State: `expanded: number` (0 initial)

- 8 rune cards in a 4-column grid.
- Click toggles `expanded` — expanded card spans `grid-column: span 2; grid-row: span 2`.
- Mouse `mousemove` updates `--mx`/`--my` CSS custom properties for the radial gradient spotlight.
- Content from `I18N_PT.services.list`.

### `ProcessChapter.tsx`

State: `active: number` (0 initial), `sparks: Spark[]`

- Left: SVG anvil with animated hammer (CSS animation `hammerStrike`). Sparks (`position: absolute` dots) spawned every 2200ms via `setInterval` (6 sparks per burst), cleared after 12 total.
- Right: 4 stage buttons — hover/click sets `active`. Active stage shows description (max-height transition).
- Content from `I18N_PT.process.steps`.

### `StackChapter.tsx`

No local state.

- Left: eyebrow + title + sub + legend grid (5 groups with colour swatches).
- Right: orbit visualization. 3 concentric dashed rings. Each tech pill is `position: absolute` inside a `position: relative` container, offset via `marginLeft`/`marginTop` computed from angle + radius. Logo at center.
- Content from `I18N_PT.stack.groups`.

### `WorkChapter.tsx`

No local state. 4 case cards in a grid. Hover lifts card. Content from `I18N_PT.work.items`.

### `StatsChapter.tsx`

No local state. 4 stat cells in a 4-column grid. Rune in top-right corner of each cell. Content from `I18N_PT` (values: 120+, 8 anos, 99.98%, 24h — same as prototype).

### `ContactChapter.tsx`

State: `sent: boolean`

Form with name, email, company, message inputs. `onSubmit` sets `sent = true` and disables the button ("Recebido ✓"). No backend integration in this scope.

---

## Content (`i18n-v2.ts`)

Exports a single `const I18N_PT` object typed with an inline interface. All text from the PT locale of the handoff's `i18n.js`. No runtime i18n library.

---

## Chapters manifest

```ts
const CHAPTERS = [
  { id: 'hero',     label: 'Origem'   },
  { id: 'services', label: 'Serviços' },
  { id: 'process',  label: 'Processo' },
  { id: 'stack',    label: 'Stack'    },
  { id: 'work',     label: 'Cases'    },
  { id: 'numbers',  label: 'Números'  },
  { id: 'contact',  label: 'Contato'  },
];
```

---

## Out of scope

- Language toggle (EN content kept in `i18n-v2.ts` for future use but not exposed in UI)
- Backend form submission
- Deletion of v1 component files
- Any change to `index.css`, `vite.config.ts`, `package.json`, or `ThemeProvider`
