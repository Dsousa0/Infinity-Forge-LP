interface Chapter { id: string; label: string; }
interface NavRailProps { chapters: Chapter[]; activeIdx: number; onJump: (i: number) => void; }

export default function NavRail({ chapters, activeIdx, onJump }: NavRailProps) {
  return (
    <nav className="ck-rail" aria-label="Módulos">
      {chapters.map((c, i) => (
        <button key={c.id} className={i === activeIdx ? 'on' : ''} onClick={() => onJump(i)}>
          <span className="tick" />{c.label}
        </button>
      ))}
    </nav>
  );
}
