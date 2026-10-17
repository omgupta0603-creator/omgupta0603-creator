# Reel 03: How to check an XML sitemap (English)

Instagram Reel, 1080×1920, 30 fps, 45 s. The final video is `reel-xml-sitemap-check.mp4`.

| Time | Beat | On screen |
|---|---|---|
| 0–5s | Hook | "Does your website have an XML SITEMAP or not?" slam-in + countdown ring |
| 5–12s | Step 1 | Browser address bar: `yourdomain.com` then `/sitemap.xml` typed in, "most common location" callout |
| 12–20s | Step 2 | Enter keypress, XML file renders line by line with a URL counter, "sitemap ACCESSIBLE ✓" verdict |
| 20–28s | Step 3 | "404 Not Found" shake, then `/sitemap_index.xml` (Yoast · Rank Math) and `/wp-sitemap.xml` (WordPress) cards, "depends on your setup" |
| 28–38s | Step 4 | Search Console: Sitemaps tab, sitemap URL typed + Submit, table row with "Success" status and discovered URLs, "Couldn't fetch?" tip |
| 38–45s | Outro | "An XML sitemap helps DISCOVERY of your important URLs", recap chips, Follow button tap |

The English captions are burned in with word-by-word highlighting, timed to the script so a voiceover can be recorded over them.
Audio is a synthesized music bed plus SFX at about −21 dB average, so a voice track sits on top.

## Rebuild

    ln -sfn "$(npm root -g)/playwright" node_modules/playwright   # or: npm i playwright
    node render.mjs            # frames -> out/reel-silent.mp4
    python3 audio.py           # -> out/audio.wav
    ffmpeg -i out/reel-silent.mp4 -i out/audio.wav -c:v copy -c:a aac -b:a 192k -shortest reel-xml-sitemap-check.mp4

Open `reel.html` in a browser for a live looping preview. `node render.mjs --stills 4,15,33` saves single frames for checking.
