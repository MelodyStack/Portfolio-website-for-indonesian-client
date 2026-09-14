"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { GraduationCap } from "lucide-react";
import { useRef } from "react";
import { SectionHeading } from "./ui/SectionHeading";
import { education, experience } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export function Path() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.6"],
  });
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section id="path" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="05"
          title={
            <>
              Seven years, five teams,{" "}
              <span className="text-gradient-accent">one trajectory</span>
            </>
          }
          lead="From responsive pages to production AI systems. Each role added a layer rather than replacing one."
        />

        <div ref={ref} className="relative mt-14">
          {/* Rail */}
          <div className="absolute left-[7px] top-2 hidden h-full w-px bg-line md:block">
            <motion.div
              style={{ height }}
              className="w-px bg-gradient-to-b from-violet via-cyan to-amber"
            />
          </div>

          <div className="flex flex-col gap-3">
            {experience.map((job, i) => (
              <motion.div
                key={`${job.company}-${job.period}`}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.75, delay: i * 0.05, ease }}
                className="relative md:pl-12"
              >
                {/* Node */}
                <span className="absolute left-0 top-8 hidden h-[15px] w-[15px] place-items-center rounded-full border border-line bg-bg md:grid">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                </span>

                <div className="hairline group relative overflow-hidden rounded-2xl border border-line bg-card p-6 backdrop-blur-md transition-colors duration-500 hover:border-line-strong md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight md:text-xl">
                        {job.role}
                      </h3>
                      <p className="mt-1 text-[14px] text-violet">{job.company}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-mono text-[11.5px] text-muted">{job.period}</p>
                      <p className="mt-0.5 font-mono text-[10.5px] text-faint">
                        {job.duration} · {job.focus}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 flex flex-col gap-3">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-cyan/70" />
                        <span className="text-pretty">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {job.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-line px-2 py-1 font-mono text-[10.5px] text-faint transition-colors group-hover:text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.75, ease }}
              className="relative md:pl-12"
            >
              <span className="absolute left-0 top-8 hidden h-[15px] w-[15px] place-items-center rounded-full border border-line bg-bg md:grid">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              </span>

              <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-dashed border-line px-6 py-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-amber">
                  <GraduationCap size={17} strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-semibold tracking-tight">
                    {education.degree}
                  </h3>
                  <p className="mt-0.5 text-[13px] text-muted">{education.school}</p>
                </div>
                <span className="ml-auto font-mono text-[11px] text-faint">
                  {education.period}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
