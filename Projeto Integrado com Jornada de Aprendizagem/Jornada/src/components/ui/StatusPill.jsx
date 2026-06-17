import {
  Truck,
  Hourglass,
  Check,
  AlertTriangle,
  FileSignature,
  Clock,
} from "lucide-react";
import { cn } from "../../lib/utils.js";


const STATUS_MAP = {
  "Em trânsito": {
    Icon: Truck,
    sigil: "■",
    sigilColor: "text-zinc-400",
    pulse: false,
  },
  "Aguardando coleta": {
    Icon: Hourglass,
    sigil: "○",
    sigilColor: "text-zinc-400",
    pulse: false,
  },
  "Aguardando CTe": {
    Icon: FileSignature,
    sigil: "◇",
    sigilColor: "text-zinc-400",
    pulse: false,
  },
  Entregue: {
    Icon: Check,
    sigil: "✓",
    sigilColor: "text-zinc-700",
    pulse: false,
  },
  "Com ocorrência": {
    Icon: AlertTriangle,
    sigil: "▲",
    sigilColor: "text-[color:var(--color-alarm)]",
    pulse: true,
  },
  Atrasado: {
    Icon: Clock,
    sigil: "▲",
    sigilColor: "text-[color:var(--color-warn)]",
    pulse: false,
  },
};

export default function StatusPill({ status, size = "sm", className }) {
  const c = STATUS_MAP[status] ?? STATUS_MAP["Em trânsito"];
  const isMd = size === "md";
  const isAlarm = status === "Com ocorrência";
  const isLate = status === "Atrasado";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-[4px] border bg-white font-medium text-zinc-800",
        isAlarm
          ? "border-[color:var(--color-crit)]/30"
          : isLate
          ? "border-[color:var(--color-warn)]/40"
          : "border-zinc-200/80",
        isMd ? "px-2 py-1 text-xs" : "px-1.5 py-[3px] text-[11px]",
        className
      )}
    >
      
      <span
        className={cn(
          "font-mono leading-none",
          c.sigilColor,
          c.pulse && "animate-pulse"
        )}
        style={{ fontSize: isMd ? 11 : 10 }}
      >
        {c.sigil}
      </span>
      <c.Icon size={isMd ? 12 : 11} strokeWidth={1.75} className="text-zinc-500" />
      <span>{status}</span>
    </span>
  );
}
