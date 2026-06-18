# InfinityForge LP v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current v1 landing page with the v2 scroll-based design from the IF-handoff bundle, in PT only.

**Architecture:** `HomeV2.tsx` becomes the `"/"` route; it adds `v2` to `document.body` on mount (removed on unmount), imports `v2.css`, and orchestrates 7 chapter components via scroll-tracked state. All content lives in `i18n-v2.ts` as a single PT object. Fixed UI (TopBar, NavRail, BottomBar) are separate components.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4 (layout utilities reused where convenient), custom `v2.css` for all v2-specific rules, pnpm, Vite.

---

## File Map

| Action | Path |
|--------|------|
| Create | `client/src/styles/v2.css` |
| Create | `client/src/lib/i18n-v2.ts` |
| Create | `client/src/components/v2/TopBar.tsx` |
| Create | `client/src/components/v2/NavRail.tsx` |
| Create | `client/src/components/v2/BottomBar.tsx` |
| Create | `client/src/components/v2/chapters/HeroChapter.tsx` |
| Create | `client/src/components/v2/chapters/ServicesChapter.tsx` |
| Create | `client/src/components/v2/chapters/ProcessChapter.tsx` |
| Create | `client/src/components/v2/chapters/StackChapter.tsx` |
| Create | `client/src/components/v2/chapters/WorkChapter.tsx` |
| Create | `client/src/components/v2/chapters/StatsChapter.tsx` |
| Create | `client/src/components/v2/chapters/ContactChapter.tsx` |
| Create | `client/src/pages/HomeV2.tsx` |
| Modify | `client/src/App.tsx` |

---

## Task 1: CSS — tokens, utilities and v2 styles

**Files:**
- Create: `client/src/styles/v2.css`

- [ ] **Step 1: Create the CSS file**

