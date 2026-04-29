import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/ui/button";

interface RightNowStripProps {
  onReview?: () => void;
}

export function RightNowStrip({ onReview }: RightNowStripProps) {
  return (
    <div className="relative rounded-card overflow-hidden border-ai-gradient">
      <div className="relative bg-gradient-to-r from-accent-500/10 via-ai/8 to-transparent p-5 flex items-center gap-5">
        {/* Decorative orbital */}
        <div className="absolute -top-12 -right-8 h-40 w-40 rounded-full bg-gradient-to-br from-accent-500/20 to-ai/10 blur-3xl pointer-events-none" />

        <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-accent-500 to-ai flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(91,108,255,0.5)] flex-shrink-0">
          <Sparkles className="h-5 w-5 text-white" strokeWidth={2.2} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10.5px] uppercase tracking-[0.1em] font-semibold text-ai">
              Copilot · Right now
            </span>
            <span className="h-1 w-1 rounded-full bg-text-tertiary" />
            <span className="text-[10.5px] uppercase tracking-[0.06em] text-text-tertiary mono">
              09:14 · Mon Apr 29
            </span>
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="mono text-[24px] font-semibold text-text-primary leading-tight">
              3 decisions
            </span>
            <span className="text-[15px] text-text-secondary">
              need you in the next
            </span>
            <span className="mono text-[15px] text-text-primary font-semibold">
              2 hours
            </span>
          </div>
          <p className="text-[12.5px] text-text-tertiary mt-1.5 max-w-3xl">
            Top recommendation: reroute SE-2 corridor shipments via SE-3 to
            protect 142 SLAs. Estimated impact prevented:{" "}
            <span className="text-text-secondary">$182K</span>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="md">
            Snooze
          </Button>
          <Button variant="primary" size="md" onClick={onReview}>
            Review now
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
          </Button>
        </div>
      </div>
    </div>
  );
}
