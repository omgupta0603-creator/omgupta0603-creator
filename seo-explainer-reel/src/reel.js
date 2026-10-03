// "What Is SEO and Its Types?" — deterministic 60s reel.
// window.renderFrame(t) draws the frame at time t (seconds). Nothing reads the wall clock.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

for (const f of ['800 100px P', '700 40px P', '600 40px P', '500 40px P', '400 40px I', '500 40px I']) await document.fonts.load(f);
await document.fonts.ready;

const W = 1080, H = 1920;
const params = new URLSearchParams(location.search);

// ---------- math / easing ----------
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, p) => a + (b - a) * p;
const prog = (t, t0, d) => clamp((t - t0) / d);
const eOut = p => 1 - Math.pow(1 - p, 3);
const eOut5 = p => 1 - Math.pow(1 - p, 5);
const eInOut = p => (p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const eBack = p => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); };
const eBounce = p => {
  const n = 7.5625, d = 2.75;
  if (p < 1 / d) return n * p * p;
  if (p < 2 / d) return n * (p -= 1.5 / d) * p + .75;
  if (p < 2.5 / d) return n * (p -= 2.25 / d) * p + .9375;
  return n * (p -= 2.625 / d) * p + .984375;
};

// ---------- audio cues (read by the renderer, mixed in Python) ----------
const CUES = { pop: [], whoosh: [], tick: [], thud: [], swish: [] };
window.CUES = CUES;

// ---------- DOM helpers ----------
const $ = id => document.getElementById(id);
const backL = $('back'), frontL = $('front'), wrap = $('wrap'), logo = $('logo');
function div(parent, html = '', cls = '', style = {}) {
  const d = document.createElement('div');
  if (cls) d.className = cls;
  d.innerHTML = html;
  Object.assign(d.style, style);
  parent.appendChild(d);
  return d;
}
// centred text row, returns the animatable inner element
function row(parent, top, html, cls) {
  const r = div(parent, '', 'row', { top: top + 'px' });
  return div(r, html, cls);
}
function letters(el) {
  const txt = el.textContent; el.textContent = '';
  return [...txt].map(ch => { const s = document.createElement('span'); s.className = 'ltr'; s.textContent = ch === ' ' ? ' ' : ch; el.appendChild(s); return s; });
}
function setFx(e, o, ty, s, blur) {
  e.style.opacity = o;
  e.style.transform = `translateY(${ty}px) scale(${s})`;
  e.style.filter = blur > .05 ? `blur(${blur}px)` : 'none';
}
// slide-up + blur-to-sharp + scale reveal
function rv(e, t, t0, o = {}) {
  const { d = .7, dy = 46, blur = 16, s0 = .92 } = o;
  const p = eOut(prog(t, t0, d));
  setFx(e, clamp(prog(t, t0, d * .55)), (1 - p) * dy, lerp(s0, 1, p), (1 - p) * blur);
}
function rvLetters(spans, t, t0, stagger = .045, o = {}) {
  spans.forEach((s, i) => rv(s, t, t0 + i * stagger, { d: .55, dy: 60, blur: 18, s0: .7, ...o }));
}
// soft "pop" for pills
function pop(e, t, t0) {
  const p = prog(t, t0, .5);
  const s = p <= 0 ? .55 : lerp(.55, 1, eBack(p));
  setFx(e, clamp(p * 3.5), (1 - eOut(p)) * 18, s, (1 - clamp(p * 2.5)) * 8);
}

// ---------- three.js ----------
const canvas = $('gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(W, H, false);
renderer.setClearColor(0x000000, 0);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene3 = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene3.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 100);
camera.position.set(0, 0, 20);
const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(-5, 8, 10); scene3.add(key);
const rim = new THREE.DirectionalLight(0xffffff, .9); rim.position.set(6, 2, -6); scene3.add(rim);
scene3.add(new THREE.AmbientLight(0xffffff, .25));

// 1 world unit at z=0 ≈ 179px ; y=0 is the frame centre
const UNIT = H / (2 * 20 * Math.tan(THREE.MathUtils.degToRad(15)));
const pyToY = py => (H / 2 - py) / UNIT;
const pxToX = px => (px - W / 2) / UNIT;
function toScreen(v) {
  const p = v.clone().project(camera);
  return { x: (p.x * .5 + .5) * W, y: (-p.y * .5 + .5) * H, z: p.z };
}

const M = {
  chrome: new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 1, roughness: .1 }),
  silver: new THREE.MeshPhysicalMaterial({ color: 0xd2d2d2, metalness: .85, roughness: .28 }),
  black: new THREE.MeshPhysicalMaterial({ color: 0x0B1F3A, metalness: .25, roughness: .2, clearcoat: 1, clearcoatRoughness: .06 }), // brand navy
  dark: new THREE.MeshPhysicalMaterial({ color: 0x1a3358, metalness: .2, roughness: .3, clearcoat: .8, clearcoatRoughness: .1 }),
  saffron: new THREE.MeshPhysicalMaterial({ color: 0xFF7A1A, metalness: .15, roughness: .22, clearcoat: 1, clearcoatRoughness: .05 }),
  emerald: new THREE.MeshPhysicalMaterial({ color: 0x12A150, metalness: .15, roughness: .22, clearcoat: 1, clearcoatRoughness: .05 }),
  white: new THREE.MeshPhysicalMaterial({ color: 0xf3f3f3, metalness: 0, roughness: .28, clearcoat: .9, clearcoatRoughness: .08 }),
  gray: new THREE.MeshPhysicalMaterial({ color: 0x9a9a9a, metalness: .1, roughness: .35, clearcoat: .6, clearcoatRoughness: .1 }),
  light: new THREE.MeshPhysicalMaterial({ color: 0xd6d6d6, metalness: .05, roughness: .35, clearcoat: .6 }),
  glow: new THREE.MeshBasicMaterial({ color: 0xffffff }),
};

function canvasTex(w, h, draw, srgb = true) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
const shadowTex = canvasTex(256, 256, (g) => {
  const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, 'rgba(11,31,58,.5)'); gr.addColorStop(.45, 'rgba(11,31,58,.2)'); gr.addColorStop(1, 'rgba(11,31,58,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
});
// soft studio contact shadow (a blurred ellipse behind/below the object)
function shadow(w, h) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, toneMapped: false }));
  m.renderOrder = -1;
  return m;
}
const box = (w, h, d, mat, r = .06, seg = 4) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2, h / 2, d / 2)), mat);
const sph = (r, mat, seg = 32) => new THREE.Mesh(new THREE.SphereGeometry(r, seg, seg / 2), mat);
function limb(a, b, r, mat, r2 = r) {
  const d = new THREE.Vector3().subVectors(b, a); const len = d.length();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r2, r, len, 20), mat);
  m.position.copy(a).addScaledVector(d, .5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  return m;
}
const V = (x, y, z = 0) => new THREE.Vector3(x, y, z);
function lathe(pts, mat, seg = 64) {
  return new THREE.Mesh(new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), seg), mat);
}
function starShape(ro = .5, ri = .22, n = 5) {
  const s = new THREE.Shape();
  for (let i = 0; i < n * 2; i++) {
    const a = Math.PI / 2 + i * Math.PI / n, r = i % 2 ? ri : ro;
    i ? s.lineTo(Math.cos(a) * r, Math.sin(a) * r) : s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  return s;
}
function star(size, mat) {
  const g = new THREE.ExtrudeGeometry(starShape(size, size * .45), { depth: size * .25, bevelEnabled: true, bevelThickness: size * .08, bevelSize: size * .06, bevelSegments: 3 });
  g.center();
  return new THREE.Mesh(g, mat);
}
function numberPlane(txt, w, h) {
  const tex = canvasTex(256, 256, (g) => {
    g.fillStyle = '#0B1F3A'; g.font = '800 170px P'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(txt, 128, 140);
  });
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false }));
}

// ---------- 3D objects ----------
function makeTrophy() {
  const g = new THREE.Group(), o = new THREE.Group(); g.add(o);
  o.add(box(1.5, .42, 1.1, M.black, .08).translateY(.21));
  o.add(box(1.2, .14, .9, M.chrome, .05).translateY(.49));
  o.add(lathe([[0, 0], [.32, 0], [.2, .12], [.11, .3], [.09, .62], [.16, .8], [.28, .9], [0, .92]], M.chrome).translateY(.56));
  const cupPts = [[0, 0], [.2, 0], [.38, .08], [.64, .33], [.86, .78], [.99, 1.28], [1.03, 1.6], [.97, 1.62], [.92, 1.3], [.8, .84], [.58, .42], [.3, .2], [0, .17]];
  o.add(lathe(cupPts, M.chrome).translateY(1.42));
  for (const s of [-1, 1]) {
    const h = new THREE.Mesh(new THREE.TorusGeometry(.42, .075, 20, 48, Math.PI), M.chrome);
    h.position.set(s * .92, 2.35, 0); h.rotation.z = s > 0 ? -Math.PI / 2 : Math.PI / 2; h.scale.set(1, .7, 1);
    o.add(h);
  }
  const st = star(.32, M.saffron); st.position.set(0, 2.2, .82); st.rotation.x = -.12; o.add(st);
  o.position.y = -1.55;
  return g;
}

