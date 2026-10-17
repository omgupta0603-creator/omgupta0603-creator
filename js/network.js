/*
 * Citation network: the hero's motion graphic. Search and AI engines sit around the
 * portrait, linked to the AI-answer card; pulses travel along the links like citations
 * arriving. Canvas 2D, paused off screen, drawn once (no motion) under reduced motion.
 */
(function () {
  const host = document.querySelector('.hero-visual');
  const card = host && host.querySelector('.engine');
  if (!host || !card) return;

  const PAD = 80;
  // Positions are fractions of the hero visual's box (the portrait fills its right side)
  const NODES = [
    { label: 'Google', x: 0.2, y: 0.07 },
    { label: 'ChatGPT', x: 0.99, y: 0.1 },
    { label: 'Gemini', x: 1.04, y: 0.52 },
    { label: 'Perplexity', x: 0.97, y: 1.02 },
    { label: 'AI Overviews', x: 0.24, y: 0.34 },
  ];  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.createElement('canvas');
  canvas.className = 'net';
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let w = 0, h = 0, dpr = 1, target = { x: 0, y: 0 };
  let pointer = { x: 0, y: 0 }, ease = { x: 0, y: 0 };
  let pulses = [], rings = [], last = 0, nextSpawn = 0, frame = 0, running = false;

  function resize() {
    const r = host.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Cap the canvas: some headless renderers report runaway layout sizes
    w = Math.min(r.width, 1600) + PAD * 2;
    h = Math.min(r.height, 1200) + PAD * 2;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    target = { x: c.left - r.left + c.width * 0.5 + PAD, y: c.top - r.top + 26 + PAD };
    if (!running) draw(0);
  }

  const nodePos = (n) => ({
    x: PAD + n.x * (w - PAD * 2) + ease.x * 10 * (n.x - 0.5),
    y: PAD + n.y * (h - PAD * 2) + ease.y * 10 * (n.y - 0.5),
  });
  const control = (a) => ({ x: (a.x + target.x) / 2 + (a.y - target.y) * 0.18, y: (a.y + target.y) / 2 - (a.x - target.x) * 0.18 });
  const bezier = (a, c, b, t) => ({
    x: (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * c.x + t * t * b.x,
    y: (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * c.y + t * t * b.y,
  });

  function draw(now) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ease.x += (pointer.x - ease.x) * 0.06;
    ease.y += (pointer.y - ease.y) * 0.06;

    NODES.forEach((n) => {
      const a = nodePos(n), c = control(a);
      const grad = ctx.createLinearGradient(a.x, a.y, target.x, target.y);
      grad.addColorStop(0, 'rgba(129,140,248,0.25)');
      grad.addColorStop(1, 'rgba(56,189,248,0.55)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 5]);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(c.x, c.y, target.x, target.y);
      ctx.stroke();
      ctx.setLineDash([]);

      const glow = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, 16);
      glow.addColorStop(0, 'rgba(56,189,248,0.45)');
      glow.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(a.x, a.y, 16, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath(); ctx.arc(a.x, a.y, 3.2, 0, Math.PI * 2); ctx.fill();
      ctx.font = '500 11px "JetBrains Mono", monospace';
      const tw = ctx.measureText(n.label.toUpperCase()).width;
      const lx = n.x > 0.5 ? a.x - 12 - tw : a.x + 12;
      ctx.fillStyle = 'rgba(8,20,43,0.78)';
      ctx.fillRect(lx - 6, a.y - 23, tw + 12, 18);
      ctx.fillStyle = 'rgba(203,213,225,0.95)';
      ctx.textAlign = 'left';
      ctx.fillText(n.label.toUpperCase(), lx, a.y - 10);
    });

    pulses = pulses.filter((p) => {
      const t = Math.min((now - p.start) / p.dur, 1);
      const a = nodePos(NODES[p.node]), c = control(a);
      for (let i = 0; i < 6; i++) {
        const tt = Math.max(t - i * 0.025, 0);
        const q = bezier(a, c, target, tt * tt * (3 - 2 * tt));
        ctx.fillStyle = `rgba(${i ? '129,140,248' : '248,250,252'},${0.9 - i * 0.15})`;
        ctx.beginPath(); ctx.arc(q.x, q.y, 2.6 - i * 0.3, 0, Math.PI * 2); ctx.fill();
      }
      if (t >= 1) { rings.push({ start: now }); return false; }
      return true;
    });

    rings = rings.filter((r) => {
      const t = (now - r.start) / 900;
      if (t >= 1) return false;
      ctx.strokeStyle = `rgba(56,189,248,${0.5 * (1 - t)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(target.x, target.y, 6 + t * 26, 0, Math.PI * 2); ctx.stroke();
      return true;
    });
  }

  function tick(now) {
    frame = requestAnimationFrame(tick);
    if (now > nextSpawn) {
      pulses.push({ node: Math.floor(Math.random() * NODES.length), start: now, dur: 1500 + Math.random() * 700 });
      nextSpawn = now + 650 + Math.random() * 650;
    }
    draw(now);
    last = now;
  }
  const start = () => { if (!running && !reduced) { running = true; frame = requestAnimationFrame(tick); } };
  const stop = () => { running = false; cancelAnimationFrame(frame); };

  resize();
  new ResizeObserver(resize).observe(host);
  new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop())).observe(host);
  host.addEventListener('pointermove', (e) => {
    const r = host.getBoundingClientRect();
    pointer = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
  });
  host.addEventListener('pointerleave', () => { pointer = { x: 0, y: 0 }; });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!running) draw(0); });
})();
