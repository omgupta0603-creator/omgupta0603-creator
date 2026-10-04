/**
 * All on-screen text for the "Why Use Claude for Digital Marketing" graphics
 * pack. [TEXT] lines are verbatim from the script; edit them here.
 */
export const content = {
  channel: "Hidden Marketing 360",

  hook: {
    opener: "In today's fast-paced digital world…",
    authors: ["Marketer A", "Marketer B", "Marketer C"],
    rest: [
      "AI is changing everything. Here are 5 ways to elevate your brand…",
      "it's time to unlock the power of content. Let's dive in…",
      "every brand needs to stand out. Here's how to elevate…",
    ],
    question: "Sabka content same kyun lagta hai?",
  },

  sting: { tagline: "Real workflows. Real client work." },

  agenda: {
    title: "Aaj ka agenda",
    items: [
      "Ek tool pe depend rehne ki problem",
      "Claude kya hai, kahan strong hai",
      "5 real use cases (screen demo)",
      "Honest limitations",
      "Prompt formula",
    ],
  },

  problems: [
    {
      label: "Problem 1",
      title: "Generic output",
      words: ["unlock", "elevate", "in today's world"],
      quote: "“ye AI ka likha hai.”",
    },
    {
      label: "Problem 2",
      title: "Har baar context dobara",
      chats: ["New chat", "New chat", "New chat"],
      context: ["Brand details", "Tone", "Audience"],
      footer: "Time waste",
    },
    {
      label: "Problem 3",
      title: "Badi files, adhoori analysis",
      files: [
        { name: "Search Console export.csv", meta: "Poora export" },
        { name: "Competitor blog 1", meta: "3,200 words" },
        { name: "Competitor blog 2", meta: "2,800 words" },
        { name: "Competitor blog 3", meta: "4,100 words" },
      ],
      status: "Analysis adhoora",
    },
  ],

  strengths: {
    title: "Claude ki 4 strengths",
    subtitle: "(marketers ke liye)",
    items: [
      { name: "Natural writing", line: "Zyada human, kam robotic" },
      { name: "Long documents", line: "Lambi files, PDFs, poore blogs" },
      { name: "Data files", line: "Excel / CSV → insights + charts" },
      { name: "Projects", line: "Brand guidelines ek jagah saved" },
    ],
  },

  useCases: [
    {
      n: 1,
      title: "GSC Data → Insights",
      prompt:
        "Is GSC export mein top 10 pages batao jinke clicks sabse zyada gire. Har page ke liye batao ki problem ranking ki hai ya CTR ki.",
      attachment: "GSC_pages_export.csv",
    },
    {
      n: 2,
      title: "Content Gap Analysis",
      prompt:
        "Mere blog aur competitor ke headings compare karo. Batao kaunse topics mere blog mein missing hain, aur ek improved heading structure suggest karo.",
      attachment: "",
    },
    {
      n: 3,
      title: "Projects = Brand Voice",
      prompt: "Is week ke liye 3 LinkedIn post ideas aur ek full draft do.",
      attachment: "",
      project: "Project: Client Brand",
      knowledge: [
        "Brand guidelines",
        "3 past posts",
        "Target audience",
        "“Ye words kabhi use mat karna”",
      ],
    },
    {
      n: 4,
      title: "FAQs + Meta Tags",
      prompt:
        "Is blog ke content se 8 FAQs banao jo People Also Ask aur AI Overviews mein aa sakein. Har answer 40–60 words. Plus 3 meta title options, 60 characters ke andar.",
      attachment: "",
    },
    {
      n: 5,
      title: "Bina coding ke tool banao",
      prompt:
        "Ek simple ad budget calculator banao. Input: daily budget, CPC, conversion rate. Output: expected clicks aur leads.",
      attachment: "",
    },
  ],

  proTip: {
    label: "Pro tip",
    line: "Answer ko blindly trust mat karo.",
    subHighlight: "2–3 numbers",
    subRest: " apni sheet mein cross-check zaroor karo.",
  },

  limitations: {
    title: "3 cheezein dhyan rakho",
    items: [
      { name: "Free plan ki limits", line: "Heavy use pe wait karna padega" },
      {
        name: "Galti kar sakta hai",
        line: "Numbers verify karo: Semrush, GSC, original source",
      },
      {
        name: "Har kaam ke liye best nahi",
        line: "Ek tool pe depend mat raho",
      },
    ],
  },

  draftDecision: { a: "AI = Draft.", b: "Aap = Decision." },

  rctf: {
    title: "R-C-T-F prompt formula",
    rows: [
      {
        letter: "R",
        meaning: "Role",
        example: "“Tum ek senior SEO strategist ho”",
      },
      {
        letter: "C",
        meaning: "Context",
        example:
          "“Client ek Delhi based dental clinic hai, audience 25–45 age”",
      },
      {
        letter: "T",
        meaning: "Task",
        example: "“Homepage ke liye 5 meta title options do”",
      },
      {
        letter: "F",
        meaning: "Format",
        example:
          "“Table mein do, 60 characters ke andar, ek column mein character count”",
      },
    ],
    footer: "Kisi bhi AI tool mein kaam karega",
  },

  vague: {
    vagueLabel: "Vague prompt",
    vaguePrompt: "Dental clinic ke liye meta title likho",
    vagueOutput: [
      "Welcome to Our Dental Clinic",
      "Best Dental Care Services",
      "Your Smile, Our Priority",
    ],
    rctfLabel: "R-C-T-F prompt",
    rctfPrompt:
      "Senior SEO strategist ho. Client: Delhi dental clinic, audience 25–45. Homepage ke 5 meta titles, table mein, 60 chars ke andar, char count ke saath.",
    rctfOutput: [
      "Dental Clinic in Delhi | Painless Care for Adults",
      "Trusted Delhi Dentist for Braces, Implants & RCT",
      "Book a Dentist in Delhi Today | Same-Day Visits",
    ],
    footer: "Vague prompt = Vague output",
  },

  recap: {
    title: "Quick recap",
    items: [
      "GSC data analysis",
      "Competitor gap analysis",
      "Projects se brand voice",
      "FAQs aur meta tags",
      "Bina coding ke tools",
    ],
    footer: "Aaj se start kar sakte ho",
  },

  comment: {
    title: "Comment: Aapne kaunsa use case try kiya?",
    placeholder: "Add a comment…",
    reply: "PROMPTS",
    hint: "Ready-to-use prompts list chahiye? Comment mein likho:",
  },

  endScreen: {
    line: "Milte hain next video mein",
    big: "Seekhte raho, karte raho.",
    nextLabel: "Next video",
    nextTitle: "Digital Marketing Roadmap for Beginners",
    subscribe: "Subscribe",
  },
} as const;
