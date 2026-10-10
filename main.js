// ===== Navigation =====
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });
}
const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Motion (GSAP + ScrollTrigger) =====
const root = document.documentElement;
const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
if (!hasGsap) root.classList.remove('anim');
const animate = hasGsap && root.classList.contains('anim');

// Split an outlined wordmark into letters so each can move on its own
function splitChars(el) {
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  el.textContent = '';
  el.classList.add('is-split');
  return [...text].map((c) => {
    const span = document.createElement('span');
    span.className = 'ch';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = c === ' ' ? ' ' : c;
    el.appendChild(span);
    return span;
  });
}

// Wrap each word of an element's text nodes in a span, keeping inline markup intact
function splitWords(el) {
  const out = [];
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const span = document.createElement('span');
          span.textContent = part;
          frag.appendChild(span);
          out.push(span);
        });
        child.replaceWith(frag);
      } else if (child.classList && child.classList.contains('cite')) {
        out.push(child);
      } else {
        walk(child);
      }
    });
  };
  walk(el);
  return out;
}

if (animate) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', duration: 0.8 });

  // Hero wordmark: letters rise in, then drift slower than the page as you scroll
  const heroMark = document.querySelector('.hero .wordmark');
  const tl = gsap.timeline({ delay: 0.1 });
  if (heroMark) {
    const chars = splitChars(heroMark);
    tl.fromTo(chars, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.05, ease: 'expo.out' }, 0);
    gsap.to(heroMark, { yPercent: 16, autoAlpha: 0.35, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  const heroEls = gsap.utils.toArray('[data-hero]');
  if (heroEls.length) tl.fromTo(heroEls, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, stagger: 0.08 }, heroMark ? 0.35 : 0);

  // AI answer card: the query types itself, the answer arrives with its citations
  const query = document.querySelector('.engine-query');
  const answer = document.querySelector('.engine-answer');
  if (query && answer) {
    const text = query.dataset.query || query.textContent;
    query.textContent = '';
    const words = splitWords(answer);
    const sources = gsap.utils.toArray('.src');
    gsap.set(words, { autoAlpha: 0 });
    gsap.set(sources, { autoAlpha: 0, y: 10 });
    gsap.set('.engine-tag', { autoAlpha: 0 });
    const typed = { n: 0 };
    tl.to(typed, { n: text.length, duration: text.length * 0.035, ease: 'none', onUpdate: () => { query.textContent = text.slice(0, Math.round(typed.n)); } })
      .to('.engine-tag', { autoAlpha: 1, duration: 0.3 }, '+=0.2')
      .to(words, { autoAlpha: 1, duration: 0.25, stagger: 0.022, ease: 'none' })
      .to(sources, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.5 }, '-=0.2');
  }

  // Rotating role in the hero greeting
  const rotator = document.querySelector('.rotator');
  if (rotator) {
    const items = [...rotator.children];
    gsap.set(items.slice(1), { yPercent: 100, autoAlpha: 0 });
    let i = 0;
    const next = () => {
      const cur = items[i];
      i = (i + 1) % items.length;
      gsap.timeline()
        .to(cur, { yPercent: -100, autoAlpha: 0, duration: 0.5, ease: 'power2.in' })
        .fromTo(items[i], { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' }, '-=0.15');
    };
    gsap.delayedCall(3, function loop() { next(); gsap.delayedCall(2.6, loop); });
  }

  // Page-header headings on inner pages
  gsap.utils.toArray('[data-head]').forEach((el, k) => {
    gsap.fromTo(el, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, delay: 0.1 + k * 0.08 });
  });

  // Scroll reveals: single elements, or groups whose children stagger in
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    const group = el.hasAttribute('data-stagger');
    if (group) gsap.set(el, { autoAlpha: 1 });
    gsap.fromTo(group ? el.children : el, { autoAlpha: 0, y: 28 }, {
      autoAlpha: 1, y: 0, stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Counters count up from zero
  gsap.utils.toArray('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const obj = { v: 0 };
    el.textContent = `0${suffix}`;
    gsap.to(obj, {
      v: end, duration: 1.4, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // Process steps: a line sweeps across each step in order
  const bars = gsap.utils.toArray('.step-bar');
  if (bars.length) {
    gsap.to(bars, { scaleX: 1, duration: 0.6, stagger: 0.25, ease: 'power2.inOut', scrollTrigger: { trigger: '.process', start: 'top 80%', once: true } });
  }

  // Experience timeline: the line draws as you read down it
  const fill = document.querySelector('.timeline-fill');
  if (fill) {
    gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
  }

  // Skill bars and level ticks fill when they come into view
  gsap.utils.toArray('.bar span').forEach((b) => {
    gsap.fromTo(b, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: b, start: 'top 92%', once: true } });
  });
  gsap.utils.toArray('.skill-card').forEach((card) => {
    gsap.fromTo(card.querySelectorAll('.lvl b.on'), { scaleY: 0, transformOrigin: 'bottom' }, {
      scaleY: 1, duration: 0.4, stagger: 0.03, ease: 'back.out(2)',
      scrollTrigger: { trigger: card, start: 'top 85%', once: true },
    });
  });

  // Footer wordmark: letters rise as the footer scrolls in
  const footMark = document.querySelector('.footer .wordmark');
  if (footMark) {
    const chars = splitChars(footMark);
    gsap.fromTo(chars, { yPercent: 70, autoAlpha: 0 }, {
      yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.05, ease: 'expo.out',
      scrollTrigger: { trigger: '.footer', start: 'top 75%', once: true },
    });
  }
}
window.__animReady = true;

// ===== Contact form: opens the visitor's mail app with the message filled in =====
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = form.querySelector('.form-note');
    if (!form.checkValidity()) {
      form.reportValidity();
      note.textContent = 'Fill in your name, email, subject and message to send.';
      return;
    }
    const d = new FormData(form);
    const topics = d.getAll('topic');
    const body = [
      d.get('message'),
      '',
      topics.length ? `Help with: ${topics.join(', ')}` : '',
      `${d.get('name')} (${d.get('email')})`,
    ].filter((line, k) => line !== '' || k === 1).join('\n');
    window.location.href = `mailto:omgupta0603@gmail.com?subject=${encodeURIComponent(d.get('subject'))}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Opening your email app. If nothing opens, write to omgupta0603@gmail.com.';
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
