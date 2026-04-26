// client/src/components/v2/chapters/WorkChapter.tsx
import type { I18nContent } from '@/lib/i18n-v2';

interface WorkChapterProps {
  t: I18nContent;
}

export default function WorkChapter({ t }: WorkChapterProps) {
  return (
    <div className="v2-chapter">
      <div className="v2-work">
        <div style={{ maxWidth: 680, marginBottom: 8 }}>
          <div className="sec-eyebrow">{t.work.eyebrow}</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
            {t.work.title}
          </h2>
          <p className="sec-sub" style={{ marginBottom: 0 }}>{t.work.sub}</p>
        </div>
        <div className="v2-work-grid">
          {t.work.items.map((c, i) => (
            <div key={i} className="v2-case">
              <div className="v2-case-tag">{c.tag}</div>
              <h3 className="v2-case-title">{c.title}</h3>
              <p className="v2-case-desc">{c.desc}</p>
              <div className="v2-case-stats">
                <div className="v2-case-stat-num">{c.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
