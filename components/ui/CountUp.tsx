"use client";

import { animate, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  suffix?: string;
  duration?: number;
};

/** Animates 0 → `to` the first time the element scrolls into view. */
export function CountUp({ to, suffix = "", duration = 1.6 }: Props) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  function start() {
    if (started.current) return;
    started.current = true;
    animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
  }

  // Fallback for viewports where the element is already on screen at load.
  useEffect(() => {
    const id = setTimeout(start, 1200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.span
      className="tabular-nums"
      onViewportEnter={start}
      viewport={{ once: true, amount: 0.4 }}
    >
      {value}
      {suffix}
    </motion.span>
  );
}
