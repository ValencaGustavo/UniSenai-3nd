import { useState } from "react";
import { Filter, Pause, Play } from "lucide-react";
import { cn } from "../../lib/utils.js";


const FEED = [
  { t: "11:42:08", sigil: "■", kind: "ok",    actor: "LOG-4821", text: "saiu da HQ Londrina",                                      meta: "BR-369" },
  { t: "11:41:53", sigil: "▲", kind: "alarm", actor: "JAM-7790", text: "ocorrência registrada · bloqueio km 482 BR-116",           meta: "MG/SP" },
  { t: "11:41:21", sigil: "✓", kind: "ok",    actor: "LOG-4801", text: "entrega confirmada · Curitiba/PR",                          meta: "CWB" },
  { t: "11:40:47", sigil: "■", kind: "ok",    actor: "BRP-1109", text: "carregamento iniciado · doc. CT-887421",                    meta: "RJ→BHZ" },
  { t: "11:40:12", sigil: "◇", kind: "cte",   actor: "CTe·1245", text: "emitido · 35240612345722",                                  meta: "LDB→PR" },
  { t: "11:39:58", sigil: "■", kind: "ok",    actor: "AZL-2210", text: "coleta executada · Londrina/PR",                            meta: "LDB" },
  { t: "11:39:11", sigil: "▲", kind: "warn",  actor: "LOG-4830", text: "volume excedido em 03 itens · revisar romaneio",            meta: "alerta" },
  { t: "11:38:42", sigil: "◇", kind: "cte",   actor: "CTe·1244", text: "emitido · 35240612345799",                                  meta: "RJ→MG" },
  { t: "11:38:07", sigil: "✓", kind: "ok",    actor: "LOG-4795", text: "entrega confirmada · Recife/PE",                            meta: "REC" },
  { t: "11:37:33", sigil: "■", kind: "ok",    actor: "RJX-3320", text: "saiu de Juiz de Fora",                                      meta: "BR-040" },
];

const KIND_COLOR = {
  ok:    "text-[color:var(--color-good)]",
  alarm: "text-[color:var(--color-crit)]",
  warn:  "text-[color:var(--color-warn)]",
  cte:   "text-zinc-500",
};

const KIND_ROW = {
  alarm: "hover:bg-[color:var(--color-crit)]/[0.04]",
  warn:  "hover:bg-[color:var(--color-warn)]/[0.04]",
  ok:    "hover:bg-zinc-50/80",
  cte:   "hover:bg-zinc-50/80",
};

export default function LiveOperationsFeed() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="panel-enter surface scanline flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="head-rule w-8" />
          <div>
            <h2 className="font-display text-[14px] font-semibold text-zinc-950">
              Stream de operação
            </h2>
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
              [
              <span className={cn("live-dot", paused && "opacity-30")} />
              <span className="ml-1">
                {paused ? "pausado" : "live · tail -f"}
              </span>
              ]
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPaused(!paused)}
            className="flex h-6 items-center gap-1 rounded-[5px] border border-zinc-200 bg-white px-2 text-zinc-600 hover:bg-zinc-50"
            aria-label={paused ? "Retomar" : "Pausar"}
          >
            {paused ? (
              <Play size={10} strokeWidth={2.5} />
            ) : (
              <Pause size={10} strokeWidth={2.5} />
            )}
            <span className="font-mono text-[9px] uppercase tracking-[0.12em]">
              {paused ? "play" : "pause"}
            </span>
          </button>
          <button className="flex h-6 items-center gap-1 rounded-[5px] border border-zinc-200 bg-white px-2 text-zinc-600 hover:bg-zinc-50">
            <Filter size={10} strokeWidth={2} />
            <span className="font-mono text-[9px] uppercase tracking-[0.12em]">
              filtros
            </span>
          </button>
        </div>
      </header>

      <ul className="flex-1 divide-y divide-zinc-100 overflow-y-auto font-mono text-[11px]">
        {FEED.map((e, i) => (
          <li
            key={i}
            className={cn(
              "group relative flex items-start gap-2 px-4 py-2 transition-colors",
              KIND_ROW[e.kind]
            )}
          >
            
            {(e.kind === "alarm" || e.kind === "warn") && (
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2",
                  e.kind === "alarm"
                    ? "bg-[color:var(--color-crit)]"
                    : "bg-[color:var(--color-warn)]"
                )}
              />
            )}
            <span className="select-none tabular-nums text-zinc-400">{e.t}</span>
            <span className={cn("select-none font-bold", KIND_COLOR[e.kind])}>
              {e.sigil}
            </span>
            <span className="font-semibold text-zinc-900">
              {e.actor}
            </span>
            <span className="flex-1 truncate font-sans text-[11px] text-zinc-600">
              {e.text}
            </span>
            
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400 group-hover:inline">
              {e.meta}
            </span>
          </li>
        ))}
      </ul>

      <footer className="flex items-center justify-between border-t border-hairline bg-zinc-50/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
        <span className="tabular-nums">10 últimos · 1.247 hoje</span>
        <button className="flex items-center gap-1 text-zinc-700 hover:text-zinc-950">
          ver todos
          <span className="text-zinc-300">→</span>
        </button>
      </footer>
    </section>
  );
}
