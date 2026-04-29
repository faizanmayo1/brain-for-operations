import * as React from "react";
import { cn } from "@/lib/cn";

export function Overline({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "block uppercase text-[10.5px] font-semibold tracking-[0.08em] text-text-tertiary",
        className
      )}
      {...props}
    />
  );
}
