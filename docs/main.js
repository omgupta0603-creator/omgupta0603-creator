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

  // Hero wordmark: letters rise in on load
  const heroMark = document.querySelector('.hero .wordmark');
  const tl = gsap.timeline({ delay: 0.1 });
  if (heroMark) {
    const chars = splitChars(heroMark);
    tl.fromTo(chars, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.05, ease: 'expo.out' }, 0);
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

  // Primary buttons lean toward the pointer
  if (window.matchMedia('(pointer: fine)').matches) {
    gsap.utils.toArray('.btn-solid').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.32, duration: 0.4, ease: 'power3.out' });
      });
      btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' }));
    });
  }
}
window.__animReady = true;

// ===== Scroll progress line =====
const progress = document.querySelector('.progress span');
if (progress) {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

// ===== Industry explorer: the name at the centre of the screen is active; hover or focus also selects =====
const ix = document.querySelector('.ix');
if (ix) {
  const items = [...ix.querySelectorAll('.ix-item')];
  const visuals = [...ix.querySelectorAll('.ix-media .iv')];
  const panels = [...ix.querySelectorAll('.ix-panel')];
  let current = 0;
  const setActive = (k) => {
    if (k === current || k < 0) return;
    current = k;
    items.forEach((b, i) => { b.classList.toggle('is-active', i === k); b.setAttribute('aria-pressed', String(i === k)); });
    visuals.forEach((v, i) => v.classList.toggle('is-active', i === k));
    panels.forEach((p, i) => {
      p.classList.toggle('is-active', i === k);
      const a = p.querySelector('a');
      if (a) a.tabIndex = i === k ? 0 : -1;
    });
  };
  items.forEach((b, i) => {
    b.addEventListener('mouseenter', () => setActive(i));
    b.addEventListener('focus', () => setActive(i));
    b.addEventListener('click', () => setActive(i));
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(items.indexOf(e.target)); });
    }, { rootMargin: '-48% 0px -48% 0px' });
    items.forEach((b) => io.observe(b));
  }
}

// ===== Contact form: opens the visitor's mail app with the message filled in =====
const form = document.querySelector('#contact-form');
if (form) {
  // Pre-fill the subject when arriving from an industry's Know more link
  const subject = new URLSearchParams(window.location.search).get('subject');
  if (subject && form.subject) form.subject.value = subject.slice(0, 120);
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
