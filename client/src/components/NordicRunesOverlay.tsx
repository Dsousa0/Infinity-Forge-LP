import type { CSSProperties } from "react";
import { useMemo } from "react";

const RUNES = [
  "ᚠ",
  "ᚢ",
  "ᚦ",
  "ᚨ",
  "ᚱ",
  "ᚲ",
  "ᚷ",
  "ᚹ",
  "ᚺ",
  "ᚾ",
  "ᛁ",
  "ᛃ",
  "ᛇ",
  "ᛈ",
  "ᛉ",
  "ᛋ",
  "ᛏ",
  "ᛒ",
  "ᛖ",
  "ᛗ",
  "ᛚ",
  "ᛜ",
  "ᛟ",
  "ᛞ",
  "ᚪ",
  "ᚫ",
  "ᛠ",
  "ᚣ",
];

const RUNE_COUNT = 90;

export default function NordicRunesOverlay() {
  const runeInstances = useMemo(
    () =>
      Array.from({ length: RUNE_COUNT }, (_, index) => {
        const horizontalDrift = (Math.random() * 14 - 7).toFixed(1);

        return {
          id: index,
          rune: RUNES[Math.floor(Math.random() * RUNES.length)],
          left: `${(Math.random() * 100).toFixed(2)}%`,
          delay: `${-(Math.random() * 28).toFixed(2)}s`,
          duration: `${(14 + Math.random() * 20).toFixed(2)}s`,
          size: `${(0.9 + Math.random() * 0.9).toFixed(2)}rem`,
          opacity: 0.18 + Math.random() * 0.28,
          drift: `${horizontalDrift}vw`,
        };
      }),
    [],
  );

  return (
    <div aria-hidden="true" className="nordic-runes-overlay">
      {runeInstances.map((item) => {
        const style: CSSProperties & Record<"--rune-drift-x", string> = {
          left: item.left,
          animationDelay: item.delay,
          animationDuration: item.duration,
          fontSize: item.size,
          opacity: item.opacity,
          "--rune-drift-x": item.drift,
        };

        return (
          <span key={item.id} className="nordic-rune" style={style}>
            {item.rune}
          </span>
        );
      })}
    </div>
  );
}
