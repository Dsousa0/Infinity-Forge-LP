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

const RUNE_INSTANCES = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  rune: RUNES[index % RUNES.length],
  left: `${(index * 17) % 100}%`,
  delay: `${-(index * 0.75)}s`,
  duration: `${20 + (index % 7) * 4}s`,
  size: `${1 + (index % 4) * 0.2}rem`,
}));

export default function NordicRunesOverlay() {
  return (
    <div aria-hidden="true" className="nordic-runes-overlay">
      {RUNE_INSTANCES.map((item) => (
        <span
          key={item.id}
          className="nordic-rune"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size,
          }}
        >
          {item.rune}
        </span>
      ))}
    </div>
  );
}
