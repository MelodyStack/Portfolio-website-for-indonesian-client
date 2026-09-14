"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeading } from "./ui/SectionHeading";
import { AppGrid } from "./AppGrid";
import {
  appProjects,
  projects,
  skillFilters,
  type Project,
  type SkillTag,
} from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

const accentVar: Record<Project["accent"], string> = {
  violet: "var(--violet)",
  cyan: "var(--cyan)",
  amber: "var(--amber)",
};

function hostnameOf(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

/** App-store screenshots laid out as a shelf. Used for mobile projects. */
function AppShelf({ project }: { project: Project }) {
  if (!project.gallery?.length) return null;

  return (
    <div className="flex gap-3">
      {project.gallery.map((src, i) => (
        <div
          key={src}
          className="flex-1 overflow-hidden rounded-2xl border border-line bg-bg-elev shadow-[0_30px_70px_-35px_rgba(0,0,0,0.85)] transition-transform duration-500"
          style={{ transform: `translateY(${i === 1 ? "-0.75rem" : "0"})` }}
        >
          <Image
            src={src}
            alt={`${project.name} app screen ${i + 1}`}
            width={600}
            height={1300}
            sizes="(max-width: 1024px) 30vw, 15vw"
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}

/** A browser window wrapping the site screenshot. Links out when the URL is known. */
function SiteFrame({ project }: { project: Project }) {
  if (!project.image) return null;

  const frame = (
    <div className="overflow-hidden rounded-xl border border-line bg-bg-elev shadow-[0_30px_70px_-35px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:-translate-y-1">
      <div className="flex items-center gap-1.5 border-b border-line bg-bg-deep/60 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-card px-2 py-[3px] font-mono text-[10px] text-faint">
          {project.url ? hostnameOf(project.url) : project.slug}
        </span>
      </div>
      <Image
        src={project.image}
        alt={`Homepage of the ${project.name} website`}
        width={1440}
        height={900}
        sizes="(max-width: 1024px) 92vw, 46vw"
        className="h-auto w-full"
      />
    </div>
  );

  return project.url ? (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Open ${project.name} in a new tab`}
      className="block"
    >
      {frame}
    </a>
  ) : (
    frame
  );
}

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const accent = accentVar[project.accent];
  const imageRight = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.8, ease }}
      className="group relative overflow-hidden rounded-3xl border border-line bg-card transition-colors duration-500 hover:border-line-strong"
      style={{ boxShadow: "var(--shadow-lift)" }}
    >
      {/* Accent bloom, revealed on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full opacity-0 blur-[100px] transition-opacity duration-700 group-hover:opacity-40"
        style={{ background: accent }}
      />

      <div className="relative grid items-center gap-8 p-6 md:p-9 lg:grid-cols-2 lg:gap-12">
        <div className={imageRight ? "lg:order-2" : undefined}>
          {project.gallery?.length ? (
            <AppShelf project={project} />
          ) : (
            <SiteFrame project={project} />
          )}
        </div>

        <div className={imageRight ? "lg:order-1" : undefined}>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: accent }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{
                background: `color-mix(in oklab, ${accent} 14%, transparent)`,
                color: accent,
              }}
            >
              {project.category}
            </span>
            {project.year ? (
              <span className="font-mono text-[10px] text-faint">{project.year}</span>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-[1.9rem]">
              {project.name}
            </h3>
            {[
              ...(project.url ? [{ label: "Visit site", url: project.url }] : []),
              ...(project.links ?? []),
            ].map((link) => (
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

          {project.role ? (
            <p className="mt-2.5 font-mono text-[11px] tracking-wide" style={{ color: accent }}>
              {project.role}
            </p>
          ) : null}

          <p className="mt-4 text-[15.5px] leading-relaxed text-fg text-pretty">
            {project.summary}
          </p>
          <p className="mt-3.5 text-[14px] leading-relaxed text-muted text-pretty">
            {project.detail}
          </p>
        </div>
      </div>

      {/* Numbers band */}
      <div className="relative grid grid-cols-1 gap-px border-t border-line bg-line sm:grid-cols-3">
        {project.impact.map((m) => (
          <div key={m.label} className="bg-bg-elev/70 px-5 py-4">
            <div
              className="font-display text-lg font-semibold tracking-tight"
              style={{ color: accent }}
            >
              {m.value}
            </div>
            <div className="mt-0.5 text-[12px] leading-snug text-muted">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Stack band */}
      <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line px-5 py-4 md:px-9">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">Stack</span>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-line px-2 py-1 font-mono text-[10.5px] text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

type Filter = SkillTag | "all";

export function Work() {
  const [filter, setFilter] = useState<Filter>("all");

  const { visibleProjects, visibleApps, counts } = useMemo(() => {
    const match = <T extends { tags: SkillTag[] }>(items: T[], f: Filter) =>
      f === "all" ? items : items.filter((i) => i.tags.includes(f));

    return {
      visibleProjects: match(projects, filter),
      visibleApps: match(appProjects, filter),
      counts: Object.fromEntries(
        skillFilters.map((f) => [
          f.id,
          match(projects, f.id).length + match(appProjects, f.id).length,
        ]),
      ) as Record<Filter, number>,
    };
  }, [filter]);

  return (
    <section id="work" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      {/* Section glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full opacity-40 blur-[130px]"
        style={{ background: "var(--glow-a)" }}
      />

      <div className="container-x">
        <SectionHeading
          index="02"
          title={
            <>
              Products that <span className="text-gradient-accent">shipped</span>, not
              prototypes that stalled
            </>
          }
          lead="Fifteen shipped products: my own AI commentary app, client platforms built in React and Vue, and mobile apps across React Native and Flutter. Filter by the skill you care about."
        />

        {/* Skill filter */}
        <div className="no-scrollbar -mx-1 mt-10 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {skillFilters.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] transition-colors ${
                  active ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="work-filter-pill"
                    className="absolute inset-0 rounded-full border border-line bg-card"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {f.label}
                  <span className="ml-1.5 font-mono text-[10px] text-faint">
                    {counts[f.id]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-8">
          {visibleProjects.map((p, i) => (
            <CaseStudy key={p.slug} project={p} index={i} />
          ))}
        </div>

        <AppGrid apps={visibleApps} />
      </div>
    </section>
  );
}
