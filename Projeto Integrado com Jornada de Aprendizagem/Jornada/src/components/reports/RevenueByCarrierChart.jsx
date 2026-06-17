import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import ChartTooltip from "../dashboard/ChartTooltip.jsx";

const DATA = [
  { transp: "Loggi", receita: 842 },
  { transp: "Braspress", receita: 712 },
  { transp: "Jamef", receita: 524 },
  { transp: "Total Express", receita: 488 },
  { transp: "Azul Cargo", receita: 312 },
  { transp: "TNT Mercúrio", receita: 244 },
];

const COLORS = ["#2563eb", "#1d4ed8", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

export default function RevenueByCarrierChart() {
  return (
    <section className="panel-enter surface">
      <header className="flex items-start justify-between border-b border-zinc-200 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-950">
            Receita por transportadora
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            Total em milhares (R$) · período selecionado
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
          <span className="h-2 w-2 rounded-sm bg-blue-600" />
          Receita líquida
        </div>
      </header>
      <div className="h-[260px] px-2 pb-2 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            layout="vertical"
            margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
          >
            <CartesianGrid horizontal={false} stroke="#e2e8f0" />
            <XAxis
              type="number"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}k`}
            />
            <YAxis
              type="category"
              dataKey="transp"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={90}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              content={<ChartTooltip currency />}
            />
            <Bar
              dataKey="receita"
              name="Receita"
              radius={[0, 3, 3, 0]}
              maxBarSize={20}
            >
              {DATA.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
