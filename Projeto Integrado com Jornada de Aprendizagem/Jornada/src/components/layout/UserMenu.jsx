import { useEffect, useRef, useState } from "react";
import {
  User,
  Building2,
  KeyRound,
  Bell,
  LogOut,
  ChevronDown,
  UserRound,
} from "lucide-react";
import { currentUser } from "../../data/mockData.js";
import { cn } from "../../lib/utils.js";

const MENU = [
  { label: "Meu perfil", icon: User, hint: "P" },
  { label: "Empresa e equipe", icon: Building2 },
  { label: "Preferências de alerta", icon: Bell },
  { label: "Segurança e API", icon: KeyRound },
];

export default function UserMenu({ onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-[6px] border border-zinc-200 bg-white py-0.5 pl-0.5 pr-1.5 text-left hover:bg-zinc-50"
      >
        <div className="relative">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-[5px] bg-gradient-to-br from-[color:var(--color-brand-soft)] to-[color:var(--color-brand-deep)] text-[10px] font-semibold text-white"
            )}
          >
            <UserRound size={14} strokeWidth={1.9} />
          </div>
          <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full border-2 border-white bg-emerald-500" />
        </div>
        <ChevronDown size={12} strokeWidth={1.75} className="text-zinc-400" />
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-64 origin-top-right rounded-[8px] border border-zinc-200/80 bg-white shadow-[0_8px_24px_-4px_rgb(0_0_0_/_0.08),_0_2px_4px_-2px_rgb(0_0_0_/_0.06)]">
          <div className="border-b border-hairline px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-gradient-to-br from-[color:var(--color-brand-soft)] to-[color:var(--color-brand-deep)] text-[12px] font-semibold text-white">
                <UserRound size={17} strokeWidth={1.9} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-zinc-950">
                  {currentUser.name}
                </p>
                <p className="truncate text-[11px] text-zinc-500">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between rounded-[5px] bg-zinc-50 px-2 py-1.5">
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {currentUser.role}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                Plano · Enterprise
              </span>
            </div>
          </div>
          <ul className="py-1">
            {MENU.map((item) => (
              <li key={item.label}>
                <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[12px] text-zinc-700 hover:bg-zinc-50">
                  <item.icon
                    size={13}
                    strokeWidth={1.75}
                    className="text-zinc-400"
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.hint && (
                    <span className="font-mono text-[10px] text-zinc-300">
                      {item.hint}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-hairline py-1">
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[12px] text-red-600 hover:bg-red-50"
            >
              <LogOut size={13} strokeWidth={1.75} />
              Sair da conta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
