import { ArrowUpRight, Filter } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { RiskBadge } from "@/components/feedback/RiskBadge";
import { Overline } from "@/components/primitives/Overline";
import { evidence } from "@/mocks/copilot";
import { cn } from "@/lib/cn";

export function EvidenceTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Evidence signals</CardTitle>
          <span className="mono text-[11px] text-text-tertiary bg-surface-2 border border-border-subtle rounded-full px-1.5 h-5 inline-flex items-center">
            {evidence.length}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Filter className="h-3 w-3" strokeWidth={2} /> Filter
        </Button>
      </CardHeader>

      <div className="px-5">
        <div className="grid grid-cols-[2fr_120px_88px_80px_64px_36px] gap-3 px-2 py-2 border-b border-border-subtle">
          <Overline>Signal</Overline>
          <Overline>Risk</Overline>
          <Overline className="text-right">Score</Overline>
          <Overline className="text-right">Weight</Overline>
          <Overline className="text-right">Age</Overline>
          <span />
        </div>
      </div>

      <CardBody className="px-5 pt-0">
        {evidence.map((e, idx) => (
          <button
            key={e.id}
            className={cn(
              "group w-full grid grid-cols-[2fr_120px_88px_80px_64px_36px] gap-3 items-center px-2 h-12 text-left rounded-md transition-colors hover:bg-surface-2",
              idx !== evidence.length - 1 && "border-b border-border-subtle"
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
                  {e.source}
                </div>
              </div>
            </div>
            <RiskBadge level={e.level} />
            <div className="text-right mono text-[14px] font-semibold text-text-primary tabular-nums">
              {e.score}
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5">
                <div className="h-1 w-12 rounded-full bg-border-subtle/60 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-500 to-ai"
                    style={{ width: `${e.weight}%` }}
                  />
                </div>
                <span className="mono text-[12px] text-text-secondary tabular-nums w-7">
                  {e.weight}%
                </span>
              </div>
            </div>
            <div className="text-right mono text-[11.5px] text-text-tertiary tabular-nums">
              {e.freshness}
            </div>
            <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight
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
