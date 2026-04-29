import type { RiskLevel } from "@/components/feedback/RiskBadge";

export type ActionStatus =
  | "queued"
  | "running"
  | "awaiting-approval"
  | "succeeded"
  | "failed"
  | "rolled-back";

export type ActionMode = "manual" | "approval" | "auto";

export interface ActionRun {
  id: string;
  title: string;
  decision: string; // DEC-XXXX
  status: ActionStatus;
  mode: ActionMode;
  owner: string;
  ownerInitials: string;
  startedAt: string;
  duration: string; // mono-friendly e.g. "3m 12s" or "—"
  progress: number; // 0..100
  steps: number;
  stepsCompleted: number;
  level: RiskLevel;
  systems: string[];
}

export const liveRuns: ActionRun[] = [
  {
    id: "ACT-9217",
    title: "Reroute SE-2 corridor shipments",
    decision: "DEC-4081",
    status: "running",
    mode: "approval",
    owner: "Maya Patel",
    ownerInitials: "MP",
    startedAt: "09:12",
    duration: "1m 48s",
    progress: 62,
    steps: 8,
    stepsCompleted: 5,
    level: "critical",
    systems: ["OTM", "WMS", "Slack", "Audit"],
  },
  {
    id: "ACT-9216",
    title: "Pre-stage Hub-3 inbound for storm window",
    decision: "DEC-4079",
    status: "running",
    mode: "auto",
    owner: "AI Agent",
    ownerInitials: "AI",
    startedAt: "09:08",
    duration: "5m 22s",
    progress: 81,
    steps: 6,
    stepsCompleted: 5,
    level: "medium",
    systems: ["WMS", "WFM"],
  },
  {
    id: "ACT-9215",
    title: "Notify carriers of revised cutoff times",
    decision: "DEC-4080",
    status: "awaiting-approval",
    mode: "approval",
    owner: "James Vega",
    ownerInitials: "JV",
    startedAt: "—",
    duration: "—",
    progress: 0,
    steps: 4,
    stepsCompleted: 0,
    level: "high",
    systems: ["Carrier API", "Email"],
  },
];

export interface ApprovalRequest {
  id: string;
  title: string;
  decisionId: string;
  level: RiskLevel;
  requestedBy: string;
  requestedByInitials: string;
  ageMin: number;
  expectedImpact: string;
  confidence: number;
  ai: boolean;
}

export const approvalQueue: ApprovalRequest[] = [
  {
    id: "APR-2014",
    title: "Authorize 8h overtime · Hub-7 evening shift",
    decisionId: "DEC-4080",
    level: "high",
    requestedBy: "Copilot",
    requestedByInitials: "AI",
    ageMin: 4,
    expectedImpact: "−47% throughput risk",
    confidence: 81,
    ai: true,
  },
  {
    id: "APR-2013",
    title: "Switch supplier-A → backup contract (T+24h)",
    decisionId: "DEC-4078",
    level: "high",
    requestedBy: "Copilot",
    requestedByInitials: "AI",
    ageMin: 12,
    expectedImpact: "−$92K exposure",
    confidence: 76,
    ai: true,
  },
  {
    id: "APR-2012",
    title: "Notify SE-2 carriers of revised cutoff",
    decisionId: "DEC-4080",
    level: "medium",
    requestedBy: "James Vega",
    requestedByInitials: "JV",
    ageMin: 28,
    expectedImpact: "+2.4% on-time",
    confidence: 92,
    ai: false,
  },
];

// Agent orchestration — concurrent agent runs around an active action
export interface AgentNode {
  id: string;
  name: string;
  status: "complete" | "running" | "queued" | "error";
  role: string;
  duration: string;
  // x,y in arbitrary unit space; the canvas renders proportionally
  x: number;
  y: number;
}

export interface AgentEdge {
  from: string;
  to: string;
}

export const agentGraph: { nodes: AgentNode[]; edges: AgentEdge[] } = {
  nodes: [
    {
      id: "orchestrator",
      name: "Orchestrator",
      role: "Coordinates execution flow",
      status: "running",
      duration: "1m 48s",
      x: 50,
      y: 50,
    },
    {
      id: "router",
      name: "Routing Agent",
      role: "Generates carrier assignment",
      status: "complete",
      duration: "12.4s",
      x: 18,
      y: 22,
    },
    {
      id: "comms",
      name: "Comms Agent",
      role: "Notifies carriers + drivers",
      status: "running",
      duration: "running",
      x: 18,
      y: 78,
    },
    {
      id: "wms",
      name: "WMS Agent",
      role: "Updates pick + dock plans",
      status: "complete",
      duration: "8.1s",
      x: 82,
      y: 22,
    },
    {
      id: "audit",
      name: "Audit Agent",
      role: "Records decision + reasoning",
      status: "queued",
      duration: "queued",
      x: 82,
      y: 78,
    },
  ],
  edges: [
    { from: "orchestrator", to: "router" },
    { from: "orchestrator", to: "comms" },
    { from: "orchestrator", to: "wms" },
    { from: "orchestrator", to: "audit" },
    { from: "router", to: "wms" },
    { from: "wms", to: "audit" },
  ],
};

// Step-by-step trace for the modal
export interface ExecStep {
  step: number;
  label: string;
  agent: string;
  durationMs: number;
  status: "complete" | "running" | "queued";
  detail?: string;
}

