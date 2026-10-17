# Reel 01: How to check if your website is indexed by Google

Instagram Reel, 1080×1920, 30 fps, 45 s. The final video is `reel-indexing-check.mp4`.

| Time | Beat | On screen |
|---|---|---|
| 0–5s | Hook | "Aapki website Google par INDEXED hai ya nahi?" slam-in + 10-second countdown ring |
| 5–12s | Step 1 | Browser card, `site:yourdomain.com` typed letter by letter, `site:` operator callout |
| 12–20s | Step 2 | Enter keypress + ripple, results counter, 3 result cards with "Indexed" badges, verdict |
| 20–28s | Step 3 | "0 results" shake, "index nahi hui ho", Search Console card rises in |
| 28–38s | Step 4 | URL Inspection panel: Ctrl+V paste, loader, "URL is on Google" check draw, status rows, Request Indexing tip |
| 38–45s | Outro | "Indexing check karna MAT BHOOLNA!", 3-step recap chips, Follow button tap |

The Hinglish captions are burned in with word-by-word highlighting, timed to the script so a voiceover can be recorded over them.
Audio is a synthesized music bed plus SFX (typing, Enter, pops, chimes, whooshes) at about −21 dB average, so a voice track sits on top.

## Rebuild

    ln -sfn "$(npm root -g)/playwright" node_modules/playwright   # or: npm i playwright
    node render.mjs            # frames -> out/reel-silent.mp4
    python3 audio.py           # -> out/audio.wav
    ffmpeg -i out/reel-silent.mp4 -i out/audio.wav -c:v copy -c:a aac -b:a 192k -shortest reel-indexing-check.mp4

Open `reel.html` in a browser for a live looping preview. `node render.mjs --stills 4,15,33` saves single frames for checking.
Edit copy and timings in `reel.html` (`CAPS` array and GSAP timeline); SFX cue times are in `audio.py`.
