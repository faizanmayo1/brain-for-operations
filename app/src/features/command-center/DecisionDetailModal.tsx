import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { RiskBadge } from "@/components/feedback/RiskBadge";
import { AiBadge } from "@/components/feedback/AiBadge";
import { Overline } from "@/components/primitives/Overline";
import { decisionDetail } from "@/mocks/commandCenter";
import { Check, FlaskConical, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

interface DecisionDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DecisionDetailModal({
  open,
  onOpenChange,
}: DecisionDetailModalProps) {
  const d = decisionDetail;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2 mb-3">
            <span className="mono text-[10.5px] text-text-tertiary">
              {d.id}
            </span>
            <span className="h-1 w-1 rounded-full bg-text-tertiary" />
            <RiskBadge level={d.level} />
            <AiBadge label="Copilot recommendation" />
          </div>
          <DialogTitle>{d.title}</DialogTitle>
          <DialogDescription className="mt-2">{d.summary}</DialogDescription>
          <div className="mt-3 flex items-center gap-4 text-[11.5px] text-text-tertiary">
            <span>{d.source}</span>
            <span className="h-3 w-px bg-border-subtle" />
            <span className="flex items-center gap-1.5">
              <span className="mono text-text-secondary">{d.confidence}%</span>
              confidence
            </span>
          </div>
        </div>

        {/* Options compare table */}
        <div className="px-6 py-5">
          <Overline className="mb-3">Compare options</Overline>
          <div className="rounded-md border border-border-subtle overflow-hidden">
            <div className="grid grid-cols-[1fr_72px_72px_72px_72px] gap-3 px-3 py-2 bg-surface-2 border-b border-border-subtle">
              <Overline>Option</Overline>
              <Overline className="text-right">SLA save</Overline>
              <Overline className="text-right">Cost ×</Overline>
              <Overline className="text-right">Time</Overline>
              <Overline className="text-right">Risk</Overline>
            </div>
            {d.options.map((opt) => (
              <div
                key={opt.key}
                className={cn(
                  "grid grid-cols-[1fr_72px_72px_72px_72px] gap-3 px-3 py-3 items-center border-b border-border-subtle last:border-0",
                  opt.recommended &&
                    "bg-gradient-to-r from-accent-500/8 to-transparent"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={cn(
                      "mono text-[11px] font-semibold h-6 w-6 rounded-md inline-flex items-center justify-center flex-shrink-0",
                      opt.recommended
                        ? "bg-accent-500 text-white"
                        : "bg-surface-2 text-text-tertiary border border-border-strong"
                    )}
                  >
                    {opt.key}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-text-primary truncate">
                      {opt.label}
                    </div>
                    {opt.recommended && (
                      <div className="text-[10.5px] text-accent-200 flex items-center gap-1 mt-0.5">
                        <Sparkles className="h-2.5 w-2.5" strokeWidth={2.2} />
                        Recommended
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right mono text-[13px] text-text-primary font-medium">
                  {opt.sla}%
                </div>
                <div className="text-right mono text-[13px] text-text-secondary">
                  {opt.cost.toFixed(1)}
                </div>
                <div className="text-right mono text-[13px] text-text-secondary">
                  {opt.time}m
                </div>
                <div className="text-right">
                  <span
                    className={cn(
                      "mono text-[11px] font-medium",
                      opt.risk === "Low" && "text-risk-low",
                      opt.risk === "Medium" && "text-risk-medium",
                      opt.risk === "High" && "text-risk-critical"
                    )}
                  >
                    {opt.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reasoning trace */}
        <div className="px-6 pb-5">
          <Overline className="mb-3">AI reasoning trace</Overline>
          <div className="space-y-3">
            {d.reasoning.map((r, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-md bg-canvas/50 border border-border-subtle"
              >
                <span className="mono text-[10.5px] font-semibold text-ai bg-ai/10 border border-ai/30 rounded-full h-5 w-5 inline-flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <div className="text-[12.5px] font-semibold text-text-primary mb-0.5">
                    {r.title}
                  </div>
                  <div className="text-[12px] text-text-secondary leading-5">
                    {r.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border-subtle bg-surface-2/40">
          <div className="text-[11.5px] text-text-tertiary">
            Audit trail will record approver, timing, and reasoning snapshot.
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md">
              Decline
            </Button>
            <Button variant="secondary" size="md" className="gap-1.5">
              <FlaskConical className="h-3.5 w-3.5" strokeWidth={2} />
              Simulate
            </Button>
            <Button variant="primary" size="md" className="gap-1.5">
              <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
              Approve & execute
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
