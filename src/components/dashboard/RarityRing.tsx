interface RarityRingProps {
  value: number;
  size?: number;
}

const RarityRing = ({ value, size = 56 }: RarityRingProps) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const getColor = () => {
    if (value >= 80) return "hsl(var(--orange-neon))";
    if (value >= 60) return "hsl(var(--warning))";
    return "hsl(var(--cyan-glow))";
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={getColor()} strokeWidth="3"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{ filter: value >= 80 ? `drop-shadow(0 0 6px ${getColor()})` : undefined }}
        />
      </svg>
      <span className="absolute font-mono text-sm font-bold" style={{ color: getColor() }}>{value}</span>
    </div>
  );
};

export default RarityRing;
