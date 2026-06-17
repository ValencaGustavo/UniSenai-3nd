import { useEffect, useMemo, useState } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Archive,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Download,
  GripVertical,
  MousePointer2,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";
import StatusPill from "../ui/StatusPill.jsx";
import { cn, formatBRL, formatNumber } from "../../lib/utils.js";
import { useNewOrder } from "./NewOrderContext.jsx";
import { exportDemandRomaneio } from "../../lib/demandPdf.js";

const MIN_VISIBLE_ROWS = 5;

function getTotals(orders) {
  return orders.reduce(
    (total, order) => ({
      value: total.value + (Number(order.valor) || 0),
      weight: total.weight + (Number(order.peso) || 0),
      volumes: total.volumes + (Number(order.volumes) || 0),
    }),
    { value: 0, weight: 0, volumes: 0 }
  );
}

function formatDateTime(value) {
  if (!value) return "em montagem";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function plural(count, singular, pluralText) {
  return `${count} ${count === 1 ? singular : pluralText}`;
}

export default function DemandPanel() {
  const {
    activeDemand,
    activeDemandId,
    activeDemandCreatedAt,
    demandHistory,
    removeOrderFromDemand,
    reorderActiveDemand,
    finalizeDemand,
    deleteDemand,
  } = useNewOrder();
  const [expanded, setExpanded] = useState(() => new Set());
  const [historyOpen, setHistoryOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeDragId, setActiveDragId] = useState(null);
  const activeTotals = useMemo(() => getTotals(activeDemand), [activeDemand]);
  const hasActiveDemand = activeDemand.length > 0;
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!successMessage) return undefined;
    const timeout = window.setTimeout(() => setSuccessMessage(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [successMessage]);

  function exportActiveDemand() {
    if (!hasActiveDemand) return;
    exportDemandRomaneio({
      id: activeDemandId,
      createdAt: activeDemandCreatedAt,
      origin: "Londrina/PR",
      orders: activeDemand,
    });
  }

  function handleFinalize() {
    if (!hasActiveDemand) return;
    const confirmed = window.confirm(
      `Finalizar a demanda ${activeDemandId} com ${activeDemand.length} pedido(s)?`
    );

    if (!confirmed) return;
    const finalized = finalizeDemand();
    if (finalized?.id) {
      setSuccessMessage(`Demanda ${finalized.id} finalizada e arquivada.`);
      setHistoryOpen(true);
    }
  }

  function handleDragStart(event) {
    setActiveDragId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveDragId(null);

    if (!over || active.id === over.id) return;

    reorderActiveDemand(active.id, over.id);
    setSuccessMessage("Prioridade atualizada.");
  }

  function handleDragCancel() {
    setActiveDragId(null);
  }

  function handleDeleteDemand(demand) {
    const confirmed = window.confirm(
      `Excluir a demanda ${demand.id} do histórico? Essa ação não altera os pedidos.`
    );
    if (confirmed) deleteDemand(demand.id);
  }

  function toggleDemand(demandId) {
    setExpanded((current) => {
      const next = new Set(current);
      next.has(demandId) ? next.delete(demandId) : next.add(demandId);
      return next;
    });
  }

  return (
    <section className="premium-panel panel-enter overflow-hidden rounded-[7px]">
      <div className="relative bg-[linear-gradient(135deg,rgb(255_255_255_/_0.96),rgb(248_250_252_/_0.94))] p-3 sm:p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.38]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(31 79 143 / 0.045) 1px, transparent 1px), linear-gradient(0deg, rgb(31 79 143 / 0.035) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative flex flex-col gap-4 xl:grid xl:grid-cols-[minmax(0,1fr)_230px] xl:items-start">
          <div className="min-w-0">
            <SheetHeader
              demandId={activeDemandId}
              activeCount={activeDemand.length}
              createdAt={activeDemandCreatedAt}
              successMessage={successMessage}
            />

            <DemandSheetTable
              orders={activeDemand}
              onRemove={removeOrderFromDemand}
              sensors={sensors}
              activeDragId={activeDragId}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            />

            <DemandSummary
              totals={activeTotals}
              activeCount={activeDemand.length}
              demandId={activeDemandId}
            />
          </div>

          <DemandSideActions
            hasActiveDemand={hasActiveDemand}
            activeCount={activeDemand.length}
            onFinalize={handleFinalize}
            onExport={exportActiveDemand}
          />
        </div>
      </div>

      <HistoryPanel
        historyOpen={historyOpen}
        setHistoryOpen={setHistoryOpen}
        demandHistory={demandHistory}
        expanded={expanded}
        onToggleDemand={toggleDemand}
        onDeleteDemand={handleDeleteDemand}
      />
    </section>
  );
}

function SheetHeader({ demandId, activeCount, createdAt, successMessage }) {
  return (
    <header className="relative mb-3 flex flex-col gap-2 border-b border-zinc-200/80 pb-3 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-[color:var(--color-alarm)]" />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-alarm)]">
            demanda operacional
          </p>
        </div>
        <h2 className="mt-1 text-base font-semibold text-zinc-950">
          Demanda do dia
        </h2>
        <p className="mt-0.5 text-xs text-zinc-500">
          {demandId} · Londrina/PR · {plural(activeCount, "pedido", "pedidos")}{" "}
          em montagem · início {formatDateTime(createdAt)}
        </p>
      </div>

      <div className="flex flex-col gap-1.5 md:items-end">
        {successMessage && (
          <div className="demand-success-pulse inline-flex items-center gap-2 rounded-[6px] border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-[0_8px_20px_-18px_rgb(16_185_129_/_0.75)]">
            <CheckCircle2 size={13} strokeWidth={2} />
            {successMessage}
          </div>
        )}
        {activeCount > 1 && (
          <p className="inline-flex items-center gap-1.5 rounded-[6px] border border-blue-100 bg-blue-50/70 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-700">
            <MousePointer2 size={12} strokeWidth={2} />
            segure e arraste para priorizar
          </p>
        )}
      </div>
    </header>
  );
}

