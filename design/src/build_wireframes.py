"""Generates the low-fidelity wireframe pages (HTML) for the portfolio redesign."""
import pathlib
OUT = pathlib.Path(__file__).parent

def ph(label, h, extra="", style=""):
    inner = f"<i>{label}</i>" if label else ""
    return f'<div class="ph {extra}" style="height:{h}px;{style}">{inner}</div>'

def lines(*sizes):
    return "".join(f'<div class="ln {s}"></div>' for s in sizes)

def anno(tag, ref):
    return f'<div class="anno"><b>{tag}</b><span>{ref}</span></div>'

def nav(active):
    items = "".join(f'<li class="{"on" if n == active else ""}">{n}</li>' for n in ["Home", "About", "Skills", "Contact"])
    return f'''<section class="wf tight">{anno("Nav · sticky", "ref: Kevin Indig, minimal top bar + single CTA")}
  <div class="wrap nav"><span class="logo">om.gupta</span><ul>{items}</ul><span class="btn solid sm">Let&rsquo;s Talk</span></div></section>'''

def footer():
    return f'''<section class="wf foot">{anno("Footer", "ref: Kevin Indig, giant outlined name + link columns")}
  <div class="wrap g g4">
    <div><h4>om.gupta</h4>{lines("l","m")}</div>
    <div><h4>Pages</h4><p>Home<br>About<br>Skills<br>Contact</p></div>
    <div><h4>Follow</h4><p>GitHub<br>LinkedIn<br>Email</p></div>
    <div><h4>Get in touch</h4><p>omgupta0603@gmail.com<br>Delhi, India · IST</p></div>
  </div>
  <div class="outline-word">OM GUPTA</div>
  <div class="wrap row between mt16" style="font-size:12px"><span>&copy; 2026 Om Gupta</span><span>Back to top &uarr;</span></div></section>'''

def page_header(title, sub, ref):
    return f'''<section class="wf">{anno("Page header", ref)}
  <div class="wrap"><div class="eyebrow">Home / {title}</div><h1 style="font-size:72px">{title}</h1><p style="font-size:18px;max-width:560px">{sub}</p></div></section>'''

def cta():
    return f'''<section class="wf dark">{anno("CTA band", "ref: Reeni &lsquo;Elevate your brand&rsquo; block")}
  <div class="wrap row between"><div><div class="eyebrow">Next step</div><h2>Want your brand in the answer?</h2>{lines("m")}</div>
  <div class="row"><span class="btn solid">Let&rsquo;s Talk &rarr;</span><span class="btn">Download Resume</span></div></div></section>'''

def sheet(name, active, body):
    return f'''<!doctype html><html><head><meta charset="utf-8"><title>Wireframe · {name}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="wireframe.css"></head><body><div class="sheet">
<div class="sheet-head"><b>Om Gupta · Portfolio</b><span>WIREFRAME · {name.upper()} · DESKTOP 1440</span><span>Low-fi · v1</span></div>
{nav(active)}
{body}
{footer()}
</div></body></html>'''

