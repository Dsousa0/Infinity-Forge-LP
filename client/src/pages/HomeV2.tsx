// client/src/pages/HomeV2.tsx
import { useState, useEffect } from 'react';
import '@/styles/v2.css';
import TopBar from '@/components/v2/TopBar';
import NavRail from '@/components/v2/NavRail';
import BottomBar from '@/components/v2/BottomBar';
import HeroChapter from '@/components/v2/chapters/HeroChapter';
import ServicesChapter from '@/components/v2/chapters/ServicesChapter';
import ProcessChapter from '@/components/v2/chapters/ProcessChapter';
import StackChapter from '@/components/v2/chapters/StackChapter';
import WorkChapter from '@/components/v2/chapters/WorkChapter';
import StatsChapter from '@/components/v2/chapters/StatsChapter';
import ContactChapter from '@/components/v2/chapters/ContactChapter';
import { I18N_PT } from '@/lib/i18n-v2';

const CHAPTERS = [
  { id: 'hero',     label: 'Origem'   },
  { id: 'services', label: 'Serviços' },
  { id: 'process',  label: 'Processo' },
  { id: 'stack',    label: 'Stack'    },
  { id: 'work',     label: 'Cases'    },
  { id: 'numbers',  label: 'Números'  },
  { id: 'contact',  label: 'Contato'  },
] as const;

export default function HomeV2() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const jump = (i: number) => {
    const next = Math.max(0, Math.min(CHAPTERS.length - 1, i));
    const el = document.getElementById('v2-' + CHAPTERS[next].id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    document.body.classList.add('v2');
    return () => document.body.classList.remove('v2');
  }, []);

  useEffect(() => {
    const sections = CHAPTERS.map(c =>
      document.getElementById('v2-' + c.id),
    ).filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      const sc = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (sc / max) * 100 : 0);
      const trigger = sc + window.innerHeight * 0.33;
      let best = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= trigger) best = i;
      }
      setActiveChapter(best);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const t = I18N_PT;

  return (
    <>
      <div className="v2-progress" style={{ width: scrollProgress + '%' }} />
      <TopBar />
      <NavRail chapters={[...CHAPTERS]} activeIdx={activeChapter} onJump={jump} />
      <main className="v2-scroll">
        <section id="v2-hero"     className="v2-section"><HeroChapter     t={t} onJump={jump} /></section>
        <section id="v2-services" className="v2-section"><ServicesChapter t={t} /></section>
        <section id="v2-process"  className="v2-section"><ProcessChapter  t={t} /></section>
        <section id="v2-stack"    className="v2-section"><StackChapter    t={t} /></section>
        <section id="v2-work"     className="v2-section"><WorkChapter     t={t} /></section>
        <section id="v2-numbers"  className="v2-section"><StatsChapter    t={t} /></section>
        <section id="v2-contact"  className="v2-section v2-section-end"><ContactChapter t={t} /></section>
      </main>
      <BottomBar chapters={[...CHAPTERS]} activeIdx={activeChapter} />
    </>
  );
}
