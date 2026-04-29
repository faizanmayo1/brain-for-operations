import type { RiskLevel } from "@/components/feedback/RiskBadge";

export interface PrioritySignal {
  id: string;
  title: string;
  source: string;
  zone: string;
  level: RiskLevel;
  score: number;
  delta: number; // last 5 min change
  confidence: number; // 0-100
  timeToAct: string; // e.g. "1h 12m"
  age: string; // e.g. "8m ago"
  cluster: "Throughput" | "SLA" | "Supplier" | "Weather" | "Inventory" | "Workforce";
}

export const prioritySignals: PrioritySignal[] = [
  {
    id: "SIG-2087",
    title: "Hub-7 throughput collapsing under inbound surge",
    source: "WMS · sensor-fleet",
    zone: "Hub-7 / Phoenix",
    level: "critical",
    score: 89,
    delta: 11,
    confidence: 94,
    timeToAct: "47m",
    age: "3m ago",
    cluster: "Throughput",
  },
  {
    id: "SIG-2086",
    title: "SLA breach risk on SE-2 corridor — 142 shipments",
    source: "Carrier API · OTM",
    zone: "South-East 2",
    level: "high",
    score: 76,
    delta: 4,
    confidence: 88,
    timeToAct: "1h 12m",
    age: "8m ago",
    cluster: "SLA",
  },
  {
    id: "SIG-2079",
    title: "Tier-1 supplier delay propagating to 3 hubs",
    source: "EDI · ERP",
    zone: "Network",
    level: "high",
    score: 71,
    delta: -2,
    confidence: 82,
    timeToAct: "2h 04m",
    age: "12m ago",
    cluster: "Supplier",
  },
  {
    id: "SIG-2071",
    title: "Storm front predicted to impact MW corridor by 14:00",
    source: "NOAA · weather-feed",
    zone: "Midwest",
    level: "medium",
    score: 58,
    delta: 6,
    confidence: 79,
    timeToAct: "3h 48m",
    age: "21m ago",
    cluster: "Weather",
  },
  {
    id: "SIG-2068",
    title: "Cycle-count variance flagged in Hub-3 returns",
    source: "WMS · inventory-svc",
    zone: "Hub-3 / Atlanta",
    level: "medium",
    score: 52,
    delta: 0,
    confidence: 71,
    timeToAct: "5h",
    age: "34m ago",
    cluster: "Inventory",
  },
  {
    id: "SIG-2061",
    title: "Workforce shortfall projected for evening shift, Hub-9",
    source: "WFM · scheduling",
    zone: "Hub-9 / Dallas",
    level: "low",
    score: 34,
    delta: -3,
    confidence: 68,
    timeToAct: "8h",
    age: "52m ago",
    cluster: "Workforce",
  },
];

// Risk evolution time series (last 24h, hourly)
export const riskEvolution = {
  labels: Array.from({ length: 24 }, (_, i) => {
    const h = (new Date().getHours() - 23 + i + 24) % 24;
    return `${h.toString().padStart(2, "0")}:00`;
  }),
  series: [
    {
      label: "Composite risk",
      color: "#5B6CFF",
      data: [
        42, 41, 40, 39, 38, 38, 41, 45, 49, 52, 55, 53, 51, 54, 58, 62, 68,
        72, 75, 78, 76, 79, 82, 86,
      ],
    },
    {
      label: "Avg confidence",
      color: "#7C5CFF",
      data: [
        62, 64, 63, 66, 68, 70, 72, 74, 73, 75, 78, 79, 80, 82, 81, 83, 84,
        85, 86, 87, 86, 87, 88, 87,
      ],
    },
  ],
};

// Heatmap — 6 zones × 7 dimensions
export const heatmapRows = [
  "Hub-1 LA",
  "Hub-3 ATL",
  "Hub-7 PHX",
  "Hub-9 DAL",
  "SE-2 corr",
  "Network",
];
export const heatmapCols = [
  "TPUT",
  "SLA",
  "INV",
  "STAFF",
  "SUPPLY",
  "WX",
  "COST",
];

