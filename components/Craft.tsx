"use client";

import { motion } from "motion/react";
import { Bot, Layers, Server, Smartphone } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "./ui/SectionHeading";
import { SpotlightCard } from "./ui/SpotlightCard";
import { pillars } from "@/lib/data";

const icons = {
  mobile: Smartphone,
  web: Layers,
  backend: Server,
  ai: Bot,
} as const;

const accents: Record<string, string> = {
  mobile: "var(--cyan)",
  web: "var(--violet)",
  backend: "var(--amber)",
  ai: "var(--violet)",
};

export function Craft() {
  const [open, setOpen] = useState<string>(pillars[0].id);

  return (
    <section id="craft" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="01"
          title={
            <>
              Four disciplines,{" "}
              <span className="text-gradient-accent">one delivery path</span>
            </>
          }
          lead="Most products die in the gaps between specialists: the handoff from the app to the API, from the model to the interface. I work across all four so those gaps never open."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {pillars.map((p, i) => {
            const Icon = icons[p.id as keyof typeof icons];
            const isOpen = open === p.id;

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setOpen(p.id)}
              >
                <SpotlightCard className="hairline h-full p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line"
                      style={{
                        background: `color-mix(in oklab, ${accents[p.id]} 12%, transparent)`,
                        color: accents[p.id],
                      }}
                    >
                      <Icon size={19} strokeWidth={1.7} />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight md:text-[1.4rem]">
                    {p.title}
                  </h3>
                  <p
                    className="mt-1 font-mono text-[11px] tracking-wide"
                    style={{ color: accents[p.id] }}
                  >
                    {p.kicker}
                  </p>

                  <p className="mt-4 text-[14.5px] leading-relaxed text-muted text-pretty">
                    {p.body}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line bg-bg-elev/50 px-2 py-1 font-mono text-[10.5px] text-muted transition-colors duration-300"
                        style={
                          isOpen
                            ? { borderColor: `color-mix(in oklab, ${accents[p.id]} 35%, transparent)` }
                            : undefined
                        }
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
