
export default function TruckSilhouette({
  width = 60,
  height = 28,
  color = "currentColor",
  opacity = 0.08,
  className,
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 28"
      fill="none"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      
      <rect x="2" y="6" width="32" height="14" fill={color} rx="0.8" />
      
      <line x1="13" y1="7.5" x2="13" y2="18.5" stroke="#ffffff" strokeWidth="0.6" opacity="0.4" />
      <line x1="23" y1="7.5" x2="23" y2="18.5" stroke="#ffffff" strokeWidth="0.6" opacity="0.4" />
      
      <path
        d="M 34 10 L 34 20 L 50 20 L 50 14 L 47 10 L 44 10 L 44 8 L 38 8 L 38 10 Z"
        fill={color}
      />
      
      <path d="M 40 10.5 L 40 13 L 47 13 L 45 11 L 44.5 10.5 Z" fill="#ffffff" opacity="0.5" />
      
      <circle cx="9" cy="22" r="3.2" fill={color} />
      <circle cx="9" cy="22" r="1.4" fill="#ffffff" opacity="0.3" />
      <circle cx="19" cy="22" r="3.2" fill={color} />
      <circle cx="19" cy="22" r="1.4" fill="#ffffff" opacity="0.3" />
      <circle cx="42" cy="22" r="3.2" fill={color} />
      <circle cx="42" cy="22" r="1.4" fill="#ffffff" opacity="0.3" />
      
      <rect x="33.5" y="14" width="0.7" height="6" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}
