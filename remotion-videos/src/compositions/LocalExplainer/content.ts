/**
 * All on-screen copy for "What is Local SEO?", taken from the script.
 * Business names, reviews and listings are illustrative examples.
 * Edit text here; layout and animation live in scenes/ and visuals/.
 */
export const content = {
  title: {
    eyebrow: "SEO BASICS · LOCAL",
    line1: "What is Local SEO?",
    line2: "and why it matters for businesses",
  },
  definition: {
    words: [
      { letter: "L", word: "Local" },
      { letter: "S", word: "Search" },
      { letter: "E", word: "Engine" },
      { letter: "O", word: "Optimization" },
    ],
    body: "Optimizing a business's online presence to improve its visibility in",
    highlight: "location-based searches.",
  },
  example: {
    label: "For example",
    queries: [
      "dentist near me",
      "SEO company in Noida",
      "best restaurant in Delhi",
    ],
    results: [
      { name: "Bright Smile Dental", distance: "0.4 km", rating: "4.8" },
      { name: "City Dental Care", distance: "1.1 km", rating: "4.6" },
      { name: "Family Dental Clinic", distance: "1.8 km", rating: "4.5" },
    ],
    factors: ["User's location", "Search intent"],
  },
  gbp: {
    number: "01",
    title: "Google Business Profile",
    body: "Accurate, up-to-date business information.",
    business: "Bright Smile Dental",
    category: "Dentist · Noida",
    fields: [
      "Business name",
      "Address",
      "Phone number",
      "Website",
      "Business category",
      "Services",
      "Working hours",
      "Photos",
    ],
    badge: "Accurate & up to date",
  },
  keywords: {
    number: "02",
    title: "Local Keyword Optimization",
    body: "Service pages and location pages built around relevant local searches.",
    pairs: [
      {
        query: "SEO services in Delhi",
        type: "Service page",
        url: "/seo-services-delhi",
        h1: "SEO Services in Delhi",
      },
      {
        query: "skin clinic in Noida",
        type: "Location page",
        url: "/skin-clinic-noida",
        h1: "Skin Clinic in Noida",
      },
    ],
  },
  reviews: {
    number: "03",
    title: "Customer Reviews",
    body: "Genuine reviews help customers understand the business.",
    items: [
      { text: "Friendly staff and clear explanations.", stars: 5 },
      { text: "Quick appointment, very professional.", stars: 5 },
      { text: "Easy to find and great service.", stars: 4 },
    ],
    from: 4.2,
    to: 4.8,
    count: 126,
  },
  citations: {
    number: "04",
    title: "Local Citations",
    body: "Business information on relevant directories and websites, kept consistent.",
    rows: [
      "Google Business Profile",
      "Local directory",
      "Industry directory",
      "Maps app",
    ],
    name: "Bright Smile Dental",
    address: "Sector 18, Noida",
    phone: "+91 00000 00000",
    wrongPhone: "+91 00000 11111",
    badge: "Consistency matters",
  },
  other: {
    heading: "Other activities",
    items: [
      "Local link building",
      "Location-specific content",
      "Optimizing images",
      "Website experience for local users",
    ],
  },
  summary: {
    lead: "In simple terms, Local SEO helps a business get discovered by",
    a: "the right customers in the right location",
    joiner: "when they are searching for",
    b: "relevant products or services.",
  },
  strategy: {
    lead: "Have a local business?",
    line: "Local SEO can be an important part of your overall digital marketing strategy.",
    center: "Digital marketing strategy",
    segments: ["Local SEO", "Content", "Social media", "Paid ads", "Email"],
  },
  thanks: {
    line: "That's a quick overview of Local SEO.",
    big: "Thank you!",
  },
} as const;
