import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { revenueSeries } from "../../data/mockData.js";
import { cn } from "../../lib/utils.js";
import ChartTooltip from "./ChartTooltip.jsx";

const RANGES = [
  { key: "1m", label: "1M" },
  { key: "3m", label: "3M" },
  { key: "6m", label: "6M" },
  { key: "1y", label: "1A" },
];

export default function RevenueChart() {
  const [range, setRange] = useState("6m");

  return (
    <section className="panel-enter surface">
      <header className="flex items-start justify-between border-b border-hairline px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/15">
            <TrendingUp size={13} strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-[13px] font-semibold text-zinc-950">
              Receita vs. custo de frete
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              valores em milhares · R$
            </p>
          </div>
        </div>
        <div className="flex rounded-[6px] border border-zinc-200 p-0.5">
          {RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={cn(
                "rounded-[4px] px-2 py-0.5 font-mono text-[10px] font-semibold transition-colors",
                range === r.key
                  ? "bg-zinc-950 text-white"
                  : "text-zinc-600 hover:bg-zinc-50"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </header>

      
      <div className="flex items-center gap-5 border-b border-hairline px-5 py-2.5 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-blue-600" />
          <span className="text-zinc-500">Receita</span>
          <span className="font-semibold text-zinc-950 tabular-nums">R$ 3,12M</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-zinc-300" />
          <span className="text-zinc-500">Custo</span>
          <span className="font-semibold text-zinc-950 tabular-nums">R$ 1,84M</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            margem
          </span>
          <span className="rounded-[4px] bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-600/15 tabular-nums">
            41,0%
          </span>
        </div>
      </div>

      <div className="h-[240px] px-2 pb-2 pt-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueSeries}
            margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="costArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a1a1aa" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#a1a1aa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e4e4e7"
              vertical={false}
            />
            <XAxis
              dataKey="mes"
              stroke="#a1a1aa"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{ fontFamily: "JetBrains Mono", letterSpacing: 0.5 }}
            />
            <YAxis
              stroke="#a1a1aa"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}k`}
              tick={{ fontFamily: "JetBrains Mono" }}
            />
            <Tooltip
              cursor={{ stroke: "#d4d4d8", strokeWidth: 1, strokeDasharray: "3 3" }}
              content={<ChartTooltip currency />}
            />
            <Area
              type="monotone"
              dataKey="receita"
              name="Receita"
              stroke="#2563eb"
              strokeWidth={2}
              fill="url(#revArea)"
              activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="custo"
              name="Custo"
              stroke="#a1a1aa"
              strokeWidth={1.75}
              strokeDasharray="4 3"
              fill="url(#costArea)"
              activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
