import { topRoutes } from "../../data/mockData.js";
import { formatBRL, formatNumber } from "../../lib/utils.js";

export default function TopRoutesTable() {
  const max = Math.max(...topRoutes.map((r) => r.share));
  return (
    <section className="premium-panel panel-enter overflow-hidden rounded-[6px]">
      <header className="flex items-start justify-between border-b border-zinc-200 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-950">
            Top rotas por receita
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            Cinco rotas com maior representatividade no período
          </p>
        </div>
        <button className="rounded-md border border-zinc-200 px-2 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-50">
          Ver todas (47)
        </button>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-950 text-left text-[11px] uppercase tracking-wider text-zinc-300">
              <th className="px-5 py-2 font-medium">Rota</th>
              <th className="px-3 py-2 text-right font-medium">Pedidos</th>
              <th className="px-3 py-2 text-right font-medium">Receita</th>
              <th className="px-5 py-2 font-medium">Participação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {topRoutes.map((r) => (
              <tr key={r.rota} className="transition-colors hover:bg-white/80">
                <td className="px-5 py-2.5 text-sm text-zinc-950">{r.rota}</td>
                <td className="px-3 py-2.5 text-right text-sm text-zinc-700 tabular-nums">
                  {formatNumber(r.pedidos)}
                </td>
                <td className="px-3 py-2.5 text-right text-sm font-medium text-zinc-950 tabular-nums">
                  {formatBRL(r.receita)}
                </td>
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${(r.share / max) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-zinc-700 tabular-nums">
                      {r.share.toFixed(1)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
