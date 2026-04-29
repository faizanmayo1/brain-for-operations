import {
  Calendar,
  ChevronDown,
  Download,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  UserCog,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { KpiTile } from "@/components/primitives/KpiTile";
import { Sparkline } from "@/components/charts/Sparkline";
import { Overline } from "@/components/primitives/Overline";
import { RiskBadge, type RiskLevel } from "@/components/feedback/RiskBadge";
import { AiBadge } from "@/components/feedback/AiBadge";
import { cn } from "@/lib/cn";

interface AuditEntry {
  id: string;
  ts: string;
  actor: string;
  initials: string;
  action: string;
  target: string;
  level: RiskLevel;
  scope: "Decision" | "Action" | "Settings" | "Access" | "Data";
  ip?: string;
  ai?: boolean;
}

const auditTrail: AuditEntry[] = [
  {
    id: "AUD-90412",
    ts: "09:14:08",
    actor: "Maya Patel",
    initials: "MP",
    action: "Approved",
    target: "DEC-4081 · Reroute SE-2",
    level: "critical",
    scope: "Decision",
    ip: "10.0.4.12",
  },
  {
    id: "AUD-90411",
    ts: "09:13:54",
    actor: "AI Agent",
    initials: "AI",
    action: "Auto-executed",
    target: "ACT-9216 · Pre-stage Hub-3",
    level: "medium",
    scope: "Action",
    ai: true,
  },
  {
    id: "AUD-90410",
    ts: "09:11:22",
    actor: "James Vega",
    initials: "JV",
    action: "Declined",
    target: "DEC-4077 · Inventory rebalance",
    level: "medium",
    scope: "Decision",
    ip: "10.0.4.18",
  },
  {
    id: "AUD-90409",
    ts: "09:08:14",
    actor: "Copilot",
    initials: "AI",
    action: "Raised severity",
    target: "SIG-2087 · Hub-7 throughput",
    level: "high",
    scope: "Decision",
    ai: true,
  },
  {
    id: "AUD-90408",
    ts: "09:02:48",
    actor: "Adnan Dauti",
    initials: "AD",
    action: "Opened scenario",
    target: "SCN-217 · Reroute corridor",
    level: "low",
    scope: "Decision",
    ip: "10.0.4.4",
  },
  {
    id: "AUD-90407",
    ts: "08:58:01",
    actor: "Sara Lin",
    initials: "SL",
    action: "Granted access",
    target: "Risk Cockpit · Read",
    level: "low",
    scope: "Access",
    ip: "10.0.4.31",
  },
  {
    id: "AUD-90406",
    ts: "08:54:18",
    actor: "AI Agent",
    initials: "AI",
    action: "Rolled back",
    target: "ACT-9211 · Cycle-count fix",
    level: "high",
    scope: "Action",
    ai: true,
  },
  {
    id: "AUD-90405",
    ts: "08:42:08",
    actor: "Adnan Dauti",
    initials: "AD",
    action: "Updated policy",
    target: "Auto-execute threshold = 80% conf",
    level: "medium",
    scope: "Settings",
    ip: "10.0.4.4",
  },
  {
    id: "AUD-90404",
    ts: "08:18:44",
    actor: "Maya Patel",
    initials: "MP",
    action: "Exported brief",
    target: "Risk register · CSV",
    level: "low",
    scope: "Data",
    ip: "10.0.4.12",
  },
];

const scopePill: Record<string, string> = {
  Decision: "bg-accent-500/12 text-accent-200 border-accent-500/30",
  Action: "bg-ai/12 text-ai border-ai/30",
  Settings: "bg-risk-medium/12 text-risk-medium border-risk-medium/30",
  Access: "bg-risk-low/12 text-risk-low border-risk-low/30",
  Data: "bg-surface-2 text-text-secondary border-border-strong/60",
};

interface RoleEntry {
  role: string;
  members: number;
  scope: string;
  canApprove: boolean;
  canExecute: boolean;
}

const roles: RoleEntry[] = [
  {
    role: "COO",
    members: 1,
    scope: "All decisions, audit, governance",
    canApprove: true,
    canExecute: true,
  },
  {
    role: "VP Operations",
    members: 3,
    scope: "Decisions ≤ critical · all hubs",
    canApprove: true,
    canExecute: true,
  },
  {
    role: "Operations Analyst",
    members: 14,
    scope: "Decisions ≤ high · assigned hubs",
    canApprove: true,
    canExecute: false,
  },
  {
    role: "Risk Officer",
    members: 2,
    scope: "Read-only · audit trail · governance",
    canApprove: false,
    canExecute: false,
  },
  {
    role: "AI Agent (semi-auto)",
    members: 8,
    scope: "Auto-execute decisions ≥ 80% conf",
    canApprove: false,
    canExecute: true,
  },
];

export function GovernanceRoute() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 pt-6 pb-12 max-w-[1480px] mx-auto stagger">
        <header className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] font-semibold text-text-tertiary mb-1.5">
              System · Trust &amp; control
            </div>
            <h1 className="text-[28px] font-semibold text-text-primary tracking-tight leading-9">
              Governance
            </h1>
            <div className="mt-1.5 flex items-center gap-3 text-[12.5px] text-text-tertiary">
              <span>SOC 2 Type II · ISO 27001 · audit retention 7 years</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" className="gap-1.5">
              <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
              Last 24h
              <ChevronDown className="h-3 w-3" strokeWidth={2} />
            </Button>
            <Button variant="secondary" size="md" className="gap-1.5">
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              Export audit
            </Button>
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <KpiTile
            label="Audit events · 24h"
            value={482}
            delta={12}
            helper="all actor types"
            chart={
              <Sparkline
                data={[320, 348, 376, 392, 412, 428, 446, 464, 482]}
                width={92}
                height={28}
              />
            }
          />
          <KpiTile
            label="Approval coverage"
            value="100"
            unit="%"
            delta={0}
            helper="critical decisions"
            chart={
              <Sparkline
                data={[100, 100, 100, 100, 100, 100, 100, 100, 100]}
                width={92}
                height={28}
                color="var(--risk-low)"
              />
            }
          />
          <KpiTile
            label="Policy violations"
            value={0}
            delta={-2}
            deltaSemantic="negative"
            helper="last 30 days"
            chart={
              <Sparkline
                data={[2, 2, 1, 1, 0, 0, 0, 0, 0]}
                width={92}
                height={28}
                color="var(--risk-low)"
              />
            }
          />
          <KpiTile
            label="AI explainability"
            value="100"
            unit="%"
            delta={0}
            helper="reasoning trace coverage"
            accent="ai"
            chart={
              <Sparkline
                data={[100, 100, 100, 100, 100, 100, 100, 100, 100]}
                width={92}
                height={28}
                color="var(--ai-glow)"
              />
            }
          />
        </div>

        {/* Roles + audit */}
        <div className="mt-5 grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <UserCog
                    className="h-4 w-4 text-text-tertiary"
                    strokeWidth={2}
                  />
                  <CardTitle>Roles &amp; access</CardTitle>
                </div>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </CardHeader>
              <CardBody className="space-y-1.5">
                {roles.map((r) => (
                  <div
                    key={r.role}
                    className="flex items-center gap-3 p-2.5 rounded-md hover:bg-surface-2 transition-colors"
                  >
                    <span
                      className={cn(
                        "h-7 w-7 rounded-md inline-flex items-center justify-center mono text-[10.5px] font-semibold flex-shrink-0",
                        r.role.includes("AI")
                          ? "bg-ai/15 text-ai border border-ai/30"
                          : "bg-gradient-to-br from-accent-500/20 to-ai/10 text-text-primary border border-border-subtle"
                      )}
                    >
                      {r.role.includes("AI") ? "AI" : r.role.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-text-primary truncate">
                        {r.role}
                      </div>
                      <div className="text-[11px] text-text-tertiary truncate">
                        {r.scope}
                      </div>
                    </div>
                    <span className="mono text-[12px] text-text-secondary tabular-nums w-8 text-right">
                      {r.members}
                    </span>
                    <div className="flex items-center gap-1">
                      <Cap label="Approve" on={r.canApprove} />
                      <Cap label="Execute" on={r.canExecute} />
                    </div>
                  </div>
                ))}
                <div className="text-[10.5px] text-text-tertiary pt-2 border-t border-border-subtle mt-2">
                  Decisions above the matched scope auto-escalate to the next
                  approval tier. AI agents always operate within their
                  configured envelope.
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="col-span-7">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    className="h-4 w-4 text-text-tertiary"
                    strokeWidth={2}
                  />
                  <CardTitle>Audit trail</CardTitle>
                  <span className="mono text-[11px] text-text-tertiary bg-surface-2 border border-border-subtle rounded-full px-1.5 h-5 inline-flex items-center">
                    immutable
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary"
                      strokeWidth={2}
                    />
                    <input
                      placeholder="Search"
                      className="h-8 pl-8 pr-2.5 w-44 rounded-md bg-canvas border border-border-subtle text-[12px] text-text-secondary placeholder:text-text-tertiary focus:outline-none focus:border-accent-500/50"
                    />
                  </div>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-3 w-3" strokeWidth={2} /> Scope
                  </Button>
                </div>
              </CardHeader>

              <div className="px-5">
                <div className="grid grid-cols-[60px_120px_1.5fr_100px_88px_36px] gap-3 px-2 py-2 border-b border-border-subtle">
                  <Overline>Time</Overline>
                  <Overline>Actor</Overline>
                  <Overline>Event</Overline>
                  <Overline>Scope</Overline>
                  <Overline>Risk</Overline>
                  <span />
                </div>
              </div>

              <CardBody className="px-5 pt-0">
                {auditTrail.map((e, idx) => (
                  <div
                    key={e.id}
                    className={cn(
                      "group grid grid-cols-[60px_120px_1.5fr_100px_88px_36px] gap-3 items-center px-2 h-12 rounded-md transition-colors hover:bg-surface-2",
                      idx !== auditTrail.length - 1 &&
                        "border-b border-border-subtle"
                    )}
                  >
                    <span className="mono text-[11px] text-text-tertiary tabular-nums">
                      {e.ts}
                    </span>
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={cn(
                          "h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-semibold flex-shrink-0",
                          e.ai
                            ? "bg-ai/15 text-ai border border-ai/30"
                            : "bg-gradient-to-br from-accent-500 to-ai text-white"
                        )}
                      >
                        {e.initials}
                      </span>
                      <span className="text-[12px] text-text-secondary truncate">
                        {e.actor}
                      </span>
                    </div>
                    <div className="min-w-0 flex items-center gap-2">
                      <span className="text-[12.5px] font-medium text-text-primary flex-shrink-0">
                        {e.action}
                      </span>
                      <span className="text-[12px] text-text-tertiary truncate">
                        {e.target}
                      </span>
                      {e.ai && (
                        <span className="ml-auto">
                          <AiBadge label="AI" />
                        </span>
                      )}
                    </div>
                    <div>
                      <span
                        className={cn(
                          "inline-flex items-center mono text-[10.5px] uppercase tracking-wide font-semibold rounded-full px-2 h-5 border",
                          scopePill[e.scope]
                        )}
                      >
                        {e.scope}
                      </span>
                    </div>
                    <RiskBadge level={e.level} />
                    <Sparkles
                      className="h-3 w-3 text-text-tertiary opacity-0 group-hover:opacity-60 transition-opacity"
                      strokeWidth={2}
                    />
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Compliance banner */}
        <div className="mt-5">
          <Card className="p-5 bg-grain border-ai-gradient">
            <div className="flex items-center gap-4">
              <span className="h-10 w-10 rounded-md bg-gradient-to-br from-accent-500 to-ai flex items-center justify-center flex-shrink-0">
                <ShieldCheck
                  className="h-5 w-5 text-white"
                  strokeWidth={2.2}
                />
              </span>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-text-primary">
                  Every decision is explainable, every action is reversible
                </h3>
                <p className="text-[12.5px] text-text-secondary mt-1 max-w-3xl leading-5">
                  Reasoning traces, signal evidence, model versions, and approver
                  identity are stored immutably for every decision. Action runs
                  can be rolled back within their configured T+ window.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="md">
                  View policies
                </Button>
                <Button variant="primary" size="md">
                  Configure approvals
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Cap({ label, on }: { label: string; on: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[10px] mono uppercase tracking-wide font-semibold rounded-full px-1.5 h-5 border",
        on
          ? "bg-risk-low/12 text-risk-low border-risk-low/30"
          : "bg-surface-2 text-text-tertiary border-border-subtle"
      )}
    >
      {label} {on ? "✓" : "—"}
    </span>
  );
}
