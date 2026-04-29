import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { RiskBadge } from "@/components/feedback/RiskBadge";
import { AiBadge } from "@/components/feedback/AiBadge";
import { approvalQueue } from "@/mocks/actions";
import { Check, X } from "lucide-react";

export function ApprovalQueueCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Approval queue</CardTitle>
          <span className="mono text-[11px] text-risk-high bg-risk-high/12 border border-risk-high/30 rounded-full px-1.5 h-5 inline-flex items-center">
            {approvalQueue.length}
          </span>
        </div>
        <Button variant="ghost" size="sm">
          Approve all
        </Button>
      </CardHeader>
      <CardBody className="space-y-2.5">
        {approvalQueue.map((a) => (
          <div
            key={a.id}
            className="rounded-md border border-border-subtle p-3 hover:border-accent-500/40 transition-colors group"
          >
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="mono text-[10.5px] text-text-tertiary">
                {a.id}
              </span>
              <span className="h-1 w-1 rounded-full bg-text-tertiary" />
              <RiskBadge level={a.level} />
              {a.ai && <AiBadge label="AI proposed" />}
              <span className="ml-auto mono text-[10.5px] text-text-tertiary tabular-nums">
                {a.ageMin}m old
              </span>
            </div>
            <div className="text-[13px] font-medium text-text-primary leading-5 mb-2">
              {a.title}
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-[11px] text-text-tertiary">
                <span>
                  by{" "}
                  <span className="text-text-secondary">{a.requestedBy}</span>
                </span>
                <span className="h-0.5 w-0.5 rounded-full bg-text-tertiary/60" />
                <span className="text-risk-low font-medium">
                  {a.expectedImpact}
                </span>
                <span className="h-0.5 w-0.5 rounded-full bg-text-tertiary/60" />
                <span className="mono">{a.confidence}% conf</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="sm" className="gap-1">
                  <X className="h-3 w-3" strokeWidth={2.4} />
                  Decline
                </Button>
                <Button variant="primary" size="sm" className="gap-1">
                  <Check className="h-3 w-3" strokeWidth={2.4} />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="text-[10.5px] text-text-tertiary pt-1">
          Approving inherits the AI reasoning trace and writes to the audit
          log.
        </div>
      </CardBody>
    </Card>
  );
}
