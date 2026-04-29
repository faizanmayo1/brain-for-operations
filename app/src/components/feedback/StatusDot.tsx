import { cn } from "@/lib/cn";

type RiskLevel = "critical" | "high" | "medium" | "low" | "info" | "neutral";

interface StatusDotProps {
  level: RiskLevel;
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorMap: Record<RiskLevel, string> = {
  critical: "bg-risk-critical",
  high: "bg-risk-high",
  medium: "bg-risk-medium",
  low: "bg-risk-low",
  info: "bg-info",
  neutral: "bg-text-tertiary",
};

const sizeMap = { sm: "h-1.5 w-1.5", md: "h-2 w-2", lg: "h-2.5 w-2.5" };

export function StatusDot({
  level,
  pulse,
  size = "md",
  className,
}: StatusDotProps) {
  return (
    <span className={cn("relative inline-flex", className)}>
      <span
        className={cn(
          "rounded-full inline-block",
          sizeMap[size],
          colorMap[level]
        )}
      />
      {pulse && (
        <span
          className={cn(
            "absolute inset-0 rounded-full animate-ping opacity-60",
            colorMap[level]
          )}
        />
      )}
    </span>
  );
}
