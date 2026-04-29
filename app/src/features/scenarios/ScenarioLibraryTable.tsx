import { ArrowRight, Filter, Loader2 } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Overline } from "@/components/primitives/Overline";
import { scenarioLibrary, type ScenarioLibraryEntry } from "@/mocks/scenarios";
import { cn } from "@/lib/cn";

interface Props {
  onEntryClick?: (entry: ScenarioLibraryEntry) => void;
}

const statusStyles: Record<ScenarioLibraryEntry["status"], string> = {
  Saved: "bg-surface-2 text-text-secondary border-border-strong/60",
  Running: "bg-accent-500/12 text-accent-200 border-accent-500/30",
  Completed: "bg-risk-low/12 text-risk-low border-risk-low/30",
  Applied: "bg-ai/12 text-ai border-ai/30",
};

export function ScenarioLibraryTable({ onEntryClick }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Scenario library</CardTitle>
          <span className="mono text-[11px] text-text-tertiary bg-surface-2 border border-border-subtle rounded-full px-1.5 h-5 inline-flex items-center">
            {scenarioLibrary.length}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Filter className="h-3 w-3" strokeWidth={2} /> All statuses
          </Button>
          <Button variant="ghost" size="sm">
            View archive <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </Button>
        </div>
      </CardHeader>

      <div className="px-5">
        <div className="grid grid-cols-[2fr_180px_84px_72px_120px_88px_100px_36px] gap-3 px-2 py-2 border-b border-border-subtle">
          <Overline>Scenario</Overline>
          <Overline>Variant</Overline>
          <Overline className="text-right">Exp. SLA</Overline>
          <Overline className="text-right">Cost ×</Overline>
          <Overline>Run by</Overline>
          <Overline className="text-right">Iter / time</Overline>
          <Overline>Status</Overline>
          <span />
        </div>
      </div>

      <CardBody className="px-5 pt-0">
        {scenarioLibrary.map((e, idx) => (
          <button
            key={e.id}
            onClick={() => onEntryClick?.(e)}
            className={cn(
              "group w-full grid grid-cols-[2fr_180px_84px_72px_120px_88px_100px_36px] gap-3 items-center px-2 h-14 text-left rounded-md transition-colors hover:bg-surface-2",
              idx !== scenarioLibrary.length - 1 &&
                "border-b border-border-subtle"
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="mono text-[10.5px] text-text-tertiary tabular-nums w-[58px] flex-shrink-0">
                {e.id}
              </span>
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-text-primary truncate">
                  {e.title}
                </div>
                <div className="text-[11px] text-text-tertiary truncate">
                  ran {e.ranAt}
                </div>
              </div>
            </div>

            <div className="text-[12px] text-text-secondary truncate">
              {e.variant}
            </div>

            <div className="text-right">
              <span className="mono text-[14px] font-semibold text-text-primary tabular-nums">
                {e.expectedSla}
              </span>
              <span className="text-text-tertiary text-[11px] mono">%</span>
            </div>

            <div className="text-right mono text-[12.5px] text-text-secondary tabular-nums">
              {e.costIndex.toFixed(2)}
            </div>

            <div className="flex items-center gap-2 min-w-0">
              <span
                className={cn(
                  "h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-semibold flex-shrink-0",
                  e.ranBy === "AI Agent"
                    ? "bg-ai/15 text-ai border border-ai/30"
                    : "bg-gradient-to-br from-accent-500 to-ai text-white"
                )}
              >
                {e.ranByInitials}
              </span>
              <span className="text-[12px] text-text-secondary truncate">
                {e.ranBy}
              </span>
            </div>

            <div className="text-right">
              <div className="mono text-[12px] text-text-secondary">
                {e.iterations.toLocaleString()}
              </div>
              <div className="mono text-[10.5px] text-text-tertiary">
                {e.durationSec}s
              </div>
            </div>

            <div>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 mono text-[10.5px] uppercase tracking-wide font-semibold rounded-full px-2 h-5 border",
                  statusStyles[e.status]
                )}
              >
                {e.status === "Running" ? (
                  <Loader2
                    className="h-2.5 w-2.5 animate-spin"
                    strokeWidth={2.4}
                  />
                ) : (
                  <span
                    className={cn(
                      "h-1 w-1 rounded-full",
                      e.status === "Completed" && "bg-risk-low",
                      e.status === "Applied" && "bg-ai",
                      e.status === "Saved" && "bg-text-tertiary"
                    )}
                  />
                )}
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
