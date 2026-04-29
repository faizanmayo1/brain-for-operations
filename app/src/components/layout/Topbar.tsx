import {
  Bell,
  ChevronRight,
  HelpCircle,
  RotateCw,
  Search,
} from "lucide-react";
import { Button } from "@/ui/button";
import { useNav, type RouteKey } from "@/lib/nav";

const labels: Record<RouteKey, string> = {
  "command-center": "Command Center",
  signals: "Signals",
  risk: "Risk Cockpit",
  copilot: "Decision Copilot",
  scenarios: "Scenarios",
  actions: "Actions",
  impact: "Impact & Learning",
  integrations: "Integrations",
  governance: "Governance",
  settings: "Settings",
};

export function Topbar() {
  const { route } = useNav();
  return (
    <header className="h-14 flex items-center px-6 gap-3 border-b border-border-subtle bg-surface/80 backdrop-blur-xl sticky top-0 z-30">
      <div className="flex items-center gap-1.5 text-[12.5px]">
        <span className="text-text-tertiary">Acme Logistics</span>
        <ChevronRight
          className="h-3 w-3 text-text-tertiary/60"
          strokeWidth={2}
        />
        <span className="text-text-secondary">Operations</span>
        <ChevronRight
          className="h-3 w-3 text-text-tertiary/60"
          strokeWidth={2}
        />
        <span className="text-text-primary font-medium">{labels[route]}</span>
      </div>

      <div className="flex-1 flex justify-center">
        <button className="group relative w-[440px] h-9 flex items-center gap-2 px-3 rounded-[8px] bg-canvas border border-border-subtle hover:border-border-strong transition-colors">
          <Search
            className="h-3.5 w-3.5 text-text-tertiary"
            strokeWidth={2}
          />
          <span className="flex-1 text-left text-[12.5px] text-text-tertiary">
            Search signals, decisions, zones — or ask Copilot
          </span>
          <kbd className="mono text-[10px] text-text-tertiary bg-surface-2 border border-border-subtle rounded px-1.5 py-px">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <Button variant="ghost" size="sm" className="gap-1.5">
          <RotateCw className="h-3.5 w-3.5" strokeWidth={2} />
          <span className="text-[12px]">Refresh</span>
        </Button>
        <button className="relative h-8 w-8 inline-flex items-center justify-center rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors">
          <Bell className="h-4 w-4" strokeWidth={1.8} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-risk-critical ring-2 ring-surface" />
        </button>
        <button className="h-8 w-8 inline-flex items-center justify-center rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors">
          <HelpCircle className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
