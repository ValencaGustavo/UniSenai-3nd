import { Clock, AlertTriangle, Truck } from "lucide-react";
import StatusPill from "../ui/StatusPill.jsx";
import { cn } from "../../lib/utils.js";


const ROUTES = [
  {
    id: "LOG-4821", placa: "PRA-4F21", motorista: "Carlos H.", iniciais: "CH",
    origem: "Londrina/PR", origemCode: "LDB",
    hub: "Ponta Grossa", hubCode: "PGZ",
    destino: "Curitiba/PR", destinoCode: "CWB",
    rodovia: "BR-369 · BR-376", progresso: 62, status: "Em trânsito",
    eta: "04h12", ocupacao: 82,
  },
  {
    id: "JAM-7790", placa: "PRH-2K88", motorista: "Roberto L.", iniciais: "RL",
    origem: "Londrina/PR", origemCode: "LDB",
    hub: "Feira de Santana", hubCode: "FSA",
    destino: "Salvador/BA", destinoCode: "SSA",
    rodovia: "BR-369 · BR-116", progresso: 41, status: "Com ocorrência",
    eta: "Atraso 6h", ocupacao: 95,
    alert: "Bloqueio km 482 (MG)",
  },
  {
    id: "BRP-1109", placa: "RJX-7A02", motorista: "Andréia S.", iniciais: "AS",
    origem: "Rio de Janeiro/RJ", origemCode: "RIO",
    hub: "Juiz de Fora", hubCode: "JDF",
    destino: "Belo Horizonte/MG", destinoCode: "BHZ",
    rodovia: "BR-040", progresso: 18, status: "Em trânsito",
    eta: "08h47", ocupacao: 64,
  },
  {
    id: "AZL-2210", placa: "PEX-9V44", motorista: "Patrícia R.", iniciais: "PR",
    origem: "Londrina/PR", origemCode: "LDB",
    hub: "Aeroporto Londrina", hubCode: "AIR",
    destino: "Recife/PE", destinoCode: "REC",
    rodovia: "Aéreo · LDB", progresso: 0, status: "Aguardando coleta",
    eta: "Hoje 18:00", ocupacao: 48,
  },
];

export default function RouteProgress() {
  return (
    <section className="panel-enter surface">
      <header className="flex items-center justify-between border-b border-hairline px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="head-rule w-8" />
          <div>
            <h2 className="font-display text-[14px] font-semibold text-zinc-950">
              Rotas em curso
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
              [ {ROUTES.length} ativas · atualizado{" "}
              <span className="live-dot mx-1 inline-block align-middle" /> agora ]
            </p>
          </div>
        </div>
        <button className="rounded-[5px] border border-zinc-200 bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-700 hover:bg-zinc-50">
          Planejamento →
        </button>
      </header>

      <div className="divide-y divide-zinc-100">
        {ROUTES.map((r) => (
          <RouteRow key={r.id} route={r} />
        ))}
      </div>
    </section>
  );
}

function RouteRow({ route }) {
  const isAlert = route.status === "Com ocorrência";

  return (
    <div className="px-5 py-3 transition-colors hover:bg-zinc-50/40">
      <div className="flex items-start justify-between gap-5">
        
        <div className="flex shrink-0 items-center gap-2.5 lg:w-44">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-[3px]",
              isAlert
                ? "bg-[color:var(--color-alarm)] text-white"
                : "bg-zinc-100 text-zinc-700"
            )}
          >
            <Truck size={14} strokeWidth={1.9} />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-semibold text-zinc-950">
              {route.id}
            </p>
            <p className="truncate text-[11px] text-zinc-500">
              {route.motorista} ·{" "}
              <span className="font-mono">{route.placa}</span>
            </p>
          </div>
        </div>

        
        <div className="flex-1">
          <Track route={route} />
        </div>

        
        <div className="flex w-32 shrink-0 flex-col items-end gap-1">
          <StatusPill status={route.status} />
          <div className="flex items-center gap-1 font-mono text-[11px] tabular-nums text-zinc-700">
            {isAlert ? (
              <AlertTriangle
                size={11}
                strokeWidth={2}
                className="text-[color:var(--color-alarm)]"
              />
            ) : (
              <Clock size={11} strokeWidth={1.75} className="text-zinc-400" />
            )}
            {route.eta}
          </div>
        </div>
      </div>

      {route.alert && (
        <div className="mt-2 flex items-center gap-1.5 rounded-[3px] border border-[color:var(--color-alarm)]/30 bg-[color:var(--color-alarm)]/[0.05] px-2 py-1 text-[11px] text-[color:var(--color-alarm)]">
          <AlertTriangle size={11} strokeWidth={2} />
          {route.alert}
          <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.15em]">
            Tratar →
          </span>
        </div>
      )}

      <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">
        <span>{route.rodovia}</span>
        <span>
          ocupação ·{" "}
          <span className="font-semibold text-zinc-700 tabular-nums">
            {route.ocupacao}%
          </span>
        </span>
      </div>
    </div>
  );
}

function Track({ route }) {
  const p = route.progresso;
  const isAlert = route.status === "Com ocorrência";
  const isWaiting = p === 0;
  const accent = isAlert ? "var(--color-alarm)" : "var(--color-hazard)";

  return (
    <div className="relative pt-1">
      
      <div className="absolute left-0 right-0 top-[10px] h-px bg-zinc-200" />
      <div
        className="absolute left-0 top-[10px] h-px"
        style={{ width: `${Math.max(p, 2)}%`, background: accent }}
      />

      
      <div className="relative flex justify-between">
        <Stop active label={route.origem} code={route.origemCode} sub="Coleta" position="start" accent={accent} />
        <Stop active={p >= 50} label={route.hub} code={route.hubCode} sub="Hub" position="middle" accent={accent} />
        <Stop active={p >= 100} label={route.destino} code={route.destinoCode} sub="Destino" position="end" accent={accent} />
      </div>

      
      {!isWaiting && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 transition-all duration-700"
          style={{ left: `${p}%`, top: "5px" }}
        >
          <div className="relative">
            <span
              className="absolute inset-0 -m-2 animate-ping rounded-[2px] opacity-25"
              style={{ background: accent }}
            />
            <span
              className="relative block h-2.5 w-2.5"
              style={{ background: accent, boxShadow: "0 0 0 1.5px white" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Stop({ active, label, code, sub, position, accent }) {
  const align =
    position === "start"
      ? "items-start text-left"
      : position === "end"
      ? "items-end text-right"
      : "items-center text-center";
  return (
    <div className={cn("flex flex-col gap-0.5", align)}>
      
      <div
        className="h-3 w-[3px] rounded-[1px]"
        style={{ background: active ? accent : "#d4d4d8" }}
      />
      <div className="mt-1 flex flex-col gap-0">
        <span
          className="font-mono text-[10px] font-semibold tracking-[0.04em]"
          style={{ color: active ? "#0a0a0a" : "#a1a1aa" }}
        >
          {code}
        </span>
        <span
          className={cn(
            "text-[10px] leading-tight",
            active ? "text-zinc-700" : "text-zinc-400"
          )}
        >
          {label}
        </span>
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-400">
        {sub}
      </span>
    </div>
  );
}
