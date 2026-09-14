"use client";

import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      {/* Oversized wordmark */}
      <div className="container-x pt-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
          className="select-none overflow-hidden"
        >
          <span className="block whitespace-nowrap bg-gradient-to-b from-fg/[0.17] to-transparent bg-clip-text text-center font-display text-[clamp(1.75rem,10.8vw,9.5rem)] font-bold leading-[0.9] tracking-[-0.05em] text-transparent">
            FAJAR SAPUTRA
          </span>
        </motion.div>
      </div>

      <div className="container-x">
        <div className="flex flex-col items-center gap-4 border-t border-line py-6 sm:flex-row sm:justify-between">
          <p className="text-[12px] text-faint">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind CSS and
            Motion.
          </p>

          <div className="flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[12px] text-faint transition-colors hover:text-fg"
            >
              GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-[12px] text-faint transition-colors hover:text-fg"
            >
              Email
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="grid h-8 w-8 place-items-center rounded-full border border-line text-faint transition-colors hover:border-line-strong hover:text-fg"
            >
              <ArrowUp size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
