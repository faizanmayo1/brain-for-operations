import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { ArrowRight } from "lucide-react";
import { pipelineCards, pipelineColumns } from "@/mocks/commandCenter";
import { cn } from "@/lib/cn";
import { Sparkles } from "lucide-react";

const toneStyles: Record<string, string> = {
  neutral: "text-text-tertiary",
  ai: "text-ai",
  accent: "text-accent-200",
  warning: "text-risk-high",
  success: "text-risk-low",
};

const dotStyles: Record<string, string> = {
  neutral: "bg-text-tertiary/40",
  ai: "bg-ai",
  accent: "bg-accent-500",
  warning: "bg-risk-high",
  success: "bg-risk-low",
};

const levelBar: Record<string, string> = {
  critical: "bg-risk-critical",
  high: "bg-risk-high",
  medium: "bg-risk-medium",
  low: "bg-risk-low",
};

export function PipelineKanban() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Decision pipeline · last 24h</CardTitle>
        <Button variant="ghost" size="sm">
          Open pipeline view
          <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </Button>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-6 gap-3">
          {pipelineColumns.map((col) => {
            const cards = pipelineCards.filter((c) => c.column === col.key);
            return (
              <div key={col.key} className="flex flex-col gap-2 min-w-0">
                <div className="flex items-center gap-2 px-1">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      dotStyles[col.tone]
                    )}
                  />
                  <span className="text-[10.5px] uppercase tracking-wide font-semibold text-text-secondary truncate">
                    {col.label}
                  </span>
                  <span className="ml-auto mono text-[10.5px] text-text-tertiary">
                    {col.count}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {cards.length === 0 ? (
                    <div className="rounded-md border border-dashed border-border-subtle h-16 flex items-center justify-center text-[10.5px] text-text-tertiary">
                      empty
                    </div>
                  ) : (
                    cards.map((c) => (
                      <div
                        key={c.id}
                        className="group relative rounded-md bg-canvas/40 border border-border-subtle hover:border-accent-500/40 transition-colors p-2.5 cursor-pointer overflow-hidden"
                      >
                        <span
                          className={cn(
                            "absolute left-0 top-2 bottom-2 w-[2px] rounded-r",
                            levelBar[c.level]
                          )}
                        />
                        <div className="pl-2 flex items-center gap-1 mb-1">
                          <span className="mono text-[10px] text-text-tertiary">
                            {c.id}
                          </span>
                          {c.owner === "AI Agent" || c.owner === "Copilot" ? (
                            <span className="ml-auto inline-flex items-center gap-0.5 text-[9.5px] text-ai">
                              <Sparkles
                                className="h-2.5 w-2.5"
                                strokeWidth={2.4}
                              />
                              AI
                            </span>
                          ) : (
                            <span className="ml-auto h-4 w-4 rounded-full bg-gradient-to-br from-accent-500 to-ai flex items-center justify-center text-[8px] font-semibold text-white">
                              {c.ownerInitials}
                            </span>
                          )}
                        </div>
                        <div className="pl-2 text-[12px] font-medium text-text-primary leading-4 line-clamp-2">
                          {c.title}
                        </div>
                        {c.eta && (
                          <div className="pl-2 mt-1.5 mono text-[10px] text-text-tertiary">
                            {c.eta}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