```css
/* client/src/styles/v2.css */

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Runic&family=Cinzel:wght@400;600&display=swap');

/* ── Design tokens (hardcoded for v2 dark theme) ── */
:root {
  --ember:      #d2aa68;
  --frost:      #6fb0c4;
  --frost-soft: #a8d0db;
  --ink:        #0b1014;
  --stone-3:    #e8ece5;
  --petrol:     #132730;
  --mono:       'IBM Plex Mono', ui-monospace, monospace;
  --display:    'Cinzel', 'IBM Plex Mono', Georgia, serif;
  --sans:       system-ui, sans-serif;
  --ease:       cubic-bezier(.2, .7, .2, 1);
  --r-md:       10px;
}

/* ── Body v2 background ── */
body.v2 {
  background:
    radial-gradient(ellipse at 20% 10%, rgba(127,182,196,0.05), transparent 55%),
    radial-gradient(ellipse at 80% 60%, rgba(201,138,75,0.04), transparent 50%),
    var(--ink);
  scroll-behavior: smooth;
}

/* ── Typography utilities (used across chapters) ── */
.sec-eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ember);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}
.sec-title {
  font-family: var(--display);
  font-weight: 600;
  font-size: clamp(34px, 4.8vw, 58px);
  line-height: 1.1;
  letter-spacing: 0.01em;
  margin: 14px 0 18px;
  color: var(--stone-3);
  text-wrap: balance;
}
.sec-sub {
  font-size: 17px;
  line-height: 1.7;
  color: rgba(214, 225, 232, 0.72);
  max-width: 56ch;
  margin: 0;
}

/* ── Stage = vertical scroll container ── */
.v2-scroll { position: relative; width: 100%; }
.v2-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 8vw;
  box-sizing: border-box;
}
.v2-section + .v2-section { border-top: 1px solid rgba(127,182,196,0.06); }
.v2-section-end { padding-bottom: 60px; }

.v2-chapter {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

/* Subtle grid background */
.v2-grid-bg {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(127,182,196,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(127,182,196,0.04) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
}

/* ── TOP BAR ── */
.v2-topbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 36px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(11,15,18,0.85), rgba(11,15,18,0));
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.v2-topbar > * { pointer-events: auto; }
.v2-brand { display: flex; align-items: center; gap: 12px; }
.v2-brand img { width: 36px; height: 36px; object-fit: contain; }
.v2-brand-text { display: flex; flex-direction: column; line-height: 1.05; }
.v2-brand-name {
  font-family: var(--display); font-size: 14px; font-weight: 600;
  letter-spacing: 0.08em; color: var(--stone-3); text-transform: uppercase;
}
.v2-brand-sub {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.22em;
  color: rgba(127,182,196,0.55); text-transform: uppercase; margin-top: 3px;
}

/* ── CHAPTER NAV (right rail dots) ── */
.v2-nav {
  position: fixed; right: 28px; top: 50%; transform: translateY(-50%);
  z-index: 45;
  display: flex; flex-direction: column; gap: 6px;
}
.v2-nav-dot {
  display: flex; align-items: center; gap: 14px;
  background: transparent; border: 0; padding: 6px 0;
  cursor: pointer; color: rgba(214,225,232,0.4);
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
  text-transform: uppercase; transition: color .25s var(--ease);
  flex-direction: row-reverse;
}
.v2-nav-dot::before {
  content: ''; width: 22px; height: 1px; background: currentColor;
  opacity: 0.5; transition: width .3s var(--ease), opacity .3s;
}
.v2-nav-dot:hover { color: var(--frost); }
.v2-nav-dot:hover::before { width: 36px; opacity: 1; }
.v2-nav-dot.active { color: var(--ember); }
.v2-nav-dot.active::before { width: 50px; opacity: 1; background: var(--ember); }
.v2-nav-num {
  display: inline-block; min-width: 24px; text-align: right;
  font-family: var(--mono); font-size: 10px;
}

/* ── BOTTOM BAR ── */
.v2-bottombar {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 45;
  padding: 18px 36px;
  display: flex; justify-content: space-between; align-items: flex-end; gap: 32px;
  pointer-events: none;
  background: linear-gradient(to top, rgba(11,15,18,0.85), rgba(11,15,18,0));
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.v2-bottombar > * { pointer-events: auto; }
.v2-chapter-info { display: flex; flex-direction: column; gap: 4px; }
.v2-chapter-eyebrow {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em;
  color: rgba(127,182,196,0.55); text-transform: uppercase;
}
.v2-chapter-counter {
  font-family: var(--display); font-size: 13px; font-weight: 600;
  color: var(--stone-3); letter-spacing: 0.05em;
}
.v2-chapter-counter span { color: rgba(214,225,232,0.4); margin: 0 4px; }
.v2-hint {
  justify-self: end; text-align: right;
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em;
  color: rgba(214,225,232,0.35); text-transform: uppercase;
  display: flex; flex-direction: column; gap: 4px;
}

/* Progress bar */
.v2-progress {
  position: fixed; top: 0; left: 0; height: 2px; z-index: 60;
  background: var(--ember);
  box-shadow: 0 0 12px var(--ember);
  transition: width 0.85s cubic-bezier(0.7, 0, 0.2, 1);
}

/* ── CTA buttons (shared) ── */
.v2-cta {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 26px; border-radius: var(--r-md);
  font-family: var(--mono); font-size: 12px; letter-spacing: 0.2em;
  text-transform: uppercase; cursor: pointer;
  transition: all .25s var(--ease);
  text-decoration: none; border: 1px solid transparent;
}
.v2-cta-primary {
  background: var(--ember); color: #0b1014; border-color: var(--ember);
  box-shadow: 0 0 0 0 rgba(201,138,75,0.5);
}
.v2-cta-primary:hover {
  box-shadow: 0 0 24px rgba(201,138,75,0.4);
  transform: translateY(-2px);
}
.v2-cta-ghost {
  border-color: rgba(127,182,196,0.3); color: var(--frost);
  background: transparent;
}
.v2-cta-ghost:hover { border-color: var(--frost); background: rgba(127,182,196,0.06); }

/* ── CHAPTER 0: HERO ── */
.v2-hero {
  display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 80px;
  align-items: center; width: 100%; max-width: 1400px;
  perspective: 1200px;
}
.v2-hero-left { transform-style: preserve-3d; transition: transform 0.2s ease-out; }
.v2-hero-eyebrow {
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.32em;
  color: rgba(127,182,196,0.7); text-transform: uppercase;
  margin-bottom: 28px; display: flex; align-items: center; gap: 14px;
}
.v2-hero-eyebrow::before {
  content: ''; width: 36px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--ember));
}
.v2-hero-title {
  font-family: var(--display); font-weight: 600;
  font-size: clamp(48px, 7vw, 96px); line-height: 1.02;
  color: var(--stone-3); letter-spacing: 0.005em;
  margin: 0 0 28px; text-wrap: balance;
}
.v2-hero-title em {
  font-style: normal; color: var(--ember);
  position: relative; display: inline-block;
}
.v2-hero-title em::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -6px;
  height: 2px; background: var(--ember);
  transform: scaleX(0); transform-origin: left;
  animation: titleUnderline 1.2s 0.6s cubic-bezier(0.7,0,0.2,1) forwards;
}
@keyframes titleUnderline { to { transform: scaleX(1); } }
.v2-hero-sub {
  font-size: 18px; line-height: 1.65;
  color: rgba(214,225,232,0.78); max-width: 52ch;
  margin: 0 0 40px;
}
.v2-hero-ctas { display: flex; gap: 14px; align-items: center; }

.v2-hero-right {
  display: flex; justify-content: center; align-items: center;
  position: relative; height: 580px;
}
.v2-sigil {
  position: relative; width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.15s ease-out;
}
.v2-sigil-ring {
  position: absolute; inset: 0;
  border: 1px solid rgba(127,182,196,0.15); border-radius: 50%;
}
.v2-sigil-ring.r1 { animation: sigilSpin 60s linear infinite; }
.v2-sigil-ring.r2 { inset: 12%; animation: sigilSpin 90s linear infinite reverse; border-color: rgba(201,138,75,0.18); }
.v2-sigil-ring.r3 { inset: 25%; border-color: rgba(127,182,196,0.25); }
@keyframes sigilSpin { to { transform: rotate(360deg); } }

.v2-sigil-rune {
  position: absolute; left: 50%; top: 50%;
  width: 44px; height: 44px; margin: -22px 0 0 -22px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Noto Sans Runic', serif; font-size: 22px;
  color: rgba(127,182,196,0.6); cursor: pointer;
  transition: all .25s var(--ease);
  border-radius: 50%; background: rgba(11,16,20,0.4);
  border: 1px solid rgba(127,182,196,0.15);
}
.v2-sigil-rune:hover, .v2-sigil-rune.hot {
  color: var(--ember); border-color: var(--ember);
  background: rgba(201,138,75,0.1);
  box-shadow: 0 0 20px rgba(201,138,75,0.4);
  transform: scale(1.15);
}
.v2-sigil-core {
  position: absolute; left: 50%; top: 50%;
  width: 180px; height: 180px; margin: -90px 0 0 -90px;
  display: flex; align-items: center; justify-content: center;
}
.v2-sigil-core img { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 30px rgba(201,138,75,0.4)); }
.v2-sigil-pulse {
  position: absolute; left: 50%; top: 50%;
  width: 220px; height: 220px; margin: -110px 0 0 -110px;
  border: 1px solid var(--ember); border-radius: 50%;
  animation: sigilPulse 2.5s ease-out infinite;
  pointer-events: none;
}
@keyframes sigilPulse {
  0% { transform: scale(0.7); opacity: 1; }
  100% { transform: scale(1.6); opacity: 0; }
}

/* ── CHAPTER 1: SERVICES ── */
.v2-services {
  width: 100%; max-width: 1300px;
  display: grid; grid-template-columns: minmax(260px, 320px) minmax(0, 1fr); gap: 64px;
  align-items: stretch;
}
.v2-services-intro { display: flex; flex-direction: column; justify-content: center; }
.v2-services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.v2-rune-card {
  position: relative; aspect-ratio: 0.75;
  background: linear-gradient(180deg, rgba(127,182,196,0.06), rgba(127,182,196,0.02));
  border: 1px solid rgba(127,182,196,0.15);
  border-radius: var(--r-md); padding: 20px;
  cursor: pointer; transition: all .35s var(--ease);
  display: flex; flex-direction: column; justify-content: space-between;
  overflow: hidden; transform-style: preserve-3d;
}
.v2-rune-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(201,138,75,0.15), transparent 60%);
  opacity: 0; transition: opacity .3s; pointer-events: none;
}
.v2-rune-card:hover { border-color: var(--ember); transform: translateY(-4px); }
.v2-rune-card:hover::before { opacity: 1; }
.v2-rune-card.expanded {
  grid-column: span 2; grid-row: span 2; aspect-ratio: auto;
  border-color: var(--ember);
  background: linear-gradient(180deg, rgba(201,138,75,0.08), rgba(127,182,196,0.04));
  z-index: 2;
}
.v2-rune-glyph { font-family: 'Noto Sans Runic', serif; font-size: 38px; color: var(--ember); line-height: 1; }
.v2-rune-card.expanded .v2-rune-glyph { font-size: 64px; }
.v2-rune-meta {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.22em;
  color: rgba(127,182,196,0.6); text-transform: uppercase; margin-bottom: 6px;
}
.v2-rune-name { font-family: var(--display); font-size: 18px; font-weight: 600; color: var(--stone-3); letter-spacing: 0.02em; line-height: 1.15; }
.v2-rune-card.expanded .v2-rune-name { font-size: 28px; }
.v2-rune-desc {
  font-size: 13px; line-height: 1.6; color: rgba(214,225,232,0.72);
  margin: 12px 0 0; max-height: 0; overflow: hidden;
  transition: max-height .4s var(--ease);
}
.v2-rune-card.expanded .v2-rune-desc { max-height: 200px; font-size: 14px; }
.v2-rune-corner {
  position: absolute; top: 12px; right: 14px;
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.15em;
  color: rgba(127,182,196,0.4);
}

/* ── CHAPTER 2: PROCESS ── */
.v2-process {
  width: 100%; max-width: 1400px;
  display: grid; grid-template-columns: 420px minmax(0, 1fr); gap: 80px;
  align-items: center;
}
.v2-process-anvil {
  position: relative; width: 420px; max-width: 100%;
  height: 480px; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.v2-process-stages { min-width: 0; max-width: 100%; overflow: hidden; display: flex; flex-direction: column; }
.v2-anvil-svg { width: 100%; height: 100%; }
.v2-anvil-svg .anvil-base { fill: var(--petrol); }
.v2-anvil-svg .anvil-top { fill: #2a4248; }
.v2-anvil-svg .ingot {
  fill: var(--ember);
  filter: drop-shadow(0 0 var(--glow, 8px) var(--ember));
  transition: filter .3s;
}
.v2-anvil-svg .hammer {
  transform-origin: 240px 130px;
  animation: hammerStrike 2.2s cubic-bezier(0.5,0,0.7,1) infinite;
}
@keyframes hammerStrike {
  0%, 100% { transform: rotate(-25deg) translateY(0); }
  40%       { transform: rotate(-50deg) translateY(-8px); }
  55%       { transform: rotate(0deg) translateY(0); }
  70%       { transform: rotate(5deg) translateY(0); }
  85%       { transform: rotate(-25deg) translateY(0); }
}
.v2-anvil-spark {
  position: absolute; width: 4px; height: 4px; border-radius: 50%;
  background: var(--ember); box-shadow: 0 0 8px var(--ember);
  pointer-events: none;
  animation: sparkFly 0.8s ease-out forwards;
}
@keyframes sparkFly {
  0% { opacity: 1; transform: translate(0,0) scale(1); }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.3); }
}
.v2-stages-list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.v2-stage {
  position: relative; padding: 18px 24px 18px 64px;
  background: transparent; border: 1px solid transparent;
  border-radius: var(--r-md); cursor: pointer;
  text-align: left; color: inherit; font: inherit;
  transition: all .3s var(--ease);
}
.v2-stage::before {
  content: ''; position: absolute; left: 24px; top: 50%; transform: translateY(-50%);
  width: 14px; height: 14px; border-radius: 50%;
  border: 1px solid rgba(127,182,196,0.4); transition: all .3s;
}
.v2-stage:hover { background: rgba(127,182,196,0.04); border-color: rgba(127,182,196,0.15); }
.v2-stage.active { background: rgba(201,138,75,0.06); border-color: rgba(201,138,75,0.35); }
.v2-stage.active::before {
  background: var(--ember); border-color: var(--ember);
  box-shadow: 0 0 0 5px rgba(201,138,75,0.15), 0 0 16px var(--ember);
}
.v2-stage-num { font-family: var(--mono); font-size: 9px; letter-spacing: 0.22em; color: var(--ember); text-transform: uppercase; margin-bottom: 4px; }
.v2-stage-title { font-family: var(--display); font-size: 22px; font-weight: 600; color: var(--stone-3); letter-spacing: 0.01em; margin: 0 0 4px; }
.v2-stage-desc {
  font-size: 14px; line-height: 1.55; color: rgba(214,225,232,0.7);
  margin: 0; max-height: 0; overflow: hidden;
  transition: max-height .35s var(--ease), margin .35s;
}
.v2-stage.active .v2-stage-desc { max-height: 80px; margin-top: 6px; }

/* ── CHAPTER 3: STACK ── */
.v2-stack {
  width: 100%; max-width: 1300px;
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 80px;
  align-items: center;
}
.v2-stack-orbit {
  position: relative; height: 520px;
  display: flex; align-items: center; justify-content: center;
}
.v2-orbit-ring { position: absolute; left: 50%; top: 50%; border: 1px dashed rgba(127,182,196,0.18); border-radius: 50%; }
.v2-orbit-ring.o1 { width: 200px; height: 200px; margin: -100px 0 0 -100px; }
.v2-orbit-ring.o2 { width: 340px; height: 340px; margin: -170px 0 0 -170px; }
.v2-orbit-ring.o3 { width: 480px; height: 480px; margin: -240px 0 0 -240px; }
.v2-orbit-center {
  width: 100px; height: 100px; border-radius: 50%;
  background: radial-gradient(circle, rgba(201,138,75,0.2), rgba(201,138,75,0));
  display: flex; align-items: center; justify-content: center;
}
.v2-orbit-center img { width: 70px; height: 70px; object-fit: contain; }
.v2-tech-pill {
  position: absolute; left: 50%; top: 50%;
  padding: 6px 14px; border-radius: 999px;
  background: rgba(11,16,20,0.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(127,182,196,0.25);
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.05em;
  color: var(--frost-soft); white-space: nowrap;
  transform: translate(-50%, -50%);
  transition: all .25s var(--ease); cursor: default;
}
.v2-tech-pill:hover { border-color: var(--ember); color: var(--ember); background: rgba(201,138,75,0.1); }

/* ── CHAPTER 4: WORK ── */
.v2-work { width: 100%; max-width: 1400px; }
.v2-work-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 32px; }
.v2-case {
  background: rgba(127,182,196,0.04); border: 1px solid rgba(127,182,196,0.15);
  border-radius: var(--r-md); padding: 28px;
  transition: all .3s var(--ease); display: flex; flex-direction: column; gap: 16px;
}
.v2-case:hover { border-color: var(--ember); transform: translateY(-4px); background: rgba(201,138,75,0.04); }
.v2-case-tag { font-family: var(--mono); font-size: 9px; letter-spacing: 0.22em; color: var(--ember); text-transform: uppercase; }
.v2-case-title { font-family: var(--display); font-size: 22px; font-weight: 600; color: var(--stone-3); margin: 0; letter-spacing: 0.01em; }
.v2-case-desc { font-size: 14px; line-height: 1.55; color: rgba(214,225,232,0.7); margin: 0; }
.v2-case-stats { display: flex; gap: 24px; padding-top: 14px; border-top: 1px solid rgba(127,182,196,0.1); }
.v2-case-stat-num { font-family: var(--display); font-size: 16px; font-weight: 600; color: var(--ember); line-height: 1.3; }

/* ── CHAPTER 5: STATS ── */
.v2-stats { width: 100%; max-width: 1400px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.v2-stat-cell { padding: 40px 28px; border-left: 1px solid rgba(127,182,196,0.12); position: relative; }
.v2-stat-cell:first-child { border-left: 0; }
.v2-stat-num { font-family: var(--display); font-weight: 600; font-size: clamp(48px, 5vw, 72px); line-height: 1; color: var(--ember); letter-spacing: -0.01em; }
.v2-stat-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; color: rgba(214,225,232,0.6); text-transform: uppercase; margin-top: 16px; }
.v2-stat-rune { position: absolute; top: 24px; right: 28px; font-family: 'Noto Sans Runic', serif; font-size: 28px; color: rgba(127,182,196,0.25); }

/* ── CHAPTER 6: CONTACT ── */
.v2-contact {
  width: 100%; max-width: 1100px;
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 80px; align-items: center;
}
.v2-contact-form { display: flex; flex-direction: column; gap: 16px; }
.v2-contact-input,
.v2-contact-textarea {
  background: rgba(127,182,196,0.04); border: 1px solid rgba(127,182,196,0.2);
  border-radius: var(--r-md); padding: 14px 16px;
  font-family: var(--sans); font-size: 14px; color: var(--stone-3);
  transition: border-color .2s;
}
.v2-contact-input:focus,
.v2-contact-textarea:focus { outline: 0; border-color: var(--ember); background: rgba(201,138,75,0.04); }
.v2-contact-textarea { min-height: 120px; resize: vertical; font-family: var(--sans); }
.v2-contact-submit { align-self: flex-start; margin-top: 6px; }

/* ── MOBILE ── */
@media (max-width: 900px) {
  .v2-hero, .v2-process, .v2-stack, .v2-contact { grid-template-columns: 1fr; gap: 32px; }
  .v2-services { grid-template-columns: 1fr; gap: 32px; }
  .v2-services-grid { grid-template-columns: repeat(2, 1fr); }
  .v2-work-grid { grid-template-columns: 1fr; }
  .v2-stats { grid-template-columns: repeat(2, 1fr); }
  .v2-stat-cell:nth-child(2) { border-left: 0; }
  .v2-hero-right { height: 360px; }
  .v2-stack-orbit { height: 360px; }
  .v2-nav { display: none; }
  .v2-section { padding: 80px 24px; align-items: flex-start; padding-top: 100px; }
}
```

