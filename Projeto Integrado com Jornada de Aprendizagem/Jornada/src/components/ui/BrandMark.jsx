import { cn } from "../../lib/utils.js";
import FastWordmark from "./FastWordmark.jsx";


export default function BrandMark({ size = 28, className }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-[7px] border border-white/70 bg-white shadow-[0_10px_24px_-18px_rgb(9_42_67_/_0.9),_inset_0_1px_0_rgb(255_255_255_/_0.9)]",
        className
      )}
      style={{ width: size, height: size }}
      aria-label="FastAriam"
      role="img"
    >
      <FastWordmark variant="f" className="h-[118%] w-[118%]" />
    </span>
  );
}


export function BrandLockup({ size = 28, className }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <BrandMark size={size} />
      <div className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold text-zinc-950">
          Fast<span className="text-[color:var(--color-brand)]">Ariam</span>
        </span>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">
          [ CARGO·OS v2.4 ]
        </span>
      </div>
    </div>
  );
}