home = f'''
<section class="wf" style="padding:40px 0 72px">{anno("01 Hero", "ref: Kevin Indig wordmark · Reeni rotating roles · our AI-answer card")}
  <div class="outline-word" style="margin-top:20px">OM GUPTA</div>
  <div class="wrap g" style="grid-template-columns:1.05fr 1fr;margin-top:-90px;position:relative">
    <div style="padding-top:110px">
      <span class="chip">&#9679; Available for new projects</span>
      <div class="eyebrow mt16">Hello, World · I&rsquo;m an <u>SEO Strategist</u> / GEO Specialist / Content Strategist</div>
      <h1>Get found on Google.<br>Get cited by AI.</h1>
      {lines("l","l","m")}
      <div class="row mt24"><span class="btn solid">See what I do &rarr;</span><span class="btn">Download Resume</span></div>
    </div>
    <div style="position:relative">
      {ph("Portrait cutout (transparent PNG)", 520)}
      <div class="box" style="position:absolute;left:-60px;bottom:-30px;width:330px;box-shadow:0 10px 30px rgba(0,0,0,.08)">
        <div class="field" style="margin-bottom:10px">&#128269; who can get my brand cited in AI answers?</div>
        <h4>AI answer card</h4>{lines("l","l","m")}<span class="chip">[1] About</span><span class="chip">[2] Skills</span>
      </div>
      <span class="chip" style="position:absolute;top:30px;right:-10px">Technical SEO</span>
      <span class="chip" style="position:absolute;top:220px;right:-10px">GEO / AEO</span>
    </div>
  </div></section>

<section class="wf tight">{anno("02 Proof strip", "ref: Kevin Indig logo wall")}
  <div class="wrap row between mt16"><div class="eyebrow" style="margin:0">Teams I&rsquo;ve worked with</div>
  <div class="row" style="gap:20px">{"".join(ph(n,44,style="width:150px") for n in ["AdLift Marketing","Ebslon Infotech","Solarman","Shadow Infosystem"])}</div></div>
  <div class="wrap row between mt16"><div class="eyebrow" style="margin:0">Optimizing for</div><div class="row" style="gap:28px;font-weight:700;color:#6B7280">Google · AI Overviews · ChatGPT · Gemini · Perplexity</div></div></section>

<section class="wf">{anno("03 Services", "ref: Kevin Indig 2-up cards · Dribbble &lsquo;What I can do&rsquo;")}
  <div class="wrap"><div class="row between"><div><div class="eyebrow">What I do</div><h2>How I grow organic visibility</h2></div><div style="width:380px">{lines("l","m")}</div></div>
  <div class="g g4 mt32">{"".join(f'<div class="box"><div class="ico"></div><h3>{t}</h3>{lines("l","l","m")}<div class="mt16" style="font-size:12px;font-weight:700;letter-spacing:.1em">EXPLORE &rarr;</div></div>' for t in ["AI visibility (GEO/AEO)","Technical SEO","Content strategy","Reporting"])}</div></div></section>

<section class="wf dark">{anno("04 Meet Om", "ref: Kevin Indig &lsquo;Meet Kevin&rsquo; · Aleyda intro card")}
  <div class="wrap g g2" style="align-items:center">{ph("Working photo / speaking photo", 420)}
  <div><div class="eyebrow">Meet Om</div><h2>SEO &amp; Content Strategist, 3+ years, Delhi</h2>{lines("l","l","l","m")}<div class="row mt24"><span class="btn">More about me &rarr;</span></div></div></div></section>

<section class="wf">{anno("05 Numbers", "ref: Reeni big experience card + stat tiles")}
  <div class="wrap g" style="grid-template-columns:1.3fr 1fr 1fr">
    <div class="box fill" style="grid-row:span 2"><div style="font-size:96px;font-weight:900;line-height:1">3+</div><h3>Years of experience</h3>{lines("l","m")}</div>
    <div class="box"><div style="font-size:40px;font-weight:800">4</div><p>Teams, agency &amp; in-house</p></div>
    <div class="box"><div style="font-size:40px;font-weight:800">5</div><p>Industries served</p></div>
    <div class="box"><div style="font-size:40px;font-weight:800">5</div><p>Search &amp; AI engines</p></div>
    <div class="box"><div style="font-size:40px;font-weight:800">12</div><p>Tools in daily use</p></div>
  </div></section>

<section class="wf">{anno("06 Process · real sequence", "ref: Reeni numbered list (01–04 used because order matters)")}
  <div class="wrap"><div class="eyebrow">How I work</div><h2>From audit to answer</h2>
  <div class="g g4 mt32">{"".join(f'<div class="box"><div class="num">0{i+1}</div><h3 class="mt8">{t}</h3>{lines("l","m")}</div>' for i,t in enumerate(["Audit","Strategy","Execute","Measure"]))}</div></div></section>

<section class="wf dark">{anno("07 Selected work", "ref: Reeni portfolio grid · add real case studies")}
  <div class="wrap"><div class="row between"><div><div class="eyebrow">Selected work</div><h2>Recent projects</h2></div><span class="btn sm">All work &rarr;</span></div>
  <div class="g g3 mt32">{"".join(f'<div class="box">{ph("Project cover", 180)}<span class="chip mt16">{t}</span><h3>Case study title</h3>{lines("l","m")}<div style="font-weight:800;font-size:22px">[ result metric ]</div></div>' for t in ["B2B SaaS","Logistics","D2C"])}</div></div></section>

<section class="wf">{anno("08 Testimonials · optional", "ref: Kevin Indig quote cards · Aleyda carousel")}
  <div class="wrap"><div class="eyebrow">Kind words</div><h2>What people say</h2>
  <div class="g g2 mt32">{"".join(f'<div class="box"><div style="font-size:48px;line-height:1;color:#D1D5DB">&ldquo;</div>{lines("l","l","l","m")}<div class="row mt16">{ph("",44,"round",style="width:44px;flex-shrink:0")}<div><h4 style="margin:0">Name</h4><p style="margin:0;font-size:12px">Role, Company</p></div></div></div>' for _ in range(2))}</div>
  <div class="row mt16" style="justify-content:center;gap:8px">&#9679; &#9675; &#9675;</div></div></section>

<section class="wf">{anno("09 Free resources", "ref: Aleyda &lsquo;Herramientas y recursos&rsquo; · from Om&rsquo;s GitHub")}
  <div class="wrap"><div class="eyebrow">Free resources</div><h2>Templates &amp; checklists I use</h2>
  <div class="g g3 mt32">{"".join(f'<div class="box"><div class="ico"></div><h3>{t}</h3>{lines("l","m")}<span class="btn sm mt8">Open on GitHub &rarr;</span></div>' for t in ["SEO audit checklist","GEO / AEO tracking template","Content optimization workflow"])}</div></div></section>
{cta()}'''

