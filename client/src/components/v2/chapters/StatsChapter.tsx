// client/src/components/v2/chapters/StatsChapter.tsx
import { useRef, useEffect } from 'react';
import type { I18nContent } from '@/lib/i18n-v2';

interface StatsChapterProps {
  t: I18nContent;
}

// Count-up telemetry data mapped from the 4 static values: 120+, 8, 99.98%, 24H
const STAT_TELEMETRY = [
  { to: '120', suf: '+' },
  { to: '8',   suf: ''  },
  { to: '99.98', suf: '%' },
  { to: '24',  suf: 'H' },
] as const;

export default function StatsChapter({ t }: StatsChapterProps) {
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

  return (
    <div className="v2-chapter">
      <div style={{ width: '100%', maxWidth: 1400 }}>
        <div style={{ maxWidth: 680, marginBottom: 56 }}>
          <div className="mod-tag">Módulo 06 · Números</div>
          <div className="sec-eyebrow">{t.stats.eyebrow}</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}>
            {t.stats.title}
          </h2>
          <p className="sec-sub">{t.stats.sub}</p>
        </div>
        <div className="v2-stats" ref={rootRef}>
          {t.stats.items.map((s, i) => (
            <div key={i} className="v2-stat-cell hud-panel accent">
              <div className="v2-stat-rune">{s.rune}</div>
              <div className="v2-stat-num">
                <span data-to={STAT_TELEMETRY[i].to} data-suf={STAT_TELEMETRY[i].suf}>0</span>
              </div>
              <div className="v2-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