function DemandSheetTable({
  orders,
  onRemove,
  readOnly = false,
  sensors,
  activeDragId,
  onDragStart,
  onDragEnd,
  onDragCancel,
}) {
  const rows = useMemo(() => {
    const minRows = Math.max(MIN_VISIBLE_ROWS, orders.length);
    return Array.from({ length: minRows }, (_, index) => ({
      order: orders[index],
      line: index + 1,
    }));
  }, [orders]);
  const orderIds = useMemo(() => orders.map((order) => order.id), [orders]);
  const canSort = !readOnly && orders.length > 1;

  const table = (
    <div className="demand-sheet-wrap relative overflow-x-auto rounded-[6px] border border-zinc-300/90 bg-white/88 shadow-[0_14px_40px_-32px_rgb(15_23_42_/_0.55)]">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="bg-[linear-gradient(180deg,#f8fafc,#eef3f8)] font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">
            <DemandHeadCell accent="blue">Rotas</DemandHeadCell>
            <DemandHeadCell accent="red">Dados</DemandHeadCell>
            <DemandHeadCell accent="green">Cliente</DemandHeadCell>
            <DemandHeadCell accent="blue">Pedido</DemandHeadCell>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ order, line }) =>
            order && canSort ? (
              <SortableDemandSheetRow
                key={order.id}
                line={line}
                order={order}
                onRemove={onRemove}
                isActiveDrag={activeDragId === order.id}
              />
            ) : (
              <DemandSheetRow
                key={order?.id || `empty-${line}`}
                line={line}
                order={order}
                readOnly={readOnly}
                onRemove={onRemove}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );

  if (!canSort) return table;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <SortableContext items={orderIds} strategy={verticalListSortingStrategy}>
        {table}
      </SortableContext>
    </DndContext>
  );
}

function DemandHeadCell({ accent, children }) {
  const accentClass = {
    blue: "before:bg-blue-600",
    red: "before:bg-[color:var(--color-alarm)]",
    green: "before:bg-emerald-600",
  }[accent];

  return (
    <th className="relative border-b border-r border-zinc-300 px-3 py-2.5 text-left font-semibold last:border-r-0">
      <span
        className={cn(
          "before:absolute before:left-0 before:top-0 before:h-[2px] before:w-full",
          accentClass
        )}
      />
      {children}
    </th>
  );
}