about = page_header("About Me", "The person behind the rankings and the citations.", "ref: Dribbble headers · breadcrumb from Aleyda") + f'''
<section class="wf">{anno("Bio split", "ref: Aleyda portrait + intro card")}
  <div class="wrap g" style="grid-template-columns:5fr 7fr;align-items:start">
    <div>{ph("Portrait with glow backdrop", 520)}<div class="row between mt8" style="font-size:12px;color:#9CA3AF"><span>Om Gupta (OMG)</span><span>Delhi · IST</span></div></div>
    <div><div class="eyebrow">My story</div><h2>Hi, I&rsquo;m Om. People call me OMG.</h2>{lines("l","l","l","m")}{lines("l","l","s")}
      <div class="box fill mt24" style="border-left:4px solid #6B7280"><h3 style="margin:0">&ldquo;Philosophy statement in one line.&rdquo;</h3></div>
      <div class="g g4 mt24">{"".join(f'<div><div class="eyebrow" style="margin:0">{k}</div><h4>{v}</h4></div>' for k,v in [("Currently","AdLift"),("Education","BCA, IGNOU"),("Based in","Delhi"),("Languages","EN · HI")])}</div>
      <div class="row mt24"><span class="btn solid">Download Resume</span><span class="btn">Let&rsquo;s Talk</span></div></div>
  </div></section>

<section class="wf dark">{anno("Stats row", "ref: Dribbble stat strip")}
  <div class="wrap g g4">{"".join(f'<div class="box center"><div style="font-size:40px;font-weight:800">{n}</div><p>{l}</p></div>' for n,l in [("3+","Years"),("4","Teams"),("5","Industries"),("5","Engines")])}</div></section>

<section class="wf">{anno("Experience timeline", "ref: Reeni experience list · vertical nodes")}
  <div class="wrap g" style="grid-template-columns:4fr 8fr"><div><div class="eyebrow">Experience</div><h2>Where I&rsquo;ve worked</h2>{lines("l","m")}</div>
  <div class="tl">{"".join(f'<div class="tl-i box"><div class="row between"><h3 style="margin:0">{r}</h3><span class="chip">{d}</span></div><p><b>{c}</b></p>{lines("l","m")}</div>' for r,c,d in [("SEO &amp; Content Strategist","AdLift Marketing","Mar 2026 – Present"),("SEO Executive","Ebslon Infotech","May 2025 – Mar 2026"),("SMO &amp; SEO Executive","Solarman Technology Project","Apr 2024 – May 2025"),("SEO Executive","Shadow Infosystem","Apr 2023 – Apr 2024")])}</div></div></section>

<section class="wf dark">{anno("Education + approach", "ref: Reeni education &amp; experience 2-col cards")}
  <div class="wrap g g2">
    <div><div class="eyebrow">Education</div><div class="box"><span class="chip">Degree</span><h3>BCA</h3><p>Indira Gandhi National Open University</p>{lines("m")}</div>
      <div class="box mt16"><span class="chip">Certifications</span><h3>Add certificates (GA4, HubSpot, Semrush…)</h3>{lines("m")}</div></div>
    <div><div class="eyebrow">How I approach SEO</div>{"".join(f'<div class="box mt16" style="margin-top:0;margin-bottom:16px"><h3>{t}</h3>{lines("l","m")}</div>' for t in ["Clear answers","Technically sound sites","Honest measurement"])}</div>
  </div></section>
{cta()}'''

