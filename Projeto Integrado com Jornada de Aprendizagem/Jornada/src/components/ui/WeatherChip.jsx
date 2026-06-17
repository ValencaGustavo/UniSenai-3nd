import { Cloud, CloudRain, Sun, CloudSnow, Wind } from "lucide-react";
import { cn } from "../../lib/utils.js";


const WEATHER = {
  rain: {
    Icon: CloudRain,
    label: "Chuva forte",
    accent: "text-[color:var(--color-warn)]",
    impact: "ATRASO",
  },
  cloudy: {
    Icon: Cloud,
    label: "Nublado",
    accent: "text-zinc-500",
    impact: null,
  },
  sun: {
    Icon: Sun,
    label: "Sol",
    accent: "text-amber-500",
    impact: null,
  },
  wind: {
    Icon: Wind,
    label: "Vento",
    accent: "text-zinc-500",
    impact: null,
  },
  snow: {
    Icon: CloudSnow,
    label: "Geada",
    accent: "text-blue-500",
    impact: "ATENÇÃO",
  },
};

export default function WeatherChip({
  city = "LDB",
  temp = "19°",
  condition = "cloudy",
  className,
}) {
  const w = WEATHER[condition];
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-[5px] border border-zinc-200 bg-white px-2 py-1",
        className
      )}
    >
      <w.Icon size={12} strokeWidth={1.75} className={w.accent} />
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600">
        {city}
      </span>
      <span className="font-mono text-[10px] font-semibold tabular-nums text-zinc-950">
        {temp}
      </span>
      {w.impact && (
        <span className="rounded-[3px] bg-[color:var(--color-warn)]/[0.10] px-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[color:var(--color-warn)]">
          {w.impact}
        </span>
      )}
    </div>
  );
}
