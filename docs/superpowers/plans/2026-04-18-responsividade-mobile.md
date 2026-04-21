# Responsividade Mobile — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir typografia e padding em smartphones comuns (360–390px) sem alterar layout ou estrutura existente.

**Architecture:** Ajustes pontuais de classes Tailwind nos componentes JSX e no CSS global `nordic-panel`. Sem mudança de estrutura, sem novos componentes.

**Tech Stack:** React 19, Tailwind CSS v4, IBM Plex Mono (headings monospace)

---

### Task 1: nordic-panel — padding responsivo

**Files:**
- Modify: `client/src/index.css`

- [ ] **Step 1: Verificar o estado atual**

Confirmar que a linha `.nordic-panel` contém `p-6`:

```bash
grep -n "nordic-panel" client/src/index.css
```

Esperado: linha com `@apply ... p-6 ...`

- [ ] **Step 2: Substituir padding fixo por responsivo**

No arquivo `client/src/index.css`, na definição `.nordic-panel`, trocar `p-6` por `p-4 md:p-6`:

```css
/* antes */
.nordic-panel {
  @apply rounded-2xl border border-primary/20 bg-card/80 p-6 shadow-[0_14px_30px_-22px_rgba(19,39,48,0.75)] backdrop-blur-sm;
}

/* depois */
.nordic-panel {
  @apply rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-[0_14px_30px_-22px_rgba(19,39,48,0.75)] backdrop-blur-sm md:p-6;
}
```

- [ ] **Step 3: Commit**

```bash
git add client/src/index.css
git commit -m "fix: nordic-panel padding responsivo p-4 md:p-6"
```

---

### Task 2: HeroSection — h1 responsivo

**Files:**
- Modify: `client/src/components/HeroSection.tsx`

- [ ] **Step 1: Atualizar classe do h1**

No arquivo `client/src/components/HeroSection.tsx`, linha 34, substituir:

```tsx
/* antes */
<h1 className="hero-text mb-7 text-5xl font-bold text-foreground md:text-7xl">

/* depois */
<h1 className="hero-text mb-7 text-4xl font-bold text-foreground sm:text-5xl md:text-7xl">
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/HeroSection.tsx
git commit -m "fix: hero h1 text-4xl base para mobile"
```

---

### Task 3: ProblemSection — h2 responsivo

**Files:**
- Modify: `client/src/components/ProblemSection.tsx`

- [ ] **Step 1: Atualizar classe do h2**

No arquivo `client/src/components/ProblemSection.tsx`, linha 16, substituir:

```tsx
/* antes */
<h2 className="mb-12 text-4xl font-bold text-foreground md:text-5xl">

/* depois */
<h2 className="mb-12 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/ProblemSection.tsx
git commit -m "fix: ProblemSection h2 text-3xl base para mobile"
```

---

### Task 4: AgileForgSection — h2 responsivo

**Files:**
- Modify: `client/src/components/AgileForgSection.tsx`

- [ ] **Step 1: Atualizar classe do h2**

No arquivo `client/src/components/AgileForgSection.tsx`, linha 38, substituir:

```tsx
/* antes */
<h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">

/* depois */
<h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/AgileForgSection.tsx
git commit -m "fix: AgileForgSection h2 text-3xl base para mobile"
```

---

### Task 5: ServicesSection — h2 e h3 responsivos

**Files:**
- Modify: `client/src/components/ServicesSection.tsx`

- [ ] **Step 1: Atualizar h2**

No arquivo `client/src/components/ServicesSection.tsx`, linha 37, substituir:

```tsx
/* antes */
<h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">

/* depois */
<h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
```

- [ ] **Step 2: Atualizar h3 dos cards de serviço**

No mesmo arquivo, linha 49, substituir:

```tsx
/* antes */
<h3 className="mb-2 text-2xl font-bold text-foreground transition-colors group-hover:text-primary">{service.title}</h3>

/* depois */
<h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary md:text-2xl">{service.title}</h3>
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/ServicesSection.tsx
git commit -m "fix: ServicesSection h2/h3 responsivos para mobile"
```

---

### Task 6: DifferentialsSection — h2 responsivo

**Files:**
- Modify: `client/src/components/DifferentialsSection.tsx`

- [ ] **Step 1: Atualizar classe do h2**

No arquivo `client/src/components/DifferentialsSection.tsx`, linha 42, substituir:

```tsx
/* antes */
<h2 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-foreground">

/* depois */
<h2 className="text-3xl font-mono font-bold mb-4 text-foreground md:text-4xl lg:text-5xl">
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/DifferentialsSection.tsx
git commit -m "fix: DifferentialsSection h2 text-3xl base para mobile"
```

---

### Task 7: HowToStartSection — h2 e h3 responsivos

**Files:**
- Modify: `client/src/components/HowToStartSection.tsx`

- [ ] **Step 1: Atualizar h2**

No arquivo `client/src/components/HowToStartSection.tsx`, linha 34, substituir:

```tsx
/* antes */
<h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">

/* depois */
<h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
```

- [ ] **Step 2: Atualizar h3 dos steps**

No mesmo arquivo, linha 49, substituir:

```tsx
/* antes */
<h3 className="mb-2 text-2xl font-bold text-foreground">{step.title}</h3>

/* depois */
<h3 className="mb-2 text-xl font-bold text-foreground md:text-2xl">{step.title}</h3>
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/HowToStartSection.tsx
git commit -m "fix: HowToStartSection h2/h3 responsivos para mobile"
```

---

### Task 8: AboutSection — h2 responsivo

**Files:**
- Modify: `client/src/components/AboutSection.tsx`

- [ ] **Step 1: Atualizar classe do h2**

No arquivo `client/src/components/AboutSection.tsx`, linha 29, substituir:

```tsx
/* antes */
<h2 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-foreground">

/* depois */
<h2 className="text-3xl font-mono font-bold mb-4 text-foreground md:text-4xl lg:text-5xl">
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/AboutSection.tsx
git commit -m "fix: AboutSection h2 text-3xl base para mobile"
```

---

### Task 9: CTAFinalSection — h2 responsivo

**Files:**
- Modify: `client/src/components/CTAFinalSection.tsx`

- [ ] **Step 1: Atualizar classe do h2**

No arquivo `client/src/components/CTAFinalSection.tsx`, linha 10, substituir:

```tsx
/* antes */
<h2 className="mb-8 text-4xl font-bold text-foreground md:text-5xl">

/* depois */
<h2 className="mb-8 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/CTAFinalSection.tsx
git commit -m "fix: CTAFinalSection h2 text-3xl base para mobile"
```

---

### Task 10: Footer — grid 2 colunas em mobile

**Files:**
- Modify: `client/src/components/Footer.tsx`

- [ ] **Step 1: Atualizar grid do footer**

No arquivo `client/src/components/Footer.tsx`, linha 10, substituir:

```tsx
/* antes */
<div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">

/* depois */
<div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/Footer.tsx
git commit -m "fix: footer grid-cols-2 em mobile"
```

---

### Task 11: Verificação visual e git push

- [ ] **Step 1: Iniciar o dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Verificar em mobile (360px)**

Abrir DevTools → toggle device toolbar → iPhone SE (375px). Percorrer todas as seções e verificar:
- Headings proporcionais e sem overflow
- Cards com padding adequado
- Footer em 2 colunas
- Hero h1 ocupa máximo 2–3 linhas

- [ ] **Step 3: Verificar em desktop (1280px)**

Desabilitar device toolbar e verificar que o layout desktop não sofreu regressão.

- [ ] **Step 4: git push**

```bash
git push origin main
```
