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
  const [expanded, setExpanded] = useState(-1);

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
