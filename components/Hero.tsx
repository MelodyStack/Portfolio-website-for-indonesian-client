"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, Github, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "./ui/Magnetic";
import { CountUp } from "./ui/CountUp";
import { PhoneShowcase } from "./PhoneShowcase";
import { profile, stats } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

/** A line that wipes up from behind a mask. */
function KineticLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function RoleRotator() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative block h-[1.5em] overflow-hidden">
      <AnimatePresence>
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="absolute inset-0 flex items-center whitespace-nowrap"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-10 lg:pt-24"
    >
      {/* ── Backdrop: a structured field, not corner blobs ───────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Light beam raking down behind the device */}
        <div
          className="absolute -top-1/2 right-[14%] h-[180%] w-[30rem] rotate-[20deg] blur-[80px]"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--violet) 75%, transparent), transparent 68%)",
            opacity: 0.5,
          }}
        />
        {/* Cool counter-light on the copy side */}
        <div
          className="absolute -left-[10%] top-[6%] h-[32rem] w-[32rem] rounded-full blur-[110px]"
          style={{ background: "var(--glow-b)", opacity: 0.75 }}
        />
        {/* Warm kicker low-left, keeps the palette from going monotone */}
        <div
          className="absolute bottom-[4%] left-[26%] h-[20rem] w-[20rem] rounded-full blur-[120px]"
          style={{ background: "var(--glow-c)", opacity: 0.6 }}
        />
        {/* Floor fade so the section resolves into the page */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
      </div>

      <motion.div style={{ y, opacity }} className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ── Left: the pitch ───────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-3.5 py-1.5"
            >
              <span className="pulse-ring relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[12px] text-muted">{profile.availability}</span>
            </motion.div>

            <h1 className="mt-6 font-display text-[clamp(2.5rem,5.6vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
              <KineticLine delay={0.18}>Fajar Hadi</KineticLine>
              <KineticLine delay={0.28} className="inline-block text-gradient">
                Saputra
              </KineticLine>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="mt-5 flex items-center gap-2.5 font-display text-lg tracking-tight sm:text-xl"
            >
              <span className="shrink-0 text-muted">Working as a</span>
              {/* Solid colour, not `text-gradient-accent`. Chrome drops
                  background-clip:text while the element is being transformed. */}
              <span className="min-w-0 flex-1 font-medium text-violet">
                <RoleRotator />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted text-pretty"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.25}>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg"
                >
                  See the work
                  <ArrowDownRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  />
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-3 text-sm font-medium transition-colors hover:border-line-strong"
                >
                  <Mail size={15} className="text-violet" />
                  Start a project
                </a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-card text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <Github size={16} />
                </a>
              </Magnetic>
            </motion.div>

            {/* Inline stat rail, not a floating box */}
            <motion.dl
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease }}
              className="mt-10 flex flex-wrap items-end gap-x-7 gap-y-5 border-t border-line pt-6"
            >
              {stats.map((s) => (
                <div key={s.short} className="min-w-[5.5rem]">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-semibold tracking-tight">
                      <CountUp to={s.value} suffix={s.suffix} />
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.13em] text-faint">
                      {s.short}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ── Right: the device ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.45, ease }}
            className="relative lg:col-span-5"
          >
            <PhoneShowcase />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Baseline strip ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="container-x absolute inset-x-0 bottom-5 hidden items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-faint md:flex"
      >
        <span>{profile.location}</span>
        <a href="#craft" className="group flex items-center gap-2 transition-colors hover:text-fg">
          Scroll
          <span className="relative h-6 w-px overflow-hidden bg-line-strong">
            <motion.span
              className="absolute inset-x-0 top-0 h-2.5 bg-gradient-to-b from-violet to-transparent"
              animate={{ y: ["-100%", "300%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </a>
        <span>{profile.githubHandle}</span>
      </motion.div>
    </section>
  );
}
