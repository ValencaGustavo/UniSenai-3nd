import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Sparkline from "./Sparkline.jsx";
import { financialCards } from "../../data/mockData.js";
import { cn } from "../../lib/utils.js";

export default function FinancialCards() {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {financialCards.map((c) => {
        const isUp = c.trend === "up";
        const Arrow = isUp ? ArrowUpRight : ArrowDownRight;
        const deltaColor = isUp
          ? "text-emerald-700 bg-emerald-50 ring-emerald-600/15"
          : "text-red-700 bg-red-50 ring-red-600/15";
        return (
          <article key={c.id} className="panel-enter surface relative overflow-hidden">
            
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-50">
              <Sparkline data={c.spark} color={c.color} height={64} />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/70 to-transparent"
            />

            <div className="relative p-4">
              <div className="flex items-center justify-between">
                <p className="eyebrow">{c.label}</p>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-[4px] px-1.5 py-0.5 font-mono text-[10px] font-semibold ring-1 ring-inset tabular-nums",
                    deltaColor
                  )}
                >
                  <Arrow size={9} strokeWidth={2} />
                  {c.delta}
                </span>
              </div>
              <p className="mt-2 text-[26px] font-semibold tracking-tight leading-none text-zinc-950 tabular-nums">
                {c.value}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                7 períodos · vs. anterior
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
