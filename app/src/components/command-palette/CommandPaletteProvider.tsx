import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CommandPalette } from "./CommandPalette";

interface Ctx {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CommandPaletteCtx = createContext<Ctx | null>(null);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isModK =
        (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isModK) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const ctx: Ctx = {
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen((o) => !o),
  };

  return (
    <CommandPaletteCtx.Provider value={ctx}>
      {children}
      <CommandPalette open={open} onOpenChange={setOpen} />
    </CommandPaletteCtx.Provider>
  );
}

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteCtx);
  if (!ctx)
    throw new Error("useCommandPalette must be used inside CommandPaletteProvider");
  return ctx;
}
