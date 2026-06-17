import { cn } from "../../lib/utils.js";

export default function FastWordmark({ variant = "full", className }) {
  const compact = variant === "f";

  return (
    <svg
      viewBox={compact ? "0 0 132 132" : "0 0 390 132"}
      role="img"
      aria-label={compact ? "F FastAriam" : "FastAriam"}
      className={cn("block", className)}
    >
      <defs>
        <linearGradient id="fast-capsule" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="52%" stopColor="#f8fbff" />
          <stop offset="100%" stopColor="#e7eef8" />
        </linearGradient>
        <linearGradient id="fast-navy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#114b78" />
          <stop offset="55%" stopColor="#073757" />
          <stop offset="100%" stopColor="#092a43" />
        </linearGradient>
        <linearGradient id="fast-red" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ef3b42" />
          <stop offset="100%" stopColor="#c91e28" />
        </linearGradient>
        <filter id="fast-lift" x="-16%" y="-30%" width="132%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#092a43" floodOpacity="0.20" />
          <feDropShadow dx="0" dy="2" stdDeviation="1.6" floodColor="#092a43" floodOpacity="0.18" />
        </filter>
      </defs>

      {compact ? (
        <g filter="url(#fast-lift)">
          <path
            d="M14 102 C22 45 44 17 83 12 L122 12 C127 12 130 17 128 22 L120 48 C118 54 112 58 105 58 L65 58 L61 72 L101 72 C107 72 110 77 108 83 L102 103 C100 110 94 114 87 114 L20 114 C16 114 13 110 14 102 Z"
            fill="url(#fast-capsule)"
          />
          <path
            d="M48 34 H111 L106 50 H65 L61 62 H99 L94 78 H56 L48 106 H23 Z"
            fill="url(#fast-navy)"
          />
          <path d="M28 80 H70 L65 95 H24 Z" fill="url(#fast-red)" />
        </g>
      ) : (
        <g filter="url(#fast-lift)">
          <path
            d="M3 111 C14 44 44 15 93 10 L352 10 C374 10 388 28 383 49 L374 84 C369 103 350 116 326 116 L12 116 C6 116 2 116 3 111 Z"
            fill="url(#fast-capsule)"
          />
          <g className="fast-wordmark-letters" fill="url(#fast-navy)">
            <path d="M63 34 H135 L129 51 H83 L79 63 H120 L114 80 H74 L66 105 H38 Z" />
            <path d="M143 34 H173 L188 105 H161 L159 93 H131 L123 105 H94 Z M141 76 H157 L153 53 Z" />
            <path d="M205 34 H278 L272 52 H228 C223 52 221 58 226 60 L251 69 C271 76 274 105 238 105 H172 L178 87 H222 C229 87 230 81 224 79 L198 70 C176 62 180 34 205 34 Z" />
            <path d="M286 34 H364 L358 52 H333 L316 105 H288 L305 52 H280 Z" />
          </g>
          <path d="M35 88 H126 L119 104 H31 Z" fill="url(#fast-red)" />
          <text
            x="91"
            y="124"
            fill="#1f4f8f"
            fontFamily="Inter, Arial, sans-serif"
            fontSize="14"
            fontWeight="700"
            letterSpacing="0.02em"
          >
            Ariam Cargo OS
          </text>
        </g>
      )}
    </svg>
  );
}
