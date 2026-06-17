import { useEffect, useRef, useState } from "react";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
  ClipboardCheck,
} from "lucide-react";
import { notifications as mockNotifications } from "../../data/mockData.js";
import { cn, formatRelativeTime } from "../../lib/utils.js";

const ICONS = {
  warning: { Icon: AlertTriangle, color: "text-amber-700 bg-amber-50 ring-amber-600/15" },
  approval: { Icon: ClipboardCheck, color: "text-blue-700 bg-blue-50 ring-blue-600/15" },
  info: { Icon: Info, color: "text-zinc-700 bg-zinc-100 ring-zinc-400/20" },
  success: { Icon: CheckCircle2, color: "text-emerald-700 bg-emerald-50 ring-emerald-600/15" },
};

export default function NotificationsPopover() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(mockNotifications);
  const ref = useRef(null);
  const unread = items.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-8 w-8 items-center justify-center rounded-[6px] border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
        aria-label="Notificações"
      >
        <Bell size={14} strokeWidth={1.75} />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 font-mono text-[10px] font-semibold text-white ring-2 ring-white tabular-nums">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-[380px] origin-top-right rounded-[8px] border border-zinc-200/80 bg-white shadow-[0_8px_24px_-4px_rgb(0_0_0_/_0.08),_0_2px_4px_-2px_rgb(0_0_0_/_0.06)]">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
            <div>
              <h3 className="text-[13px] font-semibold text-zinc-950">
                Central de alertas
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                {unread} pendentes · últimas 24h
              </p>
            </div>
            <button
              onClick={markAllRead}
              className="rounded-[5px] px-2 py-1 text-[11px] font-medium text-blue-600 hover:bg-blue-50"
            >
              Marcar todas
            </button>
          </div>

          <ul className="max-h-[380px] divide-y divide-zinc-100 overflow-y-auto">
            {items.map((n) => {
              const { Icon, color } = ICONS[n.type];
              return (
                <li
                  key={n.id}
                  className={cn(
                    "relative flex gap-3 px-4 py-3 transition-colors hover:bg-zinc-50/60",
                    n.unread && "bg-blue-50/20"
                  )}
                >
                  {n.unread && (
                    <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-blue-600" />
                  )}
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] ring-1 ring-inset",
                      color
                    )}
                  >
                    <Icon size={13} strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-zinc-950">
                      {n.title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-[11px] text-zinc-600">
                      {n.description}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                      {formatRelativeTime(n.minutesAgo)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-hairline px-4 py-2">
            <button className="w-full rounded-[5px] px-2 py-1 text-[11px] font-medium text-zinc-700 hover:bg-zinc-50">
              Abrir central de notificações →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
