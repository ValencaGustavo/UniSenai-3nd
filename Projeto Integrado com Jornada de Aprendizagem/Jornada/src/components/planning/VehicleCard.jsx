import {
  MoreHorizontal,
  Package,
  AlertTriangle,
  Clock,
  ArrowRight,
  Truck,
  UserRound,
} from "lucide-react";
import TruckSilhouette from "../ui/TruckSilhouette.jsx";
import { semanticColor } from "../../lib/semantic.js";
import { cn } from "../../lib/utils.js";


export default function VehicleCard({ card }) {
  const occColor = semanticColor(card.ocupacao, "good-low");
  const isAlert = !!card.ocorrencia;

  return (
    <article className="group relative overflow-hidden rounded-[6px] border border-white/80 bg-white/88 p-3 shadow-[0_1px_0_rgb(255_255_255_/_0.8)_inset] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_12px_24px_-18px_rgb(10_10_10_/_0.28)]">
      
      {isAlert && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[3px] bg-hazard-tape-thin"
        />
      )}

      
      <TruckSilhouette
        width={64}
        height={28}
        color={isAlert ? "#d7282f" : "#1f4f8f"}
        opacity={0.06}
        className="pointer-events-none absolute right-1 top-1"
      />

      
      <header className="relative flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-[3px] bg-gradient-to-br from-zinc-900 to-zinc-700 text-[10px] font-mono font-semibold text-white shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.10)]">
            <Truck size={14} strokeWidth={1.9} />
          </div>
          <div className="leading-tight">
            <p className="font-mono text-[11px] font-bold tracking-tight text-zinc-950">
              {card.id}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
              {card.placa} · ROM·{String(card.id?.split("-")[1] ?? "0000").padStart(4, "0")}
            </p>
          </div>
        </div>
        <button
          className="rounded p-1 text-zinc-400 opacity-0 transition-opacity hover:bg-zinc-100 hover:text-zinc-700 group-hover:opacity-100"
          aria-label="Mais"
        >
          <MoreHorizontal size={12} strokeWidth={2} />
        </button>
      </header>

      
      <div className="relative mt-2.5 rounded-[4px] border border-dashed border-zinc-200 bg-zinc-50/50 px-2 py-1.5">
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="font-mono font-semibold text-zinc-700">
            {card.rota?.split(" → ")[0]}
          </span>
          <ArrowRight
            size={10}
            strokeWidth={2.5}
            className={isAlert ? "text-[color:var(--color-hazard)]" : "text-zinc-400"}
          />
          <span className="font-mono font-semibold text-zinc-950">
            {card.rota?.split(" → ")[1]}
          </span>
        </div>
        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-500">
          {card.rodovia} · {card.transportadora}
        </p>
      </div>

      
      <div className="relative mt-2.5">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500">
            carga
          </span>
          <span
            className="font-display-cond text-[18px] leading-none tabular-nums"
            style={{ color: occColor }}
          >
            {card.ocupacao}%
          </span>
        </div>
        
        <div className="relative mt-1 h-[5px] w-full overflow-hidden rounded-[1px] bg-zinc-100">
          <div
            className="absolute inset-y-0 left-0 rounded-[1px]"
            style={{
              width: `${card.ocupacao}%`,
              background: occColor,
              boxShadow: `0 0 6px ${occColor}55`,
            }}
          />
          
          {[25, 50, 75].map((t) => (
            <span
              key={t}
              className="absolute inset-y-0 w-px bg-white/60"
              style={{ left: `${t}%` }}
            />
          ))}
        </div>
        <p className="mt-1 flex items-center justify-between font-mono text-[9px] text-zinc-400 tabular-nums">
          <span>{card.peso}</span>
          <span className="text-[8px] uppercase tracking-[0.12em]">
            {card.ocupacao >= 90
              ? "limite"
              : card.ocupacao >= 70
              ? "ideal"
              : card.ocupacao >= 40
              ? "regular"
              : "baixo"}
          </span>
        </p>
      </div>

      
      {card.ocorrencia && (
        <div className="relative mt-2.5 flex items-start gap-1.5 rounded-[4px] border border-[color:var(--color-crit)]/30 bg-[color:var(--color-crit)]/[0.05] px-2 py-1.5">
          <AlertTriangle
            size={11}
            strokeWidth={2}
            className="mt-0.5 shrink-0 text-[color:var(--color-crit)]"
          />
          <p className="text-[10px] font-medium leading-tight text-[color:var(--color-crit)]">
            {card.ocorrencia}
          </p>
        </div>
      )}

      
      <footer className="relative mt-2.5 flex items-center justify-between border-t border-zinc-100 pt-2">
        <div className="flex items-center gap-1.5">
          <div
            className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--color-brand-soft)] to-[color:var(--color-brand-deep)] font-mono text-[8px] font-bold text-white shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.20)]"
            title={card.motorista}
          >
            <UserRound size={10} strokeWidth={1.9} />
          </div>
          <span className="text-[10px] text-zinc-700">{card.motorista}</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
          <span className="inline-flex items-center gap-0.5">
            <Package size={9} strokeWidth={1.75} />
            <span className="font-semibold text-zinc-700 tabular-nums">
              {card.pedidos}
            </span>
          </span>
          <span className="text-zinc-300">·</span>
          <span
            className={cn(
              "inline-flex items-center gap-0.5",
              isAlert && "text-[color:var(--color-crit)] font-semibold"
            )}
          >
            <Clock size={9} strokeWidth={1.75} />
            <span className="font-semibold tabular-nums">{card.eta}</span>
          </span>
        </div>
      </footer>

      
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-stretch gap-px overflow-hidden rounded-b-[6px] border-t border-zinc-200 bg-white opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <button className="flex-1 py-1 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950">
          rastrear
        </button>
        <span className="w-px bg-zinc-100" />
        <button className="flex-1 py-1 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950">
          editar
        </button>
        <span className="w-px bg-zinc-100" />
        <button
          className={cn(
            "flex-1 py-1 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors",
            isAlert
              ? "bg-[color:var(--color-crit)] text-white hover:bg-[color:var(--color-hazard-deep)]"
              : "text-[color:var(--color-brand)] hover:bg-[color:var(--color-brand-tint)]"
          )}
        >
          {isAlert ? "tratar ▲" : "atribuir →"}
        </button>
      </div>
    </article>
  );
}
