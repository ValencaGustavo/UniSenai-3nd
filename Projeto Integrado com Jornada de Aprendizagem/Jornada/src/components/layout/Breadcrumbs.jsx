import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const ROUTE_LABELS = {
  dashboard: "Dashboard",
  pedidos: "Pedidos",
  frete: "Cálculo de frete",
  planejamento: "Planejamento",
  importacao: "Importação",
  relatorios: "Relatórios",
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 rounded-[4px] px-1 py-0.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
      >
        <Home size={11} strokeWidth={1.75} />
      </Link>
      {segments.map((seg, i) => {
        const path = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        const label = ROUTE_LABELS[seg] ?? seg;
        return (
          <span key={path} className="flex items-center gap-1">
            <ChevronRight
              size={11}
              strokeWidth={1.5}
              className="text-zinc-300"
            />
            {isLast ? (
              <span className="font-semibold text-zinc-950">{label}</span>
            ) : (
              <Link
                to={path}
                className="rounded-[4px] px-1 py-0.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
