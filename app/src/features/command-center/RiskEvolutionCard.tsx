import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { AreaChart } from "@/components/charts/AreaChart";
import { LiveIndicator } from "@/components/feedback/LiveIndicator";
import { riskEvolution } from "@/mocks/commandCenter";

export function RiskEvolutionCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Composite risk · last 24h</CardTitle>
          <LiveIndicator />
        </div>
        <div className="flex items-center gap-1.5">
          {(["24h", "7d", "30d"] as const).map((r, i) => (
            <Button
              key={r}
              variant={i === 0 ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-[11.5px]"
            >
              {r}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex items-baseline gap-6 mb-4">
          <div>
            <div className="text-[10.5px] uppercase tracking-wide text-text-tertiary font-semibold">
              Composite risk
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="mono text-[24px] font-semibold text-text-primary">
                86
              </span>
              <span className="mono text-[11.5px] text-risk-high">
                ▲ 14 vs 24h
              </span>
            </div>
          </div>
          <div className="h-8 w-px bg-border-subtle" />
          <div>
            <div className="text-[10.5px] uppercase tracking-wide text-text-tertiary font-semibold">
              Avg confidence
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="mono text-[24px] font-semibold text-text-primary">
                87
              </span>
              <span className="mono text-[11.5px] text-risk-low">
                ▲ 6
              </span>
            </div>
          </div>
        </div>
        <AreaChart
          series={riskEvolution.series}
          labels={riskEvolution.labels}
          height={200}
        />
      </CardBody>
    </Card>
  );
}
