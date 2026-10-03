/**
 * All on-screen copy for "What is International SEO?", taken from the script.
 * Domains, prices and search terms are illustrative examples.
 * Edit text here; layout and animation live in scenes/ and visuals/.
 */
export const content = {
  title: {
    eyebrow: "SEO BASICS · INTERNATIONAL",
    line1: "What is International SEO?",
    line2: "and why it matters globally",
  },
  definition: {
    lead: "Optimizing a website to target users in different…",
    targets: ["Countries", "Regions", "Languages"],
    pages: [
      { code: "en-in", label: "India" },
      { code: "en-us", label: "United States" },
      { code: "en-gb", label: "United Kingdom" },
    ],
    caption: "The right content for the right audience",
  },
  example: {
    label: "For example",
    markets: [
      {
        code: "IN",
        name: "India",
        search: "mobile phone price",
        language: "English · Hindi",
        currency: "₹ INR",
      },
      {
        code: "US",
        name: "United States",
        search: "cell phone deals",
        language: "English (US)",
        currency: "$ USD",
      },
      {
        code: "UK",
        name: "United Kingdom",
        search: "mobile phone contract",
        language: "English (UK)",
        currency: "£ GBP",
      },
    ],
    rows: ["Searches for", "Language", "Currency"],
    footer: "A suitable search strategy for each target market",
  },
  targeting: {
    number: "01",
    title: "Country & Language Targeting",
    body: "Clearly show which version of a page is meant for which country or language.",
    versions: [
      { user: "IN", path: "/en-in/", label: "India · English" },
      { user: "US", path: "/en-us/", label: "United States · English" },
      { user: "UK", path: "/en-gb/", label: "United Kingdom · English" },
    ],
  },
  hreflang: {
    number: "02",
    title: "Hreflang",
    body: "Tells search engines the language and region of each version of similar pages.",
    lines: [
      '<link rel="alternate" hreflang="en-in"',
      '      href="https://yourwebsite.com/en-in/" />',
      '<link rel="alternate" hreflang="en-us"',
      '      href="https://yourwebsite.com/en-us/" />',
      '<link rel="alternate" hreflang="en-gb"',
      '      href="https://yourwebsite.com/en-gb/" />',
      '<link rel="alternate" hreflang="x-default"',
      '      href="https://yourwebsite.com/" />',
    ],
    understood: [
      "English · India",
      "English · US",
      "English · UK",
      "Default version",
    ],
  },
  keywords: {
    number: "03",
    title: "International Keyword Research",
    body: "Don't just translate keywords. Research what people search in each market.",
    source: "mobile phone",
    translated: "Mobiltelefon",
    translatedNote: "Literal translation",
    researched: "Handy",
    researchedNote: "What many people in Germany actually search",
    markets: [
      { code: "US", term: "cell phone" },
      { code: "UK", term: "mobile phone" },
      { code: "DE", term: "Handy" },
    ],
  },
  urls: {
    number: "04",
    title: "URL Structure",
    body: "Choose an approach based on your requirements and overall website strategy.",
    options: [
      {
        name: "Country-code domain",
        before: "yourbrand",
        part: ".de",
        after: "",
      },
      { name: "Subdomain", before: "", part: "de.", after: "yourbrand.com" },
      {
        name: "Subdirectory",
        before: "yourbrand.com",
        part: "/de/",
        after: "",
      },
    ],
  },
  localization: {
    number: "05",
    title: "Content Localization",
    body: "Adapt, don't just translate.",
    versions: [
      {
        code: "US",
        product: "Running sneakers",
        price: "$49",
        note: "Color: Blue",
      },
      {
        code: "UK",
        product: "Running trainers",
        price: "£39",
        note: "Colour: Blue",
      },
      {
        code: "IN",
        product: "Running sports shoes",
        price: "₹3,999",
        note: "Colour: Blue",
      },
    ],
    aspects: [
      "Language",
      "Culture",
      "Terminology",
      "Currency",
      "User expectations",
    ],
  },
  other: {
    heading: "Other considerations",
    items: [
      { title: "Local backlinks", glyph: "↗ .de" },
      { title: "Regional content", glyph: "/de/blog" },
      { title: "Structured data", glyph: "{ }" },
      { title: "Technical configuration", glyph: "config" },
      { title: "Local search behavior", glyph: "?q=" },
    ],
  },
  summary: {
    lead: "International SEO helps businesses make their website",
    a: "accessible, relevant, and search-friendly",
    joiner: "for audiences across",
    b: "different countries and languages.",
  },
  thanks: {
    line: "That's a quick overview of International SEO.",
    big: "Thank you!",
  },
} as const;
