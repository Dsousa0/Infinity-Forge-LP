// client/src/components/v2/NavRail.tsx

interface Chapter {
  id: string;
  label: string;
}

interface NavRailProps {
  chapters: Chapter[];
  activeIdx: number;
  onJump: (i: number) => void;
}

export default function NavRail({ chapters, activeIdx, onJump }: NavRailProps) {
  return (
    <nav className="v2-nav">
      {chapters.map((c, i) => (
        <button
          key={c.id}
          className={`v2-nav-dot${activeIdx === i ? ' active' : ''}`}
          onClick={() => onJump(i)}
        >
          <span>{c.label}</span>
          <span className="v2-nav-num">0{i + 1}</span>
        </button>
      ))}
    </nav>
  );
}
