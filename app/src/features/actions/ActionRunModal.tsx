import { Check, Loader2, Pause, ShieldCheck, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { RiskBadge } from "@/components/feedback/RiskBadge";
import { AiBadge } from "@/components/feedback/AiBadge";
import { LiveIndicator } from "@/components/feedback/LiveIndicator";
import { Overline } from "@/components/primitives/Overline";
import { execTrace, liveRuns } from "@/mocks/actions";
import { cn } from "@/lib/cn";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActionRunModal({ open, onOpenChange }: Props) {
  const run = liveRuns[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="px-6 pt-6 pb-5 border-b border-border-subtle">
          <div className="flex items-center gap-2 mb-3">
            <span className="mono text-[10.5px] text-text-tertiary">
              {run.id}
            </span>
            <span className="h-1 w-1 rounded-full bg-text-tertiary" />
            <RiskBadge level={run.level} />
            <AiBadge label="Agentic execution" />
            <LiveIndicator />
          </div>
          <DialogTitle>{run.title}</DialogTitle>
          <DialogDescription className="mt-2">
            Executing on behalf of decision {run.decision}. The orchestrator is
            coordinating 4 specialized agents across {run.systems.join(", ")}{" "}
            with full audit logging.
          </DialogDescription>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Progress card */}
          <div className="rounded-md border border-border-subtle bg-canvas/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <Overline>Execution progress</Overline>
              <span className="mono text-[11px] text-text-tertiary tabular-nums">
                {run.stepsCompleted}/{run.steps} steps · {run.duration}
              </span>
            </div>
            <div className="relative h-2 rounded-full bg-border-subtle/60 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-500 to-ai transition-all duration-700"
                style={{ width: `${run.progress}%` }}
              />
            </div>
            <div className="mt-2 mono text-[11px] text-text-tertiary tabular-nums text-right">
              {run.progress}%
            </div>
          </div>

          {/* Step trace */}
          <div>
            <Overline className="mb-2">Step-by-step trace</Overline>
            <div className="relative space-y-2">
              <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border-subtle" />
              {execTrace.map((s) => (
                <div
                  key={s.step}
                  className="relative pl-8 rounded-md p-2 border border-transparent hover:border-border-subtle hover:bg-surface-2/40 transition-colors"
                >
                  <span
                    className={cn(
                      "absolute left-0 top-2 h-6 w-6 rounded-full flex items-center justify-center border",
                      s.status === "complete" &&
                        "bg-risk-low/15 border-risk-low/40 text-risk-low",
                      s.status === "running" &&
                        "bg-accent-500/15 border-accent-500/40 text-accent-200",
                      s.status === "queued" &&
                        "bg-surface-2 border-border-strong text-text-tertiary"
                    )}
                  >
                    {s.status === "complete" ? (
                      <Check className="h-3 w-3" strokeWidth={2.6} />
                    ) : s.status === "running" ? (
                      <Loader2
                        className="h-3 w-3 animate-spin"
                        strokeWidth={2.4}
                      />
                    ) : (
                      <span className="mono text-[9.5px] text-text-tertiary">
                        {s.step}
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[12.5px] font-semibold text-text-primary">
                      {s.label}
                    </span>
                    <span className="mono text-[10.5px] text-text-tertiary">
                      {s.agent}
                    </span>
                    {s.durationMs > 0 && (
                      <span className="ml-auto mono text-[10.5px] text-text-tertiary tabular-nums">
                        {s.durationMs >= 1000
                          ? `${(s.durationMs / 1000).toFixed(1)}s`
                          : `${s.durationMs}ms`}
                      </span>
                    )}
                  </div>
                  {s.detail && (
                    <div className="text-[11.5px] text-text-secondary leading-5 pl-0.5">
                      {s.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Audit callout */}
          <div className="flex gap-2.5 p-3 rounded-md bg-canvas/50 border border-border-subtle">
            <ShieldCheck
              className="h-4 w-4 text-text-tertiary mt-0.5 flex-shrink-0"
              strokeWidth={2}
            />
            <p className="text-[11.5px] text-text-tertiary leading-5">
              Every step is timestamped, signed, and stored alongside the
              triggering decision and agent reasoning. Roll-back available
              until T+90 minutes.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-border-subtle bg-surface-2/40">
          <div className="text-[11px] text-text-tertiary">
            Started {run.startedAt} · expected completion in ~30s
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" className="gap-1.5">
              <Pause className="h-3.5 w-3.5" strokeWidth={2} /> Pause
            </Button>
            <Button variant="destructive" size="md" className="gap-1.5">
              <X className="h-3.5 w-3.5" strokeWidth={2} /> Abort + roll-back
            </Button>
            <Button variant="primary" size="md" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
