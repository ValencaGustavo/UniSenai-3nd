import { CheckCircle2, FileText, MapPinned, MoreHorizontal, UsersRound } from "lucide-react";
import Badge from "../ui/Badge.jsx";

const DOCUMENTS = [
  {
    id: "PDF-10301",
    file: "cliente-londrina-curitiba-10301.pdf",
    client: "Novo Cliente Londrina Ltda.",
    route: "Londrina/PR → Curitiba/PR",
    distance: "389 km",
    status: "Cliente gerado",
    variant: "green",
  },
  {
    id: "PDF-10302",
    file: "mercado-salvador-carga.pdf",
    client: "Mercado Central de Salvador",
    route: "Londrina/PR → Salvador/BA",
    distance: "2.256 km",
    status: "Rota calculada",
    variant: "blue",
  },
  {
    id: "PDF-10303",
    file: "distribuidora-rio-norte.pdf",
    client: "Distribuidora Rio Norte S.A.",
    route: "Rio de Janeiro/RJ → Belo Horizonte/MG",
    distance: "441 km",
    status: "Validado",
    variant: "green",
  },
  {
    id: "PDF-10304",
    file: "padaria-pao-quente.pdf",
    client: "Padaria Pão Quente Ltda.",
    route: "Londrina/PR → Maringá/PR",
    distance: "99 km",
    status: "Conferir CNPJ",
    variant: "amber",
  },
];

export default function RecentUploads() {
  return (
    <section className="panel-enter surface">
      <header className="flex items-center justify-between border-b border-hairline px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="head-rule w-8" />
          <div>
            <h2 className="font-display text-[14px] font-semibold text-zinc-950">
              PDFs processados
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
              Cliente · rota · distância calculada
            </p>
          </div>
        </div>
        <button className="rounded-[5px] border border-zinc-200 bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-700 hover:bg-zinc-50">
          Ver histórico
        </button>
      </header>

      <ul className="divide-y divide-zinc-100">
        {DOCUMENTS.map((doc) => (
          <li key={doc.id} className="group relative px-5 py-4 transition-colors hover:bg-zinc-50/60">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[7px] border border-red-100 bg-red-50 text-[color:var(--color-hazard)]">
                <FileText size={18} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-semibold text-zinc-950">{doc.file}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">
                      {doc.id}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Badge variant={doc.variant} dot>{doc.status}</Badge>
                    <button
                      className="rounded p-1 text-zinc-400 opacity-0 transition-opacity hover:bg-zinc-100 hover:text-zinc-700 group-hover:opacity-100"
                      aria-label="Mais"
                    >
                      <MoreHorizontal size={13} strokeWidth={2} />
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <Info icon={UsersRound} label="Cliente" value={doc.client} />
                  <Info icon={MapPinned} label="Rota" value={doc.route} />
                  <Info icon={CheckCircle2} label="Distância" value={doc.distance} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[6px] border border-zinc-200 bg-white px-3 py-2">
      <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-zinc-400">
        <Icon size={11} strokeWidth={1.9} />
        {label}
      </p>
      <p className="mt-1 truncate text-[12px] font-semibold text-zinc-800">{value}</p>
    </div>
  );
}
