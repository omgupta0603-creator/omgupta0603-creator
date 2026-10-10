"""Generates the high-fidelity mockup pages (HTML) from the approved wireframes."""
import pathlib
OUT = pathlib.Path(__file__).parent

I = {
 "search": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
 "spark": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>',
 "gear": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
 "pen": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
 "chart": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/></svg>',
 "pin": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
 "doc": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>',
 "check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
 "share": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',
 "mega": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1Z"/><path d="M16 9a3 3 0 0 1 0 6M19 6a7 7 0 0 1 0 12"/></svg>',
 "github": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z"/></svg>',
 "in": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm7 0h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6v5.4h-4v-4.8c0-1.2 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5v4.9h-4v-11Z"/></svg>',
 "mail": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
}
PERSON = '''<svg class="person" viewBox="0 0 400 460" aria-hidden="true"><defs>
<linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#52627C"/><stop offset="1" stop-color="#1E293B"/></linearGradient>
<linearGradient id="rim" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#38BDF8"/><stop offset="1" stop-color="#818CF8"/></linearGradient></defs>
<path d="M30 460c6-96 70-150 170-150s164 54 170 150Z" fill="url(#pg)" stroke="url(#rim)" stroke-width="2"/>
<circle cx="200" cy="170" r="92" fill="url(#pg)" stroke="url(#rim)" stroke-width="2"/></svg>'''

TOOLS = [("GA","GA4","analytics"),("GSC","Search Console","search data"),("Se","Semrush","research"),("Ah","Ahrefs","backlinks"),
         ("SF","Screaming Frog","crawling"),("Mz","Moz","authority"),("Ub","Ubersuggest","keywords"),("Hj","Hotjar","behaviour"),
         ("Cl","Clarity","behaviour"),("Bi","Bing Webmaster","search data"),("Xl","Excel","reporting"),("PP","PowerPoint","decks")]
INDUSTRIES = [("B2B SaaS","Software"),("Logistics","Supply chain"),("Finance","Financial services"),("Healthcare-education","Health &amp; learning"),("D2C","Direct to consumer")]
CORE_SKILLS = ["SEO","Local SEO","SMO","Social Media Marketing","Technical SEO","On-page SEO","Keyword Research","GEO / AEO","Content Strategy","Google Business Profile","Meta Ads","Google Ads","GA4 Reporting"]

def tool_grid():
    return "".join(f'<div class="card" style="padding:28px 12px;text-align:center"><div style="width:52px;height:52px;margin:0 auto 14px;border-radius:14px;background:var(--surface-2);display:grid;place-items:center;font:600 13px var(--mono);color:var(--primary)">{m}</div><b style="font:600 14px var(--head)">{n}</b><div style="font:11px var(--mono);color:var(--faint);margin-top:4px">{k}</div></div>' for m,n,k in TOOLS)

def nav(active):
    lis = "".join(f'<li class="{"on" if n == active else ""}">{n}</li>' for n in ["Home", "About", "Skills", "Contact"])
    return f'<div class="wrap nav"><span class="logo">om<b>.</b>gupta</span><ul>{lis}</ul><span class="btn solid sm">Let&rsquo;s Talk &rarr;</span></div>'

def footer():
    return f'''<footer class="footer"><div class="wrap g g4">
  <div><span class="logo">om<b>.</b>gupta</span><p class="mt" style="margin-top:16px;line-height:1.7">SEO &amp; Content Strategist helping brands get found on Google and cited by AI.</p></div>
  <div><h4>Pages</h4><p>Home<br>About<br>Skills<br>Contact</p></div>
  <div><h4>Follow</h4><p>GitHub<br>LinkedIn<br>Email</p></div>
  <div><h4>Get in touch</h4><p style="color:#F8FAFC">omgupta0603@gmail.com</p><p>Delhi, India &middot; IST</p></div></div>
  <div class="wordmark fill">OM GUPTA</div>
  <div class="base"><div class="wrap row between"><span>&copy; 2026 Om Gupta &middot; SEO &amp; Content Strategist</span><span>Back to top &uarr;</span></div></div></footer>'''

def page_head(crumb, title_html, sub):
    return f'''<section class="page-head"><div class="glow" style="width:520px;height:420px;right:-80px;top:-120px;background:rgba(129,140,248,.25)"></div>
  <div class="wrap"><div class="crumb">Home <b>/</b> {crumb}</div><h1>{title_html}</h1><p style="font-size:20px;max-width:620px;margin-top:24px">{sub}</p></div></section>'''

