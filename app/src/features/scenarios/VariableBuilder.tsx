import { useState } from "react";
import { ChevronDown, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Overline } from "@/components/primitives/Overline";
import { variables as initialVariables, type VariableSpec } from "@/mocks/scenarios";
import { cn } from "@/lib/cn";

export function VariableBuilder() {
  const [vars, setVars] = useState<VariableSpec[]>(initialVariables);

  const update = (key: string, value: number | boolean | string) => {
    setVars((vs) =>
      vs.map((v) => (v.key === key ? { ...v, value } : v))
    );
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Scenario builder</CardTitle>
          <span className="mono text-[10.5px] text-text-tertiary bg-surface-2 border border-border-subtle rounded-full px-1.5 h-5 inline-flex items-center">
            draft
          </span>
        </div>
        <Button variant="ghost" size="icon" aria-label="Reset">
          <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
        </Button>
      </CardHeader>

      <CardBody className="flex-1 space-y-5">
        {vars.map((v) => (
          <VariableControl key={v.key} v={v} onChange={update} />
        ))}
      </CardBody>

      <div className="px-5 py-4 border-t border-border-subtle bg-surface-2/30 space-y-2.5">
        <Button variant="ai" size="lg" className="w-full justify-center gap-2">
          <Wand2 className="h-3.5 w-3.5" strokeWidth={2.2} />
          Run simulation
          <span className="mono text-[10.5px] text-text-tertiary">~3.4s</span>
        </Button>
        <button className="w-full text-left flex items-center justify-between text-[11.5px] text-text-tertiary hover:text-text-secondary px-1">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-ai" strokeWidth={2.2} />
            Suggest variables from current signals
          </span>
          <ChevronDown className="h-3 w-3" strokeWidth={2} />
        </button>
      </div>
    </Card>
  );
}

function VariableControl({
  v,
  onChange,
}: {
  v: VariableSpec;
  onChange: (key: string, value: number | boolean | string) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <Overline>{v.label}</Overline>
        {v.type === "slider" && typeof v.value === "number" && (
          <span className="mono text-[13px] font-semibold text-text-primary tabular-nums">
            {v.value}
            {v.unit ?? ""}
          </span>
        )}
        {v.type === "select" && (
          <span className="mono text-[12px] text-text-secondary">
            {v.options?.find((o) => o.value === v.value)?.label}
          </span>
        )}
        {v.type === "toggle" && (
          <span
            className={cn(
              "mono text-[11px] uppercase tracking-wide font-semibold",
              v.value ? "text-risk-low" : "text-text-tertiary"
            )}
          >
            {v.value ? "ON" : "OFF"}
          </span>
        )}
      </div>

      {v.type === "slider" && typeof v.value === "number" && (
        <SliderControl
          min={v.min ?? 0}
          max={v.max ?? 100}
          step={v.step ?? 1}
          value={v.value}
          onChange={(val) => onChange(v.key, val)}
        />
      )}

      {v.type === "toggle" && typeof v.value === "boolean" && (
        <ToggleControl
          value={v.value}
          onChange={(val) => onChange(v.key, val)}
        />
      )}

      {v.type === "select" && typeof v.value === "string" && (
        <SelectControl
          options={v.options ?? []}
          value={v.value}
          onChange={(val) => onChange(v.key, val)}
        />
      )}

      {v.helper && (
        <div className="text-[10.5px] text-text-tertiary mt-1.5 leading-4">
          {v.helper}
        </div>
      )}
    </div>
  );
}

function SliderControl({
  min,
  max,
  step,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative h-6">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full bg-border-subtle/60 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-500 to-ai"
          style={{ width: `${pct}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-text-primary shadow-[0_2px_6px_rgba(0,0,0,0.4)] pointer-events-none ring-2 ring-bg-canvas"
        style={{ left: `calc(${pct}% - 7px)` }}
      />
    </div>
  );
}

function ToggleControl({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        "relative inline-flex h-6 w-11 rounded-full transition-colors",
        value ? "bg-gradient-to-r from-accent-500 to-ai" : "bg-surface-2 border border-border-strong"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform",
          value ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

function SelectControl({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-1 p-1 rounded-md bg-surface-2 border border-border-subtle">
      {options.slice(0, 4).map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "h-7 rounded text-[11.5px] font-medium transition-colors",
            value === o.value
              ? "bg-canvas text-text-primary border border-border-strong shadow-sm"
              : "text-text-tertiary hover:text-text-secondary"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
