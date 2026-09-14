"use client";

import { motion } from "motion/react";
import { SectionHeading } from "./ui/SectionHeading";
import { SpotlightCard } from "./ui/SpotlightCard";
import { Stagger } from "./ui/Reveal";
import { languages, processSteps, skillGroups } from "@/lib/data";

const accentVar: Record<string, string> = {
  violet: "var(--violet)",
  cyan: "var(--cyan)",
  amber: "var(--amber)",
};

export function Stack() {
  return (
    <section id="stack" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="04"
          title={
            <>
              The toolkit, and{" "}
              <span className="text-gradient-accent">how I use it</span>
            </>
          }
          lead="Tools are cheap; judgement about which one to reach for is not. Here's the full stack I work in, followed by the way I run a project."
        />

        {/* Languages strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap items-center gap-2"
        >
          <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
            Languages
          </span>
          {languages.map((l) => (
            <span
              key={l}
              className="rounded-full border border-line bg-card px-3 py-1.5 font-display text-[13px] font-medium backdrop-blur-md"
            >
              {l}
            </span>
          ))}
        </motion.div>

        {/* Skill bento */}
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <Stagger.Item key={g.title}>
              <SpotlightCard className="hairline h-full p-6">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: accentVar[g.accent] }}
                  />
                  <h3 className="font-display text-[15px] font-semibold tracking-tight">
                    {g.title}
                  </h3>
                  <span className="ml-auto font-mono text-[10px] text-faint">
                    {String(g.items.length).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-5 flex flex-col gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="group/item flex items-center gap-2.5 text-[13px] text-muted transition-colors hover:text-fg"
                    >
                      <span
                        className="h-px w-3 shrink-0 transition-all duration-300 group-hover/item:w-5"
                        style={{ background: accentVar[g.accent], opacity: 0.6 }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Stagger.Item>
          ))}
        </Stagger>

        {/* Process */}
        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-xl font-semibold tracking-tight md:text-2xl"
          >
            How the work actually gets done
          </motion.h3>

          <Stagger className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s) => (
              <Stagger.Item key={s.n} className="h-full">
                <div className="group relative h-full bg-bg-elev/60 p-6 transition-colors duration-500 hover:bg-bg-elev">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-violet">{s.n}</span>
                  <h4 className="mt-4 font-display text-base font-semibold tracking-tight">
                    {s.title}
                  </h4>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted text-pretty">
                    {s.body}
                  </p>
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-violet to-cyan transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Stagger.Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
