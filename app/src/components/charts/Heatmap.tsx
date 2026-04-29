import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HeatmapCell {
  row: string;
  col: string;
  value: number; // 0..100
  changed?: boolean;
}

interface HeatmapProps {
  rows: string[];
  cols: string[];
  cells: HeatmapCell[];
  className?: string;
  cellSize?: number;
  gap?: number;
}

function colorFor(value: number) {
  // Diverging from neutral → low → medium → high → critical
  if (value < 20) return "rgba(61, 169, 77, 0.18)"; // calm
  if (value < 40) return "rgba(61, 169, 77, 0.42)";
  if (value < 60) return "rgba(229, 180, 18, 0.55)";
  if (value < 75) return "rgba(247, 107, 21, 0.70)";
  if (value < 88) return "rgba(247, 107, 21, 0.95)";
  return "rgba(229, 72, 77, 0.95)";
}

export function Heatmap({
  rows,
  cols,
  cells,
  className,
  cellSize = 22,
  gap = 3,
}: HeatmapProps) {
  const [hover, setHover] = useState<HeatmapCell | null>(null);
  const lookup = new Map<string, HeatmapCell>();
  cells.forEach((c) => lookup.set(`${c.row}|${c.col}`, c));

  return (
    <div className={cn("relative", className)}>
      <div className="flex">
        {/* Row labels */}
        <div
          className="flex flex-col"
          style={{ gap, paddingTop: cellSize + gap + 4 }}
        >
          {rows.map((r) => (
            <div
              key={r}
              className="text-[10.5px] text-text-tertiary uppercase tracking-wide font-medium pr-2 text-right"
              style={{
                height: cellSize,
                lineHeight: `${cellSize}px`,
                width: 64,
              }}
            >
              {r}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1">
          {/* Col labels */}
          <div
            className="flex"
            style={{ gap, marginBottom: 4, height: cellSize }}
          >
            {cols.map((c) => (
              <div
                key={c}
                className="text-[10px] text-text-tertiary uppercase tracking-wide font-medium text-center"
                style={{
                  width: cellSize,
                  height: cellSize,
                  lineHeight: `${cellSize}px`,
                }}
              >
                {c}
              </div>
            ))}
          </div>

          <div className="flex flex-col" style={{ gap }}>
            {rows.map((r) => (
              <div key={r} className="flex" style={{ gap }}>
                {cols.map((c) => {
                  const cell = lookup.get(`${r}|${c}`);
                  if (!cell) {
                    return (
                      <div
                        key={c}
                        style={{
                          width: cellSize,
                          height: cellSize,
                          background: "var(--bg-surface-2)",
                          borderRadius: 4,
                        }}
                      />
                    );
                  }
                  return (
                    <button
                      key={c}
                      onMouseEnter={() => setHover(cell)}
                      onMouseLeave={() => setHover(null)}
                      className={cn(
                        "relative rounded-[4px] transition-all duration-150 hover:ring-1 hover:ring-text-primary/60",
                        cell.changed && "ring-1 ring-accent-500/70"
                      )}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        background: colorFor(cell.value),
                      }}
                    >
                      {cell.changed && (
                        <span className="absolute inset-0 rounded-[4px] animate-pulse-ring" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {hover && (
        <div className="absolute right-0 top-0 rounded-md bg-elevated border border-border-strong shadow-popover px-3 py-2 text-[12px] pointer-events-none">
          <div className="text-[10.5px] uppercase tracking-wide text-text-tertiary mb-1">
            {hover.row} · {hover.col}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="mono text-[18px] font-semibold text-text-primary">
              {hover.value}
            </span>
            <span className="text-text-tertiary text-[11px]">risk score</span>
          </div>
        </div>
      )}
    </div>
  );
}
