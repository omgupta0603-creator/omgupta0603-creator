"""Generates the static site pages in docs/. Usage: python3 scripts/build_site.py docs"""
import sys, pathlib
out = pathlib.Path(sys.argv[1])
exec(open(pathlib.Path(__file__).with_name("icons.py")).read())
ICON["share"] = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>'
ICON["mega"] = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1Z"/><path d="M16 9a3 3 0 0 1 0 6M19 6a7 7 0 0 1 0 12"/></svg>'

TOOLS = [("GA","GA4","analytics"),("GSC","Search Console","search data"),("Se","Semrush","research"),("Ah","Ahrefs","backlinks"),
         ("SF","Screaming Frog","crawling"),("Mz","Moz","authority"),("Ub","Ubersuggest","keywords"),("Hj","Hotjar","behaviour"),
         ("Cl","Microsoft Clarity","behaviour"),("Bi","Bing Webmaster","search data"),("Xl","Excel","reporting"),("PP","PowerPoint","decks")]
INDUSTRIES = [("B2B SaaS","Software"),("Logistics","Supply chain"),("Finance","Financial services"),("Healthcare-education","Health &amp; learning"),("D2C","Direct to consumer")]
CORE_SKILLS = ["SEO","Local SEO","SMO","Social Media Marketing","Technical SEO","On-page SEO","Keyword Research","GEO / AEO","Content Strategy","Google Business Profile","Meta Ads","Google Ads","GA4 Reporting"]

def tool_pills(indent):
    return "\n".join(f'{indent}<span class="tool"><span class="tool-mark">{m}</span>{n} <span class="tool-kind">{k}</span></span>' for m,n,k in TOOLS)

NAV = [("index.html","Home"),("about.html","About"),("skills.html","Skills"),("contact.html","Contact")]

def page(fname, title, desc, body):
    links = "\n".join(f'        <li><a href="{h}"{" aria-current=\"page\"" if h==fname else ""}>{t}</a></li>' for h,t in NAV)
    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="theme-color" content="#0F172A">
  <script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches){{document.documentElement.classList.add('anim');setTimeout(function(){{if(!window.__animReady)document.documentElement.classList.remove('anim')}},2500)}}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="nav">
    <nav class="container nav-inner" aria-label="Main">
      <a class="logo" href="index.html">om<span class="accent">.</span>gupta</a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">Menu</button>
      <ul class="nav-links">
{links}
      </ul>
      <a class="btn btn-primary nav-cta" href="contact.html">Let&rsquo;s Talk</a>
    </nav>
  </header>

  <main>
{body}
  </main>

  <footer class="footer">
    <div class="container footer-inner">
      <span>&copy; <span id="year">2026</span> Om Gupta &middot; SEO &amp; Content Strategist</span>
      <span><a href="mailto:omgupta0603@gmail.com">omgupta0603@gmail.com</a> &middot; Delhi, India</span>
    </div>
  </footer>
  <script src="vendor/gsap.min.js"></script>
  <script src="vendor/ScrollTrigger.min.js"></script>
  <script src="main.js"></script>
