import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { AreaChart } from "@/components/charts/AreaChart";
import { confidenceTrend } from "@/mocks/copilot";

export function ConfidenceTrendCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Copilot confidence · last 30 days</CardTitle>
        <div className="flex items-center gap-2">
          <Legend color="#7C5CFF" label="Confidence" />
          <Legend color="#5B6CFF" label="Acceptance" />
          <Button variant="ghost" size="sm" className="h-7 text-[11.5px]">
            30d
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex items-baseline gap-6 mb-4">
          <div>
            <div className="text-[10.5px] uppercase tracking-wide text-text-tertiary font-semibold">
              Mean confidence
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="mono text-[24px] font-semibold text-text-primary">
                87
              </span>
              <span className="mono text-[11.5px] text-risk-low">▲ 25 pp</span>
            </div>
          </div>
          <div className="h-8 w-px bg-border-subtle" />
          <div>
            <div className="text-[10.5px] uppercase tracking-wide text-text-tertiary font-semibold">
              Recommendation acceptance
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="mono text-[24px] font-semibold text-text-primary">
                78
              </span>
              <span className="mono text-[11.5px] text-risk-low">▲ 6</span>
            </div>
          </div>
        </div>
        <AreaChart
          series={confidenceTrend.series}
          labels={confidenceTrend.labels}
          height={200}
          yFormat={(n) => `${n}%`}
        />
      </CardBody>
    </Card>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-text-tertiary">
      <span
        className="inline-block h-1.5 w-3 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
