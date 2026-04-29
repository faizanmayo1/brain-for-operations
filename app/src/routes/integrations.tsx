import {
  Activity,
  ArrowRight,
  Plug,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { KpiTile } from "@/components/primitives/KpiTile";
import { Sparkline } from "@/components/charts/Sparkline";
import { Overline } from "@/components/primitives/Overline";
import { StatusDot } from "@/components/feedback/StatusDot";
import { cn } from "@/lib/cn";

interface Integration {
  name: string;
  category: string;
  health: "healthy" | "degraded" | "down";
  events24h: number;
  latencyMs: number;
  lastSync: string;
  spark: number[];
  description: string;
  vendor: string;
  initials: string;
}

const integrations: Integration[] = [
  {
    name: "Oracle OTM",
    category: "Transportation",
    health: "healthy",
    events24h: 12480,
    latencyMs: 124,
    lastSync: "12s ago",
    spark: [80, 84, 88, 92, 96, 102, 110, 118, 124],
    description: "Carrier dispatch, routing orders, ETA telemetry.",
    vendor: "Oracle",
    initials: "OT",
  },
  {
    name: "Manhattan WMS",
    category: "Warehouse",
    health: "healthy",
    events24h: 28640,
    latencyMs: 86,
    lastSync: "8s ago",
    spark: [180, 196, 212, 224, 234, 248, 256, 268, 286],
    description: "Sensor fleet, pick lists, dock plans.",
    vendor: "Manhattan",
    initials: "MA",
  },
  {
    name: "SAP ERP",
    category: "Finance + supply",
    health: "healthy",
    events24h: 4280,
    latencyMs: 248,
    lastSync: "44s ago",
    spark: [38, 40, 42, 41, 42, 43, 44, 42, 43],
    description: "EDI orders, supplier confirmations, GL.",
    vendor: "SAP",
    initials: "SP",
  },
  {
    name: "Workday WFM",
    category: "Workforce",
    health: "degraded",
    events24h: 1640,
    latencyMs: 1240,
    lastSync: "2m 14s ago",
    spark: [22, 21, 20, 19, 18, 17, 16, 16, 16],
    description: "Scheduling, headcount, time-and-attendance.",
    vendor: "Workday",
    initials: "WD",
  },
  {
    name: "NOAA Weather",
    category: "External",
    health: "healthy",
    events24h: 1820,
    latencyMs: 412,
    lastSync: "18s ago",
    spark: [12, 14, 16, 16, 18, 18, 18, 19, 18],
    description: "Storm forecasts, hurricane tracks, severity.",
    vendor: "NOAA",
    initials: "NO",
  },
  {
    name: "Slack",
    category: "Comms",
    health: "healthy",
    events24h: 624,
    latencyMs: 92,
    lastSync: "4s ago",
    spark: [4, 5, 6, 6, 7, 7, 7, 6, 6],
    description: "Incident channels, ad-hoc requests, alerts.",
    vendor: "Slack",
    initials: "SL",
  },
  {
    name: "Snowflake",
    category: "Data warehouse",
    health: "healthy",
    events24h: 8240,
    latencyMs: 286,
    lastSync: "32s ago",
    spark: [62, 68, 74, 78, 82, 86, 88, 84, 82],
    description: "Historical training data, outcome ground truth.",
    vendor: "Snowflake",
    initials: "SF",
  },
  {
    name: "Stripe",
    category: "Finance",
    health: "down",
    events24h: 0,
    latencyMs: 0,
    lastSync: "1h 14m ago",
    spark: [3, 3, 4, 4, 3, 2, 1, 0, 0],
    description: "Payment events for refund/credit triggers.",
    vendor: "Stripe",
    initials: "ST",
  },
];

const healthLabel: Record<Integration["health"], string> = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
};

const healthBadge: Record<Integration["health"], string> = {
  healthy: "bg-risk-low/12 text-risk-low border-risk-low/30",
  degraded: "bg-risk-medium/12 text-risk-medium border-risk-medium/30",
  down: "bg-risk-critical/12 text-risk-critical border-risk-critical/30",
};

