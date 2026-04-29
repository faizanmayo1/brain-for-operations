import { useState } from "react";
import { Calendar, ChevronDown, Download } from "lucide-react";
import { Button } from "@/ui/button";
import { KpiTile } from "@/components/primitives/KpiTile";
import { Sparkline } from "@/components/charts/Sparkline";
import { RightNowStrip } from "@/features/command-center/RightNowStrip";
import { PrioritySignalsTable } from "@/features/command-center/PrioritySignalsTable";
import { RiskHeatmapCard } from "@/features/command-center/RiskHeatmapCard";
import { CopilotSnapshotCard } from "@/features/command-center/CopilotSnapshotCard";
import { RiskEvolutionCard } from "@/features/command-center/RiskEvolutionCard";
import { PipelineKanban } from "@/features/command-center/PipelineKanban";
import { ActivityCard } from "@/features/command-center/ActivityCard";
import { DecisionDetailModal } from "@/features/command-center/DecisionDetailModal";
import { kpiData, prioritySignals } from "@/mocks/commandCenter";

export function CommandCenterRoute() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="h-full overflow-y-auto"><div className="px-8 pt-6 pb-12 max-w-[1480px] mx-auto stagger">
      {/* Page header */}
      <header className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.1em] font-semibold text-text-tertiary mb-1.5">
            Operations · Decision intelligence
          </div>
          <h1 className="text-[28px] font-semibold text-text-primary tracking-tight leading-9">
            Command Center
          </h1>
          <div className="mt-1.5 flex items-center gap-3 text-[12.5px] text-text-tertiary">
            <span className="mono">Mon · Apr 29, 2026</span>
            <span className="h-3 w-px bg-border-subtle" />
            <span>14 hubs · 6 active zones · 78 AI agents online</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="md" className="gap-1.5">
            <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
            Last 24 hours
            <ChevronDown className="h-3 w-3" strokeWidth={2} />
          </Button>
          <Button variant="secondary" size="md" className="gap-1.5">
            <Download className="h-3.5 w-3.5" strokeWidth={2} />
            Export brief
          </Button>
          <Button variant="primary" size="md">
            Open Copilot
          </Button>
        </div>
      </header>

      {/* Right-Now strip */}
      <RightNowStrip onReview={() => setModalOpen(true)} />

      {/* KPI tiles */}
      <div className="mt-5 grid grid-cols-4 gap-4">
        <KpiTile
          label={kpiData.decisions.label}
          value={kpiData.decisions.value}
          delta={kpiData.decisions.delta}
          deltaSemantic={kpiData.decisions.deltaSemantic}
          helper="vs yesterday"
          chart={
            <Sparkline data={kpiData.decisions.spark} width={92} height={28} />
          }
        />
        <KpiTile
          label={kpiData.timeToDecide.label}
          value={kpiData.timeToDecide.value}
          unit={kpiData.timeToDecide.unit}
          delta={kpiData.timeToDecide.delta}
          deltaSemantic={kpiData.timeToDecide.deltaSemantic}
          helper={kpiData.timeToDecide.helper}
          chart={
            <Sparkline
              data={kpiData.timeToDecide.spark}
              width={92}
              height={28}
              color="var(--risk-low)"
            />
          }
        />
        <KpiTile
          label={kpiData.riskAvoided.label}
          value={kpiData.riskAvoided.value}
          delta={kpiData.riskAvoided.delta}
          deltaSemantic={kpiData.riskAvoided.deltaSemantic}
          helper="this week"
          chart={
            <Sparkline
              data={kpiData.riskAvoided.spark}
              width={92}
              height={28}
              color="var(--risk-low)"
            />
          }
        />
        <KpiTile
          label={kpiData.acceptance.label}
          value={kpiData.acceptance.value}
          unit={kpiData.acceptance.unit}
          delta={kpiData.acceptance.delta}
          deltaSemantic={kpiData.acceptance.deltaSemantic}
          helper={kpiData.acceptance.helper}
          accent="ai"
          chart={
            <Sparkline
              data={kpiData.acceptance.spark}
              width={92}
              height={28}
              color="var(--ai-glow)"
            />
          }
        />
      </div>

      {/* Top row: Signals (8 cols) + Heatmap+Copilot (4 cols) */}
      <div className="mt-5 grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <PrioritySignalsTable
            signals={prioritySignals}
            onSignalClick={() => setModalOpen(true)}
          />
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <CopilotSnapshotCard />
        </div>
      </div>

      {/* Risk row: evolution + heatmap */}
      <div className="mt-5 grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <RiskEvolutionCard />
        </div>
        <div className="col-span-4">
          <RiskHeatmapCard />
        </div>
      </div>

      {/* Pipeline */}
      <div className="mt-5">
        <PipelineKanban />
      </div>

      {/* Activity */}
      <div className="mt-5 grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <ActivityCard />
        </div>
        <div className="col-span-4 rounded-card border border-dashed border-border-subtle p-5 flex items-center justify-center text-[12px] text-text-tertiary">
          Impact dashboard preview coming next.
        </div>
      </div>

      <DecisionDetailModal open={modalOpen} onOpenChange={setModalOpen} />
    </div></div>
  );
}
