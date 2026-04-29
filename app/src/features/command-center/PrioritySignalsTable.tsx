import { ArrowRight, Filter, MoreHorizontal } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { RiskBadge } from "@/components/feedback/RiskBadge";
import { LiveIndicator } from "@/components/feedback/LiveIndicator";
import { Overline } from "@/components/primitives/Overline";
import type { PrioritySignal } from "@/mocks/commandCenter";
import { cn } from "@/lib/cn";

interface Props {
  signals: PrioritySignal[];
  onSignalClick?: (signal: PrioritySignal) => void;
}

export function PrioritySignalsTable({ signals, onSignalClick }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <CardTitle>Priority signals</CardTitle>
          <span className="mono text-[11px] text-text-tertiary bg-surface-2 border border-border-subtle rounded-full px-1.5 h-5 inline-flex items-center">
            {signals.length}
          </span>
          <LiveIndicator />
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Filter className="h-3 w-3" strokeWidth={2} /> Filters
          </Button>
          <Button variant="ghost" size="sm">
            View all <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </Button>
        </div>
      </CardHeader>

      <div className="px-5">
        <div className="grid grid-cols-[2fr_120px_88px_88px_88px_36px] gap-3 px-2 py-2 border-b border-border-subtle">
          <Overline>Signal</Overline>
          <Overline>Risk</Overline>
          <Overline className="text-right">Score</Overline>
          <Overline className="text-right">Conf.</Overline>
          <Overline className="text-right">Time to act</Overline>
          <span />
        </div>
      </div>

      <CardBody className="pt-0 px-5">
        <div>
          {signals.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => onSignalClick?.(s)}
              className={cn(
                "group w-full grid grid-cols-[2fr_120px_88px_88px_88px_36px] gap-3 px-2 h-[52px] items-center text-left rounded-md transition-colors",
                "hover:bg-surface-2",
                idx !== signals.length - 1 && "border-b border-border-subtle"
              )}
            >
              {/* Signal column */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="mono text-[10.5px] text-text-tertiary tabular-nums flex-shrink-0 w-[58px]">
                  {s.id}
                </span>
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-text-primary truncate group-hover:text-text-primary">
                    {s.title}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-text-tertiary">
                    <span className="truncate">{s.zone}</span>
                    <span className="h-0.5 w-0.5 rounded-full bg-text-tertiary/60" />
                    <span className="truncate">{s.source}</span>
                    <span className="h-0.5 w-0.5 rounded-full bg-text-tertiary/60" />
                    <span className="mono">{s.age}</span>
                  </div>
                </div>
              </div>

              {/* Risk badge */}
              <div>
                <RiskBadge level={s.level} />
              </div>

              {/* Score */}
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="mono text-[15px] font-semibold text-text-primary tabular-nums">
                    {s.score}
                  </span>
                  <span
                    className={cn(
                      "mono text-[10.5px]",
                      s.delta > 0
                        ? "text-risk-high"
                        : s.delta < 0
                          ? "text-risk-low"
                          : "text-text-tertiary"
                    )}
                  >
                    {s.delta > 0 ? "▲" : s.delta < 0 ? "▼" : "•"}
                    {Math.abs(s.delta)}
                  </span>
                </div>
                <ConfidenceBar value={s.score} className="mt-1" />
              </div>

              {/* Confidence */}
              <div className="text-right">
                <span className="mono text-[13px] text-text-secondary tabular-nums">
                  {s.confidence}
                  <span className="text-text-tertiary text-[10.5px]">%</span>
                </span>
              </div>

              {/* Time to act */}
              <div className="text-right">
                <span className="mono text-[12.5px] text-text-secondary tabular-nums">
                  {s.timeToAct}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight
                    className="h-4 w-4 text-text-tertiary"
                    strokeWidth={2}
                  />
                </span>
              </div>
            </button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

function ConfidenceBar({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const color =
    value >= 88
      ? "var(--risk-critical)"
      : value >= 70
        ? "var(--risk-high)"
        : value >= 50
          ? "var(--risk-medium)"
          : "var(--risk-low)";
  return (
    <div
      className={cn("h-[3px] w-full bg-border-subtle/60 rounded-full overflow-hidden", className)}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}
