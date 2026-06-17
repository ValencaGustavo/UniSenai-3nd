import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import StatusPill from "../ui/StatusPill.jsx";
import { cn, formatBRL } from "../../lib/utils.js";

export default function OrdersTable({
  rows,
  selected,
  onToggleRow,
  onToggleAll,
  onRowClick,
  page,
  pageSize,
  totalRows,
  onPageChange,
}) {
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const someSelected = rows.some((r) => selected.has(r.id)) && !allSelected;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalRows);

  return (
    <section className="surface scanline overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-hairline bg-zinc-950 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-300">
              <th className="w-10 px-4 py-2.5">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={onToggleAll}
                  className="h-3.5 w-3.5 cursor-pointer rounded border-zinc-300 text-blue-600 focus:ring-blue-600/30"
                />
              </th>
              <th className="px-3 py-2.5 font-medium">Pedido</th>
              <th className="hidden px-3 py-2.5 font-medium md:table-cell">Cliente</th>
              <th className="hidden px-3 py-2.5 font-medium lg:table-cell">Rota</th>
              <th className="hidden px-3 py-2.5 font-medium xl:table-cell">Transportadora</th>
              <th className="px-3 py-2.5 font-medium">Status</th>
              <th className="px-3 py-2.5 text-right font-medium">Valor</th>
              <th className="hidden px-3 py-2.5 text-right font-medium sm:table-cell">Previsão</th>
              <th className="w-10 px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map((r) => {
              const isSelected = selected.has(r.id);
              return (
                <tr
                  key={r.id}
                  onClick={() => onRowClick(r)}
                  className={cn(
                    "orders-table-row cursor-pointer transition-all duration-200",
                    isSelected
                      ? "orders-row-selected bg-blue-50/70 shadow-[inset_3px_0_0_var(--color-brand)] hover:bg-blue-50"
                      : "hover:bg-white/80 hover:shadow-[inset_3px_0_0_var(--color-brand)]"
                  )}
                >
                  <td className="px-4 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleRow(r.id)}
                      className="h-3.5 w-3.5 cursor-pointer rounded border-zinc-300 text-blue-600 focus:ring-blue-600/30"
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-blue-500" aria-hidden />
                      <span className="font-mono text-xs font-semibold tracking-tight text-zinc-950">
                        {r.id}
                      </span>
                    </div>
                    <div className="ml-2.5 font-mono text-[10px] text-zinc-400">{r.nfe}</div>
                  </td>
                  <td className="hidden px-3 py-2.5 md:table-cell">
                    <div className="text-zinc-950">{r.cliente}</div>
                    <div className="text-[11px] text-zinc-500 tabular-nums">{r.cnpj}</div>
                  </td>
                  <td className="hidden px-3 py-2.5 lg:table-cell">
                    <div className="text-zinc-700">
                      {r.origem} <span className="text-zinc-400">→</span> {r.destino}
                    </div>
                    <div className="text-[11px] text-zinc-500">{r.rodovia}</div>
                  </td>
                  <td className="hidden px-3 py-2.5 text-zinc-700 xl:table-cell">
                    {r.transportadora}
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusPill status={r.status} />
                  </td>
                  <td className="px-3 py-2.5 text-right font-medium text-zinc-950 tabular-nums">
                    {formatBRL(r.valor)}
                  </td>
                  <td className="hidden px-3 py-2.5 text-right text-xs text-zinc-600 tabular-nums sm:table-cell">
                    {r.previsao}
                  </td>
                  <td
                    className="px-4 py-2.5 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                      aria-label="Mais opções"
                    >
                      <MoreHorizontal size={14} strokeWidth={2} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center">
                  <p className="text-sm font-medium text-zinc-950">
                    Nenhum pedido encontrado
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Ajuste os filtros ou a busca para ver mais resultados.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-2.5">
        <p className="text-xs text-zinc-600">
          Exibindo <span className="font-medium tabular-nums">{start}</span>–
          <span className="font-medium tabular-nums">{end}</span> de{" "}
          <span className="font-medium tabular-nums">{totalRows}</span>
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Anterior"
          >
            <ChevronLeft size={13} strokeWidth={2} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={cn(
                  "h-7 min-w-7 rounded-md border px-2 text-xs font-medium tabular-nums",
                  p === page
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                )}
              >
                {p}
              </button>
            );
          })}
          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Próxima"
          >
            <ChevronRight size={13} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
