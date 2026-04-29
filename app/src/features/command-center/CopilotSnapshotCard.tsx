import { ArrowRight, RefreshCw } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { AiBadge } from "@/components/feedback/AiBadge";

const items = [
  {
    rank: 1,
    title: "Reroute 142 SE-2 shipments via SE-3 corridor",
    impact: "+94% SLA save",
    confidence: 87,
  },
  {
    rank: 2,
    title: "Authorize OT for Hub-7 evening shift (8h)",
    impact: "−47% throughput risk",
    confidence: 81,
  },
  {
    rank: 3,
    title: "Switch supplier-A to backup contract (T+24h)",
    impact: "−$92K exposure",
    confidence: 76,
  },
];

export function CopilotSnapshotCard() {
  return (
    <Card className="overflow-hidden border-ai-gradient">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AiBadge label="Copilot" />
          <CardTitle>What needs your attention</CardTitle>
        </div>
        <Button variant="ghost" size="icon" aria-label="Refresh">
          <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
        </Button>
      </CardHeader>

      <CardBody className="pt-1">
        <p className="text-[12.5px] text-text-tertiary mb-3 leading-5">
          Updated 2m ago · synthesised from 247 signals across 12 sources.
        </p>

        <ol className="space-y-2.5">
          {items.map((item) => (
            <li
              key={item.rank}
              className="group relative flex gap-3 p-3 rounded-md bg-canvas/40 border border-border-subtle hover:border-accent-500/40 hover:bg-surface-2 transition-colors cursor-pointer"
            >
              <span className="mono text-[11px] font-semibold text-ai bg-ai/10 border border-ai/30 rounded-full h-5 w-5 inline-flex items-center justify-center flex-shrink-0">
                {item.rank}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-text-primary font-medium leading-5">
                  {item.title}
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-[11px]">
                  <span className="text-risk-low font-medium">
                    {item.impact}
                  </span>
                  <span className="text-text-tertiary">·</span>
                  <span className="text-text-tertiary">
                    <span className="mono">{item.confidence}%</span> confidence
                  </span>
                </div>
              </div>
              <ArrowRight
                className="h-3.5 w-3.5 text-text-tertiary mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                strokeWidth={2}
              />
            </li>
          ))}
        </ol>

        <button className="mt-4 w-full h-9 rounded-md bg-canvas/40 border border-border-subtle hover:border-ai/40 hover:bg-ai/5 transition-colors flex items-center justify-center gap-1.5 text-[12.5px] text-text-secondary hover:text-text-primary">
          Open full Copilot conversation
          <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </button>
      </CardBody>
    </Card>
  );
}
