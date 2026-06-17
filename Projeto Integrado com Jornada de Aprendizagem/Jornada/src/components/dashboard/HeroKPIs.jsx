import { AlertTriangle, ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import Sparkline from "../reports/Sparkline.jsx";
import HighwayPattern from "../ui/HighwayPattern.jsx";
import CapacityRing from "../ui/CapacityRing.jsx";
import { semanticColor, SEMANTIC_GRADIENT } from "../../lib/semantic.js";

export default function HeroKPIs() {
  return (
    <section className="grid grid-cols-12 gap-3">
      <article className="panel-enter surface-ink scanline relative col-span-12 overflow-hidden lg:col-span-5">
        <HighwayPattern
          width={800}
          height={280}
          opacity={0.08}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-x-0 bottom-0 h-28 opacity-50">
          <Sparkline data={[1840, 2120, 2680, 2240, 2510, 2890, 3120]} color="#16a34a" height={112} />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-transparent" />
        <span className="absolute left-0 top-0 h-[2px] w-12 bg-[color:var(--color-hazard)]" />
        <span aria-hidden className="pointer-events-none absolute -right-6 top-0 select-none font-display-ultra text-[200px] leading-none text-white/[0.025]">
          R$
        </span>

        <div className="relative p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                Receita realizada
              </p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] tabular-nums text-zinc-600">
                [ período · 01-14 mai · 14/14 dias ]
              </p>
            </div>
            <span className="rounded-[3px] bg-[color:var(--color-hazard)] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.15)]">
              destaque
            </span>
          </div>

          <div className="mt-7 flex items-end gap-3">
            <p className="font-display-cond text-[60px] leading-[0.85] tabular-nums text-white sm:text-[72px]">
              <span className="text-zinc-500">R$</span>3,12
              <span className="text-zinc-500">M</span>
            </p>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-[3px] border border-[color:var(--color-good)]/40 bg-[color:var(--color-good)]/[0.12] px-1.5 py-0.5 text-[11px] font-medium text-[color:var(--color-good)] tabular-nums">
              <ArrowUpRight size={11} strokeWidth={2} />
              +18,2%
            </span>
            <span className="flex items-center gap-1 text-[11px] text-zinc-400">
              vs. mesmo dia mês anterior
            </span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-[3px] border border-white/[0.10] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-300">
              <TrendingUp size={9} strokeWidth={2} />
              tendência alta
            </span>
          </div>

          <div className="mt-7 border-t border-white/[0.08] pt-4">
            <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.15em]">
              <span className="text-zinc-500">Meta · R$ 3,5M</span>
              <span className="tabular-nums text-zinc-200">
                <span className="font-bold" style={{ color: semanticColor(89) }}>89%</span>
                <span className="text-zinc-500"> / cumprido</span>
              </span>
            </div>
            <div className="relative mt-1.5 h-2.5 w-full overflow-hidden rounded-[2px] bg-white/[0.08]">
              <div className="absolute inset-0" style={{ background: SEMANTIC_GRADIENT, clipPath: "inset(0 11% 0 0)" }} />
              <span className="absolute inset-y-0 w-[2px]" style={{ left: "89%", background: "#fff", boxShadow: "0 0 8px 1px rgb(255 255 255 / 0.5), 0 0 16px 2px rgb(22 163 74 / 0.6)" }} />
              {[25, 50, 75].map((t) => (
                <span key={t} className="absolute bottom-1 top-1 w-px bg-zinc-700/70" style={{ left: `${t}%` }} />
              ))}
            </div>
            <div className="mt-1 flex justify-between font-mono text-[8px] uppercase tracking-[0.18em]">
              <span style={{ color: "#d7282f" }}>0</span>
              <span style={{ color: "#ea7c2c" }}>25</span>
              <span style={{ color: "#e5a435" }}>50</span>
              <span style={{ color: "#e5a435" }}>75</span>
              <span style={{ color: "#16a34a" }}>R$ 3,5M</span>
            </div>
          </div>
        </div>
      </article>

      <PairedKPI />

      <article className="panel-enter surface-hazard scanline relative col-span-12 overflow-hidden text-white sm:col-span-12 lg:col-span-2">
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-hazard-tape-thin" />
        <span aria-hidden className="pointer-events-none absolute -right-2 -top-4 select-none font-display-ultra text-[120px] leading-none text-white/[0.06]">
          23
        </span>
        <div className="relative p-3.5">
          <div className="flex items-start justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
              Ocorrências
            </p>
            <AlertTriangle size={12} strokeWidth={2} className="text-white" />
          </div>
          <p className="mt-3 font-display-cond text-[48px] leading-[0.85] tabular-nums text-white">
            23
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-[11px]">
            <span className="font-mono font-semibold tabular-nums text-white">+4</span>
            <span className="text-white/75">hoje</span>
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.15em] text-white/75">
            <span>Atenção</span>
            <span className="tabular-nums">04m médio</span>
          </div>
        </div>
      </article>
    </section>
  );
}

