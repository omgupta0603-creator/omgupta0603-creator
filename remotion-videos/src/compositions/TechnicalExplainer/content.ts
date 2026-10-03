/**
 * All on-screen copy for "What is Technical SEO?", taken from the script.
 * URLs and metric values are illustrative examples.
 * Edit text here; layout and animation live in scenes/ and visuals/.
 */
export const content = {
  title: {
    eyebrow: "SEO BASICS · TECHNICAL",
    line1: "What is Technical SEO?",
    line2: "and why it matters for your website",
  },
  definition: {
    lead: "Optimizing the technical foundation of a website so search engines can…",
    pillars: ["Crawl", "Understand", "Index"],
    foundation: "Technical foundation",
    roof: "Good experience for users",
  },
  simple: {
    label: "In simple words",
    lead: "Technical SEO makes sure search engines can",
    highlight: "access and understand our website properly.",
    elementsLabel: "Important areas",
    elements: [
      "Crawling & indexing",
      "Robots.txt",
      "XML sitemap",
      "Canonicalization",
      "Speed & Core Web Vitals",
      "Mobile optimization",
    ],
  },
  crawl: {
    number: "01",
    title: "Crawling & Indexing",
    body: "Important pages get discovered and indexed; pages that shouldn't appear in search are controlled.",
    pages: [
      { path: "/", indexed: true },
      { path: "/services", indexed: true },
      { path: "/blog", indexed: true },
      { path: "/blog/technical-seo-guide", indexed: true },
      { path: "/cart", indexed: false },
      { path: "/admin", indexed: false },
    ],
  },
  robots: {
    number: "02",
    title: "Robots.txt",
    body: "Crawling instructions telling bots which areas they may or may not access.",
    lines: [
      "User-agent: *",
      "Disallow: /admin/",
      "Disallow: /cart/",
      "Allow: /",
      "",
      "Sitemap: https://yourwebsite.com/sitemap.xml",
    ],
    checks: [
      { path: "/blog/", allowed: true },
      { path: "/admin/", allowed: false },
    ],
  },
  sitemap: {
    number: "03",
    title: "XML Sitemap",
    body: "Helps search engines discover important URLs.",
    urls: [
      "https://yourwebsite.com/",
      "https://yourwebsite.com/services",
      "https://yourwebsite.com/blog",
      "https://yourwebsite.com/contact",
    ],
  },
  canonical: {
    number: "04",
    title: "Canonicalization",
    body: "Tells search engines which version of a page is the preferred one.",
    duplicates: ["/shoes?color=red", "/shoes?utm_source=ad", "/Shoes/"],
    preferred: "/shoes",
    tag: '<link rel="canonical" href="https://yourwebsite.com/shoes">',
  },
  speed: {
    number: "05",
    title: "Speed & Core Web Vitals",
    body: "Pages load efficiently and feel smooth on every device.",
    metrics: [
      { name: "LCP", label: "Loading", value: 1.8, unit: "s", max: 4 },
      { name: "INP", label: "Interactivity", value: 120, unit: "ms", max: 500 },
      {
        name: "CLS",
        label: "Visual stability",
        value: 0.05,
        unit: "",
        max: 0.25,
      },
    ],
  },
  mobile: {
    number: "06",
    title: "Mobile Optimization",
    body: "The website works properly across different screen sizes.",
    badge: "Works on every screen size",
  },
  other: {
    heading: "Other important areas",
    items: [
      { title: "HTTPS", glyph: "https://" },
      { title: "URL structure", glyph: "/a/b" },
      { title: "Redirects", glyph: "301 →" },
      { title: "Broken links", glyph: "404" },
      { title: "Structured data", glyph: "{ }" },
      { title: "JavaScript rendering", glyph: "JS" },
      { title: "Website architecture", glyph: "⌂ ⟶ ▤" },
    ],
  },
  example: {
    label: "For example",
    content: "Excellent content",
    blocked: "Can't be crawled or indexed",
    result: "Search visibility it deserves",
  },
  summary: {
    lead: "In simple terms, Technical SEO builds",
    a: "a strong technical foundation",
    joiner: "that helps search engines",
    b: "crawl, understand, and index a website effectively.",
  },
  thanks: {
    line: "That's a quick overview of Technical SEO.",
    big: "Thank you!",
  },
} as const;
