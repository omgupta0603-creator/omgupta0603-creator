# "What Is SEO and Its Types?" — 60s vertical explainer reel

`out/what-is-seo-and-its-types.mp4` — 1080×1920, 30 fps, 60 s, H.264 + AAC.

The reel is rendered from code. Text and 3D objects are drawn by Three.js and HTML, each frame is captured with headless Chromium, and ffmpeg encodes the result. Nothing in the pipeline uses stock footage, so the output is the same on every run.

| Path | What it does |
|---|---|
| `src/reel.js` | All 14 scenes: timeline, procedural glossy 3D objects (trophy, spider bot, cabinet, podium, magnifier, webpage, gears and speedometer, chain links, map pin, globe, shopping bag, marble thinker), and the text and pill animations |
| `src/style.css` | Paper background, grid, vignette, leaf shadows and Montserrat type styles |
| `render.mjs` | Local server, parallel Chromium workers and ffmpeg. Writes `out/video_silent.mp4` and `out/cues.json` (SFX timings) |
| `audio/make_audio.py` | Kokoro TTS voiceover timed to each scene, a synthesized lo-fi bed with ducking, whooshes, pops and typing ticks |

## Re-render

```bash
npm i
node render.mjs --stills 2,27,55              # quick preview PNGs
node render.mjs --workers 4 --logo ./logo.png # full render; --logo swaps the [YOUR LOGO] placeholder
pip install kokoro-onnx soundfile scipy
python3 audio/make_audio.py --tts-dir <dir with kokoro-q8.onnx + voices.npz> --voice hm_omega
ffmpeg -i out/video_silent.mp4 -i out/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest out/what-is-seo-and-its-types.mp4
```

The voiceover uses the Kokoro-82M Hindi male voice `hm_omega` reading English, which gives an Indian-English accent. To change the voice, pass `--voice` with another voice name, for example `hf_beta` (female) or `am_michael`.