function SortableDemandSheetRow({ line, order, onRemove, isActiveDrag }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: isDragging ? "relative" : undefined,
    zIndex: isDragging ? 20 : undefined,
  };

  return (
    <DemandSheetRow
      line={line}
      order={order}
      onRemove={onRemove}
      dragProps={{
        attributes,
        listeners,
        setNodeRef,
        style,
        isDragging,
        isActiveDrag,
      }}
    />
  );
}

function DemandSheetRow({ line, order, readOnly, onRemove, dragProps }) {
  const isEmpty = !order;
  const isDragging = dragProps?.isDragging || dragProps?.isActiveDrag;

  return (
    <tr
      ref={dragProps?.setNodeRef}
      style={dragProps?.style}
      {...(dragProps?.attributes ?? {})}
      {...(dragProps?.listeners ?? {})}
      className={cn(
        "demand-sortable-row group h-[54px] border-b border-zinc-300/90 transition-[background,box-shadow,filter] duration-300 last:border-b-0",
        isEmpty
          ? "bg-white/56"
          : "cursor-grab bg-white hover:bg-blue-50/35 hover:shadow-[inset_3px_0_0_var(--color-brand)] active:cursor-grabbing",
        isDragging &&
          "demand-row-dragging bg-white shadow-[0_24px_58px_-30px_rgb(31_79_143_/_0.75),inset_4px_0_0_var(--color-brand)]"
      )}
    >
      <DemandBodyCell>
        {isEmpty ? (
          <EmptyLine line={line} label="rota livre" />
        ) : (
          <div className="flex min-w-0 items-center gap-2">
            <DragHandle />
            <LineNumber line={line} active={isDragging} />
            <div className="min-w-0">
              <p className="truncate font-medium text-zinc-950">
                {order.origem} <span className="text-zinc-400">→</span>{" "}
                {order.destino}
              </p>
              <p className="mt-0.5 truncate font-mono text-[10px] text-zinc-500">
                {order.rodovia || "rota a definir"}
              </p>
            </div>
          </div>
        )}
      </DemandBodyCell>

      <DemandBodyCell>
        {isEmpty ? (
          <EmptyLine line={line} label="dados" />
        ) : (
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <StatusPill status={order.status} />
              <span className="font-mono text-[10px] text-zinc-500">
                {order.previsao}
              </span>
            </div>
            <p className="mt-1 truncate text-[11px] text-zinc-500">
              {formatNumber(Number(order.peso) || 0)} kg ·{" "}
              {formatNumber(Number(order.volumes) || 0)} vol.
            </p>
          </div>
        )}
      </DemandBodyCell>

      <DemandBodyCell>
        {isEmpty ? (
          <EmptyLine line={line} label="cliente" />
        ) : (
          <div className="min-w-0">
            <p className="truncate font-medium text-zinc-950">{order.cliente}</p>
            <p className="mt-0.5 truncate font-mono text-[10px] text-zinc-500">
              {order.cnpj}
            </p>
          </div>
        )}
      </DemandBodyCell>

      <DemandBodyCell>
        {isEmpty ? (
          <EmptyLine line={line} label="pedido" />
        ) : (
          <div className="flex min-w-0 items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-mono text-xs font-semibold text-zinc-950">
                {order.id}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-zinc-500">
                NF-e {order.nfe} · {formatBRL(order.valor)}
              </p>
            </div>

            {!readOnly && (
              <button
                onClick={() => onRemove?.(order.id)}
                onMouseDown={(event) => event.stopPropagation()}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] border border-zinc-200 bg-white text-zinc-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                aria-label={`Remover ${order.id} da demanda`}
              >
                <X size={13} strokeWidth={2} />
              </button>
            )}
          </div>
        )}
      </DemandBodyCell>
    </tr>
  );
}

function DemandBodyCell({ children }) {
  return (
    <td className="border-r border-zinc-300/90 px-3 py-2.5 align-middle last:border-r-0">
      {children}
    </td>
  );
}

