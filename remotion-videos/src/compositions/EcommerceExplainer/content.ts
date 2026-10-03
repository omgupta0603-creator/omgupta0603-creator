/**
 * All on-screen copy for "What is E-commerce SEO?", taken from the script.
 * Store, product names, prices and counts are illustrative examples.
 * Edit text here; layout and animation live in scenes/ and visuals/.
 */
export const content = {
  title: {
    eyebrow: "SEO BASICS · E-COMMERCE",
    line1: "What is E-commerce SEO?",
    line2: "and why it matters for online stores",
  },
  definition: {
    lead: "Optimizing an online store to improve organic visibility",
    store: "Online store",
    categories: ["Category pages", "Product pages", "Other important pages"],
    leaves: [
      ["Running shoes", "Cotton shirts"],
      ["Runner shoe", "Oxford shirt"],
      ["Size guide", "Blog"],
    ],
    caption: "Attract users who are searching for products",
  },
  example: {
    label: "For example",
    queries: [
      {
        q: "buy running shoes online",
        url: "yourstore.com › running-shoes",
        title: "Running Shoes: Buy Online | YourStore",
        products: ["Runner", "Trail", "Road", "Racer"],
      },
      {
        q: "men's cotton shirts",
        url: "yourstore.com › mens › cotton-shirts",
        title: "Men's Cotton Shirts | YourStore",
        products: ["Oxford", "Linen mix", "Poplin", "Casual"],
      },
    ],
  },
  keywords: {
    number: "01",
    title: "Keyword Research",
    body: "Keywords based on product, category, search intent and the customer journey.",
    bases: ["Product", "Category", "Search intent", "Customer journey"],
    journey: [
      { stage: "Discover", keyword: "how to choose running shoes" },
      { stage: "Compare", keyword: "best running shoes for beginners" },
      { stage: "Buy", keyword: "buy running shoes online" },
    ],
  },
  category: {
    number: "02",
    title: "Category Pages",
    body: "Clear titles, headings, useful content, internal links and an easy structure.",
    tab: "Men's Running Shoes | YourStore",
    h1: "Men's Running Shoes",
    links: ["Trail shoes", "Running socks"],
    labels: [
      "Title",
      "Heading",
      "Useful content",
      "Internal links",
      "Easy structure",
    ],
  },
  product: {
    number: "03",
    title: "Product Pages",
    body: "Titles, descriptions, images, URLs, headings and other page elements.",
    url: "yourstore.com/running-shoes/lightweight-runner",
    name: "Lightweight Runner: Men's Running Shoe",
    price: "$49.99",
    labels: ["Product title", "Description", "Images", "URL", "Headings"],
  },
  technical: {
    number: "04",
    title: "Technical SEO",
    body: "Thousands of URLs need careful crawl and index management.",
    urlCount: 12480,
    items: [
      "Crawling",
      "Indexing",
      "Duplicate content",
      "Canonical tags",
      "XML sitemaps",
      "Redirects",
      "Faceted navigation",
    ],
    facet: "/running-shoes?color=blue&size=10",
    canonical: "/running-shoes",
  },
  linking: {
    number: "05",
    title: "Internal Linking",
    body: "Helps users and search engines discover related products and categories.",
    hub: "Running shoes",
    nodes: [
      "Lightweight Runner",
      "Trail Pro",
      "Road Racer",
      "Running socks",
      "Sports watches",
      "Trail shoes",
    ],
  },
  schema: {
    number: "06",
    title: "Product Schema",
    body: "Structured data that describes price, availability and reviews.",
    lines: [
      "{",
      '  "@type": "Product",',
      '  "name": "Lightweight Runner",',
      '  "offers": { "price": "49.99",',
      '              "availability": "InStock" },',
      '  "aggregateRating": { "ratingValue": "4.6",',
      '                       "reviewCount": "212" }',
      "}",
    ],
    url: "yourstore.com › running-shoes › lightweight-runner",
    resultTitle: "Lightweight Runner: Men's Running Shoe | YourStore",
    rating: "4.6",
    reviews: "212 reviews",
    price: "$49.99",
    stock: "In stock",
  },
  ux: {
    heading: "User experience & performance",
    cards: [
      { title: "Mobile usability", value: "✓" },
      { title: "Page speed", value: "1.2 s" },
      { title: "Navigation", value: "☰" },
    ],
    journeyLabel: "A smooth shopping journey",
    journey: ["Browse", "Product", "Cart", "Checkout"],
  },
  summary: {
    lead: "E-commerce SEO is about making an online store easier to",
    a: "discover, understand, navigate, and use",
    joiner: "while improving its visibility for",
    b: "relevant product searches.",
  },
  thanks: {
    line: "That's a quick overview of E-commerce SEO.",
    big: "Thank you!",
  },
} as const;
