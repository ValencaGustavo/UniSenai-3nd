import { cn } from "../../lib/utils.js";

export default function PageActionBar({
  eyebrow,
  title,
  meta,
  icon: Icon,
  actions,
  children,
  className,
}) {
  return (
    <section
      className={cn(
        "page-action-bar premium-panel relative px-4 py-2.5",
        className
      )}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="head-rule w-7 shrink-0" />
          {Icon && (
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[4px] border border-zinc-200 bg-zinc-50 text-[color:var(--color-brand)]">
              <Icon size={15} strokeWidth={1.9} />
            </span>
          )}
          <div className="min-w-0">
            {eyebrow && (
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--color-hazard)]">
                {eyebrow}
              </p>
            )}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {title && (
                <h2 className="font-display text-[15px] font-semibold leading-tight text-zinc-950">
                  {title}
                </h2>
              )}
              {meta && (
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                  {meta}
                </p>
              )}
            </div>
          </div>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-1.5">{actions}</div>}
      </div>
      {children && <div className="mt-3">{children}</div>}
    </section>
  );
}
