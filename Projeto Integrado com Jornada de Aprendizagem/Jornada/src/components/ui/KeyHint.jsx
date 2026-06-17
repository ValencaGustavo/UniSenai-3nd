import { cn } from "../../lib/utils.js";


export default function KeyHint({ keys, className }) {
  const list = Array.isArray(keys) ? keys : [keys];
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {list.map((k, i) => (
        <kbd
          key={i}
          className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[4px] border border-zinc-200 bg-white px-1 font-mono text-[10px] font-medium text-zinc-600 shadow-[0_1px_0_0_rgb(0_0_0_/_0.04)]"
        >
          {k}
        </kbd>
      ))}
    </span>
  );
}
