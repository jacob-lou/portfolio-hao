import type { ReactNode } from "react";
import { cn } from "./utils";

export function SectionHeading({
  eyebrow,
  title,
  icon,
  className,
}: {
  eyebrow?: string;
  title: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div>
        {eyebrow ? (
          <div className="smallcaps text-xs muted">{eyebrow}</div>
        ) : null}
        <h2 className="font-serifDisplay text-3xl sm:text-4xl tracking-tight">
          {title}
        </h2>
      </div>
      {icon ? (
        <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-xl2 border border-white/10 bg-white/5 shadow-insetGlow">
          {icon}
        </div>
      ) : null}
    </div>
  );
}