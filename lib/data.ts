export const profile = {
  name: "Fajar Hadi Saputra",
  shortName: "Fajar",
  initials: "FHS",
  role: "Senior Full-Stack & Mobile Engineer",
  roles: [
    "Mobile App Engineer",
    "Full-Stack Developer",
    "AI Agent Builder",
    "React & Next.js Specialist",
    "Node.js & Python Engineer",
  ],
  tagline:
    "I build AI-powered web and mobile products, from the App Store screen a user taps to the retrieval pipeline and voice agent humming behind it.",
  location: "Indonesia · Remote worldwide",
  locationShort: "Indonesia",
  email: "kingpig0117@gmail.com",
  github: "https://github.com/MelodyStack",
  githubHandle: "MelodyStack",
  resumeUrl: "/Resume_Fajar_Hadi_Saputra.pdf",
  availability: "Available for senior full-stack, mobile & AI engineering roles",
};

export const stats = [
  { value: 7, suffix: "+", label: "Years shipping production software", short: "Years shipping" },
  { value: 100, suffix: "K+", label: "Users served by apps I've built", short: "Users reached" },
  { value: 40, suffix: "%+", label: "Performance gains delivered", short: "Faster apps" },
  { value: 30, suffix: "+", label: "Features shipped end-to-end", short: "Features shipped" },
];

export const pillars = [
  {
    id: "mobile",
    title: "Mobile App Development",
    kicker: "iOS · Android · Cross-platform",
    body: "Cross-platform apps in React Native, Expo and Flutter, plus native Swift/SwiftUI and Kotlin where it counts. I own the whole release path: push notifications, on-device QA, App Store Connect and Play Console submissions.",
    tags: ["React Native", "Expo", "Flutter", "SwiftUI", "Kotlin", "App Store / Play Store"],
  },
  {
    id: "web",
    title: "React & Next.js Frontend",
    kicker: "Interfaces that feel instant",
    body: "Typed, component-driven frontends with React and Next.js. I obsess over the render path: code splitting, lazy loading, caching and asset budgets that cut load times by a third or more.",
    tags: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS", "Vite"],
  },
  {
    id: "backend",
    title: "Node.js & Python Backend",
    kicker: "APIs, data and infrastructure",
    body: "REST and GraphQL services in Node/Express and Python (Django, FastAPI), backed by well-modelled Postgres, MongoDB and Redis. Shipped on AWS with Docker and GitHub Actions pipelines.",
    tags: ["Node.js", "Express", "FastAPI", "Django", "PostgreSQL", "AWS", "Docker"],
  },
  {
    id: "ai",
    title: "AI Agents & AI Products",
    kicker: "LLMs in production, not demos",
    body: "RAG pipelines, tool-using agents and real-time voice agents that actually hold up under load. LiveKit streaming, ElevenLabs TTS/STT, vector search, evaluation loops and prompt engineering that survives real users.",
    tags: ["OpenAI", "Anthropic", "LangChain", "RAG", "Vector DBs", "LiveKit", "ElevenLabs"],
  },
];

export const skillGroups = [
  {
    title: "AI / ML",
    accent: "violet",
    items: [
      "LLM integration (OpenAI, Anthropic)",
      "RAG pipelines",
      "LangChain",
      "Vector databases",
      "Prompt engineering",
      "Voice agents (LiveKit)",
      "ElevenLabs TTS / STT",
      "AI-assisted dev (Cursor, Copilot, Claude Code)",
    ],
  },
  {
    title: "Mobile",
    accent: "cyan",
    items: [
      "React Native",
      "Expo",
      "Flutter",
      "Ionic / Capacitor",
      "Swift / SwiftUI",
      "Kotlin",
      "HealthKit / WatchKit",
      "StoreKit & in-app purchases",
      "Push notifications",
      "App Store & Play Store publishing",
    ],
  },
  {
    title: "Web / Frontend",
    accent: "cyan",
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "TypeScript",
      "Redux",
      "Zustand",
      "Pinia / Vuex",
      "Tailwind CSS",
      "Vite / Webpack",
      "Code splitting & lazy loading",
    ],
  },
  {
    title: "Backend",
    accent: "amber",
    items: [
      "Node.js",
      "Express.js",
      "Python",
      "Django",
      "FastAPI",
      "Celery",
      "PHP / Laravel",
      "REST API design",
      "GraphQL",
      "WebSockets",
      "JWT / OAuth2",
    ],
  },
  {
    title: "Data",
    accent: "amber",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Firebase / Firestore",
      "Redis",
      "Prisma & ORMs",
      "Schema design",
      "Query optimisation",
    ],
  },
  {
    title: "DevOps / Cloud",
    accent: "violet",
    items: [
      "AWS (EC2, S3, Lambda)",
      "Docker",
      "GitHub Actions CI/CD",
      "Vercel",
      "Nginx",
      "Linux administration",
    ],
  },
];

