"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A two-part custom pointer: a hard dot that tracks precisely and a lagging
 * ring that expands over interactive elements. Disabled on touch devices.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    // Suppress the native pointer only once ours is definitely rendering.
    document.documentElement.setAttribute("data-cursor", "custom");

    const interactive = "a, button, [role='button'], input, textarea, select, [data-cursor='hover']";

    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      setActive(Boolean((e.target as Element)?.closest?.(interactive)));
    }
    function onLeave() {
      setHidden(true);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeAttribute("data-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-cyan"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hidden ? 0 : 1, scale: active ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        className="absolute rounded-full border border-violet/70"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 46 : 26,
          height: active ? 46 : 26,
          opacity: hidden ? 0 : active ? 1 : 0.5,
          // rgba(...,0) rather than `transparent`, which is not animatable.
          backgroundColor: active ? "rgba(139, 123, 255, 0.16)" : "rgba(139, 123, 255, 0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      />
    </div>
  );
}
