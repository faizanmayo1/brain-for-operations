import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface DeltaChipProps {
  value: number; // already a percentage number; positive or negative
  /** semantic: "positive" means up-is-good (default). For metrics like "time-to-decide" pass "negative" so a drop renders green. */
  semantic?: "positive" | "negative";
  unit?: string; // default "%"
  className?: string;
}

export function DeltaChip({
  value,
  semantic = "positive",
  unit = "%",
  className,
}: DeltaChipProps) {
  const isUp = value >= 0;
  // good = green, bad = red
  const isGood = semantic === "positive" ? isUp : !isUp;
  const Icon = isUp ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-1.5 h-5 text-[11px] font-medium mono",
        isGood
          ? "bg-risk-low/12 text-risk-low border border-risk-low/25"
          : "bg-risk-critical/12 text-risk-critical border border-risk-critical/25",
        className
      )}
    >
      <Icon className="h-3 w-3" strokeWidth={2.4} />
      {Math.abs(value)}
      {unit}
    </span>
  );
}
