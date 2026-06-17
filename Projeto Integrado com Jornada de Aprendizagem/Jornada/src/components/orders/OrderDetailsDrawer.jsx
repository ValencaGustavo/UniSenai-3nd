import { useEffect } from "react";
import {
  X,
  Truck,
  FileText,
  MapPin,
  Package,
  User2,
  Phone,
  Printer,
  Copy,
} from "lucide-react";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";
import { formatBRL, formatNumber } from "../../lib/utils.js";

export default function OrderDetailsDrawer({ order, onClose }) {
  useEffect(() => {
    if (!order) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [order, onClose]);

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-40">
      
      <div
        className="absolute inset-0 bg-zinc-950/30 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden
      />

      
      <aside
        role="dialog"
        aria-label={`Detalhes do pedido ${order.id}`}
        className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col border-l border-zinc-200 bg-white shadow-xl"
      >
        
        <header className="flex items-start justify-between border-b border-zinc-200 px-5 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs font-semibold text-zinc-950">
                {order.id}
              </p>
              <Badge variant={order.statusVariant} dot>
                {order.status}
              </Badge>
            </div>
            <p className="mt-0.5 truncate text-sm font-semibold text-zinc-950">
              {order.cliente}
            </p>
            <p className="text-xs text-zinc-500 tabular-nums">{order.cnpj}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-zinc-200 p-1.5 text-zinc-500 hover:bg-zinc-50"
            aria-label="Fechar"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </header>

        
        <div className="flex-1 overflow-y-auto">
          
          <div className="grid grid-cols-3 gap-px border-b border-zinc-200 bg-zinc-200">
            <Stat label="Valor da carga" value={formatBRL(order.valor)} />
            <Stat label="Peso bruto" value={`${order.peso} kg`} />
            <Stat label="Volumes" value={formatNumber(order.volumes)} />
          </div>

          
          <Section title="Rota" icon={MapPin}>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex flex-col items-center">
                <span className="h-2 w-2 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                <span className="my-1 h-8 w-px bg-zinc-200" />
                <span className="h-2 w-2 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
              </div>
              <div className="flex-1 text-sm">
                <p className="font-medium text-zinc-950">{order.origem}</p>
                <p className="text-xs text-zinc-500">Coleta · {order.emissao}</p>
                <p className="mt-3 font-medium text-zinc-950">{order.destino}</p>
                <p className="text-xs text-zinc-500">Previsão · {order.previsao}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-md bg-zinc-50 px-3 py-2 text-xs text-zinc-600">
              <span className="font-medium text-zinc-700">{order.rodovia}</span>
              <span className="text-zinc-300">·</span>
              <span>Modalidade {order.pagamento}</span>
            </div>
          </Section>

          
          <Section title="Transportadora & motorista" icon={Truck}>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <Field label="Transportadora" value={order.transportadora} />
              <Field label="Placa" value={order.placa} mono />
              {order.cotacaoSelecionada && (
                <>
                  <Field
                    label="Cotação selecionada"
                    value={formatBRL(order.cotacaoSelecionada.valor)}
                  />
                  <Field
                    label="Prazo cotado"
                    value={`${order.cotacaoSelecionada.prazoDias} dia${
                      order.cotacaoSelecionada.prazoDias === 1 ? "" : "s"
                    }`}
                  />
                </>
              )}
              <Field
                label="Motorista"
                value={
                  <span className="inline-flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[9px] font-semibold text-zinc-700">
                      {order.motorista
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    {order.motorista}
                  </span>
                }
              />
              <Field
                label="Contato"
                value={
                  <span className="inline-flex items-center gap-1 text-blue-600">
                    <Phone size={12} strokeWidth={1.75} /> (11) 9 4421-7080
                  </span>
                }
              />
            </dl>
          </Section>

          
          <Section title="Documentação" icon={FileText}>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <Field label="Nota fiscal" value={order.nfe} />
              {order.tipoOperacao && (
                <Field label="Tipo de operação" value={order.tipoOperacao} />
              )}
              {order.prioridade && (
                <Field label="Prioridade" value={order.prioridade} />
              )}
              <Field
                label="CTe"
                value={
                  order.cte === "—" ? (
                    <Badge variant="amber" dot>
                      Pendente
                    </Badge>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-zinc-700">
                      {order.cte}
                      <button
                        className="rounded p-0.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                        aria-label="Copiar"
                      >
                        <Copy size={11} strokeWidth={2} />
                      </button>
                    </span>
                  )
                }
              />
            </dl>
          </Section>

          
          <Section title={`Itens da carga (${order.itens.length})`} icon={Package}>
            <ul className="divide-y divide-zinc-100 rounded-md border border-zinc-200">
              {order.itens.map((it) => (
                <li
                  key={it.sku}
                  className="flex items-center justify-between px-3 py-2 text-xs"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-zinc-950">
                      {it.descricao}
                    </p>
                    <p className="font-mono text-[11px] text-zinc-500">
                      {it.sku}
                      {it.pesoTotal ? ` · ${it.pesoTotal} kg` : ""}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="block font-medium text-zinc-700 tabular-nums">
                      {formatNumber(it.qtd)} un
                    </span>
                    {it.valorTotal && (
                      <span className="text-[11px] text-zinc-500">
                        {formatBRL(it.valorTotal)}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          
          <Section title="Cliente" icon={User2}>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <Field label="Razão social" value={order.cliente} />
              <Field label="CNPJ" value={order.cnpj} mono />
              {order.contato && <Field label="Contato" value={order.contato} />}
              {order.telefone && (
                <Field
                  label="Telefone"
                  value={
                    <span className="inline-flex items-center gap-1 text-blue-600">
                      <Phone size={12} strokeWidth={1.75} /> {order.telefone}
                    </span>
                  }
                />
              )}
              {order.email && <Field label="E-mail" value={order.email} />}
              {order.cidadeUf && <Field label="Cidade/UF" value={order.cidadeUf} />}
              {order.tipoCliente && (
                <Field label="Tipo de cliente" value={order.tipoCliente} />
              )}
              {order.vendedor && <Field label="Vendedor" value={order.vendedor} />}
              {order.limiteCredito ? (
                <Field
                  label="Limite de crédito"
                  value={formatBRL(order.limiteCredito)}
                />
              ) : null}
              {order.observacoes && (
                <div className="col-span-2">
                  <Field label="Observações" value={order.observacoes} />
                </div>
              )}
            </dl>
          </Section>
        </div>

        
        <footer className="flex items-center justify-between gap-2 border-t border-zinc-200 bg-zinc-50 px-5 py-3">
          <Button variant="secondary" icon={Printer} size="sm">
            Imprimir
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              Editar
            </Button>
            <Button variant="primary" size="sm">
              Rastrear entrega
            </Button>
          </div>
        </footer>
      </aside>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white px-4 py-3">
      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-zinc-950 tabular-nums">
        {value}
      </p>
    </div>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <section className="border-b border-zinc-200 px-5 py-4">
      <h3 className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        <Icon size={12} strokeWidth={2} className="text-zinc-400" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function Field({ label, value, mono = false }) {
  return (
    <div>
      <dt className="text-[11px] text-zinc-500">{label}</dt>
      <dd
        className={
          "mt-0.5 text-sm text-zinc-950 " + (mono ? "font-mono text-xs" : "")
        }
      >
        {value}
      </dd>
    </div>
  );
}
