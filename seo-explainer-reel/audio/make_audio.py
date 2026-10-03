"""Builds the reel soundtrack: Kokoro voiceover synced to scenes, a synthesized
lo-fi bed, whooshes on transitions and pops on pills, then mixes to out/mix.wav.

    python3 audio/make_audio.py --tts-dir <dir with kokoro-q8.onnx + voices.npz> [--voice hm_omega]

Cue times come from out/cues.json, written by render.mjs.
"""
import argparse, json, os
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

SR = 24000
DUR = 60.0
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "out")

# (scene start, scene end, line). "S E O" / "P R" are spelled for the TTS.
SCRIPT = [
    (0, 4, "Everyone wants rankings."),
    (4, 9, "But it starts with S E O. Search Engine Optimization."),
    (9, 14, "It's how your website shows up higher in organic, unpaid search results."),
    (14, 19, "S E O brings more traffic, visibility, leads and conversions."),
    (19, 25, "Search engines crawl, index, then rank your pages."),
    (25, 29, "And there are six types of S E O."),
    (29, 33, "On-page: optimizing your content and page elements."),
    (33, 37, "Technical: making your site fast, crawlable and indexable."),
    (37, 41, "Off-page: building authority through backlinks and P R."),
    (41, 45, "Local: winning near me searches."),
    (45, 49, "International: targeting multiple countries and languages."),
    (49, 53, "And e-commerce: optimizing products and categories."),
    (53, 57, "Because S E O isn't just about rankings."),
    (57, 60, "It's about helping users find the right answers."),
]

N = int(SR * DUR)
t_all = np.arange(N) / SR
rng = np.random.default_rng(7)


def lp(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi, order=2):
    hi = min(hi, SR / 2 * 0.95)
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x)


def place(buf, sig, at, gain=1.0):
    i = int(at * SR)
    if i < 0:
        sig, i = sig[-i:], 0
    j = min(len(buf), i + len(sig))
    if j > i:
        buf[i:j] += sig[: j - i] * gain


# ---------------- voiceover ----------------
def voiceover(tts_dir, voice):
    from kokoro_onnx import Kokoro
    k = Kokoro(os.path.join(tts_dir, "kokoro-q8.onnx"), os.path.join(tts_dir, "voices.npz"))
    vo = np.zeros(N)
    spans = []
    for s, e, text in SCRIPT:
        slot = (e - s) - 0.45 if e < 60 else (e - s) - 0.35
        speed = 1.0
        for _ in range(6):
            a, sr = k.create(text, voice=voice, speed=speed, lang="en-us")
            assert sr == SR
            a = np.asarray(a, dtype=np.float64)
            nz = np.where(np.abs(a) > 0.01)[0]  # trim silence
            if len(nz):
                a = a[max(0, nz[0] - 200): nz[-1] + 1200]
            if len(a) / SR <= slot:
                break
            speed = min(1.45, speed * (len(a) / SR) / slot * 1.02)
        start = s + 0.18
        place(vo, a, start)
        spans.append((start, start + len(a) / SR))
        print(f"{s:>4}s  {len(a)/SR:4.2f}s  speed {speed:.2f}  {text}")
    # gentle presence EQ + normalise
    vo = vo + 0.25 * hp(vo, 2500)
    vo = hp(vo, 80)
    vo /= np.max(np.abs(vo)) + 1e-9
    return vo * 0.9, spans


