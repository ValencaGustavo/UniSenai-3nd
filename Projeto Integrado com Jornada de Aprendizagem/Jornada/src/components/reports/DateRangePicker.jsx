import { useEffect, useRef, useState } from "react";
import { Calendar, Check } from "lucide-react";
import { cn } from "../../lib/utils.js";

const PRESETS = [
  { key: "7d", label: "Últimos 7 dias", range: "06/05 – 13/05/2026" },
  { key: "30d", label: "Últimos 30 dias", range: "13/04 – 13/05/2026" },
  { key: "90d", label: "Últimos 90 dias", range: "12/02 – 13/05/2026" },
  { key: "mtd", label: "Mês atual (MTD)", range: "01/05 – 13/05/2026" },
  { key: "qtd", label: "Trimestre atual", range: "01/04 – 13/05/2026" },
  { key: "ytd", label: "Ano até hoje", range: "01/01 – 13/05/2026" },
  { key: "custom", label: "Personalizado", range: "Selecione no calendário" },
];

export default function DateRangePicker() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("30d");
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const current = PRESETS.find((p) => p.key === active);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs hover:bg-zinc-50"
      >
        <Calendar size={13} strokeWidth={1.75} className="text-zinc-500" />
        <span className="font-medium text-zinc-950">{current.label}</span>
        <span className="text-zinc-400">·</span>
        <span className="text-zinc-600 tabular-nums">{current.range}</span>
        <svg
          className="h-3 w-3 text-zinc-400"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-[420px] origin-top-right rounded-lg border border-zinc-200 bg-white shadow-lg">
          <div className="grid grid-cols-[180px_1fr] divide-x divide-zinc-200">
            
            <ul className="py-1">
              {PRESETS.map((p) => (
                <li key={p.key}>
                  <button
                    onClick={() => setActive(p.key)}
                    className={cn(
                      "flex w-full items-center justify-between px-3 py-1.5 text-left text-xs hover:bg-zinc-50",
                      active === p.key && "bg-blue-50 text-blue-700 font-medium"
                    )}
                  >
                    <span>{p.label}</span>
                    {active === p.key && (
                      <Check size={12} strokeWidth={2} className="text-blue-600" />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            
            <MiniCalendar />
          </div>

          <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-3 py-2">
            <p className="text-[11px] text-zinc-500 tabular-nums">{current.range}</p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpen(false)}
                className="rounded px-2 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-100"
              >
                Cancelar
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded bg-blue-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-blue-700"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniCalendar() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1 - 3); // -3..31
  const inMonth = (d) => d >= 1 && d <= 31;
  const inRange = (d) => d >= 5 && d <= 18;
  const isStart = (d) => d === 5;
  const isEnd = (d) => d === 18;

  return (
    <div className="p-3">
      <div className="flex items-center justify-between text-xs">
        <button className="rounded p-1 text-zinc-500 hover:bg-zinc-100">‹</button>
        <span className="font-medium text-zinc-950">Maio 2026</span>
        <button className="rounded p-1 text-zinc-500 hover:bg-zinc-100">›</button>
      </div>
      <div className="mt-2 grid grid-cols-7 gap-0.5 text-center text-[10px] uppercase tracking-wider text-zinc-400">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-0.5">
        {days.map((d, i) => {
          if (!inMonth(d))
            return <span key={i} className="h-7 text-xs text-zinc-300" />;
          const highlight = inRange(d);
          return (
            <button
              key={i}
              className={cn(
                "h-7 w-full text-xs tabular-nums transition-colors",
                highlight
                  ? "bg-blue-50 text-blue-700"
                  : "text-zinc-700 hover:bg-zinc-100",
                isStart(d) && "rounded-l-md bg-blue-600 text-white",
                isEnd(d) && "rounded-r-md bg-blue-600 text-white"
              )}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
