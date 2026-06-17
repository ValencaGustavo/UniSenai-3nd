import { CheckCircle2, Clock, MapPinned, Truck } from "lucide-react";
import Badge from "../ui/Badge.jsx";

const RESULTS = [
  { name: "Jamef", price: "R$ 132", term: "4 dias", note: "Mais barato", variant: "green" },
  { name: "Braspress", price: "R$ 142", term: "3 dias", note: "Equilíbrio", variant: "blue" },
  { name: "Loggi", price: "R$ 168", term: "2 dias", note: "Mais rápido", variant: "amber" },
];

export default function CarrierComparison() {
  return (
    <section className="panel-enter surface scanline">
      <header className="flex flex-col gap-3 border-b border-hairline px-5 py-3.5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[13px] font-semibold text-zinc-950">
            Resultado do cálculo
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            Londrina/PR → Curitiba/PR · 389 km calculados
          </p>
        </div>
        <Badge variant="green" dot>Distância automática</Badge>
      </header>

      <div className="grid grid-cols-1 gap-px bg-zinc-200/70 sm:grid-cols-3">
        <CalcInfo icon={MapPinned} label="Distância" value="389 km" />
        <CalcInfo icon={Truck} label="Carga" value="120 kg · 8 volumes" />
        <CalcInfo icon={CheckCircle2} label="Base" value="Tabela mai/2026" />
      </div>

      <ul className="divide-y divide-zinc-100">
        {RESULTS.map((item, index) => (
          <li key={item.name} className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-zinc-50/60 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-zinc-950">{item.name}</p>
                {index === 0 && <Badge variant="green" dot>Recomendado</Badge>}
              </div>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-500">
                <Clock size={11} strokeWidth={1.8} />
                Prazo estimado: {item.term}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={item.variant}>{item.note}</Badge>
              <p className="font-display text-[22px] font-semibold tabular-nums text-zinc-950">{item.price}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-zinc-200 bg-zinc-50 px-5 py-3 text-xs text-zinc-600">
        A lista acima é uma estimativa baseada na distância calculada, peso, volumes e tabela de frete configurada.
      </div>
    </section>
  );
}

function CalcInfo({ icon: Icon, label, value }) {
  return (
    <div className="bg-white px-4 py-3">
      <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">
        <Icon size={11} strokeWidth={1.9} />
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-zinc-950">{value}</p>
    </div>
  );
}