function makeSpider() {
  const g = new THREE.Group();
  const body = sph(.45, M.black); body.scale.set(1.1, .85, 1); g.add(body);
  const head = sph(.27, M.dark); head.position.set(0, -.04, .42); g.add(head);
  for (const s of [-1, 1]) { const e = sph(.065, M.glow, 16); e.position.set(s * .1, .02, .66); g.add(e); }
  const band = new THREE.Mesh(new THREE.TorusGeometry(.47, .04, 12, 48), M.saffron); band.rotation.x = Math.PI / 2; band.scale.set(1.05, 1, 1); g.add(band);
  const ant = limb(V(0, .35, 0), V(.12, .75, -.05), .025, M.chrome); g.add(ant);
  const tip = sph(.06, M.chrome, 16); tip.position.set(.12, .77, -.05); g.add(tip);
  g.legs = [];
  for (const s of [-1, 1]) for (let i = 0; i < 4; i++) {
    const z = -.3 + i * .2, leg = new THREE.Group();
    g.add(leg); g.legs.push({ leg, s, z, i });
  }
  g.thread = limb(V(0, .35, 0), V(0, 6, 0), .012, M.gray); g.add(g.thread);
  g.setLegs = (ph) => {
    for (const L of g.legs) {
      L.leg.clear();
      const w = Math.sin(ph + L.i * 1.3 + (L.s > 0 ? 0 : 1.6)) * .12;
      const hip = V(L.s * .38, 0, L.z), knee = V(L.s * .85, .38 + w, L.z * 1.7), foot = V(L.s * 1.12, -.5 + w * .5, L.z * 2.1);
      L.leg.add(limb(hip, knee, .05, M.chrome, .04), limb(knee, foot, .04, M.chrome, .025));
      const j = sph(.065, M.chrome, 16); j.position.copy(knee); L.leg.add(j);
    }
  };
  g.setLegs(0);
  return g;
}

function makeCabinet() {
  const g = new THREE.Group();
  const cab = new THREE.MeshPhysicalMaterial({ color: 0xc4c4c4, metalness: .65, roughness: .32, clearcoat: .5 });
  g.add(box(1.4, 1.9, 1.0, cab, .07));
  g.drawers = [];
  [.58, 0, -.58].forEach((y, i) => {
    const d = new THREE.Group(); d.position.set(0, y, 0);
    d.add(box(1.18, .5, .96, M.light, .05).translateZ(.04));
    const h = new THREE.Mesh(new THREE.CapsuleGeometry(.04, .32, 6, 12), M.chrome); h.rotation.z = Math.PI / 2; h.position.set(0, -.06, .56); d.add(h);
    d.add(box(.3, .1, .02, M.white, .015).translateY(.12).translateZ(.53));
    if (i === 0) for (let k = 0; k < 4; k++) {
      const p = box(.95, .42, .02, M.white, .01); p.position.set(0, .1 + (k % 2) * .03, -.3 + k * .15); p.rotation.x = -.08; d.add(p);
    }
    g.add(d); g.drawers.push(d);
  });
  return g;
}

function makePodium() {
  const g = new THREE.Group();
  [[0, 1.05, '1'], [-.86, .72, '2'], [.86, .5, '3']].forEach(([x, h, n]) => {
    const b = box(.82, h, .75, M.white, .06); b.position.set(x, h / 2 - .5, 0); g.add(b);
    const np = numberPlane(n, .5, .5); np.position.set(x, h - .5 - .3, .38); g.add(np);
  });
  const s = star(.26, M.saffron); s.position.set(0, .9, 0); g.add(s); g.star = s;
  return g;
}

function makeMagnifier() {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.22, .13, 32, 96), M.chrome); g.add(ring);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.1, .03, 16, 96), M.black); ring2.position.z = .05; g.add(ring2);
  const glass = new THREE.Mesh(new THREE.CircleGeometry(1.12, 64), new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0, transparent: true, opacity: .1, clearcoat: 1, depthWrite: false }));
  g.add(glass);
  const arm = new THREE.Group(); arm.rotation.z = -Math.PI / 4.2; g.add(arm);
  const col = new THREE.Mesh(new THREE.CylinderGeometry(.16, .2, .45, 32), M.chrome); col.position.y = -1.52; arm.add(col);
  const hd = new THREE.Mesh(new THREE.CapsuleGeometry(.2, 1.8, 8, 24), M.black); hd.position.y = -2.85; arm.add(hd);
  return g;
}

function makeWebpage() {
  const g = new THREE.Group();
  g.add(box(3.4, 4.2, .16, M.white, .12));
  const L = [];
  const mk = (w, h, d, mat, x, y, r = .04) => { const m = box(w, h, d, mat, r); m.position.set(x, y, .12); g.add(m); return m; };
  const hdr = new THREE.Group(); g.add(hdr);
  hdr.add(box(3.0, .3, .06, M.dark, .05).translateY(1.7).translateZ(.12));
  for (let i = 0; i < 3; i++) { const d = sph(.05, M.glow, 12); d.position.set(-1.3 + i * .16, 1.7, .17); hdr.add(d); }
  // layer groups that "pop" outward one by one (Titles, Headings, Content, Internal links)
  const title = new THREE.Group(); g.add(title);
  title.add(box(2.5, .26, .08, M.saffron, .06).translateY(1.18).translateX(-.25).translateZ(.12));
  const heads = new THREE.Group(); g.add(heads);
  heads.add(box(1.7, .17, .06, M.dark, .05).translateY(.78).translateX(-.65).translateZ(.12));
  heads.add(box(1.4, .17, .06, M.dark, .05).translateY(-.9).translateX(-.8).translateZ(.12));
  const content = new THREE.Group(); g.add(content);
  const img = box(1.25, .95, .07, M.gray, .06); img.position.set(.8, .1, .12); content.add(img);
  [.45, .28, .11, -.06, -.23].forEach((y, i) => { const b = box(i === 4 ? 1.1 : 1.55, .08, .04, M.light, .03); b.position.set(-.73 - (i === 4 ? .22 : 0), y, .12); content.add(b); });
  [-1.15, -1.32, -1.49].forEach((y, i) => { const b = box(2.9 - i * .5, .08, .04, M.light, .03); b.position.set(-1.45 + (2.9 - i * .5) / 2, y, .12); content.add(b); });
  const links = new THREE.Group(); g.add(links);
  [[-1.0, -1.8], [.05, -1.8], [1.1, -1.8]].forEach(([x, y]) => {
    const c = box(.85, .22, .07, M.emerald, .1); c.position.set(x, y, .12); links.add(c);
  });
  g.parts = [title, heads, content, links];
  return g;
}

function gearShape(teeth, ro, ri, hole) {
  const s = new THREE.Shape(), step = Math.PI * 2 / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts = [[a, ri], [a + step * .12, ro], [a + step * .42, ro], [a + step * .54, ri]];
    pts.forEach(([aa, r], k) => (i === 0 && k === 0) ? s.moveTo(Math.cos(aa) * r, Math.sin(aa) * r) : s.lineTo(Math.cos(aa) * r, Math.sin(aa) * r));
    s.absarc(0, 0, ri, a + step * .54, a + step, false);
  }
  const h = new THREE.Path(); h.absarc(0, 0, hole, 0, Math.PI * 2, true); s.holes.push(h);
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3, p = new THREE.Path();
    p.absarc(Math.cos(a) * ri * .62, Math.sin(a) * ri * .62, ri * .14, 0, Math.PI * 2, true); s.holes.push(p);
  }
  return s;
}
function makeGear(teeth = 14, ro = 1.35, ri = 1.12, depth = .36) {
  const geo = new THREE.ExtrudeGeometry(gearShape(teeth, ro, ri, .32), { depth, bevelEnabled: true, bevelThickness: .05, bevelSize: .04, bevelSegments: 3, curveSegments: 10 });
  geo.center();
  const g = new THREE.Group();
  g.add(new THREE.Mesh(geo, M.chrome));
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(.42, .42, depth + .16, 40, 1, true), M.black); hub.rotation.x = Math.PI / 2; g.add(hub);
  return g;
}
function makeSpeedo() {
  const g = new THREE.Group();
  const face = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, .22, 64), M.black); face.rotation.x = Math.PI / 2; g.add(face);
  const rimT = new THREE.Mesh(new THREE.TorusGeometry(1.06, .07, 20, 80), M.chrome); g.add(rimT);
  for (let i = 0; i <= 10; i++) {
    const a = THREE.MathUtils.degToRad(210 - i * 24);
    const t = new THREE.Mesh(new THREE.BoxGeometry(i % 5 ? .04 : .06, i % 5 ? .14 : .22, .02), M.glow);
    t.position.set(Math.cos(a) * .82, Math.sin(a) * .82, .13); t.rotation.z = a - Math.PI / 2; g.add(t);
  }
  const arc = new THREE.Mesh(new THREE.TorusGeometry(.62, .035, 8, 64, THREE.MathUtils.degToRad(80)), M.emerald);
  arc.rotation.z = THREE.MathUtils.degToRad(-30); arc.position.z = .12; g.add(arc);
  const needle = new THREE.Group(); needle.position.z = .16; g.add(needle);
  const n = box(.07, .78, .04, M.saffron, .02); n.position.y = .34; needle.add(n);
  const cap = sph(.12, M.chrome, 24); cap.position.z = .16; g.add(cap);
  g.needle = needle;
  return g;
}

