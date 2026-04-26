// client/src/components/v2/chapters/HeroChapter.tsx
import { useState, useEffect, useRef } from 'react';
import type { I18nContent } from '@/lib/i18n-v2';

const RUNES = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ','ᚾ','ᛁ','ᛃ'];
const RADIUS = 240;

interface HeroChapterProps {
  t: I18nContent;
  onJump: (i: number) => void;
}

export default function HeroChapter({ t, onJump }: HeroChapterProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sigilRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [hotRune, setHotRune] = useState(-1);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if (sigilRef.current) {
        sigilRef.current.style.transform =
          `rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(0)`;
      }
      if (leftRef.current) {
        leftRef.current.style.transform =
          `translate3d(${x * -8}px, ${y * -6}px, 0)`;
      }
    };
    const node = wrapRef.current;
    node?.addEventListener('mousemove', onMove);
    return () => node?.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setHotRune(Math.floor(Math.random() * RUNES.length)),
      1400,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="v2-chapter" ref={wrapRef}>
      <div className="v2-grid-bg" />
      <div className="v2-hero">
        <div className="v2-hero-left" ref={leftRef}>
          <div className="v2-hero-eyebrow">{t.hero.eyebrow}</div>
          <h1 className="v2-hero-title">
            {t.hero.title1}
            <br />
            <em>{t.hero.title2}</em>
          </h1>
          <p className="v2-hero-sub">{t.hero.sub}</p>
          <div className="v2-hero-ctas">
            <button className="v2-cta v2-cta-primary" onClick={() => onJump(6)}>
              {t.cta.primary}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="v2-cta v2-cta-ghost" onClick={() => onJump(2)}>
              Ver processo
            </button>
          </div>
        </div>

        <div className="v2-hero-right">
          <div className="v2-sigil" ref={sigilRef}>
            <div className="v2-sigil-pulse" />
            <div className="v2-sigil-ring r1" />
            <div className="v2-sigil-ring r2" />
            <div className="v2-sigil-ring r3" />
            {RUNES.map((r, i) => {
              const angle = (i / RUNES.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * RADIUS;
              const y = Math.sin(angle) * RADIUS;
              return (
                <div
                  key={i}
                  className={`v2-sigil-rune${hotRune === i ? ' hot' : ''}`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  {r}
                </div>
              );
            })}
            <div className="v2-sigil-core">
              <img src="/logo.png" alt="Infinity Forge" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