skills = page_header("Skills &amp; Expertise", "From crawl budgets to LLM citations: what I do and how deep I go.", "ref: Dribbble headers") + f'''
<section class="wf">{anno("Skill category grid 3×2", "ref: Dribbble &lsquo;What I can do&rsquo; cards + level chips")}
  <div class="wrap"><div class="row" style="gap:16px"><span class="chip">&#9632;&#9632;&#9632; Advanced</span><span class="chip">&#9632;&#9632;&#9633; Proficient</span><span class="chip">&#9632;&#9633;&#9633; Familiar</span></div>
  <div class="g g3 mt16">{"".join(f'<div class="box"><div class="ico"></div><h3>{t}</h3>' + "".join(f'<div class="row between" style="border-top:1px solid #E5E7EB;padding:10px 0"><span style="font-size:13px">Skill item</span><span class="chip" style="margin:0">Level</span></div>' for _ in range(4)) + '</div>' for t in ["AI Visibility (GEO/AEO)","Technical SEO","Content Strategy","Reporting &amp; Analytics","Local &amp; Paid","Research"])}</div></div></section>

<section class="wf dark">{anno("Core strengths bars", "ref: Reeni Design Skill / Development Skill bars")}
  <div class="wrap g g2">{"".join(f'<div><h3>{t}</h3>' + "".join(f'<div class="row between" style="font-size:12px;font-weight:600;letter-spacing:.06em"><span>{s}</span><span>{lv}</span></div><div class="bar"><span style="width:{w}%"></span></div>' for s,lv,w in items) + '</div>' for t,items in [("Search (classic)",[("TECHNICAL SEO","Advanced",90),("ON-PAGE &amp; CONTENT","Advanced",90),("LOCAL SEO","Proficient",65),("PAID (ADS)","Familiar",35)]),("AI search",[("LLM CITATION TRACKING","Advanced",90),("PROMPT SET DESIGN","Advanced",85),("SOURCE-PRIORITY ANALYSIS","Proficient",65),("AI OVERVIEW OPTIMIZATION","Proficient",65)])])}</div></section>

<section class="wf">{anno("Tools of the trade 6×2", "ref: Kevin Indig logo wall · hover cards")}
  <div class="wrap"><div class="eyebrow">Toolkit</div><h2>Tools of the Trade</h2>
  <div class="g g6 mt32">{"".join(f'<div class="box center" style="padding:20px 8px">{ph("",48,"round",style="width:48px;margin:0 auto 10px")}<h4 style="margin:0;font-size:13px">{n}</h4></div>' for n in ["GA4","Search Console","Semrush","Ahrefs","Screaming Frog","Moz","Ubersuggest","Hotjar","Clarity","Bing Webmaster","Excel","PowerPoint"])}</div></div></section>

<section class="wf dark">{anno("Industries served", "ref: Aleyda &lsquo;brands that trust&rsquo; strip")}
  <div class="wrap row between"><div><div class="eyebrow">Industries</div><h2>Where I&rsquo;ve done this work</h2></div>
  <div style="max-width:600px">{"".join(f'<span class="chip" style="font-size:15px;padding:8px 18px">{n}</span>' for n in ["B2B SaaS","Logistics","Finance","Healthcare-education","D2C"])}</div></div></section>
{cta()}'''

