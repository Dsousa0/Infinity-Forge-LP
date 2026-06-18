# Redesign V3 — Cockpit HUD Nórdico-Futurista

**Data:** 2026-06-18
**Branch:** `redesign-cockpit-hud`
**Status:** spec aprovada (design), aguardando plano de implementação

## Contexto

A landing InfinityForge está consolidada na V2 (`pages/HomeV2.tsx` + `components/v2/`, tokens em `styles/v2.css`, fontes Cinzel + IBM Plex Mono + Noto Sans Runic, tema forja dourado/azul). O objetivo deste redesign é **remodelar todo o visual** com uma pegada **futurista**, **sem abandonar a mitologia nórdica** — runas, glifos e a metáfora da forja continuam centrais.

Mockups de exploração que embasaram as decisões:
- Comparação de direção (HUD vs Holográfico): artifact `cd28a365-652d-4fcc-9073-d73572437389`
- Conceito do cockpit em movimento: artifact `0417ec61-3322-457b-8dc0-181669fbc385`

## Decisões travadas (com o usuário)

| Eixo | Decisão |
|---|---|
| Estética | **HUD Nórdico** (sci-fi sóbrio): instrumentação, linhas finas, glow contido. NÃO holográfico/glassmorphism, NÃO cyberpunk neon. |
| Fundo | **Limpo** — sem grid de linhas. Apenas dark profundo + glows radiais sutis. |
| Alcance | **Redesign profundo** — repensar estrutura, navegação e interações, além da pele. |
| Experiência | **Cockpit HUD persistente** — moldura de interface fixa envolvendo a tela; as 7 seções são "módulos" dentro do cockpit. |
| Movimento | **Rico e cinematográfico** — scanline, faíscas, telemetria viva, mira reativa, parallax, transições de módulo. Sempre com `prefers-reduced-motion`. |
| Marca | Mantém paleta dourado (`--ember`) + frost (`--frost`) sobre dark; fontes Cinzel (display) + IBM Plex Mono (labels) + Noto Sans Runic (runas). |
| Conteúdo | Mantém os 7 tópicos/textos atuais (`i18n-v2.ts`). O redesign é de apresentação/interação, não de copy. |

## Visão geral da arquitetura

O site passa a ser um **cockpit**: uma casca de HUD persistente (sempre visível) que emoldura um fluxo de **7 módulos** roláveis. A casca é independente do conteúdo; cada módulo é uma unidade isolada que recebe um tratamento "instrumento".

```
<CockpitFrame>            ← casca persistente (fixed), independente do conteúdo
  ├─ CornerBrackets       ← 4 brackets fixos na viewport
  ├─ TopBar               ← marca + telemetria (relógio, status, coordenadas)
  ├─ NavRail              ← trilha lateral: 7 módulos + indicador ativo (scroll-spy)
  ├─ BottomBar            ← índice do módulo (NN/07) + ticker + dica
  └─ Scanline             ← varredura global sutil
<main> (scroll)
  ├─ Module: Origem       (hero / reticle)
  ├─ Module: Serviços
  ├─ Module: Processo
  ├─ Module: Stack
  ├─ Module: Cases
  ├─ Module: Números
  └─ Module: Contato
```

### Princípio de isolamento
- **CockpitFrame** não conhece o conteúdo dos módulos; recebe a lista de módulos (id, label) e o módulo ativo. Comunica via props.
- Cada **módulo** é um componente que recebe `t` (i18n) e expõe seu próprio tratamento HUD; pode ser entendido e ajustado sem ler os outros.
- O **scroll-spy** (já existente em `HomeV2`) é a única ponte entre conteúdo e casca: informa qual módulo está ativo → alimenta NavRail/BottomBar.

## Componentes da casca (cockpit shell)

Novo diretório sugerido: `components/v2/cockpit/`.

1. **`CockpitFrame.tsx`** — orquestra a casca; recebe `chapters`, `activeIdx`, `scrollProgress`, `onJump`. Renderiza brackets, TopBar, NavRail, BottomBar, Scanline. `pointer-events:none` na moldura, `auto` nos controles.
2. **`TopBar`** (evolui de `components/v2/TopBar.tsx`) — marca à esquerda; à direita um cluster de telemetria: `SYS.ONLINE`, `FORGE.v2`, coordenada nórdica fixa (ex.: `LAT 64°N`), e um **relógio ao vivo** (HH:MM:SS).
3. **`NavRail`** (evolui de `components/v2/NavRail.tsx`) — trilha vertical à esquerda; cada módulo é um item com "tick" que se estende e fica dourado quando ativo. Some em `≤900px`.
4. **`BottomBar`** (evolui de `components/v2/BottomBar.tsx`) — índice `MÓDULO NN / 07`, **ticker** de telemetria correndo (frases curtas + runas), dica de navegação.
5. **`Scanline` + `CornerBrackets`** — elementos decorativos puros (sem estado).

