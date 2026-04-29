import {
  Activity,
  AlertTriangle,
  ChevronsUpDown,
  Cog,
  FlaskConical,
  Gauge,
  Home,
  LineChart,
  Plug,
  Radio,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Overline } from "../primitives/Overline";
import { useNav, type RouteKey } from "@/lib/nav";
import { useCommandPalette } from "@/components/command-palette/CommandPaletteProvider";

interface NavItem {
  key: RouteKey;
  label: string;
  icon: typeof Home;
  badge?: string | number;
  badgeTone?: "default" | "warning" | "ai";
  ai?: boolean;
}

const work: NavItem[] = [
  { key: "command-center", label: "Command Center", icon: Home },
  { key: "signals", label: "Signals", icon: Radio, badge: 12 },
  { key: "risk", label: "Risk Cockpit", icon: AlertTriangle },
  { key: "copilot", label: "Decision Copilot", icon: Sparkles, ai: true },
  { key: "scenarios", label: "Scenarios", icon: FlaskConical },
  {
    key: "actions",
    label: "Actions",
    icon: Zap,
    badge: 3,
    badgeTone: "warning",
  },
  { key: "impact", label: "Impact & Learning", icon: LineChart },
];

const system: NavItem[] = [
  { key: "integrations", label: "Integrations", icon: Plug },
  { key: "governance", label: "Governance", icon: ShieldCheck },
  { key: "settings", label: "Settings", icon: Cog },
];

function NavRow({ item }: { item: NavItem }) {
  const { route, navigate } = useNav();
  const Icon = item.icon;
  const active = route === item.key;
  return (
    <button
      onClick={() => navigate(item.key)}
      className={cn(
        "group relative flex w-full items-center gap-2.5 h-9 px-2.5 rounded-[6px] text-[13px] font-medium transition-colors duration-150",
        active
          ? "bg-accent-500/10 text-text-primary"
          : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
      )}
    >
      {active && (
        <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r bg-accent-500" />
      )}
      <Icon
        className={cn(
          "h-4 w-4 flex-shrink-0",
          item.ai && "text-ai",
          active && !item.ai && "text-accent-200"
        )}
        strokeWidth={active ? 2.2 : 1.8}
      />
      <span className="flex-1 truncate text-left">{item.label}</span>
      {item.ai && (
        <span className="h-1.5 w-1.5 rounded-full bg-ai shadow-[0_0_8px_rgba(124,92,255,0.7)]" />
      )}
      {item.badge !== undefined && (
        <span
          className={cn(
            "mono text-[10.5px] h-4 min-w-[16px] px-1 rounded-full inline-flex items-center justify-center",
            item.badgeTone === "warning"
              ? "bg-risk-high/20 text-risk-high"
              : "bg-surface-2 text-text-tertiary border border-border-strong/60"
          )}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}

export function Sidebar() {
  const palette = useCommandPalette();
  return (
    <aside className="w-[240px] flex-shrink-0 h-full bg-surface border-r border-border-subtle flex flex-col">
      <button className="flex items-center gap-2.5 px-3 h-14 border-b border-border-subtle hover:bg-surface-2 transition-colors">
        <span className="relative h-7 w-7 rounded-md bg-gradient-to-br from-accent-500 to-ai flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
          <span className="absolute inset-[2px] rounded-[5px] bg-gradient-to-br from-accent-600 to-ai/90" />
          <Activity
            className="h-3.5 w-3.5 text-white relative"
            strokeWidth={2.4}
          />
        </span>
        <div className="flex-1 text-left min-w-0">
          <div className="text-[13px] font-semibold text-text-primary leading-4 truncate">
            Acme Logistics
          </div>
          <div className="text-[11px] text-text-tertiary leading-4 truncate mono">
            Workspace · prod
          </div>
        </div>
        <ChevronsUpDown
          className="h-3.5 w-3.5 text-text-tertiary"
          strokeWidth={1.8}
        />
      </button>

      <div className="px-3 pt-3">
        <button
          onClick={() => palette.open()}
          className="w-full flex items-center gap-2 h-8 px-2.5 rounded-[6px] bg-surface-2 hover:bg-elevated hover:border-accent-500/40 border border-border-subtle text-[12.5px] text-text-tertiary hover:text-text-secondary transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5 text-ai" strokeWidth={2} />
          <span className="flex-1 text-left">Ask Copilot or search</span>
          <kbd className="mono text-[10px] text-text-tertiary bg-canvas border border-border-subtle rounded px-1 py-px">
            ⌘K
          </kbd>
        </button>
      </div>

      <nav className="flex-1 px-3 pt-5 pb-4 overflow-y-auto">
        <div className="px-2.5 mb-1.5">
          <Overline>Work</Overline>
        </div>
        <div className="flex flex-col gap-0.5">
          {work.map((item) => (
            <NavRow key={item.key} item={item} />
          ))}
        </div>

        <div className="px-2.5 mt-7 mb-1.5">
          <Overline>System</Overline>
        </div>
        <div className="flex flex-col gap-0.5">
          {system.map((item) => (
            <NavRow key={item.key} item={item} />
          ))}
        </div>
      </nav>

      <div className="border-t border-border-subtle p-3">
        <button className="w-full flex items-center gap-2.5 px-2 h-10 rounded-[6px] hover:bg-surface-2 transition-colors">
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-accent-500 to-ai flex items-center justify-center text-[11px] font-semibold text-white">
            AD
          </span>
          <div className="flex-1 text-left min-w-0">
            <div className="text-[12.5px] font-medium text-text-primary leading-4 truncate">
              Adnan Dauti
            </div>
            <div className="text-[10.5px] text-text-tertiary leading-4 truncate flex items-center gap-1">
              <Gauge className="h-2.5 w-2.5" strokeWidth={2} />
              VP Operations
            </div>
          </div>
          <ChevronsUpDown
            className="h-3.5 w-3.5 text-text-tertiary"
            strokeWidth={1.8}
          />
        </button>
      </div>
    </aside>
  );
}