</body>
</html>
'''

def header(label, h1, p):
    return f'''    <header class="page-header container">
      <span class="label" data-hero><span class="accent">/</span> {label}</span>
      <h1 data-hero>{h1}</h1>
      <p data-hero>{p}</p>
    </header>'''

QUERY = "who can get my brand cited in AI answers?"
home = f'''    <section class="hero">
      <div class="container grid-12">
        <div class="hero-copy">
          <span class="label" data-hero>&#128075; Hello, World &middot; SEO &amp; AI visibility</span>
          <h1><span class="line" data-hero>Get found on Google.</span><span class="line" data-hero>Get <span class="cited">cited</span> by AI.</span></h1>
          <p class="hero-lead" data-hero>I&rsquo;m Om Gupta, an SEO &amp; Content Strategist in Delhi. I help B2B SaaS, logistics, finance, healthcare-education and D2C brands rank in classic search and show up in the answers ChatGPT, Gemini, Perplexity and AI Overviews give.</p>
          <div class="btn-row" data-hero>
            <a class="btn btn-primary" href="skills.html">See what I do <span class="arrow">&rarr;</span></a>
            <a class="btn btn-outline" href="resume.pdf" download>Download Resume</a>
          </div>
        </div>
        <div class="hero-engine" data-hero>
          <div class="engine" role="img" aria-label="An AI answer to the question &lsquo;{QUERY}&rsquo; that cites Om Gupta&rsquo;s About and Skills pages">
            <div class="engine-bar" aria-hidden="true">{ICON["search"]}<span class="engine-query" data-query="{QUERY}">{QUERY}</span><span class="caret"></span></div>
            <div class="engine-body" aria-hidden="true">
              <span class="engine-tag">Answer</span>
              <p class="engine-answer">For B2B SaaS, logistics and D2C brands, <strong>Om Gupta</strong> tracks how brands get cited across ChatGPT, Gemini, Perplexity and Google AI Overviews, then shapes content to earn those citations <span class="cite">1</span>. He pairs it with technical SEO, from GSC coverage audits to Core Web Vitals <span class="cite">2</span>.</p>
            </div>
            <div class="engine-sources">
              <a class="source" href="about.html"><span class="cite">1</span><span><span class="source-title">About Om Gupta</span><span class="source-url">omgupta / about</span></span></a>
              <a class="source" href="skills.html"><span class="cite">2</span><span><span class="source-title">Skills &amp; Expertise</span><span class="source-url">omgupta / skills</span></span></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="engines">
      <div class="container engines-inner" data-reveal>
        <span class="label">Optimizing for</span>
        <ul class="engine-list">
          <li>Google Search</li><li>AI Overviews</li><li>ChatGPT</li><li>Gemini</li><li>Perplexity</li>
        </ul>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <div><span class="label">What I do</span><h2>How I grow organic visibility</h2></div>
          <p class="muted">Search, local and social, usually combined into one plan. Each links to the skills behind it.</p>
        </div>
        <div class="services" data-reveal data-stagger>
          <a class="service" href="skills.html#seo"><h3>SEO</h3><p>Keyword research, on-page and technical SEO, from GSC coverage audits to Core Web Vitals.</p><span class="go">&rarr;</span></a>
          <a class="service" href="skills.html#local"><h3>Local SEO</h3><p>Google Business Profile, local keywords and consistent business details across the web.</p><span class="go">&rarr;</span></a>
          <a class="service" href="skills.html#smo"><h3>SMO &amp; social media</h3><p>Profile optimization, content calendars and social media marketing, including Meta Ads.</p><span class="go">&rarr;</span></a>
          <a class="service" href="skills.html#ai"><h3>AI visibility</h3><p>Citation tracking across LLMs, prompt sets, source-priority analysis and content tuned to get cited.</p><span class="go">&rarr;</span></a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <div><span class="label">Skills &amp; tools</span><h2>What I bring to the work</h2></div>
          <a class="btn btn-outline" href="skills.html">All skills <span class="arrow">&rarr;</span></a>
        </div>
        <div class="skills-tools">
          <div class="core-skills" data-reveal>
            <span class="label">Core skills</span>
            <div class="skill-pills">{"".join(f'<span class="skill-pill{" key" if k < 4 else ""}">{n}</span>' for k,n in enumerate(CORE_SKILLS))}</div>
          </div>
          <div data-reveal>
            <span class="label">Tools I use</span>
            <div class="tools">
{tool_pills("              ")}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <div><span class="label">Industries</span><h2>Industries I&rsquo;ve worked in</h2></div>
          <p class="muted">Agency and in-house work across these sectors.</p>
        </div>
        <div class="industries" data-reveal data-stagger>
{chr(10).join(f'          <div class="industry"><span class="label">{d}</span><b>{n}</b></div>' for n,d in INDUSTRIES)}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="facts" data-reveal data-stagger>
          <div class="fact"><div class="fact-value">3+ years</div><p class="fact-label">in SEO and content, since April 2023</p></div>
          <div class="fact"><div class="fact-value">4 teams</div><p class="fact-label">agency and in-house, now at AdLift Marketing</p></div>
          <div class="fact"><div class="fact-value">5 industries</div><p class="fact-label">B2B SaaS, logistics, finance, healthcare-education, D2C</p></div>
        </div>
      </div>
    </section>

    <section class="section cta">
      <div class="container" data-reveal data-stagger>
        <span class="label">Next step</span>
        <h2>Want your brand in the answer?</h2>
        <p>Tell me about your site and goals, and we&rsquo;ll work out where your organic growth is hiding.</p>
        <div><a class="btn btn-primary" href="contact.html">Let&rsquo;s Talk <span class="arrow">&rarr;</span></a></div>
      </div>
    </section>'''

jobs = [
 ("SEO &amp; Content Strategist","AdLift Marketing","Mar 2026 &ndash; Present",True,
  ["AI visibility (GEO / AEO): citation tracking across LLMs, prompt sets and source-priority analysis",
   "Blog and product-page optimization, FAQ sets and topic clusters for client brands",
   "GA4, GSC and Semrush data turned into client decks and KPI dashboards"]),
 ("SEO Executive","Ebslon Infotech","May 2025 &ndash; Mar 2026",False,
  ["Technical SEO: canonicals, robots.txt, Core Web Vitals and GSC coverage audits",
   "Content gap analysis and on-page optimization"]),
 ("SMO &amp; SEO Executive","Solarman Technology Project","Apr 2024 &ndash; May 2025",False,
  ["Social media optimization alongside organic search",
   "Google Business Profile and local visibility"]),
 ("SEO Executive","Shadow Infosystem","Apr 2023 &ndash; Apr 2024",False,
  ["Keyword research, on-page SEO and reporting foundations",
   "Supported paid campaigns across Google Ads and Meta Ads"]),
]
tl = "\n".join(f'''          <article class="tl-item{" current" if cur else ""}" data-reveal>
            <span class="tl-node" aria-hidden="true"></span>
            <div class="tl-date">{d}</div>
            <div><h3>{r}</h3><p class="tl-company">{c}</p><ul>{"".join(f"<li>{b}</li>" for b in bs)}</ul></div>
          </article>''' for r,c,d,cur,bs in jobs)

about = header("About", "The person behind the rankings and the citations.",
  "SEO &amp; Content Strategist at AdLift Marketing, based in Delhi.") + f'''

    <section class="section bio">
      <div class="container grid-12">
        <div class="bio-photo" data-reveal>
          <div class="photo-frame">
            <!-- Replace with <img src="photo.jpg" alt="Om Gupta" style="width:100%;height:100%;object-fit:cover"> -->
            <span class="initials">OG</span>
          </div>
          <div class="photo-caption"><span>Om Gupta (OMG)</span><span>Delhi &middot; IST</span></div>
        </div>
        <div class="bio-text" data-reveal data-stagger>
          <h2>Hi, I&rsquo;m Om. People call me OMG.</h2>
          <p>Over the last three-plus years I&rsquo;ve worked across agencies and in-house teams on technical SEO, content strategy, local search and paid social.</p>
          <p>Today a lot of my work sits where classic search meets AI search. I track how brands get cited across ChatGPT, Gemini, Perplexity and Google AI Overviews, then shape content so it earns those citations as well as rankings.</p>
          <blockquote class="philosophy">Good SEO is clear answers on a technically sound site, measured honestly. Rankings and citations follow from that.</blockquote>
          <dl class="facts-inline">
            <div><dt>Currently</dt><dd>AdLift Marketing</dd></div>
            <div><dt>Education</dt><dd>BCA, IGNOU</dd></div>
            <div><dt>Based in</dt><dd>Delhi, India</dd></div>
            <div><dt>Languages</dt><dd>English &middot; Hindi</dd></div>
          </dl>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <div><span class="label">Experience</span><h2>Where I&rsquo;ve worked</h2></div>
          <p class="muted">Most recent first.</p>
        </div>
        <div class="timeline">
          <div class="timeline-track" aria-hidden="true"><div class="timeline-fill"></div></div>
{tl}
        </div>
      </div>
    </section>'''

LV = {"Advanced":3,"Proficient":2,"Familiar":1}
def level(l):
    n = LV[l]
    bars = "".join(f'<b class="on"></b>' if i < n else '<b></b>' for i in range(3))
    return f'<span class="level"><i aria-hidden="true">{bars}</i>{l}</span>'
cats = [
 ("seo","search","SEO",[("Keyword research","Advanced"),("On-page SEO","Advanced"),("Technical SEO audits","Advanced"),("Core Web Vitals","Proficient")]),
 ("local","pin","Local SEO",[("Google Business Profile","Proficient"),("Local keyword targeting","Proficient"),("NAP consistency","Proficient"),("Location pages","Proficient")]),
 ("smo","share","SMO",[("Profile optimization","Proficient"),("Post &amp; hashtag optimization","Proficient"),("Content calendars","Proficient"),("Engagement tracking","Proficient")]),
 ("smm","mega","Social Media Marketing",[("Campaign planning","Proficient"),("Audience targeting","Proficient"),("Meta Ads","Familiar"),("Google Ads","Familiar")]),
 ("ai","spark","AI Visibility (GEO / AEO)",[("LLM citation tracking","Advanced"),("Prompt set design","Advanced"),("Source-priority analysis","Proficient"),("AI Overview optimization","Proficient")]),
 ("content","pen","Content &amp; Reporting",[("Content strategy","Advanced"),("FAQ sets","Advanced"),("GA4 &amp; GSC reporting","Advanced"),("KPI dashboards","Proficient")]),
]
cards = "\n".join(f'''          <article class="skill-card" id="{k}">
            <div class="icon-box">{ICON[i]}</div>
            <h3>{t}</h3>
            <ul class="skill-list">{"".join(f'<li><span>{n}</span>{level(l)}</li>' for n,l in items)}</ul>
          </article>''' for k,i,t,items in cats)
tlist = tool_pills("          ")

skills = header("Expertise", "Skills &amp; Expertise",
  "SEO, local SEO, SMO, social media marketing and AI search: the work I do day to day, and how deep I go in each.") + f'''

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="legend" data-reveal>{level("Advanced")}{level("Proficient")}{level("Familiar")}</div>
        <div class="skill-grid" data-reveal data-stagger>
{cards}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <div><span class="label">Toolkit</span><h2>Tools of the Trade</h2></div>
          <p class="muted">What I use for audits, research, tracking and reporting.</p>
        </div>
        <div class="tools" data-reveal data-stagger>
{tlist}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <div><span class="label">Industries</span><h2>Industries I&rsquo;ve worked in</h2></div>
          <p class="muted">Agency and in-house work across these sectors.</p>
        </div>
        <div class="industries" data-reveal data-stagger>
{chr(10).join(f'          <div class="industry"><span class="label">{d}</span><b>{n}</b></div>' for n,d in INDUSTRIES)}
        </div>
      </div>
    </section>'''

contact = header("Contact", "Get in Touch",
  "Have a project in mind or want to chat? Drop a message below.") + f'''

    <section class="section contact" style="padding-top:0">
      <div class="container grid-12">
        <aside class="contact-info" data-reveal data-stagger>
          <div><span class="badge-available"><span class="pulse"></span>Available for new projects</span></div>
          <a class="big-mail" href="mailto:omgupta0603@gmail.com">omgupta0603@gmail.com</a>
          <dl class="info-list">
            <div><dt>Location</dt><dd>Delhi, India</dd></div>
            <div><dt>Time zone</dt><dd>IST (UTC+5:30)</dd></div>
            <div><dt>Languages</dt><dd>English &middot; Hindi</dd></div>
          </dl>
          <div class="socials">
            <a class="social" href="https://github.com/omgupta0603-creator" aria-label="GitHub" target="_blank" rel="noopener">{ICON["github"]}</a>
            <a class="social" href="mailto:omgupta0603@gmail.com" aria-label="Email">{ICON["mail"]}</a>
          </div>
        </aside>

        <div class="contact-form" data-reveal>
          <form id="contact-form" class="form-card" novalidate>
            <div class="form-row">
              <div class="field"><label for="name">Name</label><input id="name" name="name" type="text" placeholder="Your name" autocomplete="name" required></div>
              <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required></div>
            </div>
            <div class="field"><label for="subject">Subject</label><input id="subject" name="subject" type="text" placeholder="SEO audit, AI visibility, content strategy" required></div>
            <div class="field"><label for="message">Message</label><textarea id="message" name="message" placeholder="Your site, your goals, and what&rsquo;s not working yet" required></textarea></div>
            <button class="btn btn-primary btn-block" type="submit">Send Message <span class="arrow">&rarr;</span></button>
            <p class="form-note" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </section>'''

pages = [
 ("index.html","Om Gupta | SEO & Content Strategist","Om Gupta is an SEO & Content Strategist in Delhi helping brands get found on Google and cited by AI search (GEO / AEO).",home),
 ("about.html","About | Om Gupta","Background, philosophy and experience of Om Gupta, SEO & Content Strategist.",about),
 ("skills.html","Skills & Expertise | Om Gupta","Technical SEO, GEO / AEO, content strategy, reporting and the tools Om Gupta uses.",skills),
 ("contact.html","Contact | Om Gupta","Get in touch with Om Gupta about SEO, AI visibility or content strategy projects.",contact),
]
for f,t,d,b in pages:
    (out/f).write_text(page(f,t,d,b))
