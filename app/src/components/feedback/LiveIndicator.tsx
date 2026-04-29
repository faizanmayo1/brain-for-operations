import { cn } from "@/lib/cn";

export function LiveIndicator({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.08em] font-semibold text-text-tertiary",
        className
      )}
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="rounded-full inline-block h-1.5 w-1.5 bg-accent-500" />
        <span className="absolute inset-0 rounded-full animate-ping bg-accent-500 opacity-60" />
      </span>
      Live
    </span>
  );
}