class Stadium extends THREE.Curve {
  constructor(L, R) { super(); this.L = L; this.R = R; }
  getPoint(u, target = new THREE.Vector3()) {
    const { L, R } = this, per = 4 * L + 2 * Math.PI * R; let d = u * per;
    if (d < 2 * L) return target.set(-L + d, -R, 0); d -= 2 * L;
    if (d < Math.PI * R) { const a = -Math.PI / 2 + d / R; return target.set(L + Math.cos(a) * R, Math.sin(a) * R, 0); } d -= Math.PI * R;
    if (d < 2 * L) return target.set(L - d, R, 0); d -= 2 * L;
    const a = Math.PI / 2 + d / R; return target.set(-L + Math.cos(a) * R, Math.sin(a) * R, 0);
  }
}
const linkGeo = new THREE.TubeGeometry(new Stadium(.3, .27), 120, .085, 16, true);
function makeSiteCard() {
  const g = new THREE.Group();
  g.add(box(1.9, 1.35, .14, M.white, .1));
  const top = box(1.9, .24, .16, M.dark, .08); top.position.y = .56; g.add(top);
  for (let i = 0; i < 3; i++) { const d = sph(.04, M.glow, 12); d.position.set(-.78 + i * .13, .56, .1); g.add(d); }
  const im = box(.62, .55, .05, M.gray, .05); im.position.set(-.5, -.05, .09); g.add(im);
  [.15, 0, -.15, -.3].forEach((y, i) => { const b = box(i ? .75 : .85, .07, .04, i ? M.light : M.dark, .03); b.position.set(.38, y, .09); g.add(b); });
  return g;
}

function makeMap() {
  const tex = canvasTex(1024, 1024, (g, w, h) => {
    g.fillStyle = '#e4e1d9'; g.fillRect(0, 0, w, h);
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    // blocks + buildings
    for (let y = 0; y < h; y += 96) for (let x = 0; x < w; x += 96) {
      { const v = rnd() * 18 | 0; g.fillStyle = `rgb(${212 + v},${209 + v},${200 + v})`; }
      g.fillRect(x + 12, y + 12, 72, 72);
      for (let k = 0; k < 3; k++) { g.fillStyle = 'rgba(11,31,58,.09)'; g.fillRect(x + 16 + rnd() * 40, y + 16 + rnd() * 40, 14 + rnd() * 20, 14 + rnd() * 20); }
    }
    // park + river
    g.fillStyle = '#b8dcc5'; g.beginPath(); g.ellipse(300, 650, 150, 95, .3, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#c3cfdd'; g.lineWidth = 44; g.beginPath(); g.moveTo(-20, 220); g.bezierCurveTo(300, 120, 520, 420, 1050, 300); g.stroke();
    // streets
    g.strokeStyle = '#f7f7f5'; g.lineWidth = 12;
    for (let i = 0; i <= w; i += 96) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(w, i); g.stroke(); }
    g.lineWidth = 26; g.beginPath(); g.moveTo(0, 900); g.lineTo(1024, 80); g.stroke();
    g.beginPath(); g.moveTo(0, 520); g.lineTo(1024, 560); g.stroke();
  });
  const alpha = canvasTex(512, 512, (g) => {
    const gr = g.createRadialGradient(256, 256, 60, 256, 256, 256);
    gr.addColorStop(0, '#fff'); gr.addColorStop(.7, '#bbb'); gr.addColorStop(1, '#000');
    g.fillStyle = gr; g.fillRect(0, 0, 512, 512);
  }, false);
  return new THREE.Mesh(new THREE.PlaneGeometry(6.4, 6.4), new THREE.MeshStandardMaterial({ map: tex, alphaMap: alpha, transparent: true, roughness: .85, depthWrite: false }));
}
function makePin() {
  const g = new THREE.Group();
  const pts = [[0, 0], [.07, .14], [.18, .38], [.32, .66], [.44, .86], [.5, 1.0]];
  for (let i = 1; i <= 12; i++) { const a = i / 12 * Math.PI / 2; pts.push([Math.cos(a) * .5, 1 + Math.sin(a) * .5]); }
  pts[pts.length - 1][0] = 0;
  g.add(lathe(pts, M.saffron));
  const hole = new THREE.Mesh(new THREE.CylinderGeometry(.19, .19, 1.02, 40), M.white); hole.rotation.x = Math.PI / 2; hole.position.y = 1.0; g.add(hole);
  return g;
}

const LAND = [
  [[-168, 65], [-140, 70], [-100, 72], [-80, 70], [-62, 58], [-55, 48], [-70, 43], [-80, 30], [-82, 25], [-97, 26], [-105, 20], [-95, 16], [-85, 10], [-80, 8], [-90, 15], [-105, 22], [-115, 30], [-125, 40], [-125, 50], [-140, 58], [-160, 58]],
  [[-50, 60], [-40, 62], [-20, 70], [-25, 82], [-55, 80], [-60, 70]],
  [[-80, 10], [-60, 10], [-50, 0], [-35, -7], [-40, -22], [-55, -35], [-68, -55], [-75, -50], [-72, -30], [-80, -5]],
  [[-10, 36], [-10, 44], [-5, 48], [0, 50], [5, 54], [10, 58], [5, 62], [15, 70], [30, 71], [40, 66], [45, 55], [40, 45], [28, 40], [20, 38], [12, 38], [5, 43], [-5, 36]],
  [[-17, 15], [-17, 22], [-10, 30], [-5, 36], [10, 37], [20, 32], [32, 31], [35, 28], [43, 12], [51, 12], [42, 0], [40, -15], [35, -25], [20, -35], [15, -28], [12, -15], [10, -2], [8, 4], [-8, 4], [-15, 10]],
  [[28, 40], [40, 45], [45, 55], [40, 66], [60, 70], [80, 73], [110, 77], [140, 72], [170, 68], [180, 65], [160, 60], [140, 55], [140, 45], [130, 40], [122, 30], [120, 22], [108, 20], [105, 10], [100, 15], [95, 18], [90, 22], [80, 15], [77, 8], [72, 20], [66, 25], [57, 25], [50, 30], [48, 30], [55, 20], [45, 13], [35, 28]],
  [[95, 5], [105, -6], [120, -8], [140, -5], [130, 0], [118, 5], [100, 3]],
  [[114, -22], [122, -18], [130, -12], [137, -12], [142, -11], [146, -18], [153, -25], [150, -37], [140, -38], [132, -32], [115, -34]],
  [[130, 31], [135, 34], [140, 36], [142, 41], [141, 45], [138, 40], [132, 33]],
  [[-5, 50], [1, 51], [0, 53], [-3, 58], [-6, 57], [-5, 54]],
];
const INDIA = [[68, 24], [72, 21], [73, 16], [77, 8], [80, 13], [80, 16], [87, 21], [89, 22], [92, 26], [88, 27], [81, 30], [78, 32], [74, 34], [71, 28]];
function inPoly(x, y, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c;
  }
  return c;
}
function makeGlobe() {
  const tex = canvasTex(2048, 1024, (g, w, h) => {
    g.fillStyle = '#0B1F3A'; g.fillRect(0, 0, w, h);
    for (let lat = -84; lat <= 84; lat += 2.4) {
      const stepLon = 2.4 / Math.max(.25, Math.cos(lat * Math.PI / 180));
      for (let lon = -180; lon < 180; lon += stepLon) {
        const land = LAND.some(p => inPoly(lon, lat, p));
        const ind = inPoly(lon, lat, INDIA);
        g.fillStyle = ind ? '#FF7A1A' : land ? '#F7F5F0' : '#1f3a63';
        g.beginPath(); g.arc((lon + 180) / 360 * w, (90 - lat) / 180 * h, ind ? 6 : land ? 5 : 3, 0, Math.PI * 2); g.fill();
      }
    }
  });
  const g = new THREE.Group();
  const s = new THREE.Mesh(new THREE.SphereGeometry(1.75, 96, 64), new THREE.MeshPhysicalMaterial({ map: tex, roughness: .3, metalness: .1, clearcoat: 1, clearcoatRoughness: .05 }));
  g.add(s); g.sphere = s;
  const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.45, .03, 12, 160), M.chrome); orbit.rotation.x = Math.PI / 2 - .32; orbit.rotation.y = .2; g.add(orbit); g.orbit = orbit;
  return g;
}

