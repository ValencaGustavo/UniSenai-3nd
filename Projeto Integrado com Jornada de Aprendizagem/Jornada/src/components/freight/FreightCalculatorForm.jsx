import { Calculator, FileText, MapPinned, Package, RotateCcw, Scale } from "lucide-react";
import Button from "../ui/Button.jsx";

export default function FreightCalculatorForm({ onCalculate }) {
  return (
    <section className="panel-enter surface">
      <header className="flex items-start justify-between border-b border-zinc-200 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-950">
            Cálculo de distância/frete
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            Dados preenchidos pelo PDF, com ajuste manual apenas se precisar.
          </p>
        </div>
        <Button variant="ghost" icon={RotateCcw} size="sm">
          Limpar
        </Button>
      </header>

      <form
        className="space-y-5 p-5"
        onSubmit={(event) => {
          event.preventDefault();
          onCalculate?.();
        }}
      >
        <FieldGroup title="Documento de origem" icon={FileText}>
          <Field label="PDF importado" defaultValue="cliente-londrina-curitiba-10301.pdf" />
        </FieldGroup>

        <FieldGroup title="Origem e destino" icon={MapPinned}>
          <div className="grid grid-cols-1 gap-3 2xl:grid-cols-2">
            <Field label="Origem" defaultValue="Londrina/PR" />
            <Field label="Destino" defaultValue="Curitiba/PR" />
          </div>
        </FieldGroup>

        <FieldGroup title="Carga" icon={Package}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Field label="Peso bruto" suffix="kg" defaultValue="120" />
            <Field label="Volumes" suffix="un" defaultValue="8" />
            <Field label="Valor declarado" prefix="R$" defaultValue="4.280,00" />
          </div>
        </FieldGroup>

        <div className="rounded-[7px] border border-zinc-200 bg-white px-4 py-3">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-[7px] bg-[color:var(--color-brand-tint)] text-[color:var(--color-brand)]">
              <Scale size={17} strokeWidth={1.9} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-zinc-950">Resultado calculado</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <Result label="Distância" value="389 km" />
                <Result label="Pedágio" value="R$ 38" />
                <Result label="Frete base" value="R$ 142" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
          <p className="text-[11px] text-zinc-500">
            O foco aqui é eliminar o cálculo manual de distância.
          </p>
          <Button type="submit" variant="primary" icon={Calculator} size="md">
            Calcular distância
          </Button>
        </div>
      </form>
    </section>
  );
}

function FieldGroup({ title, icon: Icon, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5">
        <Icon size={13} strokeWidth={2} className="text-zinc-400" />
        <h3 className="text-xs font-semibold text-zinc-950">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({ label, suffix, prefix, defaultValue }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-zinc-600">{label}</span>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
            {prefix}
          </span>
        )}
        <input
          type="text"
          defaultValue={defaultValue}
          className={[
            "h-9 w-full rounded-md border border-zinc-200 bg-white text-sm text-zinc-950 tabular-nums focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20",
            prefix ? "pl-8 pr-3" : "px-2.5",
            suffix ? "pr-9" : "",
          ].join(" ")}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-medium text-zinc-400">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function Result({ label, value }) {
  return (
    <div className="rounded-[6px] border border-zinc-200 bg-zinc-50 px-2.5 py-2">
      <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-zinc-400">{label}</p>
      <p className="mt-1 font-mono text-xs font-bold tabular-nums text-zinc-950">{value}</p>
    </div>
  );
}