# ---------------- lo-fi music bed ----------------
def note(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def music():
    bpm = 82
    beat = 60 / bpm
    bar = beat * 4
    out = np.zeros(N)
    chords = [[57, 60, 64, 67, 71], [53, 57, 60, 64, 67], [48, 55, 59, 62, 64], [55, 59, 62, 65, 69]]  # Am9 Fmaj9 Cmaj9 G13-ish
    bass = [45, 41, 48, 43]
    nb = int(DUR / bar) + 1
    for b in range(nb):
        t0 = b * bar
        ch = chords[b % 4]
        L = int(bar * SR) + SR
        tt = np.arange(L) / SR
        env = np.minimum(1, tt / 0.35) * np.exp(-tt * 0.35)
        pad = np.zeros(L)
        for m in ch:
            f = note(m)
            for det in (-0.12, 0.12):
                pad += np.sin(2 * np.pi * (f + det) * tt) + 0.25 * np.sin(2 * np.pi * 2 * (f + det) * tt + 1.3)
        place(out, lp(pad * env, 1800) * 0.022, t0)
        # electric-piano stabs on beat 1 and the "and" of 2
        for off in (0.0, beat * 1.5):
            Le = int(1.4 * SR); te = np.arange(Le) / SR
            ep = sum(np.sin(2 * np.pi * note(m + 12) * te) * (1 + 0.4 * np.sin(2 * np.pi * 5 * te)) for m in ch[1:4])
            ep *= np.exp(-te * 3.2) * np.minimum(1, te / 0.004)
            place(out, lp(ep, 2600) * 0.018, t0 + off)
        # bass
        Lb = int(bar * SR); tb = np.arange(Lb) / SR
        bs = np.sin(2 * np.pi * note(bass[b % 4] - 12) * tb) * np.exp(-tb * 0.9) * np.minimum(1, tb / 0.01)
        place(out, bs * 0.13, t0)
    # drums (sparse, soft)
    for i in range(int(DUR / beat) + 1):
        tb = i * beat
        if tb < 1.0:
            continue
        if i % 4 in (0, 2) or i % 8 == 7:
            Lk = int(0.35 * SR); tk = np.arange(Lk) / SR
            f = 48 + 70 * np.exp(-tk * 30)
            kick = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tk * 9)
            place(out, kick * 0.32, tb + (0.5 * beat if i % 8 == 7 else 0))
        if i % 4 in (1, 3):
            Ls = int(0.25 * SR); ts = np.arange(Ls) / SR
            sn = bp(rng.standard_normal(Ls), 900, 5000) * np.exp(-ts * 18) + 0.4 * np.sin(2 * np.pi * 190 * ts) * np.exp(-ts * 25)
            place(out, lp(sn, 4500) * 0.10, tb + 0.012)
        for h in (0, 0.5):
            Lh = int(0.06 * SR); th = np.arange(Lh) / SR
            hat = hp(rng.standard_normal(Lh), 7000) * np.exp(-th * 70)
            place(out, hat * (0.035 if h else 0.022), tb + h * beat + (0.03 if h else 0))
    # vinyl crackle + hiss
    crack = np.zeros(N)
    idx = rng.integers(0, N, 900)
    crack[idx] = rng.standard_normal(900) * 0.25
    out += lp(hp(crack, 1500), 6000) * 0.5 + hp(rng.standard_normal(N), 4000) * 0.0025
    out = lp(out, 7000)  # tape-ish top end
    fade = np.minimum(1, t_all / 1.2) * np.minimum(1, (DUR - t_all) / 1.5)
    return out * fade


# ---------------- sound effects ----------------
def whoosh(length=0.7, lo=300, hi=3500):
    L = int(length * SR); tt = np.arange(L) / SR
    n = rng.standard_normal(L)
    p = tt / length
    env = np.sin(np.pi * p) ** 2
    # sweep a band-pass upward by crossfading filtered bands
    bands = [bp(n, f, f * 2.2) for f in np.geomspace(lo, hi, 6)]
    w = np.zeros(L)
    for k, bnd in enumerate(bands):
        c = k / (len(bands) - 1)
        w += bnd * np.exp(-((p - c) ** 2) / 0.04)
    return w * env


def pop_sfx():
    L = int(0.12 * SR); tt = np.arange(L) / SR
    f = 380 + 700 * np.exp(-tt * 45)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 38) * np.minimum(1, tt / 0.002)
    return s + hp(rng.standard_normal(L), 3000) * np.exp(-tt * 300) * 0.3


def tick_sfx():
    L = int(0.03 * SR); tt = np.arange(L) / SR
    return bp(rng.standard_normal(L), 2000, 7000) * np.exp(-tt * 260)


def thud_sfx():
    L = int(0.45 * SR); tt = np.arange(L) / SR
    f = 42 + 60 * np.exp(-tt * 20)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 8)


def sfx(cues):
    out = np.zeros(N)
    for t in cues.get("whoosh", []):
        place(out, whoosh(), t - 0.35, 0.16)
    for t in cues.get("swish", []):
        place(out, whoosh(0.35, 900, 6000), t - 0.12, 0.09)
    for t in cues.get("pop", []):
        place(out, pop_sfx(), t + 0.05, 0.22)
    for t in cues.get("tick", []):
        place(out, tick_sfx(), t, 0.12 * (0.7 + 0.6 * rng.random()))
    for t in cues.get("thud", []):
        place(out, thud_sfx(), t, 0.45)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tts-dir", required=True)
    ap.add_argument("--voice", default="hm_omega")
    ap.add_argument("--out", default=os.path.join(OUT, "mix.wav"))
    a = ap.parse_args()
    cues = json.load(open(os.path.join(OUT, "cues.json")))
    vo, spans = voiceover(a.tts_dir, a.voice)
    mus = music()
    # duck the music under the voice
    duck = np.ones(N)
    for s, e in spans:
        duck[int((s - 0.1) * SR): int((e + 0.15) * SR)] = 0.45
    k = int(0.15 * SR)
    duck = np.convolve(duck, np.ones(k) / k, mode="same")
    mus = mus / (np.max(np.abs(mus)) + 1e-9) * 0.30 * duck
    mix = vo + mus + sfx(cues)
    mix = np.tanh(mix * 1.1) / np.tanh(1.1)  # soft limiter
    mix *= 0.93 / np.max(np.abs(mix))
    sf.write(a.out, np.stack([mix, mix], 1).astype(np.float32), SR, subtype="PCM_16")
    sf.write(os.path.join(OUT, "voiceover.wav"), vo.astype(np.float32), SR, subtype="PCM_16")
    print("wrote", a.out)


if __name__ == "__main__":
    main()