export const languages = [
  "TypeScript",
  "JavaScript (ES6+)",
  "Python",
  "PHP",
  "Dart",
  "Swift",
  "Kotlin",
  "SQL",
];

/** Skill buckets the work is filtered by. A piece of work can sit in several. */
export type SkillTag = "react" | "vue" | "mobile" | "ai";

export const skillFilters: { id: SkillTag | "all"; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "react", label: "React & Next.js" },
  { id: "mobile", label: "Mobile apps" },
  { id: "vue", label: "Vue" },
  { id: "ai", label: "AI & agents" },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Skill buckets this belongs to, used by the Work filter. */
  tags: SkillTag[];
  /** Omit when the dates aren't public; the UI hides it rather than guessing. */
  year?: string;
  /** Screenshot of the live site, 1440x900, served from /public/work. */
  image?: string;
  /** Tall app-store screenshots, rendered as a shelf instead of a browser frame. */
  gallery?: string[];
  /** Live production URL, shown as an outbound link on the case study. */
  url?: string;
  /** Extra outbound links, e.g. App Store and Play Store listings. */
  links?: { label: string; url: string }[];
  /** What I did on it, shown when it is worth stating explicitly. */
  role?: string;
  summary: string;
  detail: string;
  impact: { value: string; label: string }[];
  stack: string[];
  accent: "violet" | "cyan" | "amber";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "playbyplay-anime",
    tags: ["mobile", "ai"],
    name: "PlayByPlay Anime",
    category: "AI Voice Agent · Mobile",
    role: "Co-founder · Concept, design and engineering",
    gallery: [
      "/work/playbyplay/pbp-3.jpg",
      "/work/playbyplay/pbp-5.jpg",
      "/work/playbyplay/pbp-1.jpg",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/playbyplay-anime/id6760711721",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.playbyplay.anime",
      },
    ],
    summary:
      "My own product. Victoria is an AI anime football commentator who reacts live to every goal, card and momentum swing, turning watching a match alone into a companion experience.",
    detail:
      "I co-founded this one and took it the whole way myself: the idea, the product design, the character, the interface and the engineering, from first sketch to both stores. Victoria is a real-time voice agent. LiveKit streams the audio at low latency, ElevenLabs handles speech in and out, and an LLM writes commentary against live match state across the Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League, MLS and the 2026 World Cup. You can cut in by voice or chat mid-match and she answers. One React Native and Expo codebase ships to iOS and Android, with a Node backend on AWS running predictions, the credit system and affiliate rewards. No subscription: credits are bought in packs when you want them.",
    impact: [
      { value: "2", label: "App stores, live" },
      { value: "8", label: "Leagues and tournaments" },
      { value: "7", label: "Languages at launch" },
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "LiveKit",
      "ElevenLabs",
      "WebRTC",
      "Node.js",
      "Express",
      "LLM APIs",
      "PostgreSQL",
      "AWS",
      "In-app purchases",
    ],
    accent: "violet",
    featured: true,
  },
  {
    slug: "business-brokerage-services",
    tags: ["react", "ai"],
    name: "Business Brokerage Services",
    category: "Brokerage Platform · CRM",
    role: "Public platform and the internal CRM behind it",
    url: "https://denverbbs.com/",
    image: "/work/denverbbs.jpg",
    summary:
      "The platform for a Colorado business brokerage with 20 years and over a thousand closings behind it, plus the CRM its brokers run every deal on.",
    detail:
      "Two halves of one system. The public side is the storefront: listings buyers can search by budget and sector, a valuation and exit-planning funnel for sellers, gated resources, and accounts people sign in to. Behind it sits the CRM the brokers actually work in, carrying a transaction from first valuation through listing, buyer matching, NDAs and documents to close. Selling a business is a long, document-heavy process where the two sides must never see the same things, so most of the work went into pipeline state, permissions and keeping buyer and seller views correctly separated. Listing search later grew an AI layer, with embeddings over listing and document text so buyers could describe what they wanted in plain language rather than filtering by category.",
    impact: [
      { value: "1,000+", label: "Businesses sold in Colorado" },
      { value: "2,500+", label: "Businesses analysed" },
      { value: "20 yrs", label: "Brokerage the platform serves" },
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "REST API",
      "PostgreSQL",
      "OpenAI",
      "Vector search",
      "reCAPTCHA",
      "AWS",
    ],
    accent: "cyan",
    featured: true,
  },
  {
    slug: "one-park-financial",
    tags: ["react"],
    name: "One Park Financial",
    category: "Fintech · Web Platform",
    url: "https://www.oneparkfinancial.com/",
    image: "/work/one-park-financial.jpg",
    summary:
      "A small-business lending platform where owners prequalify in about two minutes and funding can land in the account inside a day.",
    detail:
      "This is a funnel first and a marketing site second. The prequalification flow has to stay fast and credible on a phone, feed underwriting cleanly, and never lose an applicant halfway through. I worked across the Laravel API and the React front end: the multi-step form and its validation and state handling, the data contracts behind it, and the Tailwind design system that keeps the marketing pages and the application surface consistent.",
    impact: [
      { value: "$1.5B+", label: "Funded through the platform" },
      { value: "100K+", label: "Businesses served" },
      { value: "~2 min", label: "Prequalification flow" },
    ],
    stack: [
      "Laravel",
      "PHP",
      "Eloquent",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "MySQL",
      "Redis",
      "REST API",
      "Nginx",
      "AWS",
    ],
    accent: "amber",
    featured: true,
  },
  {
    slug: "thunderpick",
    tags: ["react"],
    name: "Thunderpick",
    category: "Real-Time Platform · Betting",
    url: "https://thunderpick.io/",
    image: "/work/thunderpick.jpg",
    summary:
      "An esports and sports betting platform with a crypto-first wallet, live markets and an in-house casino.",
    detail:
      "Real-time is the entire product. Odds, match state and balances all move while the user is looking at them, so the front end is built around streaming updates rather than request and response. React and Next.js with Tailwind on the client, Python services behind it. Most of the difficulty sits in keeping the bet slip, the wallet and live market data consistent while all three are changing at once, and in keeping the interface responsive under that update rate.",
    impact: [
      { value: "Real-time", label: "Odds and match state" },
      { value: "Crypto", label: "Wallet and payouts" },
      { value: "Esports + casino", label: "Product surfaces" },
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "WebSockets",
      "Python",
      "FastAPI",
      "Celery",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    accent: "violet",
    featured: true,
  },
  {
    slug: "zone-healthy",
    tags: ["react"],
    name: "Zone Healthy",
    category: "Subscription Commerce",
    url: "https://www.zonehealthy.com/",
    image: "/work/zone-healthy.jpg",
    summary:
      "A chef-prepared meal delivery service for Southern California: pick a plan, set your exclusions, and meals arrive on your schedule.",
    detail:
      "Built on Next.js and React with a Node backend. The interesting work is the ordering model rather than the storefront: 7, 14 and 30-day plan lengths, up to five per-customer ingredient exclusions, ZIP-code delivery eligibility, and a points-based rewards and referral programme all feeding the same cart and subscription state. I worked across the storefront and the API that backs it, including checkout and the account area where customers manage preferences and track orders.",
    impact: [
      { value: "7 / 14 / 30", label: "Day subscription plans" },
      { value: "5", label: "Ingredient exclusions per order" },
      { value: "1 pt / $1", label: "Rewards programme" },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "REST API",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Stripe",
      "Vercel",
    ],
    accent: "cyan",
    featured: true,
  },
  {
    slug: "aether-apparel",
    tags: ["react"],
    name: "AETHER Apparel",
    category: "E-commerce · Retail",
    url: "https://aetherapparel.com/",
    image: "/work/aether-apparel.jpg",
    summary:
      "A premium outdoor apparel brand selling online and through five US stores, with seasonal collections, a membership tier and an editorial journal.",
    detail:
      "The catalogue is the hard part here. Men's and women's ranges each branch into clothing, accessories, snow and motorcycle lines, then again into collections and product types, so the navigation has to stay shallow while the taxonomy underneath stays deep. Built in React and Next.js against a headless commerce backend: collection and product templates, cart and checkout, the Insider membership tier, and a Journal section running long-form editorial beside the shop without either template fighting the other.",
    impact: [
      { value: "5", label: "US flagship stores" },
      { value: "20+", label: "Category routes per range" },
      { value: "Shop + journal", label: "Two template systems" },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Headless commerce",
      "GraphQL",
      "Node.js",
      "REST API",
      "Redis",
      "SSR / ISR",
      "Vercel",
    ],
    accent: "violet",
    featured: true,
  },
  {
    slug: "lumenac",
    tags: ["vue"],
    name: "Lumenac",
    category: "Product Catalogue · Manufacturing",
    url: "https://lumenac.com.ar/",
    image: "/work/lumenac.jpg",
    summary:
      "The Spanish-language site for an Argentine LED lighting manufacturer with 39 years in the market, two factories and distributors across Latin America and Europe.",
    detail:
      "A catalogue site where the catalogue is the product. Interior and exterior ranges, dozens of fixture families like Venus, Stadium, Flow and Backlight, each carrying the technical detail a lighting engineer actually reads, plus a projects gallery of installed work. Built as a Vue single-page app on a Node backend with product search, a downloadable catalogue and a language switcher. The whole thing is Spanish-first, so copy, formatting and search were built for that locale rather than bolted on afterwards.",
    impact: [
      { value: "39 yrs", label: "Manufacturer in market" },
      { value: "2", label: "Production plants supplied" },
      { value: "Spanish-first", label: "Locale and search" },
    ],
    stack: [
      "Vue.js",
      "Vue Router",
      "Pinia",
      "JavaScript",
      "SCSS",
      "Node.js",
      "Express",
      "REST API",
      "MySQL",
      "Nginx",
      "i18n",
    ],
    accent: "amber",
    featured: true,
  },
  {
    slug: "thetreedots",
    tags: ["vue", "mobile"],
    name: "TreeDots",
    category: "B2B Marketplace · Mobile",
    url: "https://thetreedots.com/",
    image: "/work/thetreedots.jpg",
    summary:
      "A Singapore food-supply platform that turns surplus and imperfect stock into sales, pairing a B2B marketplace with cold-chain logistics and a back-office system.",
    detail:
      "Three products under one roof: a marketplace where suppliers list excess or imperfect food to businesses at lower prices, a temperature-controlled logistics service, and an admin system for digitising a supplier's own processes. The buyer-facing app is Ionic and Vue, shipping to iOS and Android from a single codebase against a Node backend. Ordering covers catalogues by category, order history and repeat buying, and none of it works unless stock, pricing and delivery windows stay in sync between the app and the back office.",
    impact: [
      { value: "3", label: "Platforms under one roof" },
      { value: "iOS + Android", label: "From one Ionic codebase" },
      { value: "Cold chain", label: "Temperature-controlled delivery" },
    ],
    stack: [
      "Vue.js",
      "Ionic",
      "Capacitor",
      "TypeScript",
      "Vuex",
      "Node.js",
      "Express",
      "REST API",
      "PostgreSQL",
      "Redis",
      "Docker",
      "App Store / Play Store",
    ],
    accent: "cyan",
    featured: true,
  },
];

