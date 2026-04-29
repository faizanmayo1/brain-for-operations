import { Check, Loader2 } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { agentRuns } from "@/mocks/copilot";
import { cn } from "@/lib/cn";

export function AgentRunsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent orchestration trace</CardTitle>
        <span className="text-[11px] text-text-tertiary mono">
          {agentRuns.length} agents
        </span>
      </CardHeader>
      <CardBody>
        <div className="relative space-y-3">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border-subtle" />

          {agentRuns.map((run) => (
            <div key={run.id} className="relative pl-8">
              {/* Status node */}
              <div
                className={cn(
                  "absolute left-0 top-1.5 h-6 w-6 rounded-full flex items-center justify-center border",
                  run.status === "complete"
                    ? "bg-risk-low/15 border-risk-low/40 text-risk-low"
                    : run.status === "running"
                      ? "bg-accent-500/15 border-accent-500/40 text-accent-200"
                      : "bg-surface-2 border-border-strong text-text-tertiary"
                )}
              >
                {run.status === "complete" ? (
                  <Check className="h-3 w-3" strokeWidth={2.6} />
                ) : run.status === "running" ? (
                  <Loader2
                    className="h-3 w-3 animate-spin"
                    strokeWidth={2.4}
                  />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-text-tertiary" />
                )}
              </div>

              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[12.5px] font-semibold text-text-primary">
                    {run.agent}
                  </span>
                  <span className="mono text-[10px] text-text-tertiary">
                    {run.id}
                  </span>
                </div>
                <span className="mono text-[11px] text-text-tertiary tabular-nums">
                  {run.duration}
                </span>
              </div>
              <ul className="text-[11.5px] text-text-secondary space-y-0.5 leading-5">
                {run.steps.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-text-tertiary mono">·</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
