import { useMemo } from "react";

interface RuneFieldProps {
  count?: number;
  seed?: string;
  className?: string;
}

export default function RuneField({ count = 24, seed = "default", className = "" }: RuneFieldProps) {
  const floatingRunes = useMemo(() => {
    const runes = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛋ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛟ"];
    const seedBase = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seededValue = (index: number, seedOffset: number) => {
      const x = Math.sin((index + 1 + seedBase) * 12.9898 + seedOffset * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    return Array.from({ length: count }, (_, index) => ({
      id: `${seed}-rune-${index}`,
      glyph: runes[Math.floor(seededValue(index, 1) * runes.length)],
      top: `${seededValue(index, 2) * 100}%`,
      left: `${seededValue(index, 3) * 100}%`,
      size: `${0.85 + seededValue(index, 4) * 1.1}rem`,
      opacity: 0.12 + seededValue(index, 5) * 0.22,
      duration: `${11 + seededValue(index, 6) * 8}s`,
      delay: `${seededValue(index, 7) * 5}s`,
    }));
  }, [count, seed]);

  return (
    <div className={`rune-field absolute inset-0 z-0 ${className}`.trim()} aria-hidden="true">
      {floatingRunes.map((rune) => (
        <span
          key={rune.id}
          className="floating-rune"
          style={{
            top: rune.top,
            left: rune.left,
            fontSize: rune.size,
            opacity: rune.opacity,
            animationDuration: rune.duration,
            animationDelay: rune.delay,
          }}
        >
          {rune.glyph}
        </span>
      ))}
    </div>
  );
}