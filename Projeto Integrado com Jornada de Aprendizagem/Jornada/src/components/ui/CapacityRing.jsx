import { semanticColor } from "../../lib/semantic.js";


export default function CapacityRing({
  value = 0,
  size = 36,
  stroke = 3,
  scale = "good-low",
  label,
}) {
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - value / 100);
  const color = semanticColor(value, scale);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#e4e4e7"
          strokeWidth={stroke}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 600ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span
          className="font-mono text-[10px] font-semibold tabular-nums"
          style={{ color }}
        >
          {value}
        </span>
        {label && (
          <span className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.12em] text-zinc-400">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
