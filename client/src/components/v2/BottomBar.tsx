// client/src/components/v2/BottomBar.tsx

interface Chapter {
  id: string;
  label: string;
}

interface BottomBarProps {
  chapters: Chapter[];
  activeIdx: number;
}

export default function BottomBar({ chapters, activeIdx }: BottomBarProps) {
  const total = chapters.length;
  const current = chapters[activeIdx];

  return (
    <div className="v2-bottombar">
      <div className="v2-chapter-info">
        <div className="v2-chapter-eyebrow">Capítulo</div>
        <div className="v2-chapter-counter">
          {String(activeIdx + 1).padStart(2, '0')}
          <span>/</span>
          {String(total).padStart(2, '0')}
          <span>·</span>
          {current?.label}
        </div>
      </div>
      <div className="v2-hint">
        <span>role · clique nos pontos</span>
      </div>
    </div>
  );
}