contact = page_header("Get in Touch", "Have a project in mind or want to chat? Drop a message below.", "ref: Dribbble headers") + f'''
<section class="wf">{anno("Info + form split", "ref: Aleyda contact block · Reeni form card")}
  <div class="wrap g" style="grid-template-columns:5fr 7fr;align-items:start">
    <div><span class="chip">&#9679; Available for new projects</span>
      <h2 class="mt16" style="font-size:30px">omgupta0603@gmail.com</h2>
      {"".join(f'<div class="row between" style="border-top:1px solid #E5E7EB;padding:14px 0"><span class="eyebrow" style="margin:0">{k}</span><span>{v}</span></div>' for k,v in [("Location","Delhi, India"),("Time zone","IST (UTC+5:30)"),("Languages","English · Hindi")])}
      <div class="row mt16" style="gap:10px">{"".join(ph(s,44,style="width:44px") for s in ["","",""])}</div>
      <p class="mt8" style="font-size:12px">GitHub · LinkedIn · Email</p></div>
    <div class="box fill" style="padding:32px"><h3>Send a message</h3>
      <div class="g g2" style="gap:14px"><div class="field">Name</div><div class="field">Email</div></div>
      <div class="field">Subject</div>
      <div class="row" style="gap:8px;margin-bottom:14px"><span class="eyebrow" style="margin:0">I need help with:</span><span class="chip">SEO audit</span><span class="chip">AI visibility</span><span class="chip">Content</span><span class="chip">Reporting</span></div>
      <div class="field area">Message</div>
      <div class="btn solid" style="width:100%;justify-content:center">Send Message &rarr;</div></div>
  </div></section>

<section class="wf dark">{anno("What happens next · real sequence", "ref: Reeni numbered steps")}
  <div class="wrap g g3">{"".join(f'<div class="box"><div class="num">0{i+1}</div><h3 class="mt8">{t}</h3>{lines("l","m")}</div>' for i,t in enumerate(["You send a message","I reply by email","We plan the first step"]))}</div></section>

<section class="wf">{anno("FAQ accordion", "ref: Aleyda long-form trust content")}
  <div class="wrap g" style="grid-template-columns:4fr 8fr"><div><div class="eyebrow">FAQ</div><h2>Before you write</h2></div>
  <div>{"".join(f'<div class="faq"><span>{q}</span><span>+</span></div>' for q in ["Which industries do you work with?","Do you take one-off SEO audits?","Can you track how AI tools cite my brand?","Do you work with clients outside India?"])}</div></div></section>'''

for name, active, body in [("home","Home",home),("about","About",about),("skills","Skills",skills),("contact","Contact",contact)]:
    (OUT / f"wireframe-{name}.html").write_text(sheet(name, active, body))
print("written")
