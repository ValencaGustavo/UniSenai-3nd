
export default function HighwayPattern({
  width = 600,
  height = 200,
  className,
  opacity = 0.06,
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ opacity }}
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="hw-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fafafa" stopOpacity="0" />
          <stop offset="50%" stopColor="#fafafa" stopOpacity="1" />
          <stop offset="100%" stopColor="#fafafa" stopOpacity="0" />
        </linearGradient>
        <mask id="hw-mask">
          <rect x="0" y="0" width={width} height={height} fill="url(#hw-fade)" />
        </mask>
      </defs>
      <g mask="url(#hw-mask)" stroke="#fafafa" fill="none">
        
        <line
          x1="0"
          y1={height / 2}
          x2={width}
          y2={height / 2}
          strokeWidth="1.5"
        />
        
        <line
          x1="0"
          y1={height / 2 - 30}
          x2={width}
          y2={height / 2 - 30}
          strokeWidth="0.8"
          strokeDasharray="14 10"
        />
        <line
          x1="0"
          y1={height / 2 - 60}
          x2={width}
          y2={height / 2 - 60}
          strokeWidth="0.6"
          strokeDasharray="10 14"
        />
        
        <line
          x1="0"
          y1={height / 2 + 30}
          x2={width}
          y2={height / 2 + 30}
          strokeWidth="0.8"
          strokeDasharray="14 10"
        />
        <line
          x1="0"
          y1={height / 2 + 60}
          x2={width}
          y2={height / 2 + 60}
          strokeWidth="0.6"
          strokeDasharray="10 14"
        />
        
        {Array.from({ length: 20 }).map((_, i) => {
          const x = (i * width) / 20;
          return (
            <line
              key={i}
              x1={x}
              y1={height / 2 - 6}
              x2={x}
              y2={height / 2 + 6}
              strokeWidth="0.5"
            />
          );
        })}
      </g>
    </svg>
  );
}
