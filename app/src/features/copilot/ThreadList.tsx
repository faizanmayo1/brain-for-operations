import { Pin, Plus, Search } from "lucide-react";
import { Button } from "@/ui/button";
import { Overline } from "@/components/primitives/Overline";
import { StatusDot } from "@/components/feedback/StatusDot";
import { threads } from "@/mocks/copilot";
import { cn } from "@/lib/cn";

export function ThreadList({ activeId }: { activeId: string }) {
  const pinned = threads.filter((t) => t.pinned);
  const recent = threads.filter((t) => !t.pinned);

  return (
    <aside className="w-[280px] flex-shrink-0 border-r border-border-subtle bg-surface flex flex-col h-full">
      <div className="p-3 border-b border-border-subtle">
        <Button variant="primary" size="md" className="w-full justify-center">
          <Plus className="h-3.5 w-3.5" strokeWidth={2.4} /> New conversation
        </Button>
        <div className="mt-2.5 relative">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary"
            strokeWidth={2}
          />
          <input
            placeholder="Search threads"
            className="w-full h-8 pl-8 pr-2.5 rounded-md bg-canvas border border-border-subtle text-[12.5px] text-text-secondary placeholder:text-text-tertiary focus:outline-none focus:border-accent-500/50"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        {pinned.length > 0 && (
          <>
            <div className="px-2 pb-1.5 flex items-center gap-1.5">
              <Pin
                className="h-2.5 w-2.5 text-text-tertiary"
                strokeWidth={2.2}
              />
              <Overline>Pinned</Overline>
            </div>
            <div className="space-y-0.5 mb-4">
              {pinned.map((t) => (
                <ThreadRow key={t.id} thread={t} active={t.id === activeId} />
              ))}
            </div>
          </>
        )}
        <div className="px-2 pb-1.5">
          <Overline>Recent</Overline>
        </div>
        <div className="space-y-0.5">
          {recent.map((t) => (
            <ThreadRow key={t.id} thread={t} active={t.id === activeId} />
          ))}
        </div>
      </div>
    </aside>
  );
}

function ThreadRow({
  thread,
  active,
}: {
  thread: (typeof threads)[number];
  active: boolean;
}) {
  return (
    <button
      className={cn(
        "w-full text-left px-2.5 py-2 rounded-md transition-colors group relative",
        active
          ? "bg-accent-500/10 ring-1 ring-accent-500/25"
          : "hover:bg-surface-2"
      )}
    >
      {active && (
        <span className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r bg-accent-500" />
      )}
      <div className="flex items-center gap-2 mb-0.5">
        {thread.unread && <StatusDot level="info" size="sm" />}
        <span
          className={cn(
            "text-[12.5px] font-medium truncate flex-1",
            active ? "text-text-primary" : "text-text-secondary"
          )}
        >
          {thread.title}
        </span>
        <span className="mono text-[10px] text-text-tertiary tabular-nums flex-shrink-0">
          {thread.ts}
        </span>
      </div>
      <div className="text-[11.5px] text-text-tertiary truncate pl-3.5">
        {thread.preview}
      </div>
    </button>
  );
}
