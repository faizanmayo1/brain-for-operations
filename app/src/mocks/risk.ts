import type { RiskLevel } from "@/components/feedback/RiskBadge";

export interface Zone {
  id: string;
  name: string;
  region: string;
  composite: number;
  delta24h: number;
  trend: number[]; // last 24 hourly composites
  immediate: number;
  emerging: number;
  hidden: number;
  level: RiskLevel;
  owner: string;
  ownerInitials: string;
  status: "Active" | "Watching" | "Stable";
  signals: number;
}

export const zones: Zone[] = [
  {
    id: "Z-PHX-7",
    name: "Hub-7 PHX",
    region: "Southwest · Phoenix",
    composite: 89,
    delta24h: 14,
    trend: [62, 64, 66, 65, 64, 66, 68, 70, 71, 73, 74, 76, 78, 80, 82, 83, 84, 85, 86, 87, 88, 88, 89, 89],
    immediate: 91,
    emerging: 78,
    hidden: 64,
    level: "critical",
    owner: "Maya Patel",
    ownerInitials: "MP",
    status: "Active",
    signals: 18,
  },
  {
    id: "Z-SE2",
    name: "SE-2 corridor",
    region: "South-East",
    composite: 76,
    delta24h: 8,
    trend: [60, 60, 62, 63, 64, 64, 66, 67, 68, 68, 69, 70, 70, 71, 72, 72, 73, 73, 74, 74, 75, 75, 76, 76],
    immediate: 79,
    emerging: 72,
    hidden: 51,
    level: "high",
    owner: "James Vega",
    ownerInitials: "JV",
    status: "Active",
    signals: 11,
  },
  {
    id: "Z-NET",
    name: "Network-wide",
    region: "All hubs",
    composite: 71,
    delta24h: -2,
    trend: [73, 74, 73, 73, 72, 73, 74, 73, 72, 72, 71, 72, 71, 71, 70, 71, 71, 70, 71, 71, 70, 71, 71, 71],
    immediate: 68,
    emerging: 74,
    hidden: 71,
    level: "high",
    owner: "AI Agent",
    ownerInitials: "AI",
    status: "Watching",
    signals: 7,
  },
  {
    id: "Z-MW",
    name: "Midwest corridor",
    region: "Midwest",
    composite: 58,
    delta24h: 6,
    trend: [50, 50, 51, 51, 52, 52, 52, 53, 53, 54, 54, 55, 55, 55, 56, 56, 56, 57, 57, 57, 58, 58, 58, 58],
    immediate: 54,
    emerging: 64,
    hidden: 56,
    level: "medium",
    owner: "Sara Lin",
    ownerInitials: "SL",
    status: "Watching",
    signals: 5,
  },
  {
    id: "Z-ATL-3",
    name: "Hub-3 ATL",
    region: "South-East",
    composite: 52,
    delta24h: 0,
    trend: [54, 53, 53, 52, 51, 52, 52, 51, 52, 51, 52, 52, 51, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52],
    immediate: 48,
    emerging: 56,
    hidden: 52,
    level: "medium",
    owner: "Maya Patel",
    ownerInitials: "MP",
    status: "Watching",
    signals: 4,
  },
  {
    id: "Z-DAL-9",
    name: "Hub-9 DAL",
    region: "South",
    composite: 44,
    delta24h: 3,
    trend: [40, 40, 41, 41, 41, 42, 42, 42, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 44, 44, 44],
    immediate: 42,
    emerging: 46,
    hidden: 44,
    level: "medium",
    owner: "Sara Lin",
    ownerInitials: "SL",
    status: "Watching",
    signals: 3,
  },
  {
    id: "Z-LA-1",
    name: "Hub-1 LA",
    region: "West",
    composite: 32,
    delta24h: -3,
    trend: [38, 37, 37, 36, 35, 35, 35, 34, 34, 34, 34, 33, 33, 33, 33, 33, 33, 32, 32, 32, 32, 32, 32, 32],
    immediate: 28,
    emerging: 34,
    hidden: 34,
    level: "low",
    owner: "James Vega",
    ownerInitials: "JV",
    status: "Stable",
    signals: 2,
  },
  {
    id: "Z-NW",
    name: "Northwest",
    region: "Northwest",
    composite: 28,
    delta24h: 1,
    trend: [27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    immediate: 24,
    emerging: 30,
    hidden: 30,
    level: "low",
    owner: "AI Agent",
    ownerInitials: "AI",
    status: "Stable",
    signals: 1,
  },
];

// Multi-layer risk evolution (24h)
export const layeredRisk = {
  labels: Array.from({ length: 24 }, (_, i) => {
    const h = (new Date().getHours() - 23 + i + 24) % 24;
    return `${h.toString().padStart(2, "0")}:00`;
  }),
  series: [
    {
      label: "Immediate",
      color: "#E5484D",
      data: [38, 36, 35, 36, 38, 40, 44, 48, 52, 56, 58, 56, 54, 58, 64, 70, 74, 78, 82, 84, 86, 88, 90, 91],
    },
    {
      label: "Emerging",
      color: "#F76B15",
      data: [42, 41, 41, 42, 43, 44, 46, 48, 50, 52, 55, 56, 58, 60, 62, 64, 67, 69, 71, 73, 74, 75, 76, 77],
    },
    {
      label: "Hidden",
      color: "#7C5CFF",
      data: [38, 39, 39, 39, 39, 40, 40, 41, 41, 42, 43, 44, 45, 47, 49, 52, 54, 57, 60, 62, 64, 65, 66, 67],
    },
  ],
};

// Risk register entries
export interface RegisterEntry {
  id: string;
  zone: string;
  dimension: string;
  level: RiskLevel;
  current: number;
  change: number;
  trend: number[];
  owner: string;
  ownerInitials: string;
  signals: number;
  status: "Active" | "Watching" | "Stable";
  ageMin: number;
}

export const registerEntries: RegisterEntry[] = [
  {
    id: "R-2087",
    zone: "Hub-7 PHX",
    dimension: "Throughput",
    level: "critical",
    current: 91,
    change: 14,
    trend: [62, 66, 70, 73, 77, 80, 84, 86, 89, 91],
    owner: "Maya Patel",
    ownerInitials: "MP",
    signals: 18,
    status: "Active",
    ageMin: 3,
  },
  {
    id: "R-2086",
    zone: "SE-2 corridor",
    dimension: "SLA breach",
    level: "high",
    current: 76,
    change: 8,
    trend: [62, 64, 66, 68, 70, 72, 73, 74, 75, 76],
    owner: "James Vega",
    ownerInitials: "JV",
    signals: 11,
    status: "Active",
    ageMin: 8,
  },
  {
    id: "R-2079",
    zone: "Network-wide",
    dimension: "Supplier delay",
    level: "high",
    current: 71,
    change: -2,
    trend: [74, 74, 73, 72, 72, 71, 71, 71, 71, 71],
    owner: "AI Agent",
    ownerInitials: "AI",
    signals: 7,
    status: "Watching",
    ageMin: 12,
  },
  {
    id: "R-2071",
    zone: "Midwest corridor",
    dimension: "Weather impact",
    level: "medium",
    current: 58,
    change: 6,
    trend: [50, 51, 52, 53, 54, 55, 56, 57, 58, 58],
    owner: "Sara Lin",
    ownerInitials: "SL",
    signals: 5,
    status: "Watching",
    ageMin: 21,
  },
  {
    id: "R-2068",
    zone: "Hub-3 ATL",
    dimension: "Cycle-count variance",
    level: "medium",
    current: 52,
    change: 0,
    trend: [52, 51, 52, 52, 52, 51, 52, 52, 52, 52],
    owner: "Maya Patel",
    ownerInitials: "MP",
    signals: 4,
    status: "Watching",
    ageMin: 34,
  },
  {
    id: "R-2061",
    zone: "Hub-9 DAL",
    dimension: "Workforce shortfall",
    level: "low",
    current: 44,
    change: 3,
    trend: [40, 41, 42, 42, 43, 43, 43, 44, 44, 44],
    owner: "Sara Lin",
    ownerInitials: "SL",
    signals: 3,
    status: "Watching",
    ageMin: 52,
  },
  {
    id: "R-2058",
    zone: "Hub-1 LA",
    dimension: "Cost variance",
    level: "low",
    current: 32,
    change: -3,
    trend: [38, 36, 35, 34, 33, 33, 32, 32, 32, 32],
    owner: "James Vega",
    ownerInitials: "JV",
    signals: 2,
    status: "Stable",
    ageMin: 67,
  },
];

// Hidden risk patterns (AI-detected)
export interface HiddenPattern {
  id: string;
  title: string;
  detected: string;
  description: string;
  zones: string[];
  confidence: number;
}

export const hiddenPatterns: HiddenPattern[] = [
  {
    id: "P-018",
    title: "SE-2 throughput correlates with supplier-A delay (+0.78)",
    detected: "14m ago",
    description:
      "Cross-signal correlation detected: SE-2 corridor SLA breaches lead supplier-A delivery anomalies by 3.2h on average.",
    zones: ["SE-2 corridor", "Network-wide"],
    confidence: 84,
  },
  {
    id: "P-017",
    title: "Hub-7 surge precedes Hub-3 inventory variance (T+6h)",
    detected: "47m ago",
    description:
      "Pattern: when Hub-7 throughput exceeds 80, Hub-3 cycle-count variance rises within 6h (n=14 of last 18 events).",
    zones: ["Hub-7 PHX", "Hub-3 ATL"],
    confidence: 79,
  },
  {
    id: "P-014",
    title: "Workforce shortfall under-reported in evening shifts",
    detected: "2h ago",
    description:
      "Scheduled vs actual headcount diverging in last 9 evenings at Hub-9 — current model under-weights this dimension.",
    zones: ["Hub-9 DAL"],
    confidence: 72,
  },
];

// KPI strip data
export const riskKpis = {
  composite: { value: 86, delta: 14, helper: "vs 24h baseline" },
  critical: { value: 3, delta: 1, helper: "zones at critical now" },
  emerging: { value: 6, delta: 2, helper: "patterns rising > 5pp" },
  detection: {
    value: "2.4",
    unit: "min",
    delta: -38,
    helper: "median detection lag",
  },
};