def cta():
    return '''<section class="line-top" style="padding:96px 0"><div class="wrap card row between" style="padding:56px 64px;background:linear-gradient(120deg,rgba(56,189,248,.14),rgba(129,140,248,.14));border-color:rgba(56,189,248,.25)">
  <div><span class="label"><b>/</b> Next step</span><h2>Want your brand in the answer?</h2><p style="margin:14px 0 0;font-size:17px">Tell me about your site and goals, and we&rsquo;ll find where organic growth is hiding.</p></div>
  <div class="row" style="gap:14px;flex-shrink:0"><span class="btn solid">Let&rsquo;s Talk &rarr;</span><span class="btn">Download Resume</span></div></div></section>'''

def doc(name, active, body):
    return f'''<!doctype html><html><head><meta charset="utf-8"><title>Mockup · {name}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="mockup.css"></head><body><div class="page">{nav(active)}{body}{footer()}</div></body></html>'''

def lvl(n, label):
    bars = "".join('<b class="on"></b>' if i < n else "<b></b>" for i in range(3))
    return f'<span class="lvl"><i>{bars}</i>{label}</span>'

# ---------- HOME ----------
home = f'''
<section style="padding:24px 0 96px">
  <div class="glow" style="width:620px;height:520px;right:40px;top:80px;background:rgba(129,140,248,.28)"></div>
  <div class="glow" style="width:480px;height:420px;left:-120px;top:360px;background:rgba(56,189,248,.16)"></div>
  <div class="wordmark fill" style="margin-top:28px">OM GUPTA</div>
  <div class="wrap g" style="grid-template-columns:1.08fr 1fr;margin-top:-118px">
    <div style="padding-top:150px">
      <span class="chip ok"><span class="dot"></span>Available for new projects</span>
      <span class="label" style="margin:28px 0 18px">&#128075; Hello, World &middot; I&rsquo;m an <b style="border-bottom:1px solid var(--primary)">SEO Strategist</b></span>
      <h1 style="font-size:62px">Get found on Google.<br>Get <span class="accent">cited</span> by AI.</h1>
      <p style="font-size:19px;max-width:540px;margin:26px 0 36px">I&rsquo;m Om Gupta, an SEO &amp; Content Strategist in Delhi. I help B2B SaaS, logistics, finance, healthcare-education and D2C brands rank in search and show up in AI answers.</p>
      <div class="row" style="gap:14px"><span class="btn solid">See what I do &rarr;</span><span class="btn">Download Resume</span></div>
    </div>
    <div style="position:relative;height:640px">
      <div class="portrait" style="position:absolute;right:0;top:40px;width:470px;height:580px">{PERSON}<span class="chip tag">Portrait photo</span></div>
      <span class="chip blue" style="position:absolute;right:-24px;top:120px;background:#13233B">Technical SEO</span>
      <span class="chip blue" style="position:absolute;right:-24px;top:300px;background:#13233B">GEO / AEO</span>
      <div class="engine" style="position:absolute;left:-40px;bottom:-10px;width:370px">
        <div class="engine-bar">{I["search"]}<span>who can get my brand cited in AI?</span><span class="caret"></span></div>
        <div class="engine-body"><div class="tagline">Answer</div><strong>Om Gupta</strong> tracks how brands get cited across ChatGPT, Gemini, Perplexity and AI Overviews, then shapes content to earn them <span class="cite">1</span>. Backed by technical SEO <span class="cite">2</span>.</div>
        <div class="src"><span class="cite">1</span><div>About Om Gupta<small>omgupta / about</small></div></div>
        <div class="src" style="margin-bottom:20px"><span class="cite">2</span><div>Skills &amp; Expertise<small>omgupta / skills</small></div></div>
      </div>
    </div>
  </div></section>

<section class="line-top" style="padding:40px 0;border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="row between"><span class="label" style="margin:0">Teams I&rsquo;ve worked with</span>
  <div class="row" style="gap:56px;font:700 20px var(--head);color:#CBD5E1">{"".join(f"<span>{n}</span>" for n in ["AdLift Marketing","Ebslon Infotech","Solarman","Shadow Infosystem"])}</div></div>
  <div class="row between" style="margin-top:22px"><span class="label" style="margin:0">Optimizing for</span>
  <div class="row" style="gap:40px;font:600 15px var(--mono);color:var(--muted)">{"".join(f"<span>{n}</span>" for n in ["Google","AI Overviews","ChatGPT","Gemini","Perplexity"])}</div></div></div></section>

<section><div class="wrap">
  <div class="row between" style="align-items:flex-end"><div><span class="label"><b>/</b> What I do</span><h2>How I grow organic visibility</h2></div><p style="max-width:400px;margin:0">Search, local and social, usually combined into one plan for your brand.</p></div>
  <div class="g g4" style="margin-top:56px">{"".join(f'<div class="card"><div class="ico">{I[i]}</div><h3>{t}</h3><p style="margin:12px 0 28px;font-size:15px">{d}</p><span class="more">Explore &rarr;</span></div>' for i,t,d in [("search","SEO","Keyword research, on-page and technical SEO, from GSC audits to Core Web Vitals."),("pin","Local SEO","Google Business Profile, local keywords and consistent business details across the web."),("share","SMO &amp; social media","Profile optimization, content calendars and Meta Ads campaigns."),("spark","AI visibility","Citation tracking across LLMs, prompt sets and content tuned to get cited.")])}</div></div></section>


<section class="line-top"><div class="wrap">
  <div class="row between" style="align-items:flex-end"><div><span class="label"><b>/</b> Skills &amp; tools</span><h2>What I bring to the work</h2></div><span class="btn sm">All skills &rarr;</span></div>
  <div class="g" style="grid-template-columns:5fr 7fr;gap:48px;margin-top:56px;align-items:start">
    <div class="card" style="padding:36px"><h3 style="margin-bottom:22px">Core skills</h3><div class="row" style="flex-wrap:wrap;gap:10px">{"".join(f'<span class="chip{" blue" if k < 4 else ""}" style="font:600 14px var(--head);padding:10px 18px;{"" if k < 4 else "color:var(--text)"}">{n}</span>' for k,n in enumerate(CORE_SKILLS))}</div></div>
    <div><h3 style="margin-bottom:22px">Tools I use</h3><div class="g" style="grid-template-columns:repeat(4,1fr);gap:14px">{tool_grid()}</div></div>
  </div></div></section>

<section class="line-top" style="padding:88px 0"><div class="wrap">
  <span class="label"><b>/</b> Industries</span><h2>Industries I&rsquo;ve worked in</h2>
  <div class="g" style="grid-template-columns:repeat(5,1fr);margin-top:48px;gap:16px">{"".join(f'<div class="card" style="padding:28px 24px"><span class="label" style="margin-bottom:10px">{d}</span><b style="font:700 20px var(--head);letter-spacing:-.01em">{n}</b></div>' for n,d in INDUSTRIES)}</div></div></section>
<section class="line-top"><div class="wrap g g2" style="align-items:center;gap:80px">
  <div class="portrait" style="height:520px">{PERSON}<span class="chip tag">Working photo</span></div>
  <div><span class="label"><b>/</b> Meet Om</span><h2>Three-plus years of making brands easier to find.</h2>
  <p style="font-size:17px;margin-top:24px">I&rsquo;ve worked across agencies and in-house teams on technical SEO, content strategy, local search and paid social. Today most of my work sits where classic search meets AI search.</p>
  <p style="font-size:17px">I&rsquo;m an SEO &amp; Content Strategist at AdLift Marketing, based in Delhi.</p>
  <div class="row" style="margin-top:32px;gap:14px"><span class="btn">More about me &rarr;</span></div></div></div></section>

<section class="line-top"><div class="wrap g" style="grid-template-columns:1.3fr 1fr 1fr">
  <div class="card" style="grid-row:span 2;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(150deg,rgba(56,189,248,.18),rgba(129,140,248,.1));border-color:rgba(56,189,248,.3)">
    <span class="label"><b>/</b> Experience</span><div><div class="stat-big grad-text">3+</div><h3 style="font-size:28px;margin-top:12px">Years in SEO &amp; content</h3><p style="margin-top:10px">Since April 2023, across four teams.</p></div></div>
  {"".join(f'<div class="card"><div class="stat">{n}</div><p style="margin:10px 0 0">{l}</p></div>' for n,l in [("4","Teams, agency &amp; in-house"),("5","Industries served"),("5","Search &amp; AI engines"),("12","Tools in daily use")])}
  </div></section>

<section class="line-top"><div class="wrap"><span class="label"><b>/</b> How I work</span><h2>From audit to answer</h2>
  <div class="g g4" style="margin-top:56px;gap:0;border:1px solid var(--line);border-radius:20px;overflow:hidden">{"".join(f'<div style="padding:36px 32px;{"border-left:1px solid var(--line);" if k else ""}"><div class="num">0{k+1}</div><h3 style="margin:14px 0 10px">{t}</h3><p style="font-size:15px;margin:0">{d}</p></div>' for k,(t,d) in enumerate([("Audit","Crawl, GSC coverage and an AI-citation baseline."),("Strategy","Prioritised fixes, topics and prompt sets."),("Execute","Technical fixes and content that earns citations."),("Measure","GA4, GSC and citation tracking in one report.")]))}</div></div></section>

<section class="line-top"><div class="wrap"><div class="row between" style="align-items:flex-end"><div><span class="label"><b>/</b> Selected work</span><h2>Recent projects</h2></div><span class="btn sm">All work &rarr;</span></div>
  <div class="g g3" style="margin-top:56px">{"".join(f'<div class="card" style="padding:0;overflow:hidden"><div style="height:200px;background:{bg};position:relative"><span class="chip" style="position:absolute;left:20px;top:20px;background:rgba(15,23,42,.7)">{tag}</span></div><div style="padding:28px"><h3>{t}</h3><p style="font-size:15px;margin:10px 0 18px">{d}</p><span class="chip blue">Add result metric</span></div></div>' for tag,t,d,bg in [("B2B SaaS","AI citation tracking","Prompt sets and source-priority analysis across four LLMs.","radial-gradient(80% 90% at 20% 0%,rgba(56,189,248,.5),transparent),#1E293B"),("Logistics","Technical SEO recovery","GSC coverage audit and traffic-drop diagnosis.","radial-gradient(80% 90% at 80% 0%,rgba(129,140,248,.5),transparent),#1E293B"),("D2C","Content &amp; FAQ program","Product-page optimization and topic clusters.","radial-gradient(80% 90% at 50% 100%,rgba(56,189,248,.4),transparent),#1E293B")])}</div></div></section>

<section class="line-top"><div class="wrap"><span class="label"><b>/</b> Kind words</span><h2>What people say</h2>
  <div class="g g2" style="margin-top:56px">{"".join('<div class="card" style="padding:40px"><span class="quote-mark">&ldquo;</span><p style="font-size:18px;color:#CBD5E1;margin:24px 0 28px">Add a short quote from a manager, colleague or client about working with you. Two or three sentences is plenty.</p><div class="row" style="gap:14px"><div style="width:48px;height:48px;border-radius:50%;background:var(--grad)"></div><div><b style="font-family:var(--head)">Name Surname</b><div style="font:12px var(--mono);color:var(--faint)">Role @ Company</div></div></div></div>' for _ in range(2))}</div></div></section>

<section class="line-top"><div class="wrap"><div class="row between" style="align-items:flex-end"><div><span class="label"><b>/</b> Free resources</span><h2>Templates &amp; checklists I use</h2></div><p style="max-width:380px;margin:0">Shared on my GitHub. Client data is never included.</p></div>
  <div class="g g3" style="margin-top:56px">{"".join(f'<div class="card"><div class="ico">{I[i]}</div><h3>{t}</h3><p style="font-size:15px;margin:10px 0 24px">{d}</p><span class="btn sm">{I["github"].replace("<svg ","<svg width=16 height=16 ")} Open on GitHub</span></div>' for i,t,d in [("check","SEO audit checklist","The checks I run before any recommendation."),("search","GEO / AEO tracking template","Prompt sets and a citation log for AI engines."),("doc","Content optimization workflow","From content gap to published, optimized page.")])}</div></div></section>
{cta()}'''

