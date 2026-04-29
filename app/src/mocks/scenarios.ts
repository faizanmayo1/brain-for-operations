import type { RiskLevel } from "@/components/feedback/RiskBadge";

export interface ScenarioVariant {
  key: "A" | "B" | "C";
  label: string;
  description: string;
  recommended?: boolean;
  // Outcome time-series, 24 hourly steps
  sla: number[]; // expected
  slaLow: number[]; // 5th percentile
  slaHigh: number[]; // 95th percentile
  cost: number[]; // index, base = 100
  throughput: number[]; // index, base = 100
  // Aggregated KPIs
  expectedSla: number;
  costIndex: number;
  throughputIndex: number;
  riskExposure: string;
  riskLevel: RiskLevel;
}

const labels24h = Array.from({ length: 24 }, (_, i) => {
  const h = (new Date().getHours() + i) % 24;
  return `${h.toString().padStart(2, "0")}:00`;
});

export const scenarioLabels = labels24h;

export const scenarios: ScenarioVariant[] = [
  {
    key: "A",
    label: "Reroute SE-2 → SE-3",
    description:
      "Move 142 priority shipments to SE-3 corridor. Adds 38min average transit, recovers 94% SLA.",
    recommended: true,
    sla: [
      88, 89, 90, 91, 92, 93, 93, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94,
      94, 94, 94, 94, 94, 94,
    ],
    slaLow: [
      82, 84, 85, 86, 87, 88, 89, 89, 90, 90, 91, 91, 91, 91, 92, 92, 92, 92,
      92, 92, 92, 92, 92, 92,
    ],
    slaHigh: [
      92, 93, 94, 95, 95, 96, 96, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97,
      97, 97, 97, 97, 97, 97,
    ],
    cost: [
      100, 102, 105, 108, 110, 112, 113, 113, 113, 113, 113, 113, 113, 113,
      112, 112, 112, 112, 112, 112, 112, 112, 112, 112,
    ],
    throughput: [
      80, 82, 84, 86, 88, 90, 91, 92, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93,
      93, 93, 93, 93, 93, 93,
    ],
    expectedSla: 94,
    costIndex: 1.13,
    throughputIndex: 0.93,
    riskExposure: "$14.2K incremental",
    riskLevel: "low",
  },
  {
    key: "B",
    label: "Authorize OT (8h)",
    description:
      "Approve 8h overtime for Hub-7 evening shift. Recovers throughput in-place but absorbs higher cost.",
    sla: [
      78, 79, 80, 81, 81, 82, 82, 81, 81, 80, 80, 80, 80, 80, 81, 81, 81, 81,
      81, 81, 81, 81, 81, 81,
    ],
    slaLow: [
      70, 71, 72, 72, 72, 72, 72, 71, 70, 69, 69, 68, 68, 68, 68, 68, 68, 68,
      68, 68, 68, 68, 68, 68,
    ],
    slaHigh: [
      85, 86, 87, 88, 89, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
      90, 90, 90, 90, 90, 90,
    ],
    cost: [
      100, 110, 120, 128, 134, 138, 140, 140, 138, 136, 134, 132, 130, 130,
      128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
    ],
    throughput: [
      72, 78, 84, 90, 95, 98, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100,
    ],
    expectedSla: 81,
    costIndex: 1.4,
    throughputIndex: 1.0,
    riskExposure: "$92.0K labor cost",
    riskLevel: "medium",
  },
  {
    key: "C",
    label: "Hold and re-evaluate",
    description:
      "No action; monitor for 90 min and re-assess. Lowest cost, highest residual risk.",
    sla: [
      72, 70, 68, 66, 64, 62, 60, 60, 61, 62, 63, 64, 65, 65, 66, 66, 66, 66,
      66, 66, 66, 66, 66, 66,
    ],
    slaLow: [
      62, 58, 54, 52, 50, 48, 47, 47, 48, 48, 49, 49, 50, 51, 51, 52, 52, 52,
      52, 52, 52, 52, 52, 52,
    ],
    slaHigh: [
      82, 80, 78, 76, 74, 72, 71, 71, 72, 73, 74, 74, 75, 75, 76, 76, 76, 76,
      76, 76, 76, 76, 76, 76,
    ],
    cost: [
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    ],
    throughput: [
      78, 74, 70, 66, 62, 58, 56, 56, 58, 60, 62, 64, 66, 67, 68, 68, 68, 68,
      68, 68, 68, 68, 68, 68,
    ],
    expectedSla: 66,
    costIndex: 1.0,
    throughputIndex: 0.68,
    riskExposure: "$182K SLA penalty exposure",
    riskLevel: "critical",
  },
];

// Variable controls
export interface VariableSpec {
  key: string;
  label: string;
  helper?: string;
  type: "slider" | "toggle" | "select";
  value: number | boolean | string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: { label: string; value: string }[];
}

