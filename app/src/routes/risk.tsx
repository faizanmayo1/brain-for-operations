import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Download,
  Filter,
  Maximize2,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { KpiTile } from "@/components/primitives/KpiTile";
import { Sparkline } from "@/components/charts/Sparkline";
import { Heatmap } from "@/components/charts/Heatmap";
import { LiveIndicator } from "@/components/feedback/LiveIndicator";
import { CompositeRiskMeter } from "@/features/risk/CompositeRiskMeter";
import { LayeredRiskCard } from "@/features/risk/LayeredRiskCard";
import { ZoneLeaderboard } from "@/features/risk/ZoneLeaderboard";
import { RiskRegisterTable } from "@/features/risk/RiskRegisterTable";
import { HiddenPatternsCard } from "@/features/risk/HiddenPatternsCard";
import { ZoneDetailModal } from "@/features/risk/ZoneDetailModal";
import {
  heatmapCells,
  heatmapCols,
  heatmapRows,
} from "@/mocks/commandCenter";
import { riskKpis, registerEntries, zones, type Zone } from "@/mocks/risk";

export function RiskCockpitRoute() {
  const [activeZone, setActiveZone] = useState<Zone | null>(null);

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 pt-6 pb-12 max-w-[1480px] mx-auto stagger">
        {/* Header */}
        <header className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] font-semibold text-text-tertiary mb-1.5">
              Operations · Decision intelligence
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-semibold text-text-primary tracking-tight leading-9">
                Risk Cockpit
              </h1>
              <LiveIndicator />
            </div>
            <div className="mt-1.5 flex items-center gap-3 text-[12.5px] text-text-tertiary">
              <span className="mono">Mon · Apr 29, 2026 · 09:14</span>
              <span className="h-3 w-px bg-border-subtle" />
              <span>
                {zones.length} zones · {registerEntries.length} active risks ·
                model v4.2.1
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" className="gap-1.5">
              <Filter className="h-3.5 w-3.5" strokeWidth={2} />
              All zones
              <ChevronDown className="h-3 w-3" strokeWidth={2} />
            </Button>
            <Button variant="ghost" size="md" className="gap-1.5">
              <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
              24h
              <ChevronDown className="h-3 w-3" strokeWidth={2} />
            </Button>
            <Button variant="secondary" size="md" className="gap-1.5">
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              Risk brief
            </Button>
            <Button variant="primary" size="md">
              Open Copilot
            </Button>
          </div>
        </header>

        {/* KPI strip */}
        <div className="grid grid-cols-4 gap-4">
          <KpiTile
            label="Composite risk"
            value={riskKpis.composite.value}
            delta={riskKpis.composite.delta}
            deltaSemantic="negative"
            helper={riskKpis.composite.helper}
            chart={
              <Sparkline
                data={[42, 48, 54, 58, 64, 70, 75, 80, 84, 86]}
                width={92}
                height={28}
                color="var(--risk-critical)"
              />
            }
          />
          <KpiTile
            label="Zones at critical"
            value={riskKpis.critical.value}
            delta={riskKpis.critical.delta}
            deltaSemantic="negative"
            helper={riskKpis.critical.helper}
            chart={
              <Sparkline
                data={[1, 1, 2, 2, 1, 2, 2, 3, 3, 3]}
                width={92}
                height={28}
                color="var(--risk-high)"
              />
            }
          />
          <KpiTile
            label="Emerging patterns"
            value={riskKpis.emerging.value}
            delta={riskKpis.emerging.delta}
            deltaSemantic="negative"
            helper={riskKpis.emerging.helper}
            accent="ai"
            chart={
              <Sparkline
                data={[2, 2, 3, 3, 4, 4, 5, 5, 6, 6]}
                width={92}
                height={28}
                color="var(--ai-glow)"
              />
            }
          />
          <KpiTile
            label="Mean detection lag"
            value={riskKpis.detection.value}
            unit={riskKpis.detection.unit}
            delta={riskKpis.detection.delta}
            deltaSemantic="negative"
            helper={riskKpis.detection.helper}
            chart={
              <Sparkline
                data={[5.2, 4.8, 4.4, 4.0, 3.6, 3.2, 2.9, 2.7, 2.5, 2.4]}
                width={92}
                height={28}
                color="var(--risk-low)"
              />
            }
          />
        </div>

        {/* Composite meter + leaderboard */}
        <div className="mt-5 grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <CompositeRiskMeter />
          </div>
          <div className="col-span-4 row-span-2">
            <ZoneLeaderboard
              zones={zones.slice(0, 6)}
              onZoneClick={(z) => setActiveZone(z)}
            />
          </div>
          <div className="col-span-8">
            {/* Heatmap */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CardTitle>Network risk heatmap</CardTitle>
                  <LiveIndicator />
                </div>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="h-3.5 w-3.5" strokeWidth={2} />
                </Button>
              </CardHeader>
              <CardBody>
                <Heatmap
                  rows={heatmapRows}
                  cols={heatmapCols}
                  cells={heatmapCells}
                  cellSize={32}
                  gap={4}
                />
                <div className="mt-4 flex items-center justify-between text-[10.5px] text-text-tertiary">
                  <span className="uppercase tracking-wide">Lower</span>
                  <div className="flex-1 mx-3 h-1.5 rounded-full overflow-hidden flex">
                    <span className="flex-1 bg-risk-low/30" />
                    <span className="flex-1 bg-risk-low/60" />
                    <span className="flex-1 bg-risk-medium/70" />
                    <span className="flex-1 bg-risk-high/85" />
                    <span className="flex-1 bg-risk-critical" />
                  </div>
                  <span className="uppercase tracking-wide">Higher</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Layered risk evolution */}
        <div className="mt-5">
          <LayeredRiskCard />
        </div>

        {/* Risk register + Hidden patterns */}
        <div className="mt-5 grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <RiskRegisterTable
              entries={registerEntries}
              onEntryClick={(e) => {
                const z = zones.find((x) => x.name === e.zone) || zones[0];
                setActiveZone(z);
              }}
            />
          </div>
          <div className="col-span-4">
            <HiddenPatternsCard />
          </div>
        </div>

        <ZoneDetailModal
          zone={activeZone}
          open={!!activeZone}
          onOpenChange={(o) => {
            if (!o) setActiveZone(null);
          }}
        />
      </div>
    </div>
  );
}
