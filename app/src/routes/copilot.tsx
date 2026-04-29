import { useState } from "react";
import {
  ArrowUp,
  Bookmark,
  ChevronDown,
  Mic,
  Paperclip,
  Share,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Button } from "@/ui/button";
import { KpiTile } from "@/components/primitives/KpiTile";
import { Sparkline } from "@/components/charts/Sparkline";
import { AiBadge } from "@/components/feedback/AiBadge";
import { ThreadList } from "@/features/copilot/ThreadList";
import { RankedDecisionCard } from "@/features/copilot/RankedDecisionCard";
import { EvidenceTable } from "@/features/copilot/EvidenceTable";
import { AgentRunsCard } from "@/features/copilot/AgentRunsCard";
import { ConfidenceTrendCard } from "@/features/copilot/ConfidenceTrendCard";
import { ExecuteConfirmModal } from "@/features/copilot/ExecuteConfirmModal";
import {
  copilotKpis,
  rankedDecisions,
  suggestedFollowups,
  threads,
} from "@/mocks/copilot";

export function CopilotRoute() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeDecisionId, setActiveDecisionId] = useState<string | null>(null);
  const activeThread = threads[0];

  const onExecute = (id: string) => {
    setActiveDecisionId(id);
    setModalOpen(true);
  };

  return (
    <div className="flex h-full">
      <ThreadList activeId={activeThread.id} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Conversation header */}
        <div className="flex items-center justify-between gap-4 px-8 pt-6 pb-4 border-b border-border-subtle">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <AiBadge label="Copilot thread" />
              <span className="mono text-[10.5px] text-text-tertiary">
                {activeThread.id}
              </span>
            </div>
            <h1 className="text-[22px] font-semibold text-text-primary tracking-tight leading-7 truncate">
              {activeThread.title}
            </h1>
            <div className="mt-1 flex items-center gap-3 text-[11.5px] text-text-tertiary">
              <span className="mono">Started 09:14 · 4s response</span>
              <span className="h-3 w-px bg-border-subtle" />
              <span>Ensemble: 4 agents · 247 signals · 12 sources</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" className="gap-1.5">
              <Bookmark className="h-3.5 w-3.5" strokeWidth={2} /> Save
            </Button>
            <Button variant="ghost" size="md" className="gap-1.5">
              <Share className="h-3.5 w-3.5" strokeWidth={2} /> Share
            </Button>
            <Button variant="secondary" size="md" className="gap-1.5">
              <Wand2 className="h-3.5 w-3.5" strokeWidth={2} />
              Run again
            </Button>
          </div>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1100px] mx-auto px-8 py-6 stagger">
            {/* KPI strip */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <KpiTile
                label="Questions answered"
                value={copilotKpis.questions.value}
                delta={copilotKpis.questions.delta}
                helper={copilotKpis.questions.helper}
                icon={<Sparkles className="h-3.5 w-3.5" strokeWidth={2} />}
                chart={
                  <Sparkline
                    data={[110, 118, 132, 140, 152, 160, 172, 178, 184]}
                    width={88}
                    height={26}
                  />
                }
              />
              <KpiTile
                label="Avg response latency"
                value={copilotKpis.latency.value}
                unit={copilotKpis.latency.unit}
                delta={copilotKpis.latency.delta}
                deltaSemantic="negative"
                helper={copilotKpis.latency.helper}
                chart={
                  <Sparkline
                    data={[6.4, 5.8, 5.2, 4.7, 4.2, 3.9, 3.7, 3.5, 3.4]}
                    width={88}
                    height={26}
                    color="var(--risk-low)"
                  />
                }
              />
              <KpiTile
                label="Recommendation acceptance"
                value={copilotKpis.acceptance.value}
                unit={copilotKpis.acceptance.unit}
                delta={copilotKpis.acceptance.delta}
                helper={copilotKpis.acceptance.helper}
                accent="ai"
                chart={
                  <Sparkline
                    data={[64, 66, 68, 70, 72, 74, 76, 77, 78]}
                    width={88}
                    height={26}
                    color="var(--ai-glow)"
                  />
                }
              />
              <KpiTile
                label="Decisions executed"
                value={copilotKpis.decisions.value}
                delta={copilotKpis.decisions.delta}
                helper={copilotKpis.decisions.helper}
                chart={
                  <Sparkline
                    data={[28, 32, 35, 38, 40, 42, 44, 46, 47]}
                    width={88}
                    height={26}
                  />
                }
              />
            </div>

            {/* User question */}
            <div className="flex gap-3 mb-6">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-500 to-ai flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
                AD
              </div>
              <div className="flex-1 max-w-2xl">
                <div className="text-[10.5px] uppercase tracking-wide font-semibold text-text-tertiary mb-1">
                  You · 09:14
                </div>
                <div className="rounded-card bg-surface border border-border-subtle px-4 py-3 text-[14px] text-text-primary leading-6">
                  What decisions should we take right now?
                </div>
              </div>
            </div>

            {/* AI response */}
            <div className="flex gap-3 mb-6">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-ai to-accent-500 flex items-center justify-center flex-shrink-0 shadow-[0_4px_20px_-6px_rgba(124,92,255,0.6)]">
                <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10.5px] uppercase tracking-wide font-semibold text-ai">
                    Copilot · 09:14
                  </span>
                  <span className="text-[10.5px] text-text-tertiary mono">
                    composed in 3.7s
                  </span>
                </div>
                <p className="text-[14px] text-text-secondary leading-6 max-w-2xl mb-5">
                  Based on the live signal landscape, three decisions warrant
                  your attention in the next two hours. The top recommendation
                  is to{" "}
                  <span className="text-text-primary font-medium">
                    reroute 142 SE-2 corridor shipments via SE-3
                  </span>{" "}
                  to protect on-time delivery. Two secondary actions follow.
                  Confidence and expected impact are shown per option.
                </p>

                {/* Ranked decisions */}
                <div className="space-y-3">
                  {rankedDecisions.map((d) => (
                    <RankedDecisionCard
                      key={d.id}
                      decision={d}
                      onExecute={onExecute}
                    />
                  ))}
                </div>

                {/* Followup suggestions */}
                <div className="mt-6">
                  <div className="text-[10.5px] uppercase tracking-wide font-semibold text-text-tertiary mb-2">
                    Suggested follow-ups
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedFollowups.map((q) => (
                      <button
                        key={q}
                        className="text-[12.5px] text-text-secondary hover:text-text-primary px-3 h-7 rounded-full bg-surface border border-border-subtle hover:border-accent-500/40 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reasoning + evidence */}
            <div className="grid grid-cols-12 gap-4 mt-6">
              <div className="col-span-7">
                <ConfidenceTrendCard />
              </div>
              <div className="col-span-5">
                <AgentRunsCard />
              </div>
            </div>

            <div className="mt-4">
              <EvidenceTable />
            </div>
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-border-subtle bg-surface/80 backdrop-blur-xl px-8 py-4">
          <div className="max-w-[1100px] mx-auto">
            <div className="relative rounded-card border border-border-strong bg-canvas focus-within:border-accent-500/50 transition-colors">
              <textarea
                rows={1}
                placeholder="Ask Copilot — e.g. what decisions should we take right now?"
                className="w-full resize-none bg-transparent px-4 pt-3 pb-12 text-[13.5px] text-text-primary placeholder:text-text-tertiary focus:outline-none leading-6"
              />
              <div className="absolute left-3 right-3 bottom-2 flex items-center justify-between gap-2 pointer-events-none">
                <div className="flex items-center gap-1 pointer-events-auto">
                  <Button variant="ghost" size="sm" className="gap-1.5 h-7">
                    <Sparkles className="h-3 w-3" strokeWidth={2} />
                    GPT-Decision · ensemble
                    <ChevronDown className="h-3 w-3" strokeWidth={2} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Paperclip className="h-3 w-3" strokeWidth={2} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Mic className="h-3 w-3" strokeWidth={2} />
                  </Button>
                </div>
                <div className="flex items-center gap-2 pointer-events-auto">
                  <span className="text-[10.5px] text-text-tertiary mono">
                    ⌘ + ↵
                  </span>
                  <Button variant="primary" size="sm" className="h-7 w-7 p-0">
                    <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-2 text-[10.5px] text-text-tertiary text-center">
              Copilot synthesizes from 247 signals across 12 sources. All
              recommendations include a reasoning trace and audit record.
            </div>
          </div>
        </div>
      </div>

      <ExecuteConfirmModal
        open={modalOpen}
        decisionId={activeDecisionId}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
