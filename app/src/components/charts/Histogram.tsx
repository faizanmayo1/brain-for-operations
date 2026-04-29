import { cn } from "@/lib/cn";

interface Props {
  bins: number[];
  color?: string;
  height?: number;
  className?: string;
  highlightFrom?: number; // index ratio 0-1
  highlightTo?: number;
}

export function Histogram({
  bins,
  color = "var(--accent-500)",
  height = 64,
  className,
  highlightFrom,
  highlightTo,
}: Props) {
  const max = Math.max(...bins, 1);
  const total = bins.length;

  return (
    <div
      className={cn("flex items-end gap-[2px] w-full", className)}
      style={{ height }}
    >
      {bins.map((v, i) => {
        const ratio = i / (total - 1);
        const inHighlight =
          highlightFrom !== undefined &&
          highlightTo !== undefined &&
          ratio >= highlightFrom &&
          ratio <= highlightTo;
        return (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all"
            style={{
              height: `${(v / max) * 100}%`,
              background: color,
              opacity: inHighlight ? 1 : 0.45,
            }}
          />
        );
      })}
    </div>
  );
}