function makeBag() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(2.0, 2.2, .95, 6, .1), M.black); g.add(body);
  for (const z of [.3, -.3]) {
    const h = new THREE.Mesh(new THREE.TorusGeometry(.48, .06, 16, 48, Math.PI), M.chrome); h.position.set(0, 1.08, z); g.add(h);
  }
  const tag = box(.9, .32, .04, M.white, .08); tag.position.set(0, .2, .49); g.add(tag);
  const tb = box(.5, .07, .02, M.saffron, .03); tb.position.set(0, .2, .52); g.add(tb);
  return g;
}
function makeProduct(kind) {
  const g = new THREE.Group();
  g.add(box(1.3, 1.75, .08, M.white, .1));
  const im = box(1.1, .92, .05, M.light, .08); im.position.set(0, .3, .06); g.add(im);
  let p;
  if (kind === 0) { p = sph(.27, M.black); p.position.set(0, .3, .32); }
  else if (kind === 1) { p = new THREE.Mesh(new THREE.CylinderGeometry(.16, .2, .55, 32), M.chrome); p.position.set(0, .3, .3); }
  else { p = box(.5, .42, .3, M.dark, .08); p.position.set(0, .3, .25); }
  g.add(p);
  const t = box(.9, .09, .03, M.dark, .04); t.position.set(-.05, -.32, .06); g.add(t);
  const pr = box(.42, .13, .03, M.black, .05); pr.position.set(-.29, -.55, .06); g.add(pr);
  const btn = box(.4, .17, .05, M.emerald, .08); btn.position.set(.33, -.55, .07); g.add(btn);
  return g;
}

function marbleTex() {
  return canvasTex(1024, 1024, (g, w, h) => {
    g.fillStyle = '#ecebe8'; g.fillRect(0, 0, w, h);
    let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 9000; i++) { g.fillStyle = `rgba(0,0,0,${rnd() * .04})`; g.fillRect(rnd() * w, rnd() * h, 2, 2); }
    g.filter = 'blur(1.4px)';
    for (let i = 0; i < 26; i++) {
      g.strokeStyle = `rgba(90,90,90,${.08 + rnd() * .18})`; g.lineWidth = .6 + rnd() * 2.4;
      g.beginPath(); let x = rnd() * w, y = rnd() * h; g.moveTo(x, y);
      for (let k = 0; k < 6; k++) { const nx = x + (rnd() - .3) * 260, ny = y + (rnd() - .5) * 200; g.quadraticCurveTo(x + (rnd() - .5) * 120, y + (rnd() - .5) * 120, nx, ny); x = nx; y = ny; }
      g.stroke();
    }
  });
}
function makeStatue() {
  const mar = new THREE.MeshPhysicalMaterial({ color: 0xbebbb6, map: marbleTex(), roughness: .5, clearcoat: .25, clearcoatRoughness: .35 });
  const g = new THREE.Group();
  const sun = new THREE.DirectionalLight(0xffffff, 2.6); sun.position.set(6, 5, 4); g.add(sun); g.add(sun.target);
  // plinth / seat
  g.add(box(1.7, 1.15, 1.5, mar, .06).translateX(-1.3).translateY(-2.98));
  // torso (leaning forward toward the laptop)
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(.6, 1.05, 10, 28), mar);
  torso.position.set(-.78, -1.42, 0); torso.rotation.z = -.42; torso.scale.set(1, 1, .82); g.add(torso);
  // drapery
  const drape = new THREE.Mesh(new THREE.TorusGeometry(.64, .17, 16, 48), mar); drape.position.set(-.95, -2.0, 0); drape.rotation.set(Math.PI / 2 - .2, .25, 0); g.add(drape);
  const sash = new THREE.Mesh(new THREE.TorusGeometry(.75, .12, 14, 40, Math.PI * 1.1), mar); sash.position.set(-.7, -1.35, .05); sash.rotation.set(.35, .3, 1.9); g.add(sash);
  // neck + head
  g.add(limb(V(-.3, -.42), V(-.05, -.05), .2, mar, .18));
  const head = new THREE.Group(); head.position.set(.02, .22, 0); head.rotation.z = -.32; g.add(head);
  const skull = sph(.46, mar, 40); skull.scale.set(.95, 1.05, .9); head.add(skull);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(.08, .26, 16), mar); nose.position.set(.47, .02, 0); nose.rotation.z = -Math.PI / 2 + .3; head.add(nose);
  const brow = new THREE.Mesh(new THREE.CapsuleGeometry(.06, .3, 6, 12), mar); brow.position.set(.4, .17, 0); brow.rotation.x = Math.PI / 2; head.add(brow);
  let seed = 3; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  // curls of hair and beard (classical sculpture look)
  for (let i = 0; i < 200; i++) {
    const th = rnd() * Math.PI * 2, ph = Math.acos(2 * rnd() - 1);
    const d = V(Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th));
    const hair = d.y > .38 || (d.x < -.35 && d.y > -.25);
    const beard = d.x > .05 && d.y < -.5 && d.y > -.97;
    if (!hair && !beard) continue;
    const c = sph(hair ? .085 + rnd() * .03 : .07 + rnd() * .025, mar, 12);
    c.position.copy(d.multiplyScalar(.46)).multiply(V(.95, 1.05, .9)); if (beard) c.position.y -= .06;
    head.add(c);
  }
  // legs
  for (const [z, kx] of [[.32, .2], [-.3, .05]]) {
    g.add(limb(V(-1.1, -2.35, z), V(kx, -2.22, z), .32, mar, .29));
    const kn = sph(.29, mar, 24); kn.position.set(kx, -2.22, z); g.add(kn);
    g.add(limb(V(kx, -2.22, z), V(kx + .12, -3.45, z), .26, mar, .2));
    const ft = box(.55, .16, .26, mar, .07); ft.position.set(kx + .28, -3.5, z); g.add(ft);
  }
  // right arm: elbow on knee, hand to chin
  const sh = V(-.42, -.55, .5), el = V(.12, -1.92, .48), ch = V(.33, -.28, .36);
  g.add(limb(sh, el, .17, mar, .15), limb(el, ch, .14, mar, .12));
  for (const p of [sh, el]) { const j = sph(p === sh ? .2 : .15, mar, 20); j.position.copy(p); g.add(j); }
  const fist = sph(.17, mar, 20); fist.position.copy(ch); fist.scale.set(1, 1.2, .9); g.add(fist);
  // left arm reaching to the keyboard
  const sh2 = V(-.55, -.6, -.45), el2 = V(-.05, -1.55, -.5), hd2 = V(.85, -1.92, -.25);
  g.add(limb(sh2, el2, .16, mar, .14), limb(el2, hd2, .13, mar, .11));
  const j2 = sph(.14, mar, 16); j2.position.copy(el2); g.add(j2);
  const hand2 = box(.32, .1, .2, mar, .05); hand2.position.copy(hd2); g.add(hand2);
  // table + laptop
  const alu = new THREE.MeshPhysicalMaterial({ color: 0x9a9a9a, metalness: .9, roughness: .3 });
  g.add(box(1.9, .1, 1.3, M.dark, .03).translateX(1.35).translateY(-2.08));
  g.add(limb(V(1.35, -2.1), V(1.35, -3.55), .07, M.black));
  g.add(box(1.0, .09, .7, M.black, .03).translateX(1.35).translateY(-3.56));
  g.add(box(1.15, .05, .82, alu, .02).translateX(1.25).translateY(-2.0));
  const scr = new THREE.Group(); scr.position.set(1.8, -1.98, 0); scr.rotation.z = -.22; g.add(scr);
  const lid = box(.05, .78, .82, alu, .02); lid.position.y = .39; scr.add(lid);
  const disp = new THREE.Mesh(new THREE.PlaneGeometry(.74, .68), new THREE.MeshBasicMaterial({ color: 0xf0f0f0 })); disp.rotation.y = -Math.PI / 2; disp.position.set(-.03, .4, 0); scr.add(disp);
  return g;
}

