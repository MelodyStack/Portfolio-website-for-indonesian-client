"use client";

import { useRef, type CSSProperties, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Radius of the cursor-tracking highlight, in px. */
  radius?: number;
};

/**
 * A glass panel that renders a soft light source following the cursor.
 * Position is written straight to CSS custom properties to avoid re-renders.
 */
export function SpotlightCard({ children, className = "", radius = 340 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    el.style.setProperty("--spot", "1");
  }

  function handleLeave() {
    ref.current?.style.setProperty("--spot", "0");
  }

  const vars = { "--spot": 0, "--r": `${radius}px` } as CSSProperties;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-card backdrop-blur-md transition-colors duration-500 hover:border-line-strong ${className}`}
      style={vars}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[var(--spot)] transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(var(--r) circle at var(--mx) var(--my), color-mix(in oklab, var(--violet) 16%, transparent), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