# ---------- ABOUT ----------
jobs = [("SEO &amp; Content Strategist","AdLift Marketing","Mar 2026 – Present",True,["AI visibility: citation tracking across LLMs, prompt sets, source-priority analysis","Blog and product-page optimization, FAQ sets and topic clusters","GA4, GSC and Semrush data turned into client decks"]),
        ("SEO Executive","Ebslon Infotech","May 2025 – Mar 2026",False,["Technical SEO: canonicals, robots.txt, Core Web Vitals, GSC audits","Content gap analysis and on-page optimization"]),
        ("SMO &amp; SEO Executive","Solarman Technology Project","Apr 2024 – May 2025",False,["Social media optimization alongside organic search","Google Business Profile and local visibility"]),
        ("SEO Executive","Shadow Infosystem","Apr 2023 – Apr 2024",False,["Keyword research, on-page SEO and reporting","Supported Google Ads and Meta Ads campaigns"])]
about = page_head("About", 'About <span class="grad-text">Me</span>', "The person behind the rankings and the citations.") + f'''
<section style="padding-top:0"><div class="wrap g" style="grid-template-columns:5fr 7fr;gap:80px;align-items:start">
  <div><div class="portrait" style="height:600px">{PERSON}<span class="chip tag">Portrait photo</span></div>
    <div class="row between" style="margin-top:14px;font:12px var(--mono);color:var(--faint)"><span>Om Gupta (OMG)</span><span>Delhi &middot; IST</span></div></div>
  <div><span class="label"><b>/</b> My story</span><h2>Hi, I&rsquo;m Om.<br>People call me OMG.</h2>
    <p style="font-size:17px;margin-top:28px">Over the last three-plus years I&rsquo;ve worked across agencies and in-house teams on technical SEO, content strategy, local search and paid social.</p>
    <p style="font-size:17px">Today a lot of my work sits where classic search meets AI search. I track how brands get cited across ChatGPT, Gemini, Perplexity and Google AI Overviews, then shape content so it earns those citations as well as rankings.</p>
    <div style="margin:36px 0;padding-left:24px;border-left:2px solid var(--secondary);font:700 24px/1.4 var(--head);letter-spacing:-.01em">Good SEO is clear answers on a technically sound site, measured honestly. Rankings and citations follow.</div>
    <div class="g g4" style="padding-top:28px;border-top:1px solid var(--line)">{"".join(f'<div><span class="label" style="margin-bottom:6px">{k}</span><b style="font-family:var(--head)">{v}</b></div>' for k,v in [("Currently","AdLift Marketing"),("Education","BCA, IGNOU"),("Based in","Delhi, India"),("Languages","English · Hindi")])}</div>
    <div class="row" style="margin-top:36px;gap:14px"><span class="btn solid">Download Resume</span><span class="btn">Let&rsquo;s Talk &rarr;</span></div></div></div></section>

<section class="line-top" style="padding:64px 0"><div class="wrap g g4">{"".join(f'<div class="card" style="text-align:center"><div class="stat grad-text">{n}</div><p style="margin:10px 0 0">{l}</p></div>' for n,l in [("3+","Years of experience"),("4","Teams"),("5","Industries"),("5","Search &amp; AI engines")])}</div></section>

<section class="line-top"><div class="wrap g" style="grid-template-columns:4fr 8fr;gap:64px">
  <div><span class="label"><b>/</b> Experience</span><h2>Where I&rsquo;ve worked</h2><p style="margin-top:18px">Most recent first. Each role added a layer: research, local, technical, then AI search.</p></div>
  <div class="tl">{"".join(f'<div class="tl-i card{" now" if cur else ""}" style="{"border-color:rgba(56,189,248,.35)" if cur else ""}"><div class="row between"><h3>{r}</h3><span class="chip{" blue" if cur else ""}">{d}</span></div><div style="color:var(--primary);font-weight:600;margin-top:6px">{c}</div><ul>{"".join(f"<li>{b}</li>" for b in bs)}</ul></div>' for r,c,d,cur,bs in jobs)}</div></div></section>

<section class="line-top"><div class="wrap g g2" style="gap:48px">
  <div><span class="label"><b>/</b> Education</span>
    <div class="card"><span class="chip blue">Degree</span><h3 style="margin-top:18px;font-size:26px">Bachelor of Computer Applications</h3><p style="margin:8px 0 0">Indira Gandhi National Open University (IGNOU)</p></div>
    <div class="card" style="margin-top:20px;border-style:dashed"><span class="chip">Certifications</span><h3 style="margin-top:18px">Add your certificates here</h3><p style="margin:8px 0 0">e.g. Google Analytics, HubSpot, Semrush Academy</p></div></div>
  <div><span class="label"><b>/</b> How I approach SEO</span>{"".join(f'<div class="card" style="margin-bottom:20px;display:flex;gap:20px"><div class="ico" style="margin:0;flex-shrink:0">{I[i]}</div><div><h3>{t}</h3><p style="margin:6px 0 0;font-size:15px">{d}</p></div></div>' for i,t,d in [("pen","Clear answers","Content that answers the real question, so people and AI engines can use it."),("gear","Technically sound sites","Crawlable, indexable, fast. The basics come first."),("chart","Honest measurement","Report what moved and what didn&rsquo;t, with the data to show it.")])}</div></div></section>
{cta()}'''

