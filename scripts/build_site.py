"""Generates the static site pages in docs/ from the hi-fi mockups (design/mockups).

Usage, from the repo root:  python3 scripts/build_site.py docs

Content lives in the data lists below. Drop a photo at docs/assets/portrait.jpg
(and optionally docs/assets/working.jpg) and re-run to replace the silhouettes.
"""
import sys
import pathlib

OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "docs")
exec((pathlib.Path(__file__).parent / "icons.py").read_text())  # defines ICON
exec((pathlib.Path(__file__).parent / "tool_icons.py").read_text())  # defines TOOL_ICONS

ICON.update({
    "share": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',
    "mega": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1Z"/><path d="M16 9a3 3 0 0 1 0 6M19 6a7 7 0 0 1 0 12"/></svg>',
    "check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    "doc": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>',
})

# ---------------------------------------------------------------- content
GITHUB = "https://github.com/omgupta0603-creator"
EMAIL = "omgupta0603@gmail.com"
ROLES = ["SEO Strategist", "Content Strategist", "GEO / AEO Specialist", "SMO Specialist"]
TEAMS = ["AdLift Marketing", "Ebslon Infotech", "Solarman Technology Project", "Shadow Infosystem"]
ENGINES = ["Google Search", "AI Overviews", "ChatGPT", "Gemini", "Perplexity", "Bing"]
SERVICES = [
    ("search", "SEO", "Keyword research, on-page and technical SEO, from GSC audits to Core Web Vitals.", "skills.html#seo"),
    ("pin", "Local SEO", "Google Business Profile, local keywords and consistent business details across the web.", "skills.html#local"),
    ("share", "SMO &amp; paid social", "Profile optimization, content calendars, and Meta Ads and Google Ads campaigns.", "skills.html#ads"),
    ("spark", "AI visibility", "Citation tracking across LLMs, prompt sets and content tuned to get cited.", "skills.html#ai"),
]
CORE_SKILLS = ["SEO", "Local SEO", "SMO", "Social Media Marketing", "Meta Ads", "Google Ads", "Technical SEO",
               "On-page SEO", "Keyword Research", "GEO / AEO", "Content Strategy", "Google Business Profile", "GA4 Reporting"]
KEY_SKILLS = 6  # the first N core skills are highlighted
TOOLS = [("GA", "GA4", "analytics"), ("GSC", "Search Console", "search data"), ("Se", "Semrush", "research"),
         ("Ah", "Ahrefs", "backlinks"), ("SF", "Screaming Frog", "crawling"), ("Mz", "Moz", "authority"),
         ("Ub", "Ubersuggest", "keywords"), ("Hj", "Hotjar", "behaviour"), ("Cl", "Clarity", "behaviour"),
         ("Bi", "Bing Webmaster", "search data"), ("Xl", "Excel", "reporting"), ("PP", "PowerPoint", "decks")]
INDUSTRIES = [("B2B SaaS", "Software"), ("Logistics", "Supply chain"), ("Finance", "Financial services"),
              ("Healthcare &amp; Education", "Health &amp; learning"), ("D2C", "Direct to consumer")]
# Home-page industry explorer: name, icon, accent, what I do for that sector, chips on its visual
INDUSTRY_DETAIL = [
    ("B2B SaaS", "saas", "#38BDF8",
     "For SaaS brands I build <strong>topic clusters</strong> around the problems buyers search, optimize product and feature pages, and track how ChatGPT, Gemini and Perplexity describe the product with <strong>AI citation tracking</strong>.",
     ["Topic clusters", "AI citations", "Product pages"]),
    ("Logistics", "truck", "#F59E0B",
     "Logistics sites live on service and location pages. I fix the <strong>technical foundations</strong> (crawl, canonicals, Core Web Vitals), map <strong>service-area keywords</strong> and keep Google Business Profiles accurate for <strong>local search</strong>.",
     ["Technical SEO", "Service areas", "Google Business Profile"]),
    ("Finance", "coins", "#4ADE80",
     "Finance is a trust category. I focus on <strong>clear, well-sourced answers</strong>, FAQ sets that match real questions, and <strong>technical SEO</strong> that keeps product and rate pages indexable, all measured in <strong>GA4 and Search Console</strong>.",
     ["FAQ sets", "Core Web Vitals", "GA4"]),
    ("Healthcare &amp; Education", "cap", "#F472B6",
     "For healthcare and education brands I build <strong>FAQ and course content</strong> around what patients and students actually ask, strengthen <strong>local visibility</strong> for clinics and campuses, and make pages easy for <strong>AI Overviews</strong> to cite.",
     ["Course pages", "Local SEO", "AI Overviews"]),
    ("D2C", "bag", "#818CF8",
     "D2C growth mixes search and social. I optimize <strong>product and category pages</strong>, run <strong>SMO, Meta Ads and Google Ads</strong> for discovery, and tie it together in <strong>GA4 reports</strong> that show what actually sells.",
     ["Product pages", "Meta Ads", "Google Ads"]),
]
INDUSTRY_ICONS = {  # 24px stroke icons
    "saas": '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 9h4M7 12h7"/>',
    "truck": '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    "coins": '<ellipse cx="9" cy="7" rx="6" ry="2.5"/><path d="M3 7v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7"/><path d="M9 14.5V17c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5c0-1.4-2.7-2.5-6-2.5"/>',
    "cap": '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6"/>',
    "bag": '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
}
STATS = [("4", "", "Teams, agency &amp; in-house"), ("5", "", "Industries served"),
         ("5", "", "Search &amp; AI engines"), ("12", "", "Tools in daily use")]
