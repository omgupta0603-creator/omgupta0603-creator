/*
 * Marquee: an accessible infinite strip that eases to a stop on hover and focus,
 * pauses off screen, and becomes a plain scrollable row under reduced motion.
 * Vanilla port of the 21st.dev "Logo Marquee" component by ddoemonn
 * (https://21st.dev/@ddoemonn/components/logo-marquee).
 *
 * Markup: <div class="marquee" data-marquee data-speed="40" data-direction="left">
 *           <div class="marquee-viewport"><div class="marquee-track">
 *             <ul class="marquee-group">…</ul>
 *           </div></div></div>
 */
(function () {
  const RAMP = 0.19;      // seconds to ease speed up or down
  const MAX_COPIES = 14;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fold = (x, loop) => { const m = x % loop; return m > 0 ? m - loop : m; };
  const clamp = (x, min, max) => (x < min ? min : x > max ? max : x);

  document.querySelectorAll('[data-marquee]').forEach((root) => {
    const viewport = root.querySelector('.marquee-viewport');
    const track = root.querySelector('.marquee-track');
    const group = root.querySelector('.marquee-group');
    if (!viewport || !track || !group) return;

    const gap = parseFloat(getComputedStyle(root).getPropertyValue('--marquee-gap')) || 48;
    const speed = Number(root.dataset.speed) || 40;
    const sign = root.dataset.direction === 'right' ? 1 : -1;
    track.style.gap = group.style.gap = `${gap}px`;

    if (reduced) { root.classList.add('is-static'); viewport.tabIndex = 0; return; }

    let span = 0, offset = 0, rate = 0, held = false, near = false, frame = 0, last = 0;

    const paint = () => { track.style.transform = `translate3d(${(offset - span).toFixed(2)}px,0,0)`; };

    const measure = () => {
      const width = group.getBoundingClientRect().width;
      span = width > 0 ? width + gap : 0;
      offset = span > 0 ? clamp(offset, -span, span) : 0;
      const room = viewport.getBoundingClientRect().width;
      const want = span > 0 ? clamp(Math.ceil(room / span) + 3, 4, MAX_COPIES) : 4;
      const clones = track.querySelectorAll('.marquee-group[aria-hidden]');
      for (let i = clones.length + 1; i < want; i++) {
        const copy = group.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');
        track.appendChild(copy);
      }
      paint();
    };

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      if (span <= 0) return;
      rate += ((held ? 0 : 1) - rate) * (1 - Math.exp(-dt / RAMP));
      offset = fold(offset + sign * speed * rate * dt, span);
      paint();
    };

    const start = () => { if (!frame) { last = 0; frame = requestAnimationFrame(tick); } };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; };

    measure();
    new ResizeObserver(measure).observe(viewport);
    new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      near ? start() : stop();
    }, { rootMargin: '96px' }).observe(viewport);

    root.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'touch') held = true; });
    root.addEventListener('pointerleave', () => { held = false; });
    root.addEventListener('focusin', () => { held = true; });
    root.addEventListener('focusout', () => { held = false; });
    window.addEventListener('blur', () => { held = false; });
  });
})();
