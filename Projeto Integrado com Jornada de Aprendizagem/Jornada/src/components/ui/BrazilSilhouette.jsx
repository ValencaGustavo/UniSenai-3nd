
export const BRAZIL_PATH = `
  M 168 30
  C 195 26, 225 36, 240 60
  C 258 80, 270 110, 275 140
  C 274 165, 258 178, 240 190
  C 232 215, 232 240, 220 255
  C 200 263, 178 273, 162 290
  C 148 315, 138 340, 130 350
  C 118 340, 108 322, 92 305
  C 70 285, 50 258, 35 228
  C 22 200, 16 168, 22 138
  C 30 110, 48 85, 72 65
  C 100 45, 132 32, 168 30 Z
`;


export const BRAZIL_REGIONS = [
  "M 90 150 Q 170 160, 260 145",
  "M 80 220 Q 160 215, 245 220",
  "M 95 280 Q 155 275, 215 270",
];

export default function BrazilSilhouette({
  width,
  height,
  fill = "rgb(31 79 143 / 0.04)",
  stroke = "rgb(31 79 143 / 0.35)",
  strokeWidth = 0.6,
  showRegions = true,
  className,
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 290 360"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <filter id="brazil-inner-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
          <feOffset dx="0" dy="0.6" />
          <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            values="0 0 0 0 0.12
                    0 0 0 0 0.31
                    0 0 0 0 0.56
                    0 0 0 0.35 0"
          />
          <feComposite in2="SourceGraphic" operator="atop" />
        </filter>
      </defs>

      <path
        d={BRAZIL_PATH}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      
      <path
        d={BRAZIL_PATH}
        fill="transparent"
        stroke="rgb(31 79 143 / 0.18)"
        strokeWidth="0.4"
        strokeLinejoin="round"
        filter="url(#brazil-inner-shadow)"
      />

      
      {showRegions &&
        BRAZIL_REGIONS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="rgb(31 79 143 / 0.12)"
            strokeWidth="0.5"
            strokeDasharray="1.5 2.5"
            fill="none"
          />
        ))}
    </svg>
  );
}
