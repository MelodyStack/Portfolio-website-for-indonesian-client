"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Copy, Check, FileText, Github, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { Magnetic } from "./ui/Magnetic";
import { profile } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked; the mailto link below still works */
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="aurora bottom-[-42%] left-[8%] h-[30rem] w-[30rem]"
          style={{ background: "var(--glow-a)", animationDelay: "-6s" }}
        />
        <div
          className="aurora right-[4%] top-[-14%] h-[26rem] w-[26rem]"
          style={{ background: "var(--glow-b)", animationDelay: "-14s" }}
        />
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="pulse-ring relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[12px] text-muted">Open to new work</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.08, ease }}
            className="mt-7 font-display text-[clamp(2.2rem,6.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-balance"
          >
            Have something worth <span className="text-gradient">building?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.16, ease }}
            className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted text-pretty md:text-base"
          >
            Mobile apps, full-stack platforms, or an AI feature that needs to survive contact
            with real users. Tell me the constraint and I&rsquo;ll tell you honestly whether
            I&rsquo;m the right person for it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.24, ease }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Magnetic strength={0.25}>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg"
              >
                <Mail size={15} />
                {profile.email}
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-3.5 text-sm font-medium backdrop-blur-md transition-colors hover:border-line-strong"
            >
              {copied ? (
                <>
                  <Check size={15} className="text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={15} className="text-muted" />
                  Copy address
                </>
              )}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-3 bg-card px-5 py-5 text-left transition-colors hover:bg-bg-elev"
            >
              <Github size={16} className="shrink-0 text-violet" />
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-faint">
                  GitHub
                </span>
                <span className="block truncate text-[13.5px]">@{profile.githubHandle}</span>
              </span>
              <ArrowUpRight
                size={14}
                className="ml-auto shrink-0 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-3 bg-card px-5 py-5 text-left transition-colors hover:bg-bg-elev"
            >
              <FileText size={16} className="shrink-0 text-cyan" />
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-faint">
                  Résumé
                </span>
                <span className="block truncate text-[13.5px]">Download PDF</span>
              </span>
              <ArrowUpRight
                size={14}
                className="ml-auto shrink-0 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <div className="flex items-center gap-3 bg-card px-5 py-5 text-left">
              <MapPin size={16} className="shrink-0 text-amber" />
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-faint">
                  Based in
                </span>
                <span className="block truncate text-[13.5px]">
                  {profile.locationShort} · Remote
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
