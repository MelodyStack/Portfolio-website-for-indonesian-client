import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Craft } from "@/components/Craft";
import { Work } from "@/components/Work";
import { AgentLab } from "@/components/AgentLab";
import { Stack } from "@/components/Stack";
import { Path } from "@/components/Path";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { profile, projects, experience, education } from "@/lib/data";

/** JSON-LD so the page reads as a real person to search engines and LLM crawlers. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: profile.github,
  sameAs: [profile.github],
  address: { "@type": "PostalAddress", addressCountry: "Indonesia" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
  },
  knowsAbout: [
    "React",
    "Next.js",
    "React Native",
    "Flutter",
    "Node.js",
    "Python",
    "TypeScript",
    "LLM integration",
    "RAG",
    "AI agents",
    "Voice AI",
  ],
  worksFor: experience.slice(0, 1).map((e) => ({
    "@type": "Organization",
    name: e.company,
  })),
  hasOccupation: {
    "@type": "Occupation",
    name: profile.role,
    skills: projects.flatMap((p) => p.stack).join(", "),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ScrollProgress />
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Craft />
        <Work />
        <AgentLab />
        <Stack />
        <Path />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
