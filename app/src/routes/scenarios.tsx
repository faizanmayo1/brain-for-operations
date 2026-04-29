import { useState } from "react";
import { Calendar, ChevronDown, Download, Plus, Sparkles } from "lucide-react";
import { Button } from "@/ui/button";
import { KpiTile } from "@/components/primitives/KpiTile";
import { Sparkline } from "@/components/charts/Sparkline";
import { VariableBuilder } from "@/features/scenarios/VariableBuilder";
import { OutcomeCurves } from "@/features/scenarios/OutcomeCurves";
import { DistributionPanel } from "@/features/scenarios/DistributionPanel";
import { ScenarioLibraryTable } from "@/features/scenarios/ScenarioLibraryTable";
import { ScenarioRunModal } from "@/features/scenarios/ScenarioRunModal";
import {
  scenarioKpis,
  type ScenarioLibraryEntry,
} from "@/mocks/scenarios";

export function ScenariosRoute() {
  const [activeEntry, setActiveEntry] = useState<ScenarioLibraryEntry | null>(
    null
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 pt-6 pb-12 max-w-[1480px] mx-auto stagger">
        {/* Header */}
        <header className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] font-semibold text-text-tertiary mb-1.5">
              Decision intelligence · What-if
            </div>
            <h1 className="text-[28px] font-semibold text-text-primary tracking-tight leading-9">
              Scenarios
            </h1>
            <div className="mt-1.5 flex items-center gap-3 text-[12.5px] text-text-tertiary">
              <span className="mono">Mon · Apr 29, 2026</span>
              <span className="h-3 w-px bg-border-subtle" />
              <span>Model v4.2.1 · Monte Carlo · 1k–10k samples</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" className="gap-1.5">
              <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
              Last 30 days
              <ChevronDown className="h-3 w-3" strokeWidth={2} />
            </Button>
            <Button variant="secondary" size="md" className="gap-1.5">
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              Export
            </Button>
            <Button variant="primary" size="md" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
              New scenario
            </Button>
          </div>
        </header>

        {/* KPI strip */}
        <div className="grid grid-cols-4 gap-4">
          <KpiTile
            label="Scenarios run"
            value={scenarioKpis.ranToday.value}
            delta={scenarioKpis.ranToday.delta}
            helper={scenarioKpis.ranToday.helper}
            chart={
              <Sparkline
                data={[4, 6, 7, 8, 9, 10, 11, 11, 12]}
                width={88}
                height={26}
              />
            }
          />
          <KpiTile
            label="Prediction accuracy"
            value={scenarioKpis.accuracy.value}
            unit={scenarioKpis.accuracy.unit}
            delta={scenarioKpis.accuracy.delta}
            helper={scenarioKpis.accuracy.helper}
            accent="ai"
            chart={
              <Sparkline
                data={[84, 85, 86, 87, 88, 89, 90, 91, 92]}
                width={88}
                height={26}
                color="var(--ai-glow)"
              />
            }
          />
          <KpiTile
            label="Decisions informed"
            value={scenarioKpis.decisions.value}
            delta={scenarioKpis.decisions.delta}
            helper={scenarioKpis.decisions.helper}
            chart={
              <Sparkline
                data={[28, 32, 35, 38, 40, 42, 44, 46, 47]}
                width={88}
                height={26}
              />
            }
          />
          <KpiTile
            label="Avg savings · applied"
            value={scenarioKpis.saveAvg.value}
            delta={scenarioKpis.saveAvg.delta}
            helper={scenarioKpis.saveAvg.helper}
            chart={
              <Sparkline
                data={[42, 48, 52, 58, 62, 66, 70, 72, 74]}
                width={88}
                height={26}
                color="var(--risk-low)"
              />
            }
          />
        </div>

        {/* Banner — current sim subject */}
        <div className="mt-5 rounded-card overflow-hidden border-ai-gradient">
          <div className="relative bg-gradient-to-r from-accent-500/10 via-ai/8 to-transparent p-4 flex items-center gap-4">
            <div className="absolute -top-12 -right-8 h-40 w-40 rounded-full bg-gradient-to-br from-accent-500/20 to-ai/10 blur-3xl pointer-events-none" />
            <div className="relative h-9 w-9 rounded-md bg-gradient-to-br from-accent-500 to-ai flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-4 w-4 text-white" strokeWidth={2.2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] uppercase tracking-[0.1em] font-semibold text-ai mb-0.5">
                Active subject
              </div>
              <div className="text-[14px] text-text-primary">
                <span className="font-semibold">SE-2 corridor reroute</span>{" "}
                <span className="text-text-tertiary">·</span>{" "}
                comparing 3 variants over a 24-hour horizon
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Change subject
            </Button>
          </div>
        </div>

        {/* Builder + curves */}
        <div className="mt-5 grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <VariableBuilder />
          </div>
          <div className="col-span-8">
            <OutcomeCurves />
          </div>
        </div>

        {/* Distribution + Library */}
        <div className="mt-5 grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <DistributionPanel />
          </div>
          <div className="col-span-7">
            <ScenarioLibraryTable
              onEntryClick={(e) => setActiveEntry(e)}
            />
          </div>
        </div>

        <ScenarioRunModal
          entry={activeEntry}
          open={!!activeEntry}
          onOpenChange={(o) => {
            if (!o) setActiveEntry(null);
          }}
        />
      </div>
    </div>
  );
}
