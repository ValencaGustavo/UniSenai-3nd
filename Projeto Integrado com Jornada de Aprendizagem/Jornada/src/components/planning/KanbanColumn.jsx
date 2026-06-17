import { Plus, MoreHorizontal } from "lucide-react";
import VehicleCard from "./VehicleCard.jsx";
import { cn } from "../../lib/utils.js";

const VARIANT_STYLES = {
  amber: {
    dot: "bg-amber-500",
    text: "text-amber-800",
    badge: "bg-amber-50 ring-amber-600/15",
    bar: "from-amber-400 to-amber-500",
  },
  blue: {
    dot: "bg-blue-500",
    text: "text-blue-700",
    badge: "bg-blue-50 ring-blue-600/15",
    bar: "from-blue-500 to-blue-600",
  },
  green: {
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    badge: "bg-emerald-50 ring-emerald-600/15",
    bar: "from-emerald-400 to-emerald-500",
  },
  red: {
    dot: "bg-red-500",
    text: "text-red-700",
    badge: "bg-red-50 ring-red-600/15",
    bar: "from-red-400 to-red-500",
  },
};

export default function KanbanColumn({ column }) {
  const styles = VARIANT_STYLES[column.variant];
  const avgOcc =
    column.cards.length > 0
      ? Math.round(
          column.cards.reduce((s, c) => s + c.ocupacao, 0) / column.cards.length
        )
      : 0;

  return (
    <div className="premium-panel panel-enter flex w-72 shrink-0 flex-col overflow-hidden rounded-[8px]">
      
      <div className="overflow-hidden rounded-t-[8px]">
        <div className={cn("h-0.5 w-full bg-gradient-to-r", styles.bar)} />
      </div>
      <header className="flex items-center justify-between border-b border-hairline bg-white/88 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
          <h3 className="text-[12px] font-semibold tracking-tight text-zinc-950">
            {column.title}
          </h3>
          <span
            className={cn(
              "rounded-[4px] px-1.5 py-0 font-mono text-[10px] font-semibold tabular-nums ring-1 ring-inset",
              styles.badge,
              styles.text
            )}
          >
            {column.cards.length}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="Mais"
          >
            <MoreHorizontal size={13} strokeWidth={2} />
          </button>
          <button
            className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="Adicionar"
          >
            <Plus size={13} strokeWidth={2} />
          </button>
        </div>
      </header>

      
      <div className="border-b border-hairline bg-white/72 px-3 py-2 text-[11px]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
            ocupação média
          </span>
          <span className="font-mono text-[11px] font-semibold text-zinc-950 tabular-nums">
            {avgOcc}%
          </span>
        </div>
        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className={cn("h-full rounded-full bg-gradient-to-r", styles.bar)}
            style={{ width: `${avgOcc}%` }}
          />
        </div>
      </div>

      
      <div className="flex-1 space-y-2 overflow-y-auto p-2.5">
        {column.cards.map((c) => (
          <VehicleCard key={c.id} card={c} columnVariant={column.variant} />
        ))}
        {column.cards.length === 0 && (
          <div className="rounded-[6px] border border-dashed border-zinc-300 bg-white px-3 py-8 text-center">
            <p className="text-[11px] text-zinc-500">Sem veículos</p>
          </div>
        )}
      </div>
    </div>
  );
}
