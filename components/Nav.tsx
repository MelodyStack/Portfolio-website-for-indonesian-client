"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ui/ThemeToggle";
import { profile } from "@/lib/data";

const links = [
  { href: "#craft", label: "Craft" },
  { href: "#work", label: "Work" },
  { href: "#agents", label: "Agent Lab" },
  { href: "#stack", label: "Stack" },
  { href: "#path", label: "Path" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [floating, setFloating] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (v) => setFloating(v > 40));

  // Highlight the nav item whose section currently owns the viewport.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4"
      >
        <div className="container-x">
          <div
            className={`flex items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 md:px-4 ${
              floating
                ? "border-line bg-[color-mix(in_oklab,var(--bg)_78%,transparent)] shadow-[0_16px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                : "border-transparent bg-transparent"
            }`}
          >
            <a
              href="#top"
              className="group flex items-center gap-2.5 pl-1 font-display text-sm font-semibold tracking-tight"
            >
              <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg border border-line bg-gradient-to-br from-violet/25 to-cyan/15 font-mono text-[10px] font-bold text-fg">
                FS
                <span className="absolute inset-0 translate-y-full bg-gradient-to-br from-violet to-cyan opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-20" />
              </span>
              <span className="hidden sm:inline">{profile.name}</span>
              <span className="sm:hidden">Fajar</span>
            </a>

            <nav className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                    active === l.href ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === l.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-line bg-card"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href="#contact"
                className="hidden rounded-full bg-fg px-4 py-2 text-[13px] font-medium text-bg transition-transform duration-300 hover:scale-[1.03] sm:inline-block"
              >
                Let&rsquo;s talk
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card text-muted lg:hidden"
              >
                <Menu size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] backdrop-blur-2xl lg:hidden"
          >
            <div className="container-x flex h-full flex-col pt-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card"
                >
                  <X size={16} />
                </button>
              </div>

              <nav className="mt-14 flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl font-medium tracking-tight"
                  >
                    <span className="font-mono text-[11px] text-violet">
                      0{i + 1}
                    </span>
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href={`mailto:${profile.email}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto mb-10 block font-mono text-sm text-muted"
              >
                {profile.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