function DragHandle() {
  return (
    <span
      aria-hidden
      className="demand-drag-handle hidden h-7 w-5 shrink-0 items-center justify-center rounded-[5px] border border-zinc-200 bg-white/90 text-zinc-400 transition group-hover:border-blue-200 group-hover:text-blue-700 sm:inline-flex"
    >
      <GripVertical size={13} strokeWidth={2} />
    </span>
  );
}

function LineNumber({ line, active = false }) {
  return (
    <span
      className={cn(
        "priority-number inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-[4px] border border-blue-200 bg-blue-50 font-mono text-[10px] font-semibold text-blue-700 tabular-nums transition-all duration-300",
        active &&
          "priority-number-active border-[color:var(--color-alarm)] bg-[color:var(--color-alarm)] text-white shadow-[0_0_0_4px_rgb(225_37_46_/_0.12)]"
      )}
    >
      {line}
    </span>
  );
}

function EmptyLine({ line, label }) {
  return (
    <div className="flex items-center gap-2 text-zinc-300">
      {label === "rota livre" && (
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-[4px] border border-zinc-200 bg-zinc-50 font-mono text-[10px] font-semibold text-zinc-400 tabular-nums">
          {line}
        </span>
      )}
      <span className="h-px flex-1 border-t border-dashed border-zinc-300" />
      <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-300 sm:inline">
        {label}
      </span>
    </div>
  );
}

function DemandSummary({ totals, activeCount, demandId }) {
  return (
    <div className="relative mt-3 grid gap-3 md:grid-cols-[minmax(190px,0.8fr)_1fr] md:items-stretch">
      <div className="rounded-[7px] border border-zinc-200 bg-white/90 p-3 shadow-[0_10px_28px_-26px_rgb(15_23_42_/_0.55)]">
        <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          <Sparkles size={11} strokeWidth={2} className="text-blue-600" />
          resumo do dia
        </p>
        <p className="mt-2 text-sm font-semibold text-zinc-950">{demandId}</p>
        <p className="mt-1 text-xs text-zinc-500">
          {activeCount > 0
            ? "Demanda pronta para gerar romaneio."
            : "Aguardando pedidos selecionados ou criados."}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[7px] border border-zinc-200 bg-zinc-200">
        <SummaryStat label="pedidos" value={formatNumber(activeCount)} />
        <SummaryStat label="valor" value={formatBRL(totals.value)} />
        <SummaryStat
          label="peso / vol."
          value={`${formatNumber(totals.weight)} kg · ${formatNumber(totals.volumes)}`}
        />
      </div>
    </div>
  );
}

function SummaryStat({ label, value }) {
  return (
    <div className="bg-white/92 px-3 py-3">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-zinc-950 tabular-nums">
        {value}
      </p>
    </div>
  );
}

function DemandSideActions({
  hasActiveDemand,
  activeCount,
  onFinalize,
  onExport,
}) {
  return (
    <aside className="relative flex flex-col gap-3 rounded-[7px] border border-zinc-200 bg-white/80 p-3 shadow-[0_16px_42px_-34px_rgb(15_23_42_/_0.65)] xl:min-h-[272px]">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
          ações
        </p>
        <p className="mt-1 text-sm font-semibold text-zinc-950">
          Fechamento da demanda
        </p>
        <p className="mt-1 text-xs leading-5 text-zinc-500">
          Use quando as linhas do dia estiverem conferidas.
        </p>
      </div>

      <div className="mt-auto space-y-2">
        <SideAction
          icon={ClipboardCheck}
          label="finalizar demanda"
          meta={
            hasActiveDemand
              ? plural(activeCount, "linha pronta", "linhas prontas")
              : "sem pedidos"
          }
          onClick={onFinalize}
          disabled={!hasActiveDemand}
          primary
        />
        <SideAction
          icon={Download}
          label="gerar pdf"
          meta="romaneio operacional"
          onClick={onExport}
          disabled={!hasActiveDemand}
        />
      </div>
    </aside>
  );
}

