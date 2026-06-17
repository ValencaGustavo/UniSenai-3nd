import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Calculator,
  Command,
  FileText,
  Menu,
  RadioTower,
  Search,
  ShieldCheck,
  UploadCloud,
  UsersRound,
  X,
} from "lucide-react";
import NotificationsPopover from "./NotificationsPopover.jsx";
import UserMenu from "./UserMenu.jsx";
import { BrandLockup } from "../ui/BrandMark.jsx";
import { cn } from "../../lib/utils.js";

const NAV = [
  { to: "/importacao", label: "Importação PDF", short: "PDF", icon: UploadCloud },
  { to: "/frete", label: "Cálculo frete", short: "Frete", icon: Calculator },
  { to: "/clientes", label: "Clientes", short: "Clientes", icon: UsersRound },
  { to: "/relatorios", label: "Relatórios", short: "Relatórios", icon: BarChart3 },
];

const MONTHS_PT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function formatClock(date) {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function formatDate(date) {
  return `${String(date.getDate()).padStart(2, "0")} ${MONTHS_PT[date.getMonth()]} ${date.getFullYear()}`;
}

export default function Header({ onLogout }) {
  const { pathname } = useLocation();
  const [now, setNow] = useState(new Date());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "global-header-command fixed inset-x-0 top-0 z-50 border-b bg-white transition-[border-color,box-shadow] duration-200",
        scrolled
          ? "border-zinc-200 shadow-[0_1px_3px_-1px_rgb(15_23_42_/_0.12)]"
          : "border-zinc-200/80"
      )}
    >

      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center gap-5 py-2">
          <div className="flex min-w-0 shrink-0 items-center">
            <BrandLockup size={32} />
          </div>

          <nav className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-0.5 rounded-[5px] border border-zinc-200 bg-zinc-50 p-0.5">
              {NAV.map((item) => (
                <HeaderNavItem key={item.to} item={item} />
              ))}
            </div>
          </nav>

          <div className="ml-auto flex min-w-0 shrink-0 items-center gap-2 border-l border-zinc-200/70 pl-4">
            <button className="group hidden h-8 w-[260px] items-center gap-2 rounded-[4px] border border-zinc-200 bg-zinc-50 px-2.5 text-left transition-colors hover:border-zinc-300 hover:bg-white 2xl:flex">
              <Search size={13} strokeWidth={1.75} className="text-zinc-400" />
              <span className="flex-1 truncate text-[12px] text-zinc-500">
                Buscar cliente, CNPJ, PDF, cidade...
              </span>
              <span className="flex items-center gap-0.5 rounded-[3px] border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-500">
                <Command size={9} strokeWidth={2} />K
              </span>
            </button>

            <div className="hidden items-center gap-1.5 min-[1800px]:flex">
              <StatusChip icon={FileText} label="PDF" value="ativo" tone="brand" />
              <StatusChip icon={RadioTower} label="Distância" value="auto" tone="good" />
              <StatusChip icon={ShieldCheck} label="Base" value="ok" tone="brand" />
            </div>

            <div className="hidden rounded-[4px] border border-zinc-200 bg-zinc-50 px-2 py-1 leading-tight lg:flex lg:flex-col lg:items-end">
              <span className="font-mono text-[11px] font-semibold tabular-nums text-zinc-900">
                {formatClock(now)}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-400">
                BRT · {formatDate(now)}
              </span>
            </div>

            <NotificationsPopover />
            <UserMenu onLogout={onLogout} />

            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              className="grid h-9 w-9 place-items-center rounded-[6px] border border-zinc-200 bg-white text-zinc-700 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.8)] lg:hidden"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="pb-3 lg:hidden">
            <div className="overflow-hidden rounded-[8px] border border-white/80 bg-white/92 shadow-[0_18px_34px_-26px_rgb(15_23_42_/_0.7)]">
              <nav className="grid grid-cols-1 divide-y divide-zinc-100">
                {NAV.map((item) => (
                  <MobileNavItem key={item.to} item={item} />
                ))}
              </nav>
              <div className="border-t border-zinc-100 px-3 py-2">
                <div className="flex items-center gap-2 rounded-[6px] border border-zinc-200 bg-zinc-50 px-2.5 py-2 text-[12px] text-zinc-500">
                  <Search size={13} strokeWidth={1.75} />
                  <span className="truncate">Buscar cliente, CNPJ, PDF, cidade...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function HeaderNavItem({ item }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          "group relative inline-flex h-8 items-center gap-2 rounded-[4px] px-3 text-[12px] font-semibold transition-colors duration-150",
          isActive
            ? "bg-[color:var(--color-brand)] text-white"
            : "text-zinc-600 hover:bg-white hover:text-zinc-950"
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={14} strokeWidth={1.9} className={isActive ? "text-white" : "text-zinc-400 group-hover:text-[color:var(--color-brand)]"} />
          <span className="hidden whitespace-nowrap xl:inline">{item.label}</span>
          <span className="whitespace-nowrap xl:hidden">{item.short}</span>
        </>
      )}
    </NavLink>
  );
}

function MobileNavItem({ item }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-3 text-[13px] font-semibold transition-colors",
          isActive ? "bg-[color:var(--color-brand-tint)] text-[color:var(--color-brand)]" : "text-zinc-700 hover:bg-zinc-50"
        )
      }
    >
      {({ isActive }) => (
        <>
          <span className={cn("grid h-8 w-8 place-items-center rounded-[6px] border", isActive ? "border-[color:var(--color-brand)]/20 bg-white" : "border-zinc-200 bg-white")}>
            <Icon size={15} strokeWidth={1.9} />
          </span>
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-400">
            {item.short}
          </span>
        </>
      )}
    </NavLink>
  );
}

function StatusChip({ icon: Icon, label, value, tone }) {
  const toneClass = tone === "good" ? "text-[color:var(--color-good)]" : "text-[color:var(--color-brand)]";

  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-[4px] border border-zinc-200 bg-zinc-50 px-2 text-[10px]">
      <Icon size={12} strokeWidth={1.9} className={toneClass} />
      <span className="font-mono uppercase tracking-[0.13em] text-zinc-500">{label}</span>
      <span className="font-mono font-semibold tabular-nums text-zinc-950">{value}</span>
    </span>
  );
}
