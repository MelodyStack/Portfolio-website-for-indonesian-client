# Fajar Hadi Saputra Portfolio

A single-page portfolio for a senior full-stack & mobile engineer, built with the
App Router. Dark-first design with a light theme, scroll-driven motion, and an
interactive "Agent Lab" that replays an AI agent pipeline.

## Stack

| Layer      | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 15 (App Router, React 19, TypeScript) |
| Styling    | Tailwind CSS v4 (CSS-first `@theme` tokens)   |
| Motion     | Motion (`motion/react`, formerly Framer Motion) |
| Icons      | lucide-react                                  |
| Type       | Space Grotesk · Inter · JetBrains Mono        |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

> Stop the dev server before running `npm run build`, since both write to `.next`.

## Structure

```
app/
  layout.tsx      metadata, fonts, no-flash theme script
  page.tsx        section composition + Person JSON-LD
  globals.css     design tokens, utilities, keyframes
components/
  Nav Hero Marquee Craft Work AgentLab Stack Path Contact Footer
  ui/             Reveal Magnetic SpotlightCard Cursor ScrollProgress
                  CountUp SectionHeading ThemeToggle
lib/data.ts       all copy, projects, experience, agent traces
public/           résumé PDF
```

## Editing content

Everything user-facing lives in [`lib/data.ts`](lib/data.ts): profile, stats,
capability pillars, projects, skills, experience and the Agent Lab scenarios.
No copy is hard-coded in components.

## Design notes

- **Theme**: tokens are CSS custom properties on `:root`, overridden by
  `[data-theme="light"]`, and exposed to Tailwind via `@theme inline`. An inline
  script in `<body>` applies the stored choice before paint so there's no flash.
  `color-scheme` is set from CSS, not JS, to keep SSR and hydration identical.
- **Agent Lab**: a scripted replay (not a live model call) of architectures from
  the work history: LiveKit + ElevenLabs voice agents, RAG over vector search,
  and cross-platform release automation. Traces live in `agentScenarios`.
- **Motion**: everything respects `prefers-reduced-motion`; the custom cursor
  and native-cursor suppression are disabled on touch and reduced-motion.
- **Overflow**: `overflow-x: clip` on `html`/`body` and on any section holding a
  decorative glow, so blurred blobs never widen the mobile layout viewport.

## Deploy

Static-friendly. Deploy to Vercel with no configuration, or `npm run build &&
npm start` behind any Node host. Update `metadataBase` in
[`app/layout.tsx`](app/layout.tsx) to the real domain before going live.
