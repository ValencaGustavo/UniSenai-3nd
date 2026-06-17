import { Download, MapPinned, Search, ShieldCheck, UsersRound } from "lucide-react";
import PageActionBar from "../components/ui/PageActionBar.jsx";
import MetricTile from "../components/ui/MetricTile.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";

const CLIENTS = [
  {
    name: "Novo Cliente Londrina Ltda.",
    cnpj: "18.742.901/0001-22",
    city: "Londrina/PR",
    lastRoute: "Londrina/PR → Curitiba/PR",
    distance: "389 km",
    source: "PDF-10301",
    status: "Validado",
  },
  {
    name: "Mercado Central de Salvador",
    cnpj: "11.998.001/0001-77",
    city: "Salvador/BA",
    lastRoute: "Londrina/PR → Salvador/BA",
    distance: "2.256 km",
    source: "PDF-10302",
    status: "Validado",
  },
  {
    name: "Distribuidora Rio Norte S.A.",
    cnpj: "44.553.221/0001-12",
    city: "Rio de Janeiro/RJ",
    lastRoute: "Rio de Janeiro/RJ → Belo Horizonte/MG",
    distance: "441 km",
    source: "PDF-10303",
    status: "Validado",
  },
  {
    name: "Padaria Pão Quente Ltda.",
    cnpj: "22.110.554/0001-43",
    city: "Maringá/PR",
    lastRoute: "Londrina/PR → Maringá/PR",
    distance: "99 km",
    source: "PDF-10304",
    status: "Revisar",
  },
];

export default function Clients() {
  return (
    <div className="app-page space-y-4">
      <PageActionBar
        eyebrow="base automática"
        title="Clientes vindos dos PDFs"
        meta="Cadastro disponível · funcionário apenas confere quando necessário"
        icon={UsersRound}
        actions={
          <Button variant="secondary" icon={Download} size="md">
            Exportar base
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetricTile label="Clientes na base" value="128" icon={UsersRound} tone="brand" meta="ativo" spark={[80, 92, 106, 118, 128]} />
        <MetricTile label="CNPJs validados" value="124" icon={ShieldCheck} tone="good" meta="97%" spark={[70, 84, 100, 114, 124]} />
        <MetricTile label="Rotas com distância" value="119" icon={MapPinned} tone="hazard" meta="auto" spark={[62, 77, 91, 104, 119]} />
      </div>

      <section className="surface panel-enter overflow-hidden">
        <header className="flex flex-col gap-3 border-b border-hairline px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-[15px] font-semibold text-zinc-950">
              Base de clientes
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500">
              Dados cadastrados automaticamente após leitura do PDF.
            </p>
          </div>
          <div className="flex h-9 min-w-0 items-center gap-2 rounded-[6px] border border-zinc-200 bg-white px-3 text-xs text-zinc-500 lg:w-[320px]">
            <Search size={14} strokeWidth={1.8} />
            <span className="truncate">Buscar por cliente, CNPJ ou cidade...</span>
          </div>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-950 text-left text-[11px] uppercase tracking-wider text-zinc-300">
                <th className="px-4 py-2 font-medium">Cliente</th>
                <th className="px-3 py-2 font-medium">Cidade</th>
                <th className="px-3 py-2 font-medium">Última rota</th>
                <th className="px-3 py-2 font-medium">Distância</th>
                <th className="px-3 py-2 font-medium">Origem</th>
                <th className="px-4 py-2 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {CLIENTS.map((client) => (
                <tr key={client.cnpj} className="hover:bg-zinc-50/70">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-zinc-950">{client.name}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-zinc-500">{client.cnpj}</p>
                  </td>
                  <td className="px-3 py-3 text-xs font-medium text-zinc-700">{client.city}</td>
                  <td className="px-3 py-3 text-xs text-zinc-600">{client.lastRoute}</td>
                  <td className="px-3 py-3 font-mono text-xs font-semibold text-zinc-950">{client.distance}</td>
                  <td className="px-3 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">{client.source}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant={client.status === "Validado" ? "green" : "amber"} dot>
                      {client.status}
                    </Badge>
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
