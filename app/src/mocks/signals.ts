import type { RiskLevel } from "@/components/feedback/RiskBadge";

export interface Cluster {
  id: string;
  name: string;
  signals: number;
  level: RiskLevel;
  delta: number;
  share: number; // % of total signals
  color: string;
}

export const clusters: Cluster[] = [
  { id: "C-TPUT", name: "Throughput", signals: 56, level: "critical", delta: 14, share: 28, color: "#E5484D" },
  { id: "C-SLA", name: "SLA breach", signals: 38, level: "high", delta: 8, share: 19, color: "#F76B15" },
  { id: "C-SUP", name: "Supplier", signals: 34, level: "high", delta: 4, share: 17, color: "#F76B15" },
  { id: "C-WX", name: "Weather", signals: 24, level: "medium", delta: 6, share: 12, color: "#E5B412" },
  { id: "C-INV", name: "Inventory", signals: 22, level: "medium", delta: -2, share: 11, color: "#E5B412" },
  { id: "C-WF", name: "Workforce", signals: 18, level: "low", delta: 1, share: 9, color: "#3DA94D" },
  { id: "C-COST", name: "Cost", signals: 8, level: "low", delta: 0, share: 4, color: "#5B6CFF" },
];

export interface Source {
  name: string;
  category: string;
  signals: number;
  health: "healthy" | "degraded" | "down";
  latencyMs: number;
}

export const sources: Source[] = [
  { name: "WMS · sensor-fleet", category: "Internal", signals: 64, health: "healthy", latencyMs: 86 },
  { name: "Carrier API · OTM", category: "Internal", signals: 42, health: "healthy", latencyMs: 124 },
  { name: "EDI · ERP", category: "Internal", signals: 28, health: "healthy", latencyMs: 248 },
  { name: "NOAA · weather", category: "External", signals: 18, health: "healthy", latencyMs: 412 },
  { name: "WFM · scheduling", category: "Internal", signals: 16, health: "degraded", latencyMs: 1240 },
  { name: "GPS · driver telemetry", category: "Internal", signals: 14, health: "healthy", latencyMs: 64 },
  { name: "Slack events", category: "External", signals: 12, health: "healthy", latencyMs: 92 },
  { name: "Finance · GL", category: "Internal", signals: 6, health: "healthy", latencyMs: 380 },
];

// Full extended signals list for the table
export interface FullSignal {
  id: string;
  title: string;
  source: string;
  zone: string;
  level: RiskLevel;
  score: number;
  cluster: string;
  age: string;
  unread: boolean;
}

export const fullSignals: FullSignal[] = [
  { id: "SIG-2087", title: "Hub-7 throughput collapsing under inbound surge", source: "WMS · sensor-fleet", zone: "Hub-7 / Phoenix", level: "critical", score: 89, cluster: "Throughput", age: "3m", unread: true },
  { id: "SIG-2086", title: "SLA breach risk on SE-2 corridor — 142 shipments", source: "Carrier API · OTM", zone: "SE-2", level: "high", score: 76, cluster: "SLA breach", age: "8m", unread: true },
  { id: "SIG-2079", title: "Tier-1 supplier delay propagating to 3 hubs", source: "EDI · ERP", zone: "Network", level: "high", score: 71, cluster: "Supplier", age: "12m", unread: true },
  { id: "SIG-2078", title: "Driver telemetry packet loss · MW corridor", source: "GPS · driver telemetry", zone: "Midwest", level: "medium", score: 58, cluster: "SLA breach", age: "16m", unread: false },
  { id: "SIG-2071", title: "Storm front predicted to impact MW corridor by 14:00", source: "NOAA · weather", zone: "Midwest", level: "medium", score: 58, cluster: "Weather", age: "21m", unread: false },
  { id: "SIG-2068", title: "Cycle-count variance flagged in Hub-3 returns", source: "WMS · sensor-fleet", zone: "Hub-3 / Atlanta", level: "medium", score: 52, cluster: "Inventory", age: "34m", unread: false },
  { id: "SIG-2066", title: "Carrier C-714 dropped consecutive pickups", source: "Carrier API · OTM", zone: "SE-2", level: "high", score: 67, cluster: "SLA breach", age: "41m", unread: false },
  { id: "SIG-2061", title: "Workforce shortfall projected for evening shift, Hub-9", source: "WFM · scheduling", zone: "Hub-9 / Dallas", level: "low", score: 34, cluster: "Workforce", age: "52m", unread: false },
  { id: "SIG-2059", title: "Inbound truck dwell-time elevated · Hub-1", source: "WMS · sensor-fleet", zone: "Hub-1 / LA", level: "low", score: 28, cluster: "Throughput", age: "1h 02m", unread: false },
  { id: "SIG-2054", title: "GL anomaly · fuel cost variance > 8%", source: "Finance · GL", zone: "Network", level: "low", score: 32, cluster: "Cost", age: "1h 28m", unread: false },
  { id: "SIG-2048", title: "Slack incident channel · ad-hoc reroute request", source: "Slack events", zone: "Hub-7 / Phoenix", level: "medium", score: 48, cluster: "Workforce", age: "2h 04m", unread: false },
  { id: "SIG-2042", title: "Supplier-B confirmation delay · 14 POs", source: "EDI · ERP", zone: "Network", level: "medium", score: 51, cluster: "Supplier", age: "2h 18m", unread: false },
];

export const signalsKpis = {
  total: { value: 247, delta: 18, helper: "active in last 24h" },
  clustered: { value: 18, delta: 4, helper: "themes detected" },
  decisionCritical: {
    value: 4,
    delta: 1,
    helper: "warrant action now",
    deltaSemantic: "negative" as const,
  },
  noise: { value: "94", unit: "%", delta: 6, helper: "filtered as noise" },
};
