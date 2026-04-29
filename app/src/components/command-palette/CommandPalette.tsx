import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CornerDownLeft,
  FlaskConical,
  Home,
  LineChart,
  Plug,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useNav, type RouteKey } from "@/lib/nav";
import { cn } from "@/lib/cn";

interface PaletteItem {
  id: string;
  label: string;
  hint?: string;
  group: string;
  icon: LucideIcon;
  ai?: boolean;
  shortcut?: string;
  action: () => void;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: Props) {
  const { navigate } = useNav();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const items: PaletteItem[] = useMemo(() => {
    const go = (key: RouteKey) => () => {
      navigate(key);
      onOpenChange(false);
    };
    return [
      // Navigate
      { id: "nav-cc", group: "Navigate", label: "Command Center", hint: "Dashboard home", icon: Home, action: go("command-center") },
      { id: "nav-sig", group: "Navigate", label: "Signals", hint: "Signal inbox", icon: Radio, action: go("signals") },
      { id: "nav-risk", group: "Navigate", label: "Risk Cockpit", hint: "Live risk scores", icon: AlertTriangle, action: go("risk") },
      { id: "nav-cop", group: "Navigate", label: "Decision Copilot", hint: "Ask the AI", icon: Sparkles, ai: true, action: go("copilot") },
      { id: "nav-scn", group: "Navigate", label: "Scenarios", hint: "What-if simulator", icon: FlaskConical, action: go("scenarios") },
      { id: "nav-act", group: "Navigate", label: "Actions", hint: "Execution console", icon: Zap, action: go("actions") },
      { id: "nav-imp", group: "Navigate", label: "Impact & Learning", hint: "Outcomes + accuracy", icon: LineChart, action: go("impact") },
      { id: "nav-int", group: "Navigate", label: "Integrations", hint: "Data fabric", icon: Plug, action: go("integrations") },
      { id: "nav-gov", group: "Navigate", label: "Governance", hint: "Audit + RBAC", icon: ShieldCheck, action: go("governance") },

      // Ask Copilot — quick prompts
      { id: "ask-1", group: "Ask Copilot", label: "What decisions should we take right now?", icon: Sparkles, ai: true, action: go("copilot") },
      { id: "ask-2", group: "Ask Copilot", label: "Why did Hub-7 throughput drop?", icon: Sparkles, ai: true, action: go("copilot") },
      { id: "ask-3", group: "Ask Copilot", label: "Which suppliers are at risk this week?", icon: Sparkles, ai: true, action: go("copilot") },
      { id: "ask-4", group: "Ask Copilot", label: "Run scenario for SE-2 reroute", icon: FlaskConical, ai: true, action: go("scenarios") },

      // Recent
      { id: "rec-1", group: "Recent decisions", label: "DEC-4081 · Reroute SE-2 corridor", hint: "Critical · 87% conf", icon: ArrowRight, action: go("copilot") },
      { id: "rec-2", group: "Recent decisions", label: "DEC-4080 · Authorize Hub-7 OT", hint: "High · 81% conf", icon: ArrowRight, action: go("copilot") },
      { id: "rec-3", group: "Recent decisions", label: "DEC-4079 · Pre-stage Hub-3 inbound", hint: "Auto-executed", icon: ArrowRight, action: go("actions") },

      // Recent signals
      { id: "sig-1", group: "Recent signals", label: "SIG-2087 · Hub-7 throughput collapsing", hint: "Critical · 89", icon: Radio, action: go("signals") },
      { id: "sig-2", group: "Recent signals", label: "SIG-2086 · SLA breach on SE-2", hint: "High · 76", icon: Radio, action: go("signals") },
      { id: "sig-3", group: "Recent signals", label: "SIG-2079 · Tier-1 supplier delay", hint: "High · 71", icon: Radio, action: go("signals") },
    ];
  }, [navigate, onOpenChange]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.hint?.toLowerCase().includes(q) ?? false) ||
        i.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Group items
  const grouped = useMemo(() => {
    const m = new Map<string, PaletteItem[]>();
    for (const item of filtered) {
      const arr = m.get(item.group) ?? [];
      arr.push(item);
      m.set(item.group, arr);
    }
    return Array.from(m.entries());
  }, [filtered]);

  // Reset state on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Reset active on filter change
  useEffect(() => {
    setActive(0);
  }, [query]);

  // Keyboard nav
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(filtered.length - 1, a + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.action();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, active, filtered, onOpenChange]);

  // Scroll active into view
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-active-item="${active}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Overlay */}
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="absolute left-1/2 top-[15vh] -translate-x-1/2 w-[640px] max-w-[92vw] max-h-[64vh] flex flex-col rounded-card bg-elevated border border-border-strong shadow-popover overflow-hidden">
        {/* Search */}
        <div className="relative border-b border-border-subtle">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary"
            strokeWidth={2}
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or ask Copilot…"
            className="w-full h-14 pl-12 pr-28 bg-transparent text-[14.5px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 mono text-[10.5px] uppercase tracking-wide font-semibold rounded-full px-1.5 h-5 border border-ai/30 bg-ai/10 text-ai">
              <Sparkles className="h-2.5 w-2.5" strokeWidth={2.4} />
              Copilot
            </span>
          </div>
        </div>

        {/* List */}
        <div ref={listRef} className="flex-1 overflow-y-auto py-2">
          {grouped.length === 0 ? (
            <div className="text-center py-12 text-[12.5px] text-text-tertiary">
              No matches for "{query}"
            </div>
          ) : (
            grouped.map(([group, list]) => (
              <div key={group} className="mb-2">
                <div className="px-4 pt-2 pb-1.5 text-[10px] uppercase tracking-[0.08em] font-semibold text-text-tertiary">
                  {group}
                </div>
                {list.map((it) => {
                  runningIndex += 1;
                  const idx = runningIndex;
                  const isActive = idx === active;
                  const Icon = it.icon;
                  return (
                    <button
                      key={it.id}
                      data-active-item={idx}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => it.action()}
                      className={cn(
                        "group w-full flex items-center gap-3 px-4 h-10 text-left transition-colors",
                        isActive
                          ? "bg-accent-500/12 text-text-primary"
                          : "text-text-secondary hover:text-text-primary"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 flex-shrink-0",
                          isActive && "text-accent-200",
                          it.ai && "text-ai"
                        )}
                        strokeWidth={isActive ? 2.2 : 1.8}
                      />
                      <span className="flex-1 min-w-0">
                        <span className="text-[13px] truncate block">
                          {it.label}
                        </span>
                      </span>
                      {it.hint && (
                        <span className="text-[11px] text-text-tertiary mono truncate flex-shrink-0">
                          {it.hint}
                        </span>
                      )}
                      {isActive && (
                        <span className="text-text-tertiary flex-shrink-0">
                          <CornerDownLeft className="h-3 w-3" strokeWidth={2} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border-subtle px-4 h-10 flex items-center justify-between text-[11px] text-text-tertiary bg-surface/50">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              <span>navigate</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Kbd>↵</Kbd>
              <span>open</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Kbd>esc</Kbd>
              <span>close</span>
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-ai">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={2.4} />
            Press ⌘K to reopen
          </span>
        </div>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mono inline-flex items-center justify-center text-[9.5px] uppercase font-semibold text-text-tertiary bg-surface-2 border border-border-strong rounded px-1 h-4 min-w-[16px]">
      {children}
    </kbd>
  );
}