PROCESS = [("Audit", "Crawl, GSC coverage and a baseline of how AI engines cite you."),
           ("Strategy", "Prioritised fixes, topics, local and social plans."),
           ("Execute", "Technical fixes, content and posts that earn rankings and citations."),
           ("Measure", "GA4, GSC and citation tracking in one report.")]
RESOURCES = [("check", "SEO audit checklist", "The checks I run before any recommendation."),
             ("search", "GEO / AEO tracking template", "Prompt sets and a citation log for AI engines."),
             ("doc", "Content optimization workflow", "From content gap to a published, optimized page.")]
JOBS = [
    ("SEO &amp; Content Strategist", "AdLift Marketing", "Mar 2026 &ndash; Present", True,
     ["AI visibility: citation tracking across LLMs, prompt sets and source-priority analysis",
      "Blog and product-page optimization, FAQ sets and topic clusters",
      "GA4, GSC and Semrush data turned into client decks and KPI dashboards"]),
    ("SEO Executive", "Ebslon Infotech", "May 2025 &ndash; Mar 2026", False,
     ["Technical SEO: canonicals, robots.txt, Core Web Vitals and GSC coverage audits",
      "Content gap analysis and on-page optimization"]),
    ("SMO &amp; SEO Executive", "Solarman Technology Project", "Apr 2024 &ndash; May 2025", False,
     ["Social media optimization alongside organic search",
      "Google Business Profile and local visibility"]),
    ("SEO Executive", "Shadow Infosystem", "Apr 2023 &ndash; Apr 2024", False,
     ["Keyword research, on-page SEO and reporting foundations",
      "Supported Google Ads and Meta Ads campaigns"]),
]
APPROACH = [("pen", "Clear answers", "Content that answers the real question, so people and AI engines can use it."),
            ("gear", "Technically sound sites", "Crawlable, indexable, fast. The basics come first."),
            ("chart", "Honest measurement", "Report what moved and what didn&rsquo;t, with the data to show it.")]
LEVELS = {3: "Advanced", 2: "Proficient", 1: "Familiar"}
SKILL_CATS = [
    ("seo", "search", "SEO", [("Keyword research", 3), ("On-page SEO", 3), ("Technical SEO audits", 3), ("Core Web Vitals", 2)]),
    ("local", "pin", "Local SEO", [("Google Business Profile", 2), ("Local keyword targeting", 2), ("NAP consistency", 2), ("Location pages", 2)]),
    ("smo", "share", "SMO", [("Profile optimization", 2), ("Post &amp; hashtag optimization", 2), ("Content calendars", 2), ("Engagement tracking", 2)]),
    ("smm", "mega", "Social Media Marketing", [("Campaign planning", 2), ("Audience targeting", 2), ("Social analytics", 2), ("Content repurposing", 2)]),
    ("ai", "spark", "AI Visibility (GEO / AEO)", [("LLM citation tracking", 3), ("Prompt set design", 3), ("Source-priority analysis", 2), ("AI Overview optimization", 2)]),
    ("content", "pen", "Content &amp; Reporting", [("Content strategy", 3), ("FAQ sets", 3), ("GA4 &amp; GSC reporting", 3), ("KPI dashboards", 2)]),
]
# Full-width Paid Ads card on the Skills page
PAID_ADS = [("Google Ads", 2), ("Meta Ads", 2), ("Conversion tracking", 2), ("Campaign reporting", 2)]
STRENGTHS = [("Search", [("SEO", 3, 90), ("Technical SEO", 3, 88), ("AI search (GEO / AEO)", 3, 86), ("Local SEO", 2, 68)]),
             ("Social &amp; paid", [("SMO", 2, 68), ("Social media marketing", 2, 64), ("Meta Ads", 2, 62), ("Google Ads", 2, 60)])]