export const heatmapCells = [
  { row: "Hub-1 LA", col: "TPUT", value: 32 },
  { row: "Hub-1 LA", col: "SLA", value: 28 },
  { row: "Hub-1 LA", col: "INV", value: 41 },
  { row: "Hub-1 LA", col: "STAFF", value: 18 },
  { row: "Hub-1 LA", col: "SUPPLY", value: 47 },
  { row: "Hub-1 LA", col: "WX", value: 12 },
  { row: "Hub-1 LA", col: "COST", value: 38 },

  { row: "Hub-3 ATL", col: "TPUT", value: 51 },
  { row: "Hub-3 ATL", col: "SLA", value: 44 },
  { row: "Hub-3 ATL", col: "INV", value: 62, changed: true },
  { row: "Hub-3 ATL", col: "STAFF", value: 33 },
  { row: "Hub-3 ATL", col: "SUPPLY", value: 49 },
  { row: "Hub-3 ATL", col: "WX", value: 28 },
  { row: "Hub-3 ATL", col: "COST", value: 41 },

  { row: "Hub-7 PHX", col: "TPUT", value: 89, changed: true },
  { row: "Hub-7 PHX", col: "SLA", value: 78 },
  { row: "Hub-7 PHX", col: "INV", value: 56 },
  { row: "Hub-7 PHX", col: "STAFF", value: 64 },
  { row: "Hub-7 PHX", col: "SUPPLY", value: 71 },
  { row: "Hub-7 PHX", col: "WX", value: 22 },
  { row: "Hub-7 PHX", col: "COST", value: 58 },

  { row: "Hub-9 DAL", col: "TPUT", value: 44 },
  { row: "Hub-9 DAL", col: "SLA", value: 38 },
  { row: "Hub-9 DAL", col: "INV", value: 39 },
  { row: "Hub-9 DAL", col: "STAFF", value: 67, changed: true },
  { row: "Hub-9 DAL", col: "SUPPLY", value: 42 },
  { row: "Hub-9 DAL", col: "WX", value: 31 },
  { row: "Hub-9 DAL", col: "COST", value: 45 },

  { row: "SE-2 corr", col: "TPUT", value: 58 },
  { row: "SE-2 corr", col: "SLA", value: 76, changed: true },
  { row: "SE-2 corr", col: "INV", value: 31 },
  { row: "SE-2 corr", col: "STAFF", value: 28 },
  { row: "SE-2 corr", col: "SUPPLY", value: 39 },
  { row: "SE-2 corr", col: "WX", value: 19 },
  { row: "SE-2 corr", col: "COST", value: 51 },

  { row: "Network", col: "TPUT", value: 48 },
  { row: "Network", col: "SLA", value: 42 },
  { row: "Network", col: "INV", value: 46 },
  { row: "Network", col: "STAFF", value: 39 },
  { row: "Network", col: "SUPPLY", value: 71, changed: true },
  { row: "Network", col: "WX", value: 24 },
  { row: "Network", col: "COST", value: 52 },
];

// Decision pipeline kanban
export const pipelineColumns = [
  { key: "detected", label: "Detected", count: 8, tone: "neutral" as const },
  { key: "analyzing", label: "Analyzing", count: 5, tone: "ai" as const },
  {
    key: "recommended",
    label: "Recommended",
    count: 4,
    tone: "accent" as const,
  },
  {
    key: "approval",
    label: "Pending approval",
    count: 3,
    tone: "warning" as const,
  },
  { key: "exec", label: "Executing", count: 2, tone: "accent" as const },
  { key: "done", label: "Completed (24h)", count: 17, tone: "success" as const },
];

export interface PipelineCard {
  id: string;
  title: string;
  column: string;
  owner: string;
  ownerInitials: string;
  eta?: string;
  level: RiskLevel;
}

export const pipelineCards: PipelineCard[] = [
  {
    id: "DEC-4081",
    title: "Reroute 142 shipments via SE-3",
    column: "recommended",
    owner: "Maya Patel",
    ownerInitials: "MP",
    eta: "12m left",
    level: "critical",
  },
  {
    id: "DEC-4080",
    title: "Authorize OT for Hub-7 evening shift",
    column: "approval",
    owner: "James Vega",
    ownerInitials: "JV",
    eta: "1h 04m",
    level: "high",
  },
  {
    id: "DEC-4079",
    title: "Pre-stage Hub-3 inbound — storm prep",
    column: "exec",
    owner: "AI Agent",
    ownerInitials: "AI",
    eta: "running",
    level: "medium",
  },
  {
    id: "DEC-4078",
    title: "Switch supplier-A to backup contract",
    column: "analyzing",
    owner: "Copilot",
    ownerInitials: "AI",
    level: "high",
  },
];