- [ ] **Step 2: Type-check**

```bash
cd "F:/DANIEL - PROJETOS/InfinityForge-LP/Infinity-Forge-LP"
pnpm check
```

Expected: no new errors (CSS files are not type-checked).

- [ ] **Step 3: Commit**

```bash
git init  # project has no git repo yet — initialize it first
git add client/src/styles/v2.css
git commit -m "feat: add v2 CSS tokens, layout and component styles"
```

---

## Task 2: Content — i18n-v2.ts

**Files:**
- Create: `client/src/lib/i18n-v2.ts`

- [ ] **Step 1: Create the content file**

```typescript
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
      { rune: 'Mjölnir',    name: 'Aplicativos Mobile',              desc: 'iOS e Android nativos ou híbridos. Performance, offline-first e UX que aguenta o impacto do uso real.' },
      { rune: 'Yggdrasil',  name: 'Arquitetura & Software sob medida', desc: 'Sistemas críticos com raízes profundas. Desenhamos a árvore-mundo do seu produto.' },
      { rune: 'Bifröst',    name: 'APIs & Integrações',               desc: 'Pontes entre sistemas legados, ERPs, gateways e serviços modernos. Confiáveis em qualquer travessia.' },
      { rune: 'Asgard',     name: 'Cloud, DevOps & Infra',            desc: 'AWS, GCP, Azure. CI/CD, observabilidade, segurança. A morada dos seus serviços.' },
      { rune: 'Huginn',     name: 'IA & Automação',                   desc: 'Agentes, RAG, automação de processos. Os corvos de Odin observando seus dados.' },
      { rune: 'Skidbladnir',name: 'Aplicações Web & SaaS',            desc: 'O navio dobrável dos deuses — web apps que se adaptam a qualquer escala.' },
      { rune: 'Mímir',      name: 'Consultoria & Arquitetura',        desc: 'O guardião da sabedoria. Auditoria, due diligence técnica, decisões de stack.' },
      { rune: 'Idunn',      name: 'UX/UI Design',                     desc: 'A guardiã das maçãs douradas. Interfaces que mantêm seu produto eternamente jovem.' },
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
      { tag: 'Fintech',    title: 'Plataforma de crédito B2B',         desc: 'Sistema de análise e concessão. 40k análises/mês, decisão em <2s.',              metric: '↓ 73% no tempo de aprovação' },
      { tag: 'Healthtech', title: 'Prontuário eletrônico distribuído',  desc: 'Multi-clínica, offline-first, com sincronização eventual.',                       metric: '99.99% uptime em 18 meses' },
      { tag: 'Logística',  title: 'Roteirização com IA',                desc: 'Otimização de frota com restrições reais (janelas, jornada, peso).',               metric: '↓ 28% custo por entrega' },
      { tag: 'Indústria',  title: 'IIoT — chão de fábrica',            desc: 'Coleta em tempo real de 600+ sensores, dashboards e alertas.',                    metric: '↑ 12% OEE em 6 meses' },
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
```

