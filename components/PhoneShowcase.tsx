"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Check, Mic, Search, Sparkles, Upload } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fixed so server and client render identically. */
const WAVE = [
  0.3, 0.62, 0.4, 0.88, 0.55, 1, 0.46, 0.74, 0.34, 0.6, 0.92, 0.5, 0.7, 0.28, 0.82, 0.44,
  0.66, 0.36,
];

const SCREENS = ["voice", "assistant", "release"] as const;
type Screen = (typeof SCREENS)[number];

const meta: Record<Screen, { app: string; caption: string }> = {
  voice: { app: "PlayByPlay", caption: "Real-time voice agent" },
  assistant: { app: "Brokerage AI", caption: "RAG assistant" },
  release: { app: "Ship", caption: "Release pipeline" },
};

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 font-mono text-[9px] text-white/55">
      <span>9:41</span>
      <div className="flex items-center gap-[3px]">
        <span className="h-[7px] w-[2px] rounded-full bg-white/35" />
        <span className="h-[9px] w-[2px] rounded-full bg-white/50" />
        <span className="h-[11px] w-[2px] rounded-full bg-white/70" />
        <span className="ml-1 h-[8px] w-[14px] rounded-[3px] border border-white/40 p-[1px]">
          <span className="block h-full w-2/3 rounded-[1px] bg-white/70" />
        </span>
      </div>
    </div>
  );
}

function VoiceScreen() {
  return (
    <div className="flex h-full flex-col justify-between px-5 pt-4 pb-6">
      <div className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-400" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-rose-300">Live</span>
        <span className="ml-auto font-mono text-[9px] text-white/40">68&rsquo;</span>
      </div>

      <div>
        <p className="font-display text-[15px] font-semibold leading-tight text-white">
          Anime commentary
        </p>
        <p className="mt-1 font-mono text-[9px] text-white/40">livekit · elevenlabs</p>
      </div>

      {/* Waveform */}
      <div className="flex h-16 items-center justify-between gap-[3px]">
        {WAVE.map((h, i) => (
          <motion.span
            key={i}
            className="w-full rounded-full bg-gradient-to-t from-violet-500 to-cyan-300"
            initial={{ scaleY: h * 0.35 }}
            animate={{ scaleY: [h * 0.35, h, h * 0.5, h * 0.85, h * 0.35] }}
            transition={{
              duration: 1.5 + (i % 4) * 0.22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.045,
            }}
            style={{ height: "100%", originY: 0.5 }}
          />
        ))}
      </div>

      <div className="space-y-2">
        {[
          "AND HE TAKES THE SHOT!",
          "unbelievable footwork!",
          "that's his third of the half",
        ].map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.4, duration: 0.5, ease }}
            className={`text-[11px] leading-snug ${i === 0 ? "font-semibold text-white" : "text-white/50"}`}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { k: "First audio", v: "280ms" },
          { k: "Dropped", v: "0" },
        ].map((m) => (
          <div
            key={m.k}
            className="rounded-lg border border-white/8 bg-white/[0.025] px-2.5 py-2"
          >
            <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">
              {m.k}
            </span>
            <span className="mt-0.5 block font-display text-[13px] font-semibold text-white">
              {m.v}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_28px_-4px_rgba(139,123,255,0.8)]">
          <Mic size={17} className="text-white" />
        </span>
      </div>
    </div>
  );
}

function AssistantScreen() {
  return (
    <div className="flex h-full flex-col justify-between px-5 pt-4 pb-6">
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
        <Search size={11} className="shrink-0 text-white/40" />
        <span className="truncate font-mono text-[9.5px] text-white/50">buyer criteria…</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease }}
        className="rounded-xl border border-violet-400/25 bg-violet-500/10 p-3"
      >
        <div className="flex items-center gap-1.5">
          <Sparkles size={10} className="text-violet-300" />
          <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-violet-300">
            Grounded answer
          </span>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-white">
          12 listings match, 3 above asking.
        </p>
        <div className="mt-2.5 flex gap-1.5">
          <span className="rounded border border-white/12 px-1.5 py-0.5 font-mono text-[8px] text-white/55">
            8 sources
          </span>
          <span className="rounded border border-white/12 px-1.5 py-0.5 font-mono text-[8px] text-white/55">
            0 hallucinations
          </span>
        </div>
      </motion.div>

      <div>
        <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/35">
          Top matches
        </p>
        <div className="mt-2.5 space-y-2">
        {[92, 78, 64, 58].map((w, i) => (
          <motion.div
            key={w}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.14, duration: 0.45, ease }}
            className="flex items-center gap-2.5 rounded-lg border border-white/8 bg-white/[0.025] px-2.5 py-2.5"
          >
            <span className="h-7 w-7 shrink-0 rounded-md bg-gradient-to-br from-white/12 to-white/[0.03]" />
            <span className="min-w-0 flex-1">
              <span className="block h-1.5 rounded-full bg-white/22" style={{ width: `${w}%` }} />
              <span className="mt-1.5 block h-1.5 w-1/3 rounded-full bg-white/10" />
            </span>
            <span className="font-mono text-[8px] text-cyan-300/80">0.9{9 - i}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
        <span className="flex-1 font-mono text-[9.5px] text-white/35">Ask a follow-up…</span>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400">
          <Sparkles size={10} className="text-white" />
        </span>
      </div>
    </div>
  );
}

