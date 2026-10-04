// Renders animation.html frame-by-frame and encodes an exactly-10s MP4.
// Usage: node render.js [fps] [outfile]   |   node render.js stills t1,t2,...
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs'), { execSync } = require('child_process');
(async () => {
  const mode = process.argv[2] || '60';
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('PAGE ERROR', e));
  await page.goto('file://' + path.join(__dirname, 'animation.html') + '?capture');
  await page.evaluate(() => window.ready);
  const shot = async (t, file) => { await page.evaluate(t => renderFrame(t), t); await page.screenshot({ path: file, type: 'png' }); };
  if (mode === 'stills') {
    const dir = process.argv[4] || 'stills'; fs.mkdirSync(dir, { recursive: true });
    for (const t of process.argv[3].split(',').map(Number)) await shot(t, `${dir}/t${t.toFixed(2)}.png`);
  } else {
    const fps = +mode, frames = fps * 10, dir = path.join(__dirname, 'frames');
    fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir);
    for (let i = 0; i < frames; i++) await shot(i / fps, `${dir}/f${String(i).padStart(4, '0')}.png`);
    const out = process.argv[3] || 'HiddenMarketing360_brand_story.mp4';
    execSync(`ffmpeg -loglevel error -y -framerate ${fps} -i ${dir}/f%04d.png -frames:v ${frames} -c:v libx264 -preset slow -crf 14 -pix_fmt yuv420p -movflags +faststart ${out}`, { stdio: 'inherit' });
    fs.rmSync(dir, { recursive: true, force: true });
  }
  await browser.close();
})();