/**
 * Shipped client apps where I was a contributing mobile engineer rather than
 * the product owner. Kept separate from `projects` so the case studies above
 * stay about platforms I shaped end to end.
 */
export type AppProject = {
  slug: string;
  name: string;
  icon: string;
  category: string;
  tags: SkillTag[];
  role: string;
  blurb: string;
  contribution: string;
  stack: string[];
  links: { label: string; url: string }[];
};

export const appProjects: AppProject[] = [
  {
    slug: "insomnia-cookies",
    tags: ["mobile"],
    name: "Insomnia Cookies",
    icon: "/work/apps/insomnia-cookies.png",
    category: "Food & Drink",
    role: "React Native Developer",
    blurb:
      "Warm cookie delivery until 3am. Find a nearby store, order for pickup or delivery, and collect rewards.",
    contribution:
      "Built real-time order tracking, the ordering interface and the Insomnia Rewards loyalty integration. The hard parts were holding performance through peak late-night load and wiring in third-party delivery services to widen the delivery area.",
    stack: [
      "React Native",
      "Redux",
      "TypeScript",
      "Firebase Firestore",
      "Firebase Auth",
      "FCM",
      "REST APIs",
      "Google Maps SDK",
      "Stripe",
      "iOS & Android SDKs",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/us/app/insomnia-cookies/id891379973" },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.insomniacookies.insomnia",
      },
    ],
  },
  {
    slug: "running-walking-tracker",
    tags: ["mobile"],
    name: "Running Walking Tracker Goals",
    icon: "/work/apps/running-walking.png",
    category: "Health & Fitness",
    role: "React Native / iOS Developer",
    blurb:
      "Goal-based running, walking and cycling tracking with live GPS, voice coaching and Apple Watch support.",
    contribution:
      "Implemented GPS activity tracking, voice coaching cues and HealthKit sync for distance, pace and calories, then built Apple Watch support for live workout control and Siri shortcuts. The challenge was background GPS and Watch connectivity that stayed accurate without draining the battery.",
    stack: [
      "React Native",
      "TypeScript",
      "Zustand",
      "Redux",
      "HealthKit",
      "WatchKit",
      "StoreKit",
      "Siri Shortcuts",
      "Core Location",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/running-walking-tracker-goals/id1136617388",
      },
    ],
  },
  {
    slug: "thecut",
    tags: ["mobile"],
    name: "theCut: Find & Book Barbers",
    icon: "/work/apps/thecut.png",
    category: "Lifestyle",
    role: "React Native / iOS Developer",
    blurb:
      "One booking platform for barbers, shop owners and clients, covering schedules, appointments and payments in a single app.",
    contribution:
      "Barbers set availability, take bookings, get paid instantly including tips and track earnings. Shop owners manage teams and coordinate in real time. Clients find barbers nearby, book and pay in-app, then reschedule or cancel cleanly. Most of the work was syncing schedules across three different profile types and keeping in-app payments reliable.",
    stack: [
      "React Native",
      "Redux",
      "TypeScript",
      "Firebase Firestore",
      "Firebase Auth",
      "REST APIs",
      "Apple Pay",
      "Push notifications",
      "Scheduling & messaging",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/thecut-find-book-barbers/id1101408626",
      },
    ],
  },
  {
    slug: "faceyogi",
    tags: ["mobile"],
    name: "FaceYogi",
    icon: "/work/apps/faceyogi.png",
    category: "Health & Fitness",
    role: "React Native / iOS Developer",
    blurb:
      "Seven-day face yoga programmes at eight minutes a day, with a visual progress diary and motivational incentives.",
    contribution:
      "Built the smart coach that generates customised 7-day regimes, the Facial Diary for tracking daily progress, and the incentive mechanism that drives engagement. Real-time visual updates and heavy media content were the performance problem to solve.",
    stack: [
      "React Native",
      "Redux",
      "TypeScript",
      "Firebase Firestore",
      "Firebase Auth",
      "REST APIs",
      "HealthKit",
      "In-app purchases",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/faceyogi-face-yoga-massage/id1551099110",
      },
    ],
  },
  {
    slug: "yummy-delivery",
    tags: ["mobile"],
    name: "Yummy Delivery",
    icon: "/work/apps/yummy.png",
    category: "Food & Drink",
    role: "Flutter Developer",
    blurb:
      "Food, groceries, pharmacy items and event bookings in one Latin American delivery app.",
    contribution:
      "Built the multi-service modules, real-time order tracking and secure in-app payments, plus onboarding, navigation and push notifications. Holding performance steady across several services while keeping the experience consistent on both platforms was the recurring challenge.",
    stack: [
      "Flutter",
      "Dart",
      "Firebase Firestore",
      "Firebase Auth",
      "FCM",
      "REST API",
      "In-app payments",
      "iOS & Android SDKs",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/us/app/yummy-delivery/id1506748350" },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.yummy.customer",
      },
    ],
  },
  {
    slug: "fitme",
    tags: ["mobile"],
    name: "FitMe",
    icon: "/work/apps/fitme.png",
    category: "Health & Fitness",
    role: "Flutter Developer",
    blurb:
      "Quick, equipment-free workouts for busy people, with personalised routines, reminders and progress tracking.",
    contribution:
      "Built workout scheduling, progress tracking and offline access to exercise videos, plus reminders and adaptive workout plans. Optimising video playback and keeping animations smooth across a wide range of devices were the main constraints.",
    stack: [
      "Flutter",
      "Dart",
      "Firebase Firestore",
      "Firebase Auth",
      "FCM",
      "REST APIs",
      "Google Fit API",
      "In-app purchases",
      "iOS & Android SDKs",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/fitme-lazy-workout-at-home/id6463793132",
      },
    ],
  },
  {
    slug: "habit-tracker",
    tags: ["mobile"],
    name: "Habit Tracker",
    icon: "/work/apps/habit-tracker.png",
    category: "Productivity",
    role: "Flutter Developer",
    blurb:
      "Daily habit building with reminders, streaks, progress stats and motivational nudges.",
    contribution:
      "Built habit creation, streak tracking and reminder notifications, then calendar-based progress views and sync across devices. The focus was staying smooth with long habit histories and scheduling notifications efficiently.",
    stack: [
      "Flutter",
      "FlutterFlow",
      "Dart",
      "Local Notifications",
      "Async Storage",
      "Cross-device sync",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/us/app/habit-tracker/id1438388363" },
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  duration: string;
  focus: string;
  bullets: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: "Co-Founder & Mobile Engineer",
    company: "PlayByPlay Anime",
    period: "Jun 2025 - July 2026",
    duration: "13 mos",
    focus: "AI voice agents · React Native",
    bullets: [
      "Took an AI-powered sports prediction app with real-time, anime-style voice commentary from concept to App Store and Play Store launch.",
      "Built a real-time AI voice agent on LiveKit for low-latency audio streaming, with ElevenLabs TTS and STT for natural, conversational interaction.",
      "Led mobile engineering in React Native and Expo, shipping cross-platform iOS and Android builds and managing App Store Connect releases.",
      "Designed and deployed a Node.js backend on AWS EC2 powering live predictions and LLM-generated commentary, with on-device QA via AWS Device Farm.",
    ],
    stack: [
      "React Native",
      "Expo",
      "EAS",
      "TypeScript",
      "LiveKit",
      "ElevenLabs",
      "WebRTC",
      "Node.js",
      "LLM APIs",
      "AWS EC2",
      "AWS Device Farm",
      "App Store Connect",
    ],
  },
  {
    role: "Senior Web & Mobile Developer",
    company: "Business Brokerage Services, LLC",
    period: "Jan 2023 - Feb 2026",
    duration: "3 yrs 2 mos",
    focus: "Full-stack product · RAG · Scale",
    bullets: [
      "Led end-to-end design, development and delivery of scalable web and mobile applications serving 100,000+ active users with React, Next.js, TypeScript, React Native and Flutter.",
      "Architected and shipped AI-powered features (LLM integrations and RAG-based search and assistant workflows using OpenAI and vector databases) from prototype to production.",
      "Boosted application performance by 40%+ and cut load times by 35% through code splitting, lazy loading, caching and asset optimisation.",
      "Mentored 3 to 5 junior engineers (+25% team productivity) and refactored legacy codebases, reducing production bug rates by 30%.",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux",
      "Tailwind CSS",
      "React Native",
      "Flutter",
      "Node.js",
      "OpenAI",
      "RAG",
      "Vector DB",
      "PostgreSQL",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "Dazzle Lab",
    period: "Jan 2021 - Dec 2022",
    duration: "2 yrs",
    focus: "APIs · Databases · 0→1",
    bullets: [
      "Built and shipped full-cycle web and mobile applications in a fast-paced startup, owning features from concept to production for 1,000+ active users.",
      "Designed and optimised RESTful APIs with Node.js, Express and Python (Django), reducing average API response time by 40%.",
      "Engineered scalable database schemas in PostgreSQL and MongoDB and delivered 10+ features with third-party and AI API integrations, improving query efficiency by 30%.",
    ],
    stack: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "REST API",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "Git",
    ],
  },
  {
    role: "Frontend Developer",
    company: "UpdatedAI",
    period: "Jul 2019 - Dec 2020",
    duration: "1 yr 6 mos",
    focus: "React architecture · Performance",
    bullets: [
      "Developed and deployed 5+ production-grade React applications with a scalable, reusable, TypeScript-based component architecture.",
      "Improved page-load performance by 30-40% through lazy loading, code splitting and bundle analysis.",
      "Integrated 20+ third-party APIs and standardised a reusable component library, cutting UI inconsistencies by 35% and lifting engagement by 25%.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Redux",
      "Webpack",
      "REST APIs",
      "Component library",
      "Code splitting",
      "Bundle analysis",
    ],
  },
  {
    role: "Junior Web Developer",
    company: "AskHandle",
    period: "Nov 2018 - Jun 2019",
    duration: "8 mos",
    focus: "Responsive UI · Accessibility",
    bullets: [
      "Built 10+ responsive, accessible web pages (+25% mobile usability) and contributed to a shared React component library that cut development time by 15%.",
      "Integrated REST APIs (+20% data-loading speed), resolved UI/UX defects and delivered 90%+ of tasks on time in an Agile/Scrum workflow.",
    ],
    stack: [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "SCSS",
      "REST APIs",
      "Accessibility",
      "Agile / Scrum",
      "Git",
    ],
  },
];

