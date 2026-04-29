import { ArrowRight, Check, FlaskConical, Sparkles } from "lucide-react";
import { Button } from "@/ui/button";
import { RiskBadge } from "@/components/feedback/RiskBadge";
import type { RankedDecision } from "@/mocks/copilot";
import { cn } from "@/lib/cn";

interface Props {
  decision: RankedDecision;
  onExecute?: (id: string) => void;
}

export function RankedDecisionCard({ decision: d, onExecute }: Props) {
  return (
    <div
      className={cn(
        "relative rounded-card overflow-hidden bg-surface border border-border-subtle transition-colors",
        d.recommended && "border-ai-gradient"
      )}
    >
      {/* Rank badge */}
      <div className="flex items-start gap-4 p-5">
        <div className="flex-shrink-0">
          <div
            className={cn(
              "h-9 w-9 rounded-lg flex items-center justify-center mono text-[14px] font-semibold",
              d.recommended
                ? "bg-gradient-to-br from-accent-500 to-ai text-white shadow-[0_4px_18px_-4px_rgba(91,108,255,0.55)]"
                : "bg-surface-2 text-text-secondary border border-border-strong"
            )}
          >
            {d.rank}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="mono text-[10.5px] text-text-tertiary">
              {d.id}
            </span>
            <span className="h-1 w-1 rounded-full bg-text-tertiary" />
            <RiskBadge level={d.level} />
            {d.recommended && (
              <span className="inline-flex items-center gap-1 mono text-[10px] uppercase tracking-wider font-semibold text-ai bg-ai/10 border border-ai/30 rounded-full px-1.5 h-5">
                <Sparkles className="h-2.5 w-2.5" strokeWidth={2.4} />
                Recommended
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-semibold text-text-primary leading-6 tracking-tight">
            {d.title}
          </h3>

          {/* Description */}
          <p className="mt-1.5 text-[12.5px] text-text-secondary leading-5">
            {d.description}
          </p>

          {/* Stat row */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            <Stat label="Confidence" value={`${d.confidence}%`} bar={d.confidence} />
            <Stat label="Expected impact" value={d.expectedImpact} positive />
            <Stat label="Quantified" value={d.impactQuant} muted />
            <Stat label="Time to execute" value={d.timeToExecute} muted />
          </div>

          {/* Sources + actions */}
          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
              <span className="uppercase tracking-wide">From signals</span>
              {d.signals.map((s) => (
                <span
                  key={s}
                  className="mono px-1.5 h-5 rounded-full bg-surface-2 border border-border-subtle text-text-secondary inline-flex items-center hover:border-accent-500/40 cursor-pointer transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="sm">
                Explain
                <ArrowRight className="h-3 w-3" strokeWidth={2} />
              </Button>
              <Button variant="secondary" size="sm" className="gap-1.5">
                <FlaskConical className="h-3 w-3" strokeWidth={2} />
                Simulate
              </Button>
              <Button
                variant={d.recommended ? "primary" : "secondary"}
                size="sm"
                className="gap-1.5"
                onClick={() => onExecute?.(d.id)}
              >
                <Check className="h-3 w-3" strokeWidth={2.4} />
                Execute
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  bar,
  positive,
  muted,
}: {
  label: string;
  value: string;
  bar?: number;
  positive?: boolean;
  muted?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.06em] font-semibold text-text-tertiary">
        {label}
      </div>
      <div
        className={cn(
          "mt-1 mono text-[15px] font-semibold tabular-nums",
          positive && "text-risk-low",
          muted && "text-text-secondary",
          !positive && !muted && "text-text-primary"
        )}
      >
        {value}
      </div>
      {bar !== undefined && (
        <div className="mt-1 h-[3px] rounded-full bg-border-subtle/60 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-500 to-ai"
            style={{ width: `${bar}%` }}
          />
        </div>
      )}
    </div>
  );
}