HELP_TOPICS = ["SEO", "Local SEO", "SMO / social media", "Paid ads", "AI visibility"]
NEXT_STEPS = [("You send a message", "Tell me about your site, your goals and what isn&rsquo;t working yet."),
              ("I reply by email", "With questions, first thoughts and a time to talk."),
              ("We plan the first step", "Usually an audit, or a baseline of how AI engines cite you.")]
FAQ = [("Which industries do you work with?", "B2B SaaS, logistics, finance, healthcare-education and D2C so far, across SEO, local SEO and social media."),
       ("What does an engagement usually start with?", "An audit: a crawl, a look at Google Search Console coverage, and a baseline of how ChatGPT, Gemini, Perplexity and AI Overviews mention your brand."),
       ("Can you track how AI tools cite my brand?", "Yes. I build prompt sets for your category, log which sources each engine cites, and track it over time alongside rankings."),
       ("Do you also handle social media and paid ads?", "Yes: SMO, content calendars and social media marketing, plus Google Ads and Meta Ads campaigns measured in GA4.")]

# ---------------------------------------------------------------- helpers
PERSON = '''<svg class="person" viewBox="0 0 400 460" aria-hidden="true"><defs>
<linearGradient id="pg{k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#52627C"/><stop offset="1" stop-color="#1E293B"/></linearGradient>
<linearGradient id="rim{k}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#38BDF8"/><stop offset="1" stop-color="#818CF8"/></linearGradient></defs>
<path d="M30 460c6-96 70-150 170-150s164 54 170 150Z" fill="url(#pg{k})" stroke="url(#rim{k})" stroke-width="2"/>
<circle cx="200" cy="170" r="92" fill="url(#pg{k})" stroke="url(#rim{k})" stroke-width="2"/></svg>'''


def portrait(key, img, alt, attrs=""):
    """A photo if docs/assets/<img> exists, otherwise a lit silhouette."""
    if (OUT / "assets" / img).exists():
        inner = f'<img src="assets/{img}" alt="{alt}" loading="lazy">'
    else:
        inner = PERSON.replace("{k}", key) + f'<span class="sr-only">{alt}</span>'
    return f'<figure class="portrait"{attrs}>{inner}</figure>'


def lvl(n):
    bars = "".join('<b class="on"></b>' if i < n else "<b></b>" for i in range(3))
    return f'<span class="lvl"><i aria-hidden="true">{bars}</i>{LEVELS[n]}</span>'


def label(text):
    return f'<span class="label"><b>/</b> {text}</span>'


def marquee(items, cls, direction, speed):
    lis = "".join(f"<li>{i}</li>" for i in items)
    return (f'<div class="marquee {cls}" data-marquee data-direction="{direction}" data-speed="{speed}">'
            f'<div class="marquee-viewport"><div class="marquee-track"><ul class="marquee-group">{lis}</ul></div></div></div>')


def tool_mark(letters, name):
    """The tool's logo in soft white, lit in its brand colour on hover; letters if no open logo exists."""
    vb, body, hex_ = TOOL_ICONS[name]
    inner = (f'<svg viewBox="{vb}" class="{"wide" if vb != "0 0 24 24" else ""}" aria-hidden="true">{body}</svg>'
             if body else f'<span>{letters}</span>')
    return f'<div class="tool-mark{"" if body else " letters"}" style="--brand:{hex_}" aria-hidden="true">{inner}</div>'


def tool_cards():
    return "".join(f'<div class="card spot tool-card">{tool_mark(m, n)}<b>{n}</b><small>{k}</small></div>'
                   for m, n, k in TOOLS)


def contact_link(subject):
    return "contact.html?subject=" + subject.replace("&amp;", "and").replace(" ", "%20")


def industry_visual(k, name, icon, color, chips, active=False):
    chip_html = "".join(f'<span class="iv-chip c{j}">{c}</span>' for j, c in enumerate(chips))
    return (f'<div class="iv{" is-active" if active else ""}" style="--ind:{color}" data-ix="{k}" aria-hidden="true">'
            f'<div class="iv-grid"></div><div class="iv-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{INDUSTRY_ICONS[icon]}</svg></div>'
            f'{chip_html}<span class="iv-name">{name}</span></div>')


