// client/src/components/v2/chapters/StackChapter.tsx
import type { I18nContent } from '@/lib/i18n-v2';

const RADII = [100, 170, 240] as const;
const RING_COLORS = ['#c98a4b', '#7fb6c4', '#d6e1e8', '#9bb5a8', '#b07a3a'];

interface StackChapterProps {
  t: I18nContent;
}

export default function StackChapter({ t }: StackChapterProps) {
  const allTech = t.stack.groups.flatMap((g, gi) =>
    g.items.map(item => ({ name: item, group: g.label, ring: gi % 3 })),
  );

  return (
    <div className="v2-chapter">
      <div className="v2-stack">
        <div>
          <div className="sec-eyebrow">{t.stack.eyebrow}</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
            {t.stack.title}
          </h2>
          <p className="sec-sub">{t.stack.sub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginTop: 24 }}>
            {t.stack.groups.map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: 2,
                  background: RING_COLORS[i],
                  boxShadow: `0 0 8px ${RING_COLORS[i]}`,
                  flexShrink: 0,
                }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--frost)', textTransform: 'uppercase' }}>
                  {g.label}{' '}
                  <span style={{ color: 'rgba(214,225,232,.4)' }}>· {g.items.length}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="v2-stack-orbit">
          <div className="v2-orbit-ring o1" />
          <div className="v2-orbit-ring o2" />
          <div className="v2-orbit-ring o3" />
          <div className="v2-orbit-center">
            <img src="/logo.png" alt="" />
          </div>
          {allTech.map((tech, i) => {
            const ringIdx = tech.ring as 0 | 1 | 2;
            const sameRingCount = allTech.slice(0, i + 1).filter(x => x.ring === ringIdx).length - 1;
            const totalInRing = allTech.filter(x => x.ring === ringIdx).length;
            const angle = (sameRingCount / totalInRing) * Math.PI * 2 - Math.PI / 2 + ringIdx * 0.4;
            const r = RADII[ringIdx];
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            return (
              <div key={i} className="v2-tech-pill" style={{ marginLeft: x, marginTop: y }}>
                {tech.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