function PairedKPI() {
  return (
    <article className="panel-enter surface-interactive group relative col-span-12 overflow-hidden lg:col-span-5">
      <div className="absolute inset-x-0 bottom-0 h-16 opacity-70">
        <Sparkline data={[1080, 1110, 1190, 1175, 1220, 1252, 1284]} color="#1f4f8f" height={64} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/88 to-transparent" />
      <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[color:var(--color-brand)] via-[color:var(--color-hazard)] to-transparent" />
      <span aria-hidden className="pointer-events-none absolute right-3 top-3 flex h-5 items-center gap-1 rounded-[4px] border border-zinc-200 bg-white/90 px-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-700 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100">
        ver tendência
        <ArrowRight size={9} strokeWidth={2.5} />
      </span>

      <div className="relative grid h-full min-h-[230px] grid-cols-1 divide-y divide-zinc-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                Pedidos do dia
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-400">
                processados
              </p>
            </div>
            <CapacityRing value={73} label="lote" size={42} stroke={3} scale="good-high" />
          </div>
          <p className="mt-4 font-display-cond text-[54px] leading-[0.85] tabular-nums text-zinc-950">
            1.284
          </p>
          <DeltaPill value="+12,4%" />
          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-zinc-100">
            <span className="block h-full w-[73%] rounded-full bg-[color:var(--color-brand)]" />
          </div>
        </div>

        <div className="relative p-4">
          <div className="absolute inset-x-0 bottom-0 h-16 opacity-65">
            <Sparkline data={[92.1, 92.4, 93.0, 93.6, 94.2, 94.5, 94.8]} color="#16a34a" height={64} />
          </div>
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  Entregas no prazo
                </p>
                <p className="mt-1 text-[11px] font-medium leading-snug text-zinc-500">
                  Pedidos completos e entregues dentro do combinado.
                </p>
              </div>
              <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
                últimos 14 dias
              </p>
            </div>
            <p className="mt-5 font-display-cond text-[54px] leading-[0.85] tabular-nums text-zinc-950">
              94,8<span className="text-[30px] text-zinc-500">%</span>
            </p>
            <DeltaPill value="+1,2 pontos" />
            <div className="mt-6 grid grid-cols-3 gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em]">
              <MiniQuality label="Coleta" value="98%" />
              <MiniQuality label="Trânsito" value="96%" />
              <MiniQuality label="Entrega" value="94%" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function DeltaPill({ value }) {
  return (
    <span className="mt-4 inline-flex items-center gap-0.5 rounded-[3px] border border-[color:var(--color-good)]/35 bg-[color:var(--color-good)]/[0.10] px-1.5 py-0.5 text-[10px] font-medium text-[color:var(--color-good)] tabular-nums">
      <ArrowUpRight size={9} strokeWidth={2} />
      {value}
    </span>
  );
}

function MiniQuality({ label, value }) {
  return (
    <div className="rounded-[5px] border border-zinc-200 bg-white/80 px-2 py-1.5">
      <p className="text-zinc-400">{label}</p>
      <p className="mt-0.5 text-[11px] font-bold tabular-nums text-zinc-950">
        {value}
      </p>
    </div>
  );
}
