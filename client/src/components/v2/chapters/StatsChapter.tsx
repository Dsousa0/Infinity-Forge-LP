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