def industry_explorer():
    """Scroll-driven industry list (ref: the user's reference video): the name at the centre of the
    screen lights up, and the visual on the left and the description on the right follow it.
    Hovering or focusing a name selects it too. Below 1025px each item shows its own panel inline."""
    visuals = "".join(industry_visual(k, n, i, c, ch, k == 0) for k, (n, i, c, d, ch) in enumerate(INDUSTRY_DETAIL))
    items = "".join(
        f'<li class="ix-row"><button type="button" class="ix-item{" is-active" if k == 0 else ""}" data-ix="{k}" aria-controls="ix-detail-{k}" aria-pressed="{"true" if k == 0 else "false"}">{n}</button>'
        f'<div class="ix-inline">{industry_visual(k, n, i, c, ch)}<p>{d}</p>'
        f'<a class="btn btn-sm" href="{contact_link("SEO for " + n)}">Know more <span class="arrow">&#8599;</span></a></div></li>'
        for k, (n, i, c, d, ch) in enumerate(INDUSTRY_DETAIL))
    details = "".join(
        f'<div class="ix-panel{" is-active" if k == 0 else ""}" id="ix-detail-{k}" data-ix="{k}"><p>{d}</p>'
        f'<a class="btn" href="{contact_link("SEO for " + n)}"{"" if k == 0 else " tabindex=&quot;-1&quot;"}>Know more <span class="arrow">&#8599;</span></a></div>'.replace("&quot;", '"')
        for k, (n, i, c, d, ch) in enumerate(INDUSTRY_DETAIL))
    return f'''    <section class="section line-top ix-section">
      <div class="wrap">
        <div class="section-head" data-reveal><div>{label("Industries")}<h2>Search, social and AI visibility,<br>sector by sector</h2></div><a class="btn" href="contact.html">Discuss your industry <span class="arrow">&#8599;</span></a></div>
        <div class="ix">
          <div class="ix-media" aria-hidden="true"><div class="ix-sticky">{visuals}</div></div>
          <ol class="ix-list">{items}</ol>
          <div class="ix-detail" aria-live="polite"><div class="ix-sticky">{details}</div></div>
        </div>
      </div>
    </section>'''


NAV = [("index.html", "Home"), ("about.html", "About"), ("skills.html", "Skills"), ("contact.html", "Contact")]


def page(fname, title, desc, body):
    links = "".join(f'<li><a href="{h}"{" aria-current=&quot;page&quot;" if h == fname else ""}>{t}</a></li>' for h, t in NAV)
    links = links.replace("&quot;", '"')
    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="theme-color" content="#0F172A">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:type" content="website">
  <script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches){{document.documentElement.classList.add('anim');setTimeout(function(){{if(!window.__animReady)document.documentElement.classList.remove('anim')}},2500)}}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="nav">
    <nav class="wrap nav-inner" aria-label="Main">
      <a class="logo" href="index.html">om<b>.</b>gupta</a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">Menu</button>
      <ul class="nav-links">{links}</ul>
      <a class="btn btn-solid btn-sm nav-cta" href="contact.html">Let&rsquo;s Talk <span class="arrow">&rarr;</span></a>
    </nav>
  </header>

  <main>
{body}
  </main>

  <footer class="footer">
    <div class="wrap grid cols-4">
      <div><span class="logo">om<b>.</b>gupta</span><p style="margin-top:16px;line-height:1.7">SEO &amp; Content Strategist helping brands get found on Google, cited by AI and seen on social.</p></div>
      <div class="footer-links"><h4>Pages</h4>{"".join(f'<a href="{h}">{t}</a>' for h, t in NAV)}</div>
      <div class="footer-links"><h4>Follow</h4><a href="{GITHUB}" target="_blank" rel="noopener">GitHub</a><a href="mailto:{EMAIL}">Email</a></div>
      <div><h4>Get in touch</h4><p><a href="mailto:{EMAIL}" style="color:var(--text)">{EMAIL}</a></p><p>Delhi, India &middot; IST</p></div>
    </div>
    <div class="wordmark" aria-hidden="true">OM GUPTA</div>
    <div class="footer-base"><div class="wrap"><span>&copy; <span id="year">2026</span> Om Gupta &middot; SEO &amp; Content Strategist</span><a href="#top">Back to top &uarr;</a></div></div>
  </footer>
  <script src="vendor/gsap.min.js"></script>
  <script src="vendor/ScrollTrigger.min.js"></script>
  <script src="js/spotlight.js"></script>
  <script src="js/marquee.js"></script>
  <script src="main.js"></script>
