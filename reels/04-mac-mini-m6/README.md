# Reel 04: Mac mini M6 (Hinglish, @hiddenmarketing360)

Instagram Reel, 1080×1920, 30 fps, 68 s. The final video is `reel-mac-mini-m6.mp4`.

| Time | Beat | On screen |
|---|---|---|
| 0–4s | Hook | DM/comment bubbles pop in, "Kaunsa computer lun?" |
| 4–10s | Pain | Browser fills with 15 tabs (GA4, Search Console, Semrush, ChatGPT, Canva…), spinning loader, "(Not Responding)", "15 tabs. 1 laptop. Hang." |
| 10–16s | Reveal | Box opens, Mac mini rises, "Mac mini · M6 chip" |
| 16–24s | #1 | M6 chip card ("Apple's first 2nm chip"), then 4 dashboards open together, "SMOOTH ✓" |
| 24–31s | #2 | Design → Edit → Export timeline, export bar, M4 1x vs M6 "up to 2x" graphics bar + footnote |
| 31–34s | Twist | "TWIST 👀" flash and rays |
| 34–42s | #3 | M4 1x vs M6 "up to 4x" AI bar, AI chat writing an SEO outline, keyword chips + footnote |
| 42–50s | #4 | Top-down desk with the small box, ports light up (Thunderbolt ×3, HDMI, LAN) + Wi-Fi 7, monitor turns on |
| 50–57s | Payoff | "No hang." "No clutter." struck through, "Just Mac mini." |
| 57–64s | CTA | "Student offer check karo", "🔗 Link in bio" |
| 64–68s | Outro | "Seekho smart, kaam karo fast.", @hiddenmarketing360, Follow tap |

Spec claims follow Apple's Aug 2026 announcement as reported by 9to5Mac (M6 is Apple's first 2nm chip;
up to 2x graphics and up to 4x AI vs Mac mini with M4; Wi-Fi 7; Thunderbolt 4 ports). The 2x/4x cards carry an on-screen footnote.
The Mac mini is drawn as a generic illustration, with no Apple logo.

## Rebuild

    ln -sfn "$(npm root -g)/playwright" node_modules/playwright
    node render.mjs && python3 audio.py
    ffmpeg -i out/reel-silent.mp4 -i out/audio.wav -c:v copy -c:a aac -b:a 192k -shortest reel-mac-mini-m6.mp4