export const education = {
  degree: "Bachelor's Degree in Computer Science",
  school: "Institute of Social and Political Science, Jakarta",
  period: "2017 - 2019",
};

export const marqueeTech = [
  "React",
  "Next.js",
  "Vue.js",
  "TypeScript",
  "React Native",
  "Expo",
  "Flutter",
  "Ionic",
  "Swift",
  "Kotlin",
  "Node.js",
  "Python",
  "FastAPI",
  "Django",
  "Laravel",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "GraphQL",
  "WebSockets",
  "OpenAI",
  "Anthropic",
  "LangChain",
  "RAG",
  "Vector DBs",
  "LiveKit",
  "ElevenLabs",
  "AWS",
  "Docker",
  "Tailwind CSS",
];

/** Scripted agent traces used by the interactive AI Agent Lab section. */
export type AgentScenario = {
  id: string;
  prompt: string;
  label: string;
  steps: {
    node: "plan" | "retrieve" | "reason" | "tool" | "speak";
    label: string;
    lines: string[];
  }[];
};

export const agentScenarios: AgentScenario[] = [
  {
    id: "voice",
    label: "Real-time voice agent",
    prompt: "Give me live commentary for the match happening right now.",
    steps: [
      {
        node: "plan",
        label: "Plan",
        lines: [
          "intent  → live_commentary",
          "budget  → 300ms end-to-end target",
          "route   → streaming pipeline",
        ],
      },
      {
        node: "retrieve",
        label: "Retrieve",
        lines: [
          "vector_search(k=6, ns='match_events')",
          "hit  0.94  · 3 goals, 1 red card",
          "hit  0.91  · momentum shift 68'",
        ],
      },
      {
        node: "reason",
        label: "Reason",
        lines: [
          "llm.stream(model='claude', temp=0.7)",
          "persona → anime sports announcer",
          "tokens streaming ▁▂▃▅▆▇",
        ],
      },
      {
        node: "tool",
        label: "Act",
        lines: [
          "call predictions.next_scorer()",
          "→ 0.62 confidence, player #9",
          "merge into narration buffer",
        ],
      },
      {
        node: "speak",
        label: "Speak",
        lines: [
          "elevenlabs.tts(stream=true)",
          "livekit.publish(track='audio')",
          "✓ first audio frame in 280ms",
        ],
      },
    ],
  },
  {
    id: "rag",
    label: "RAG knowledge assistant",
    prompt: "Summarise every listing that matches this buyer's criteria.",
    steps: [
      {
        node: "plan",
        label: "Plan",
        lines: [
          "intent  → multi_doc_summary",
          "decompose → 3 sub-queries",
          "guardrail → cite or abstain",
        ],
      },
      {
        node: "retrieve",
        label: "Retrieve",
        lines: [
          "embed(query) → 1536-d",
          "pgvector ANN search, k=24",
          "rerank → top 8 chunks kept",
        ],
      },
      {
        node: "reason",
        label: "Reason",
        lines: [
          "grounded_generate(chunks=8)",
          "verify → 8/8 claims cited",
          "drop 2 low-confidence spans",
        ],
      },
      {
        node: "tool",
        label: "Act",
        lines: [
          "call crm.tag_matches(buyer_id)",
          "→ 12 listings tagged",
          "schedule follow-up digest",
        ],
      },
      {
        node: "speak",
        label: "Deliver",
        lines: [
          "stream → Next.js RSC client",
          "render citations inline",
          "✓ answer delivered, 0 hallucinations",
        ],
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile release pipeline",
    prompt: "Ship this build to TestFlight and the Play Console.",
    steps: [
      {
        node: "plan",
        label: "Plan",
        lines: [
          "intent  → cross_platform_release",
          "targets → iOS 17+, Android 10+",
          "channel → internal testing",
        ],
      },
      {
        node: "retrieve",
        label: "Inspect",
        lines: [
          "read expo config + native mods",
          "diff since last tag: 27 commits",
          "flag 1 breaking native dep",
        ],
      },
      {
        node: "reason",
        label: "Verify",
        lines: [
          "run typecheck + unit suite",
          "aws device_farm.run(devices=12)",
          "✓ 12/12 devices green",
        ],
      },
      {
        node: "tool",
        label: "Build",
        lines: [
          "eas build --platform all",
          "sign + upload artifacts",
          "bump version 2.4.0 → 2.4.1",
        ],
      },
      {
        node: "speak",
        label: "Ship",
        lines: [
          "submit → App Store Connect",
          "submit → Play Console",
          "✓ live for testers in 14 min",
        ],
      },
    ],
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Understand the product",
    body: "Before any code, I want the user, the constraint and the metric. Most engineering waste is precision applied to the wrong problem.",
  },
  {
    n: "02",
    title: "Design the seams",
    body: "API contracts, data models and state boundaries first. Get the seams right and the features slot in; get them wrong and every sprint pays rent.",
  },
  {
    n: "03",
    title: "Ship thin, then thicken",
    body: "A narrow slice all the way to production beats a wide slice stuck in staging. AI tooling makes the first pass fast. Judgement makes it correct.",
  },
  {
    n: "04",
    title: "Measure and tighten",
    body: "Load times, response times, bug rates, retention. Every number on this page came from watching one and refusing to look away.",
  },
];
