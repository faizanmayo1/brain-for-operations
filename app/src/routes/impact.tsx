import { Calendar, ChevronDown, Download, Sparkles } from "lucide-react";
import { Button } from "@/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { KpiTile } from "@/components/primitives/KpiTile";
import { Sparkline } from "@/components/charts/Sparkline";
import { AreaChart } from "@/components/charts/AreaChart";
import { Overline } from "@/components/primitives/Overline";
import { AiBadge } from "@/components/feedback/AiBadge";
import { RiskBadge } from "@/components/feedback/RiskBadge";
import {
  accuracyByCategory,
  impactKpis,
  learningSignals,
  outcomeRows,
  outcomeTrend,
} from "@/mocks/impact";
import { cn } from "@/lib/cn";

export function ImpactRoute() {
  const hits = outcomeRows.filter((r) => r.hit).length;
  const hitRate = Math.round((hits / outcomeRows.length) * 100);

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 pt-6 pb-12 max-w-[1480px] mx-auto stagger">
        <header className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] font-semibold text-text-tertiary mb-1.5">
              Decision intelligence · Outcomes
            </div>
            <h1 className="text-[28px] font-semibold text-text-primary tracking-tight leading-9">
              Impact &amp; Learning
            </h1>
            <div className="mt-1.5 flex items-center gap-3 text-[12.5px] text-text-tertiary">
              <span className="mono">Last 30 days</span>
              <span className="h-3 w-px bg-border-subtle" />
              <span>
                {outcomeRows.length} outcomes verified · {hitRate}% hit rate
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" className="gap-1.5">
              <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
              30 days
              <ChevronDown className="h-3 w-3" strokeWidth={2} />
            </Button>
            <Button variant="secondary" size="md" className="gap-1.5">
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              QBR brief
            </Button>
          </div>
        </header>

        {/* KPI strip */}
        <div className="grid grid-cols-4 gap-4">
          <KpiTile
            label="Risk events avoided"
            value={impactKpis.riskAvoided.value}
            delta={impactKpis.riskAvoided.delta}
            helper={impactKpis.riskAvoided.helper}
            chart={
              <Sparkline
                data={[26, 30, 33, 36, 39, 42, 44, 46, 47]}
                width={92}
                height={28}
                color="var(--risk-low)"
              />
            }
          />
          <KpiTile
            label="Cost avoided"
            value={impactKpis.costSaved.value}
            delta={impactKpis.costSaved.delta}
            helper={impactKpis.costSaved.helper}
            chart={
              <Sparkline
                data={[60, 78, 96, 114, 134, 152, 168, 174, 184]}
                width={92}
                height={28}
              />
            }
          />
          <KpiTile
            label="Prediction accuracy"
            value={impactKpis.accuracy.value}
            unit={impactKpis.accuracy.unit}
            delta={impactKpis.accuracy.delta}
            helper={impactKpis.accuracy.helper}
            accent="ai"
            chart={
              <Sparkline
                data={[86, 87, 88, 88, 89, 90, 91, 91, 92]}
                width={92}
                height={28}
                color="var(--ai-glow)"
              />
            }
          />
          <KpiTile
            label="Decision-time speedup"
            value={impactKpis.speedup.value}
            unit={impactKpis.speedup.unit}
            delta={impactKpis.speedup.delta}
            helper={impactKpis.speedup.helper}
            chart={
              <Sparkline
                data={[60, 66, 72, 78, 82, 86, 90, 92, 94]}
                width={92}
                height={28}
                color="var(--risk-low)"
              />
            }
          />
        </div>

        {/* Outcome trend + Learning loop */}
        <div className="mt-5 grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <Card>
              <CardHeader>
                <CardTitle>Cumulative impact · last 30 days</CardTitle>
                <div className="flex items-center gap-2">
                  <Legend color="#3DA94D" label="Risk avoided (events)" />
                  <Legend color="#5B6CFF" label="Cost avoided ($K)" />
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex items-baseline gap-6 mb-4">
                  <Stat label="Risk events" value="54" delta="▲ 22" tone="up" />
                  <div className="h-8 w-px bg-border-subtle" />
                  <Stat label="Cost avoided" value="$182K" delta="▲ $58K" tone="up" />
                  <div className="h-8 w-px bg-border-subtle" />
                  <Stat label="Hit rate" value={`${hitRate}%`} delta="▲ 6pp" tone="up" />
                </div>
                <AreaChart
                  series={outcomeTrend.series}
                  labels={outcomeTrend.labels}
                  height={220}
                />
              </CardBody>
            </Card>
          </div>

          <div className="col-span-4">
            <Card className="border-ai-gradient h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AiBadge label="Learning loop" />
                  <CardTitle>Model improvements</CardTitle>
                </div>
              </CardHeader>
              <CardBody className="space-y-3">
                {learningSignals.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-md p-3 border border-border-subtle bg-canvas/40"
                  >
                    <div className="flex items-start gap-2">
                      <span className="h-6 w-6 rounded-md bg-gradient-to-br from-accent-500 to-ai flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-3 w-3 text-white" strokeWidth={2.4} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[12.5px] font-semibold text-text-primary">
                            {s.title}
                          </span>
                          {s.delta > 0 && (
                            <span className="mono text-[10.5px] text-risk-low">
                              ▲ {s.delta}pp
                            </span>
                          )}
                        </div>
                        <p className="text-[11.5px] text-text-secondary leading-5">
                          {s.detail}
                        </p>
                        <div className="mt-1 mono text-[10.5px] text-text-tertiary">
                          {s.when}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Accuracy by category + outcome rows */}
        <div className="mt-5 grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Accuracy by category</CardTitle>
                <span className="text-[11px] text-text-tertiary mono">
                  30-day
                </span>
              </CardHeader>
              <CardBody className="space-y-2.5">
                {accuracyByCategory.map((row) => (
                  <div
                    key={row.category}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-surface-2 transition-colors"
                  >
                    <div className="w-[100px] flex-shrink-0">
                      <div className="text-[12.5px] font-medium text-text-primary">
                        {row.category}
                      </div>
                      <div className="mono text-[10.5px] text-text-tertiary">
                        {row.decisions} decisions
                      </div>
                    </div>
                    <div className="flex-1 h-2 rounded-full bg-border-subtle/60 overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-700",
                          row.accuracy >= 90 && "bg-risk-low",
                          row.accuracy >= 80 &&
                            row.accuracy < 90 &&
                            "bg-accent-500",
                          row.accuracy < 80 && "bg-risk-medium"
                        )}
                        style={{ width: `${row.accuracy}%` }}
                      />
                    </div>
                    <div className="text-right w-[80px]">
                      <div className="mono text-[14px] font-semibold text-text-primary tabular-nums">
                        {row.accuracy}%
                      </div>
                      <div
                        className={cn(
                          "mono text-[10.5px]",
                          row.delta > 0 ? "text-risk-low" : "text-risk-critical"
                        )}
                      >
                        {row.delta > 0 ? "▲" : "▼"} {Math.abs(row.delta)}
                      </div>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>

          <div className="col-span-7">
            <Card>
              <CardHeader>
                <CardTitle>Recent decision outcomes</CardTitle>
                <span className="mono text-[11px] text-text-tertiary">
                  expected vs actual
                </span>
              </CardHeader>
              <div className="px-5">
                <div className="grid grid-cols-[2fr_120px_120px_64px_60px_36px] gap-3 px-2 py-2 border-b border-border-subtle">
                  <Overline>Decision</Overline>
                  <Overline>Expected</Overline>
                  <Overline>Actual</Overline>
                  <Overline className="text-right">Hit</Overline>
                  <Overline className="text-right">Closed</Overline>
                  <span />
                </div>
              </div>
              <CardBody className="px-5 pt-0">
                {outcomeRows.map((r, idx) => (
                  <div
                    key={r.id}
                    className={cn(
                      "group grid grid-cols-[2fr_120px_120px_64px_60px_36px] gap-3 items-center px-2 h-12 rounded-md transition-colors hover:bg-surface-2",
                      idx !== outcomeRows.length - 1 &&
                        "border-b border-border-subtle"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="mono text-[10.5px] text-text-tertiary tabular-nums w-[58px] flex-shrink-0">
                        {r.id}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[12.5px] font-medium text-text-primary truncate">
                          {r.decision}
                        </div>
                        <div className="text-[10.5px] text-text-tertiary truncate">
                          {r.category} · {r.owner}
                        </div>
                      </div>
                    </div>
                    <div className="text-[12px] text-text-secondary truncate">
                      {r.expected}
                    </div>
                    <div className="text-[12px] text-text-primary truncate">
                      {r.actual}
                    </div>
                    <div className="text-right">
                      {r.hit ? (
                        <RiskBadge level="low" />
                      ) : (
                        <RiskBadge level="critical" />
                      )}
                    </div>
                    <div className="text-right mono text-[11px] text-text-tertiary tabular-nums">
                      {r.closedAt}
                    </div>
                    <span />
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
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
  tone: "up";
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
            tone === "up" ? "mono text-[11px] text-risk-low" : "mono text-[11px]"
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
