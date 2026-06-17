import { useState } from "react";
import {
  AlertTriangle,
  Check,
  FileSignature,
  Package,
  Pause,
  Play,
  Truck,
} from "lucide-react";
import { cn } from "../../lib/utils.js";


const EVENTS = [
  { kind: "cte",   text: "CTe emitido",                   code: "35240612345678", at: "11:42:08", route: "LDB→PR" },
  { kind: "ocor",  text: "Bloqueio km 482 BR-116 (MG)",   code: "JAM-7790",       at: "11:41:53", route: "LDB→BA" },
  { kind: "deliv", text: "Entrega confirmada Curitiba/PR", code: "LOG-4801",      at: "11:41:21", route: "LDB→CWB" },
  { kind: "load",  text: "Caminhão carregado na HQ Londrina", code: "BRP-1109",   at: "11:40:47", route: "LDB→MG" },
  { kind: "cte",   text: "CTe emitido",                   code: "35240612345722", at: "11:40:12", route: "LDB→RJ" },
  { kind: "deliv", text: "Coleta executada Londrina/PR",  code: "AZL-2210",       at: "11:39:58", route: "LDB→PE" },
  { kind: "load",  text: "Volume excedido em 03 itens",   code: "LOG-4830",       at: "11:39:11", route: "LDB→GO" },
  { kind: "depart", text: "Saída da HQ Londrina",         code: "LOG-4821",       at: "11:38:55", route: "LDB→PR" },
  { kind: "cte",   text: "CTe emitido",                   code: "35240612345799", at: "11:38:42", route: "RJ→MG" },
  { kind: "ocor",  text: "Pane mecânica · BR-101 km 88",  code: "TNT-2210",       at: "11:38:01", route: "RJ→ES" },
];

const KIND_META = {
  cte:    { Icon: FileSignature, label: "CTE",  color: "text-zinc-500" },
  ocor:   { Icon: AlertTriangle, label: "OCOR", color: "text-[color:var(--color-crit)]" },
  deliv:  { Icon: Check,         label: "DELV", color: "text-[color:var(--color-good)]" },
  load:   { Icon: Package,       label: "LOAD", color: "text-zinc-400" },
  depart: { Icon: Truck,         label: "DEPT", color: "text-[color:var(--color-brand-soft)]" },
};

export default function HazardTicker() {
  const [paused, setPaused] = useState(false);
  const row = EVENTS.map((e, i) => <Event key={i} e={e} />);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="panel-enter relative isolate flex h-9 items-stretch overflow-hidden rounded-[6px] border border-[color:var(--color-deep-navy)]/85 bg-[color:var(--color-deep-navy)] text-white"
      style={{ boxShadow: "var(--shadow-tape)" }}
    >
      
      <div className="relative flex shrink-0 items-center gap-2 bg-hazard-tape-thin px-3">
        <span
          aria-hidden
          className="absolute inset-y-0 right-0 w-px bg-[color:var(--color-deep-navy)]/40"
        />
        <span className="rounded-[3px] bg-[color:var(--color-deep-navy)] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-hazard)] shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.08)]">
          LIVE·OPS
        </span>
        
        {paused && (
          <span className="rounded-[3px] bg-[color:var(--color-deep-navy)] px-1 font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-white/80">
            ‖ pausa
          </span>
        )}
      </div>

      
      <div className="relative flex-1 overflow-hidden">
        <div
          className={cn(
            "marquee absolute inset-y-0 left-0 flex items-center",
            paused && "marquee--paused"
          )}
        >
          {row}
          {row}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[color:var(--color-deep-navy)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[color:var(--color-deep-navy)] to-transparent" />
      </div>

      
      <div className="flex shrink-0 items-center gap-2.5 border-l border-white/10 px-3 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
        <span className="flex items-baseline gap-1">
          <span className="font-semibold tabular-nums text-white">42</span>
          <span className="text-zinc-500">/min</span>
        </span>
        <span className="text-zinc-700">·</span>
        <span className="flex items-center gap-1">
          <span className="live-dot" />
          <span className="ml-1 tabular-nums">1.284 hoje</span>
        </span>
        <button
          onClick={() => setPaused(!paused)}
          className="ml-1 flex h-5 w-5 items-center justify-center rounded-[3px] border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.10] hover:text-white"
          aria-label={paused ? "Retomar" : "Pausar"}
        >
          {paused ? <Play size={9} strokeWidth={2.5} /> : <Pause size={9} strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
}

function Event({ e }) {
  const meta = KIND_META[e.kind];
  return (
    <div className="flex items-center gap-2 px-5 text-[12px]">
      <span className={"font-mono text-[9px] font-bold tracking-[0.18em] " + meta.color}>
        {meta.label}
      </span>
      <meta.Icon size={11} strokeWidth={2} className={meta.color} />
      <span className="text-zinc-100">{e.text}</span>
      <span className="font-mono text-[11px] tabular-nums text-zinc-500">
        {e.code}
      </span>
      <span className="rounded-[2px] border border-white/10 px-1 font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-500">
        {e.route}
      </span>
      <span className="font-mono text-[10px] tabular-nums text-zinc-600">
        {e.at}
      </span>
      <span className="text-zinc-700">·</span>
    </div>
  );
}
