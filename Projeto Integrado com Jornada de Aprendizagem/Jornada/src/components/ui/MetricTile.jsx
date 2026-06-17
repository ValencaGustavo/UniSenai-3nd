import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import Sparkline from "../reports/Sparkline.jsx";
import { cn } from "../../lib/utils.js";

const TONE = {
  brand: {
    icon: "text-[color:var(--color-brand)]",
    rail: "from-[color:var(--color-brand)]/24",
    spark: "#1f4f8f",
  },
  good: {
    icon: "text-[color:var(--color-good)]",
    rail: "from-[color:var(--color-good)]/22",
    spark: "#16a34a",
  },
  warn: {
    icon: "text-[color:var(--color-warn)]",
    rail: "from-[color:var(--color-warn)]/24",
    spark: "#ea7c2c",
  },
  hazard: {
    icon: "text-[color:var(--color-hazard)]",
    rail: "from-[color:var(--color-hazard)]/22",
    spark: "#d7282f",
  },
  ink: {
    icon: "text-zinc-950",
    rail: "from-zinc-900/16",
    spark: "#0a0a0a",
  },
};

export default function MetricTile({
  label,
  value,
  suffix,
  delta,
  trend = "flat",
  deltaTone,
  icon: Icon,
  tone = "brand",
  spark,
  meta,
  description,
  className,
}) {
  const t = TONE[tone] ?? TONE.brand;
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : ArrowRight;
  const resolvedDeltaTone = deltaTone ?? (trend === "flat" ? "neutral" : "good");
  const trendClass = {
    good: "text-[color:var(--color-good)] border-[color:var(--color-good)]/30 bg-[color:var(--color-good)]/10",
    warn: "text-[color:var(--color-warn)] border-[color:var(--color-warn)]/30 bg-[color:var(--color-warn)]/10",
    crit: "text-[color:var(--color-crit)] border-[color:var(--color-crit)]/30 bg-[color:var(--color-crit)]/10",
    neutral: "text-zinc-500 border-zinc-200 bg-zinc-50",
  }[resolvedDeltaTone];

  return (
    <article className={cn("metric-tile premium-panel group relative min-h-[104px] overflow-hidden p-3", className)}>
      <div className="absolute inset-y-0 left-0 w-[3px]" style={{ backgroundColor: t.spark }} />
      {spark && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 opacity-60">
          <Sparkline data={spark} color={t.spark} height={48} />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white/90 to-transparent" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            {label}
          </p>
          {description && (
            <p className="mt-1 max-w-[220px] text-[11px] font-medium leading-snug text-zinc-500">
              {description}
            </p>
          )}
          <p className="mt-1.5 font-display-cond text-[30px] leading-none tabular-nums text-zinc-950">
            {value}
            {suffix && <span className="ml-1 text-[15px] text-zinc-500">{suffix}</span>}
          </p>
        </div>
        {Icon && (
          <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-[4px] border border-zinc-200 bg-zinc-50", t.icon)}>
            <Icon size={14} strokeWidth={1.9} />
          </span>
        )}
      </div>
      <div className="relative mt-2 flex flex-wrap items-center justify-between gap-2">
        {delta && (
          <span className={cn("inline-flex items-center gap-1 rounded-[3px] border px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums", trendClass)}>
            <TrendIcon size={10} strokeWidth={2.2} />
            {delta}
          </span>
        )}
        {meta && (
          <span className="max-w-[150px] text-right font-mono text-[9px] uppercase tracking-[0.10em] text-zinc-400">
            {meta}
          </span>
        )}
      </div>
    </article>
  );
}
