import { ArrowRight, Filter, RotateCcw } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { RiskBadge } from "@/components/feedback/RiskBadge";
import { Overline } from "@/components/primitives/Overline";
import { actionHistory, type ActionHistoryEntry } from "@/mocks/actions";
import { cn } from "@/lib/cn";

interface Props {
  onEntryClick?: (entry: ActionHistoryEntry) => void;
}

const statusStyles: Record<string, string> = {
  succeeded: "bg-risk-low/12 text-risk-low border-risk-low/30",
  failed: "bg-risk-critical/12 text-risk-critical border-risk-critical/30",
  "rolled-back": "bg-risk-high/12 text-risk-high border-risk-high/30",
  running: "bg-accent-500/12 text-accent-200 border-accent-500/30",
  "awaiting-approval": "bg-risk-medium/12 text-risk-medium border-risk-medium/30",
  queued: "bg-surface-2 text-text-secondary border-border-strong/60",
};

const modePill: Record<string, string> = {
  auto: "bg-ai/10 text-ai border-ai/30",
  approval: "bg-accent-500/10 text-accent-200 border-accent-500/30",
  manual: "bg-surface-2 text-text-secondary border-border-strong/60",
};

const statusLabel: Record<string, string> = {
  succeeded: "Succeeded",
  failed: "Failed",
  "rolled-back": "Rolled back",
  running: "Running",
  "awaiting-approval": "Awaiting",
  queued: "Queued",
};

export function ActionHistoryTable({ onEntryClick }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Action history</CardTitle>
          <span className="mono text-[11px] text-text-tertiary bg-surface-2 border border-border-subtle rounded-full px-1.5 h-5 inline-flex items-center">
            today
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Filter className="h-3 w-3" strokeWidth={2} /> All modes
          </Button>
          <Button variant="ghost" size="sm">
            View archive <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </Button>
        </div>
      </CardHeader>

      <div className="px-5">
        <div className="grid grid-cols-[2fr_120px_88px_80px_120px_120px_72px_36px] gap-3 px-2 py-2 border-b border-border-subtle">
          <Overline>Action</Overline>
          <Overline>Status</Overline>
          <Overline>Mode</Overline>
          <Overline className="text-right">Duration</Overline>
          <Overline>Owner</Overline>
          <Overline>Impact</Overline>
          <Overline className="text-right">Done at</Overline>
          <span />
        </div>
      </div>

      <CardBody className="px-5 pt-0">
        {actionHistory.map((e, idx) => (
          <button
            key={e.id}
            onClick={() => onEntryClick?.(e)}
            className={cn(
              "group w-full grid grid-cols-[2fr_120px_88px_80px_120px_120px_72px_36px] gap-3 items-center px-2 h-14 text-left rounded-md transition-colors hover:bg-surface-2",
              idx !== actionHistory.length - 1 &&
                "border-b border-border-subtle"
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="mono text-[10.5px] text-text-tertiary tabular-nums w-[58px] flex-shrink-0">
                {e.id}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-text-primary truncate">
                    {e.title}
                  </span>
                  <RiskBadge level={e.level} />
                </div>
                <div className="text-[11px] text-text-tertiary truncate">
                  linked {e.decision}
                </div>
              </div>
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
                    e.status === "succeeded" && "bg-risk-low",
                    e.status === "failed" && "bg-risk-critical animate-pulse",
                    e.status === "rolled-back" && "bg-risk-high"
                  )}
                />
                {statusLabel[e.status]}
              </span>
            </div>

            <div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-[10.5px] mono uppercase tracking-wide font-semibold rounded-full px-1.5 h-5 border",
                  modePill[e.mode]
                )}
              >
                {e.mode}
              </span>
            </div>

            <div className="text-right mono text-[12.5px] text-text-secondary tabular-nums">
              {e.duration}
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

            <div className="text-[11.5px] text-risk-low font-medium truncate">
              {e.impact}
            </div>

            <div className="text-right mono text-[11px] text-text-tertiary tabular-nums">
              {e.completedAt}
            </div>

            <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
              {e.status === "rolled-back" || e.status === "failed" ? (
                <RotateCcw
                  className="h-4 w-4 text-text-tertiary"
                  strokeWidth={2}
                />
              ) : (
                <ArrowRight
                  className="h-4 w-4 text-text-tertiary"
                  strokeWidth={2}
                />
              )}
            </div>
          </button>
        ))}
      </CardBody>
    </Card>
  );
}
