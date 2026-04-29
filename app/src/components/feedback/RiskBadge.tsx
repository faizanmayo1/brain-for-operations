import { Badge } from "@/ui/badge";
import { cn } from "@/lib/cn";

export type RiskLevel = "critical" | "high" | "medium" | "low";

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  className?: string;
}

const labelMap: Record<RiskLevel, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function RiskBadge({ level, score, className }: RiskBadgeProps) {
  return (
    <Badge tone={level} className={cn("gap-1.5", className)}>
      <span className="relative inline-flex h-1.5 w-1.5">
        <span
          className={cn(
            "rounded-full inline-block h-1.5 w-1.5",
            level === "critical" && "bg-risk-critical",
            level === "high" && "bg-risk-high",
            level === "medium" && "bg-risk-medium",
            level === "low" && "bg-risk-low"
          )}
        />
        {level === "critical" && (
          <span className="absolute inset-0 rounded-full animate-ping bg-risk-critical opacity-60" />
        )}
      </span>
      <span className="font-medium">{labelMap[level]}</span>
      {score !== undefined && (
        <span className="mono text-[11px] opacity-80">{score}</span>
      )}
    </Badge>
  );
}
