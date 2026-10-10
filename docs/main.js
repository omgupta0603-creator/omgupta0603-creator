// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });
}

const root = document.documentElement;
const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
if (!hasGsap) root.classList.remove('anim');

if (hasGsap && root.classList.contains('anim')) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', duration: 0.8 });

  // Hero: headline, then the query is typed and the answer arrives with its citations
  const heroEls = gsap.utils.toArray('[data-hero]');
  if (heroEls.length) {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(heroEls, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, stagger: 0.09 });

    const query = document.querySelector('.engine-query');
    const answer = document.querySelector('.engine-answer');
    const sources = gsap.utils.toArray('.source');
    if (query && answer) {
      const text = query.dataset.query || query.textContent;
      query.textContent = '';
      const words = splitWords(answer);
      gsap.set(words, { autoAlpha: 0 });
      gsap.set(sources, { autoAlpha: 0, y: 10 });
      const typed = { n: 0 };
      tl.to(typed, {
        n: text.length, duration: text.length * 0.035, ease: 'none',
        onUpdate: () => { query.textContent = text.slice(0, Math.round(typed.n)); },
      }, '-=0.2')
        .fromTo('.engine-tag', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, '+=0.25')
        .to(words, { autoAlpha: 1, duration: 0.25, stagger: 0.025, ease: 'none' })
        .to(sources, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.5 }, '-=0.2');
    }
  }

  // Scroll reveals: single elements, and groups whose children stagger in
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    const targets = el.hasAttribute('data-stagger') ? el.children : el;
    if (el.hasAttribute('data-stagger')) gsap.set(el, { autoAlpha: 1 });
    gsap.fromTo(targets, { autoAlpha: 0, y: 24 }, {
      autoAlpha: 1, y: 0, stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Experience timeline: the line draws as you read down it
  const fill = document.querySelector('.timeline-fill');
  if (fill) {
    gsap.fromTo(fill, { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
    });
  }

  // Skill level bars fill when their card comes into view
  gsap.utils.toArray('.skill-card').forEach((card) => {
    const bars = card.querySelectorAll('.level b.on');
    gsap.fromTo(bars, { scaleY: 0, transformOrigin: 'bottom' }, {
      scaleY: 1, duration: 0.4, stagger: 0.03, ease: 'back.out(2)',
      scrollTrigger: { trigger: card, start: 'top 85%', once: true },
    });
  });
}
window.__animReady = true;

// Wrap each word of an element's text nodes in a span, keeping inline markup (strong, citations) intact
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

// Contact form: opens the visitor's mail app with the message pre-filled (no backend needed)
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = form.querySelector('.form-note');
    if (!form.checkValidity()) {
      form.reportValidity();
      note.textContent = 'Fill in every field to send your message.';
      return;
    }
    const d = new FormData(form);
    const body = `${d.get('message')}\n\n${d.get('name')} (${d.get('email')})`;
    window.location.href = `mailto:omgupta0603@gmail.com?subject=${encodeURIComponent(d.get('subject'))}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Opening your email app. If nothing opens, write to omgupta0603@gmail.com.';
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
