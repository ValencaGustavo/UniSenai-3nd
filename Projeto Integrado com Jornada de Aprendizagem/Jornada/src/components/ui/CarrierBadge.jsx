import { PackageCheck, Plane, Truck, Warehouse } from "lucide-react";
import { cn } from "../../lib/utils.js";


const CARRIER_PALETTES = {
  loggi:      { from: "#0F9D58", to: "#0a7942", accent: "#fbbc04" }, // verde Loggi + amarelo
  braspress:  { from: "#1a4ba8", to: "#0e3486", accent: "#d7282f" }, // azul Braspress
  jamef:      { from: "#0a0a0a", to: "#27272a", accent: "#d7282f" }, // preto Jamef
  azul:       { from: "#1ba4e0", to: "#0d8ec4", accent: "#fff200" }, // azul claro Azul Cargo
  total:      { from: "#e9531c", to: "#c43d10", accent: "#0a0a0a" }, // laranja Total
  tnt:        { from: "#ff6600", to: "#cc4d00", accent: "#0a0a0a" }, // laranja TNT
  default:    { from: "#52525b", to: "#3f3f46", accent: "#d7282f" },
};


function resolvePalette(carrier) {
  if (!carrier) return CARRIER_PALETTES.default;
  const byId = CARRIER_PALETTES[carrier.toLowerCase()];
  if (byId) return byId;
  const map = {
    emerald: "loggi",
    green: "loggi",
    blue: "braspress",
    indigo: "braspress",
    slate: "jamef",
    zinc: "jamef",
    sky: "azul",
    cyan: "azul",
    orange: "total",
    amber: "total",
    rose: "tnt",
    red: "tnt",
  };
  for (const k of Object.keys(map)) {
    if (carrier.includes(k)) return CARRIER_PALETTES[map[k]];
  }
  return CARRIER_PALETTES.default;
}

function resolveCarrierIcon(carrier) {
  const key = String(carrier ?? "").toLowerCase();
  if (key.includes("azul") || key.includes("sky") || key.includes("aéreo")) {
    return Plane;
  }
  if (key.includes("braspress") || key.includes("blue") || key.includes("indigo")) {
    return Warehouse;
  }
  if (key.includes("loggi") || key.includes("emerald") || key.includes("green")) {
    return PackageCheck;
  }
  return Truck;
}

export default function CarrierBadge({
  carrier,
  size = 40,
  className,
}) {
  const palette = resolvePalette(carrier);
  const Icon = resolveCarrierIcon(carrier);
  const barcodeBars = Math.max(8, Math.floor(size / 4));

  const iconSize = Math.floor(size * 0.44);
  const barcodeHeight = Math.max(3, Math.floor(size * 0.10));

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-[5px]",
        className
      )}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(155deg, ${palette.from} 0%, ${palette.to} 100%)`,
        boxShadow:
          "inset 0 1px 0 0 rgb(255 255 255 / 0.18), inset 0 -1px 0 0 rgb(0 0 0 / 0.18), 0 1px 2px 0 rgb(10 10 10 / 0.15)",
      }}
      aria-label={carrier}
    >
      
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgb(255 255 255 / 0.5) 0.5px, transparent 0.5px), radial-gradient(rgb(0 0 0 / 0.3) 0.5px, transparent 0.5px)",
          backgroundSize: "4px 4px, 5px 5px",
          backgroundPosition: "0 0, 2px 2px",
        }}
      />

      
      <span
        aria-hidden
        className="absolute right-0 top-0 h-full w-[2.5px]"
        style={{ background: palette.accent }}
      />

      
      <span
        aria-hidden
        className="absolute right-1.5 top-1 h-[5px] w-[5px] rounded-[1px] bg-white/30"
      />

      
      <span
        className="absolute inset-x-0 flex items-center justify-center text-white"
        style={{
          top: `${size * 0.10}px`,
          bottom: `${size * 0.20}px`,
        }}
      >
        <Icon
          size={iconSize}
          strokeWidth={2}
          style={{ filter: "drop-shadow(0 1px 1px rgb(0 0 0 / 0.22))" }}
        />
      </span>

      
      <div
        aria-hidden
        className="absolute inset-x-1 bottom-1 flex items-end justify-center gap-[1px] opacity-70"
        style={{ height: barcodeHeight }}
      >
        {Array.from({ length: barcodeBars }).map((_, i) => {
          const isThick = i % 3 === 0;
          return (
            <span
              key={i}
              className="bg-white"
              style={{
                width: isThick ? 1.5 : 1,
                height: i % 2 === 0 ? barcodeHeight : barcodeHeight - 1,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
