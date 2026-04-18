# Spec: Integração da Logo no Header e Footer

**Data:** 2026-04-18  
**Escopo:** Substituir o placeholder de runa+texto nos componentes Header e Footer pela imagem real da marca

---

## Contexto

A logo atual (`imagens/Infinity Forge - logo 04.png`) é quadrada, fundo bege claro (`#c8c5b8`), com símbolo nórdico + texto "INFINITY FORGE" em teal e dourado. O site usa tema escuro por padrão.

---

## Mudanças

### 1. Copiar o arquivo

`imagens/Infinity Forge - logo 04.png` → `client/public/logo.png`

A pasta `client/public/` é a raiz estática do Vite; o arquivo fica acessível como `/logo.png`.

---

### 2. Header — `client/src/components/Header.tsx`

**Remover** o bloco atual:

```tsx
<div className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent/60 bg-primary text-primary-foreground" aria-hidden="true">
  <span className="font-mono text-lg font-bold">ᚠ</span>
</div>
<div className="leading-none">
  <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">Infinity</p>
  <p className="font-mono text-lg font-bold text-foreground">Forge</p>
</div>
```

**Substituir por:**

```tsx
<img src="/logo.png" alt="Infinity Forge" className="h-11 w-auto rounded-lg" />
```

---

### 3. Footer — `client/src/components/Footer.tsx`

**Remover** o bloco atual:

```tsx
<div className="flex h-9 w-9 items-center justify-center rounded-md border border-accent/60 bg-primary text-primary-foreground" aria-hidden="true">ᚠ</div>
<span className="font-mono font-bold">InfinityForge</span>
```

**Substituir por:**

```tsx
<img src="/logo.png" alt="Infinity Forge" className="h-9 w-auto rounded-md" />
```

---

## Fora do escopo

- Criar versão com fundo transparente da logo
- Alterar o favicon
- Usar a logo em outras seções (Hero, About, etc.)
