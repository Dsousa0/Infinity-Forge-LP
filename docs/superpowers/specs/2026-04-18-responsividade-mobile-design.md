# Spec: Ajustes de Responsividade Mobile

**Data:** 2026-04-18  
**Escopo:** Corrigir problemas de responsividade para smartphones comuns (360–390px) e desktop  
**Abordagem:** Ajustes cirúrgicos — sem alterar arquitetura ou layout existente

---

## Contexto

O projeto já possui estrutura responsiva adequada (grids `grid-cols-1 md:`, menu hambúrguer, botões `flex-col sm:flex-row`). Os problemas são pontuais: typografia grande demais no mobile e ausência de breakpoint intermediário no footer.

---

## Mudanças

### 1. HeroSection — h1

**Arquivo:** `client/src/components/HeroSection.tsx`

| Antes | Depois |
|---|---|
| `text-5xl md:text-7xl` | `text-4xl sm:text-5xl md:text-7xl` |

**Motivo:** IBM Plex Mono a 3rem (48px) em 360px ocupa 3–4 linhas e parece desproporcional.

---

### 2. Headings h2 de seções

**Arquivos afetados:**
- `ProblemSection.tsx`
- `AgileForgSection.tsx`
- `ServicesSection.tsx`
- `DifferentialsSection.tsx`
- `HowToStartSection.tsx`
- `AboutSection.tsx`
- `CTAFinalSection.tsx`

| Antes | Depois |
|---|---|
| `text-4xl md:text-5xl` | `text-3xl md:text-4xl lg:text-5xl` |

---

### 3. Headings h3 de cards

**Arquivos afetados:**
- `ServicesSection.tsx` — h3 `text-2xl` → `text-xl md:text-2xl`
- `HowToStartSection.tsx` — h3 `text-2xl` → `text-xl md:text-2xl`

---

### 4. nordic-panel — padding interno

**Arquivo:** `client/src/index.css`

| Antes | Depois |
|---|---|
| `p-6` | `p-4 md:p-6` |

**Motivo:** 24px de padding lateral dentro de um card em 360px consome espaço útil desnecessariamente.

---

### 5. Footer — breakpoint intermediário

**Arquivo:** `client/src/components/Footer.tsx`

| Antes | Depois |
|---|---|
| `grid-cols-1 md:grid-cols-4` | `grid-cols-2 md:grid-cols-4` |

**Motivo:** Em 360px, 2 colunas aproveita melhor o espaço do que empilhamento total em 1 coluna.

---

## Fora do escopo

- Grids de seção (já corretos: `grid-cols-1 md:grid-cols-2/3/4`)
- Menu mobile (funcional)
- Botões CTA (já `flex-col sm:flex-row`)
- Estrutura de layout geral
