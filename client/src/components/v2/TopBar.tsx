// client/src/components/v2/TopBar.tsx
import { useState, useEffect } from 'react';

export default function TopBar() {
  const [clock, setClock] = useState('--:--:--');
  useEffect(() => {
    const tick = () => setClock(new Date().toTimeString().slice(0, 8));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <header className="ck-topbar">
      <div className="brand">
        <img src="/logo.png" alt="Infinity Forge" />
        <span>INFINITY FORGE</span>
      </div>
      <div className="ck-tele">
        <span><b>◇</b> SYS.ONLINE</span>
        <span>FORGE.v2</span>
        <span>LAT 64°N</span>
        <span>{clock}</span>
      </div>
    </header>
  );
}
