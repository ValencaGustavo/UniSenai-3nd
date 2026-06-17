import { AlertTriangle, CheckCircle2, Download, XCircle } from "lucide-react";
import Button from "../ui/Button.jsx";

const CHECKS = [
  { campo: "Cliente", valor: "Novo Cliente Londrina Ltda.", status: "ok" },
  { campo: "CNPJ", valor: "18.742.901/0001-22", status: "ok" },
  { campo: "Origem", valor: "Londrina/PR", status: "ok" },
  { campo: "Destino", valor: "Curitiba/PR", status: "ok" },
  { campo: "CEP destino", valor: "80010-000", status: "ok" },
  { campo: "Peso/volumes", valor: "120 kg · 8 volumes", status: "ok" },
  { campo: "Distância", valor: "389 km calculados", status: "ok" },
  { campo: "E-mail", valor: "não encontrado no PDF", status: "warn" },
];

export default function ValidationDetails() {
  return (
    <section className="premium-panel panel-enter overflow-hidden rounded-[6px]">
      <header className="flex items-start justify-between gap-3 border-b border-zinc-200 px-5 py-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-950">
            Conferência do PDF antes do cadastro
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            O sistema extrai os dados e aponta apenas o que precisa de revisão.
          </p>
        </div>
        <Button variant="secondary" icon={Download} size="sm">
          Exportar conferência
        </Button>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-950 text-left text-[11px] uppercase tracking-wider text-zinc-300">
              <th className="px-4 py-2 font-medium">Campo</th>
              <th className="px-3 py-2 font-medium">Valor extraído</th>
              <th className="w-36 px-4 py-2 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {CHECKS.map((item) => {
              const ok = item.status === "ok";
              return (
                <tr key={item.campo} className={ok ? "hover:bg-emerald-50/20" : "bg-amber-50/30 hover:bg-amber-50/50"}>
                  <td className="px-4 py-2.5 text-xs font-semibold text-zinc-950">
                    {item.campo}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-zinc-700">
                    {item.valor}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={ok ? "inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700" : "inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700"}>
                      {ok ? <CheckCircle2 size={12} strokeWidth={2} /> : <AlertTriangle size={12} strokeWidth={2} />}
                      {ok ? "Pronto" : "Revisar"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-start gap-2 border-t border-zinc-200 bg-zinc-50 px-5 py-3 text-xs text-zinc-500">
        <XCircle size={13} className="mt-0.5 text-zinc-400" />
        Campos ausentes não bloqueiam o cálculo de distância; eles só ficam marcados para completar o cadastro depois.
      </div>
    </section>
  );
}
