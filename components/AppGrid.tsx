"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { type AppProject } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

function AppCard({ app, index }: { app: AppProject; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay: (index % 2) * 0.07, ease }}
      className="group flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-colors duration-500 hover:border-line-strong md:p-6"
    >
      <div className="flex items-center gap-3.5">
        <Image
          src={app.icon}
          alt={`${app.name} app icon`}
          width={512}
          height={512}
          sizes="56px"
          className="h-14 w-14 shrink-0 rounded-[13px] border border-line object-cover"
        />
        <div className="min-w-0">
          <h4 className="font-display text-[15.5px] font-semibold leading-tight tracking-tight">
            {app.name}
          </h4>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-faint">
            {app.category} · {app.role}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[13.5px] leading-relaxed text-fg/90 text-pretty">{app.blurb}</p>
      <p className="mt-2.5 text-[13px] leading-relaxed text-muted text-pretty">
        {app.contribution}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {app.stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint transition-colors group-hover:text-muted"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {app.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group/link inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11.5px] text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            {link.label}
            <ArrowUpRight
              size={12}
              className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </a>
        ))}
      </div>
    </motion.article>
  );
}

export function AppGrid({ apps }: { apps: AppProject[] }) {
  if (!apps.length) return null;

  return (
    <div className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease }}
        className="max-w-2xl"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.28em] text-cyan">ALSO SHIPPED</span>
          <span className="h-px w-10 bg-gradient-to-r from-cyan to-transparent" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">
          {apps.length} more {apps.length === 1 ? "app" : "apps"}, live on the stores
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-muted text-pretty">
          Client work where I came in as a mobile engineer rather than owning the product. Order
          tracking, GPS and Watch integration, bookings and payments, across React Native and
          Flutter.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {apps.map((app, i) => (
          <AppCard key={app.slug} app={app} index={i} />
        ))}
      </div>
    </div>
  );
}