# ---------- SKILLS ----------
cats = [("search","SEO",[("Keyword research",3),("On-page SEO",3),("Technical SEO audits",3),("Core Web Vitals",2)]),
        ("pin","Local SEO",[("Google Business Profile",2),("Local keyword targeting",2),("NAP consistency",2),("Location pages",2)]),
        ("share","SMO",[("Profile optimization",2),("Post &amp; hashtag optimization",2),("Content calendars",2),("Engagement tracking",2)]),
        ("mega","Social Media Marketing",[("Campaign planning",2),("Audience targeting",2),("Meta Ads",1),("Google Ads",1)]),
        ("spark","AI Visibility (GEO / AEO)",[("LLM citation tracking",3),("Prompt set design",3),("Source-priority analysis",2),("AI Overview optimization",2)]),
        ("pen","Content &amp; Reporting",[("Content strategy",3),("FAQ sets",3),("GA4 &amp; GSC reporting",3),("KPI dashboards",2)])]
LN = {3:"Advanced",2:"Proficient",1:"Familiar"}
skills = page_head("Skills", 'Skills &amp; <span class="grad-text">Expertise</span>', "SEO, local SEO, SMO, social media marketing and AI search: the work I do day to day, and how deep I go in each.") + f'''
<section style="padding-top:0"><div class="wrap">
  <div class="row" style="gap:28px;margin-bottom:28px">{lvl(3,"Advanced")}{lvl(2,"Proficient")}{lvl(1,"Familiar")}</div>
  <div class="g g3">{"".join(f'<div class="card"><div class="ico">{I[i]}</div><h3>{t}</h3><div style="margin-top:20px">' + "".join(f'<div class="row between" style="padding:12px 0;border-top:1px solid var(--line);font-size:15px"><span>{n}</span>{lvl(l,LN[l])}</div>' for n,l in items) + '</div></div>' for i,t,items in cats)}</div></div></section>

<section class="line-top"><div class="wrap"><span class="label"><b>/</b> Core strengths</span><h2>Search and social</h2>
  <div class="g g2" style="margin-top:56px;gap:80px">{"".join(f'<div><h3 style="margin-bottom:24px">{t}</h3>' + "".join(f'<div class="row between" style="font:500 12px var(--mono);letter-spacing:.1em;text-transform:uppercase"><span>{s}</span><span style="color:var(--primary)">{lv}</span></div><div class="bar"><span style="width:{w}%"></span></div>' for s,lv,w in items) + '</div>' for t,items in [("Search",[("SEO","Advanced",90),("Technical SEO","Advanced",88),("AI search (GEO / AEO)","Advanced",86),("Local SEO","Proficient",68)]),("Social",[("SMO","Proficient",68),("Social media marketing","Proficient",64),("Meta Ads","Familiar",38),("Google Ads","Familiar",34)])])}</div></div></section>

<section class="line-top"><div class="wrap"><div class="row between" style="align-items:flex-end"><div><span class="label"><b>/</b> Toolkit</span><h2>Tools of the Trade</h2></div><p style="max-width:380px;margin:0">What I use for audits, research, tracking and reporting.</p></div>
  <div class="g g6" style="margin-top:56px;gap:16px">{tool_grid()}</div></div></section>

<section class="line-top" style="padding:80px 0"><div class="wrap row between"><div><span class="label"><b>/</b> Industries</span><h2 style="font-size:36px">Industries I&rsquo;ve worked in</h2></div>
  <div class="row" style="gap:12px;flex-wrap:wrap;max-width:640px;justify-content:flex-end">{"".join(f'<span class="chip" style="font:600 16px var(--head);padding:12px 22px;color:var(--text)">{n}</span>' for n,_ in INDUSTRIES)}</div></div></section>
{cta()}'''

