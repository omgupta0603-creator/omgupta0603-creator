import React from "react";

/**
 * All on-screen text for the "Why Use Claude for Digital Marketing" graphics
 * pack, in two languages. [TEXT] lines are verbatim from each script; edit
 * them here. Both objects must keep the same shape.
 */

/** Hinglish script (CM01…CM20). */
export const hi = {
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
    subBefore: "",
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

/** Same shape as `hi`, with every string widened so other languages fit. */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : { readonly [K in keyof T]: Widen<T[K]> };
export type Content = Widen<typeof hi>;

/** English script (CME01…CME20). */
export const en: Content = {
  channel: "Hidden Marketing 360",

  hook: {
    opener: "In today's fast-paced digital world…",
    authors: ["Marketer A", "Marketer B", "Marketer C"],
    rest: [
      "AI is changing everything. Here are 5 ways to elevate your brand…",
      "it's time to unlock the power of content. Let's dive in…",
      "every brand needs to stand out. Here's how to elevate…",
    ],
    question: "Why does everyone's content sound the same?",
  },

  sting: { tagline: "Real workflows. Real client work." },

  agenda: {
    title: "Today's agenda",
    items: [
      "The problem with relying on one AI tool",
      "What Claude is and where it's strong",
      "5 real use cases (screen demos)",
      "Honest limitations",
      "A simple prompt formula",
    ],
  },

  problems: [
    {
      label: "Problem 1",
      title: "Generic output",
      words: ["unlock", "elevate", "in today's world"],
      quote: "“This is written by AI.”",
    },
    {
      label: "Problem 2",
      title: "Repeating context every time",
      chats: ["New chat", "New chat", "New chat"],
      context: ["Brand details", "Tone", "Audience"],
      footer: "Total waste of time",
    },
    {
      label: "Problem 3",
      title: "Big files, shallow analysis",
      files: [
        { name: "Search Console export.csv", meta: "Full export" },
        { name: "Competitor blog 1", meta: "3,200 words" },
        { name: "Competitor blog 2", meta: "2,800 words" },
        { name: "Competitor blog 3", meta: "4,100 words" },
      ],
      status: "Analysis incomplete",
    },
  ],

  strengths: {
    title: "4 strengths",
    subtitle: "for marketers",
    items: [
      { name: "Natural writing", line: "More human, less robotic" },
      { name: "Long documents", line: "Long files, PDFs, full blogs" },
      { name: "Data files", line: "Excel / CSV → insights + charts" },
      { name: "Projects", line: "Brand guidelines saved in one place" },
    ],
  },

  useCases: [
    {
      n: 1,
      title: "GSC Data → Insights",
      prompt:
        "From this GSC export, list the top 10 pages with the biggest click drops. For each page, tell me whether the problem is ranking or CTR.",
      attachment: "GSC_pages_export.csv",
    },
    {
      n: 2,
      title: "Content Gap Analysis",
      prompt:
        "Compare my blog's headings with my competitor's. Tell me which topics are missing from my blog, and suggest an improved heading structure.",
      attachment: "",
    },
    {
      n: 3,
      title: "Projects = Brand Voice",
      prompt: "Give me 3 LinkedIn post ideas for this week and one full draft.",
      attachment: "",
      project: "Project: Client Brand",
      knowledge: [
        "Brand guidelines",
        "3 past posts",
        "Target audience",
        "“Words to never use”",
      ],
    },
    {
      n: 4,
      title: "FAQs + Meta Tags",
      prompt:
        "Using this blog's content, write 8 FAQs that could appear in People Also Ask and AI Overviews. Keep each answer to 40–60 words. Also give me 3 meta title options under 60 characters.",
      attachment: "",
    },
    {
      n: 5,
      title: "Build a tool without coding",
      prompt:
        "Build a simple ad budget calculator. Inputs: daily budget, CPC, conversion rate. Output: expected clicks and leads.",
      attachment: "",
    },
  ],

  proTip: {
    label: "Pro tip",
    line: "Never trust the answer blindly.",
    subBefore: "Always cross-check ",
    subHighlight: "2–3 numbers",
    subRest: " against your own sheet.",
  },

  limitations: {
    title: "3 things to keep in mind",
    items: [
      { name: "The free plan has limits", line: "Heavy use means waiting" },
      {
        name: "It can make mistakes",
        line: "Verify numbers in Semrush, GSC or the original source",
      },
      {
        name: "Not the best for every task",
        line: "Don't depend on just one tool",
      },
    ],
  },

  draftDecision: { a: "AI = Draft.", b: "You = Decision." },

  rctf: {
    title: "The R-C-T-F prompt formula",
    rows: [
      {
        letter: "R",
        meaning: "Role",
        example: "“You are a senior SEO strategist”",
      },
      {
        letter: "C",
        meaning: "Context",
        example:
          "“The client is a Delhi-based dental clinic, audience aged 25–45”",
      },
      {
        letter: "T",
        meaning: "Task",
        example: "“Give me 5 meta title options for the homepage”",
      },
      {
        letter: "F",
        meaning: "Format",
        example:
          "“Put them in a table, under 60 characters, with a character count column”",
      },
    ],
    footer: "Works with any AI tool, not just Claude",
  },

  vague: {
    vagueLabel: "Vague prompt",
    vaguePrompt: "Write a meta title for a dental clinic",
    vagueOutput: [
      "Welcome to Our Dental Clinic",
      "Best Dental Care Services",
      "Your Smile, Our Priority",
    ],
    rctfLabel: "R-C-T-F prompt",
    rctfPrompt:
      "You're a senior SEO strategist. Client: Delhi dental clinic, audience 25–45. 5 homepage meta titles in a table, under 60 chars, with char count.",
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
      "Brand voice with Projects",
      "FAQs and meta tags",
      "Tools without code",
    ],
    footer: "You can start all five today",
  },

  comment: {
    title: "Comment: Which use case did you try?",
    placeholder: "Add a comment…",
    reply: "PROMPTS",
    hint: "Want a ready-to-use list of all the prompts? Comment:",
  },

  endScreen: {
    line: "See you in the next video",
    big: "Keep learning, keep doing.",
    nextLabel: "Next video",
    nextTitle: "Digital Marketing Roadmap for Beginners",
    subscribe: "Subscribe",
  },
};

export type Lang = "hi" | "en";
export const CONTENT: Record<Lang, Content> = { hi, en };

const ContentContext = React.createContext<Content>(hi);

/** Provides one language's text to every clip below it. */
export const ContentProvider: React.FC<{
  lang: Lang;
  children?: React.ReactNode;
}> = ({ lang, children }) =>
  React.createElement(
    ContentContext.Provider,
    { value: CONTENT[lang] },
    children,
  );

/** The current clip's text (Hinglish unless a ContentProvider says otherwise). */
export const useContent = () => React.useContext(ContentContext);
