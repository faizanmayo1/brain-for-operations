import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { AreaChart } from "@/components/charts/AreaChart";
import { volumeByMode } from "@/mocks/actions";

export function VolumeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Action volume by mode · last 24h</CardTitle>
        <div className="flex items-center gap-2">
          <Legend color="#5B6CFF" label="Auto" />
          <Legend color="#7C5CFF" label="Approval" />
          <Legend color="#15B5B5" label="Manual" />
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
        <div className="flex items-baseline gap-6 mb-4">
          <Stat label="Total" value="184" delta="▲ 18%" tone="up" />
          <div className="h-8 w-px bg-border-subtle" />
          <Stat label="Auto" value="114" delta="62%" tone="ai" />
          <div className="h-8 w-px bg-border-subtle" />
          <Stat label="Approval" value="58" delta="32%" tone="muted" />
          <div className="h-8 w-px bg-border-subtle" />
          <Stat label="Manual" value="12" delta="6%" tone="muted" />
        </div>
        <AreaChart
          series={volumeByMode.series}
          labels={volumeByMode.labels}
          height={200}
        />
      </CardBody>
    </Card>
  );
}

function Stat({
  label,
  value,
  delta,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  tone: "up" | "ai" | "muted";
}) {
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-wide text-text-tertiary font-semibold">
        {label}
      </div>
      <div className="flex items-baseline gap-1.5 mt-1">
        <span className="mono text-[22px] font-semibold text-text-primary">
          {value}
        </span>
        <span
          className={
            tone === "up"
              ? "mono text-[11px] text-risk-low"
              : tone === "ai"
                ? "mono text-[11px] text-ai"
                : "mono text-[11px] text-text-tertiary"
          }
        >
          {delta}
        </span>
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
