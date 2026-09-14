import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Senior full-stack and mobile engineer with 7+ years shipping AI-powered products. React, Next.js, React Native and Flutter on the front; Node.js and Python behind it; LLM agents, RAG and real-time voice throughout.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fajarhadisaputra.dev"),
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Fajar Hadi Saputra",
    "full-stack engineer",
    "mobile app developer",
    "React Native developer",
    "Next.js developer",
    "AI agent engineer",
    "RAG",
    "LLM",
    "Node.js",
    "Python",
    "Flutter",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title: `${profile.name} · ${profile.role}`,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#04050a" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6f9" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Applied before paint so the chosen theme never flashes. Only the data-theme
 * attribute is touched. `color-scheme` is driven from CSS so nothing the
 * server rendered gets mutated before hydration.
 */
const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem('fhs-theme');
    if (stored === 'light') document.documentElement.setAttribute('data-theme', 'light');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="grain">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
