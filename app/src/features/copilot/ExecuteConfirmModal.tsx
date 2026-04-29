import { Check, ShieldCheck, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { AiBadge } from "@/components/feedback/AiBadge";
import { Overline } from "@/components/primitives/Overline";
import { rankedDecisions } from "@/mocks/copilot";

interface Props {
  open: boolean;
  decisionId: string | null;
  onOpenChange: (open: boolean) => void;
}

export function ExecuteConfirmModal({ open, decisionId, onOpenChange }: Props) {
  const d =
    rankedDecisions.find((x) => x.id === decisionId) || rankedDecisions[0];

  const downstreamSystems = [
    { name: "OTM · routing", action: "create reroute order × 142" },
    { name: "WMS · Hub-7", action: "trigger inbound rebalance" },
    { name: "Slack · #ops-incident", action: "post execution summary" },
    { name: "Audit log", action: "record decision + reasoning" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px]">
        <div className="px-6 pt-6 pb-5 border-b border-border-subtle">
          <div className="flex items-center gap-2 mb-3">
            <AiBadge label="Copilot · execute decision" />
            <span className="mono text-[10.5px] text-text-tertiary">
              {d.id}
            </span>
          </div>
          <DialogTitle>Execute: {d.title}</DialogTitle>
          <DialogDescription className="mt-2">
            {d.description}
          </DialogDescription>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Confidence" value={`${d.confidence}%`} />
            <Stat label="Expected impact" value={d.expectedImpact} positive />
            <Stat label="ETA" value={d.timeToExecute} />
          </div>

          <div>
            <Overline className="mb-2">Downstream systems</Overline>
            <ul className="space-y-1.5">
              {downstreamSystems.map((s, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-[12.5px] text-text-secondary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                  <span className="font-mono text-[11.5px] text-text-tertiary w-[160px]">
                    {s.name}
                  </span>
                  <span>{s.action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2.5 p-3 rounded-md bg-canvas/50 border border-border-subtle">
            <ShieldCheck
              className="h-4 w-4 text-text-tertiary mt-0.5 flex-shrink-0"
              strokeWidth={2}
            />
            <p className="text-[11.5px] text-text-tertiary leading-5">
              This action will be recorded in the audit trail under your name
              and timestamped at the moment of approval. Reasoning trace is
              archived alongside.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border-subtle bg-surface-2/40">
          <Button
            variant="ghost"
            size="md"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button variant="secondary" size="md" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            Schedule for 14:00
          </Button>
          <Button variant="primary" size="md" className="gap-1.5">
            <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
            Approve & execute now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Stat({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-md border border-border-subtle bg-canvas/40 p-3">
      <div className="text-[10px] uppercase tracking-[0.06em] font-semibold text-text-tertiary">
        {label}
      </div>
      <div
        className={
          positive
            ? "mt-1 mono text-[16px] font-semibold text-risk-low"
            : "mt-1 mono text-[16px] font-semibold text-text-primary"
        }
      >
        {value}
      </div>
    </div>
  );
}
