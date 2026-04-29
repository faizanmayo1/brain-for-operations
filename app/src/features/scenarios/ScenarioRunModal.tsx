import { ArrowRight, Check, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { AiBadge } from "@/components/feedback/AiBadge";
import { Histogram } from "@/components/charts/Histogram";
import { Sparkline } from "@/components/charts/Sparkline";
import { Overline } from "@/components/primitives/Overline";
import {
  scenarios,
  distributions,
  scenarioLibrary,
  type ScenarioLibraryEntry,
} from "@/mocks/scenarios";
import { cn } from "@/lib/cn";

interface Props {
  entry: ScenarioLibraryEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScenarioRunModal({ entry, open, onOpenChange }: Props) {
  if (!entry) return null;
  const variant = scenarios[0]; // map to A as the canonical view

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="px-6 pt-6 pb-5 border-b border-border-subtle">
          <div className="flex items-center gap-2 mb-3">
            <AiBadge label="Scenario run" />
            <span className="mono text-[10.5px] text-text-tertiary">
              {entry.id}
            </span>
            <span className="h-1 w-1 rounded-full bg-text-tertiary" />
            <span className="text-[11.5px] text-text-tertiary mono">
              {entry.iterations.toLocaleString()} samples · {entry.durationSec}s
            </span>
          </div>
          <DialogTitle>{entry.title}</DialogTitle>
          <DialogDescription className="mt-2">
            {variant.description} Recommendation confidence aggregates across
            all simulated paths to produce expected outcomes and 5–95th
            percentile bands.
          </DialogDescription>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* KPI row */}
          <div className="grid grid-cols-4 gap-3">
            <Stat label="Expected SLA" value={`${entry.expectedSla}%`} positive />
            <Stat label="Cost index" value={entry.costIndex.toFixed(2)} />
            <Stat label="Throughput" value={`${Math.round(variant.throughputIndex * 100)}`} />
            <Stat label="Risk exposure" value={variant.riskExposure} muted />
          </div>

          {/* Trajectory */}
          <div>
            <Overline className="mb-2">SLA trajectory · 24h horizon</Overline>
            <div className="rounded-md border border-border-subtle bg-canvas/40 p-3">
              <Sparkline
                data={variant.sla}
                width={520}
                height={56}
                color="var(--accent-500)"
                showDot
              />
              <div className="mt-2 flex items-center justify-between text-[10.5px] text-text-tertiary mono">
                <span>now</span>
                <span>+12h</span>
                <span>+24h</span>
              </div>
            </div>
          </div>

          {/* Distribution */}
          <div>
            <Overline className="mb-2">SLA outcome distribution</Overline>
            <div className="rounded-md border border-border-subtle bg-canvas/40 p-3">
              <Histogram
                bins={distributions.A.sla}
                color="var(--accent-500)"
                height={64}
                highlightFrom={0.25}
                highlightTo={0.85}
              />
              <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-text-tertiary mono">
                <span>30%</span>
                <span>60%</span>
                <span>90%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Recommended decision */}
          <div className="rounded-md border-ai-gradient bg-gradient-to-r from-ai/8 to-accent-500/5 p-4">
            <div className="flex items-start gap-3">
              <span className="h-7 w-7 rounded-md bg-gradient-to-br from-accent-500 to-ai flex items-center justify-center flex-shrink-0">
                <Sparkles
                  className="h-3.5 w-3.5 text-white"
                  strokeWidth={2.4}
                />
              </span>
              <div className="flex-1">
                <div className="text-[12.5px] font-semibold text-text-primary">
                  Apply as decision
                </div>
                <div className="text-[12.5px] text-text-secondary mt-0.5 leading-5">
                  Convert this scenario into DEC-4081. Expected SLA save: 94%.
                  Audit trail preserved.
                </div>
              </div>
              <Button variant="primary" size="sm" className="gap-1.5">
                Apply <ArrowRight className="h-3 w-3" strokeWidth={2.2} />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-border-subtle bg-surface-2/40">
          <div className="text-[11px] text-text-tertiary">
            Run by{" "}
            <span className="text-text-secondary">{entry.ranBy}</span> ·{" "}
            {entry.ranAt} · model v4.2.1
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button variant="secondary" size="md">
              Duplicate & edit
            </Button>
            <Button variant="primary" size="md" className="gap-1.5">
              <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
              Apply as decision
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Stat({
  label,
  value,
  positive,
  muted,
}: {
  label: string;
  value: string;
  positive?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="rounded-md border border-border-subtle bg-canvas/40 p-3">
      <div className="text-[10px] uppercase tracking-[0.06em] font-semibold text-text-tertiary">
        {label}
      </div>
      <div
        className={cn(
          "mt-1 mono text-[16px] font-semibold tabular-nums",
          positive && "text-risk-low",
          muted && "text-text-secondary",
          !positive && !muted && "text-text-primary"
        )}
      >
        {value}
      </div>
    </div>
  );
}
