import { useRef, useState } from "react";
import { FileCheck2, FileSpreadsheet, FileText, ScanText, Table2 } from "lucide-react";
import Button from "../ui/Button.jsx";
import { cn } from "../../lib/utils.js";

const FORMAT_OPTIONS = [
  {
    key: "pdf",
    label: "PDF",
    title: "PDF do cliente",
    desc: "Lê cliente, CNPJ, cidade, produtos, volumes e dados para o frete.",
    icon: FileText,
    tone: "text-[color:var(--color-hazard)] bg-[color:var(--color-hazard-tint)]",
  },
  {
    key: "xlsx",
    label: "XLSX",
    title: "Planilha opcional",
    desc: "Usada apenas quando o cliente mandar uma base estruturada.",
    icon: FileSpreadsheet,
    tone: "text-emerald-700 bg-emerald-50",
  },
  {
    key: "csv",
    label: "CSV",
    title: "CSV opcional",
    desc: "Alternativa simples para bases por coluna.",
    icon: Table2,
    tone: "text-[color:var(--color-brand)] bg-[color:var(--color-brand-tint)]",
  },
];

export default function DropZone({ onUpload }) {
  const [dragOver, setDragOver] = useState(false);
  const [format, setFormat] = useState("pdf");
  const inputRef = useRef(null);
  const active = FORMAT_OPTIONS.find((item) => item.key === format) ?? FORMAT_OPTIONS[0];
  const ActiveIcon = active.icon;

  return (
    <section className="premium-panel relative overflow-hidden">
      <header className="border-b border-zinc-200 px-5 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-hazard)]">
              PDF como entrada
            </p>
            <h2 className="mt-1 font-display text-[17px] font-semibold text-zinc-950">
              Soltar documento e cadastrar
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              O usuário não cadastra manualmente: ele envia o PDF e o sistema extrai os dados.
            </p>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-[7px] border border-zinc-200 bg-white text-[color:var(--color-hazard)]">
            <ScanText size={18} strokeWidth={1.8} />
          </span>
        </div>
      </header>

      <div className="space-y-4 p-5">
        <div className="grid grid-cols-3 gap-2">
          {FORMAT_OPTIONS.map((item) => {
            const Icon = item.icon;
            const isActive = format === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setFormat(item.key)}
                className={cn(
                  "group relative overflow-hidden rounded-[4px] border px-3 py-2.5 text-left transition-colors duration-150",
                  isActive
                    ? "border-[color:var(--color-brand-deep)] bg-[color:var(--color-brand)] text-white"
                    : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-white hover:border-zinc-300"
                )}
              >
                {isActive && <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-white/70" />}
                <Icon size={16} strokeWidth={1.85} className={isActive ? "text-white" : "text-zinc-500"} />
                <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                  {item.label}
                </p>
                <p className={cn("mt-1 hidden text-[11px] leading-snug sm:block", isActive ? "text-zinc-300" : "text-zinc-500")}>
                  {item.title}
                </p>
              </button>
            );
          })}
        </div>

        <div
          onDragEnter={(event) => {
            event.preventDefault();
            setDragOver(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragOver(false);
            onUpload?.(event.dataTransfer.files);
          }}
          className={cn(
            "scanline relative flex min-h-[230px] flex-col items-center justify-center overflow-hidden rounded-[6px] border-2 border-dashed px-6 py-8 text-center transition-colors duration-150",
            dragOver
              ? "border-[color:var(--color-hazard)] bg-red-50/60"
              : "border-zinc-300 bg-zinc-50/60 hover:bg-zinc-50"
          )}
        >
          <div className={cn("relative grid h-14 w-14 place-items-center rounded-[6px] ring-1 ring-inset", active.tone, dragOver ? "ring-[color:var(--color-hazard)]/30" : "ring-zinc-200")}>
            <ActiveIcon size={28} strokeWidth={1.65} />
          </div>

          <p className="mt-4 font-display text-[20px] font-semibold leading-tight text-zinc-950">
            Solte o {active.label} aqui
          </p>
          <p className="mt-1 max-w-sm text-sm leading-relaxed text-zinc-500">
            {active.desc}
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-4 rounded-[6px] border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-[color:var(--color-brand)] shadow-[0_8px_18px_-15px_rgb(15_23_42_/_0.7)] hover:bg-zinc-50"
          >
            selecionar arquivo
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.xlsx,.xls,.csv,.tsv"
            className="hidden"
            onChange={(event) => onUpload?.(event.target.files)}
          />

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[11px] text-zinc-500">
            <span className="inline-flex items-center gap-1 font-semibold text-[color:var(--color-hazard)]">
              <FileText size={12} strokeWidth={1.75} />
              PDF principal
            </span>
            <span className="text-zinc-300">·</span>
            <span className="inline-flex items-center gap-1">
              <FileSpreadsheet size={12} strokeWidth={1.75} className="text-emerald-600" />
              XLSX opcional
            </span>
            <span className="text-zinc-300">·</span>
            <span className="inline-flex items-center gap-1">
              <Table2 size={12} strokeWidth={1.75} className="text-[color:var(--color-brand)]" />
              CSV opcional
            </span>
          </div>
        </div>

        <div className="rounded-[7px] border border-zinc-200 bg-white px-3 py-3">
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-[6px] bg-[color:var(--color-brand-tint)] text-[color:var(--color-brand)]">
              <FileCheck2 size={15} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-950">Resultado esperado</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">
                Cliente cadastrado, rota identificada e dados prontos para calcular distância/frete sem planilha manual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
