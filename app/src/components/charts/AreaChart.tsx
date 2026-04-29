import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

interface Series {
  label: string;
  color: string;
  data: number[];
}

interface AreaChartProps {
  series: Series[];
  labels?: string[];
  height?: number;
  className?: string;
  yFormat?: (n: number) => string;
}

const PADDING = { top: 12, right: 8, bottom: 24, left: 36 };

export function AreaChart({
  series,
  labels = [],
  height = 220,
  className,
  yFormat = (n) => `${n}`,
}: AreaChartProps) {
  const [width, setWidth] = useState(640);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const allValues = series.flatMap((s) => s.data);
  const min = Math.min(...allValues, 0);
  const max = Math.max(...allValues, 1);
  const niceMax = Math.ceil(max / 10) * 10;
  const length = series[0]?.data.length || 0;

  const chartW = Math.max(0, width - PADDING.left - PADDING.right);
  const chartH = height - PADDING.top - PADDING.bottom;
  const stepX = chartW / Math.max(1, length - 1);

  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    for (let i = 0; i <= 4; i++) ticks.push(min + ((niceMax - min) / 4) * i);
    return ticks;
  }, [min, niceMax]);

  const toX = (i: number) => PADDING.left + i * stepX;
  const toY = (v: number) =>
    PADDING.top + chartH - ((v - min) / (niceMax - min || 1)) * chartH;

  return (
    <div
      ref={(el) => {
        if (el) {
          const w = el.getBoundingClientRect().width;
          if (w && Math.abs(w - width) > 1) setWidth(w);
        }
      }}
      className={cn("w-full relative", className)}
      style={{ height }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        className="overflow-visible"
        onMouseLeave={() => setHoverIndex(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x =
            ((e.clientX - rect.left) / rect.width) * width - PADDING.left;
          const idx = Math.max(
            0,
            Math.min(length - 1, Math.round(x / stepX))
          );
          setHoverIndex(idx);
        }}
      >
        {/* Y gridlines */}
        {yTicks.map((t, i) => (
          <g key={i}>
            <line
              x1={PADDING.left}
              x2={width - PADDING.right}
              y1={toY(t)}
              y2={toY(t)}
              stroke="var(--border-subtle)"
              strokeDasharray="3 4"
              strokeWidth="1"
            />
            <text
              x={PADDING.left - 8}
              y={toY(t)}
              dy="0.32em"
              textAnchor="end"
              fontSize="10"
              fill="var(--text-tertiary)"
              fontFamily="JetBrains Mono, monospace"
            >
              {yFormat(Math.round(t))}
            </text>
          </g>
        ))}

        {/* X labels */}
        {labels.map((lab, i) => {
          if (length > 12 && i % Math.ceil(length / 8) !== 0) return null;
          return (
            <text
              key={i}
              x={toX(i)}
              y={height - 6}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-tertiary)"
              fontFamily="Inter, sans-serif"
            >
              {lab}
            </text>
          );
        })}

        {/* Series */}
        {series.map((s, sIdx) => {
          const points = s.data.map((v, i) => [toX(i), toY(v)] as const);
          const path = points
            .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
            .join(" ");
          const lastY = toY(0) > height - PADDING.bottom ? height - PADDING.bottom : toY(min);
          const area = `${path} L ${toX(length - 1)} ${lastY} L ${toX(0)} ${lastY} Z`;
          const gradId = `area-${sIdx}-${s.label.replace(/\W/g, "")}`;
          return (
            <g key={s.label}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area} fill={`url(#${gradId})`} />
              <path
                d={path}
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {/* Hover guide */}
        {hoverIndex !== null && (
          <>
            <line
              x1={toX(hoverIndex)}
              x2={toX(hoverIndex)}
              y1={PADDING.top}
              y2={height - PADDING.bottom}
              stroke="var(--border-strong)"
              strokeWidth="1"
            />
            {series.map((s) => (
              <circle
                key={s.label}
                cx={toX(hoverIndex)}
                cy={toY(s.data[hoverIndex])}
                r="4"
                fill="var(--bg-surface)"
                stroke={s.color}
                strokeWidth="2"
              />
            ))}
          </>
        )}
      </svg>

      {/* Tooltip */}
      {hoverIndex !== null && labels[hoverIndex] && (
        <div
          className="absolute pointer-events-none rounded-md bg-elevated border border-border-strong shadow-popover px-3 py-2 text-[12px]"
          style={{
            left: `${(toX(hoverIndex) / width) * 100}%`,
            top: 8,
            transform: "translateX(-50%)",
          }}
        >
          <div className="text-[10.5px] uppercase tracking-wide text-text-tertiary mb-1">
            {labels[hoverIndex]}
          </div>
          {series.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 leading-5"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: s.color }}
              />
              <span className="text-text-secondary">{s.label}</span>
              <span className="ml-auto mono text-text-primary">
                {yFormat(s.data[hoverIndex])}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
