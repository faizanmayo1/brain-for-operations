import { Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

interface AiBadgeProps {
  label?: string;
  className?: string;
}

export function AiBadge({ label = "AI", className }: AiBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-1.5 h-5 text-[10.5px] font-semibold tracking-wide uppercase",
        "bg-gradient-to-r from-accent-500/18 to-ai/18 text-ai border border-ai/35",
        className
      )}
    >
      <Sparkles className="h-3 w-3" strokeWidth={2.2} />
      {label}
    </span>
  );
}
