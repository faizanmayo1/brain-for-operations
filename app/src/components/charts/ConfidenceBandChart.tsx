import { useState } from "react";
import { cn } from "@/lib/cn";

export interface BandSeries {
  key: string;
  label: string;
  color: string;
  expected: number[];
  low?: number[];
  high?: number[];
  dim?: boolean;
}

interface Props {
  series: BandSeries[];
  labels: string[];
  height?: number;
  className?: string;
  yMin?: number;
  yMax?: number;
  yFormat?: (n: number) => string;
}

const PADDING = { top: 12, right: 8, bottom: 24, left: 36 };

export function ConfidenceBandChart({
  series,
  labels,
  height = 260,
  className,
  yMin: yMinIn,
  yMax: yMaxIn,
  yFormat = (n) => `${n}`,
}: Props) {
  const [width, setWidth] = useState(640);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const allValues = series.flatMap((s) => [
    ...s.expected,
    ...(s.low ?? []),
    ...(s.high ?? []),
  ]);
  const min = yMinIn ?? Math.floor(Math.min(...allValues) / 5) * 5;
  const max = yMaxIn ?? Math.ceil(Math.max(...allValues) / 5) * 5;
  const length = labels.length;

  const chartW = Math.max(0, width - PADDING.left - PADDING.right);
  const chartH = height - PADDING.top - PADDING.bottom;
  const stepX = chartW / Math.max(1, length - 1);

  const yTicks: number[] = [];
  for (let i = 0; i <= 4; i++) yTicks.push(min + ((max - min) / 4) * i);

  const toX = (i: number) => PADDING.left + i * stepX;
  const toY = (v: number) =>
    PADDING.top + chartH - ((v - min) / (max - min || 1)) * chartH;

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

        {series.map((s) => {
          if (s.dim) {
            const path = s.expected
              .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
              .join(" ");
            return (
              <path
                key={s.key}
                d={path}
                fill="none"
                stroke={s.color}
                strokeOpacity="0.35"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                strokeLinecap="round"
              />
            );
          }
          // Confidence band as filled polygon
          const bandTop = (s.high ?? s.expected)
            .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
            .join(" ");
          const bandBot = (s.low ?? s.expected)
            .slice()
            .reverse()
            .map((v, i, arr) => {
              const idx = (s.low ?? s.expected).length - 1 - i;
              return `L ${toX(idx)} ${toY(v)}`;
            })
            .join(" ");
          const path = s.expected
            .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
            .join(" ");
          return (
            <g key={s.key}>
              {(s.low || s.high) && (
                <path
                  d={`${bandTop} ${bandBot} Z`}
                  fill={s.color}
                  fillOpacity="0.12"
                />
              )}
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
            {series
              .filter((s) => !s.dim)
              .map((s) => (
                <circle
                  key={s.key}
                  cx={toX(hoverIndex)}
                  cy={toY(s.expected[hoverIndex])}
                  r="4"
                  fill="var(--bg-surface)"
                  stroke={s.color}
                  strokeWidth="2"
                />
              ))}
          </>
        )}
      </svg>

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
          {series
            .filter((s) => !s.dim)
            .map((s) => (
              <div
                key={s.key}
                className="flex items-center gap-2 leading-5"
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: s.color }}
                />
                <span className="text-text-secondary">{s.label}</span>
                <span className="ml-auto mono text-text-primary">
                  {yFormat(s.expected[hoverIndex])}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
