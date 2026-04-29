import { useState } from "react";
import { Calendar, ChevronDown, Download, Plus } from "lucide-react";
import { Button } from "@/ui/button";
import { KpiTile } from "@/components/primitives/KpiTile";
import { Sparkline } from "@/components/charts/Sparkline";
import { AgentCanvas } from "@/features/actions/AgentCanvas";
import { ApprovalQueueCard } from "@/features/actions/ApprovalQueueCard";
import { LiveRunsCard } from "@/features/actions/LiveRunsCard";
import { VolumeChart } from "@/features/actions/VolumeChart";
import { ActionHistoryTable } from "@/features/actions/ActionHistoryTable";
import { ActionRunModal } from "@/features/actions/ActionRunModal";
import { actionKpis } from "@/mocks/actions";

export function ActionsRoute() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 pt-6 pb-12 max-w-[1480px] mx-auto stagger">
        {/* Header */}
        <header className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] font-semibold text-text-tertiary mb-1.5">
              Decision intelligence · Execution
            </div>
            <h1 className="text-[28px] font-semibold text-text-primary tracking-tight leading-9">
              Actions
            </h1>
            <div className="mt-1.5 flex items-center gap-3 text-[12.5px] text-text-tertiary">
              <span className="mono">Mon · Apr 29, 2026 · 09:14</span>
              <span className="h-3 w-px bg-border-subtle" />
              <span>
                4 active runs · 3 pending approval · 17 connected systems
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" className="gap-1.5">
              <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
              Today
              <ChevronDown className="h-3 w-3" strokeWidth={2} />
            </Button>
            <Button variant="secondary" size="md" className="gap-1.5">
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              Export log
            </Button>
            <Button variant="primary" size="md" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
              New action
            </Button>
          </div>
        </header>

        {/* KPI strip */}
        <div className="grid grid-cols-4 gap-4">
          <KpiTile
            label="Actions today"
            value={actionKpis.today.value}
            delta={actionKpis.today.delta}
            helper={actionKpis.today.helper}
            chart={
              <Sparkline
                data={[110, 124, 132, 144, 152, 162, 170, 178, 184]}
                width={92}
                height={28}
              />
            }
          />
          <KpiTile
            label="Pending approvals"
            value={actionKpis.pending.value}
            delta={actionKpis.pending.delta}
            deltaSemantic={actionKpis.pending.deltaSemantic}
            helper={actionKpis.pending.helper}
            chart={
              <Sparkline
                data={[1, 1, 2, 1, 2, 2, 3, 2, 3]}
                width={92}
                height={28}
                color="var(--risk-medium)"
              />
            }
          />
          <KpiTile
            label="Auto-execution rate"
            value={actionKpis.autoRate.value}
            unit={actionKpis.autoRate.unit}
            delta={actionKpis.autoRate.delta}
            helper={actionKpis.autoRate.helper}
            accent="ai"
            chart={
              <Sparkline
                data={[48, 52, 54, 55, 57, 58, 60, 61, 62]}
                width={92}
                height={28}
                color="var(--ai-glow)"
              />
            }
          />
          <KpiTile
            label="Avg execution time"
            value={actionKpis.avgTime.value}
            unit={actionKpis.avgTime.unit}
            delta={actionKpis.avgTime.delta}
            deltaSemantic={actionKpis.avgTime.deltaSemantic}
            helper={actionKpis.avgTime.helper}
            chart={
              <Sparkline
                data={[2.4, 2.2, 2.0, 1.8, 1.7, 1.6, 1.5, 1.4, 1.4]}
                width={92}
                height={28}
                color="var(--risk-low)"
              />
            }
          />
        </div>

        {/* Agent canvas + approval queue */}
        <div className="mt-5 grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <AgentCanvas />
          </div>
          <div className="col-span-4">
            <ApprovalQueueCard />
          </div>
        </div>

        {/* Live runs + volume chart */}
        <div className="mt-5 grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <LiveRunsCard onRunClick={() => setModalOpen(true)} />
          </div>
          <div className="col-span-5">
            <VolumeChart />
          </div>
        </div>

        {/* History */}
        <div className="mt-5">
          <ActionHistoryTable onEntryClick={() => setModalOpen(true)} />
        </div>

        <ActionRunModal open={modalOpen} onOpenChange={setModalOpen} />
      </div>
    </div>
  );
}
