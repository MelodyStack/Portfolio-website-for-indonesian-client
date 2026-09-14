"use client";

import { marqueeTech } from "@/lib/data";

/** Infinite horizontal ticker of the stack. Duplicated once for a seamless loop. */
export function Marquee() {
  const row = [...marqueeTech, ...marqueeTech];

  return (
    <div className="relative border-y border-line py-4">
      <div className="marquee-mask overflow-hidden">
        <div
          className="animate-marquee flex w-max items-center gap-8"
          style={{ ["--marquee-duration" as string]: "55s" }}
        >
          {row.map((tech, i) => (
            <span key={`${tech}-${i}`} className="flex shrink-0 items-center gap-8">
              <span className="font-display text-sm font-medium tracking-tight text-muted transition-colors">
                {tech}
              </span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-violet/50" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
