// Renders src/index.html frame-by-frame with headless Chromium and encodes to H.264.
//   node render.mjs                      -> out/video_silent.mp4 + out/cues.json
//   node render.mjs --stills 2,6.5,11    -> out/stills/t-<sec>.png (quick previews)
//   node render.mjs --workers 4 --logo /path/logo.png
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, 'out');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const FPS = 30, DUR = 60, FRAMES = FPS * DUR;
const WORKERS = parseInt(opt('--workers', '4'), 10);
const logo = opt('--logo', '');

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg' };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const f = p.startsWith('/logo/') && logo ? logo : path.join(ROOT, p);
  fs.readFile(f, (err, buf) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(buf);
  });
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/src/index.html` + (logo ? `?logo=/logo/${path.basename(logo)}` : '');

const launch = () => playwright.chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl', '--disable-web-security'],
});
async function openPage(browser) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('pageerror', e.message));
  page.on('console', m => { if (m.type() === 'error') console.error('console', m.text()); });
  await page.goto(base);
  await page.waitForFunction('window.READY === true', null, { timeout: 120000 });
  return page;
}
const stage = page => page.locator('#stage');

fs.mkdirSync(OUT, { recursive: true });
const stills = opt('--stills', '');
if (stills) {
  const dir = path.join(OUT, 'stills'); fs.mkdirSync(dir, { recursive: true });
  const browser = await launch(); const page = await openPage(browser);
  for (const t of stills.split(',').map(Number)) {
    await page.evaluate(t => window.renderFrame(t), t);
    await stage(page).screenshot({ path: path.join(dir, `t-${t}.png`) });
    console.log('still', t);
  }
  await browser.close(); server.close(); process.exit(0);
}

async function worker(w) {
  const from = Math.floor(FRAMES * w / WORKERS), to = Math.floor(FRAMES * (w + 1) / WORKERS);
  const seg = path.join(OUT, `seg${w}.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '15', '-pix_fmt', 'yuv420p', '-r', String(FPS), seg], { stdio: ['pipe', 'inherit', 'inherit'] });
  const browser = await launch(); const page = await openPage(browser);
  const t0 = Date.now();
  for (let f = from; f < to; f++) {
    await page.evaluate(t => window.renderFrame(t), f / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 96, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - from) % 60 === 0) console.log(`w${w} frame ${f}/${to} ${((Date.now() - t0) / 1000 / Math.max(1, f - from)).toFixed(2)}s/f`);
  }
  if (w === 0) fs.writeFileSync(path.join(OUT, 'cues.json'), JSON.stringify(await page.evaluate(() => window.CUES), null, 1));
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  return seg;
}

const segs = await Promise.all([...Array(WORKERS).keys()].map(worker));
fs.writeFileSync(path.join(OUT, 'segs.txt'), segs.map(s => `file '${s}'`).join('\n'));
await new Promise(r => spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(OUT, 'segs.txt'), '-c', 'copy', path.join(OUT, 'video_silent.mp4')], { stdio: 'inherit' }).on('close', r));
segs.forEach(s => fs.unlinkSync(s)); fs.unlinkSync(path.join(OUT, 'segs.txt'));
console.log('done', path.join(OUT, 'video_silent.mp4'));
server.close();
