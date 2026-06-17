
export default function AuroraField() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(15 23 42 / 0.035) 1px, transparent 1px), linear-gradient(0deg, rgb(15 23 42 / 0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute inset-0 bg-grain opacity-[0.4]" />
    </div>
  );
}
