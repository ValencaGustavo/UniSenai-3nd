import { useEffect, useRef, useState } from "react";
import { Download, FileSpreadsheet, FileText, FileJson } from "lucide-react";
import { cn } from "../../lib/utils.js";

const OPTIONS = [
  { key: "csv", label: "CSV", desc: "Compatível com Excel", Icon: FileText, color: "text-blue-600" },
  { key: "xlsx", label: "XLSX (Excel)", desc: "Com formatação e fórmulas", Icon: FileSpreadsheet, color: "text-emerald-600" },
  { key: "pdf", label: "PDF", desc: "Relatório paginado", Icon: FileText, color: "text-red-600" },
  { key: "json", label: "JSON", desc: "Para integrações", Icon: FileJson, color: "text-violet-600" },
];

export default function ExportMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-8 items-center gap-2 rounded-md border border-blue-600 bg-blue-600 px-3 text-xs font-medium text-white hover:bg-blue-700"
        )}
      >
        <Download size={13} strokeWidth={2} />
        Exportar
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-64 origin-top-right rounded-lg border border-zinc-200 bg-white shadow-lg">
          <p className="border-b border-zinc-200 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Formato do arquivo
          </p>
          <ul className="py-1">
            {OPTIONS.map((o) => (
              <li key={o.key}>
                <button
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-zinc-50"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100">
                    <o.Icon size={13} strokeWidth={1.75} className={o.color} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-zinc-950">{o.label}</p>
                    <p className="text-[10px] text-zinc-500">{o.desc}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-zinc-200 px-3 py-2">
            <label className="flex items-center gap-2 text-[11px] text-zinc-600">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-zinc-300 text-blue-600 focus:ring-blue-600/30"
              />
              Enviar por e-mail ao concluir
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