function makeBars() {
  const g = new THREE.Group(); g.bars = [];
  [.7, 1.1, 1.6, 2.2].forEach((h, i) => {
    const b = box(.55, h, .55, i === 3 ? M.emerald : M.chrome, .07);
    b.geometry.translate(0, h / 2, 0); b.position.x = -1.05 + i * .7; g.add(b); g.bars.push(b);
  });
  const arrow = new THREE.Group(); g.add(arrow); g.arrow = arrow;
  const path = new THREE.CatmullRomCurve3([V(-1.5, .5, .4), V(-.6, .9, .4), V(.2, 1.3, .4), V(1.15, 2.55, .4)]);
  arrow.add(new THREE.Mesh(new THREE.TubeGeometry(path, 60, .055, 12), M.emerald));
  const head = new THREE.Mesh(new THREE.ConeGeometry(.16, .34, 24), M.emerald); head.position.set(1.22, 2.66, .4); head.rotation.z = -.55; arrow.add(head);
  return g;
}

// ---------- background leaves ----------
function drawLeaves(svg, n, spread, len, seedStart) {
  let seed = seedStart; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = spread[0] + (spread[1] - spread[0]) * (i / (n - 1)) + (rnd() - .5) * 8;
    const L = len * (.75 + rnd() * .35), w = L * (.16 + rnd() * .05);
    s += `<g transform="translate(300 300) rotate(${a})"><path d="M0 0 C ${L * .25} ${-w} ${L * .7} ${-w * 1.05} ${L} 0 C ${L * .7} ${w * 1.05} ${L * .25} ${w} 0 0Z" fill="#0B1F3A"/><path d="M0 0 L ${L * .95} 0" stroke="#1a3358" stroke-width="3"/></g>`;
  }
  svg.innerHTML = s;
}
drawLeaves($('leafTL'), 7, [-10, 110], 300, 5);
drawLeaves($('leafBR'), 6, [170, 290], 300, 9);

// ---------- scenes ----------
const scenes = [];
function addScene(s, e, build) {
  const sc = { s, e, back: div(backL, '', 'scene'), front: div(frontL, '', 'scene'), group: new THREE.Group() };
  scene3.add(sc.group);
  sc.update = build(sc) || (() => {});
  if (s > 0) CUES.whoosh.push(s - .12);
  scenes.push(sc);
}
const pills = (parent, items, top, step, t0, gap, sc) => items.map((txt, i) => {
  const el = row(parent, top + i * step, txt, 'pill');
  const at = t0 + i * gap; CUES.pop.push(sc.s + at);
  return { el, at };
});

// 1 — Everyone wants Rankings + rising chrome trophy
addScene(0, 4, sc => {
  const a = row(sc.front, 520, 'Everyone wants', 'sm');
  const b = row(sc.back, 590, 'Rankings', 'xl'); b.style.color = 'var(--saffron)'; const L = letters(b);
  const tro = makeTrophy(); sc.group.add(tro);
  const sh = shadow(4.5, 1.2); sh.position.set(.15, pyToY(1600), -2.5); sc.group.add(sh);
  CUES.swish.push(.55);
  return (lt) => {
    rv(a, lt, .15); rvLetters(L, lt, .45, .05);
    const p = eOut5(prog(lt, .55, 1.7));
    tro.position.set(.15, lerp(-9, pyToY(1230), p) + Math.sin(lt * 1.6) * .07 * p, 0);
    tro.rotation.set(.12, -1.1 + p * 1.1 + Math.sin(lt * .8) * .25, lerp(.3, -.06, p));
    tro.scale.setScalar(1.3);
    sh.material.opacity = p; sh.scale.set(1 + .05 * Math.sin(lt * 1.6), 1, 1);
  };
});

// 2 — But it starts with SEO → Search Engine Optimization
addScene(4, 9, sc => {
  const a = row(sc.front, 560, 'But it starts with', 'sm');
  const seo = row(sc.back, 650, 'SEO', 'xl'); seo.style.fontSize = '300px'; seo.style.color = 'var(--navy)'; seo.style.letterSpacing = '-8px';
  const words = ['Search', 'Engine', 'Optimization'].map((w, i) => {
    const el = row(sc.front, 900 + i * 150, '', 'ttl'); el.style.fontSize = '128px';
    const spans = [...w].map((ch, k) => { const s = document.createElement('span'); s.className = 'ltr'; s.textContent = ch; s.style.color = k ? 'var(--navy)' : 'var(--saffron)'; el.appendChild(s); return s; });
    return spans;
  });
  for (let i = 0; i < 3; i++) CUES.pop.push(4 + 1.9 + i * .38);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.9, .2, 32, 80), M.chrome); sc.group.add(ring);
  const ball = sph(.42, M.saffron, 48); sc.group.add(ball);
  return (lt) => {
    rv(a, lt, .1);
    rv(seo, lt, .35, { d: .8, s0: 1.25, blur: 26, dy: 0 });
    const k = eInOut(prog(lt, 1.55, .6));
    seo.style.transform += ` translateY(${-k * 170}px) scale(${lerp(1, .55, k)})`;
    a.style.opacity = 1 - k;
    // expand letter by letter; the first letters (S, E, O) land first
    words.forEach((sp, wi) => sp.forEach((s, ci) => {
      const t0 = ci === 0 ? 1.9 + wi * .38 : 2.6 + wi * .3 + ci * .055;
      rv(s, lt, t0, { d: .45, dy: ci ? 30 : 80, blur: ci ? 10 : 20, s0: ci ? .8 : 1.5 });
    }));
    const p = eOut(prog(lt, .6, 1.4));
    ring.position.set(pxToX(860), lerp(-8, pyToY(1560), p) + Math.sin(lt * 1.3) * .08, -1); ring.rotation.set(.9 + lt * .3, lt * .5, 0);
    ball.position.set(pxToX(230), lerp(-9, pyToY(1640), eOut(prog(lt, .9, 1.4))) + Math.sin(lt * 1.1 + 1) * .08, -.5);
  };
});

// 3 — glossy browser search
addScene(9, 14, sc => {
  const q = 'best SEO company in Delhi';
  const br = div(sc.back, `<div class="chrome"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`, 'browser');
  const bar = div(br, `<svg width="46" height="46" viewBox="0 0 24 24"><circle cx="10" cy="10" r="6.5" fill="none" stroke="#1b1b1b" stroke-width="2.6"/><path d="M15 15 L21 21" stroke="#1b1b1b" stroke-width="2.8" stroke-linecap="round"/></svg><span class="q"></span><span class="caret"></span><svg class="mic" width="40" height="40" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" fill="#6b6b6b"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4" stroke="#6b6b6b" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`, 'sbar');
  const qEl = bar.querySelector('.q'), caret = bar.querySelector('.caret');
  const plain = () => `<div class="fav"></div><div class="lines"><div class="b t" style="width:72%"></div><div class="b" style="width:46%"></div><div class="b" style="width:88%"></div></div>`;
  const cards = [0, 1, 2, 3].map(i => div(br, i === 2
    ? `<div class="fav">Y</div><div class="lines"><div class="tt">Best SEO Company in Delhi</div><div class="url">yourwebsite.com</div></div><div class="badge">#1</div>`
    : plain(), 'res' + (i === 2 ? ' win' : '')));
  const win = cards[2]; win.style.background = '#fff'; win.style.color = '#0B1F3A';
  const cap1 = row(sc.front, 1455, 'Higher in', 'sm');
  const cap2 = row(sc.front, 1512, '<span class="g">organic</span>, unpaid results', 'ttl'); cap2.style.fontSize = '74px';
  for (let i = 0; i < q.length; i++) if (q[i] !== ' ') CUES.tick.push(9 + .55 + i * .055);
  [0, 1, 2, 3].forEach(i => CUES.swish.push(9 + 1.95 + i * .12));
  CUES.pop.push(9 + 3.05);
  return (lt) => {
    const p = eOut(prog(lt, 0, .8));
    br.style.opacity = clamp(lt / .4);
    br.style.transform = `perspective(1800px) translateY(${(1 - p) * 120 + Math.sin(lt * 1.4) * 6}px) rotateX(${lerp(24, 6, p)}deg) scale(${lerp(.92, 1, p)})`;
    const n = Math.floor(clamp((lt - .55) / (q.length * .055)) * q.length);
    qEl.textContent = q.slice(0, n);
    caret.style.opacity = (lt < .55 + q.length * .055 || Math.floor(lt * 2.5) % 2 === 0) && lt < 2.0 ? 1 : 0;
    const k = eInOut(prog(lt, 2.85, .8)); // winner rises to the top
    const order = [0, 1, 2, 3];
    cards.forEach((c, i) => {
      const pi = eOut(prog(lt, 1.95 + i * .12, .55));
      let slot = i;
      if (i === 2) slot = lerp(2, 0, k); else if (i < 2) slot = i + k;
      c.style.top = (290 + slot * 172) + 'px';
      c.style.opacity = pi;
      const lift = i === 2 ? Math.sin(k * Math.PI) * 30 : 0;
      c.style.transform = `translateY(${(1 - pi) * 90 - lift}px) scale(${i === 2 ? 1 + .045 * k : 1})`;
      c.style.zIndex = i === 2 ? 5 : 1;
    });
    const dk = clamp((lt - 2.9) / .5);
    win.style.background = `rgb(${lerp(255, 11, dk)},${lerp(255, 31, dk)},${lerp(255, 58, dk)})`;
    win.style.color = dk > .5 ? '#fff' : '#0B1F3A';
    win.style.boxShadow = `0 ${14 + 26 * k}px ${30 + 40 * k}px rgba(11,31,58,${.1 + .2 * k})`;
    rv(cap1, lt, 3.2); rv(cap2, lt, 3.4);
  };
});

