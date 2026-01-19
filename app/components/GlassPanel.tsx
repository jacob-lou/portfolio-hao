import type { ReactNode } from "react";
import { cn } from "./utils";

export function GlassPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass rounded-xl2", className)}>
      {children}
    </div>
  );
}