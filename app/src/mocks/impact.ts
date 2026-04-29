import type { RiskLevel } from "@/components/feedback/RiskBadge";

// 30-day outcome trend
export const outcomeTrend = {
  labels: Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }),
  series: [
    {
      label: "Risk avoided",
      color: "#3DA94D",
      data: [
        12, 14, 16, 14, 18, 20, 22, 21, 24, 26, 25, 28, 30, 32, 31, 34, 36, 38,
        37, 40, 42, 41, 44, 46, 45, 47, 48, 50, 52, 54,
      ],
    },
    {
      label: "Cost avoided ($K)",
      color: "#5B6CFF",
      data: [
        24, 28, 32, 31, 36, 42, 45, 48, 52, 58, 62, 64, 68, 74, 78, 82, 88, 92,
        96, 102, 108, 114, 122, 128, 134, 142, 152, 158, 168, 182,
      ],
    },
  ],
};

// Accuracy by decision category
export interface AccuracyRow {
  category: string;
  decisions: number;
  accuracy: number;
  delta: number;
  level: RiskLevel;
}

export const accuracyByCategory: AccuracyRow[] = [
  { category: "Routing", decisions: 142, accuracy: 94, delta: 6, level: "low" },
  { category: "Workforce", decisions: 78, accuracy: 88, delta: 4, level: "low" },
  { category: "Inventory", decisions: 64, accuracy: 91, delta: 8, level: "low" },
  { category: "Supplier", decisions: 38, accuracy: 82, delta: 11, level: "medium" },
  { category: "Weather", decisions: 24, accuracy: 79, delta: -3, level: "medium" },
  { category: "Cost-control", decisions: 18, accuracy: 73, delta: 9, level: "medium" },
];

// Decision outcomes table
export interface OutcomeRow {
  id: string;
  decision: string;
  expected: string;
  actual: string;
  delta: number; // % accuracy
  category: string;
  owner: string;
  ownerInitials: string;
  closedAt: string;
  hit: boolean;
}

export const outcomeRows: OutcomeRow[] = [
  {
    id: "DEC-4079",
    decision: "Pre-stage Hub-3 inbound for storm window",
    expected: "+11% on-time",
    actual: "+12.4% on-time",
    delta: 113,
    category: "Routing",
    owner: "AI Agent",
    ownerInitials: "AI",
    closedAt: "08:54",
    hit: true,
  },
  {
    id: "DEC-4076",
    decision: "Reduce inbound throttle · Hub-1",
    expected: "+3% throughput",
    actual: "+3.1% throughput",
    delta: 103,
    category: "Routing",
    owner: "AI Agent",
    ownerInitials: "AI",
    closedAt: "08:30",
    hit: true,
  },
  {
    id: "DEC-4072",
    decision: "Replace forklift assignment · Hub-7",
    expected: "Restore tput",
    actual: "Restored",
    delta: 100,
    category: "Workforce",
    owner: "Maya Patel",
    ownerInitials: "MP",
    closedAt: "08:09",
    hit: true,
  },
  {
    id: "DEC-4068",
    decision: "Cycle-count remediation · Hub-3",
    expected: "−4% variance",
    actual: "+1% variance",
    delta: -25,
    category: "Inventory",
    owner: "James Vega",
    ownerInitials: "JV",
    closedAt: "07:32",
    hit: false,
  },
  {
    id: "DEC-4061",
    decision: "Pre-stage Q3 carrier mix change",
    expected: "Cost −$8K",
    actual: "Cost −$8.4K",
    delta: 105,
    category: "Cost-control",
    owner: "Sara Lin",
    ownerInitials: "SL",
    closedAt: "Yesterday",
    hit: true,
  },
  {
    id: "DEC-4055",
    decision: "Trigger weather-driven backfill",
    expected: "+2% on-time",
    actual: "+1.6% on-time",
    delta: 80,
    category: "Weather",
    owner: "AI Agent",
    ownerInitials: "AI",
    closedAt: "Yesterday",
    hit: true,
  },
];

// Learning loop signals
export const learningSignals = [
  {
    title: "Routing model updated weights",
    detail: "+3.2pp accuracy on rerouting decisions after 142 outcomes ingested",
    when: "2h ago",
    delta: 3.2,
  },
  {
    title: "Confidence calibration tightened",
    detail: "Brier score improved 0.04 — mean confidence now closer to actual accuracy",
    when: "Yesterday",
    delta: 4.0,
  },
  {
    title: "Supplier-failure pattern promoted",
    detail: "P-018 graduated from 'experimental' to 'production' after 14 hits",
    when: "Apr 26",
    delta: 0,
  },
];

export const impactKpis = {
  riskAvoided: { value: 47, delta: 18, helper: "events this month" },
  costSaved: { value: "$1.84M", delta: 24, helper: "estimated 30-day" },
  accuracy: { value: "92", unit: "%", delta: 4, helper: "30-day prediction" },
  speedup: { value: "94", unit: "%", delta: 12, helper: "vs 4.2h baseline" },
};
