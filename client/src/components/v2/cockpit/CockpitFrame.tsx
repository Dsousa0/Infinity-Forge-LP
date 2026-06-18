// client/src/components/v2/cockpit/CockpitFrame.tsx
import type { ReactNode } from 'react';
import TopBar from '@/components/v2/TopBar';
import NavRail from '@/components/v2/NavRail';
import BottomBar from '@/components/v2/BottomBar';

interface Chapter { id: string; label: string; }
interface CockpitFrameProps {
  chapters: Chapter[];
  activeIdx: number;
  scrollProgress: number;
  onJump: (i: number) => void;
  children: ReactNode;
}

export default function CockpitFrame({ chapters, activeIdx, scrollProgress, onJump, children }: CockpitFrameProps) {
  return (
    <>
      <div className="ck-frame" aria-hidden="true">
        <span className="ck-bracket tl" /><span className="ck-bracket tr" />
        <span className="ck-bracket bl" /><span className="ck-bracket br" />
      </div>
      <div className="ck-scanline" aria-hidden="true" />
      <TopBar />
      <NavRail chapters={chapters} activeIdx={activeIdx} onJump={onJump} />
      {children}
      <BottomBar chapters={chapters} activeIdx={activeIdx} />
    </>
  );
}