</body>
</html>
'''


def page_head(crumb, title_html, sub):
    return f'''    <section class="page-head" id="top">
      <div class="glow" style="width:520px;height:420px;right:-80px;top:-120px;background:rgba(129,140,248,.25)"></div>
      <div class="wrap">
        <div class="crumb" data-head>Home <b>/</b> {crumb}</div>
        <h1 data-head>{title_html}</h1>
        <p data-head>{sub}</p>
      </div>
    </section>'''


def cta():
    return f'''    <section class="section line-top">
      <div class="wrap">
        <div class="card cta-card" data-reveal>
          <div>{label("Next step")}<h2>Want your brand in the answer?</h2><p>Tell me about your site and goals, and we&rsquo;ll find where organic growth is hiding.</p></div>
          <div class="btn-row"><a class="btn btn-solid" href="contact.html">Let&rsquo;s Talk <span class="arrow">&rarr;</span></a><a class="btn" href="resume.pdf" download>Download Resume</a></div>
        </div>
      </div>
    </section>'''


# ---------------------------------------------------------------- home
QUERY = "who can get my brand cited in AI?"
rotator = "".join(f'<span>{r}</span>' for r in ROLES)
home = f'''    <section class="hero" id="top">
      <div class="glow" style="width:620px;height:520px;right:40px;top:80px;background:rgba(129,140,248,.28)"></div>
      <div class="glow" style="width:480px;height:420px;left:-120px;top:360px;background:rgba(56,189,248,.16)"></div>
      <div class="wordmark">OM GUPTA</div>
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <span class="chip chip-ok" data-hero><span class="dot"></span>Available for new projects</span>
          <p class="hero-hello" data-hero>&#128075; Hello, World &middot; I&rsquo;m an <span class="sr-only">SEO &amp; Content Strategist</span><span class="rotator" aria-hidden="true">{rotator}</span></p>
          <h1 data-hero>Get found on Google.<br>Get <span class="accent">cited</span> by AI.</h1>
          <p class="hero-lead" data-hero>I&rsquo;m Om Gupta, an SEO &amp; Content Strategist in Delhi. I help B2B SaaS, logistics, finance, healthcare-education and D2C brands rank in search, show up in AI answers and grow on social.</p>
          <div class="btn-row" data-hero><a class="btn btn-solid" href="skills.html">See what I do <span class="arrow">&rarr;</span></a><a class="btn" href="resume.pdf" download>Download Resume</a></div>
        </div>
        <div class="hero-visual" data-hero>
          {portrait("h", "portrait.jpg", "Portrait of Om Gupta")}
          <span class="chip chip-blue float-chip c1">Technical SEO</span>
          <span class="chip chip-blue float-chip c2">GEO / AEO</span>
          <div class="engine" role="img" aria-label="An AI answer to &lsquo;{QUERY}&rsquo; that cites Om Gupta&rsquo;s About and Skills pages">
            <div class="engine-bar" aria-hidden="true">{ICON["search"]}<span class="engine-query" data-query="{QUERY}">{QUERY}</span><span class="caret"></span></div>
            <div class="engine-body" aria-hidden="true"><span class="engine-tag">Answer</span><p class="engine-answer"><strong>Om Gupta</strong> tracks how brands get cited across ChatGPT, Gemini, Perplexity and AI Overviews, then shapes content to earn those citations <span class="cite">1</span>. Backed by technical SEO <span class="cite">2</span>.</p></div>
            <div class="engine-sources">
              <a class="src" href="about.html"><span class="cite">1</span><span>About Om Gupta<small>omgupta / about</small></span></a>
              <a class="src" href="skills.html"><span class="cite">2</span><span>Skills &amp; Expertise<small>omgupta / skills</small></span></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="strip">
      <div class="wrap">
        <div class="strip-row"><span class="label">Teams I&rsquo;ve worked with</span>{marquee(TEAMS, "teams", "left", 36)}</div>
        <div class="strip-row"><span class="label">Optimizing for</span>{marquee(ENGINES, "engines-row", "right", 30)}</div>
      </div>
    </div>

    <section class="section">
      <div class="wrap">
        <div class="section-head" data-reveal><div>{label("What I do")}<h2>How I grow organic visibility</h2></div><p>Search, local and social, usually combined into one plan for your brand.</p></div>
        <div class="grid cols-4" data-reveal data-stagger>
{"".join(f'          <a class="card spot service" href="{h}"><div class="ico">{ICON[i]}</div><h3>{t}</h3><p>{d}</p><span class="more">Explore <span class="arrow">&rarr;</span></span></a>{chr(10)}' for i, t, d, h in SERVICES)}        </div>
      </div>
    </section>

    <section class="section line-top">
      <div class="wrap">
        <div class="section-head" data-reveal><div>{label("Skills &amp; tools")}<h2>What I bring to the work</h2></div><a class="btn btn-sm" href="skills.html">All skills <span class="arrow">&rarr;</span></a></div>
        <div class="skills-tools">
          <div class="card spot" data-reveal><h3 class="block-title">Core skills</h3><div class="skill-pills">{"".join(f'<span class="skill-pill{" key" if k < KEY_SKILLS else ""}">{n}</span>' for k, n in enumerate(CORE_SKILLS))}</div></div>
          <div><h3 class="block-title" data-reveal>Tools I use</h3><div class="grid cols-4" style="gap:14px" data-reveal data-stagger>{tool_cards()}</div></div>
        </div>
      </div>
    </section>

