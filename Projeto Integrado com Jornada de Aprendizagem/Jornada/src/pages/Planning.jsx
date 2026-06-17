import { LayoutGrid, List, Plus, Filter, Truck, Activity, Gauge, AlertTriangle } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import KanbanBoard from "../components/planning/KanbanBoard.jsx";
import { kanbanColumns } from "../data/mockData.js";
import PageActionBar from "../components/ui/PageActionBar.jsx";
import MetricTile from "../components/ui/MetricTile.jsx";

export default function Planning() {
  const total = kanbanColumns.reduce((s, c) => s + c.cards.length, 0);
  const transito = kanbanColumns.find((c) => c.id === "transito")?.cards.length ?? 0;
  const ocorrencias =
    kanbanColumns.find((c) => c.id === "ocorrencia")?.cards.length ?? 0;
  const allCards = kanbanColumns.flatMap((c) => c.cards);
  const ocupacaoMedia = Math.round(
    allCards.reduce((s, c) => s + c.ocupacao, 0) / allCards.length
  );

  return (
    <div className="app-page app-page--planning space-y-4">
      <PageActionBar
        eyebrow="frota em operação"
        title="Planejamento vivo"
        meta={`${total} veículos · HQ Londrina/PR · atualização contínua`}
        icon={Truck}
        actions={
          <>
          <div className="flex rounded-[5px] border border-zinc-200 p-0.5">
            <button className="flex items-center gap-1 rounded-[3px] bg-zinc-950 px-2 py-1 font-mono text-[10px] font-semibold text-white">
              <LayoutGrid size={11} strokeWidth={2} />
              Kanban
            </button>
            <button className="flex items-center gap-1 rounded-[3px] px-2 py-1 font-mono text-[10px] font-semibold text-zinc-600 hover:bg-zinc-50">
              <List size={11} strokeWidth={2} />
              Lista
            </button>
          </div>
          <Button variant="secondary" icon={Filter} size="md">
            Filtros
          </Button>
          <Button variant="primary" icon={Plus} size="md">
            Nova rota
          </Button>
          </>
        }
      />

      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricTile label="Veículos ativos" value={total} icon={Truck} tone="ink" meta="board" spark={[4, 5, 5, 6, 7, total]} />
        <MetricTile label="Em trânsito" value={transito} icon={Activity} tone="brand" meta="live" spark={[1, 2, 2, 3, transito]} />
        <MetricTile
          label="Ocupação média"
          value={ocupacaoMedia}
          suffix="%"
          icon={Gauge}
          tone="good"
          meta="frota"
          spark={[48, 52, 61, 67, ocupacaoMedia]}
        />
        <MetricTile
          label="Ocorrências"
          value={ocorrencias}
          icon={AlertTriangle}
          tone={ocorrencias > 0 ? "hazard" : "ink"}
          meta="ação"
          spark={[0, 0, 1, 1, ocorrencias]}
        />
      </div>

      
      <KanbanBoard />

      
      <div className="premium-panel rounded-[6px] px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Legenda — barra de ocupação
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <LegendItem color="bg-amber-500" label="< 40% — baixa eficiência" />
          <LegendItem color="bg-blue-500" label="40–70% — ocupação normal" />
          <LegendItem color="bg-emerald-500" label="70–90% — ideal" />
          <LegendItem color="bg-red-500" label="> 90% — limite/excedido" />
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2 w-6 rounded-full ${color}`} />
      <span className="text-zinc-600">{label}</span>
    </div>
  );
}
