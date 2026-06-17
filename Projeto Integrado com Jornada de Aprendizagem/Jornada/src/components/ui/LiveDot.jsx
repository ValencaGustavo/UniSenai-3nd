import { cn } from "../../lib/utils.js";


export default function LiveDot({ tone = "emerald", className }) {
  return (
    <span
      className={cn(
        "live-dot",
        tone === "amber" && "live-dot--amber",
        tone === "red" && "live-dot--red",
        className
      )}
      aria-hidden
    />
  );
}
