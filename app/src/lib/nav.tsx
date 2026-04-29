import { createContext, useContext, useState, type ReactNode } from "react";

export type RouteKey =
  | "command-center"
  | "signals"
  | "risk"
  | "copilot"
  | "scenarios"
  | "actions"
  | "impact"
  | "integrations"
  | "governance"
  | "settings";

interface NavCtx {
  route: RouteKey;
  navigate: (key: RouteKey) => void;
}

const Ctx = createContext<NavCtx | null>(null);

export function NavProvider({
  children,
  initial = "command-center",
}: {
  children: ReactNode;
  initial?: RouteKey;
}) {
  const [route, setRoute] = useState<RouteKey>(initial);
  return (
    <Ctx.Provider value={{ route, navigate: setRoute }}>{children}</Ctx.Provider>
  );
}

export function useNav() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useNav must be used inside NavProvider");
  return ctx;
}