{industry_explorer()}

    <section class="section line-top">
      <div class="wrap meet">
        <div data-reveal>{portrait("w", "working.jpg", "Om Gupta at work")}</div>
        <div data-reveal data-stagger>
          {label("Meet Om")}
          <h2>Three-plus years of making brands easier to find.</h2>
          <p style="margin-top:24px">I&rsquo;ve worked across agencies and in-house teams on technical SEO, content strategy, local search and social media. Today most of my work sits where classic search meets AI search.</p>
          <p>I&rsquo;m an SEO &amp; Content Strategist at AdLift Marketing, based in Delhi.</p>
          <div class="btn-row" style="margin-top:16px"><a class="btn" href="about.html">More about me <span class="arrow">&rarr;</span></a></div>
        </div>
      </div>
    </section>

    <section class="section line-top">
      <div class="wrap numbers" data-reveal data-stagger>
        <div class="card big-card">{label("Experience")}<div><div class="stat-big grad-text"><span data-count="3" data-suffix="+">3+</span></div><h3 style="font-size:1.75rem;margin-top:12px">Years in SEO &amp; content</h3><p style="margin:10px 0 0">Since April 2023, across four teams.</p></div></div>
{"".join(f'        <div class="card"><div class="stat" data-count="{n}" data-suffix="{s}">{n}{s}</div><p class="stat-label">{l}</p></div>{chr(10)}' for n, s, l in STATS)}      </div>
    </section>

    <section class="section line-top">
      <div class="wrap">
        <div data-reveal>{label("How I work")}<h2>From audit to answer</h2></div>
        <ol class="process" style="list-style:none;padding:0;margin:56px 0 0" data-reveal data-stagger>
{"".join(f'          <li class="step"><span class="step-bar" aria-hidden="true"></span><span class="step-num">0{k + 1}</span><h3>{t}</h3><p>{d}</p></li>{chr(10)}' for k, (t, d) in enumerate(PROCESS))}        </ol>
      </div>
    </section>

    <section class="section line-top">
      <div class="wrap">
        <div class="section-head" data-reveal><div>{label("Free resources")}<h2>Templates &amp; checklists I use</h2></div><p>Shared on my GitHub. Client data is never included.</p></div>
        <div class="grid cols-3" data-reveal data-stagger>
{"".join(f'          <div class="card spot resource"><div class="ico">{ICON[i]}</div><h3>{t}</h3><p>{d}</p><a class="btn btn-sm" href="{GITHUB}" target="_blank" rel="noopener">{ICON["github"]} Open on GitHub</a></div>{chr(10)}' for i, t, d in RESOURCES)}        </div>
      </div>
    </section>
{cta()}'''

# ---------------------------------------------------------------- about
timeline = "".join(f'''          <article class="card tl-item{" now" if cur else ""}" data-reveal>
            <span class="tl-node" aria-hidden="true"></span>
            <div class="tl-head"><h3>{r}</h3><span class="chip{" chip-blue" if cur else ""}">{d}</span></div>
            <div class="tl-company">{c}</div>
            <ul>{"".join(f"<li>{b}</li>" for b in bs)}</ul>
          </article>
