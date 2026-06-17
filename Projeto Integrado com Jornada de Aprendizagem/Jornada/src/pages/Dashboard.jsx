import HazardTicker from "../components/dashboard/HazardTicker.jsx";
import FreightQuickStrip from "../components/dashboard/FreightQuickStrip.jsx";
import HeroKPIs from "../components/dashboard/HeroKPIs.jsx";
import BrasilGrid from "../components/dashboard/BrasilGrid.jsx";
import RouteProgress from "../components/dashboard/RouteProgress.jsx";
import LiveOperationsFeed from "../components/dashboard/LiveOperationsFeed.jsx";
import CargoManifest from "../components/ui/CargoManifest.jsx";
import MetricTile from "../components/ui/MetricTile.jsx";
import { Activity, RadioTower, Route, ShieldCheck } from "lucide-react";


export default function Dashboard() {
  return (
    <div className="app-page app-page--dashboard relative space-y-4">
      <DashboardCommandHero />
      <HazardTicker />
      <FreightQuickStrip />
      <HeroKPIs />
      <BrasilGrid />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RouteProgress />
        </div>
        <LiveOperationsFeed />
      </div>

      <div className="hidden lg:block">
        <div className="mx-auto mt-6 max-w-[340px]">
          <CargoManifest />
        </div>
      </div>
    </div>
  );
}

function DashboardCommandHero() {
  return (
    <section className="panel-enter surface-ink scanline hero-panel relative min-h-[280px] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(31_79_143_/_0.24),transparent_24rem),linear-gradient(90deg,rgb(13_25_41_/_0.98),rgb(13_25_41_/_0.78)_58%,rgb(13_25_41_/_0.92))]"
      />
      <div className="relative grid gap-5 p-5 lg:grid-cols-[1.1fr_0.9fr] lg:p-6">
        <div className="flex min-h-[228px] flex-col justify-between">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-hazard-soft)]">
              <span className="live-dot" />
              Torre Londrina <span className="hidden sm:inline">· comando nacional</span>
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-[34px] font-semibold leading-[1.02] text-white sm:text-[42px]">
              Malha viva, frete instantâneo, operação sob controle.
            </h2>
            <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-zinc-300">
              FastAriam agora opera como um cockpit logístico de alta precisão:
              cotação, frota, ocorrências e receita em uma visão contínua.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.14em]">
            <HeroChip icon={RadioTower} label="HQ LDB" value="online" />
            <HeroChip icon={Route} label="Rotas" value="3 ativas" />
            <HeroChip icon={ShieldCheck} label="SLA" value="97.4%" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <MetricTile
            label="Entregas urgentes"
            description="Pedidos que precisam de atenção hoje."
            value="13"
            suffix="entregas"
            delta="+4 hoje"
            trend="up"
            deltaTone="warn"
            icon={Activity}
            tone="hazard"
            meta="resolver até 18h"
            spark={[6, 8, 7, 10, 9, 12, 13]}
            className="bg-white/94"
          />
          <MetricTile
            label="Tempo de rastreio"
            description="Velocidade da telemetria da operação."
            value="214"
            suffix="ms"
            delta="estável"
            trend="flat"
            icon={RadioTower}
            tone="brand"
            meta="31 sinais ativos"
            spark={[230, 221, 218, 216, 217, 215, 214]}
            className="bg-white/94"
          />
          <MetricTile
            label="Pedidos monitorados"
            description="Parte da malha acompanhada pelo sistema."
            value="97.4"
            suffix="%"
            delta="+1.2 pontos"
            trend="up"
            icon={ShieldCheck}
            tone="good"
            meta="visibilidade geral"
            spark={[92, 94, 93, 95, 96, 97, 97.4]}
            className="bg-white/94"
          />
        </div>
      </div>
    </section>
  );
}

function HeroChip({ icon: Icon, label, value }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[5px] border border-white/10 bg-white/[0.06] px-2 py-1 text-zinc-300 backdrop-blur-md">
      <Icon size={12} strokeWidth={1.9} className="text-white" />
      <span>{label}</span>
      <span className="text-white">{value}</span>
    </span>
  );
}