- [ ] **Step 2: Type-check**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/lib/i18n-v2.ts
git commit -m "feat: add v2 PT content"
```

---

## Task 3: Fixed UI shell — TopBar, NavRail, BottomBar

**Files:**
- Create: `client/src/components/v2/TopBar.tsx`
- Create: `client/src/components/v2/NavRail.tsx`
- Create: `client/src/components/v2/BottomBar.tsx`

- [ ] **Step 1: Create TopBar.tsx**

```tsx
// client/src/components/v2/TopBar.tsx

export default function TopBar() {
  return (
    <div className="v2-topbar">
      <div className="v2-brand">
        <img src="/logo.png" alt="" />
        <div className="v2-brand-text">
          <div className="v2-brand-name">Infinity Forge</div>
          <div className="v2-brand-sub">Jornada · v2</div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create NavRail.tsx**

```tsx
// client/src/components/v2/NavRail.tsx

interface Chapter {
  id: string;
  label: string;
}

interface NavRailProps {
  chapters: Chapter[];
  activeIdx: number;
  onJump: (i: number) => void;
}

export default function NavRail({ chapters, activeIdx, onJump }: NavRailProps) {
  return (
    <nav className="v2-nav">
      {chapters.map((c, i) => (
        <button
          key={c.id}
          className={`v2-nav-dot${activeIdx === i ? ' active' : ''}`}
          onClick={() => onJump(i)}
        >
          <span>{c.label}</span>
          <span className="v2-nav-num">0{i + 1}</span>
        </button>
      ))}
    </nav>
  );
}
```

- [ ] **Step 3: Create BottomBar.tsx**

```tsx
// client/src/components/v2/BottomBar.tsx

interface Chapter {
  id: string;
  label: string;
}

interface BottomBarProps {
  chapters: Chapter[];
  activeIdx: number;
}

export default function BottomBar({ chapters, activeIdx }: BottomBarProps) {
  const total = chapters.length;
  const current = chapters[activeIdx];

  return (
    <div className="v2-bottombar">
      <div className="v2-chapter-info">
        <div className="v2-chapter-eyebrow">Capítulo</div>
        <div className="v2-chapter-counter">
          {String(activeIdx + 1).padStart(2, '0')}
          <span>/</span>
          {String(total).padStart(2, '0')}
          <span>·</span>
          {current?.label}
        </div>
      </div>
      <div className="v2-hint">
        <span>role · clique nos pontos</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Type-check**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add client/src/components/v2/TopBar.tsx client/src/components/v2/NavRail.tsx client/src/components/v2/BottomBar.tsx
git commit -m "feat: add v2 fixed shell components"
```

---

## Task 4: HeroChapter

**Files:**
- Create: `client/src/components/v2/chapters/HeroChapter.tsx`

- [ ] **Step 1: Create HeroChapter.tsx**

```tsx
// client/src/components/v2/chapters/HeroChapter.tsx
import { useState, useEffect, useRef } from 'react';
import type { I18nContent } from '@/lib/i18n-v2';

const RUNES = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ','ᚾ','ᛁ','ᛃ'];
const RADIUS = 240;

interface HeroChapterProps {
  t: I18nContent;
  onJump: (i: number) => void;
}

export default function HeroChapter({ t, onJump }: HeroChapterProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sigilRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [hotRune, setHotRune] = useState(-1);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if (sigilRef.current) {
        sigilRef.current.style.transform =
          `rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(0)`;
      }
      if (leftRef.current) {
        leftRef.current.style.transform =
          `translate3d(${x * -8}px, ${y * -6}px, 0)`;
      }
    };
    const node = wrapRef.current;
    node?.addEventListener('mousemove', onMove);
    return () => node?.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setHotRune(Math.floor(Math.random() * RUNES.length)),
      1400,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="v2-chapter" ref={wrapRef}>
      <div className="v2-grid-bg" />
      <div className="v2-hero">
        <div className="v2-hero-left" ref={leftRef}>
          <div className="v2-hero-eyebrow">{t.hero.eyebrow}</div>
          <h1 className="v2-hero-title">
            {t.hero.title1}
            <br />
            <em>{t.hero.title2}</em>
          </h1>
          <p className="v2-hero-sub">{t.hero.sub}</p>
          <div className="v2-hero-ctas">
            <button className="v2-cta v2-cta-primary" onClick={() => onJump(6)}>
              {t.cta.primary}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="v2-cta v2-cta-ghost" onClick={() => onJump(2)}>
              Ver processo
            </button>
          </div>
        </div>

        <div className="v2-hero-right">
          <div className="v2-sigil" ref={sigilRef}>
            <div className="v2-sigil-pulse" />
            <div className="v2-sigil-ring r1" />
            <div className="v2-sigil-ring r2" />
            <div className="v2-sigil-ring r3" />
            {RUNES.map((r, i) => {
              const angle = (i / RUNES.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * RADIUS;
              const y = Math.sin(angle) * RADIUS;
              return (
                <div
                  key={i}
                  className={`v2-sigil-rune${hotRune === i ? ' hot' : ''}`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  {r}
                </div>
              );
            })}
            <div className="v2-sigil-core">
              <img src="/logo.png" alt="Infinity Forge" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/v2/chapters/HeroChapter.tsx
git commit -m "feat: add v2 HeroChapter with sigil parallax"
```

---

## Task 5: ServicesChapter

**Files:**
- Create: `client/src/components/v2/chapters/ServicesChapter.tsx`

- [ ] **Step 1: Create ServicesChapter.tsx**

```tsx
// client/src/components/v2/chapters/ServicesChapter.tsx
import { useState } from 'react';
import type { I18nContent } from '@/lib/i18n-v2';

const RUNE_MAP: Record<string, string> = {
  Mjölnir: 'ᛗ', Yggdrasil: 'ᛇ', Bifröst: 'ᛒ', Asgard: 'ᚨ',
  Huginn: 'ᚺ', Skidbladnir: 'ᛋ', Mímir: 'ᛗ', Idunn: 'ᛁ',
};

interface ServicesChapterProps {
  t: I18nContent;
}

export default function ServicesChapter({ t }: ServicesChapterProps) {
  const [expanded, setExpanded] = useState(0);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
    e.currentTarget.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
  };

  return (
    <div className="v2-chapter">
      <div className="v2-services">
        <div className="v2-services-intro">
          <div className="sec-eyebrow">{t.services.eyebrow}</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(34px, 4vw, 52px)' }}>
            {t.services.title}
          </h2>
          <p className="sec-sub">{t.services.sub}</p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--ember)', textTransform: 'uppercase', marginTop: 8 }}>
            ◇ Clique para abrir
          </p>
        </div>
        <div className="v2-services-grid">
          {t.services.list.map((s, i) => (
            <button
              key={i}
              className={`v2-rune-card${expanded === i ? ' expanded' : ''}`}
              onMouseMove={onMove}
              onClick={() => setExpanded(i === expanded ? -1 : i)}
            >
              <div>
                <div className="v2-rune-corner">0{i + 1}</div>
                <div className="v2-rune-glyph">{RUNE_MAP[s.rune] ?? 'ᚠ'}</div>
              </div>
              <div>
                <div className="v2-rune-meta">{s.rune}</div>
                <div className="v2-rune-name">{s.name}</div>
                <p className="v2-rune-desc">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/v2/chapters/ServicesChapter.tsx
git commit -m "feat: add v2 ServicesChapter with expandable rune cards"
```

---

## Task 6: ProcessChapter

**Files:**
- Create: `client/src/components/v2/chapters/ProcessChapter.tsx`

- [ ] **Step 1: Create ProcessChapter.tsx**

```tsx
// client/src/components/v2/chapters/ProcessChapter.tsx
import { useState, useEffect } from 'react';
import type { I18nContent } from '@/lib/i18n-v2';

interface Spark {
  id: number;
  dx: number;
  dy: number;
}

interface ProcessChapterProps {
  t: I18nContent;
}

export default function ProcessChapter({ t }: ProcessChapterProps) {
  const [active, setActive] = useState(0);
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      const burst: Spark[] = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        dx: (Math.random() - 0.5) * 200,
        dy: -50 - Math.random() * 80,
      }));
      setSparks(prev => [...prev.slice(-12), ...burst]);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const glow = 8 + active * 6;

  return (
    <div className="v2-chapter">
      <div className="v2-process">
        <div className="v2-process-anvil">
          <svg
            viewBox="0 0 480 480"
            className="v2-anvil-svg"
            style={{ '--glow': glow + 'px' } as React.CSSProperties}
          >
            <defs>
              <radialGradient id="forgeGlow" cx="50%" cy="65%" r="40%">
                <stop offset="0%" stopColor="rgba(201,138,75,0.3)" />
                <stop offset="100%" stopColor="rgba(201,138,75,0)" />
              </radialGradient>
            </defs>
            <circle cx="240" cy="320" r="180" fill="url(#forgeGlow)" />
            <path className="anvil-base" d="M140 380 L340 380 L320 440 L160 440 Z" />
            <rect className="anvil-base" x="180" y="320" width="120" height="60" rx="4" />
            <path className="anvil-top" d="M120 280 Q120 270 130 270 L350 270 Q360 270 360 280 L360 320 L120 320 Z" />
            <circle className="anvil-top" cx="370" cy="295" r="16" />
            <rect className="ingot" x="200" y="248" width="80" height="22" rx="3" />
            <g className="hammer">
              <rect x="232" y="60" width="14" height="80" rx="2" fill="#3a4a52" />
              <rect x="210" y="40" width="60" height="30" rx="3" fill="#1f3a40" stroke="#7fb6c4" strokeWidth="1" />
              <rect x="218" y="48" width="44" height="14" rx="1" fill="#2a4248" />
            </g>
            <text x="240" y="305" textAnchor="middle" fontFamily="Noto Sans Runic" fontSize="16" fill="var(--ember)" opacity="0.7">
              ᚠ ᛟ ᚱ ᚷ ᛖ
            </text>
          </svg>
          {sparks.map(s => (
            <div
              key={s.id}
              className="v2-anvil-spark"
              style={{ left: '50%', top: '52%', '--dx': s.dx + 'px', '--dy': s.dy + 'px' } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="v2-process-stages">
          <div className="sec-eyebrow">{t.process.eyebrow}</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
            {t.process.title}
          </h2>
          <p className="sec-sub">{t.process.sub}</p>
          <div className="v2-stages-list">
            {t.process.steps.map((s, i) => (
              <button
                key={i}
                className={`v2-stage${active === i ? ' active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <div className="v2-stage-num">{s.rune} · {s.sub}</div>
                <div className="v2-stage-title">{s.name}</div>
                <p className="v2-stage-desc">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/v2/chapters/ProcessChapter.tsx
git commit -m "feat: add v2 ProcessChapter with animated anvil"
```

---

## Task 7: StackChapter

**Files:**
- Create: `client/src/components/v2/chapters/StackChapter.tsx`

- [ ] **Step 1: Create StackChapter.tsx**

```tsx
// client/src/components/v2/chapters/StackChapter.tsx
import type { I18nContent } from '@/lib/i18n-v2';

const RADII = [100, 170, 240] as const;
const RING_COLORS = ['#c98a4b', '#7fb6c4', '#d6e1e8', '#9bb5a8', '#b07a3a'];

interface StackChapterProps {
  t: I18nContent;
}

export default function StackChapter({ t }: StackChapterProps) {
  const allTech = t.stack.groups.flatMap((g, gi) =>
    g.items.map(item => ({ name: item, group: g.label, ring: gi % 3 })),
  );

  return (
    <div className="v2-chapter">
      <div className="v2-stack">
        <div>
          <div className="sec-eyebrow">{t.stack.eyebrow}</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
            {t.stack.title}
          </h2>
          <p className="sec-sub">{t.stack.sub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginTop: 24 }}>
            {t.stack.groups.map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: 2,
                  background: RING_COLORS[i],
                  boxShadow: `0 0 8px ${RING_COLORS[i]}`,
                  flexShrink: 0,
                }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--frost)', textTransform: 'uppercase' }}>
                  {g.label}{' '}
                  <span style={{ color: 'rgba(214,225,232,.4)' }}>· {g.items.length}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="v2-stack-orbit">
          <div className="v2-orbit-ring o1" />
          <div className="v2-orbit-ring o2" />
          <div className="v2-orbit-ring o3" />
          <div className="v2-orbit-center">
            <img src="/logo.png" alt="" />
          </div>
          {allTech.map((tech, i) => {
            const ringIdx = tech.ring as 0 | 1 | 2;
            const sameRingCount = allTech.slice(0, i + 1).filter(x => x.ring === ringIdx).length - 1;
            const totalInRing = allTech.filter(x => x.ring === ringIdx).length;
            const angle = (sameRingCount / totalInRing) * Math.PI * 2 - Math.PI / 2 + ringIdx * 0.4;
            const r = RADII[ringIdx];
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            return (
              <div key={i} className="v2-tech-pill" style={{ marginLeft: x, marginTop: y }}>
                {tech.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/v2/chapters/StackChapter.tsx
git commit -m "feat: add v2 StackChapter with orbital layout"
```

---

## Task 8: WorkChapter and StatsChapter

**Files:**
- Create: `client/src/components/v2/chapters/WorkChapter.tsx`
- Create: `client/src/components/v2/chapters/StatsChapter.tsx`

- [ ] **Step 1: Create WorkChapter.tsx**

```tsx
// client/src/components/v2/chapters/WorkChapter.tsx
import type { I18nContent } from '@/lib/i18n-v2';

interface WorkChapterProps {
  t: I18nContent;
}

export default function WorkChapter({ t }: WorkChapterProps) {
  return (
    <div className="v2-chapter">
      <div className="v2-work">
        <div style={{ maxWidth: 680, marginBottom: 8 }}>
          <div className="sec-eyebrow">{t.work.eyebrow}</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
            {t.work.title}
          </h2>
          <p className="sec-sub" style={{ marginBottom: 0 }}>{t.work.sub}</p>
        </div>
        <div className="v2-work-grid">
          {t.work.items.map((c, i) => (
            <div key={i} className="v2-case">
              <div className="v2-case-tag">{c.tag}</div>
              <h3 className="v2-case-title">{c.title}</h3>
              <p className="v2-case-desc">{c.desc}</p>
              <div className="v2-case-stats">
                <div className="v2-case-stat-num">{c.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create StatsChapter.tsx**

```tsx
// client/src/components/v2/chapters/StatsChapter.tsx
import type { I18nContent } from '@/lib/i18n-v2';

interface StatsChapterProps {
  t: I18nContent;
}

export default function StatsChapter({ t }: StatsChapterProps) {
  return (
    <div className="v2-chapter">
      <div style={{ width: '100%', maxWidth: 1400 }}>
        <div style={{ maxWidth: 680, marginBottom: 56 }}>
          <div className="sec-eyebrow">{t.stats.eyebrow}</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}>
            {t.stats.title}
          </h2>
          <p className="sec-sub">{t.stats.sub}</p>
        </div>
        <div className="v2-stats">
          {t.stats.items.map((s, i) => (
            <div key={i} className="v2-stat-cell">
              <div className="v2-stat-rune">{s.rune}</div>
              <div className="v2-stat-num">{s.num}</div>
              <div className="v2-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add client/src/components/v2/chapters/WorkChapter.tsx client/src/components/v2/chapters/StatsChapter.tsx
git commit -m "feat: add v2 WorkChapter and StatsChapter"
```

---

## Task 9: ContactChapter

**Files:**
- Create: `client/src/components/v2/chapters/ContactChapter.tsx`

- [ ] **Step 1: Create ContactChapter.tsx**

```tsx
// client/src/components/v2/chapters/ContactChapter.tsx
import { useState } from 'react';
import type { I18nContent } from '@/lib/i18n-v2';

interface ContactChapterProps {
  t: I18nContent;
}

export default function ContactChapter({ t }: ContactChapterProps) {
  const [sent, setSent] = useState(false);

  return (
    <div className="v2-chapter">
      <div className="v2-contact">
        <div>
          <div className="sec-eyebrow">{t.contact.eyebrow}</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(36px, 4.2vw, 60px)' }}>
            {t.contact.title}
          </h2>
          <p className="sec-sub">{t.contact.sub}</p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 16,
            padding: '10px 16px', border: '1px solid rgba(201,138,75,0.3)',
            borderRadius: 999, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ember)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ember)', boxShadow: '0 0 8px var(--ember)', flexShrink: 0 }} />
            {t.contact.email}
          </div>
        </div>

        <form
          className="v2-contact-form"
          onSubmit={e => { e.preventDefault(); setSent(true); }}
        >
          <input className="v2-contact-input" placeholder={t.contact.ph_name} required />
          <input className="v2-contact-input" type="email" placeholder={t.contact.ph_email} required />
          <input className="v2-contact-input" placeholder={t.contact.ph_company} />
          <textarea className="v2-contact-textarea" placeholder={t.contact.ph_msg} required />
          <button
            type="submit"
            className="v2-cta v2-cta-primary v2-contact-submit"
            disabled={sent}
          >
            {sent ? 'Recebido ✓' : t.contact.cta}
            {!sent && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/v2/chapters/ContactChapter.tsx
git commit -m "feat: add v2 ContactChapter"
```

---

## Task 10: HomeV2 page

**Files:**
- Create: `client/src/pages/HomeV2.tsx`

- [ ] **Step 1: Create HomeV2.tsx**

```tsx
// client/src/pages/HomeV2.tsx
import { useState, useEffect } from 'react';
import '@/styles/v2.css';
import TopBar from '@/components/v2/TopBar';
import NavRail from '@/components/v2/NavRail';
import BottomBar from '@/components/v2/BottomBar';
import HeroChapter from '@/components/v2/chapters/HeroChapter';
import ServicesChapter from '@/components/v2/chapters/ServicesChapter';
import ProcessChapter from '@/components/v2/chapters/ProcessChapter';
import StackChapter from '@/components/v2/chapters/StackChapter';
import WorkChapter from '@/components/v2/chapters/WorkChapter';
import StatsChapter from '@/components/v2/chapters/StatsChapter';
import ContactChapter from '@/components/v2/chapters/ContactChapter';
import { I18N_PT } from '@/lib/i18n-v2';

const CHAPTERS = [
  { id: 'hero',     label: 'Origem'   },
  { id: 'services', label: 'Serviços' },
  { id: 'process',  label: 'Processo' },
  { id: 'stack',    label: 'Stack'    },
  { id: 'work',     label: 'Cases'    },
  { id: 'numbers',  label: 'Números'  },
  { id: 'contact',  label: 'Contato'  },
] as const;

export default function HomeV2() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const jump = (i: number) => {
    const next = Math.max(0, Math.min(CHAPTERS.length - 1, i));
    const el = document.getElementById('v2-' + CHAPTERS[next].id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    document.body.classList.add('v2');
    return () => document.body.classList.remove('v2');
  }, []);

  useEffect(() => {
    const sections = CHAPTERS.map(c =>
      document.getElementById('v2-' + c.id),
    ).filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      const sc = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (sc / max) * 100 : 0);
      const trigger = sc + window.innerHeight * 0.33;
      let best = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= trigger) best = i;
      }
      setActiveChapter(best);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const t = I18N_PT;

  return (
    <>
      <div className="v2-progress" style={{ width: scrollProgress + '%' }} />
      <TopBar />
      <NavRail chapters={[...CHAPTERS]} activeIdx={activeChapter} onJump={jump} />
      <main className="v2-scroll">
        <section id="v2-hero"     className="v2-section"><HeroChapter     t={t} onJump={jump} /></section>
        <section id="v2-services" className="v2-section"><ServicesChapter t={t} /></section>
        <section id="v2-process"  className="v2-section"><ProcessChapter  t={t} /></section>
        <section id="v2-stack"    className="v2-section"><StackChapter    t={t} /></section>
        <section id="v2-work"     className="v2-section"><WorkChapter     t={t} /></section>
        <section id="v2-numbers"  className="v2-section"><StatsChapter    t={t} /></section>
        <section id="v2-contact"  className="v2-section v2-section-end"><ContactChapter t={t} /></section>
      </main>
      <BottomBar chapters={[...CHAPTERS]} activeIdx={activeChapter} />
    </>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/pages/HomeV2.tsx
git commit -m "feat: add HomeV2 page orchestrator"
```

---

## Task 11: Wire App.tsx

**Files:**
- Modify: `client/src/App.tsx`

- [ ] **Step 1: Replace Home import with HomeV2**

Open `client/src/App.tsx`. Replace:

```tsx
import Home from "./pages/Home";
```

with:

```tsx
import HomeV2 from "./pages/HomeV2";
```

Replace the route:

```tsx
<Route path={"/"} component={Home} />
```

with:

```tsx
<Route path={"/"} component={HomeV2} />
```

The final `App.tsx` should look like:

```tsx
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import HomeV2 from "./pages/HomeV2";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={HomeV2} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
```

- [ ] **Step 2: Type-check**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/App.tsx
git commit -m "feat: wire HomeV2 as main route — v2 landing live"
```

---

## Task 12: Smoke test in browser

- [ ] **Step 1: Start dev server**

```bash
pnpm dev
```

Open `http://localhost:3000` in a browser.

- [ ] **Step 2: Verify each chapter loads**

Scroll through the page. Check:
- [ ] Progress bar (amber) fills as you scroll
- [ ] TopBar shows logo + "Infinity Forge · Jornada v2"
- [ ] NavRail dots (right side) track active chapter
- [ ] BottomBar counter updates (01/07 → 07/07)
- [ ] Hero: sigil rings spinning, runes highlight, mouse parallax works
- [ ] Services: click a card — it expands to 2×2
- [ ] Process: hammer animation plays, stage buttons activate on hover/click, sparks appear
- [ ] Stack: tech pills appear in orbital pattern
- [ ] Work: 4 case cards with hover lift
- [ ] Numbers: 4 stat cells with large numbers
- [ ] Contact: form fields visible, submit sets button to "Recebido ✓"
- [ ] NavRail dots navigate to correct chapter on click

- [ ] **Step 3: Check mobile (900px)**

Resize browser to 900px wide. Verify:
- NavRail is hidden
- Grid layouts collapse to single column

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: browser smoke test corrections"
```