// 4 — SEO helps you + pills + rising bars
addScene(14, 19, sc => {
  const t = row(sc.front, 470, '<span class="g">SEO</span> helps you', 'ttl');
  const ps = pills(sc.front, ['More organic traffic', 'Better visibility', 'Quality leads', 'More conversions'], 680, 104, .9, .62, sc);
  const bars = makeBars(); sc.group.add(bars); bars.position.set(.1, pyToY(1560), 0); bars.rotation.set(.18, -.45, 0);
  const sh = shadow(5, 1.1); sh.position.set(.1, pyToY(1580), -2); sc.group.add(sh);
  return (lt) => {
    rv(t, lt, .1);
    ps.forEach(({ el, at }) => pop(el, lt, at));
    bars.bars.forEach((b, i) => { const p = eBack(clamp(prog(lt, .9 + i * .62, .55))); b.scale.y = Math.max(.001, p); });
    const ap = eOut(prog(lt, 3.1, .7));
    bars.arrow.scale.setScalar(Math.max(.001, ap)); bars.arrow.position.y = (1 - ap) * -.5;
    bars.rotation.y = -.45 + Math.sin(lt * .6) * .12;
    bars.position.y = pyToY(1560) + Math.sin(lt * 1.2) * .05;
  };
});

// 5 — How Search Works: crawl → index → rank
addScene(19, 25, sc => {
  const t = row(sc.front, 380, 'How Search Works', 'ttl');
  const rowsY = [720, 1060, 1400];
  const info = [['01', 'Crawling', 'Bots discover your pages'], ['02', 'Indexing', 'Pages get stored & understood'], ['03', 'Ranking', 'Best answers rise to the top']];
  const labs = info.map(([n, h, s], i) => div(sc.front, `<div class="n">${n}</div><div class="h">${h}</div><div class="s">${s}</div>`, 'lab', { position: 'absolute', left: '470px', top: (rowsY[i] - 95) + 'px' }));
  const line = div(sc.back, '', '', { position: 'absolute', left: '268px', width: '0', top: rowsY[0] + 'px', borderLeft: '4px dashed rgba(255,122,26,.45)' });
  const T0 = [.8, 2.3, 3.8];
  T0.forEach(x => CUES.pop.push(19 + x + .15));
  const spider = makeSpider(), cab = makeCabinet(), pod = makePodium();
  const objs = [spider, cab, pod]; objs.forEach(o => sc.group.add(o));
  const shs = rowsY.map((y, i) => { const s = shadow(2.6, .7); s.position.set(pxToX(268), pyToY(y + (i ? 190 : 175)), -2); sc.group.add(s); return s; });
  return (lt) => {
    rv(t, lt, .1);
    labs.forEach((l, i) => rv(l, lt, T0[i] + .2, { dy: 30 }));
    line.style.height = (eInOut(prog(lt, 1.2, 3.2)) * (rowsY[2] - rowsY[0])) + 'px';
    // spider descends on its silk
    const p0 = eOut(prog(lt, T0[0], 1.0));
    spider.position.set(pxToX(268), lerp(pyToY(rowsY[0]) + 6, pyToY(rowsY[0]) + .1, p0) + Math.sin(lt * 2.2) * .06, 0);
    spider.rotation.set(.25, -.5 + Math.sin(lt * .9) * .3, Math.sin(lt * 1.7) * .06); spider.scale.setScalar(1.05);
    spider.setLegs(lt * 6);
    const p1 = eBack(prog(lt, T0[1], .7));
    cab.position.set(pxToX(268), pyToY(rowsY[1]), 0); cab.scale.setScalar(Math.max(.001, p1) * .95); cab.rotation.set(.18, -.55 + Math.sin(lt * .7) * .1, 0);
    cab.drawers[0].position.z = eOut(prog(lt, T0[1] + .7, .7)) * .62;
    const p2 = eBack(prog(lt, T0[2], .7));
    pod.position.set(pxToX(268), pyToY(rowsY[2]) + .1, 0); pod.scale.setScalar(Math.max(.001, p2) * 1.15); pod.rotation.set(.2, -.45 + Math.sin(lt * .7) * .1, 0);
    pod.star.position.y = .9 + eBack(prog(lt, T0[2] + .5, .6)) * .35 + Math.sin(lt * 2) * .04; pod.star.rotation.y = lt * 2.2;
    pod.star.scale.setScalar(Math.max(.001, prog(lt, T0[2] + .5, .3)));
    shs.forEach((s, i) => s.material.opacity = i ? prog(lt, T0[i], .6) : 0);
  };
});

// 6 — 6 Types of SEO + magnifier sweep
addScene(25, 29, sc => {
  const t = row(sc.front, 380, '6 Types of <span class="g">SEO</span>', 'ttl');
  const six = row(sc.back, 500, '6', 'xl'); six.style.fontSize = '920px'; six.style.lineHeight = '1'; six.style.color = 'rgba(11,31,58,.16)'; six.style.letterSpacing = '0';
  const magWrap = div(sc.back, '', '', { position: 'absolute', inset: '0' });
  const magInner = div(magWrap, '', '', { position: 'absolute', inset: '0' });
  const six2 = row(magInner, 500, '6', 'xl'); six2.style.cssText = six.style.cssText; six2.style.color = 'var(--saffron)';
  const mag = makeMagnifier(); sc.group.add(mag);
  CUES.swish.push(25 + .7);
  return (lt) => {
    rv(t, lt, .1);
    rv(six, lt, .25, { d: .9, s0: 1.2, blur: 30, dy: 0 });
    six2.style.opacity = six.style.opacity; six2.style.transform = six.style.transform; six2.style.filter = six.style.filter;
    const p = eInOut(prog(lt, .6, 2.9));
    const x = lerp(-3.0, 1.45, p), y = pyToY(1130) + Math.sin(p * Math.PI) * 1.0;
    mag.position.set(x, y, 2); mag.rotation.set(-.15 + Math.sin(lt) * .05, .25 - p * .5, .1 - p * .1);
    mag.updateMatrixWorld(); camera.updateMatrixWorld();
    const c = toScreen(mag.position), edge = toScreen(mag.position.clone().add(V(1.08, 0, 0)));
    const r = Math.abs(edge.x - c.x);
    magWrap.style.clipPath = `circle(${r}px at ${c.x}px ${c.y}px)`;
    magInner.style.transformOrigin = `${c.x}px ${c.y}px`;
    magInner.style.transform = 'scale(1.32)';
  };
});

// 7–12 — the six types
function typeScene(s, idx, titleHtml, items, build, anim) {
  addScene(s, s + 4, sc => {
    const lab = row(sc.front, 300, `TYPE 0${idx} / 06`, 'xs');
    const t = row(sc.front, 352, titleHtml, 'ttl');
    const n = items.length, step = 92, top = 1240 + (4 - n) * 46;
    const ps = pills(sc.front, items, top, step, 1.0, .5, sc);
    const obj = build(sc);
    let fitted = false;
    return (lt) => {
      if (!fitted) { fitted = true; const w = t.scrollWidth; if (w > 980) t.style.fontSize = (104 * 980 / w) + 'px'; }
      rv(lab, lt, .05, { dy: 20 }); rv(t, lt, .15);
      ps.forEach(({ el, at }) => pop(el, lt, at));
      anim(obj, lt, ps.map(p => p.at));
    };
  });
}
const OBJ_Y = pyToY(860);