# ---------- CONTACT ----------
contact = page_head("Contact", 'Get in <span class="grad-text">Touch</span>', "Have a project in mind or want to chat? Drop a message below.") + f'''
<section style="padding-top:0"><div class="wrap g" style="grid-template-columns:5fr 7fr;gap:80px;align-items:start">
  <div><span class="chip ok"><span class="dot"></span>Available for new projects</span>
    <div style="font:800 34px var(--head);letter-spacing:-.02em;margin:32px 0 36px">omgupta0603@gmail.com</div>
    {"".join(f'<div class="row between" style="padding:18px 0;border-top:1px solid var(--line)"><span class="label" style="margin:0">{k}</span><span>{v}</span></div>' for k,v in [("Location","Delhi, India"),("Time zone","IST (UTC+5:30)"),("Languages","English &middot; Hindi")])}
    <div style="border-top:1px solid var(--line);padding-top:28px"><span class="label">Find me online</span><div class="row" style="gap:12px">{"".join(f'<span style="width:52px;height:52px;border-radius:14px;border:1px solid var(--line-2);display:grid;place-items:center;color:var(--muted)">{I[k].replace("<svg ","<svg width=20 height=20 ")}</span>' for k in ["github","in","mail"])}</div></div></div>
  <div class="card" style="padding:44px;background:var(--surface);border-color:var(--line-2)"><h3 style="font-size:26px;margin-bottom:28px">Send a message</h3>
    <div class="g g2" style="gap:16px"><div><div class="label" style="margin-bottom:8px">Name</div><div class="field focus">Your name<span class="caret" style="margin-left:2px"></span></div></div><div><div class="label" style="margin-bottom:8px">Email</div><div class="field">you@company.com</div></div></div>
    <div class="label" style="margin-bottom:8px">I need help with</div>
    <div class="row" style="gap:10px;margin-bottom:20px">{"".join(f'<span class="chip{" blue" if k==1 else ""}">{n}</span>' for k,n in enumerate(["SEO","Local SEO","SMO / social media","AI visibility"]))}</div>
    <div class="label" style="margin-bottom:8px">Subject</div><div class="field">SEO audit, AI visibility, content strategy</div>
    <div class="label" style="margin-bottom:8px">Message</div><div class="field area">Your site, your goals, and what&rsquo;s not working yet</div>
    <div class="btn solid" style="width:100%;justify-content:center;margin-top:8px">Send Message &rarr;</div></div></div></section>

<section class="line-top"><div class="wrap"><span class="label"><b>/</b> What happens next</span><h2>What happens after you write</h2>
  <div class="g g3" style="margin-top:56px">{"".join(f'<div class="card"><div class="num">0{k+1}</div><h3 style="margin:14px 0 10px">{t}</h3><p style="margin:0;font-size:15px">{d}</p></div>' for k,(t,d) in enumerate([("You send a message","Tell me about your site, your goals and what isn&rsquo;t working."),("I reply by email","With questions, first thoughts and a time to talk."),("We plan the first step","Usually an audit or a baseline of your AI citations.")]))}</div></div></section>

<section class="line-top"><div class="wrap g" style="grid-template-columns:4fr 8fr;gap:64px"><div><span class="label"><b>/</b> FAQ</span><h2>Before you write</h2></div>
  <div><div class="faq" style="flex-direction:column;align-items:stretch"><div class="row between"><span>Which industries do you work with?</span><span class="pm">&minus;</span></div><p style="font:400 16px var(--body);margin:14px 0 0">B2B SaaS, logistics, finance, healthcare-education and D2C so far, across SEO, local SEO and social media.</p></div>
  {"".join(f'<div class="faq"><span>{q}</span><span class="pm">+</span></div>' for q in ["Do you take one-off SEO audits?","Can you track how AI tools cite my brand?","Do you work with clients outside India?"])}</div></div></section>'''

for name, active, body in [("home","Home",home),("about","About",about),("skills","Skills",skills),("contact","Contact",contact)]:
    (OUT / f"mockup-{name}.html").write_text(doc(name, active, body))
print("written")
