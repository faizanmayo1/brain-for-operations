import { Card } from "@/ui/card";
import { Overline } from "@/components/primitives/Overline";
import { LiveIndicator } from "@/components/feedback/LiveIndicator";
import { useTicker, seededRandom } from "@/hooks/useTicker";
import { cn } from "@/lib/cn";

export function CompositeRiskMeter() {
  const tick = useTicker(3500);
  // Center around 86, oscillate ±3
  const drift = Math.round((seededRandom(tick) - 0.5) * 6);
  const value = Math.max(72, Math.min(98, 86 + drift));
  const percent = value / 100;
  const c = 2 * Math.PI * 56;

  const color =
    value >= 88 ? "var(--risk-critical)" : value >= 70 ? "var(--risk-high)" : "var(--risk-medium)";

  return (
    <Card className="p-5 bg-grain overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <Overline>Composite risk · network</Overline>
        <LiveIndicator />
      </div>

      <div className="flex items-center gap-5">
        <div className="relative h-[140px] w-[140px] flex-shrink-0">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <defs>
              <linearGradient id="meter-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--accent-500)" />
                <stop offset="100%" stopColor={color} />
              </linearGradient>
            </defs>
            <circle
              cx="70"
              cy="70"
              r="56"
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="10"
            />
            <circle
              cx="70"
              cy="70"
              r="56"
              fill="none"
              stroke="url(#meter-grad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c - c * percent}
              transform="rotate(-90 70 70)"
              style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.2,0,0,1)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              key={value}
              className="mono text-[34px] font-semibold text-text-primary tabular-nums leading-none animate-fade-rise"
            >
              {value}
            </span>
            <span className="text-[10px] uppercase tracking-wide text-text-tertiary mt-1">
              of 100
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] text-text-secondary leading-5 mb-3">
            Network-wide composite is{" "}
            <span
              className={cn(
                "font-semibold",
                value >= 88
                  ? "text-risk-critical"
                  : value >= 70
                    ? "text-risk-high"
                    : "text-risk-medium"
              )}
            >
              {value >= 88 ? "critical" : value >= 70 ? "elevated" : "moderate"}
            </span>{" "}
            — driven primarily by Hub-7 throughput and SE-2 SLA pressure.
          </div>

          <div className="space-y-2">
            <Bar label="Throughput" value={62} color="var(--risk-critical)" />
            <Bar label="SLA breach" value={48} color="var(--risk-high)" />
            <Bar label="Supply" value={31} color="var(--risk-medium)" />
            <Bar label="Workforce" value={22} color="var(--ai-glow)" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function Bar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="grid grid-cols-[80px_1fr_36px] items-center gap-2">
      <span className="text-[11px] text-text-tertiary uppercase tracking-wide">
        {label}
      </span>
      <div className="h-1.5 rounded-full bg-border-subtle/60 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className="mono text-[11px] text-text-secondary text-right">
        {value}
      </span>
    </div>
  );
}
