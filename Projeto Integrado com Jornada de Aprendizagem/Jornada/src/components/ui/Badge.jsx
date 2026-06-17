import { cn } from "../../lib/utils.js";

const VARIANT_STYLES = {
  neutral: "bg-zinc-100/80 text-zinc-700 ring-zinc-300/60",
  blue: "bg-blue-50 text-blue-700 ring-blue-600/15",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  amber: "bg-amber-50 text-amber-800 ring-amber-600/15",
  red: "bg-red-50 text-red-700 ring-red-600/15",
  violet: "bg-violet-50 text-violet-700 ring-violet-600/15",
};

const DOT_STYLES = {
  neutral: "bg-zinc-400",
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
  violet: "bg-violet-500",
};

export default function Badge({
  variant = "neutral",
  dot = false,
  children,
  className,
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-x-1.5 rounded-[5px] px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset whitespace-nowrap",
        VARIANT_STYLES[variant],
        className
      )}
    >
      {dot && (
        <span
          aria-hidden
          className={cn("h-1.5 w-1.5 rounded-full", DOT_STYLES[variant])}
        />
      )}
      {children}
    </span>
  );
}
