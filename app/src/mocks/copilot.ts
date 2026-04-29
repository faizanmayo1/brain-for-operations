import type { RiskLevel } from "@/components/feedback/RiskBadge";

export interface CopilotThread {
  id: string;
  title: string;
  preview: string;
  ts: string;
  pinned?: boolean;
  unread?: boolean;
  level?: RiskLevel;
}

export const threads: CopilotThread[] = [
  {
    id: "T-091",
    title: "What decisions should we take right now?",
    preview: "3 ranked actions · top: reroute SE-2 corridor",
    ts: "09:14",
    pinned: true,
    unread: true,
    level: "critical",
  },
  {
    id: "T-090",
    title: "Why did Hub-7 throughput drop 11%?",
    preview: "Root cause: inbound surge + 2 missing forklifts",
    ts: "08:42",
  },
  {
    id: "T-089",
    title: "Compare Q2 carrier mix scenarios",
    preview: "Scenario B reduces cost 7.4% with same SLA",
    ts: "Yesterday",
  },
  {
    id: "T-088",
    title: "Which suppliers are at risk this week?",
    preview: "4 tier-1 flagged · supplier-A highest",
    ts: "Yesterday",
  },
  {
    id: "T-087",
    title: "Project Q3 SLA performance under storm scenarios",
    preview: "Median 91.4% · 5th-percentile 86.1%",
    ts: "Apr 27",
  },
  {
    id: "T-086",
    title: "Find decisions that didn't meet expected impact",
    preview: "2 of last 30 underperformed (DEC-3941, 3956)",
    ts: "Apr 26",
  },
];

export interface RankedDecision {
  rank: number;
  id: string;
  title: string;
  description: string;
  level: RiskLevel;
  confidence: number;
  expectedImpact: string;
  impactQuant: string;
  timeToExecute: string;
  signals: string[];
  recommended?: boolean;
}

export const rankedDecisions: RankedDecision[] = [
  {
    rank: 1,
    id: "DEC-4081",
    title: "Reroute 142 SE-2 shipments via SE-3 corridor",
    description:
      "Composite risk on SE-2 crossed 76 with rising trajectory. Reroute protects on-time delivery. Historical SE-3 SLA performance under similar load: 92–96%.",
    level: "critical",
    confidence: 87,
    expectedImpact: "+94% SLA save",
    impactQuant: "$182K avoided",
    timeToExecute: "~38 min",
    signals: ["SIG-2086", "SIG-2079", "SIG-2087"],
    recommended: true,
  },
  {
    rank: 2,
    id: "DEC-4080",
    title: "Authorize overtime for Hub-7 evening shift (8h)",
    description:
      "Hub-7 throughput collapsing under inbound surge (score 89). 8 hours of OT for 22 ops staff restores capacity headroom and unblocks downstream SLAs.",
    level: "high",
    confidence: 81,
    expectedImpact: "−47% throughput risk",
    impactQuant: "$74K saved",
    timeToExecute: "~12 min",
    signals: ["SIG-2087", "SIG-2061"],
  },
  {
    rank: 3,
    id: "DEC-4078",
    title: "Switch supplier-A to backup contract (T+24h)",
    description:
      "Tier-1 supplier-A delay propagating to 3 hubs. Backup contract terms favorable; prior switch event (Jan 2026) restored flow within 21h.",
    level: "high",
    confidence: 76,
    expectedImpact: "−$92K exposure",
    impactQuant: "21h restore",
    timeToExecute: "~2.5 hours",
    signals: ["SIG-2079"],
  },
];

export interface EvidenceSignal {
  id: string;
  title: string;
  source: string;
  level: RiskLevel;
  score: number;
  weight: number; // % contribution to recommendation
  freshness: string;
}

export const evidence: EvidenceSignal[] = [
  {
    id: "SIG-2086",
    title: "SLA breach risk on SE-2 corridor",
    source: "Carrier API · OTM",
    level: "high",
    score: 76,
    weight: 38,
    freshness: "8m",
  },
  {
    id: "SIG-2087",
    title: "Hub-7 throughput collapsing under inbound surge",
    source: "WMS · sensor-fleet",
    level: "critical",
    score: 89,
    weight: 31,
    freshness: "3m",
  },
  {
    id: "SIG-2079",
    title: "Tier-1 supplier delay propagating to 3 hubs",
    source: "EDI · ERP",
    level: "high",
    score: 71,
    weight: 18,
    freshness: "12m",
  },
  {
    id: "SIG-2071",
    title: "Storm front predicted to impact MW corridor",
    source: "NOAA · weather-feed",
    level: "medium",
    score: 58,
    weight: 9,
    freshness: "21m",
  },
  {
    id: "SIG-2061",
    title: "Workforce shortfall projected — Hub-9 evening",
    source: "WFM · scheduling",
    level: "low",
    score: 34,
    weight: 4,
    freshness: "52m",
  },
];

export interface AgentRun {
  id: string;
  agent: string;
  status: "complete" | "running" | "queued";
  steps: string[];
  duration: string;
}

export const agentRuns: AgentRun[] = [
  {
    id: "AR-1041",
    agent: "Risk Synthesizer",
    status: "complete",
    duration: "2.4s",
    steps: [
      "Pulled 247 signals from 12 sources",
      "Clustered into 18 themes",
      "Identified 4 decision-critical clusters",
    ],
  },
  {
    id: "AR-1042",
    agent: "Option Generator",
    status: "complete",
    duration: "3.1s",
    steps: [
      "Generated 7 candidate decisions",
      "Filtered by feasibility + cost envelope",
      "Returned top 3 with reasoning",
    ],
  },
  {
    id: "AR-1043",
    agent: "Confidence Scorer",
    status: "complete",
    duration: "1.7s",
    steps: [
      "Cross-checked against 1,840 historical decisions",
      "Adjusted for current context drift",
      "Emitted per-option confidence",
    ],
  },
  {
    id: "AR-1044",
    agent: "Impact Forecaster",
    status: "running",
    duration: "—",
    steps: [
      "Running 1,000-iteration Monte Carlo",
      "812 / 1000 complete",
    ],
  },
];

export interface KpiPoint {
  questions: number;
  avgLatency: number; // seconds
  acceptance: number; // %
  decisions: number;
}

export const copilotKpis = {
  questions: { value: 184, delta: 12, helper: "this week" },
  latency: { value: "3.4", unit: "s", delta: -42, helper: "p95 response" },
  acceptance: { value: "78", unit: "%", delta: 6, helper: "30-day trailing" },
  decisions: { value: 47, delta: 23, helper: "made today" },
};

// Confidence trend (last 30 days)
export const confidenceTrend = {
  labels: Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }),
  series: [
    {
      label: "Confidence",
      color: "#7C5CFF",
      data: [
        62, 64, 63, 66, 68, 67, 69, 70, 72, 71, 73, 74, 73, 76, 78, 77, 79,
        80, 79, 81, 82, 81, 83, 84, 83, 85, 86, 85, 87, 87,
      ],
    },
    {
      label: "Acceptance",
      color: "#5B6CFF",
      data: [
        58, 60, 59, 62, 63, 64, 64, 66, 67, 68, 68, 70, 70, 71, 72, 71, 73,
        74, 75, 76, 76, 77, 77, 78, 77, 78, 78, 79, 78, 78,
      ],
    },
  ],
};

export const suggestedFollowups = [
  "What's the cost envelope if we approve all three?",
  "Show me the historical analogues for option A",
  "Which agents disagreed and why?",
  "What changes if the storm front shifts north?",
];