export const execTrace: ExecStep[] = [
  {
    step: 1,
    label: "Validate decision context",
    agent: "Orchestrator",
    durationMs: 240,
    status: "complete",
    detail:
      "Cross-checked against signal landscape; SE-2 risk still 76. Proceed.",
  },
  {
    step: 2,
    label: "Generate carrier assignment plan",
    agent: "Routing Agent",
    durationMs: 12400,
    status: "complete",
    detail: "142 shipments split across 3 SE-3 carriers; balanced load.",
  },
  {
    step: 3,
    label: "Update WMS pick + dock plans",
    agent: "WMS Agent",
    durationMs: 8100,
    status: "complete",
    detail: "Hub-7 + Hub-3 pick lists rewritten; dock door re-allocations OK.",
  },
  {
    step: 4,
    label: "Push reroute orders to OTM",
    agent: "Routing Agent",
    durationMs: 3600,
    status: "complete",
    detail: "All 142 orders accepted; carrier responses within SLA.",
  },
  {
    step: 5,
    label: "Notify carrier + driver fleets",
    agent: "Comms Agent",
    durationMs: 0,
    status: "running",
    detail: "76 of 142 notifications delivered.",
  },
  {
    step: 6,
    label: "Post execution summary to #ops-incident",
    agent: "Comms Agent",
    durationMs: 0,
    status: "queued",
  },
  {
    step: 7,
    label: "Record audit log entry",
    agent: "Audit Agent",
    durationMs: 0,
    status: "queued",
  },
  {
    step: 8,
    label: "Schedule outcome verification (T+90m)",
    agent: "Orchestrator",
    durationMs: 0,
    status: "queued",
  },
];

// History table
export interface ActionHistoryEntry {
  id: string;
  title: string;
  decision: string;
  mode: ActionMode;
  status: ActionStatus;
  level: RiskLevel;
  owner: string;
  ownerInitials: string;
  duration: string;
  completedAt: string;
  impact: string;
}

export const actionHistory: ActionHistoryEntry[] = [
  {
    id: "ACT-9214",
    title: "Reduce inbound throttle · Hub-1",
    decision: "DEC-4076",
    mode: "auto",
    status: "succeeded",
    level: "low",
    owner: "AI Agent",
    ownerInitials: "AI",
    duration: "42s",
    completedAt: "08:54",
    impact: "+3.1% throughput",
  },
  {
    id: "ACT-9213",
    title: "Replace forklift assignment · Hub-7",
    decision: "DEC-4072",
    mode: "approval",
    status: "succeeded",
    level: "medium",
    owner: "Maya Patel",
    ownerInitials: "MP",
    duration: "1m 12s",
    completedAt: "08:31",
    impact: "Throughput restored",
  },
  {
    id: "ACT-9212",
    title: "Send proactive SLA breach alert",
    decision: "DEC-4070",
    mode: "auto",
    status: "succeeded",
    level: "high",
    owner: "AI Agent",
    ownerInitials: "AI",
    duration: "8s",
    completedAt: "08:18",
    impact: "$24K avoided",
  },
  {
    id: "ACT-9211",
    title: "Cycle-count remediation · Hub-3",
    decision: "DEC-4068",
    mode: "approval",
    status: "rolled-back",
    level: "medium",
    owner: "James Vega",
    ownerInitials: "JV",
    duration: "4m 02s",
    completedAt: "07:58",
    impact: "Reverted on supervisor flag",
  },
  {
    id: "ACT-9210",
    title: "Pre-stage Q3 carrier mix change",
    decision: "DEC-4061",
    mode: "manual",
    status: "succeeded",
    level: "low",
    owner: "Sara Lin",
    ownerInitials: "SL",
    duration: "2m 31s",
    completedAt: "07:42",
    impact: "Cost −$8.4K",
  },
  {
    id: "ACT-9209",
    title: "Trigger weather-driven backfill",
    decision: "DEC-4055",
    mode: "auto",
    status: "succeeded",
    level: "medium",
    owner: "AI Agent",
    ownerInitials: "AI",
    duration: "1m 04s",
    completedAt: "07:18",
    impact: "+1.6% on-time",
  },
  {
    id: "ACT-9208",
    title: "Failed driver dispatch retry",
    decision: "DEC-4051",
    mode: "auto",
    status: "failed",
    level: "high",
    owner: "AI Agent",
    ownerInitials: "AI",
    duration: "2m 18s",
    completedAt: "07:02",
    impact: "Escalated to ops",
  },
];

// Volume chart — actions per hour, last 24h, stacked by mode
export const volumeByMode = {
  labels: Array.from({ length: 24 }, (_, i) => {
    const h = (new Date().getHours() - 23 + i + 24) % 24;
    return `${h.toString().padStart(2, "0")}:00`;
  }),
  series: [
    {
      label: "Auto",
      color: "#5B6CFF",
      data: [3, 4, 4, 5, 6, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 11, 13, 14, 12, 11, 13, 14, 12, 13],
    },
    {
      label: "Approval",
      color: "#7C5CFF",
      data: [1, 1, 2, 2, 2, 3, 3, 4, 5, 6, 5, 6, 7, 8, 8, 9, 8, 8, 9, 8, 8, 9, 8, 9],
    },
    {
      label: "Manual",
      color: "#15B5B5",
      data: [0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 2, 3, 3, 3, 4, 3, 3, 3, 3, 4, 3, 3, 3, 3],
    },
  ],
};

// KPI strip
export const actionKpis = {
  today: { value: 184, delta: 18, helper: "actions executed" },
  pending: {
    value: 3,
    delta: 1,
    helper: "awaiting approval",
    deltaSemantic: "negative" as const,
  },
  autoRate: {
    value: "62",
    unit: "%",
    delta: 8,
    helper: "fully autonomous",
  },
  avgTime: {
    value: "1.4",
    unit: "min",
    delta: -34,
    helper: "median execution",
    deltaSemantic: "negative" as const,
  },
};
