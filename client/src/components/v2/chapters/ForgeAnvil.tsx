// client/src/components/v2/chapters/ForgeAnvil.tsx
// Animação de forja: martelo pendular + bigorna detalhada + faíscas (canvas) + calor.
// Loop contínuo (combo de 3 golpes), pausa quando fora da tela, estática em prefers-reduced-motion.
import { useEffect, useRef } from 'react';

const PIVOT = { x: 347, y: 124 };
// ângulos (graus): maior = martelo erguido; menor = batendo na placa
const ANG = { rest: 58, raise: 74, strike: 35, recoil: 50 };
const POWER = 1;
const SPARKS = 1;
const STRIKES = 3; // combo de 3 golpes por ciclo

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInQuart = (t: number) => t * t * t * t;
const easeOutBack = (t: number) => {
  const c1 = 2.2, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const easeOutElastic = (t: number) => {
  if (t === 0 || t === 1) return t;
  const p = 0.42;
  return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Particle { x: number; y: number; vx: number; vy: number; life: number; decay: number; size: number; color: string; grav: number; }
interface Ring { x: number; y: number; r: number; life: number; w: number; delay: number; }
interface Seg { t: string; dur: number; }

export default function ForgeAnvil() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hammerRef = useRef<SVGGElement>(null);
  const anvilRef = useRef<SVGGElement>(null);
  const plateRef = useRef<SVGRectElement>(null);
  const runesRef = useRef<SVGTextElement>(null);
  const heatRef = useRef<SVGEllipseElement>(null);
  const floorRef = useRef<SVGEllipseElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const hammer = hammerRef.current;
    const anvil = anvilRef.current;
    const plate = plateRef.current;
    const runes = runesRef.current;
    const heat = heatRef.current;
    const floorGlow = floorRef.current;
    const stage = stageRef.current;
    if (!hammer || !anvil || !plate || !runes || !heat || !floorGlow || !stage) return;

    const setHammer = (angle: number) =>
      hammer.setAttribute('transform', `translate(${PIVOT.x}, ${PIVOT.y}) rotate(${angle})`);
    const setAnvil = (dx: number, dy: number, sx = 1, sy = 1) =>
      anvil.setAttribute('transform', `translate(${dx}, ${dy}) translate(270 460) scale(${sx} ${sy}) translate(-270 -460)`);

    setHammer(ANG.rest);

    // Acessibilidade: pose estática, sem loop nem faíscas.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let particles: Particle[] = [];
    let rings: Ring[] = [];

    function spawnImpact(power: number) {
      const ix = 272 * 2;
      const iy = 312 * 2;
      const n = Math.round((22 + Math.random() * 10) * SPARKS * power);
      for (let i = 0; i < n; i++) {
        const ang = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.15;
        const spd = (3 + Math.random() * 9) * power;
        const hot = Math.random();
        particles.push({
          x: ix + (Math.random() - 0.5) * 36, y: iy,
          vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd - 2,
          life: 1, decay: 0.012 + Math.random() * 0.03,
          size: 1.4 + Math.random() * 2.6,
          color: hot > 0.55 ? '255,243,214' : hot > 0.25 ? '255,178,77' : '232,96,42',
          grav: 0.22 + Math.random() * 0.12,
        });
      }
      for (let i = 0; i < 6 * SPARKS; i++) {
        particles.push({
          x: ix + (Math.random() - 0.5) * 60, y: iy - Math.random() * 10,
          vx: (Math.random() - 0.5) * 2.2, vy: -1 - Math.random() * 2.5,
          life: 1, decay: 0.006 + Math.random() * 0.008,
          size: 1 + Math.random() * 1.6, color: '255,200,120', grav: -0.02,
        });
      }
      rings.push({ x: ix, y: iy, r: 6, life: 1, w: 5 * power, delay: 0 });
      rings.push({ x: ix, y: iy, r: 2, life: 1, w: 3 * power, delay: 60 });
    }

    function renderFX() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const r of rings) {
        if (r.delay > 0) continue;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(240,212,154,${r.life * 0.5})`;
        ctx.lineWidth = r.w * r.life;
        ctx.ellipse(r.x, r.y, r.r, r.r * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${p.life})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${p.color},${p.life})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = 'source-over';
    }

    function stepFX(dt: number) {
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.vy += p.grav; p.vx *= 0.99;
        p.life -= p.decay;
      }
      particles = particles.filter((p) => p.life > 0);
      for (const r of rings) {
        if (r.delay > 0) { r.delay -= dt; continue; }
        r.r += 6; r.life -= 0.04;
      }
      rings = rings.filter((r) => r.life > 0);
      renderFX();
    }

    function buildCycle(): Seg[] {
      const seq: Seg[] = [{ t: 'idle', dur: 520 }];
      for (let s = 0; s < STRIKES; s++) {
        const last = s === STRIKES - 1;
        seq.push({ t: 'raise', dur: 300 });
        seq.push({ t: 'hold', dur: 90 });
        seq.push({ t: 'strike', dur: 130 });
        seq.push({ t: 'impact', dur: 90 });
        seq.push({ t: 'recoil', dur: 150 });
        if (!last) seq.push({ t: 'between', dur: 120 });
      }
      seq.push({ t: 'settle', dur: 520 });
      seq.push({ t: 'rest', dur: 700 });
      return seq;
    }

    let cycle = buildCycle();
    let segI = 0;
    let segT = 0;
    let curAngle = ANG.rest;
    let prevAngle = ANG.rest;
    let impactFired = false;
    let heatOp = 0;
    let lastTime = performance.now();
    let rafId = 0;
    let running = false;

    const nextSeg = () => {
      prevAngle = curAngle;
      segI++;
      if (segI >= cycle.length) { segI = 0; cycle = buildCycle(); }
      segT = 0;
      impactFired = false;
    };

    const frame = (now: number) => {
      let dt = now - lastTime;
      lastTime = now;
      if (dt > 60) dt = 60;
      segT += dt;

      const seg = cycle[segI];
      const p = Math.min(1, segT / seg.dur);

      switch (seg.t) {
        case 'idle':
        case 'rest': {
          curAngle = ANG.rest + Math.sin(now / 600) * 1.5;
          setHammer(curAngle); setAnvil(0, 0); break;
        }
        case 'raise': { curAngle = lerp(prevAngle, ANG.raise, easeOutCubic(p)); setHammer(curAngle); break; }
        case 'hold': { curAngle = ANG.raise + Math.sin(p * Math.PI) * -1.5; setHammer(curAngle); break; }
        case 'strike': { curAngle = lerp(ANG.raise, ANG.strike, easeInQuart(p)); setHammer(curAngle); break; }
        case 'impact': {
          if (!impactFired) { impactFired = true; spawnImpact(POWER); heatOp = Math.min(1, 0.85 * POWER); }
          curAngle = ANG.strike + Math.sin(p * Math.PI * 3) * 0.8;
          setHammer(curAngle);
          const dip = 1 - p;
          const shake = (1 - p) * 4 * POWER;
          setAnvil((Math.random() - 0.5) * shake, dip * 3 * POWER, 1 + dip * 0.02 * POWER, 1 - dip * 0.03 * POWER);
          break;
        }
        case 'recoil': {
          curAngle = lerp(ANG.strike, ANG.recoil, easeOutBack(p)); setHammer(curAngle);
          const e = 1 - easeOutElastic(p); setAnvil(0, e * 1.2, 1, 1 - e * 0.012); break;
        }
        case 'between': { curAngle = lerp(ANG.recoil, ANG.raise * 0.6, easeOutCubic(p)); setHammer(curAngle); setAnvil(0, 0); break; }
        case 'settle': { curAngle = lerp(prevAngle, ANG.rest, easeOutCubic(p)); setHammer(curAngle); setAnvil(0, 0); break; }
      }

      if (heatOp > 0) {
        heatOp = Math.max(0, heatOp - dt * 0.0016);
        heat.setAttribute('opacity', String(heatOp));
        plate.setAttribute('fill', heatOp > 0.25 ? 'url(#gHeat)' : 'url(#gPlate)');
        floorGlow.setAttribute('opacity', String(0.7 + heatOp * 0.6));
        runes.setAttribute('opacity', String(0.85 + heatOp * 0.15));
        runes.setAttribute('fill', heatOp > 0.3 ? '#3a1c0e' : '#16282f');
      }

      stepFX(dt);
      if (p >= 1) nextSeg();
      rafId = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver((entries) => {
      const vis = entries[0].isIntersecting;
      if (vis && !running) {
        running = true; lastTime = performance.now(); rafId = requestAnimationFrame(frame);
      } else if (!vis && running) {
        running = false; cancelAnimationFrame(rafId);
      }
    }, { threshold: 0.05 });
    io.observe(stage);

    return () => { cancelAnimationFrame(rafId); io.disconnect(); };
  }, []);

  return (
    <div className="forge-stage" ref={stageRef}>
      <svg className="forge-svg" viewBox="0 0 540 540" aria-hidden="true">
        <defs>
          <linearGradient id="gSteel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9bb8c4" /><stop offset="0.45" stopColor="#5d7d8c" /><stop offset="1" stopColor="#34525f" />
          </linearGradient>
          <linearGradient id="gHandle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a565f" /><stop offset="1" stopColor="#21363f" />
          </linearGradient>
          <linearGradient id="gAnvil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a6b78" /><stop offset="0.5" stopColor="#34525f" /><stop offset="1" stopColor="#1c2f37" />
          </linearGradient>
          <linearGradient id="gPlate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0d49a" /><stop offset="1" stopColor="#c9a55f" />
          </linearGradient>
          <radialGradient id="gGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#e8915a" stopOpacity="0.55" /><stop offset="0.5" stopColor="#d2aa68" stopOpacity="0.22" /><stop offset="1" stopColor="#d2aa68" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gHeat" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fff3d6" /><stop offset="0.35" stopColor="#ffb24d" /><stop offset="0.7" stopColor="#e8602a" stopOpacity="0.7" /><stop offset="1" stopColor="#e8602a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse ref={floorRef} cx="270" cy="430" rx="170" ry="46" fill="url(#gGlow)" />

        <g ref={anvilRef}>
          <path d="M205 470 L335 470 L322 432 L218 432 Z" fill="url(#gAnvil)" />
          <rect x="226" y="392" width="88" height="44" rx="4" fill="#2a444e" />
          <path d="M214 392 L326 392 L334 350 L206 350 Z" fill="url(#gAnvil)" />
          <rect x="196" y="320" width="148" height="34" rx="6" fill="url(#gAnvil)" />
          <path d="M196 326 C168 326 150 332 140 340 C150 344 168 346 196 346 Z" fill="url(#gAnvil)" />
          <path d="M344 322 L372 330 L372 344 L344 350 Z" fill="#2a444e" />
          <rect ref={plateRef} x="198" y="312" width="144" height="14" rx="3" fill="url(#gPlate)" />
          <text ref={runesRef} x="270" y="378" textAnchor="middle" fontFamily="'Noto Sans Runic', 'IBM Plex Mono', monospace" fontSize="22" fontWeight="700" letterSpacing="6" fill="#16282f" opacity="0.85">ᚠᛟᚱᚷᛗ</text>
          <ellipse ref={heatRef} cx="270" cy="312" rx="42" ry="9" fill="url(#gHeat)" opacity="0" />
        </g>

        <g ref={hammerRef} transform={`translate(${PIVOT.x}, ${PIVOT.y}) rotate(${ANG.rest})`}>
          <rect x="-9" y="0" width="18" height="156" rx="9" fill="url(#gHandle)" />
          <rect x="-9" y="0" width="6" height="156" rx="3" fill="#46636d" opacity="0.6" />
          <rect x="-11" y="4" width="22" height="40" rx="7" fill="#1c2d34" opacity="0.7" />
          <rect x="-16" y="146" width="32" height="16" rx="4" fill="#2f4854" />
          <g>
            <rect x="-46" y="158" width="92" height="42" rx="7" fill="url(#gSteel)" />
            <rect x="-46" y="158" width="92" height="10" rx="5" fill="#a8c4d0" opacity="0.7" />
            <rect x="-46" y="192" width="92" height="8" rx="4" fill="#1f343c" opacity="0.85" />
            <path d="M46 162 L64 174 L64 186 L46 196 Z" fill="url(#gSteel)" />
          </g>
        </g>
      </svg>
      <canvas className="forge-fx" ref={canvasRef} width={1080} height={1080} />
    </div>
  );
}
