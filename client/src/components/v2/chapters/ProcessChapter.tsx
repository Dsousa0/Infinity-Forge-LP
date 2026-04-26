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
