import { cn } from "../../lib/utils.js";


const TYPE_STYLES = {
  xlsx: { fg: "#0a7942", bg: "#dcfce7", ring: "#16a34a" },
  xls:  { fg: "#0a7942", bg: "#dcfce7", ring: "#16a34a" },
  csv:  { fg: "#1f4f8f", bg: "#e6eef9", ring: "#1f4f8f" },
  tsv:  { fg: "#1f4f8f", bg: "#e6eef9", ring: "#1f4f8f" },
  pdf:  { fg: "#9f1b22", bg: "#fce6e7", ring: "#d7282f" },
  json: { fg: "#6d28d9", bg: "#ede9fe", ring: "#7c3aed" },
  txt:  { fg: "#52525b", bg: "#f4f4f5", ring: "#71717a" },
  default: { fg: "#52525b", bg: "#f4f4f5", ring: "#a1a1aa" },
};

function getExtension(filename) {
  if (!filename) return "default";
  const m = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "default";
}

export default function FileTypeIcon({ filename, size = 38, className }) {
  const ext = getExtension(filename);
  const style = TYPE_STYLES[ext] ?? TYPE_STYLES.default;
  const w = size;
  const h = size * 1.1;
  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: w, height: h }}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 38 42"
        fill="none"
        aria-hidden
      >
        <defs>
          <filter id={`file-shadow-${ext}`} x="-10%" y="-5%" width="120%" height="115%">
            <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.10" />
          </filter>
        </defs>
        
        <path
          d="M 4 1 L 28 1 L 37 10 L 37 39 Q 37 41, 35 41 L 4 41 Q 2 41, 2 39 L 2 3 Q 2 1, 4 1 Z"
          fill={style.bg}
          stroke={style.ring}
          strokeOpacity="0.35"
          strokeWidth="0.8"
          filter={`url(#file-shadow-${ext})`}
        />
        
        <path
          d="M 28 1 L 28 10 L 37 10 Z"
          fill="#ffffff"
          stroke={style.ring}
          strokeOpacity="0.35"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        
        <path
          d="M 28 1 L 28 10 L 37 10 L 28 1 Z"
          fill={style.ring}
          fillOpacity="0.06"
        />
        
        <rect x="6" y="14" width="20" height="1.5" rx="0.5" fill={style.fg} fillOpacity="0.20" />
        <rect x="6" y="18" width="26" height="1.5" rx="0.5" fill={style.fg} fillOpacity="0.20" />
        <rect x="6" y="22" width="22" height="1.5" rx="0.5" fill={style.fg} fillOpacity="0.20" />
        
        <rect
          x="4"
          y="29"
          width="22"
          height="9"
          rx="1.2"
          fill={style.fg}
        />
        <text
          x="15"
          y="36"
          fill="#ffffff"
          fontFamily="JetBrains Mono, monospace"
          fontSize="6"
          fontWeight="700"
          textAnchor="middle"
          letterSpacing="0.08em"
        >
          {ext.toUpperCase().slice(0, 4)}
        </text>
      </svg>
    </div>
  );
}
