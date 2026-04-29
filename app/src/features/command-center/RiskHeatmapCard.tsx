import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Heatmap } from "@/components/charts/Heatmap";
import { LiveIndicator } from "@/components/feedback/LiveIndicator";
import { Maximize2 } from "lucide-react";
import {
  heatmapCells,
  heatmapCols,
  heatmapRows,
} from "@/mocks/commandCenter";

export function RiskHeatmapCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Live risk heatmap</CardTitle>
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
          cellSize={26}
          gap={3}
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

        <div className="mt-3 flex items-center gap-2 text-[11px] text-text-tertiary">
          <span className="h-2 w-2 rounded-sm ring-1 ring-accent-500/70" />
          <span>4 zones updated in the last 5 min</span>
        </div>
      </CardBody>
    </Card>
  );
}
