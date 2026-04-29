import { ArrowRight, Pause, Play } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { LiveIndicator } from "@/components/feedback/LiveIndicator";
import { AiBadge } from "@/components/feedback/AiBadge";
import { RiskBadge } from "@/components/feedback/RiskBadge";
import { liveRuns, type ActionRun } from "@/mocks/actions";
import { cn } from "@/lib/cn";

interface Props {
  onRunClick?: (run: ActionRun) => void;
}

const modePill: Record<string, string> = {
  auto: "bg-ai/10 text-ai border-ai/30",
  approval: "bg-accent-500/10 text-accent-200 border-accent-500/30",
  manual: "bg-surface-2 text-text-secondary border-border-strong/60",
};

const statusBar: Record<string, string> = {
  running: "bg-accent-500",
  "awaiting-approval": "bg-risk-medium",
  queued: "bg-text-tertiary",
  succeeded: "bg-risk-low",
  failed: "bg-risk-critical",
  "rolled-back": "bg-risk-high",
};

export function LiveRunsCard({ onRunClick }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Live runs</CardTitle>
          <LiveIndicator />
        </div>
        <Button variant="ghost" size="sm">
          See all <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </Button>
      </CardHeader>
      <CardBody className="space-y-3">
        {liveRuns.map((r) => (
          <button
            key={r.id}
            onClick={() => onRunClick?.(r)}
            className="group w-full text-left rounded-md border border-border-subtle hover:border-accent-500/40 hover:bg-surface-2 transition-colors overflow-hidden"
          >
            {/* Top progress bar */}
            <div className="relative h-[3px] bg-border-subtle/60">
              <div
                className={cn(
                  "absolute inset-y-0 left-0 transition-all duration-700",
                  statusBar[r.status]
                )}
                style={{ width: `${r.progress}%` }}
              />
            </div>

            <div className="p-3">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="mono text-[10.5px] text-text-tertiary">
                  {r.id}
                </span>
                <span className="h-1 w-1 rounded-full bg-text-tertiary" />
                <RiskBadge level={r.level} />
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-[10.5px] mono uppercase tracking-wide font-semibold rounded-full px-1.5 h-5 border",
                    modePill[r.mode]
                  )}
                >
                  {r.mode}
                </span>
                {r.mode === "auto" && <AiBadge />}
                <span className="ml-auto mono text-[10.5px] text-text-tertiary tabular-nums">
                  {r.duration}
                </span>
              </div>

              <div className="text-[13px] font-medium text-text-primary leading-5">
                {r.title}
              </div>

              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-[11px] text-text-tertiary">
                  <span className="mono">
                    {r.stepsCompleted}/{r.steps} steps
                  </span>
                  <span>·</span>
                  <span>linked to {r.decision}</span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    {r.systems.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] mono px-1.5 h-4 rounded-full bg-surface-2 border border-border-subtle inline-flex items-center"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {r.status === "running" ? (
                    <Button variant="ghost" size="sm" className="gap-1 h-7">
                      <Pause className="h-3 w-3" strokeWidth={2.2} />
                      Pause
                    </Button>
                  ) : r.status === "awaiting-approval" ? (
                    <Button variant="primary" size="sm" className="gap-1 h-7">
                      <Play className="h-3 w-3" strokeWidth={2.4} />
                      Approve
                    </Button>
                  ) : null}
                  <Button variant="ghost" size="sm" className="h-7">
                    Trace
                    <ArrowRight className="h-3 w-3" strokeWidth={2} />
                  </Button>
                </div>
              </div>
            </div>
          </button>
        ))}
      </CardBody>
    </Card>
  );
}