export function IntegrationsRoute() {
  const healthy = integrations.filter((i) => i.health === "healthy").length;
  const degraded = integrations.filter((i) => i.health === "degraded").length;
  const down = integrations.filter((i) => i.health === "down").length;
  const totalEvents = integrations.reduce((s, i) => s + i.events24h, 0);

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 pt-6 pb-12 max-w-[1480px] mx-auto stagger">
        <header className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] font-semibold text-text-tertiary mb-1.5">
              System · Data fabric
            </div>
            <h1 className="text-[28px] font-semibold text-text-primary tracking-tight leading-9">
              Integrations
            </h1>
            <div className="mt-1.5 flex items-center gap-3 text-[12.5px] text-text-tertiary">
              <span>{integrations.length} sources connected</span>
              <span className="h-3 w-px bg-border-subtle" />
              <span className="mono">{totalEvents.toLocaleString()} events · 24h</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} /> Re-sync all
            </Button>
            <Button variant="primary" size="md" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.4} /> Add source
            </Button>
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <KpiTile
            label="Connected sources"
            value={integrations.length}
            delta={2}
            helper="active integrations"
          />
          <KpiTile
            label="Healthy"
            value={healthy}
            delta={1}
            helper={`${degraded} degraded · ${down} down`}
            chart={
              <Sparkline
                data={[5, 6, 6, 6, 6, 6, 7, 6, 6]}
                width={92}
                height={28}
                color="var(--risk-low)"
              />
            }
          />
          <KpiTile
            label="Events · 24h"
            value={(totalEvents / 1000).toFixed(1) + "K"}
            delta={14}
            helper="ingested across fabric"
            accent="ai"
            chart={
              <Sparkline
                data={[42, 46, 48, 52, 54, 56, 58, 56, 57]}
                width={92}
                height={28}
                color="var(--ai-glow)"
              />
            }
          />
          <KpiTile
            label="P95 latency"
            value="412"
            unit="ms"
            delta={-12}
            deltaSemantic="negative"
            helper="across all sources"
            chart={
              <Sparkline
                data={[520, 480, 460, 440, 420, 410, 410, 412, 412]}
                width={92}
                height={28}
                color="var(--risk-low)"
              />
            }
          />
        </div>

        {/* Connector grid */}
        <div className="mt-5 grid grid-cols-3 gap-4">
          {integrations.map((it) => (
            <Card
              key={it.name}
              className="hover:border-accent-500/40 transition-colors cursor-pointer overflow-hidden"
            >
              <div className="p-4 flex items-start gap-3">
                <span className="h-10 w-10 rounded-md bg-gradient-to-br from-accent-500/20 to-ai/10 border border-border-subtle flex items-center justify-center mono text-[12px] font-semibold text-text-primary flex-shrink-0">
                  {it.initials}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13.5px] font-semibold text-text-primary truncate">
                      {it.name}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 mono text-[10px] uppercase tracking-wide font-semibold rounded-full px-1.5 h-5 border ml-auto",
                        healthBadge[it.health]
                      )}
                    >
                      <StatusDot
                        level={
                          it.health === "healthy"
                            ? "low"
                            : it.health === "degraded"
                              ? "medium"
                              : "critical"
                        }
                        size="sm"
                        pulse={it.health !== "healthy"}
                      />
                      {healthLabel[it.health]}
                    </span>
                  </div>
                  <div className="text-[11px] text-text-tertiary">
                    {it.category} · {it.vendor}
                  </div>
                </div>
              </div>

              <div className="px-4 pb-3 text-[11.5px] text-text-secondary leading-5 line-clamp-2">
                {it.description}
              </div>

              <div className="px-4 pb-4 grid grid-cols-3 gap-2">
                <Stat
                  label="Events 24h"
                  value={it.events24h.toLocaleString()}
                />
                <Stat
                  label="Latency"
                  value={it.latencyMs ? `${it.latencyMs}ms` : "—"}
                />
                <Stat label="Last sync" value={it.lastSync} muted />
              </div>

              <div className="border-t border-border-subtle px-4 py-2 flex items-center justify-between bg-surface-2/30">
                <Sparkline
                  data={it.spark}
                  width={120}
                  height={24}
                  color={
                    it.health === "down"
                      ? "var(--risk-critical)"
                      : it.health === "degraded"
                        ? "var(--risk-medium)"
                        : "var(--accent-500)"
                  }
                />
                <Button variant="ghost" size="sm">
                  Configure
                  <ArrowRight className="h-3 w-3" strokeWidth={2} />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Data fabric overview */}
        <div className="mt-5">
          <Card className="p-5 bg-grain border-ai-gradient">
            <div className="flex items-start gap-4">
              <span className="h-10 w-10 rounded-md bg-gradient-to-br from-accent-500 to-ai flex items-center justify-center flex-shrink-0">
                <Activity className="h-5 w-5 text-white" strokeWidth={2.2} />
              </span>
              <div className="flex-1">
                <Overline className="mb-1.5">Data fabric</Overline>
                <h3 className="text-[16px] font-semibold text-text-primary">
                  Continuous, normalized intelligence layer
                </h3>
                <p className="text-[12.5px] text-text-secondary mt-1.5 max-w-3xl leading-5">
                  All connected sources flow into a unified event stream with
                  schema normalization, deduplication, and continuous AI model
                  refresh. New signals propagate to risk scoring within seconds;
                  outcomes feed back into model training nightly.
                </p>
                <div className="mt-3 flex items-center gap-3 flex-wrap text-[11.5px]">
                  <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-full bg-surface-2 border border-border-subtle">
                    <Plug className="h-3 w-3 text-accent-200" strokeWidth={2.2} />
                    {integrations.length} sources
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-full bg-surface-2 border border-border-subtle">
                    <Activity className="h-3 w-3 text-ai" strokeWidth={2.2} />
                    Real-time event stream
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-full bg-surface-2 border border-border-subtle">
                    <ShieldCheck
                      className="h-3 w-3 text-risk-low"
                      strokeWidth={2.2}
                    />
                    SOC 2 + audit logs
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 h-6 rounded-full bg-surface-2 border border-border-subtle">
                    <Search className="h-3 w-3 text-text-tertiary" strokeWidth={2.2} />
                    Full-text + semantic search
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div>
      <div className="text-[9.5px] uppercase tracking-wide text-text-tertiary font-semibold">
        {label}
      </div>
      <div
        className={cn(
          "mono text-[12.5px] font-semibold tabular-nums",
          muted ? "text-text-tertiary" : "text-text-primary"
        )}
      >
        {value}
      </div>
    </div>
  );
}
