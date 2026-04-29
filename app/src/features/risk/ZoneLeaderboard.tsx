import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Sparkline } from "@/components/charts/Sparkline";
import { LiveIndicator } from "@/components/feedback/LiveIndicator";
import type { Zone } from "@/mocks/risk";
import { cn } from "@/lib/cn";

interface Props {
  zones: Zone[];
  onZoneClick?: (zone: Zone) => void;
}

const levelColors: Record<string, string> = {
  critical: "var(--risk-critical)",
  high: "var(--risk-high)",
  medium: "var(--risk-medium)",
  low: "var(--risk-low)",
};

const levelBg: Record<string, string> = {
  critical: "bg-risk-critical",
  high: "bg-risk-high",
  medium: "bg-risk-medium",
  low: "bg-risk-low",
};

export function ZoneLeaderboard({ zones, onZoneClick }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Top changing zones</CardTitle>
          <LiveIndicator />
        </div>
        <span className="text-[11px] text-text-tertiary">last 24h</span>
      </CardHeader>
      <CardBody className="pt-1 space-y-1.5">
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => onZoneClick?.(z)}
            className="group w-full flex items-center gap-3 p-2.5 rounded-md border border-border-subtle hover:border-accent-500/40 hover:bg-surface-2 transition-colors text-left"
          >
            <span className={cn("h-7 w-1 rounded-full", levelBg[z.level])} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2 mb-0.5">
                <div className="text-[12.5px] font-semibold text-text-primary truncate">
                  {z.name}
                </div>
                <div className="mono text-[15px] font-semibold text-text-primary tabular-nums">
                  {z.composite}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] text-text-tertiary truncate">
                  {z.region} · {z.signals} signals
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 mono text-[10.5px]",
                    z.delta24h > 0 ? "text-risk-high" : "text-risk-low"
                  )}
                >
                  {z.delta24h > 0 ? (
                    <ArrowUpRight className="h-3 w-3" strokeWidth={2.4} />
                  ) : z.delta24h < 0 ? (
                    <ArrowDownRight className="h-3 w-3" strokeWidth={2.4} />
                  ) : null}
                  {z.delta24h === 0 ? "—" : Math.abs(z.delta24h)}
                </span>
              </div>
            </div>
            <Sparkline
              data={z.trend}
              width={64}
              height={24}
              color={levelColors[z.level]}
              showDot
            />
          </button>
        ))}
      </CardBody>
    </Card>
  );
}