function SideAction({
  icon: Icon,
  label,
  meta,
  onClick,
  disabled = false,
  primary = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-[6px] border px-3 py-3 text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45",
        primary
          ? "border-zinc-950 bg-zinc-950 text-white shadow-[0_12px_28px_-22px_rgb(15_23_42_/_0.75)] hover:-translate-y-0.5 hover:bg-zinc-800"
          : "border-zinc-200 bg-white text-zinc-950 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/60"
      )}
    >
      <span>
        <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
          {label}
        </span>
        <span
          className={cn(
            "mt-1 block text-[11px]",
            primary ? "text-zinc-300" : "text-zinc-500"
          )}
        >
          {meta}
        </span>
      </span>
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] border transition",
          primary
            ? "border-white/15 bg-white/10 text-white"
            : "border-zinc-200 bg-white text-blue-700 group-hover:border-blue-200"
        )}
      >
        <Icon size={15} strokeWidth={1.9} />
      </span>
    </button>
  );
}

function HistoryPanel({
  historyOpen,
  setHistoryOpen,
  demandHistory,
  expanded,
  onToggleDemand,
  onDeleteDemand,
}) {
  return (
    <div className="border-t border-zinc-200/80 bg-zinc-50/82">
      <button
        type="button"
        onClick={() => setHistoryOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-white/70"
      >
        <span>
          <span className="flex items-center gap-2 text-sm font-semibold text-zinc-950">
            <Archive size={14} strokeWidth={1.8} className="text-zinc-500" />
            Histórico de demandas
          </span>
          <span className="mt-0.5 block text-xs text-zinc-500">
            Demandas finalizadas ficam arquivadas no navegador deste computador.
          </span>
        </span>
        <span className="flex items-center gap-2">
          <Badge variant="blue">
            {demandHistory.length} finalizada
            {demandHistory.length === 1 ? "" : "s"}
          </Badge>
          <ChevronDown
            size={15}
            strokeWidth={1.9}
            className={cn(
              "text-zinc-500 transition-transform",
              historyOpen && "rotate-180"
            )}
          />
        </span>
      </button>

      {historyOpen && (
        <div className="space-y-2 px-4 pb-4">
          {demandHistory.length === 0 && (
            <div className="rounded-[6px] border border-dashed border-zinc-300 bg-white/70 px-4 py-5 text-center">
              <p className="text-sm font-medium text-zinc-950">
                Nenhuma demanda finalizada ainda
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Finalize a demanda atual para começar o histórico do dia.
              </p>
            </div>
          )}

          {demandHistory.map((demand) => {
            const isOpen = expanded.has(demand.id);
            const totals = getTotals(demand.orders);

            return (
              <article
                key={demand.id}
                className="overflow-hidden rounded-[6px] border border-zinc-200 bg-white shadow-[0_1px_0_rgb(15_23_42_/_0.04)]"
              >
                <div className="flex flex-col gap-3 px-3 py-2.5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="grid flex-1 gap-2 sm:grid-cols-[1.1fr_0.8fr_0.7fr_0.8fr]">
                    <HistoryCell label="demanda" value={demand.id} mono />
                    <HistoryCell
                      label="fechamento"
                      value={formatDateTime(demand.finalizedAt)}
                    />
                    <HistoryCell
                      label="pedidos"
                      value={plural(demand.orders.length, "pedido", "pedidos")}
                    />
                    <HistoryCell label="valor" value={formatBRL(totals.value)} />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={ChevronDown}
                      onClick={() => onToggleDemand(demand.id)}
                      className={cn(isOpen && "bg-blue-50 text-blue-700")}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Download}
                      onClick={() => exportDemandRomaneio(demand)}
                    >
                      PDF
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={Trash2}
                      onClick={() => onDeleteDemand(demand)}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-zinc-200 bg-zinc-50/60 p-3">
                    <DemandSheetTable orders={demand.orders} readOnly />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function HistoryCell({ label, value, mono = false }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </p>
      <p
        className={cn(
          "mt-0.5 text-xs font-semibold text-zinc-950",
          mono && "font-mono"
        )}
      >
        {value}
      </p>
    </div>
  );
}