// KPIs (top strip)
export const kpiData = {
  decisions: {
    label: "Decisions today",
    value: 47,
    delta: 23,
    deltaSemantic: "positive" as const,
    spark: [22, 26, 28, 31, 30, 35, 38, 40, 42, 44, 47],
  },
  timeToDecide: {
    label: "Avg time to decide",
    value: "12",
    unit: "min",
    delta: -94,
    deltaSemantic: "negative" as const,
    helper: "vs 4.2h baseline",
    spark: [240, 220, 180, 142, 96, 72, 48, 32, 24, 18, 12],
  },
  riskAvoided: {
    label: "Risk events avoided",
    value: 47,
    delta: 18,
    deltaSemantic: "positive" as const,
    spark: [32, 33, 36, 35, 38, 40, 42, 41, 44, 46, 47],
  },
  acceptance: {
    label: "AI rec acceptance",
    value: "78",
    unit: "%",
    delta: 6,
    deltaSemantic: "positive" as const,
    helper: "30-day trailing",
    spark: [62, 64, 65, 66, 68, 70, 72, 74, 75, 77, 78],
  },
};

// Audit / activity feed
export interface ActivityItem {
  id: string;
  ts: string;
  actor: "Adnan Dauti" | "Maya Patel" | "James Vega" | "AI Agent" | "Copilot";
  action: string;
  ref?: string;
  tone: "info" | "ai" | "success" | "warn";
}

export const activity: ActivityItem[] = [
  {
    id: "a1",
    ts: "09:14",
    actor: "AI Agent",
    action: "auto-executed inbound rebalance",
    ref: "DEC-4079",
    tone: "ai",
  },
  {
    id: "a2",
    ts: "09:11",
    actor: "Maya Patel",
    action: "approved decision",
    ref: "DEC-4078",
    tone: "success",
  },
  {
    id: "a3",
    ts: "09:08",
    actor: "Copilot",
    action: "raised severity Hub-7 throughput",
    ref: "SIG-2087",
    tone: "warn",
  },
  {
    id: "a4",
    ts: "09:02",
    actor: "Adnan Dauti",
    action: "opened scenario",
    ref: "SCN-217",
    tone: "info",
  },
];

// Decision detail (modal)
export const decisionDetail = {
  id: "DEC-4081",
  title: "Reroute 142 shipments via SE-3 corridor",
  summary:
    "Composite risk on the SE-2 corridor crossed 76 with rising trajectory. AI recommends partial reroute via SE-3 to protect on-time delivery for 142 priority shipments. Estimated SLA save: 94%.",
  confidence: 87,
  level: "critical" as const,
  source: "Decision Copilot · multi-agent ensemble",
  options: [
    {
      key: "A",
      label: "Reroute via SE-3",
      sla: 94,
      cost: 1.0,
      time: 38,
      risk: "Low",
      recommended: true,
    },
    {
      key: "B",
      label: "Authorize carrier overtime",
      sla: 81,
      cost: 1.4,
      time: 24,
      risk: "Medium",
    },
    {
      key: "C",
      label: "Hold and re-evaluate",
      sla: 62,
      cost: 0.4,
      time: 0,
      risk: "High",
    },
  ],
  reasoning: [
    {
      title: "Signal correlation",
      body: "SE-2 throughput dropping 11pp over 90 min, correlated with Hub-7 surge and supplier-A delay.",
    },
    {
      title: "Probability uplift",
      body: "Reroute path SE-3 historically maintains 92–96% SLA under similar load (last 18 months, n=23).",
    },
    {
      title: "Cost envelope",
      body: "Incremental fuel + reload cost ≈ $14.2K. Forecast SLA penalty avoided: $182K.",
    },
  ],
};
