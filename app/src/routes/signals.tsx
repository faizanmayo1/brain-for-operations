import { ArrowRight, Filter, Search } from "lucide-react";
import { Button } from "@/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { KpiTile } from "@/components/primitives/KpiTile";
import { Sparkline } from "@/components/charts/Sparkline";
import { Overline } from "@/components/primitives/Overline";
import { RiskBadge } from "@/components/feedback/RiskBadge";
import { LiveIndicator } from "@/components/feedback/LiveIndicator";
import { StatusDot } from "@/components/feedback/StatusDot";
import { clusters, fullSignals, signalsKpis, sources } from "@/mocks/signals";
import { cn } from "@/lib/cn";

export function SignalsRoute() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 pt-6 pb-12 max-w-[1480px] mx-auto stagger">
        <header className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] font-semibold text-text-tertiary mb-1.5">
              Decision intelligence · Inputs
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-semibold text-text-primary tracking-tight leading-9">
                Signals
              </h1>
              <LiveIndicator />
            </div>
            <div className="mt-1.5 flex items-center gap-3 text-[12.5px] text-text-tertiary">
              <span className="mono">Last 24h</span>
              <span className="h-3 w-px bg-border-subtle" />
              <span>{sources.length} active sources · 18 clustered themes</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" className="gap-1.5">
              <Filter className="h-3.5 w-3.5" strokeWidth={2} />
              All clusters
            </Button>
            <Button variant="secondary" size="md">
              Configure sources
            </Button>
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <KpiTile
            label="Signals · 24h"
            value={signalsKpis.total.value}
            delta={signalsKpis.total.delta}
            helper={signalsKpis.total.helper}
            chart={
              <Sparkline
                data={[180, 192, 204, 216, 224, 232, 238, 244, 247]}
                width={92}
                height={28}
              />
            }
          />
          <KpiTile
            label="Themes detected"
            value={signalsKpis.clustered.value}
            delta={signalsKpis.clustered.delta}
            helper={signalsKpis.clustered.helper}
            accent="ai"
            chart={
              <Sparkline
                data={[12, 13, 14, 15, 16, 16, 17, 17, 18]}
                width={92}
                height={28}
                color="var(--ai-glow)"
              />
            }
          />
          <KpiTile
            label="Decision-critical"
            value={signalsKpis.decisionCritical.value}
            delta={signalsKpis.decisionCritical.delta}
            deltaSemantic={signalsKpis.decisionCritical.deltaSemantic}
            helper={signalsKpis.decisionCritical.helper}
            chart={
              <Sparkline
                data={[2, 2, 3, 3, 4, 3, 4, 4, 4]}
                width={92}
                height={28}
                color="var(--risk-high)"
              />
            }
          />
          <KpiTile
            label="Noise filtered"
            value={signalsKpis.noise.value}
            unit={signalsKpis.noise.unit}
            delta={signalsKpis.noise.delta}
            helper={signalsKpis.noise.helper}
            chart={
              <Sparkline
                data={[88, 89, 90, 91, 92, 93, 93, 94, 94]}
                width={92}
                height={28}
                color="var(--risk-low)"
              />
            }
          />
        </div>

        {/* Clusters + sources */}
        <div className="mt-5 grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <Card>
              <CardHeader>
                <CardTitle>Clusters</CardTitle>
                <span className="mono text-[11px] text-text-tertiary">
                  {clusters.length} themes · 247 signals
                </span>
              </CardHeader>
              <CardBody className="space-y-2">
                {/* Stacked bar */}
                <div className="h-2 w-full rounded-full overflow-hidden flex bg-border-subtle/40 mb-3">
                  {clusters.map((c) => (
                    <span
                      key={c.id}
                      className="h-full"
                      style={{ width: `${c.share}%`, background: c.color }}
                      title={`${c.name} · ${c.signals}`}
                    />
                  ))}
                </div>
                {clusters.map((c) => (
                  <button
                    key={c.id}
                    className="group w-full flex items-center gap-3 p-2 rounded-md hover:bg-surface-2 transition-colors text-left"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ background: c.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[12.5px] font-medium text-text-primary truncate">
                          {c.name}
                        </span>
                        <span className="text-[10.5px] text-text-tertiary">
                          {c.share}% share
                        </span>
                      </div>
                    </div>
                    <RiskBadge level={c.level} />
                    <span className="mono text-[14px] font-semibold text-text-primary tabular-nums w-10 text-right">
                      {c.signals}
                    </span>
                    <span
                      className={cn(
                        "mono text-[10.5px] w-8 text-right",
                        c.delta > 0
                          ? "text-risk-high"
                          : c.delta < 0
                            ? "text-risk-low"
                            : "text-text-tertiary"
                      )}
                    >
                      {c.delta > 0 ? "▲" : c.delta < 0 ? "▼" : "•"}
                      {Math.abs(c.delta)}
                    </span>
                    <ArrowRight
                      className="h-3 w-3 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity"
                      strokeWidth={2}
                    />
                  </button>
                ))}
              </CardBody>
            </Card>
          </div>

          <div className="col-span-5">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Sources</CardTitle>
                <span className="mono text-[11px] text-text-tertiary">
                  {sources.length} active
                </span>
              </CardHeader>
              <CardBody className="space-y-1.5">
                {sources.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-surface-2 transition-colors"
                  >
                    <StatusDot
                      level={
                        s.health === "healthy"
                          ? "low"
                          : s.health === "degraded"
                            ? "medium"
                            : "critical"
                      }
                      pulse={s.health !== "healthy"}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-medium text-text-primary truncate">
                        {s.name}
                      </div>
                      <div className="text-[10.5px] text-text-tertiary">
                        {s.category}
                      </div>
                    </div>
                    <span className="mono text-[12px] text-text-secondary tabular-nums w-12 text-right">
                      {s.signals}
                    </span>
                    <span
                      className={cn(
                        "mono text-[11px] tabular-nums w-16 text-right",
                        s.latencyMs > 1000
                          ? "text-risk-medium"
                          : "text-text-tertiary"
                      )}
                    >
                      {s.latencyMs}ms
                    </span>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Full signals table */}
        <div className="mt-5">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle>Signal inbox</CardTitle>
                <span className="mono text-[11px] text-text-tertiary bg-surface-2 border border-border-subtle rounded-full px-1.5 h-5 inline-flex items-center">
                  {fullSignals.length} of 247
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary"
                    strokeWidth={2}
                  />
                  <input
                    placeholder="Search signals"
                    className="h-8 pl-8 pr-2.5 w-56 rounded-md bg-canvas border border-border-subtle text-[12.5px] text-text-secondary placeholder:text-text-tertiary focus:outline-none focus:border-accent-500/50"
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <Filter className="h-3 w-3" strokeWidth={2} /> All
                </Button>
              </div>
            </CardHeader>

            <div className="px-5">
              <div className="grid grid-cols-[16px_2fr_140px_120px_88px_80px_36px] gap-3 px-2 py-2 border-b border-border-subtle">
                <span />
                <Overline>Signal</Overline>
                <Overline>Cluster</Overline>
                <Overline>Risk</Overline>
                <Overline className="text-right">Score</Overline>
                <Overline className="text-right">Age</Overline>
                <span />
              </div>
            </div>

            <CardBody className="px-5 pt-0">
              {fullSignals.map((s, idx) => (
                <button
                  key={s.id}
                  className={cn(
                    "group w-full grid grid-cols-[16px_2fr_140px_120px_88px_80px_36px] gap-3 items-center px-2 h-12 text-left rounded-md transition-colors hover:bg-surface-2",
                    idx !== fullSignals.length - 1 &&
                      "border-b border-border-subtle"
                  )}
                >
                  <span>
                    {s.unread && <StatusDot level="info" size="sm" pulse />}
                  </span>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="mono text-[10.5px] text-text-tertiary tabular-nums w-[58px] flex-shrink-0">
                      {s.id}
                    </span>
                    <div className="min-w-0">
                      <div
                        className={cn(
                          "text-[13px] truncate",
                          s.unread
                            ? "font-semibold text-text-primary"
                            : "font-medium text-text-secondary"
                        )}
                      >
                        {s.title}
                      </div>
                      <div className="text-[11px] text-text-tertiary truncate">
                        {s.zone} · {s.source}
                      </div>
                    </div>
                  </div>
                  <span className="text-[12px] text-text-secondary truncate">
                    {s.cluster}
                  </span>
                  <RiskBadge level={s.level} />
                  <div className="text-right mono text-[14px] font-semibold text-text-primary tabular-nums">
                    {s.score}
                  </div>
                  <div className="text-right mono text-[11.5px] text-text-tertiary tabular-nums">
                    {s.age}
                  </div>
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight
                      className="h-4 w-4 text-text-tertiary"
                      strokeWidth={2}
                    />
                  </div>
                </button>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
