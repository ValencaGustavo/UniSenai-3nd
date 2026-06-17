import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Mail,
  MapPin,
  Package,
  Phone,
  Plus,
  RadioTower,
  Route,
  ShieldCheck,
  Sparkles,
  Trash2,
  Truck,
  UserRound,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";
import { cn, formatBRL, formatNumber } from "../../lib/utils.js";

const INITIAL_FORM = {
  cliente: "Ariam Comércio Ltda.",
  cnpj: "18.742.901/0001-22",
  contato: "Adriano Henrique",
  email: "operacao@ariam.com.br",
  telefone: "(43) 9 8842-1102",
  cidadeUf: "Londrina/PR",
  cep: "86010-100",
  vendedor: "Equipe FastAriam",
  tipoCliente: "Recorrente",
  limiteCredito: "50000,00",
  nfe: "NF-e 10301",
  pagamento: "CIF",
  prioridade: "Operação padrão",
  tipoOperacao: "Fracionado",
  origem: "Londrina/PR",
  destino: "Curitiba/PR",
  rodovia: "BR-369 · BR-376",
  previsao: "16/05/2026",
  observacoes: "Separar carga por volumes e confirmar coleta no CD Londrina.",
  transportadora: "",
  itens: [
    {
      id: "item-1",
      sku: "SKU-441",
      descricao: "Carga geral paletizada",
      quantidade: "8",
      pesoUnitario: "15",
      valorUnitario: "535,00",
    },
    {
      id: "item-2",
      sku: "SKU-887",
      descricao: "Caixa de abastecimento comercial",
      quantidade: "4",
      pesoUnitario: "9",
      valorUnitario: "320,00",
    },
  ],
};

const STEPS = [
  { id: "cliente", label: "Cliente", icon: Building2 },
  { id: "itens", label: "Itens", icon: Package },
  { id: "frete", label: "Rota & frete", icon: Route },
  { id: "revisao", label: "Revisão", icon: ClipboardCheck },
];

const QUOTE_PROFILES = [
  { id: "loggi", nome: "Loggi", base: 1.02, prazo: 2, rating: 97, modal: "Rodoviário", badge: "mais rápido" },
  { id: "braspress", nome: "Braspress", base: 0.94, prazo: 3, rating: 95, modal: "Rodoviário", badge: "custo-benefício" },
  { id: "jamef", nome: "Jamef", base: 0.88, prazo: 4, rating: 92, modal: "Rodoviário", badge: "mais barato" },
  { id: "azul", nome: "Azul Cargo", base: 1.34, prazo: 1, rating: 96, modal: "Aéreo", badge: "urgente" },
  { id: "total", nome: "Total Express", base: 0.99, prazo: 3, rating: 91, modal: "Rodoviário", badge: "estável" },
];