### Primitivos HUD (CSS, em `styles/v2.css` ou um `cockpit.css` dedicado)
- `--line: rgba(127,182,196,.20)` (frost translúcido para bordas/HUD)
- Bracket de canto reutilizável (cantos com borda em L).
- "tag de módulo" (`MÓDULO NN · Nome`) com traço dourado — padrão de cabeçalho de cada módulo.
- Painel HUD: borda fina + leve gradiente + barra de acento no topo.

## Os 7 módulos

Cada um mantém o conteúdo atual, ganha o cabeçalho-tag e o tratamento HUD:

1. **Origem (Hero)** — `HeroChapter`. Reticle/mira central (anéis girando, núcleo com glifo `ᛟ`), runas orbitando com "hot glow" rotativo, **faíscas** emitidas do núcleo. Headline Cinzel, CTAs HUD. (raio das runas já é responsivo — manter.)
2. **Serviços** — `ServicesChapter`. Cards → **painéis de módulo** com numeração técnica (`01`…), glifo rúnico, borda fina + acento.
3. **Processo** — `ProcessChapter`. Os 4 estágios como **sequência de calibração** (timeline HUD com estados); a bigorna vira diagrama técnico/linha. No mobile: título antes da ilustração (já corrigido).
4. **Stack** — `StackChapter`. Tecnologias como **radar/scanner** — constelação com anéis de varredura; pills com leitura de "sinal".
5. **Cases** — `WorkChapter`. Cards → **registros de missão / dossiês** com metadados (setor, métrica) em mono.
6. **Números** — `StatsChapter`. **Telemetria**: gauges com barra de acento + **contadores animados** na entrada (count-up com easing). (demonstrado no mockup.)
7. **Contato** — `ContactChapter`. **Console de transmissão**: form estilizado como terminal/entrada de dados. Backend/destino dos leads é **fora de escopo** aqui (item 5, pré-deploy).

## Sistema de movimento (rico) + acessibilidade

Animações permitidas: scanline global, mira girando, faíscas (Web Animations API, auto-removidas), ticker, count-up, hot-glow das runas, parallax leve em fundos, revelação de módulo por entrada na viewport (fade/translate via IntersectionObserver), indicador ativo da NavRail.

Regras:
- **Performance:** animar só `transform`/`opacity`; nada de reflow em loop; faíscas removidas ao terminar; tickers via CSS.
- **Acessibilidade:** bloco `@media (prefers-reduced-motion: reduce)` desliga scanline, faíscas, spins, parallax e count-up (mostra valor final direto). A estrutura permanece legível e estática.
- **Determinismo:** efeitos decorativos podem usar `Math.random()` no cliente (não há SSR aqui), mas a posição das runas/órbitas é determinística.

## Responsividade

- A **NavRail** e a telemetria do topo somem em `≤900px`; ficam marca + relógio compactos.
- **Brackets de canto** reduzem e podem recuar para não competir com o conteúdo.
- Reaproveita o ritmo vertical mobile já calibrado na V2 (sem `min-height:100vh` forçado, padding 88/56, última seção 96px para limpar a BottomBar).
- Grids dos módulos colapsam para 1–2 colunas; reticle/scanner reduzem altura.

## Mapa técnico (como aterrissa no código)

- **Mantém:** stack (Vite + React 19 + TS), `HomeV2` como página, scroll-spy existente, tokens e fontes da V2, build/deploy (Express serve `dist/public`).
- **Adiciona:** `components/v2/cockpit/` (CockpitFrame + subcomponentes), primitivos HUD no CSS.
- **Refatora:** cada `components/v2/chapters/*` para o tratamento HUD; `HomeV2.tsx` para envolver o conteúdo no `CockpitFrame` (substituindo TopBar/NavRail/BottomBar avulsos).
- **CSS:** estende `styles/v2.css` (ou adiciona `styles/cockpit.css` importado por `HomeV2`) com os primitivos e as regras dos módulos. Sem `tailwind.config` (Tailwind v4 via plugin).
- **Verificação:** `tsc --noEmit` + `npm run build` limpos; inspeção visual desktop/mobile via navegador; console sem erros.

## Fora de escopo

- **Item 5** — backend/destino do formulário de contato (decidir antes do deploy VPS).
- **Vulnerabilidades** reportadas por `npm audit` (pré-existentes) — revisar em separado.
- Mudança de copy/conteúdo dos textos (mantém `i18n-v2.ts`).

## Critérios de sucesso

1. Identidade visual claramente **HUD nórdico-futurista** e coesa nos 7 módulos.
2. Casca de cockpit persistente funcionando (telemetria, trilha ativa via scroll-spy, índice de módulo).
3. Movimento rico no desktop, **degradando corretamente** com `prefers-reduced-motion` e no mobile.
4. Sem regressão de build/type-check; responsivo; console limpo.
5. Mantém a base V2 e o caminho de deploy intactos.
