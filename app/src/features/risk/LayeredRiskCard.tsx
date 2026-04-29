import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { AreaChart } from "@/components/charts/AreaChart";
import { LiveIndicator } from "@/components/feedback/LiveIndicator";
import { layeredRisk } from "@/mocks/risk";

export function LayeredRiskCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Multi-layer risk · last 24h</CardTitle>
          <LiveIndicator />
        </div>
        <div className="flex items-center gap-1.5">
          <Legend color="#E5484D" label="Immediate" />
          <Legend color="#F76B15" label="Emerging" />
          <Legend color="#7C5CFF" label="Hidden" />
          <span className="h-4 w-px bg-border-subtle mx-1" />
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
        <div className="grid grid-cols-3 gap-6 mb-4">
          <Stat label="Immediate" value="91" delta="▲ 53" colorTone="critical" />
          <Stat label="Emerging" value="77" delta="▲ 35" colorTone="high" />
          <Stat label="Hidden patterns" value="67" delta="▲ 29" colorTone="ai" />
        </div>
        <AreaChart
          series={layeredRisk.series}
          labels={layeredRisk.labels}
          height={220}
        />
      </CardBody>
    </Card>
  );
}

function Stat({
  label,
  value,
  delta,
  colorTone,
}: {
  label: string;
  value: string;
  delta: string;
  colorTone: "critical" | "high" | "ai";
}) {
  const valueColor =
    colorTone === "critical"
      ? "text-risk-critical"
      : colorTone === "high"
        ? "text-risk-high"
        : "text-ai";
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-wide text-text-tertiary font-semibold">
        {label}
      </div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className={`mono text-[24px] font-semibold ${valueColor}`}>
          {value}
        </span>
        <span className="mono text-[11.5px] text-risk-high">{delta}</span>
      </div>
    </div>
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