function parseMoney(value) {
  const normalized = String(value)
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseNumber(value) {
  const parsed = Number(String(value).replace(",", ".").replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatDateBR(date = new Date()) {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function getDestinationFactor(destino) {
  const value = destino.toLowerCase();
  if (value.includes("maring")) return 0.74;
  if (value.includes("curitiba")) return 1;
  if (value.includes("goi")) return 1.26;
  if (value.includes("rio")) return 1.34;
  if (value.includes("salvador")) return 1.72;
  if (value.includes("recife") || value.includes("fortaleza")) return 1.92;
  return 1.18;
}

function calculateTotals(items) {
  return items.reduce(
    (total, item) => {
      const qty = parseNumber(item.quantidade);
      const weight = parseNumber(item.pesoUnitario);
      const value = parseMoney(item.valorUnitario);

      return {
        value: total.value + qty * value,
        weight: total.weight + qty * weight,
        volumes: total.volumes + qty,
      };
    },
    { value: 0, weight: 0, volumes: 0 }
  );
}

function simulateQuotes(form, totals) {
  const factor = getDestinationFactor(form.destino || "");
  const baseValue = Math.max(96, totals.weight * 0.78 + totals.value * 0.0075);

  return QUOTE_PROFILES.map((profile, index) => {
    const operationFactor =
      form.tipoOperacao === "Aéreo" ? 1.42 : form.tipoOperacao === "Lotação" ? 1.18 : 1;
    const urgencyFactor = form.prioridade === "Alta prioridade" ? 1.14 : 1;
    const valor = Math.round(
      (baseValue * factor * profile.base * operationFactor * urgencyFactor + index * 7) * 100
    ) / 100;
    const prazoDias = Math.max(
      1,
      Math.round(profile.prazo * factor * (form.prioridade === "Alta prioridade" ? 0.82 : 1))
    );

    return {
      ...profile,
      valor,
      prazoDias,
      score: Math.round(valor * 0.6 + prazoDias * 26 - profile.rating * 1.8),
      rota: `${form.origem || "Londrina/PR"} · ${form.rodovia || "rota a definir"}`,
    };
  }).sort((a, b) => a.score - b.score);
}

function buildChecklist(form, totals, selectedQuote) {
  return [
    { id: "cnpj", label: "CNPJ informado", done: form.cnpj.trim().length >= 14 },
    { id: "nfe", label: "NF-e preenchida", done: form.nfe.trim().length > 0 },
    { id: "contato", label: "Contato comercial", done: form.contato.trim().length > 1 && form.telefone.trim().length > 5 },
    { id: "rota", label: "Rota válida", done: form.origem.trim().length > 0 && form.destino.trim().length > 0 },
    { id: "itens", label: "Itens adicionados", done: form.itens.some((item) => item.descricao.trim() && parseNumber(item.quantidade) > 0) },
    { id: "totais", label: "Peso e valor calculados", done: totals.weight > 0 && totals.value > 0 },
    { id: "frete", label: "Frete selecionado", done: Boolean(selectedQuote) },
  ];
}

function makeOrder(form, totals, selectedQuote, quotes, checklist) {
  const suffix = String(Date.now()).slice(-5);
  const normalizedItems = form.itens
    .filter((item) => item.descricao.trim() && parseNumber(item.quantidade) > 0)
    .map((item) => {
      const qtd = parseNumber(item.quantidade);
      const pesoUnitario = parseNumber(item.pesoUnitario);
      const valorUnitario = parseMoney(item.valorUnitario);

      return {
        sku: item.sku || "SKU-NOVO",
        descricao: item.descricao || "Item sem descrição",
        qtd,
        pesoUnitario,
        valorUnitario,
        pesoTotal: qtd * pesoUnitario,
        valorTotal: qtd * valorUnitario,
      };
    });

  return {
    id: `PED-${suffix}`,
    cliente: form.cliente,
    cnpj: form.cnpj,
    origem: form.origem,
    destino: form.destino,
    rodovia: form.rodovia || "BR-369",
    transportadora: selectedQuote?.nome || "A definir",
    valor: totals.value,
    peso: totals.weight,
    volumes: totals.volumes || 1,
    status: "Aguardando coleta",
    statusVariant: "amber",
    cte: "—",
    nfe: form.nfe || "NF-e pendente",
    pagamento: form.pagamento,
    emissao: formatDateBR(),
    previsao: form.previsao,
    motorista: "A definir",
    placa: "LDB-0N26",
    itens: normalizedItems,
    contato: form.contato,
    email: form.email,
    telefone: form.telefone,
    cep: form.cep,
    cidadeUf: form.cidadeUf,
    vendedor: form.vendedor,
    tipoCliente: form.tipoCliente,
    limiteCredito: parseMoney(form.limiteCredito),
    prioridade: form.prioridade,
    tipoOperacao: form.tipoOperacao,
    observacoes: form.observacoes,
    cotacaoSelecionada: selectedQuote,
    cotacoes: quotes,
    checklist,
  };
}

export default function NewOrderModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [stepIndex, setStepIndex] = useState(0);
  const [created, setCreated] = useState(null);

  const totals = useMemo(() => calculateTotals(form.itens), [form.itens]);
  const quotes = useMemo(() => simulateQuotes(form, totals), [form, totals]);
  const selectedQuote = useMemo(
    () => quotes.find((quote) => quote.nome === form.transportadora) || quotes[0],
    [quotes, form.transportadora]
  );
  const checklist = useMemo(
    () => buildChecklist(form, totals, selectedQuote),
    [form, totals, selectedQuote]
  );
  const allValid = checklist.every((item) => item.done);
  const dirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(INITIAL_FORM),
    [form]
  );

  useEffect(() => {
    if (!open) return undefined;
    function onKey(event) {
      if (event.key === "Escape") requestClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (!open) {
      setStepIndex(0);
      setCreated(null);
      setForm(INITIAL_FORM);
    }
  }, [open]);

  if (!open) return null;

  function update(field) {
    return (event) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  function updateItem(itemId, field, value) {
    setForm((current) => ({
      ...current,
      itens: current.itens.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      ),
    }));
  }

  function addItem() {
    setForm((current) => ({
      ...current,
      itens: [
        ...current.itens,
        {
          id: `item-${Date.now()}`,
          sku: `SKU-${String(current.itens.length + 1).padStart(3, "0")}`,
          descricao: "Novo item",
          quantidade: "1",
          pesoUnitario: "5",
          valorUnitario: "180,00",
        },
      ],
    }));
  }

  function removeItem(itemId) {
    setForm((current) => ({
      ...current,
      itens: current.itens.length > 1
        ? current.itens.filter((item) => item.id !== itemId)
        : current.itens,
    }));
  }

  function requestClose() {
    if (!created && dirty) {
      const confirmed = window.confirm("Descartar as alterações deste pedido?");
      if (!confirmed) return;
    }
    onClose();
  }

  function resetFlow() {
    setForm(INITIAL_FORM);
    setStepIndex(0);
    setCreated(null);
  }

  function handleCreate() {
    if (!allValid) return;
    const order = makeOrder(form, totals, selectedQuote, quotes, checklist);
    onCreate(order);
    setCreated(order);
  }

  const step = STEPS[stepIndex];

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-zinc-950/45 backdrop-blur-[5px]"
        onClick={requestClose}
        aria-hidden
      />

      <section
        role="dialog"
        aria-label="Novo pedido"
        className="new-order-cockpit absolute inset-2 mx-auto flex w-[calc(100%-1rem)] max-w-[1180px] flex-col overflow-hidden rounded-[12px] border border-white/70 bg-white shadow-[0_32px_110px_-42px_rgb(15_23_42_/_0.9)] sm:inset-4 sm:w-[calc(100%-2rem)]"
      >
        <header className="relative overflow-hidden border-b border-zinc-200 bg-[linear-gradient(135deg,#ffffff,#f6f8fb)] px-4 py-4 sm:px-5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.44]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(31 79 143 / 0.055) 1px, transparent 1px), linear-gradient(0deg, rgb(31 79 143 / 0.04) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />
          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-[color:var(--color-alarm)]" />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-alarm)]">
                  criação assistida
                </p>
              </div>
              <h2 className="mt-2 font-display text-[28px] font-semibold leading-none text-zinc-950 sm:text-[34px]">
                Novo pedido
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                Monte cliente, itens, rota e frete em uma esteira única. Ao confirmar,
                o pedido entra automaticamente na Demanda do dia.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <HeaderStat icon={RadioTower} label="SLA" value="1.8s" />
              <HeaderStat icon={Truck} label="Frete" value="5 cotações" />
              <button
                onClick={requestClose}
                className="grid h-9 w-9 place-items-center rounded-[7px] border border-zinc-200 bg-white text-zinc-500 shadow-[0_1px_0_rgb(0_0_0_/_0.02)] hover:bg-zinc-50 hover:text-zinc-950"
                aria-label="Fechar novo pedido"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>
          </div>

          <StepRail stepIndex={stepIndex} onStep={setStepIndex} />
        </header>

        {created ? (
          <SuccessScreen order={created} onCreateAnother={resetFlow} onClose={onClose} />
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,#ffffff,#f3f5f8)]">
              <div className="grid min-h-full gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:p-5">
                <main className="min-w-0">
                  <div key={step.id} className="new-order-step-card">
                    {step.id === "cliente" && (
                      <ClientStep form={form} update={update} />
                    )}
                    {step.id === "itens" && (
                      <ItemsStep
                        items={form.itens}
                        totals={totals}
                        updateItem={updateItem}
                        addItem={addItem}
                        removeItem={removeItem}
                      />
                    )}
                    {step.id === "frete" && (
                      <FreightStep
                        form={form}
                        update={update}
                        quotes={quotes}
                        selectedQuote={selectedQuote}
                        onSelectQuote={(quote) =>
                          setForm((current) => ({
                            ...current,
                            transportadora: quote.nome,
                          }))
                        }
                      />
                    )}
                    {step.id === "revisao" && (
                      <ReviewStep
                        form={form}
                        totals={totals}
                        checklist={checklist}
                        selectedQuote={selectedQuote}
                      />
                    )}
                  </div>
                </main>

                <CockpitPreview
                  form={form}
                  totals={totals}
                  checklist={checklist}
                  selectedQuote={selectedQuote}
                />
              </div>
            </div>

            <footer className="flex flex-col gap-3 border-t border-zinc-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                local · simulado · entrada automática na demanda
              </p>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <Button variant="secondary" onClick={requestClose}>
                  Cancelar
                </Button>
                <Button
                  variant="secondary"
                  icon={ArrowLeft}
                  onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
                  disabled={stepIndex === 0}
                >
                  Voltar
                </Button>
                {stepIndex < STEPS.length - 1 ? (
                  <Button
                    variant="primary"
                    iconRight={ArrowRight}
                    onClick={() =>
                      setStepIndex((current) => Math.min(STEPS.length - 1, current + 1))
                    }
                  >
                    Próxima etapa
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    icon={Sparkles}
                    onClick={handleCreate}
                    disabled={!allValid}
                  >
                    Criar pedido
                  </Button>
                )}
              </div>
            </footer>
          </>
        )}
      </section>
    </div>
  );
}

function StepRail({ stepIndex, onStep }) {
  return (
    <div className="relative mt-5 grid gap-2 sm:grid-cols-4">
      {STEPS.map((step, index) => {
        const active = index === stepIndex;
        const done = index < stepIndex;
        const Icon = step.icon;
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStep(index)}
            className={cn(
              "group relative overflow-hidden rounded-[8px] border px-3 py-2.5 text-left transition-all duration-300",
              active
                ? "border-zinc-950 bg-zinc-950 text-white shadow-[0_16px_38px_-26px_rgb(15_23_42_/_0.8)]"
                : done
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-zinc-200 bg-white/80 text-zinc-700 hover:border-blue-200 hover:bg-blue-50/50"
            )}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-[6px] border",
                    active
                      ? "border-white/15 bg-white/10 text-white"
                      : done
                      ? "border-emerald-200 bg-white text-emerald-700"
                      : "border-zinc-200 bg-white text-blue-700"
                  )}
                >
                  <Icon size={14} strokeWidth={2} />
                </span>
                <span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.16em] opacity-70">
                    etapa {index + 1}
                  </span>
                  <span className="block text-xs font-semibold">{step.label}</span>
                </span>
              </span>
              {done && <CheckCircle2 size={14} strokeWidth={2} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ClientStep({ form, update }) {
  return (
    <Panel title="Cliente comercial" icon={Building2} eyebrow="cadastro e contato">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Razão social" value={form.cliente} onChange={update("cliente")} />
        <Field label="CNPJ" value={form.cnpj} onChange={update("cnpj")} />
        <Field label="Contato responsável" value={form.contato} onChange={update("contato")} />
        <Field label="E-mail" value={form.email} onChange={update("email")} icon={Mail} />
        <Field label="Telefone" value={form.telefone} onChange={update("telefone")} icon={Phone} />
        <Field label="Cidade/UF" value={form.cidadeUf} onChange={update("cidadeUf")} />
        <Field label="CEP" value={form.cep} onChange={update("cep")} />
        <Field label="Vendedor" value={form.vendedor} onChange={update("vendedor")} />
        <SelectField
          label="Tipo de cliente"
          value={form.tipoCliente}
          onChange={update("tipoCliente")}
          options={["Recorrente", "Novo cliente", "Estratégico", "Contrato spot"]}
        />
        <Field
          label="Limite de crédito"
          value={form.limiteCredito}
          onChange={update("limiteCredito")}
          icon={WalletCards}
        />
      </div>
    </Panel>
  );
}

function ItemsStep({ items, totals, updateItem, addItem, removeItem }) {
  return (
    <Panel title="Itens do pedido" icon={Package} eyebrow="produtos, peso e valor">
      <div className="space-y-3">
        <div className="grid gap-px overflow-hidden rounded-[8px] border border-zinc-200 bg-zinc-200 lg:grid-cols-3">
          <MiniMetric label="Valor declarado" value={formatBRL(totals.value)} />
          <MiniMetric label="Peso total" value={`${formatNumber(totals.weight)} kg`} />
          <MiniMetric label="Volumes" value={formatNumber(totals.volumes)} />
        </div>

        <div className="overflow-x-auto rounded-[8px] border border-zinc-200 bg-white">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-950 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-300">
                <th className="px-3 py-2.5">SKU</th>
                <th className="px-3 py-2.5">Descrição</th>
                <th className="px-3 py-2.5">Qtd.</th>
                <th className="px-3 py-2.5">Peso un.</th>
                <th className="px-3 py-2.5">Valor un.</th>
                <th className="w-10 px-3 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {items.map((item) => (
                <tr key={item.id} className="new-order-item-row">
                  <td className="px-3 py-2.5">
                    <InlineInput value={item.sku} onChange={(value) => updateItem(item.id, "sku", value)} mono />
                  </td>
                  <td className="px-3 py-2.5">
                    <InlineInput value={item.descricao} onChange={(value) => updateItem(item.id, "descricao", value)} />
                  </td>
                  <td className="px-3 py-2.5">
                    <InlineInput value={item.quantidade} onChange={(value) => updateItem(item.id, "quantidade", value)} narrow />
                  </td>
                  <td className="px-3 py-2.5">
                    <InlineInput value={item.pesoUnitario} onChange={(value) => updateItem(item.id, "pesoUnitario", value)} narrow />
                  </td>
                  <td className="px-3 py-2.5">
                    <InlineInput value={item.valorUnitario} onChange={(value) => updateItem(item.id, "valorUnitario", value)} narrow />
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-[5px] border border-zinc-200 text-zinc-500 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                      aria-label="Remover item"
                    >
                      <Trash2 size={13} strokeWidth={2} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button variant="secondary" icon={Plus} onClick={addItem}>
          Adicionar item
        </Button>
      </div>
    </Panel>
  );
}

function FreightStep({ form, update, quotes, selectedQuote, onSelectQuote }) {
  return (
    <Panel title="Rota e frete" icon={Route} eyebrow="cotação simulada">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Origem" value={form.origem} onChange={update("origem")} icon={MapPin} />
        <Field label="Destino" value={form.destino} onChange={update("destino")} icon={MapPin} />
        <Field label="Rodovia" value={form.rodovia} onChange={update("rodovia")} />
        <Field label="Previsão" value={form.previsao} onChange={update("previsao")} />
        <SelectField
          label="Tipo de operação"
          value={form.tipoOperacao}
          onChange={update("tipoOperacao")}
          options={["Fracionado", "Lotação", "Expresso", "Aéreo"]}
        />
        <SelectField
          label="Pagamento"
          value={form.pagamento}
          onChange={update("pagamento")}
          options={["CIF", "FOB"]}
        />
        <SelectField
          label="Prioridade"
          value={form.prioridade}
          onChange={update("prioridade")}
          options={["Operação padrão", "Alta prioridade", "Baixa urgência"]}
        />
        <Field label="NF-e" value={form.nfe} onChange={update("nfe")} icon={FileText} />
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            motor de cotação
          </p>
          <Badge variant="blue" dot>
            melhor opção sugerida
          </Badge>
        </div>
        <div className="grid gap-2 xl:grid-cols-5">
          {quotes.map((quote, index) => (
            <button
              key={quote.id}
              type="button"
              onClick={() => onSelectQuote(quote)}
              className={cn(
                "quote-card new-order-quote-card rounded-[8px] border p-3 text-left transition-all duration-300",
                selectedQuote?.id === quote.id
                  ? "border-zinc-950 bg-zinc-950 text-white shadow-[0_18px_44px_-30px_rgb(15_23_42_/_0.95)]"
                  : "border-zinc-200 bg-white hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span>
                  <span className="block text-sm font-semibold">{quote.nome}</span>
                  <span className={cn("mt-1 block text-[11px]", selectedQuote?.id === quote.id ? "text-zinc-300" : "text-zinc-500")}>
                    {quote.badge}
                  </span>
                </span>
                {index === 0 && <Zap size={14} strokeWidth={2} className="text-[color:var(--color-alarm)]" />}
              </div>
              <p className="mt-4 text-lg font-semibold tabular-nums">
                {formatBRL(quote.valor)}
              </p>
              <p className={cn("mt-1 text-[11px]", selectedQuote?.id === quote.id ? "text-zinc-300" : "text-zinc-500")}>
                {quote.prazoDias} dia{quote.prazoDias === 1 ? "" : "s"} · {quote.modal}
              </p>
            </button>
          ))}
        </div>
      </div>

      <label className="mt-4 block">
        <span className="mb-1 block text-[11px] font-semibold text-zinc-600">
          Observações operacionais
        </span>
        <textarea
          value={form.observacoes}
          onChange={update("observacoes")}
          rows={4}
          className="w-full resize-none rounded-[8px] border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.9)] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
        />
      </label>
    </Panel>
  );
}

function ReviewStep({ form, totals, checklist, selectedQuote }) {
  return (
    <Panel title="Revisão final" icon={ClipboardCheck} eyebrow="validação e confirmação">
      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[8px] border border-zinc-200 bg-white p-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            checklist inteligente
          </p>
          <div className="mt-3 space-y-2">
            {checklist.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "new-order-check-row flex items-center justify-between gap-3 rounded-[7px] border px-3 py-2",
                  item.done
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-amber-200 bg-amber-50 text-amber-800"
                )}
              >
                <span className="text-sm font-medium">{item.label}</span>
                {item.done ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
              </div>
            ))}
          </div>
        </section>

        <section className="surface-ink scanline rounded-[8px] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
            resumo para demanda
          </p>
          <p className="mt-3 text-xl font-semibold text-white">
            {form.cliente}
          </p>
          <div className="mt-4 space-y-2 text-xs">
            <PreviewLine label="Rota" value={`${form.origem} → ${form.destino}`} dark />
            <PreviewLine label="Frete" value={`${selectedQuote?.nome} · ${formatBRL(selectedQuote?.valor || 0)}`} dark />
            <PreviewLine label="Carga" value={`${formatNumber(totals.weight)} kg · ${formatNumber(totals.volumes)} vol.`} dark />
            <PreviewLine label="Valor" value={formatBRL(totals.value)} dark />
          </div>
        </section>
      </div>
    </Panel>
  );
}

function CockpitPreview({ form, totals, checklist, selectedQuote }) {
  const doneCount = checklist.filter((item) => item.done).length;
  const progress = Math.round((doneCount / checklist.length) * 100);

  return (
    <aside className="new-order-preview relative overflow-hidden rounded-[10px] border border-zinc-950/10 bg-zinc-950 p-4 text-white shadow-[0_24px_70px_-42px_rgb(15_23_42_/_0.85)] lg:sticky lg:top-4 lg:self-start">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgb(31_79_143_/_0.45),transparent_17rem),linear-gradient(180deg,rgb(13_25_41),rgb(7_13_23))]"
      />
      <div className="relative">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-100/70">
          <ShieldCheck size={12} />
          cockpit preview
        </p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight">
          {formatBRL(totals.value)}
        </h3>
        <p className="mt-1 text-xs text-zinc-300">
          {totals.weight ? `${formatNumber(totals.weight)} kg · ${formatNumber(totals.volumes)} volumes` : "Aguardando itens"}
        </p>

        <div className="new-order-route-map mt-5 rounded-[8px] border border-white/10 bg-white/[0.06] p-3">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex flex-col items-center">
              <span className="h-2 w-2 rounded-full bg-blue-300 ring-4 ring-blue-300/10" />
              <span className="my-1 h-10 w-px bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-emerald-300 ring-4 ring-emerald-300/10" />
            </div>
            <div className="min-w-0 text-sm">
              <p className="font-semibold text-white">{form.origem || "Origem"}</p>
              <p className="text-xs text-zinc-400">coleta · HQ operacional</p>
              <p className="mt-4 font-semibold text-white">{form.destino || "Destino"}</p>
              <p className="text-xs text-zinc-400">{form.rodovia || "rota a definir"}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[8px] border border-white/10 bg-white/[0.06] p-3">
          <div className="flex items-center justify-between gap-3">
            <span>
              <span className="block text-sm font-semibold">{selectedQuote?.nome || "Frete"}</span>
              <span className="mt-0.5 block text-xs text-zinc-400">melhor custo-benefício</span>
            </span>
            <span className="text-right">
              <span className="block font-semibold tabular-nums">
                {formatBRL(selectedQuote?.valor || 0)}
              </span>
              <span className="mt-0.5 block text-xs text-zinc-400">
                {selectedQuote?.prazoDias || 0} dia{selectedQuote?.prazoDias === 1 ? "" : "s"}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Validação</span>
            <span className="font-mono tabular-nums">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <span
              className="new-order-progress block h-full rounded-full bg-[color:var(--color-alarm)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

function SuccessScreen({ order, onCreateAnother, onClose }) {
  return (
    <div className="new-order-success flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto bg-[radial-gradient(circle_at_50%_20%,rgb(22_163_74_/_0.14),transparent_18rem),linear-gradient(180deg,#fff,#f5f8fb)] px-6 py-10 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-[0_22px_48px_-28px_rgb(22_163_74_/_0.75)]">
        <CheckCircle2 size={38} strokeWidth={1.7} />
      </div>
      <p className="mt-6 font-display text-[30px] font-semibold text-zinc-950">
        Pedido criado e enviado para a demanda
      </p>
      <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
        {order.id} entrou na esteira operacional, com {order.transportadora} sugerida para a rota{" "}
        {order.origem} → {order.destino}.
      </p>
      <div className="mt-7 grid w-full max-w-3xl gap-px overflow-hidden rounded-[8px] border border-zinc-200 bg-zinc-200 text-left sm:grid-cols-4">
        <SuccessStat label="Pedido" value={order.id} />
        <SuccessStat label="Cliente" value={order.cliente} />
        <SuccessStat label="Valor" value={formatBRL(order.valor)} />
        <SuccessStat label="Demanda" value="Adicionado" />
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
        <Button variant="secondary" onClick={onCreateAnother}>
          Criar outro
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Ver demanda
        </Button>
        <Button variant="primary" onClick={onClose}>
          Ir para pedidos
        </Button>
      </div>
    </div>
  );
}

function Panel({ title, eyebrow, icon: Icon, children }) {
  return (
    <section className="premium-panel relative overflow-hidden rounded-[10px] p-4 sm:p-5">
      <div className="mb-5 flex flex-col gap-3 border-b border-zinc-200/80 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-[8px] border border-blue-100 bg-blue-50 text-blue-700">
            <Icon size={18} strokeWidth={1.9} />
          </span>
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-alarm)]">
              {eyebrow}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-zinc-950">{title}</h3>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}

function HeaderStat({ icon: Icon, label, value }) {
  return (
    <div className="hidden rounded-[7px] border border-zinc-200 bg-white/88 px-3 py-2 text-left shadow-[0_1px_0_rgb(0_0_0_/_0.03)] sm:block">
      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-400">
        <Icon size={11} strokeWidth={1.8} />
        {label}
      </span>
      <span className="mt-1 block text-xs font-semibold text-zinc-950">
        {value}
      </span>
    </div>
  );
}

function Field({ label, value, onChange, icon: Icon }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold text-zinc-600">
        {label}
      </span>
      <span className="relative block">
        {Icon && (
          <Icon
            size={13}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
        )}
        <input
          value={value}
          onChange={onChange}
          className={cn(
            "h-10 w-full rounded-[7px] border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.9)] transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20",
            Icon && "pl-8"
          )}
        />
      </span>
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold text-zinc-600">
        {label}
      </span>
      <select
        value={value}
        onChange={onChange}
        className="h-10 w-full rounded-[7px] border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.9)] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function InlineInput({ value, onChange, narrow = false, mono = false }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cn(
        "h-8 w-full rounded-[5px] border border-transparent bg-zinc-50 px-2 text-sm text-zinc-950 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20",
        narrow && "max-w-[96px]",
        mono && "font-mono text-xs"
      )}
    />
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="bg-white px-3 py-3">
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-zinc-950 tabular-nums">
        {value}
      </p>
    </div>
  );
}

function PreviewLine({ label, value, dark = false }) {
  return (
    <div className={cn("flex items-center justify-between gap-3 border-t pt-2", dark ? "border-white/10" : "border-zinc-200")}>
      <span className={cn("font-mono text-[10px] uppercase tracking-[0.14em]", dark ? "text-zinc-400" : "text-zinc-500")}>
        {label}
      </span>
      <span className={cn("text-right text-xs font-semibold", dark ? "text-white" : "text-zinc-950")}>
        {value}
      </span>
    </div>
  );
}

function SuccessStat({ label, value }) {
  return (
    <div className="min-w-0 bg-white px-4 py-3">
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold text-zinc-950">
        {value}
      </p>
    </div>
  );
}
