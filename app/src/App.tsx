import { AppShell } from "@/components/layout/AppShell";
import { CommandCenterRoute } from "@/routes/command-center";
import { CopilotRoute } from "@/routes/copilot";
import { RiskCockpitRoute } from "@/routes/risk";
import { ScenariosRoute } from "@/routes/scenarios";
import { ActionsRoute } from "@/routes/actions";
import { ImpactRoute } from "@/routes/impact";
import { SignalsRoute } from "@/routes/signals";
import { IntegrationsRoute } from "@/routes/integrations";
import { GovernanceRoute } from "@/routes/governance";
import { SettingsRoute } from "@/routes/settings";
import { NavProvider, useNav } from "@/lib/nav";

function RouteSwitch() {
  const { route } = useNav();

  switch (route) {
    case "copilot":
      return <CopilotRoute />;
    case "risk":
      return <RiskCockpitRoute />;
    case "scenarios":
      return <ScenariosRoute />;
    case "actions":
      return <ActionsRoute />;
    case "impact":
      return <ImpactRoute />;
    case "signals":
      return <SignalsRoute />;
    case "integrations":
      return <IntegrationsRoute />;
    case "governance":
      return <GovernanceRoute />;
    case "settings":
      return <SettingsRoute />;
    case "command-center":
    default:
      return <CommandCenterRoute />;
  }
}

function App() {
  return (
    <NavProvider initial="command-center">
      <AppShell>
        <RouteSwitch />
      </AppShell>
    </NavProvider>
  );
}

export default App;