export const variables: VariableSpec[] = [
  {
    key: "reroute_share",
    label: "Reroute share",
    helper: "Portion of SE-2 shipments redirected via SE-3",
    type: "slider",
    value: 78,
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
  },
  {
    key: "ot_hours",
    label: "OT hours · Hub-7",
    helper: "Authorized evening-shift overtime",
    type: "slider",
    value: 4,
    min: 0,
    max: 16,
    step: 1,
    unit: "h",
  },
  {
    key: "supplier_switch",
    label: "Switch supplier-A → backup",
    helper: "Activate backup supplier contract",
    type: "toggle",
    value: false,
  },
  {
    key: "horizon",
    label: "Time horizon",
    helper: "Simulation window",
    type: "select",
    value: "24h",
    options: [
      { label: "24 hours", value: "24h" },
      { label: "72 hours", value: "72h" },
      { label: "7 days", value: "7d" },
    ],
  },
  {
    key: "weather_severity",
    label: "Weather severity",
    helper: "MW corridor storm intensity",
    type: "slider",
    value: 35,
    min: 0,
    max: 100,
    step: 5,
    unit: "%",
  },
  {
    key: "iterations",
    label: "Monte Carlo iterations",
    helper: "Sample size for distribution",
    type: "select",
    value: "1000",
    options: [
      { label: "500", value: "500" },
      { label: "1,000", value: "1000" },
      { label: "5,000", value: "5000" },
      { label: "10,000", value: "10000" },
    ],
  },
];

// Library entries
export interface ScenarioLibraryEntry {
  id: string;
  title: string;
  variant: string;
  status: "Saved" | "Running" | "Completed" | "Applied";
  expectedSla: number;
  costIndex: number;
  ranBy: string;
  ranByInitials: string;
  ranAt: string;
  iterations: number;
  durationSec: number;
  level: RiskLevel;
}

export const scenarioLibrary: ScenarioLibraryEntry[] = [
  {
    id: "SCN-217",
    title: "Reroute SE-2 corridor — primary",
    variant: "Reroute · OT 4h",
    status: "Completed",
    expectedSla: 94,
    costIndex: 1.13,
    ranBy: "Adnan Dauti",
    ranByInitials: "AD",
    ranAt: "09:14",
    iterations: 1000,
    durationSec: 3.4,
    level: "low",
  },
  {
    id: "SCN-216",
    title: "Aggressive cost-control · no reroute",
    variant: "OT 0h · hold",
    status: "Completed",
    expectedSla: 66,
    costIndex: 1.0,
    ranBy: "Maya Patel",
    ranByInitials: "MP",
    ranAt: "08:51",
    iterations: 5000,
    durationSec: 18.2,
    level: "critical",
  },
  {
    id: "SCN-215",
    title: "Storm-front contingency · MW corridor",
    variant: "Reroute 60% · weather +20%",
    status: "Applied",
    expectedSla: 88,
    costIndex: 1.21,
    ranBy: "AI Agent",
    ranByInitials: "AI",
    ranAt: "Yesterday",
    iterations: 1000,
    durationSec: 3.1,
    level: "low",
  },
  {
    id: "SCN-214",
    title: "Q3 carrier-mix optimization (B-pricing)",
    variant: "Mix B · OT 0h",
    status: "Saved",
    expectedSla: 91,
    costIndex: 0.93,
    ranBy: "James Vega",
    ranByInitials: "JV",
    ranAt: "Yesterday",
    iterations: 10000,
    durationSec: 41.8,
    level: "low",
  },
  {
    id: "SCN-213",
    title: "Supplier-A failure · network impact",
    variant: "Supplier switch · reroute 40%",
    status: "Running",
    expectedSla: 84,
    costIndex: 1.16,
    ranBy: "AI Agent",
    ranByInitials: "AI",
    ranAt: "Yesterday",
    iterations: 5000,
    durationSec: 12.4,
    level: "medium",
  },
  {
    id: "SCN-212",
    title: "Workforce shortfall · Hub-9",
    variant: "OT 12h · backfill",
    status: "Completed",
    expectedSla: 89,
    costIndex: 1.18,
    ranBy: "Sara Lin",
    ranByInitials: "SL",
    ranAt: "Apr 27",
    iterations: 1000,
    durationSec: 2.9,
    level: "low",
  },
];

// Outcome distribution histogram (Monte Carlo result for scenario A)
export const distributions: Record<
  "A" | "B" | "C",
  { sla: number[]; cost: number[] }
> = {
  A: {
    sla: [0, 0, 1, 2, 4, 8, 14, 22, 36, 52, 70, 88, 102, 118, 130, 122, 96, 70, 38, 14, 6, 2, 0, 0],
    cost: [0, 0, 2, 6, 14, 24, 44, 72, 110, 142, 168, 180, 158, 124, 84, 52, 28, 12, 6, 2, 0, 0, 0, 0],
  },
  B: {
    sla: [0, 1, 4, 10, 22, 40, 64, 90, 116, 138, 142, 124, 96, 68, 42, 22, 10, 4, 1, 0, 0, 0, 0, 0],
    cost: [0, 0, 0, 0, 0, 2, 6, 16, 36, 68, 102, 132, 152, 158, 144, 118, 84, 54, 30, 14, 6, 2, 0, 0],
  },
  C: {
    sla: [4, 12, 28, 56, 88, 120, 142, 138, 122, 96, 68, 42, 22, 10, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    cost: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 240, 320, 280, 200, 132, 76, 38, 18, 6],
  },
};

// KPI strip
export const scenarioKpis = {
  ranToday: { value: 12, delta: 4, helper: "scenarios completed" },
  accuracy: { value: "92", unit: "%", delta: 4, helper: "30-day prediction accuracy" },
  decisions: { value: 47, delta: 23, helper: "informed by simulation" },
  saveAvg: { value: "$74K", delta: 18, helper: "avg per applied scenario" },
};
