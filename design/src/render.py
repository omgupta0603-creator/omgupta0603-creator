"""Renders design/src/*.html pages to full-page PNGs. Usage: python3 render.py <glob> <outdir> [width]"""
import sys, pathlib
from playwright.sync_api import sync_playwright
src = pathlib.Path(__file__).parent
pattern, outdir = sys.argv[1], pathlib.Path(sys.argv[2])
width = int(sys.argv[3]) if len(sys.argv) > 3 else 1440
outdir.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium")
    pg = b.new_page(viewport={"width": width, "height": 900}, device_scale_factor=1)
    for f in sorted(src.glob(pattern)):
        pg.goto(f.resolve().as_uri()); pg.wait_for_load_state("networkidle"); pg.wait_for_timeout(600)
        out = outdir / (f.stem + ".png")
        pg.screenshot(path=str(out), full_page=True)
        print(out, pg.evaluate("document.documentElement.scrollHeight"), pg.evaluate("document.documentElement.scrollWidth"))
    b.close()
