/**
 * All on-screen copy for "What is AEO?", taken from the script.
 * Questions, answers and sources in the visuals are illustrative examples.
 * Edit text here; layout and animation live in scenes/ and visuals/.
 */
export const content = {
  title: {
    eyebrow: "SEO BASICS · AEO",
    line1: "What is AEO?",
    line2: "and why it matters in modern search",
  },
  definition: {
    words: [
      { letter: "A", word: "Answer" },
      { letter: "E", word: "Engine" },
      { letter: "O", word: "Optimization" },
    ],
    lead: "Content that has a better chance of being",
    flow: ["Understood", "Selected", "Presented"],
    by: "by answer engines and AI-powered search experiences",
  },
  compare: {
    seo: {
      title: "Traditional SEO",
      body: "Helps webpages appear in search engine results",
    },
    aeo: {
      title: "AEO",
      body: "Answers the user's question clearly and directly",
    },
  },
  example: {
    label: "For example",
    query: "What is Technical SEO?",
    answerLabel: "Direct answer",
    answer:
      "Technical SEO is the process of optimizing a website's technical foundation so search engines can crawl, understand, and index its pages.",
    sources: ["yourwebsite.com", "seo-guide.com", "web-basics.org"],
    links: [
      "Technical SEO: A Complete Guide",
      "What Is Technical SEO? | Blog",
      "Technical SEO Checklist",
    ],
    next: "So, how can we optimize for AEO?",
  },
  intent: {
    number: "01",
    title: "Understand Search Intent",
    body: "What is the user actually asking, and what type of answer do they expect?",
    question: "how do I speed up my website?",
    meaning: "Wants practical steps, not a definition",
    formats: ["Definition", "Step-by-step list", "Comparison", "Tool review"],
    pick: 1,
  },
  answers: {
    number: "02",
    title: "Clear, Direct Answers",
    body: "Answer the question quickly, then add context where needed.",
    question: "What is a canonical tag?",
    direct:
      "A canonical tag tells search engines which version of a page is the preferred one.",
    context: ["When to use it", "Common mistakes", "Example code"],
  },
  structure: {
    number: "03",
    title: "Clear Content Structure",
    body: "Descriptive headings, short paragraphs, lists, tables and FAQs.",
    labels: ["Headings", "Short paragraphs", "Bullet points", "Table", "FAQ"],
  },
  depth: {
    number: "04",
    title: "Topical Depth & Authority",
    body: "Cover the important related questions, not just one keyword.",
    hub: "Technical SEO",
    related: [
      "What is crawl budget?",
      "How does robots.txt work?",
      "What are Core Web Vitals?",
      "Do I need an XML sitemap?",
      "What is a canonical tag?",
      "How to fix indexing issues?",
    ],
  },
  trust: {
    number: "05",
    title: "Accurate, Trustworthy Info",
    body: "Support important claims with reliable sources.",
    claim: "Pages that load faster tend to keep visitors engaged longer",
    sources: ["Official documentation", "Published study", "Industry report"],
    updated: "Reviewed & updated",
  },
  schema: {
    number: "TIP",
    title: "Structured Data",
    body: "Helps search engines understand certain content, but doesn't guarantee selection as an answer.",
    lines: [
      "{",
      '  "@type": "FAQPage",',
      '  "mainEntity": [{',
      '    "@type": "Question",',
      '    "name": "What is Technical SEO?",',
      '    "acceptedAnswer": { "@type": "Answer",',
      '      "text": "Optimizing a site\'s technical..." }',
      "  }]",
      "}",
    ],
    helps: "Helps understanding",
    caveat: "No guarantee of selection",
  },
  summary: {
    lead: "SEO helps people discover your content, while AEO focuses on making your content",
    a: "clear, useful, and easy for answer engines",
    joiner: "to understand and use when",
    b: "responding to questions.",
  },
  future: {
    lead: "As search evolves toward AI-powered answers…",
    left: "SEO",
    right: "AEO",
    result: "A stronger search visibility strategy",
  },
  thanks: {
    line: "That's a quick overview of AEO.",
    big: "Thank you!",
  },
} as const;
