import { Download, FileText, MapPinned, UsersRound } from "lucide-react";
import PageActionBar from "../components/ui/PageActionBar.jsx";
import MetricTile from "../components/ui/MetricTile.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";

const REPORTS = [
  {
    id: "REL-2026-06-13-01",
    title: "PDFs processados no dia",
    type: "Importação",
    total: "31 PDFs",
    status: "Pronto",
  },
  {
    id: "REL-2026-06-13-02",
    title: "Clientes cadastrados automaticamente",
    type: "Clientes",
    total: "28 clientes",
    status: "Pronto",
  },
  {
    id: "REL-2026-06-13-03",
    title: "Cálculos de distância e frete",
    type: "Frete",
    total: "42 rotas",
    status: "Pronto",
  },
];

export default function Reports() {
  return (
    <div className="app-page app-page--reports space-y-4">
      <PageActionBar
        eyebrow="exportação"
        title="Relatórios em PDF"
        meta="Histórico simples do que foi importado, cadastrado e calculado"
        icon={FileText}
        actions={
          <Button variant="secondary" icon={Download} size="md">
            Exportar relatório geral
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetricTile label="PDFs no relatório" value="31" icon={FileText} tone="hazard" meta="hoje" spark={[8, 13, 19, 24, 31]} />
        <MetricTile label="Clientes incluídos" value="28" icon={UsersRound} tone="good" meta="auto" spark={[6, 11, 17, 23, 28]} />
        <MetricTile label="Rotas calculadas" value="42" icon={MapPinned} tone="brand" meta="km" spark={[9, 16, 24, 33, 42]} />
      </div>

      <section className="surface panel-enter overflow-hidden">
        <header className="border-b border-hairline px-5 py-4">
          <h2 className="font-display text-[15px] font-semibold text-zinc-950">
            Histórico de exportações
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            Relatórios operacionais para baixar e apresentar.
          </p>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-950 text-left text-[11px] uppercase tracking-wider text-zinc-300">
                <th className="px-4 py-2 font-medium">Código</th>
                <th className="px-3 py-2 font-medium">Relatório</th>
                <th className="px-3 py-2 font-medium">Tipo</th>
                <th className="px-3 py-2 font-medium">Total</th>
                <th className="px-4 py-2 text-right font-medium">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {REPORTS.map((report) => (
                <tr key={report.id} className="hover:bg-zinc-50/70">
                  <td className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                    {report.id}
                  </td>
                  <td className="px-3 py-3 font-semibold text-zinc-950">{report.title}</td>
                  <td className="px-3 py-3 text-xs text-zinc-600">{report.type}</td>
                  <td className="px-3 py-3 font-mono text-xs font-semibold text-zinc-950">{report.total}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Badge variant="green" dot>{report.status}</Badge>
                      <Button variant="secondary" icon={Download} size="sm">
                        PDF
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
