import { useState } from "react";
import {
  MapPin,
  Calculator,
  ArrowRight,
  Truck,
  Zap,
  Plane,
  Container,
  Sparkles,
  PackageCheck,
  Warehouse,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils.js";


const MODAIS = [
  { key: "fracionado", Icon: Truck,     label: "Fracionado" },
  { key: "lotacao",    Icon: Container, label: "Lotação" },
  { key: "expresso",   Icon: Zap,       label: "Expresso" },
  { key: "aereo",      Icon: Plane,     label: "Aéreo" },
];

const PREVIEW_QUOTES = [
  { carrier: "Jamef",     price: "R$ 132", eta: "4 dias", trend: "down", note: "Mais barato" },
  { carrier: "Braspress", price: "R$ 142", eta: "3 dias", trend: "down", note: "Melhor custo-benefício" },
  { carrier: "Loggi",     price: "R$ 168", eta: "2 dias", trend: "up",   note: "Mais rápido" },
];

export default function FreightQuickStrip() {
  const [modal, setModal] = useState("fracionado");

  return (
    <section className="panel-enter surface relative overflow-hidden">
      
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-hazard-tape-thin"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
        
        <div className="relative border-b border-hairline px-5 py-4 lg:border-b-0 lg:border-r">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-hazard)]">
                <Sparkles size={11} strokeWidth={2.25} />
                Frete inteligente · 12 transportadoras
              </p>
              <h2 className="mt-1 font-display text-[18px] font-semibold text-zinc-950">
                Cote agora,{" "}
                <span className="font-display italic text-zinc-500">contrate em 30s.</span>
              </h2>
            </div>
            <span className="rounded-[3px] bg-[color:var(--color-hazard)] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.15)]">
              PRONTO
            </span>
          </div>

          
          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-[1fr_1fr_auto_auto]">
            <CepInput label="Origem"  cep="86010-100" city="Londrina/PR" />
            <CepInput label="Destino" cep="80010-000" city="Curitiba/PR" />
            <NumInput label="Peso"    value="120"  suffix="kg" width={64} />
            <NumInput label="Volumes" value="8"    suffix="un" width={56} />
          </div>

          
          <div className="mt-3">
            <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500">
              Modal & operação
            </p>
            <div className="flex gap-1.5">
              {MODAIS.map((m) => {
                const active = modal === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setModal(m.key)}
                    className={cn(
                      "group flex flex-1 items-center gap-1.5 rounded-[5px] border px-2 py-1.5 text-[11px] font-medium transition-all",
                      active
                        ? "border-[color:var(--color-brand)] bg-[color:var(--color-brand-tint)] text-[color:var(--color-brand)] shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.40),_0_0_0_2px_rgb(31_79_143_/_0.08)]"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
                    )}
                  >
                    <m.Icon size={11} strokeWidth={2} className={active ? "text-[color:var(--color-brand)]" : "text-zinc-500"} />
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          
          <div className="mt-3 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
              tabela vigente · mai/2026
            </p>
            <Link
              to="/frete"
              className="group inline-flex items-center gap-1.5 rounded-[5px] bg-[color:var(--color-brand)] px-3 py-1.5 text-[12px] font-semibold text-white shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.12),_0_2px_4px_0_rgb(31_79_143_/_0.30)] transition-all hover:bg-[color:var(--color-brand-deep)] hover:shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.12),_0_4px_10px_-2px_rgb(31_79_143_/_0.45)]"
            >
              <Calculator size={13} strokeWidth={2} />
              Calcular fretes
              <ArrowRight
                size={12}
                strokeWidth={2.5}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        
        <div className="relative px-5 py-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Preview · 3 melhores cotações
            </p>
            <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
              <span className="live-dot" />
              <span className="ml-0.5">simulação</span>
            </span>
          </div>

          <ul className="mt-2.5 space-y-1.5">
            {PREVIEW_QUOTES.map((q, i) => (
              <li
                key={q.carrier}
                className={cn(
                  "group flex items-center gap-2 rounded-[5px] border bg-white px-2.5 py-1.5 transition-all hover:border-zinc-300 hover:shadow-[0_2px_4px_-1px_rgb(10_10_10_/_0.06)]",
                  i === 0 ? "border-[color:var(--color-good)]/40 bg-[color:var(--color-good)]/[0.04]" : "border-zinc-200"
                )}
              >
                <QuoteIcon index={i} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[12px] font-semibold text-zinc-950">
                      {q.carrier}
                    </span>
                    <span className="font-display-cond text-[16px] font-bold tabular-nums text-zinc-950">
                      {q.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-500">
                      {q.note}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] tabular-nums text-zinc-600">
                      <MapPin size={9} strokeWidth={1.75} className="text-zinc-400" />
                      {q.eta}
                    </span>
                  </div>
                </div>
                <ArrowRight
                  size={11}
                  strokeWidth={2}
                  className="text-zinc-300 transition-all group-hover:translate-x-0.5 group-hover:text-zinc-700"
                />
              </li>
            ))}
          </ul>

          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
            + 9 transportadoras adicionais ·{" "}
            <Link to="/frete" className="text-[color:var(--color-brand)] hover:underline">
              ver todas
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function QuoteIcon({ index }) {
  const Icon = index === 1 ? Warehouse : index === 2 ? PackageCheck : Truck;
  return (
    <span
      className={cn(
        "flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.18)]",
        index === 0
          ? "bg-gradient-to-br from-zinc-900 to-zinc-700"
          : index === 1
            ? "bg-gradient-to-br from-[#1a4ba8] to-[#0e3486]"
            : "bg-gradient-to-br from-[#0F9D58] to-[#0a7942]"
      )}
    >
      <Icon size={12} strokeWidth={2} />
    </span>
  );
}

function CepInput({ label, cep, city }) {
  return (
    <div>
      <label className="block font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500">
        {label}
      </label>
      <div className="mt-0.5 flex gap-1">
        <input
          type="text"
          defaultValue={cep}
          className="h-7 w-[68px] rounded-[4px] border border-zinc-200 bg-white px-1.5 font-mono text-[11px] tabular-nums text-zinc-900 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/20"
        />
        <input
          type="text"
          defaultValue={city}
          className="h-7 min-w-0 flex-1 rounded-[4px] border border-zinc-200 bg-white px-1.5 text-[11px] text-zinc-900 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/20"
        />
      </div>
    </div>
  );
}

function NumInput({ label, value, suffix, width = 60 }) {
  return (
    <div>
      <label className="block font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500">
        {label}
      </label>
      <div className="relative mt-0.5">
        <input
          type="text"
          defaultValue={value}
          className="h-7 rounded-[4px] border border-zinc-200 bg-white pl-1.5 pr-7 font-mono text-[11px] tabular-nums text-zinc-900 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/20"
          style={{ width }}
        />
        <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-400">
          {suffix}
        </span>
      </div>
    </div>
  );
}
