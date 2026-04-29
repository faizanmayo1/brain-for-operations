import { ArrowRight, Filter } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { RiskBadge } from "@/components/feedback/RiskBadge";
import { Sparkline } from "@/components/charts/Sparkline";
import { Overline } from "@/components/primitives/Overline";
import type { RegisterEntry } from "@/mocks/risk";
import { cn } from "@/lib/cn";

interface Props {
  entries: RegisterEntry[];
  onEntryClick?: (entry: RegisterEntry) => void;
}

const levelColors: Record<string, string> = {
  critical: "var(--risk-critical)",
  high: "var(--risk-high)",
  medium: "var(--risk-medium)",
  low: "var(--risk-low)",
};

const statusStyles: Record<string, string> = {
  Active: "bg-risk-critical/12 text-risk-critical border-risk-critical/30",
  Watching: "bg-risk-medium/12 text-risk-medium border-risk-medium/30",
  Stable: "bg-risk-low/12 text-risk-low border-risk-low/30",
};

export function RiskRegisterTable({ entries, onEntryClick }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Risk register</CardTitle>
          <span className="mono text-[11px] text-text-tertiary bg-surface-2 border border-border-subtle rounded-full px-1.5 h-5 inline-flex items-center">
            {entries.length}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Filter className="h-3 w-3" strokeWidth={2} /> All zones
          </Button>
          <Button variant="ghost" size="sm">
            Export <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </Button>
        </div>
      </CardHeader>

      <div className="px-5">
        <div className="grid grid-cols-[2fr_120px_72px_64px_88px_120px_88px_36px] gap-3 px-2 py-2 border-b border-border-subtle">
          <Overline>Risk · zone</Overline>
          <Overline>Level</Overline>
          <Overline className="text-right">Score</Overline>
          <Overline className="text-right">Δ 24h</Overline>
          <Overline>Trend</Overline>
          <Overline>Owner</Overline>
          <Overline>Status</Overline>
          <span />
        </div>
      </div>

      <CardBody className="px-5 pt-0">
        {entries.map((e, idx) => (
          <button
            key={e.id}
            onClick={() => onEntryClick?.(e)}
            className={cn(
              "group w-full grid grid-cols-[2fr_120px_72px_64px_88px_120px_88px_36px] gap-3 items-center px-2 h-14 text-left rounded-md transition-colors hover:bg-surface-2",
              idx !== entries.length - 1 && "border-b border-border-subtle"
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="mono text-[10.5px] text-text-tertiary tabular-nums w-[58px] flex-shrink-0">
                {e.id}
              </span>
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-text-primary truncate">
                  {e.dimension}
                </div>
                <div className="text-[11px] text-text-tertiary truncate flex items-center gap-1.5">
                  <span>{e.zone}</span>
                  <span className="h-0.5 w-0.5 rounded-full bg-text-tertiary/60" />
                  <span className="mono">{e.signals} sig</span>
                  <span className="h-0.5 w-0.5 rounded-full bg-text-tertiary/60" />
                  <span className="mono">{e.ageMin}m old</span>
                </div>
              </div>
            </div>

            <RiskBadge level={e.level} />

            <div className="text-right mono text-[15px] font-semibold text-text-primary tabular-nums">
              {e.current}
            </div>

            <div className="text-right">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 mono text-[11.5px]",
                  e.change > 0
                    ? "text-risk-high"
                    : e.change < 0
                      ? "text-risk-low"
                      : "text-text-tertiary"
                )}
              >
                {e.change > 0 ? "▲" : e.change < 0 ? "▼" : "•"}
                {Math.abs(e.change)}
              </span>
            </div>

            <div>
              <Sparkline
                data={e.trend}
                width={88}
                height={24}
                color={levelColors[e.level]}
                showDot
              />
            </div>

            <div className="flex items-center gap-2 min-w-0">
              <span
                className={cn(
                  "h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-semibold flex-shrink-0",
                  e.owner === "AI Agent"
                    ? "bg-ai/15 text-ai border border-ai/30"
                    : "bg-gradient-to-br from-accent-500 to-ai text-white"
                )}
              >
                {e.ownerInitials}
              </span>
              <span className="text-[12px] text-text-secondary truncate">
                {e.owner}
              </span>
            </div>

            <div>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 mono text-[10.5px] uppercase tracking-wide font-semibold rounded-full px-2 h-5 border",
                  statusStyles[e.status]
                )}
              >
                <span
                  className={cn(
                    "h-1 w-1 rounded-full",
                    e.status === "Active"
                      ? "bg-risk-critical animate-pulse"
                      : e.status === "Watching"
                        ? "bg-risk-medium"
                        : "bg-risk-low"
                  )}
                />
                {e.status}
              </span>
            </div>

            <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight
                className="h-4 w-4 text-text-tertiary"
                strokeWidth={2}
              />
            </div>
          </button>
        ))}
      </CardBody>
    </Card>
  );
}