''' for r, c, d, cur, bs in JOBS)

about = page_head("About", 'About <span class="grad-text">Me</span>', "The person behind the rankings and the citations.") + f'''

    <section class="section" style="padding-top:0">
      <div class="wrap bio">
        <div class="bio-photo" data-reveal>
          {portrait("a", "portrait.jpg", "Portrait of Om Gupta")}
          <div class="photo-caption"><span>Om Gupta (OMG)</span><span>Delhi &middot; IST</span></div>
        </div>
        <div class="bio-text" data-reveal data-stagger>
          {label("My story")}
          <h2>Hi, I&rsquo;m Om.<br>People call me OMG.</h2>
          <p style="margin-top:28px">Over the last three-plus years I&rsquo;ve worked across agencies and in-house teams on technical SEO, content strategy, local search and social media.</p>
          <p>Today a lot of my work sits where classic search meets AI search. I track how brands get cited across ChatGPT, Gemini, Perplexity and Google AI Overviews, then shape content so it earns those citations as well as rankings.</p>
          <blockquote class="quote">Good SEO is clear answers on a technically sound site, measured honestly. Rankings and citations follow.</blockquote>
          <dl class="facts">{"".join(f"<div><dt>{k}</dt><dd>{v}</dd></div>" for k, v in [("Currently", "AdLift Marketing"), ("Education", "BCA, IGNOU"), ("Based in", "Delhi, India"), ("Languages", "English &middot; Hindi")])}</dl>
          <div class="btn-row" style="margin-top:36px"><a class="btn btn-solid" href="resume.pdf" download>Download Resume</a><a class="btn" href="contact.html">Let&rsquo;s Talk <span class="arrow">&rarr;</span></a></div>
        </div>
      </div>
    </section>

    <section class="section line-top" style="padding:64px 0">
      <div class="wrap grid cols-4" data-reveal data-stagger>
{"".join(f'        <div class="card stat-card"><div class="stat grad-text" data-count="{n}" data-suffix="{s}">{n}{s}</div><p class="stat-label">{l}</p></div>{chr(10)}' for n, s, l in [("3", "+", "Years of experience"), ("4", "", "Teams"), ("5", "", "Industries"), ("5", "", "Search &amp; AI engines")])}      </div>
    </section>

    <section class="section line-top">
      <div class="wrap timeline-wrap">
        <div data-reveal>{label("Experience")}<h2>Where I&rsquo;ve worked</h2><p style="margin-top:18px">Most recent first. Each role added a layer: research, social and local, technical, then AI search.</p></div>
        <div class="timeline">
          <div class="timeline-track" aria-hidden="true"><div class="timeline-fill"></div></div>
{timeline}        </div>
      </div>
    </section>

    <section class="section line-top">
      <div class="wrap grid cols-2" style="gap:48px">
        <div data-reveal>{label("Education")}<div class="card"><span class="chip chip-blue">Degree</span><h3 style="margin-top:18px;font-size:1.65rem">Bachelor of Computer Applications</h3><p style="margin:8px 0 0">Indira Gandhi National Open University (IGNOU)</p></div></div>
        <div data-reveal data-stagger>{label("How I approach SEO")}{"".join(f'<div class="card spot approach"><div class="ico">{ICON[i]}</div><div><h3>{t}</h3><p>{d}</p></div></div>' for i, t, d in APPROACH)}</div>
      </div>
    </section>
{cta()}'''

# ---------------------------------------------------------------- skills
cards = "".join(f'''          <article class="card spot skill-card" id="{k}">
            <div class="ico">{ICON[i]}</div>
            <h3>{t}</h3>
            <ul class="skill-list">{"".join(f"<li><span>{n}</span>{lvl(l)}</li>" for n, l in items)}</ul>
          </article>
''' for k, i, t, items in SKILL_CATS)
paid_card = f'''          <article class="card spot skill-card paid" id="ads">
            <div>
              <div class="paid-logos">{tool_mark("GA", "Google Ads")}{tool_mark("Me", "Meta Ads")}</div>
              <h3>Paid Ads</h3>
              <p>Google Ads search campaigns and Meta Ads on Facebook and Instagram, planned with the same keyword and audience research as organic, with conversions tracked in GA4.</p>
            </div>
            <ul class="skill-list">{"".join(f"<li><span>{n}</span>{lvl(l)}</li>" for n, l in PAID_ADS)}</ul>
          </article>
