import { Search, Filter, Download, Plus, X, ListPlus } from "lucide-react";
import { ordersStatuses, carriers } from "../../data/mockData.js";
import Button from "../ui/Button.jsx";
import { cn } from "../../lib/utils.js";
import { useNewOrder } from "./NewOrderContext.jsx";

export default function OrdersToolbar({
  query,
  onQuery,
  status,
  onStatus,
  carrier,
  onCarrier,
  period,
  onPeriod,
  selectedCount,
  onClearSelection,
  onAddSelectedToDemand,
  total,
}) {
  const { openNewOrder } = useNewOrder();
  const hasFilters = status !== "all" || carrier !== "all" || period !== "30";

  return (
    <div className="orders-toolbar-motion premium-panel overflow-hidden rounded-[6px]">
      
      <div className="flex flex-col gap-3 border-b border-zinc-200/80 px-4 py-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            size={14}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Buscar por número do pedido, cliente, CNPJ, NF-e…"
            className="h-9 w-full rounded-[6px] border border-zinc-200 bg-white/88 pl-8 pr-3 text-sm text-zinc-950 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.85)] placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={Filter} size="sm">
            Filtros avançados
            {hasFilters && (
              <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">
                {[
                  status !== "all" && "s",
                  carrier !== "all" && "c",
                  period !== "30" && "p",
                ].filter(Boolean).length}
              </span>
            )}
          </Button>
          <Button variant="secondary" icon={Download} size="sm">
            Exportar
          </Button>
          <Button variant="primary" icon={Plus} size="sm" onClick={openNewOrder}>
            Novo pedido
          </Button>
        </div>
      </div>

      
      <div className="flex flex-wrap items-center gap-2 px-4 py-2.5">
        <FilterSelect
          label="Status"
          value={status}
          onChange={onStatus}
          options={[
            { value: "all", label: "Todos os status" },
            ...ordersStatuses.map((s) => ({ value: s.label, label: s.label })),
          ]}
        />
        <FilterSelect
          label="Transportadora"
          value={carrier}
          onChange={onCarrier}
          options={[
            { value: "all", label: "Todas" },
            ...carriers.map((c) => ({ value: c, label: c })),
          ]}
        />
        <FilterSelect
          label="Período"
          value={period}
          onChange={onPeriod}
          options={[
            { value: "7", label: "Últimos 7 dias" },
            { value: "30", label: "Últimos 30 dias" },
            { value: "90", label: "Últimos 90 dias" },
            { value: "ytd", label: "Ano até agora" },
          ]}
        />
        {hasFilters && (
          <button
            onClick={() => {
              onStatus("all");
              onCarrier("all");
              onPeriod("30");
            }}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
          >
            <X size={12} strokeWidth={2} />
            Limpar filtros
          </button>
        )}
        <div className="ml-auto text-xs text-zinc-500">
          <span className="font-medium text-zinc-950 tabular-nums">{total}</span>{" "}
          pedidos encontrados
        </div>
      </div>

      
      {selectedCount > 0 && (
        <div className="selection-action-bar flex items-center justify-between border-t border-blue-200 bg-blue-50 px-4 py-2 text-xs">
          <p className="font-medium text-blue-900">
            {selectedCount} pedido{selectedCount > 1 ? "s" : ""} selecionado
            {selectedCount > 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={onAddSelectedToDemand}
              className="demand-add-burst inline-flex items-center gap-1 rounded px-2 py-1 font-medium text-blue-700 hover:bg-blue-100"
            >
              <ListPlus size={12} strokeWidth={2} />
              Adicionar à demanda
            </button>
            <button className="rounded px-2 py-1 font-medium text-blue-700 hover:bg-blue-100">
              Atribuir transportadora
            </button>
            <button className="rounded px-2 py-1 font-medium text-blue-700 hover:bg-blue-100">
              Gerar CTe em lote
            </button>
            <button className="rounded px-2 py-1 font-medium text-red-700 hover:bg-red-100">
              Cancelar
            </button>
            <button
              onClick={onClearSelection}
              className="ml-1 rounded p-1 text-blue-700 hover:bg-blue-100"
              aria-label="Limpar seleção"
            >
              <X size={12} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="inline-flex items-center gap-1.5">
      <span className="text-[11px] font-medium text-zinc-500">{label}:</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-7 cursor-pointer appearance-none rounded-md border border-zinc-200 bg-white pl-2 pr-6 text-xs font-medium text-zinc-700 hover:bg-zinc-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          )}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-400"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
  );
}
