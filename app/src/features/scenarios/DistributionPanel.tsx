import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Histogram } from "@/components/charts/Histogram";
import { Overline } from "@/components/primitives/Overline";
import { distributions, scenarios } from "@/mocks/scenarios";
import { cn } from "@/lib/cn";

export function DistributionPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Outcome distribution · Monte Carlo</CardTitle>
        <span className="mono text-[10.5px] text-text-tertiary">
          1,000 samples per scenario
        </span>
      </CardHeader>
      <CardBody className="space-y-4">
        {scenarios.map((s) => {
          const color =
            s.key === "A" ? "#5B6CFF" : s.key === "B" ? "#7C5CFF" : "#F76B15";
          const slaBins = distributions[s.key].sla;
          // Highlight 5–95th percentile range (rough)
          const total = slaBins.reduce((a, b) => a + b, 0);
          let cum = 0;
          let p5 = 0,
            p95 = slaBins.length - 1;
          for (let i = 0; i < slaBins.length; i++) {
            cum += slaBins[i];
            if (cum >= total * 0.05 && p5 === 0) p5 = i;
            if (cum >= total * 0.95) {
              p95 = i;
              break;
            }
          }
          return (
            <div key={s.key}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-5 w-5 rounded mono text-[11px] font-semibold inline-flex items-center justify-center",
                      s.recommended
                        ? "bg-gradient-to-br from-accent-500 to-ai text-white"
                        : "bg-surface-2 text-text-secondary border border-border-strong"
                    )}
                  >
                    {s.key}
                  </span>
                  <span className="text-[12px] font-medium text-text-primary truncate">
                    {s.label}
                  </span>
                </div>
                <span className="mono text-[11px] text-text-tertiary tabular-nums">
                  median {s.expectedSla}%
                </span>
              </div>
              <Histogram
                bins={slaBins}
                color={color}
                height={48}
                highlightFrom={p5 / slaBins.length}
                highlightTo={p95 / slaBins.length}
              />
              <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-text-tertiary mono">
                <span>30%</span>
                <span>60%</span>
                <span>90%</span>
              </div>
            </div>
          );
        })}
        <div className="mt-2 pt-3 border-t border-border-subtle text-[10.5px] text-text-tertiary leading-4">
          Highlighted band shows 5th–95th percentile of simulated outcomes for
          SLA on-time delivery.
        </div>
      </CardBody>
    </Card>
  );
}
