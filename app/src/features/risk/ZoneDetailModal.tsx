import { ArrowRight, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { RiskBadge } from "@/components/feedback/RiskBadge";
import { LiveIndicator } from "@/components/feedback/LiveIndicator";
import { Sparkline } from "@/components/charts/Sparkline";
import { Overline } from "@/components/primitives/Overline";
import type { Zone } from "@/mocks/risk";
import { cn } from "@/lib/cn";

interface Props {
  zone: Zone | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const levelColors: Record<string, string> = {
  critical: "var(--risk-critical)",
  high: "var(--risk-high)",
  medium: "var(--risk-medium)",
  low: "var(--risk-low)",
};

export function ZoneDetailModal({ zone, open, onOpenChange }: Props) {
  if (!zone) return null;

  const layers = [
    { label: "Immediate", value: zone.immediate, color: "var(--risk-critical)" },
    { label: "Emerging", value: zone.emerging, color: "var(--risk-high)" },
    { label: "Hidden", value: zone.hidden, color: "var(--ai-glow)" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="px-6 pt-6 pb-5 border-b border-border-subtle">
          <div className="flex items-center gap-2 mb-3">
            <RiskBadge level={zone.level} score={zone.composite} />
            <span className="mono text-[10.5px] text-text-tertiary">
              {zone.id}
            </span>
            <span className="h-1 w-1 rounded-full bg-text-tertiary" />
            <LiveIndicator />
          </div>
          <DialogTitle>{zone.name}</DialogTitle>
          <DialogDescription className="mt-2">
            {zone.region} · {zone.signals} active signals · owned by{" "}
            <span className="text-text-primary">{zone.owner}</span>
          </DialogDescription>
        </div>

        <div className="px-6 py-5">
          <div className="flex items-center gap-6 mb-5">
            <div>
              <Overline className="mb-1">Composite</Overline>
              <div className="flex items-baseline gap-2">
                <span className="mono text-[40px] font-semibold text-text-primary tabular-nums leading-none">
                  {zone.composite}
                </span>
                <span
                  className={cn(
                    "mono text-[12.5px] font-medium",
                    zone.delta24h > 0
                      ? "text-risk-high"
                      : zone.delta24h < 0
                        ? "text-risk-low"
                        : "text-text-tertiary"
                  )}
                >
                  {zone.delta24h > 0 ? "▲" : zone.delta24h < 0 ? "▼" : "—"}
                  {Math.abs(zone.delta24h)} 24h
                </span>
              </div>
            </div>
            <div className="h-12 w-px bg-border-subtle" />
            <div className="flex-1">
              <Overline className="mb-2">24-hour trajectory</Overline>
              <Sparkline
                data={zone.trend}
                width={400}
                height={48}
                color={levelColors[zone.level]}
              />
            </div>
          </div>

          {/* Three-layer breakdown */}
          <Overline className="mb-2">Risk layer composition</Overline>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {layers.map((layer) => (
              <div
                key={layer.label}
                className="rounded-md border border-border-subtle bg-canvas/40 p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10.5px] uppercase tracking-wide font-semibold text-text-tertiary">
                    {layer.label}
                  </span>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: layer.color }}
                  />
                </div>
                <div className="mono text-[20px] font-semibold text-text-primary mb-2">
                  {layer.value}
                </div>
                <div className="h-1 rounded-full bg-border-subtle/60 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${layer.value}%`,
                      background: layer.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recommended next */}
          <div className="rounded-md border-ai-gradient bg-gradient-to-r from-ai/8 to-accent-500/5 p-4">
            <div className="flex items-start gap-3">
              <span className="h-7 w-7 rounded-md bg-gradient-to-br from-accent-500 to-ai flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />
              </span>
              <div className="flex-1">
                <div className="text-[12.5px] font-semibold text-text-primary">
                  Copilot recommends
                </div>
                <div className="text-[12.5px] text-text-secondary mt-0.5 leading-5">
                  Reroute 142 SE-2 shipments via SE-3 corridor. Confidence 87%.
                  Expected SLA save: 94%.
                </div>
              </div>
              <Button variant="primary" size="sm" className="gap-1.5">
                Open in Copilot
                <ArrowRight className="h-3 w-3" strokeWidth={2.2} />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-border-subtle bg-surface-2/40">
          <div className="text-[11px] text-text-tertiary">
            Last evaluated 47 seconds ago · model v4.2.1
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button variant="secondary" size="md">
              View signals
            </Button>
            <Button variant="primary" size="md">
              Run scenario
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
