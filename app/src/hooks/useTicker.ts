import { useEffect, useState } from "react";

/**
 * Returns an integer that increments on a fixed interval.
 * Pauses when the tab is hidden so demos resume without stale state.
 */
export function useTicker(intervalMs: number = 4000): number {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let timer: number | null = null;
    const start = () => {
      stop();
      timer = window.setInterval(() => setTick((t) => t + 1), intervalMs);
    };
    const stop = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    };
    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [intervalMs]);

  return tick;
}

/**
 * Deterministic pseudo-random in [0,1) seeded by an integer.
 */
export function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
