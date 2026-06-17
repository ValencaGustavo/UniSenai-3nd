import { cn } from "../../lib/utils.js";

const VARIANT_STYLES = {
  primary:
    "bg-zinc-950 text-white border border-zinc-950 hover:bg-zinc-800 shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.12),_0_8px_18px_-12px_rgb(0_0_0_/_0.65)]",
  brand: "btn-aurora",
  aurora: "btn-aurora",
  secondary:
    "bg-white text-zinc-800 hover:bg-zinc-50 border border-zinc-300",
  ghost:
    "bg-transparent text-zinc-700 hover:bg-white/70 border border-transparent hover:border-zinc-200",
  success:
    "bg-emerald-600 text-white border border-emerald-700 hover:bg-emerald-700 shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.12),_0_8px_18px_-12px_rgb(22_163_74_/_0.7)]",
  danger:
    "bg-white text-red-700 hover:bg-red-50 border border-red-200 shadow-[0_1px_0_0_rgb(0_0_0_/_0.025)]",
};

const SIZE_STYLES = {
  sm: "h-7 px-2.5 text-[11px] gap-1.5",
  md: "h-8 px-3 text-xs gap-1.5",
  lg: "h-9 px-3.5 text-sm gap-2",
};

export default function Button({
  variant = "secondary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  children,
  className,
  ...props
}) {
  const iconSize = size === "sm" ? 12 : size === "lg" ? 15 : 13;
  return (
    <button
      type="button"
      className={cn(
        "metal-sheen inline-flex items-center justify-center rounded-[4px] font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:ring-offset-1",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon size={iconSize} strokeWidth={2} />}
      {children}
      {IconRight && <IconRight size={iconSize} strokeWidth={2} />}
    </button>
  );
}