typeScene(29, 1, 'On-Page <span class="g">SEO</span>', ['Titles', 'Headings', 'Content', 'Internal links'], sc => {
  const g = makeWebpage(); sc.group.add(g);
  const sh = shadow(5, 1.2); sh.position.set(0, pyToY(1215), -2.5); sc.group.add(sh);
  return g;
}, (g, lt, at) => {
  const p = eOut(prog(lt, 0, .9));
  g.position.set(0, lerp(OBJ_Y - 3, OBJ_Y + .05, p) + Math.sin(lt * 1.3) * .06, 0);
  g.rotation.set(.12, lerp(-1.2, -.42, p) + Math.sin(lt * .7) * .06, .03); g.scale.setScalar(.92);
  g.parts.forEach((L, i) => { const k = eBack(prog(lt, at[i], .5)); L.position.z = k * (.5 + i * .12); L.scale.setScalar(1 + k * .04); });
});

typeScene(33, 2, 'Technical <span class="g">SEO</span>', ['Crawlability', 'Page speed', 'Schema', 'Sitemaps'], sc => {
  const g = new THREE.Group(); sc.group.add(g);
  g.gear = makeGear(); g.small = makeGear(9, .78, .62, .3); g.speedo = makeSpeedo();
  g.add(g.gear, g.small, g.speedo);
  const sh = shadow(5, 1.2); sh.position.set(0, pyToY(1215), -2.5); sc.group.add(sh);
  return g;
}, (g, lt, at) => {
  const p = eOut(prog(lt, 0, .9));
  g.position.set(0, OBJ_Y + Math.sin(lt * 1.2) * .05, 0);
  g.gear.position.set(-.85, .55, -.6); g.gear.rotation.set(.25, .35, lt * .9 - 1 + p); g.gear.scale.setScalar(Math.max(.001, p));
  g.small.position.set(-1.95, -.65, -.8); g.small.rotation.set(.25, .35, -lt * 1.4 + .2); g.small.scale.setScalar(Math.max(.001, eOut(prog(lt, .25, .8))));
  const q = eBack(prog(lt, .3, .8));
  g.speedo.position.set(.95, -.45, .6); g.speedo.rotation.set(.12, -.35, 0); g.speedo.scale.setScalar(Math.max(.001, q) * 1.05);
  const sp = eInOut(prog(lt, at[1] - .2, 1.2));
  g.speedo.needle.rotation.z = THREE.MathUtils.degToRad(lerp(118, -78, sp) + Math.sin(lt * 18) * 1.5 * sp);
});

typeScene(37, 3, 'Off-Page <span class="g">SEO</span>', ['Backlinks', 'Digital PR', 'Brand mentions'], sc => {
  const g = new THREE.Group(); sc.group.add(g);
  g.a = makeSiteCard(); g.b = makeSiteCard(); g.add(g.a, g.b);
  g.links = [];
  for (let i = 0; i < 4; i++) { const m = new THREE.Mesh(linkGeo, M.chrome); g.add(m); g.links.push(m); }
  const sh = shadow(5, 1.2); sh.position.set(0, pyToY(1215), -2.5); sc.group.add(sh);
  CUES.swish.push(37 + .5);
  return g;
}, (g, lt) => {
  g.position.set(0, OBJ_Y, 0);
  const A = V(-1.25, 1.0, 0), B = V(1.25, -1.0, 0); g.scale.setScalar(.88);
  const pa = eOut(prog(lt, 0, .8)), pb = eOut(prog(lt, .15, .8));
  g.a.position.copy(A).add(V(-3 * (1 - pa), Math.sin(lt * 1.4) * .07, 0)); g.a.rotation.set(.1, .38, .05);
  g.b.position.copy(B).add(V(3 * (1 - pb), Math.sin(lt * 1.4 + 2) * .07, 0)); g.b.rotation.set(.1, -.38, -.05);
  const dir = new THREE.Vector3().subVectors(B, A); const ang = Math.atan2(dir.y, dir.x);
  g.links.forEach((m, i) => {
    const k = eBack(prog(lt, .55 + i * .16, .45));
    const u = (i + .5) / 4 * .72 + .14;
    m.position.copy(A).addScaledVector(dir, u); m.position.z = .3;
    m.rotation.set(i % 2 ? Math.PI / 2 : 0, 0, 0);
    m.rotateOnWorldAxis(V(0, 0, 1), ang);
    m.scale.setScalar(Math.max(.001, k));
  });
  g.rotation.y = Math.sin(lt * .6) * .12;
});

typeScene(41, 4, 'Local <span class="g">SEO</span>', ['near me searches'], sc => {
  const g = new THREE.Group(); sc.group.add(g);
  g.map = makeMap(); g.map.rotation.x = -1.08; g.add(g.map);
  g.pin = makePin(); g.add(g.pin);
  g.ripple = new THREE.Mesh(new THREE.RingGeometry(.3, .38, 64), new THREE.MeshBasicMaterial({ color: 0xFF7A1A, transparent: true, depthWrite: false }));
  g.ripple.rotation.x = -1.08; g.add(g.ripple);
  g.stars = [0, 1, 2].map(() => { const s = star(.24, M.saffron); g.add(s); return s; });
  g.shadowP = shadow(1.2, .5); g.shadowP.rotation.x = -1.08; g.add(g.shadowP);
  g.review = div(sc.front, `<span class="st">★★★★★</span> 4.9 <span class="r">· 1.2k reviews</span>`, 'review', { position: 'absolute', left: '0', top: '0' });
  CUES.thud.push(41 + 1.15);
  CUES.pop.push(41 + 1.6, 41 + 1.75, 41 + 1.9, 41 + 2.1);
  return g;
}, (g, lt) => {
  g.position.set(0, OBJ_Y - .6, 0);
  const mp = eOut(prog(lt, 0, .9));
  g.map.position.set(0, -.9 + (1 - mp) * -1, -.4); g.map.material.opacity = mp;
  g.rotation.y = Math.sin(lt * .5) * .08;
  const d = eBounce(prog(lt, .55, .75));
  g.pin.position.set(0, lerp(6, -.75, d), .25); g.pin.rotation.y = lt * 1.2; g.pin.scale.setScalar(1.05);
  g.shadowP.position.set(0, -.86, .3); g.shadowP.material.opacity = d * .9; g.shadowP.scale.setScalar(.6 + .4 * d);
  const rp = prog(lt, 1.15, 1.2); g.ripple.position.set(0, -.88, .3); g.ripple.scale.setScalar(1 + rp * 5); g.ripple.material.opacity = (1 - rp) * .5 * (rp > 0);
  g.stars.forEach((s, i) => {
    const k = eBack(prog(lt, 1.6 + i * .15, .5));
    s.position.set(-.9 + i * .9, 1.75 + (i === 1 ? .25 : 0) + Math.sin(lt * 2 + i) * .05, .5); s.scale.setScalar(Math.max(.001, k)); s.rotation.set(0, Math.sin(lt * 1.5 + i) * .5, 0);
  });
  g.updateMatrixWorld(); camera.updateMatrixWorld();
  const c = toScreen(new THREE.Vector3(0, -1.3, .3).applyMatrix4(g.matrixWorld));
  rv(g.review, lt, 2.1, { dy: 20 });
  g.review.style.left = (c.x - g.review.offsetWidth / 2) + 'px'; g.review.style.top = (c.y - 30) + 'px';
});

typeScene(45, 5, 'International <span class="g">SEO</span>', ['Hreflang + localized content'], sc => {
  const g = makeGlobe(); sc.group.add(g);
  g.tags = ['EN', 'HI', 'FR'].map(x => div(sc.front, x, 'tag'));
  g.tags.forEach((_, i) => CUES.pop.push(45 + .9 + i * .25));
  const sh = shadow(4, 1); sh.position.set(0, pyToY(1215), -2.5); sc.group.add(sh);
  return g;
}, (g, lt) => {
  const p = eOut(prog(lt, 0, 1));
  g.position.set(0, OBJ_Y - .05 + Math.sin(lt * 1.1) * .05, 0); g.scale.setScalar(lerp(.6, 1, p));
  g.sphere.rotation.set(.35, lt * .45 - 1.2, 0);
  g.orbit.rotation.z = lt * .2;
  g.updateMatrixWorld(); camera.updateMatrixWorld();
  g.tags.forEach((el, i) => {
    const a = lt * .5 + i * Math.PI * 2 / 3 + .3;
    const local = V(Math.cos(a) * 2.45, 0, Math.sin(a) * 2.45);
    const w = local.applyMatrix4(g.orbit.matrixWorld);
    const s = toScreen(w);
    const front = Math.sin(a) > -.35 ? 1 : .35;
    const k = eBack(prog(lt, .9 + i * .25, .5));
    el.style.left = (s.x - 46) + 'px'; el.style.top = (s.y - 34) + 'px';
    el.style.opacity = clamp(k * 3) * front;
    el.style.transform = `scale(${Math.max(0, k) * lerp(.8, 1.1, (Math.sin(a) + 1) / 2)})`;
    el.style.zIndex = front === 1 ? 2 : 0;
  });
});

