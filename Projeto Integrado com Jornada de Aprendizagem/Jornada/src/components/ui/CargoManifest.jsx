import { cn } from "../../lib/utils.js";


export default function CargoManifest({ className }) {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const fileNumber = `FA-${yyyy}-04821`;

  return (
    <aside
      className={cn(
        "relative w-full overflow-hidden rounded-[5px] border border-zinc-900/85 bg-zinc-50 stamp-anim",
        "shadow-[0_2px_0_0_rgb(10_10_10_/_0.06),_0_8px_18px_-12px_rgb(10_10_10_/_0.30)]",
        className
      )}
      style={{ transform: "rotate(-1.4deg)" }}
    >
      
      <div className="h-1.5 bg-hazard-tape-thin" />

      <div className="grid grid-cols-[1fr_auto] items-start gap-3 px-3 py-2">
        <div className="min-w-0">
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-zinc-500">
            CARGO MANIFEST · FastAriam
          </p>
          <p className="mt-0.5 font-display-cond text-[18px] leading-none text-zinc-950">
            {fileNumber}
          </p>
          <div className="mt-1 flex items-baseline gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-600">
            <span>EMIT {dd}.{mm}.{yyyy}</span>
            <span className="text-zinc-300">·</span>
            <span>REV. v2.4</span>
            <span className="text-zinc-300">·</span>
            <span className="text-[color:var(--color-hazard)]">LOTE A</span>
          </div>
        </div>
        
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          <svg viewBox="0 0 48 48" className="h-12 w-12">
            <defs>
              <path
                id="stamp-arc"
                d="M 24 24 m -18 0 a 18 18 0 1 1 36 0 a 18 18 0 1 1 -36 0"
              />
            </defs>
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="1.25"
            />
            <circle
              cx="24"
              cy="24"
              r="14"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="0.5"
              strokeDasharray="2 1.5"
            />
            <text
              fill="#0a0a0a"
              fontFamily="JetBrains Mono, monospace"
              fontSize="6"
              fontWeight="600"
              letterSpacing="2"
            >
              <textPath href="#stamp-arc" startOffset="0">
                · VERIFICADO · OK · VERIFICADO · OK
              </textPath>
            </text>
            <text
              x="24"
              y="22"
              textAnchor="middle"
              fill="#d7282f"
              fontFamily="Bricolage Grotesque, sans-serif"
              fontSize="8"
              fontWeight="700"
              fontStyle="italic"
            >
              FAST
            </text>
            <text
              x="24"
              y="30"
              textAnchor="middle"
              fill="#0a0a0a"
              fontFamily="JetBrains Mono, monospace"
              fontSize="5"
              letterSpacing="0.5"
            >
              {dd}/{mm}
            </text>
          </svg>
        </div>
      </div>

      
      <div className="flex items-center justify-between gap-2 border-t border-zinc-900/15 bg-white px-3 py-1.5">
        <div className="flex h-3.5 flex-1 items-end gap-[1px] overflow-hidden">
          {Array.from({ length: 42 }).map((_, i) => {
            const w = ((i * 37) % 4) + 1;
            const h = 8 + ((i * 53) % 6);
            return (
              <span
                key={i}
                className="bg-zinc-950"
                style={{ width: w, height: h }}
              />
            );
          })}
        </div>
        <span className="font-mono text-[8px] tabular-nums text-zinc-500">
          ‖ 35·{yyyy}·06·{Math.floor(10000 + Math.random() * 89999)}
        </span>
      </div>
    </aside>
  );
}
