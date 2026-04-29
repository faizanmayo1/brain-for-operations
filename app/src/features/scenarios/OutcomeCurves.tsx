import { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { ConfidenceBandChart, type BandSeries } from "@/components/charts/ConfidenceBandChart";
import { Overline } from "@/components/primitives/Overline";
import { scenarioLabels, scenarios } from "@/mocks/scenarios";
import { cn } from "@/lib/cn";

type Metric = "sla" | "cost" | "throughput";

const metricLabel: Record<Metric, string> = {
  sla: "SLA · expected % on-time",
  cost: "Cost · index (base = 100)",
  throughput: "Throughput · index (base = 100)",
};

const metricFmt: Record<Metric, (n: number) => string> = {
  sla: (n) => `${n}%`,
  cost: (n) => `${n}`,
  throughput: (n) => `${n}`,
};

export function OutcomeCurves() {
  const [metric, setMetric] = useState<Metric>("sla");

  const series: BandSeries[] = scenarios.map((s) => ({
    key: s.key,
    label: `${s.key} · ${s.label}`,
    color:
      s.key === "A"
        ? "#5B6CFF"
        : s.key === "B"
          ? "#7C5CFF"
          : "#F76B15",
    expected:
      metric === "sla"
        ? s.sla
        : metric === "cost"
          ? s.cost
          : s.throughput,
    low: metric === "sla" ? s.slaLow : undefined,
    high: metric === "sla" ? s.slaHigh : undefined,
    dim: !s.recommended && metric !== "sla", // emphasize recommended unless SLA where bands matter
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Outcome curves · 24h horizon</CardTitle>
          <span className="mono text-[10.5px] text-text-tertiary bg-surface-2 border border-border-subtle rounded-full px-1.5 h-5 inline-flex items-center">
            1,000 samples
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-surface-2 border border-border-subtle">
            {(["sla", "cost", "throughput"] as Metric[]).map((m) => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={cn(
                  "h-7 px-2.5 rounded text-[11.5px] font-medium transition-colors capitalize",
                  metric === m
                    ? "bg-canvas text-text-primary border border-border-strong shadow-sm"
                    : "text-text-tertiary hover:text-text-secondary"
                )}
              >
                {m}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-[11.5px]">
            Toggle bands
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="mb-3">
          <Overline>{metricLabel[metric]}</Overline>
        </div>

        <ConfidenceBandChart
          series={series}
          labels={scenarioLabels}
          height={280}
          yFormat={metricFmt[metric]}
        />

        {/* Scenario summary cards */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {scenarios.map((s) => (
            <div
              key={s.key}
              className={cn(
                "rounded-md border p-3 transition-colors",
                s.recommended
                  ? "border-ai-gradient bg-gradient-to-br from-accent-500/8 to-ai/4"
                  : "border-border-subtle bg-canvas/40"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={cn(
                    "h-6 w-6 rounded-md mono text-[12px] font-semibold inline-flex items-center justify-center",
                    s.recommended
                      ? "bg-gradient-to-br from-accent-500 to-ai text-white"
                      : "bg-surface-2 text-text-secondary border border-border-strong"
                  )}
                >
                  {s.key}
                </span>
                <span className="text-[12px] font-semibold text-text-primary truncate">
                  {s.label}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Stat label="SLA" value={`${s.expectedSla}%`} />
                <Stat
                  label="Cost ×"
                  value={s.costIndex.toFixed(2)}
                />
                <Stat
                  label="Tput"
                  value={`${Math.round(s.throughputIndex * 100)}`}
                />
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9.5px] uppercase tracking-wide text-text-tertiary font-semibold">
        {label}
      </div>
      <div className="mono text-[13px] font-semibold text-text-primary tabular-nums">
        {value}
      </div>
    </div>
  );
}
