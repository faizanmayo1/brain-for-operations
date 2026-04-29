import { useState } from "react";
import { Bell, Lock, Palette, Sparkles, User, Workflow } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Overline } from "@/components/primitives/Overline";
import { cn } from "@/lib/cn";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "automation", label: "Automation", icon: Workflow, ai: true },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Lock },
];

export function SettingsRoute() {
  const [active, setActive] = useState("automation");
  const [autoExecute, setAutoExecute] = useState(true);
  const [aiThreshold, setAiThreshold] = useState(80);
  const [allowRollback, setAllowRollback] = useState(true);

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 pt-6 pb-12 max-w-[1100px] mx-auto stagger">
        <header className="mb-6">
          <div className="text-[11px] uppercase tracking-[0.1em] font-semibold text-text-tertiary mb-1.5">
            System
          </div>
          <h1 className="text-[28px] font-semibold text-text-primary tracking-tight leading-9">
            Settings
          </h1>
          <div className="mt-1.5 text-[12.5px] text-text-tertiary">
            Workspace · Acme Logistics
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Left rail */}
          <nav className="col-span-3 flex flex-col gap-0.5">
            {sections.map((s) => {
              const Icon = s.icon;
              const a = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "group relative flex items-center gap-2.5 h-9 px-2.5 rounded-md text-[13px] font-medium transition-colors text-left",
                    a
                      ? "bg-accent-500/10 text-text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                  )}
                >
                  {a && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r bg-accent-500" />
                  )}
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      s.ai && "text-ai",
                      a && !s.ai && "text-accent-200"
                    )}
                    strokeWidth={a ? 2.2 : 1.8}
                  />
                  {s.label}
                  {s.ai && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-ai shadow-[0_0_8px_rgba(124,92,255,0.7)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Content */}
          <div className="col-span-9 space-y-4">
            {active === "automation" && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-ai" strokeWidth={2.2} />
                      <CardTitle>AI execution policy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardBody className="space-y-5">
                    <Field
                      label="Allow AI auto-execution"
                      helper="When enabled, the orchestrator can execute decisions above the confidence threshold without human approval. Critical-tier always requires approval."
                    >
                      <Toggle on={autoExecute} onChange={setAutoExecute} />
                    </Field>

                    <Field
                      label="Auto-execute confidence threshold"
                      helper="Decisions below this confidence still require approval, regardless of risk level."
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={50}
                          max={100}
                          value={aiThreshold}
                          onChange={(e) => setAiThreshold(Number(e.target.value))}
                          className="flex-1"
                          disabled={!autoExecute}
                        />
                        <span className="mono text-[14px] font-semibold text-text-primary tabular-nums w-12 text-right">
                          {aiThreshold}%
                        </span>
                      </div>
                    </Field>

                    <Field
                      label="Action roll-back window"
                      helper="Auto-executed actions can be rolled back by any approver within this window."
                    >
                      <div className="flex items-center gap-2">
                        {([
                          ["30m", "30m"],
                          ["90m", "90m"],
                          ["4h", "4h"],
                          ["24h", "24h"],
                        ] as [string, string][]).map(([k, v], i) => (
                          <button
                            key={k}
                            className={cn(
                              "h-8 px-3 rounded-md text-[12px] font-medium border",
                              i === 1
                                ? "bg-canvas border-border-strong text-text-primary"
                                : "bg-surface-2 border-border-subtle text-text-tertiary hover:text-text-secondary"
                            )}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </Field>

                    <Field
                      label="Allow approver-initiated roll-back"
                      helper="Any user with approval rights can revert an executed action."
                    >
                      <Toggle on={allowRollback} onChange={setAllowRollback} />
                    </Field>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Agent envelope</CardTitle>
                    <span className="mono text-[11px] text-text-tertiary">
                      8 agents · 5 active modes
                    </span>
                  </CardHeader>
                  <CardBody>
                    <div className="rounded-md border border-border-subtle bg-canvas/40 p-4">
                      <Overline className="mb-2">Mode hierarchy</Overline>
                      <div className="flex items-center gap-2 flex-wrap text-[12px]">
                        <Pill label="Recommendation only" tone="neutral" />
                        <span className="text-text-tertiary">→</span>
                        <Pill label="Human approval" tone="accent" />
                        <span className="text-text-tertiary">→</span>
                        <Pill label="Semi-autonomous" tone="ai" />
                      </div>
                      <p className="text-[11.5px] text-text-tertiary mt-3 leading-5">
                        Each agent's permitted mode is configurable. New modes
                        require COO approval and are recorded in the audit log.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </>
            )}

            {active === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardBody className="space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="h-14 w-14 rounded-full bg-gradient-to-br from-accent-500 to-ai flex items-center justify-center text-[18px] font-semibold text-white">
                      AD
                    </span>
                    <div>
                      <div className="text-[14px] font-semibold text-text-primary">
                        Adnan Dauti
                      </div>
                      <div className="text-[12px] text-text-tertiary">
                        adnan@codeupscale.com · VP Operations
                      </div>
                    </div>
                    <Button variant="secondary" size="md" className="ml-auto">
                      Change avatar
                    </Button>
                  </div>
                  <Input label="Display name" value="Adnan Dauti" />
                  <Input label="Email" value="adnan@codeupscale.com" />
                  <Input label="Time zone" value="America/Los_Angeles" />
                </CardBody>
              </Card>
            )}

            {active === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardBody className="space-y-3">
                  {[
                    "Critical risk events",
                    "Decisions awaiting approval",
                    "Action completions",
                    "Roll-backs and failures",
                    "Model improvement digest (weekly)",
                  ].map((label, i) => (
                    <Field key={label} label={label}>
                      <Toggle on={i < 4} />
                    </Field>
                  ))}
                </CardBody>
              </Card>
            )}

            {active === "appearance" && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardBody className="space-y-5">
                  <Field label="Theme">
                    <div className="flex gap-2">
                      {["Dark", "Light", "Auto"].map((t, i) => (
                        <button
                          key={t}
                          className={cn(
                            "h-8 px-3 rounded-md text-[12px] font-medium border",
                            i === 0
                              ? "bg-canvas border-border-strong text-text-primary"
                              : "bg-surface-2 border-border-subtle text-text-tertiary"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Density">
                    <div className="flex gap-2">
                      {["Compact", "Default", "Comfortable"].map((t, i) => (
                        <button
                          key={t}
                          className={cn(
                            "h-8 px-3 rounded-md text-[12px] font-medium border",
                            i === 1
                              ? "bg-canvas border-border-strong text-text-primary"
                              : "bg-surface-2 border-border-subtle text-text-tertiary"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </Field>
                </CardBody>
              </Card>
            )}

            {active === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardBody className="space-y-3">
                  <Field
                    label="Two-factor authentication"
                    helper="Required for approval and execution actions."
                  >
                    <Toggle on={true} />
                  </Field>
                  <Field label="Session timeout">
                    <span className="mono text-[12.5px] text-text-secondary">
                      8 hours
                    </span>
                  </Field>
                  <Field label="Single sign-on">
                    <span className="text-[12.5px] text-risk-low">
                      Okta · enabled
                    </span>
                  </Field>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  helper,
  children,
}: {
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 items-start py-2.5 border-b border-border-subtle last:border-0">
      <div>
        <div className="text-[13px] font-medium text-text-primary">{label}</div>
        {helper && (
          <div className="text-[11.5px] text-text-tertiary mt-0.5 max-w-md leading-5">
            {helper}
          </div>
        )}
      </div>
      <div className="min-w-[220px] flex justify-end items-center">
        {children}
      </div>
    </div>
  );
}

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange?.(!on)}
      className={cn(
        "relative inline-flex h-6 w-11 rounded-full transition-colors",
        on
          ? "bg-gradient-to-r from-accent-500 to-ai"
          : "bg-surface-2 border border-border-strong"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform",
          on ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

function Input({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Overline className="mb-1.5">{label}</Overline>
      <div className="h-9 px-3 rounded-md bg-canvas border border-border-subtle text-[13px] text-text-primary flex items-center">
        {value}
      </div>
    </div>
  );
}

function Pill({
  label,
  tone,
}: {
  label: string;
  tone: "neutral" | "accent" | "ai";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] font-medium rounded-full px-2.5 h-6 border",
        tone === "neutral" &&
          "bg-surface-2 text-text-secondary border-border-strong/60",
        tone === "accent" &&
          "bg-accent-500/12 text-accent-200 border-accent-500/30",
        tone === "ai" && "bg-ai/12 text-ai border-ai/30"
      )}
    >
      {label}
    </span>
  );
}
