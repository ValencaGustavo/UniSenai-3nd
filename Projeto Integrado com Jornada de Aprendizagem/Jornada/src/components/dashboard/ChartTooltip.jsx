import { formatBRL, formatNumber } from "../../lib/utils.js";

export default function ChartTooltip({
  active,
  payload,
  label,
  currency = false,
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-[180px] rounded-[6px] border border-zinc-200/80 bg-white p-2.5 shadow-[0_8px_20px_-4px_rgb(10_10_10_/_0.10),_0_2px_4px_-2px_rgb(10_10_10_/_0.05)]">
      <p className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
        {label}
      </p>
      <ul className="space-y-1">
        {payload.map((entry) => (
          <li
            key={entry.dataKey}
            className="flex items-center justify-between gap-4 text-[11px]"
          >
            <span className="flex items-center gap-1.5 text-zinc-600">
              <span
                className="h-2 w-2"
                style={{ background: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-mono font-semibold tabular-nums text-zinc-950">
              {currency ? formatBRL(entry.value * 1000) : formatNumber(entry.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