typeScene(49, 6, 'E-commerce <span class="g">SEO</span>', ['Product pages', 'Category pages', 'Product schema'], sc => {
  const g = new THREE.Group(); sc.group.add(g);
  g.bag = makeBag(); g.add(g.bag);
  g.cards = [0, 1, 2].map(k => { const c = makeProduct(k); g.add(c); return c; });
  const sh = shadow(5, 1.2); sh.position.set(0, pyToY(1215), -2.5); sc.group.add(sh);
  return g;
}, (g, lt, at) => {
  g.position.set(0, OBJ_Y, 0);
  const p = eBack(prog(lt, 0, .8));
  g.bag.position.set(0, -.35 + Math.sin(lt * 1.3) * .06, .6); g.bag.scale.setScalar(Math.max(.001, p) * .95); g.bag.rotation.set(.1, -.4 + Math.sin(lt * .8) * .15, 0);
  const pos = [[-1.85, .5, -.4, .18], [1.85, .35, -.4, -.18], [0, 1.5, -1.4, 0]];
  g.cards.forEach((c, i) => {
    const k = eOut(prog(lt, i === 2 ? at[1] : (i === 0 ? at[0] : at[0] + .2), .6));
    const [x, y, z, rz] = pos[i];
    c.position.set(x * k, y * k - .3 + Math.sin(lt * 1.5 + i) * .06, z); c.rotation.set(.05, -x * .12, rz * k);
    c.scale.setScalar(Math.max(.001, k) * .95);
  });
});

// 13 — statue thinking + strike-through Rankings
addScene(53, 57, sc => {
  const a = row(sc.front, 300, "SEO isn't just", 'sm');
  const b = row(sc.back, 370, 'Rankings', 'xl'); b.style.position = 'relative';
  const strike = div(b, '', 'strike');
  CUES.swish.push(53 + 1.7);
  const st = makeStatue(); sc.group.add(st);
  const sh = shadow(7, 1.4); sh.position.set(-.1, pyToY(1820), -3); sc.group.add(sh);
  return (lt) => {
    rv(a, lt, .1); rv(b, lt, .35, { d: .8, s0: 1.12, blur: 22, dy: 20 });
    strike.style.width = (eInOut(prog(lt, 1.6, .55)) * 106) + '%';
    const p = eOut(prog(lt, 0, 1.4));
    st.position.set(-.15 - (1 - p) * .6, pyToY(1080) + (1 - p) * -.8, 0);
    st.rotation.set(.06, lerp(.55, .3, p) + Math.sin(lt * .5) * .05, 0);
    st.scale.setScalar(1.38);
    camera.position.y = -.2;
  };
});

// 14 — It's helping users find Answers + logo + CTA
addScene(57, 60.01, sc => {
  const a = row(sc.front, 520, "It's helping users find", 'sm');
  const b = row(sc.back, 590, 'Answers', 'xl'); b.style.color = 'var(--navy)'; b.style.fontSize = '200px'; const L = letters(b);
  const cta = row(sc.front, 1480, 'Follow for more SEO tips<span class="arr">→</span>', 'cta');
  CUES.pop.push(57 + 1.75);
  CUES.swish.push(57 + 1.2);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.6, .05, 16, 120), M.chrome); sc.group.add(ring);
  return (lt) => {
    rv(a, lt, .05); rvLetters(L, lt, .25, .05);
    const k = eInOut(prog(lt, 1.1, .8));
    sc.logoK = k;
    pop(cta, lt, 1.75);
    const rp = eOut(prog(lt, 1.2, 1));
    ring.position.set(0, pyToY(1200), -1); ring.scale.setScalar(Math.max(.001, rp)); ring.rotation.set(.3 + Math.sin(lt) * .1, lt * .4, 0);
  };
});

// ---------- logo ----------
const logoImg = params.get('logo');
if (logoImg) logo.querySelector('img').src = logoImg;
await new Promise(r => { const im = logo.querySelector('img'); if (!im || im.complete) r(); else { im.onload = r; im.onerror = r; } });
let logoW = 0, logoH = 0;
function placeLogo(k) {
  if (!logoW) { logoW = logo.offsetWidth; logoH = logo.offsetHeight; }
  const x0 = (W - logoW) / 2, y0 = 52, y1 = 1180;
  logo.style.transform = `translate(${x0}px, ${lerp(y0, y1 - logoH / 2, k)}px) scale(${lerp(1, 2.2, k)})`;
}

// ---------- burned-in captions (timed from out/vo.json written by the audio step) ----------
const capsEl = $('caps');
const capBox = div(capsEl, '', 'c');
let CAPS = [];
try {
  const vo = await (await fetch('/out/vo.json')).json();
  for (const { s, e, text } of vo) {
    const words = text.replace(/S E O/g, 'SEO').replace(/P R\b/g, 'PR').split(/\s+/);
    const chunks = [];
    // short chunks (≤ ~30 chars) so each caption stays on one line
    let cur = [];
    for (const w of words) {
      if (cur.length && (cur.join(' ') + ' ' + w).length > 30) { chunks.push(cur.join(' ')); cur = []; }
      cur.push(w);
    }
    if (cur.length) chunks.push(cur.join(' '));
    const total = chunks.reduce((a, c) => a + c.length, 0);
    let t = s;
    chunks.forEach(c => { const d = (e - s) * c.length / total; CAPS.push({ s: t, e: t + d, text: c }); t += d; });
  }
} catch (err) { CAPS = []; }
const KEY = /^(SEO|rankings?|six|answers|organic|traffic|crawl|index|rank)[.,:]?$/i;
let capShown = null;
function placeCaption(t) {
  let cur = null;
  for (const c of CAPS) if (t >= c.s - .05 && t < c.e + .25) cur = c;
  if (!cur) { capsEl.style.opacity = 0; return; }
  if (capShown !== cur) {
    capShown = cur;
    capBox.innerHTML = cur.text.split(' ').map(w => KEY.test(w) ? `<b>${w}</b>` : w).join(' ');
  }
  const p = eOut(prog(t, cur.s - .05, .18));
  capsEl.style.opacity = p;
  capsEl.style.transform = `translateY(${(1 - p) * 14}px)`;
}

// ---------- frame ----------
window.DURATION = 60;
window.renderFrame = (t) => {
  let active = scenes[0];
  for (const sc of scenes) if (t >= sc.s) active = sc;
  for (const sc of scenes) {
    const on = sc === active;
    sc.back.style.display = sc.front.style.display = on ? 'block' : 'none';
    sc.group.visible = on;
  }
  const lt = t - active.s, dur = active.e - active.s;
  camera.position.set(Math.sin(t * .3) * .08, 0, 20 - 1.1 * eInOut(clamp(lt / dur)));
  camera.lookAt(0, camera.position.y, 0);
  active.logoK = 0;
  active.update(lt, t);
  camera.updateMatrixWorld();
  placeLogo(active.logoK || 0);
  placeCaption(t);

  // match-cut transitions: scale-up + blur out, settle in
  const outP = active.e < 60 ? eInOut(prog(t, active.e - .32, .32)) : 0;
  const inP = active.s > 0 ? 1 - eOut(prog(lt, 0, .38)) : 0;
  const push = 1 + .03 * eInOut(clamp(lt / dur));
  const s = push * (1 + .09 * outP) * (1 - .05 * inP);
  wrap.style.transform = `scale(${s})`;
  wrap.style.opacity = (1 - outP) * (1 - inP);
  const bl = 14 * outP + 10 * inP;
  wrap.style.filter = bl > .05 ? `blur(${bl}px)` : 'none';

  // gentle parallax on the backdrop
  $('grid').style.transform = `translate(${Math.sin(t * .21) * 10}px, ${-t * 2 % 120}px)`;
  $('leafTL').style.transform = `translate(${Math.sin(t * .4) * 12}px, ${Math.cos(t * .33) * 8}px) rotate(${Math.sin(t * .5) * 2.5}deg)`;
  $('leafBR').style.transform = `translate(${Math.cos(t * .37) * 14}px, ${Math.sin(t * .29) * 10}px) rotate(${Math.cos(t * .45) * 3}deg)`;

  renderer.render(scene3, camera);
};

window.renderFrame(params.has('t') ? parseFloat(params.get('t')) : 0);
window.READY = true;
