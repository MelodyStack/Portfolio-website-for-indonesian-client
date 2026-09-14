"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Brain,
  Database,
  Play,
  RotateCcw,
  Radio,
  Route,
  Wrench,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "./ui/SectionHeading";
import { agentScenarios } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

const nodeIcons = {
  plan: Route,
  retrieve: Database,
  reason: Brain,
  tool: Wrench,
  speak: Radio,
} as const;

type LogLine = { id: string; text: string; node: string; nodeLabel: string };

/** Delay between printed log lines, in ms. */
const LINE_MS = 340;

export function AgentLab() {
  const [scenarioId, setScenarioId] = useState(agentScenarios[0].id);
  const scenario = agentScenarios.find((s) => s.id === scenarioId) ?? agentScenarios[0];

  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [lines, setLines] = useState<LogLine[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setRunning(false);
    setDone(false);
    setStepIndex(-1);
    setLines([]);
  }, [clearTimers]);

  const run = useCallback(() => {
    clearTimers();
    setLines([]);
    setDone(false);
    setStepIndex(-1);
    setRunning(true);

    let tick = 0;
    scenario.steps.forEach((step, si) => {
      step.lines.forEach((text, li) => {
        const delay = ++tick * LINE_MS;
        timers.current.push(
          setTimeout(() => {
            if (li === 0) setStepIndex(si);
            setLines((prev) => [
              ...prev,
              { id: `${si}-${li}`, text, node: step.node, nodeLabel: step.label },
            ]);
          }, delay),
        );
      });
    });

    timers.current.push(
      setTimeout(
        () => {
          setRunning(false);
          setDone(true);
        },
        (tick + 1) * LINE_MS,
      ),
    );
  }, [scenario, clearTimers]);

  // Reset whenever the scenario changes, and clean up on unmount.
  useEffect(() => {
    reset();
    return clearTimers;
  }, [scenarioId, reset, clearTimers]);

  // Keep the newest log line in view.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <section id="agents" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/4 -z-10 h-[30rem] w-[30rem] rounded-full opacity-35 blur-[130px]"
        style={{ background: "var(--glow-b)" }}
      />

      <div className="container-x">
        <SectionHeading
          index="03"
          title={
            <>
              The <span className="text-gradient-accent">Agent Lab</span>. Press play.
            </>
          }
          lead="Everyone says they build with AI. This is what I actually mean by it: a planner, a retriever, a reasoning loop, real tool calls and a delivery channel. Pick a scenario and watch the trace run."
        />

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.85, ease }}
          className="mt-12 overflow-hidden rounded-3xl border border-line bg-card backdrop-blur-md"
          style={{ boxShadow: "var(--shadow-lift)" }}
        >
          {/* Scenario switcher */}
          <div className="flex flex-col gap-3 border-b border-line px-4 py-3.5 sm:flex-row sm:items-center sm:gap-2 md:px-6">
            <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
              {agentScenarios.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setScenarioId(s.id)}
                  className={`relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] transition-colors ${
                    s.id === scenarioId ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {s.id === scenarioId && (
                    <motion.span
                      layoutId="scenario-pill"
                      className="absolute inset-0 rounded-full border border-line bg-bg-elev"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{s.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:ml-auto">
              <button
                type="button"
                onClick={reset}
                disabled={!lines.length}
                aria-label="Reset trace"
                className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg disabled:opacity-30"
              >
                <RotateCcw size={13} />
              </button>
              <button
                type="button"
                onClick={run}
                disabled={running}
                className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-1.5 text-[12.5px] font-medium text-bg transition-transform hover:scale-[1.03] disabled:opacity-50 disabled:hover:scale-100"
              >
                {running ? (
                  <>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bg" />
                    Running
                  </>
                ) : (
                  <>
                    <Play size={12} fill="currentColor" />
                    {done ? "Run again" : "Run trace"}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* The prompt being answered */}
          <div className="border-b border-line px-4 py-4 md:px-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 font-mono text-[11px] text-violet">user&gt;</span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={scenario.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-[12.5px] leading-relaxed text-fg"
                >
                  {scenario.prompt}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid lg:grid-cols-12">
            {/* Pipeline graph */}
            <div className="border-b border-line p-4 md:p-6 lg:col-span-5 lg:border-b-0 lg:border-r">
              <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
                Pipeline
              </div>

              <ol className="relative flex flex-col gap-1">
                {scenario.steps.map((step, i) => {
                  const Icon = nodeIcons[step.node];
                  const state =
                    i < stepIndex ? "done" : i === stepIndex ? "active" : "idle";

                  return (
                    <li key={step.node} className="relative flex items-center gap-3.5 py-2">
                      {/* Connector */}
                      {i < scenario.steps.length - 1 && (
                        <span className="absolute left-[19px] top-[38px] h-[calc(100%-14px)] w-px bg-line">
                          <motion.span
                            className="absolute inset-x-0 top-0 bg-gradient-to-b from-violet to-cyan"
                            initial={{ height: "0%" }}
                            animate={{ height: state === "idle" ? "0%" : "100%" }}
                            transition={{ duration: 0.4, ease }}
                          />
                        </span>
                      )}

                      <div className="relative grid h-10 w-10 shrink-0 place-items-center">
                        {state === "active" && (
                          <motion.span
                            layoutId="agent-halo"
                            className="absolute inset-0 rounded-xl"
                            style={{
                              background:
                                "conic-gradient(from 0deg, var(--violet), var(--cyan), var(--violet))",
                              filter: "blur(6px)",
                              opacity: 0.55,
                            }}
                            transition={{ type: "spring", stiffness: 260, damping: 26 }}
                          />
                        )}
                        <span
                          className={`relative grid h-10 w-10 place-items-center rounded-xl border transition-colors duration-300 ${
                            state === "idle"
                              ? "border-line bg-bg-elev/60 text-faint"
                              : state === "active"
                                ? "border-transparent bg-bg-elev text-fg"
                                : "border-line bg-bg-elev text-cyan"
                          }`}
                        >
                          <Icon size={16} strokeWidth={1.8} />
                        </span>
                      </div>

                      <div className="min-w-0">
                        <div
                          className={`font-display text-sm font-medium transition-colors duration-300 ${
                            state === "idle" ? "text-faint" : "text-fg"
                          }`}
                        >
                          {step.label}
                        </div>
                        <div className="font-mono text-[10px] text-faint">
                          {state === "active"
                            ? "executing…"
                            : state === "done"
                              ? "complete"
                              : "queued"}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Streaming log */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
                  Trace
                </span>
                <span className="font-mono text-[10px] text-faint">
                  {lines.length} / {scenario.steps.reduce((n, s) => n + s.lines.length, 0)}
                </span>
              </div>

              <div
                ref={logRef}
                className="h-[19rem] overflow-y-auto bg-bg-deep/40 px-4 py-4 font-mono text-[11.5px] leading-relaxed md:px-6"
              >
                {lines.length === 0 && !running ? (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                    <span className="text-faint">
                      Trace idle. Hit <span className="text-fg">Run trace</span> to execute.
                    </span>
                    <span className="text-[10px] text-faint/70">
                      Scripted replay of an architecture I&rsquo;ve shipped.
                    </span>
                  </div>
                ) : (
                  <>
                    {lines.map((l) => (
                      <motion.div
                        key={l.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.28, ease }}
                        className="flex gap-3 py-[3px]"
                      >
                        <span className="w-[4.5rem] shrink-0 text-right text-violet/80">
                          {l.nodeLabel.toLowerCase()}
                        </span>
                        <span className="text-faint">│</span>
                        <span className="min-w-0 flex-1 break-words text-fg/90">{l.text}</span>
                      </motion.div>
                    ))}
                    {running && (
                      <div className="flex gap-3 py-[3px]">
                        <span className="w-[4.5rem] shrink-0" />
                        <span className="text-faint">│</span>
                        <span className="caret text-cyan" />
                      </div>
                    )}
                    {done && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 border-t border-line pt-3 text-cyan"
                      >
                        ✓ trace complete: {scenario.steps.length} nodes, 0 errors
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-5 text-center font-mono text-[10.5px] text-faint">
          Illustrative replay of production architectures: voice agents on LiveKit + ElevenLabs,
          RAG over vector search, cross-platform release automation.
        </p>
      </div>
    </section>
  );
}
