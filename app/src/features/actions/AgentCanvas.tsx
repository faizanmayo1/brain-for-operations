import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { LiveIndicator } from "@/components/feedback/LiveIndicator";
import { agentGraph } from "@/mocks/actions";
import { cn } from "@/lib/cn";
import { Check, Loader2 } from "lucide-react";

export function AgentCanvas() {
  const { nodes, edges } = agentGraph;
  const W = 720;
  const H = 320;

  const toX = (x: number) => (x / 100) * W;
  const toY = (y: number) => (y / 100) * H;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Agent orchestration · ACT-9217</CardTitle>
          <LiveIndicator />
        </div>
        <div className="flex items-center gap-2">
          <span className="mono text-[11px] text-text-tertiary">
            5 agents · {nodes.filter((n) => n.status === "complete").length}{" "}
            done · {nodes.filter((n) => n.status === "running").length} running
          </span>
          <Button variant="ghost" size="sm">
            Pause
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="relative rounded-md border border-border-subtle bg-canvas/40 overflow-hidden p-3">
          {/* Decorative ambient glow */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-48 w-[480px] rounded-full bg-gradient-to-b from-accent-500/15 to-transparent blur-3xl pointer-events-none" />
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            height={H}
            className="relative"
          >
            <defs>
              <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent-500)" stopOpacity="0.15" />
                <stop offset="50%" stopColor="var(--accent-500)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--ai-glow)" stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(91,108,255,0.35)" />
                <stop offset="100%" stopColor="rgba(91,108,255,0)" />
              </radialGradient>
            </defs>

            {/* Edges */}
            {edges.map((e, i) => {
              const from = nodes.find((n) => n.id === e.from)!;
              const to = nodes.find((n) => n.id === e.to)!;
              const x1 = toX(from.x);
              const y1 = toY(from.y);
              const x2 = toX(to.x);
              const y2 = toY(to.y);
              const isActive =
                from.status === "complete" && to.status !== "queued";
              return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={isActive ? "url(#edge-grad)" : "var(--border-strong)"}
                    strokeWidth={isActive ? "2" : "1"}
                    strokeDasharray={isActive ? "0" : "4 4"}
                  />
                  {isActive && (
                    <circle r="3" fill="var(--accent-500)">
                      <animateMotion
                        dur="2.4s"
                        repeatCount="indefinite"
                        path={`M${x1} ${y1} L${x2} ${y2}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((n) => {
              const x = toX(n.x);
              const y = toY(n.y);
              const isOrch = n.id === "orchestrator";
              return (
                <g key={n.id} transform={`translate(${x},${y})`}>
                  {n.status === "running" && (
                    <circle r="36" fill="url(#node-glow)" />
                  )}
                  <circle
                    r={isOrch ? 28 : 22}
                    fill="var(--bg-elevated)"
                    stroke={
                      n.status === "complete"
                        ? "var(--risk-low)"
                        : n.status === "running"
                          ? "var(--accent-500)"
                          : n.status === "error"
                            ? "var(--risk-critical)"
                            : "var(--border-strong)"
                    }
                    strokeWidth="2"
                  />
                  {n.status === "running" && (
                    <circle
                      r={isOrch ? 28 : 22}
                      fill="none"
                      stroke="var(--accent-500)"
                      strokeWidth="2"
                      opacity="0.4"
                      className="animate-ping"
                    />
                  )}
                  {/* Status dot */}
                  <circle
                    cx={isOrch ? 18 : 14}
                    cy={isOrch ? -18 : -14}
                    r="5"
                    fill={
                      n.status === "complete"
                        ? "var(--risk-low)"
                        : n.status === "running"
                          ? "var(--accent-500)"
                          : "var(--text-tertiary)"
                    }
                    stroke="var(--bg-canvas)"
                    strokeWidth="2"
                  />
                  {/* Label below */}
                  <text
                    y={(isOrch ? 28 : 22) + 18}
                    textAnchor="middle"
                    fontSize="11.5"
                    fontWeight="600"
                    fill="var(--text-primary)"
                    fontFamily="Inter, sans-serif"
                  >
                    {n.name}
                  </text>
                  <text
                    y={(isOrch ? 28 : 22) + 32}
                    textAnchor="middle"
                    fontSize="10"
                    fill="var(--text-tertiary)"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {n.duration}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {nodes
            .filter((n) => n.id !== "orchestrator")
            .slice(0, 3)
            .map((n) => (
              <div
                key={n.id}
                className="rounded-md border border-border-subtle bg-canvas/40 p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      "h-5 w-5 rounded-full inline-flex items-center justify-center",
                      n.status === "complete" &&
                        "bg-risk-low/15 text-risk-low border border-risk-low/40",
                      n.status === "running" &&
                        "bg-accent-500/15 text-accent-200 border border-accent-500/40",
                      n.status === "queued" &&
                        "bg-surface-2 text-text-tertiary border border-border-strong"
                    )}
                  >
                    {n.status === "complete" ? (
                      <Check className="h-3 w-3" strokeWidth={2.6} />
                    ) : n.status === "running" ? (
                      <Loader2
                        className="h-3 w-3 animate-spin"
                        strokeWidth={2.4}
                      />
                    ) : (
                      <span className="h-1 w-1 rounded-full bg-text-tertiary" />
                    )}
                  </span>
                  <span className="text-[12.5px] font-semibold text-text-primary">
                    {n.name}
                  </span>
                </div>
                <div className="text-[11.5px] text-text-secondary leading-4">
                  {n.role}
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </Card>
  );
}
