/**
 * All on-screen copy for "What is GEO?", taken from the script.
 * Brand names, numbers and sources in the visuals are illustrative examples.
 * NOTE: the script's closing line was cut off ("As search continues to evolve
 * from…"); `future.lead` and `future.result` complete it. Edit them to match
 * your final voiceover.
 */
export const content = {
  title: {
    eyebrow: "SEO BASICS · GEO",
    line1: "What is GEO?",
    line2: "and why it matters for AI search",
  },
  definition: {
    words: [
      { letter: "G", word: "Generative" },
      { letter: "E", word: "Engine" },
      { letter: "O", word: "Optimization" },
    ],
    lead: "A brand's content and online presence, optimized to be",
    flow: ["Understood", "Referenced", "Mentioned"],
    by: "by generative AI and AI-powered search platforms",
  },
  example: {
    label: "For example",
    question:
      "What are the best route planning software for delivery businesses?",
    intro:
      "Here are some popular route planning tools for delivery businesses:",
    brands: [
      { name: "Brand A", note: "Good for small fleets" },
      {
        name: "YourBrand",
        note: "Real-time optimization & tracking",
        you: true,
      },
      { name: "Brand C", note: "Strong integrations" },
    ],
    sources: ["industry-review.com", "logistics-blog.com", "yourbrand.com"],
    next: "So, how can we improve our GEO strategy?",
  },
  quality: {
    number: "01",
    title: "High-Quality, Useful Content",
    body: "Clearly answer user questions and provide genuine value.",
    heading: "How to plan delivery routes efficiently",
    checks: [
      "Answers the question clearly",
      "Practical, original insight",
      "Genuinely useful for the reader",
    ],
  },
  topical: {
    number: "02",
    title: "Topical Authority",
    body: "Cover the topic comprehensively, not just one keyword.",
    hub: "Route planning",
    groups: [
      {
        name: "Related questions",
        items: ["How to reduce delivery time?", "What is route optimization?"],
      },
      { name: "Use cases", items: ["Food delivery", "Field service"] },
      {
        name: "Comparisons",
        items: ["Manual vs software", "Tool A vs Tool B"],
      },
      {
        name: "Industry insights",
        items: ["Last-mile trends", "Fuel cost data"],
      },
    ],
  },
  readable: {
    number: "03",
    title: "Easy for AI to Understand",
    body: "Clear headings, concise answers, structured info, statistics and FAQs.",
    elements: [
      "Clear headings",
      "Concise answers",
      "Structured information",
      "Statistics",
      "FAQs",
    ],
  },
  brand: {
    number: "04",
    title: "Brand Authority & Mentions",
    body: "Trusted sources across the web contribute to a stronger online presence.",
    brand: "YourBrand",
    sources: [
      "Publications",
      "Industry websites",
      "Reviews",
      "Communities",
      "Trusted sources",
    ],
    mentions: 128,
  },
  fresh: {
    number: "05",
    title: "Accurate & Up-to-Date Info",
    body: "Fresh content, consistent brand information and reliable sources.",
    updatedFrom: "Updated: 2023",
    updatedTo: "Updated: Oct 2026",
    profiles: ["Website", "Business listing", "Social profile"],
    field: "Founded 2018 · Delhi · 24/7 support",
    sources: "Reliable sources cited",
  },
  summary: {
    heading: "In simple terms",
    cards: [
      { name: "SEO", focus: "Improves visibility in search engines" },
      { name: "AEO", focus: "Provides direct answers" },
      {
        name: "GEO",
        focus: "Gets your brand represented in AI-generated answers",
      },
    ],
  },
  future: {
    lead: "As search evolves from links to AI-generated answers…",
    parts: ["SEO", "AEO", "GEO"],
    result: "A stronger visibility strategy",
  },
  thanks: {
    line: "That's a quick overview of GEO.",
    big: "Thank you!",
  },
} as const;
