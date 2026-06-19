interface Chapter { id: string; label: string; }
interface BottomBarProps { chapters: Chapter[]; activeIdx: number; }

export default function BottomBar({ chapters, activeIdx }: BottomBarProps) {
  const total = String(chapters.length).padStart(2, '0');
  const idx = String(activeIdx + 1).padStart(2, '0');
  return (
    <footer className="ck-bottombar">
      <div className="idx">MÓDULO <b>{idx}</b> / {total}</div>
      <div className="ck-ticker">
        <span>FORJANDO SISTEMAS DURADOUROS · ARQUITETURA SÓLIDA · ENGENHARIA NÓRDICA · UPTIME 99.98% · DA DESCOBERTA AO DEPLOY · ᚠᛟᚱᚷᛖ ·&nbsp;&nbsp;</span>
      </div>
      <div className="hint">ROLE · NAVEGUE PELO COCKPIT</div>
    </footer>
  );
}
