import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { activity } from "@/mocks/commandCenter";
import { cn } from "@/lib/cn";
import { Sparkles } from "lucide-react";

const toneDot: Record<string, string> = {
  info: "bg-info",
  ai: "bg-ai",
  success: "bg-risk-low",
  warn: "bg-risk-high",
};

export function ActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <span className="text-[11px] text-text-tertiary">last 30 minutes</span>
      </CardHeader>
      <CardBody>
        <ul className="space-y-3">
          {activity.map((a) => {
            const isAi = a.actor === "AI Agent" || a.actor === "Copilot";
            return (
              <li key={a.id} className="flex items-start gap-3 text-[12.5px]">
                <span className="mono text-[10.5px] text-text-tertiary tabular-nums w-9 flex-shrink-0 pt-0.5">
                  {a.ts}
                </span>
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0",
                    toneDot[a.tone]
                  )}
                />
                <div className="min-w-0">
                  <span
                    className={cn(
                      "font-medium",
                      isAi ? "text-ai" : "text-text-primary"
                    )}
                  >
                    {isAi && (
                      <Sparkles
                        className="inline h-3 w-3 mr-1 -mt-0.5"
                        strokeWidth={2.4}
                      />
                    )}
                    {a.actor}
                  </span>{" "}
                  <span className="text-text-secondary">{a.action}</span>
                  {a.ref && (
                    <span className="mono text-[11px] text-text-tertiary ml-1">
                      {a.ref}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}
