/**
 * All on-screen copy for the SEO explainer, taken from the script.
 * Edit text here; layout and animation live in scenes/ and visuals/.
 */
export const content = {
  title: {
    eyebrow: "SEO BASICS",
    line1: "What is SEO",
    line2: "and what are its types?",
  },
  definition: {
    letters: [
      { letter: "S", word: "Search" },
      { letter: "E", word: "Engine" },
      { letter: "O", word: "Optimization" },
    ],
    body: "The process of optimizing a website to improve its visibility in search results and attract more relevant",
    highlight: "organic traffic.",
  },
  example: {
    label: "For example",
    query: "best SEO company in Delhi",
    caption:
      "SEO helps a relevant business improve its chances of appearing here.",
    results: [
      { title: "Top 10 SEO Agencies in Delhi", url: "directory-listing.com" },
      { title: "SEO Services Company in Delhi", url: "competitor.in" },
      {
        title: "Your Business: Expert SEO in Delhi",
        url: "yourbusiness.com",
        isYou: true,
      },
    ],
  },
  onPage: {
    number: "01",
    title: "On-Page SEO",
    body: "Optimizing elements within the website.",
  },
  technical: {
    number: "02",
    title: "Technical SEO",
    body: "The technical health of the website.",
    items: [
      "Crawling",
      "Indexing",
      "Site speed",
      "Mobile-friendliness",
      "XML sitemaps",
      "robots.txt",
      "Canonical tags",
      "Structured data",
    ],
  },
  offPage: {
    number: "03",
    title: "Off-Page SEO",
    body: "Activities outside the website that help build authority.",
    sources: ["Link building", "Digital PR", "Brand mentions", "Citations"],
  },
  local: {
    number: "04",
    title: "Local SEO",
    body: "Visibility in location-based searches.",
    queries: ["dentist near me", "SEO company in Noida"],
  },
  more: {
    heading: "There's also…",
    international: {
      title: "International SEO",
      body: "Targeting users across different countries and languages.",
      tags: ["IN", "US", "UK", "DE", "FR", "AE"],
    },
    ecommerce: {
      title: "E-commerce SEO",
      body: "Visibility for online stores, product pages and category pages.",
    },
  },
  summary: {
    lead: "In simple words, SEO is about making your website",
    a: "easier for search engines to understand",
    joiner: "and",
    b: "more useful for users to find.",
  },
  thanks: {
    line: "That's a quick overview of SEO and its major types.",
    big: "Thank you!",
  },
} as const;
