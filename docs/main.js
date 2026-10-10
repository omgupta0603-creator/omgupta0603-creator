// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Reveal-on-scroll
const io = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 })
  : null;
document.querySelectorAll('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('in')));

// Animated stat counters
document.querySelectorAll('[data-count]').forEach((el) => {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const run = () => {
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!io) return run();
  const once = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); once.disconnect(); } });
  once.observe(el);
});

// Contact form: opens the visitor's mail client with the message pre-filled (no backend needed)
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const body = `${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`;
    const href = `mailto:omgupta0603@gmail.com?subject=${encodeURIComponent(d.get('subject'))}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    document.querySelector('.form-note').textContent = 'Opening your email app… If nothing happens, write to omgupta0603@gmail.com.';
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