function ReleaseScreen() {
  const steps = [
    { label: "Typecheck", meta: "4s" },
    { label: "Unit suite", meta: "212 ✓" },
    { label: "Device farm", meta: "12/12" },
    { label: "Sign & bundle", meta: "1m 08s" },
    { label: "TestFlight", meta: "queued" },
  ];

  return (
    <div className="flex h-full flex-col justify-between px-5 pt-4 pb-6">
      <div>
        <div className="flex items-baseline justify-between">
          <p className="font-display text-[15px] font-semibold text-white">Build 2.4.1</p>
          <span className="font-mono text-[9px] text-cyan-300">passing</span>
        </div>
        <p className="mt-1 font-mono text-[9px] text-white/40">ios · android</p>
      </div>

      <div className="space-y-1.5">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.22, duration: 0.45, ease }}
            className="flex items-center gap-2.5 rounded-lg border border-white/8 bg-white/[0.025] px-2.5 py-2"
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-cyan-300/35 bg-cyan-400/10">
              <Check size={10} className="text-cyan-300" />
            </span>
            <span className="flex-1 text-[11px] text-white/80">{s.label}</span>
            <span className="font-mono text-[8px] text-white/35">{s.meta}</span>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-300"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.4, ease }}
          />
        </div>
        <p className="mt-2 font-mono text-[8.5px] text-white/40">uploading artifacts…</p>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-2.5">
        <Upload size={12} className="text-white/70" />
        <span className="text-[11px] font-medium text-white/80">Submit to stores</span>
      </div>
    </div>
  );
}

const screenMap = {
  voice: VoiceScreen,
  assistant: AssistantScreen,
  release: ReleaseScreen,
};

/**
 * A CSS-built handset that cycles through three app screens drawn from the
 * work history. Tilts gently toward the pointer.
 */
export function PhoneShowcase() {
  const [index, setIndex] = useState(0);
  const screen = SCREENS[index];
  const Screen = screenMap[screen];
  const wrapRef = useRef<HTMLDivElement>(null);

  // Keyed on `index` so picking a screen manually restarts the dwell timer
  // instead of letting a running interval yank it away a moment later.
  useEffect(() => {
    const id = setTimeout(() => setIndex((v) => (v + 1) % SCREENS.length), 5600);
    return () => clearTimeout(id);
  }, [index]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [9, -9]), {
    stiffness: 140,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [-7, 7]), {
    stiffness: 140,
    damping: 20,
  });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative mx-auto w-fit"
      style={{ perspective: 1200 }}
    >
      {/* Glow pooled behind the device */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--violet) 85%, transparent) 0%, color-mix(in oklab, var(--cyan) 30%, transparent) 45%, transparent 70%)",
          opacity: 0.55,
        }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Tech chips, anchored to the device so they never drift into dead space */}
        {[
          { label: "React Native", className: "-left-24 top-14" },
          { label: "LiveKit voice", className: "-right-20 top-1/2" },
          { label: "Expo · EAS", className: "-left-20 bottom-28" },
        ].map((chip, i) => (
          <motion.span
            key={chip.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 + i * 0.14, ease }}
            className={`absolute z-20 hidden whitespace-nowrap rounded-full border border-line bg-bg-elev/95 px-2.5 py-1 font-mono text-[10px] text-muted shadow-lg xl:block ${chip.className}`}
          >
            {chip.label}
          </motion.span>
        ))}

        {/* Bezel */}
        <div className="relative w-[clamp(14.5rem,19vw,19rem)] rounded-[2.6rem] bg-gradient-to-b from-white/22 via-white/8 to-white/14 p-[3px] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.95)]">
          <div className="relative aspect-[9/19.2] overflow-hidden rounded-[2.45rem] bg-[#07080f]">
            {/* Screen ambience */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(120% 60% at 50% 0%, color-mix(in oklab, var(--violet) 26%, transparent), transparent 62%)",
              }}
            />

            {/* Dynamic island */}
            <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black" />

            <div className="relative z-10 flex h-full flex-col">
              <StatusBar />
              <div className="relative flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={screen}
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.02, y: -10 }}
                    transition={{ duration: 0.45, ease }}
                    className="absolute inset-0"
                  >
                    <Screen />
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Home indicator */}
              <div className="mx-auto mb-2 h-[3px] w-24 rounded-full bg-white/25" />
            </div>

            {/* Glass sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[2.45rem] bg-gradient-to-br from-white/[0.10] via-transparent to-transparent"
            />
          </div>
        </div>

        {/* Caption chip that follows the active screen */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-bg-elev px-3 py-1.5 shadow-lg"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              <span className="text-[11px] font-medium">{meta[screen].app}</span>
              <span className="font-mono text-[10px] text-faint">{meta[screen].caption}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Screen indicator dots */}
      <div className="mt-9 flex items-center justify-center gap-1.5">
        {SCREENS.map((s, i) => (
          <button
            key={s}
            type="button"
            aria-label={`Show ${meta[s].caption}`}
            onClick={() => setIndex(i)}
            className="group p-1"
          >
            <span
              className={`block h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-6 bg-violet" : "w-1.5 bg-line-strong group-hover:bg-muted"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
