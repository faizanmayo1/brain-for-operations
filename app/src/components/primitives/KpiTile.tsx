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
        "p-5 overflow-hidden bg-grain",
        accent === "ai" && "border-ai-gradient",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <Overline>{label}</Overline>
        {icon && <span className="text-text-tertiary">{icon}</span>}
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="mono text-[30px] leading-none font-semibold tracking-tight text-text-primary">
          {value}
        </span>
        {unit && (
          <span className="mono text-[14px] text-text-tertiary">{unit}</span>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {delta !== undefined && (
            <DeltaChip value={delta} semantic={deltaSemantic} />
          )}
          {helper && (
            <span className="text-[12px] text-text-tertiary">{helper}</span>
          )}
        </div>
        {chart && <div className="flex-shrink-0">{chart}</div>}
      </div>
    </Card>
  );
}
