/**
 * All on-screen copy for "What is Off-Page SEO?", taken from the script.
 * Edit text here; layout and animation live in scenes/ and visuals/.
 */
export const content = {
  title: {
    eyebrow: "SEO BASICS · OFF-PAGE",
    line1: "What is Off-Page SEO?",
    line2: "and why it matters for your website",
  },
  definition: {
    lead: "Activities performed outside of our website to improve its…",
    site: "your website",
    outside: "OUTSIDE YOUR WEBSITE",
    goals: ["Visibility", "Reputation", "Authority", "Search visibility"],
  },
  compare: {
    label: "In simple words",
    onPage: { title: "On-Page SEO", body: "Optimizing our own website" },
    offPage: {
      title: "Off-Page SEO",
      body: "Building the website's reputation across the internet",
    },
  },
  links: {
    number: "01",
    title: "Link Building",
    body: "A backlink is a link from another website to our website.",
    sources: ["Industry blog", "News website", "Partner site"],
    target: "yourwebsite.com",
    linkLabel: "Relevant · Trustworthy",
    signal: "Search engines: useful & credible",
  },
  quality: {
    heading: "Quality over quantity",
    many: { title: "As many links as possible", count: 250 },
    few: { title: "Relevant, high-quality links", count: 12 },
    factors: ["Relevance", "Quality", "Context"],
  },
  pr: {
    number: "02",
    title: "Digital PR",
    body: "Getting a brand or its expertise mentioned on authoritative platforms.",
    outlet: "INDUSTRY NEWS",
    headline: "5 expert tips on growing organic traffic",
    brand: "YourBrand",
    quote: "explains how small businesses can earn search visibility…",
    platforms: [
      "Publications",
      "News websites",
      "Industry websites",
      "Authoritative platforms",
    ],
  },
  more: {
    heading: "We can also work on…",
    items: [
      "Brand mentions",
      "Business citations",
      "Industry directories",
      "Partnerships",
      "Community participation",
    ],
    footnote: "Depending on the business and SEO strategy",
  },
  local: {
    number: "03",
    title: "Off-Page for Local SEO",
    body: "Consistent business information across directories, plus genuine customer reviews.",
    directories: [
      "Google Business Profile",
      "Local directory",
      "Industry directory",
    ],
    fields: ["Business name", "Address", "Phone"],
    rating: 4.8,
    reviews: 126,
  },
  objective: {
    heading: "The main objective",
    pillars: ["Trust", "Authority", "Relevance", "Brand visibility"],
    footer: "…beyond our own website.",
  },
  summary: {
    lead: "So, in simple terms,",
    a: "On-Page SEO optimizes what is on our website,",
    joiner: "while",
    b: "Off-Page SEO helps build our website's reputation across the web.",
  },
  thanks: {
    line: "That's a quick overview of Off-Page SEO.",
    big: "Thank you!",
  },
} as const;
