import * as React from "react";
import { Card } from "@/ui/card";
import { Overline } from "./Overline";
import { DeltaChip } from "@/components/feedback/DeltaChip";
import { cn } from "@/lib/cn";

interface KpiTileProps {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;
  deltaSemantic?: "positive" | "negative";
  helper?: string;
  icon?: React.ReactNode;
  chart?: React.ReactNode;
  accent?: "default" | "ai";
  className?: string;
}

export function KpiTile({
  label,
  value,
  unit,
  delta,
  deltaSemantic = "positive",
  helper,
  icon,
  chart,
  accent = "default",
  className,
}: KpiTileProps) {
  return (
    <Card
      className={cn(
        "p-5 overflow-hidden bg-grain hover:border-border-strong transition-colors",
        accent === "ai" && "border-ai-gradient",
        className
      )}
    >
      <div className="flex items-start justify-between relative">
        <Overline>{label}</Overline>
        {icon && (
          <span
            className={cn(
              "h-6 w-6 inline-flex items-center justify-center rounded-md border",
              accent === "ai"
                ? "text-ai bg-ai/10 border-ai/25"
                : "text-text-tertiary bg-surface-2 border-border-subtle"
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-1.5 relative">
        <span className="mono text-[32px] leading-none font-semibold tracking-[-0.02em] text-text-primary">
          {value}
        </span>
        {unit && (
          <span className="mono text-[14px] text-text-tertiary">{unit}</span>
        )}
      </div>
      <div className="mt-3.5 flex items-center justify-between gap-3 relative">
        <div className="flex items-center gap-2 min-w-0">
          {delta !== undefined && (
            <DeltaChip value={delta} semantic={deltaSemantic} />
          )}
          {helper && (
            <span className="text-[11.5px] text-text-tertiary truncate">
              {helper}
            </span>
          )}
        </div>
        {chart && <div className="flex-shrink-0">{chart}</div>}
      </div>
    </Card>
  );
}
