import { ArrowRight, Sparkles } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { AiBadge } from "@/components/feedback/AiBadge";
import { hiddenPatterns } from "@/mocks/risk";

export function HiddenPatternsCard() {
  return (
    <Card className="border-ai-gradient">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AiBadge label="Pattern detector" />
          <CardTitle>Hidden risk patterns</CardTitle>
        </div>
        <Button variant="ghost" size="sm">
          See all <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </Button>
      </CardHeader>

      <CardBody className="space-y-2.5">
        {hiddenPatterns.map((p) => (
          <article
            key={p.id}
            className="group rounded-md p-3 bg-canvas/50 border border-border-subtle hover:border-ai/40 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-2.5">
              <span className="mono text-[10px] font-semibold text-ai bg-ai/10 border border-ai/30 rounded h-5 px-1.5 inline-flex items-center flex-shrink-0">
                {p.id}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-semibold text-text-primary leading-5">
                  {p.title}
                </h3>
                <p className="text-[12px] text-text-secondary leading-5 mt-1">
                  {p.description}
                </p>
                <div className="mt-2 flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-wider text-text-tertiary">
                    <Sparkles className="h-2.5 w-2.5 text-ai" strokeWidth={2.4} />
                    detected {p.detected}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {p.zones.map((z) => (
                      <span
                        key={z}
                        className="text-[10.5px] mono px-1.5 h-5 rounded-full bg-surface-2 text-text-secondary border border-border-subtle inline-flex items-center"
                      >
                        {z}
                      </span>
                    ))}
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1.5 text-[10.5px] text-text-tertiary">
                    <div className="h-1 w-12 rounded-full bg-border-subtle/60 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-500 to-ai"
                        style={{ width: `${p.confidence}%` }}
                      />
                    </div>
                    <span className="mono">{p.confidence}%</span>
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </CardBody>
    </Card>
  );
}
