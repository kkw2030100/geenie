'use client';

interface NeoProgressProps {
  value: number;
  max?: number;
  color?: string;
  label?: string;
}

const colorMap: Record<string, string> = {
  'bg-neo-cyan': '#2ECC71',
  'bg-neo-yellow': '#C9A96E',
  'bg-neo-red': '#E74C3C',
  'bg-neo-pink': '#C9A96E',
  'bg-neo-purple': '#A855F7',
  'bg-neo-blue': '#5DADE2',
};

export default function NeoProgress({ value, max = 100, color = 'bg-neo-cyan', label }: NeoProgressProps) {
  const percent = Math.min((value / max) * 100, 100);
  const fillColor = colorMap[color] || '#C9A96E';

  return (
    <div className="w-full">
      {label && <span className="text-xs font-semibold uppercase mb-1 block tracking-wider" style={{ color: '#B0B0B0' }}>{label}</span>}
      <div className="lux-progress-track">
        <div
          className="lux-progress-fill"
          style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${fillColor}, ${fillColor}dd)` }}
        />
      </div>
    </div>
  );
}
