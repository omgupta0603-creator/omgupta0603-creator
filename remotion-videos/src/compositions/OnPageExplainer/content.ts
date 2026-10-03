/**
 * All on-screen copy for "What is On-Page SEO?", taken from the script.
 * Edit text here; layout and animation live in scenes/ and visuals/.
 */
export const content = {
  title: {
    eyebrow: "SEO BASICS · ON-PAGE",
    line1: "What is On-Page SEO?",
    line2: "and why it matters for your website",
  },
  definition: {
    lead: "Optimizing individual web pages to…",
    benefits: [
      { title: "Improve visibility", body: "in search engines" },
      { title: "Provide a better experience", body: "for users" },
    ],
  },
  simple: {
    label: "In simple words",
    lead: "Optimizing the content and elements present",
    highlight: "on our website.",
    elementsLabel: "Important elements",
    elements: [
      "Keyword optimization",
      "Title tag",
      "Meta description",
      "Heading structure",
      "Content optimization",
      "Internal linking",
    ],
  },
  keyword: {
    number: "01",
    title: "Keyword Optimization",
    body: "Relevant keywords based on search intent, used naturally, without keyword stuffing.",
    keyword: "on-page seo",
    intent: "Search intent: learn what on-page SEO is",
    placements: [
      "Title tag",
      "H1 heading",
      "First paragraph",
      "URL",
      "Image alt text",
    ],
    stuffing: "on-page seo on-page seo best on-page seo…",
  },
  titleTag: {
    number: "02",
    title: "Title Tag",
    body: "Clearly describes the page and matches the user's search query.",
    query: "what is on-page seo",
    url: "yourwebsite.com › blog › on-page-seo",
    titleText: "What is On-Page SEO? A Simple Guide for Beginners",
    maxChars: 60,
  },
  meta: {
    number: "03",
    title: "Meta Description",
    body: "A quick summary of the page that encourages users to click.",
    url: "yourwebsite.com › blog › on-page-seo",
    titleText: "What is On-Page SEO? A Simple Guide for Beginners",
    description:
      "Learn what on-page SEO is, why it matters, and how to optimize keywords, titles, headings, content and internal links. Easy examples inside.",
  },
  headings: {
    number: "04",
    title: "Heading Structure",
    body: "H1, H2 and H3 headings organize content for users and search engines.",
    tree: [
      { level: "H1", text: "What is On-Page SEO?" },
      { level: "H2", text: "Why On-Page SEO matters" },
      { level: "H2", text: "Key on-page elements" },
      { level: "H3", text: "Title tags" },
      { level: "H3", text: "Meta descriptions" },
      { level: "H2", text: "Conclusion" },
    ],
  },
  content: {
    number: "05",
    title: "Content Optimization",
    body: "Content that truly helps the reader and matches their intent.",
    qualities: [
      "Original",
      "Useful",
      "Relevant",
      "Easy to understand",
      "Matches search intent",
    ],
  },
  linking: {
    number: "06",
    title: "Internal Linking",
    body: "Connect related pages so users can navigate and search engines can discover them.",
    pages: [
      "Home",
      "Blog",
      "On-Page SEO",
      "Technical SEO",
      "Services",
      "Contact",
    ],
  },
  other: {
    heading: "Other important elements",
    items: [
      { title: "URL optimization", detail: "/on-page-seo-guide" },
      { title: "Image optimization", detail: "1.2 MB → 180 KB" },
      { title: "Alt text", detail: 'alt="on-page seo checklist"' },
      { title: "Schema markup", detail: '{ "@type": "Article" }' },
      {
        title: "Content readability",
        detail: "Short sentences · clear headings",
      },
    ],
  },
  summary: {
    lead: "On-Page SEO is about optimizing every important element of a webpage so that",
    a: "search engines can understand the page",
    joiner: "and",
    b: "users can easily find and consume valuable information.",
  },
  thanks: {
    line: "That's the basic concept of On-Page SEO.",
    big: "Thank you!",
  },
} as const;
