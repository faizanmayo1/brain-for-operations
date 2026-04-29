import * as React from "react";
import { cn } from "@/lib/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "accent" | "ai" | "low" | "medium" | "high" | "critical";
  size?: "sm" | "md";
}

const toneClass: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral:
    "bg-surface-2 text-text-secondary border border-border-strong/60",
  accent:
    "bg-accent-500/12 text-accent-200 border border-accent-500/25",
  ai: "bg-ai/12 text-ai border border-ai/30",
  low: "bg-risk-low/12 text-risk-low border border-risk-low/25",
  medium: "bg-risk-medium/15 text-risk-medium border border-risk-medium/30",
  high: "bg-risk-high/15 text-risk-high border border-risk-high/30",
  critical:
    "bg-risk-critical/15 text-risk-critical border border-risk-critical/30",
};

export function Badge({
  className,
  tone = "neutral",
  size = "sm",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        size === "sm" ? "px-2 h-5 text-[11px]" : "px-2.5 h-6 text-[12px]",
        toneClass[tone],
        className
      )}
      {...props}
    />
  );
}
