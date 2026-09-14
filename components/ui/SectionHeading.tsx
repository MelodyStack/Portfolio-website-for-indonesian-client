"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  index: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({ index, title, lead, align = "left" }: Props) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <span className="font-mono text-[11px] tracking-[0.28em] text-violet">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-violet to-transparent" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-[2.75rem]"
      >
        {title}
      </motion.h2>

      {lead ? (
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-[15px] leading-relaxed text-muted text-pretty md:text-base"
        >
          {lead}
        </motion.p>
      ) : null}
    </div>
  );
}