'''
bars = "".join(f'''          <div><h3 style="margin-bottom:24px">{t}</h3>{"".join(f'<div class="bar-row"><span>{s}</span><span>{LEVELS[l]}</span></div><div class="bar" role="img" aria-label="{s}: {LEVELS[l]}"><span style="width:{w}%"></span></div>' for s, l, w in items)}</div>
''' for t, items in STRENGTHS)

skills = page_head("Skills", 'Skills &amp; <span class="grad-text">Expertise</span>',
                   "SEO, local SEO, SMO, social media marketing and AI search: the work I do day to day, and how deep I go in each.") + f'''

    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="legend" data-reveal>{lvl(3)}{lvl(2)}{lvl(1)}</div>
        <div class="grid cols-3" data-reveal data-stagger>
{cards}{paid_card}        </div>
      </div>
    </section>

    <section class="section line-top">
      <div class="wrap">
        <div data-reveal>{label("Core strengths")}<h2>Search and social</h2></div>
        <div class="bars" style="margin-top:56px" data-reveal>
{bars}        </div>
      </div>
    </section>

    <section class="section line-top">
      <div class="wrap">
        <div class="section-head" data-reveal><div>{label("Toolkit")}<h2>Tools of the Trade</h2></div><p>What I use for audits, research, tracking and reporting.</p></div>
        <div class="grid cols-6" style="gap:16px" data-reveal data-stagger>{tool_cards()}</div>
      </div>
    </section>

    <section class="section line-top" style="padding:80px 0">
      <div class="wrap">
        <div class="section-head" style="margin:0" data-reveal>
          <div>{label("Industries")}<h2>Industries I&rsquo;ve worked in</h2></div>
          <div class="industry-chips">{"".join(f'<span class="chip">{n}</span>' for n, _ in INDUSTRIES)}</div>
        </div>
      </div>
    </section>
{cta()}'''

# ---------------------------------------------------------------- contact
contact = page_head("Contact", 'Get in <span class="grad-text">Touch</span>', "Have a project in mind or want to chat? Drop a message below.") + f'''

    <section class="section" style="padding-top:0">
      <div class="wrap contact-grid">
        <aside data-reveal data-stagger>
          <div><span class="chip chip-ok"><span class="dot"></span>Available for new projects</span></div>
          <a class="big-mail" href="mailto:{EMAIL}">{EMAIL}</a>
          <dl class="info-list">{"".join(f"<div><dt>{k}</dt><dd>{v}</dd></div>" for k, v in [("Location", "Delhi, India"), ("Time zone", "IST (UTC+5:30)"), ("Languages", "English &middot; Hindi")])}</dl>
          <div class="socials-block">{label("Find me online")}<div class="socials"><a class="social" href="{GITHUB}" aria-label="GitHub" target="_blank" rel="noopener">{ICON["github"]}</a><a class="social" href="mailto:{EMAIL}" aria-label="Email">{ICON["mail"]}</a></div></div>
        </aside>
        <div data-reveal>
          <form id="contact-form" class="card form-card" novalidate>
            <h2>Send a message</h2>
            <div class="form-row">
              <div class="field"><label for="name">Name</label><input id="name" name="name" type="text" placeholder="Your name" autocomplete="name" required></div>
              <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required></div>
            </div>
            <fieldset class="field"><legend>I need help with</legend><div class="topics">{"".join(f'<label class="topic"><input type="checkbox" name="topic" value="{t}"><span>{t}</span></label>' for t in HELP_TOPICS)}</div></fieldset>
            <div class="field"><label for="subject">Subject</label><input id="subject" name="subject" type="text" placeholder="SEO audit, local SEO, social media, AI visibility" required></div>
            <div class="field"><label for="message">Message</label><textarea id="message" name="message" placeholder="Your site, your goals, and what&rsquo;s not working yet" required></textarea></div>
            <button class="btn btn-solid btn-block" type="submit">Send Message <span class="arrow">&rarr;</span></button>
            <p class="form-note" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </section>

    <section class="section line-top">
      <div class="wrap">
        <div data-reveal>{label("What happens next")}<h2>What happens after you write</h2></div>
        <ol class="grid cols-3" style="list-style:none;padding:0;margin:56px 0 0" data-reveal data-stagger>
{"".join(f'          <li class="card spot"><span class="step-num">0{k + 1}</span><h3 style="margin:14px 0 10px">{t}</h3><p style="margin:0;font-size:15px">{d}</p></li>{chr(10)}' for k, (t, d) in enumerate(NEXT_STEPS))}        </ol>
      </div>
    </section>

    <section class="section line-top">
      <div class="wrap faq-wrap">
        <div data-reveal>{label("FAQ")}<h2>Before you write</h2></div>
        <div class="faq" data-reveal data-stagger>
{"".join(f'          <details{" open" if k == 0 else ""}><summary>{q}<span class="pm" aria-hidden="true">+</span></summary><p>{a}</p></details>{chr(10)}' for k, (q, a) in enumerate(FAQ))}        </div>
      </div>
    </section>'''

PAGES = [
    ("index.html", "Om Gupta | SEO & Content Strategist", "Om Gupta is an SEO & Content Strategist in Delhi helping brands get found on Google, cited by AI search and seen on social.", home),
    ("about.html", "About | Om Gupta", "Background, philosophy and experience of Om Gupta, SEO & Content Strategist in Delhi.", about),
    ("skills.html", "Skills & Expertise | Om Gupta", "SEO, local SEO, SMO, social media marketing, AI visibility and the tools Om Gupta uses.", skills),
    ("contact.html", "Contact | Om Gupta", "Get in touch with Om Gupta about SEO, local SEO, social media or AI visibility.", contact),
]
for f, t, d, b in PAGES:
    (OUT / f).write_text(page(f, t, d, b))
print("built", ", ".join(p[0] for p in PAGES))
