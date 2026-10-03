/**
 * All on-screen copy for "SEO Strategy", taken from the script.
 * Scores, counts and keywords in the visuals are illustrative examples.
 * Edit text here; layout and animation live in scenes/ and visuals/.
 */
export const content = {
  title: {
    eyebrow: "SEO BASICS · STRATEGY",
    line1: "SEO Strategy",
    line2: "8 steps to a basic SEO plan",
  },
  roadmap: {
    lead: "A basic SEO strategy usually follows these steps",
    recapLead: "The SEO strategy roadmap",
    loop: "Continuously improve",
  },
  steps: [
    {
      number: "01",
      title: "Website Audit",
      short: "Audit",
      body: "Identify technical, content, and authority-related issues.",
    },
    {
      number: "02",
      title: "Keyword Research",
      short: "Keywords",
      body: "Relevant keywords based on search intent, competition, relevance, and business goals.",
    },
    {
      number: "03",
      title: "Competitor Analysis",
      short: "Competitors",
      body: "Analyze competitors' content, keywords, backlinks, structure, and search visibility.",
    },
    {
      number: "04",
      title: "On-Page Optimization",
      short: "On-page",
      body: "Optimize titles, headings, content, URLs, internal links, images, and other page elements.",
    },
    {
      number: "05",
      title: "Technical Optimization",
      short: "Technical",
      body: "Improve crawlability, indexability, performance, structured data, and other technical elements.",
    },
    {
      number: "06",
      title: "Content Strategy",
      short: "Content",
      body: "Create useful content that addresses the needs and search intent of the target audience.",
    },
    {
      number: "07",
      title: "Off-Page & Digital PR",
      short: "Off-page & PR",
      body: "Build relevant authority through legitimate links, digital PR, brand mentions, and other appropriate activities.",
    },
    {
      number: "08",
      title: "Measurement & Improvement",
      short: "Measure",
      body: "Track the KPIs that matter, then continuously improve the strategy.",
    },
  ],
  audit: {
    areas: [
      { name: "Technical", issues: 12, score: 64 },
      { name: "Content", issues: 8, score: 71 },
      { name: "Authority", issues: 5, score: 58 },
    ],
  },
  keywords: {
    columns: ["Keyword", "Intent", "Competition", "Relevant", "Goal fit"],
    rows: [
      {
        kw: "seo audit services",
        intent: "Commercial",
        comp: "Medium",
        rel: true,
        goal: true,
        pick: true,
      },
      {
        kw: "what is technical seo",
        intent: "Informational",
        comp: "Low",
        rel: true,
        goal: true,
        pick: true,
      },
      {
        kw: "free seo tools",
        intent: "Informational",
        comp: "High",
        rel: true,
        goal: false,
        pick: false,
      },
      {
        kw: "hire seo agency delhi",
        intent: "Transactional",
        comp: "Medium",
        rel: true,
        goal: true,
        pick: true,
      },
    ],
  },
  competitors: {
    metrics: ["Content", "Keywords", "Backlinks", "Structure", "Visibility"],
    sites: [
      { name: "You", values: [0.55, 0.5, 0.4, 0.7, 0.45] },
      { name: "Competitor A", values: [0.8, 0.75, 0.7, 0.6, 0.8] },
      { name: "Competitor B", values: [0.6, 0.65, 0.85, 0.5, 0.65] },
    ],
  },
  onpage: {
    items: [
      "Titles",
      "Headings",
      "Content",
      "URLs",
      "Internal links",
      "Images",
    ],
  },
  technical: {
    items: [
      { name: "Crawlability", from: 0.45, to: 0.95 },
      { name: "Indexability", from: 0.55, to: 0.92 },
      { name: "Performance", from: 0.35, to: 0.88 },
      { name: "Structured data", from: 0.2, to: 0.9 },
    ],
  },
  content: {
    columns: ["Audience need", "Search intent", "Content"],
    rows: [
      {
        need: "How do I start with SEO?",
        intent: "Informational",
        piece: "Beginner's guide",
      },
      {
        need: "Which tool should I use?",
        intent: "Commercial",
        piece: "Comparison page",
      },
      {
        need: "Can you do this for me?",
        intent: "Transactional",
        piece: "Service page",
      },
    ],
  },
  offpage: {
    sources: [
      "Legitimate links",
      "Digital PR",
      "Brand mentions",
      "Other activities",
    ],
    target: "Your site",
  },
  measure: {
    kpis: [
      { name: "Organic traffic", value: "+38%" },
      { name: "Rankings", value: "Top 10: 42" },
      { name: "Impressions", value: "1.2M" },
      { name: "Clicks", value: "46K" },
      { name: "Conversions", value: "+21%" },
      { name: "Indexed pages", value: "1,180" },
    ],
    loop: "Continuously improve",
  },
  thanks: {
    line: "That's a basic SEO strategy, step by step.",
    big: "Thank you!",
  },
} as const;
