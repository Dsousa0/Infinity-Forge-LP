// client/src/components/v2/chapters/ProcessChapter.tsx
import { useState } from 'react';
import type { I18nContent } from '@/lib/i18n-v2';
import ForgeAnvil from './ForgeAnvil';

interface ProcessChapterProps {
  t: I18nContent;
}

export default function ProcessChapter({ t }: ProcessChapterProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="v2-chapter">
      <div className="v2-process">
        <div className="v2-process-anvil">
          <ForgeAnvil />
        </div>

        <div className="v2-process-stages">
          <div className="mod-tag">Módulo 03 · Processo</div>
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
