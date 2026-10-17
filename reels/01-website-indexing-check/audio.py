"""Synthesize the reel's music bed + SFX (no samples needed) -> out/audio.wav.

Cue times match the timeline in reel.html. The bed sits low (~-20 dB)
so a voiceover can be laid on top.
"""
import wave
from pathlib import Path

import numpy as np

SR = 44100
DUR = 45.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
mix = np.zeros((N, 2))


def add(sig, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    sig = sig[: max(0, N - i)]
    mix[i : i + len(sig), 0] += sig * gain * (1 - max(0, pan))
    mix[i : i + len(sig), 1] += sig * gain * (1 + min(0, pan))


def env(n, a=0.005, r=None):
    t = np.arange(n) / SR
    e = np.minimum(1, t / a) if a else np.ones(n)
    if r:
        e *= np.exp(-t / r)
    return e


def note(f, d, a=0.01, r=0.3, harm=(1, 0.5, 0.25)):
    n = int(d * SR)
    t = np.arange(n) / SR
    s = sum(h * np.sin(2 * np.pi * f * (k + 1) * t) for k, h in enumerate(harm))
    return s * env(n, a, r)


def lowpass(x, alpha):
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc += alpha * (v - acc)
        y[i] = acc
    return y


# ---------- music bed: 112 bpm, Am - F - C - G ----------
BPM = 112
beat = 60 / BPM
bar = beat * 4
chords = [(220.0, 261.63, 329.63), (174.61, 220.0, 261.63), (130.81, 196.0, 261.63), (196.0, 246.94, 293.66)]
bass = [55.0, 43.65, 65.41, 49.0]

kick_n = int(0.35 * SR)
kt = np.arange(kick_n) / SR
kick = np.sin(2 * np.pi * (45 + 90 * np.exp(-kt * 30)) * kt) * np.exp(-kt * 9)
hat = rng.standard_normal(int(0.05 * SR)) * env(int(0.05 * SR), 0, 0.012)
hat = hat - lowpass(hat, 0.5)

t = 0.0
bar_i = 0
while t < DUR - 1.5:
    c = chords[bar_i % 4]
    for f in c:  # soft pad
        add(note(f, bar + 0.2, a=0.35, r=2.5, harm=(1, 0.2, 0.05)), t, 0.045)
    add(note(bass[bar_i % 4], bar, a=0.02, r=0.9, harm=(1, 0.3)), t, 0.16)
    for b in range(4):
        bt = t + b * beat
        if bt > 0.9:  # beat drops in after the hook's first line
            add(kick, bt, 0.32)
        add(hat, bt + beat / 2, 0.06, pan=0.3)
        # plucky arpeggio
        add(note(c[b % 3] * 2, 0.25, r=0.12, harm=(1, 0.4)), bt + beat * 0.75, 0.035, pan=-0.3)
    t += bar
    bar_i += 1

# fade out the bed
fade = int(1.5 * SR)
mix[N - fade :] *= np.linspace(1, 0, fade)[:, None]


# ---------- SFX ----------
def whoosh(d=0.6):
    n = int(d * SR)
    x = rng.standard_normal(n)
    sweep = np.linspace(0.02, 0.35, n) ** 1.5
    y = np.empty(n)
    acc = 0.0
    for i in range(n):
        acc += sweep[i] * (x[i] - acc)
        y[i] = acc
    return y * np.sin(np.linspace(0, np.pi, n)) ** 2


def click():
    n = int(0.03 * SR)
    x = rng.standard_normal(n) * env(n, 0, 0.004)
    return x - lowpass(x, 0.3) + 0.4 * note(1800, 0.03, a=0, r=0.005, harm=(1,))


def thock():
    s = note(140, 0.25, a=0, r=0.05, harm=(1, 0.5))
    c = click()
    s[: len(c)] += 0.6 * c
    return s


def pop(f=880):
    n = int(0.15 * SR)
    tt = np.arange(n) / SR
    return np.sin(2 * np.pi * f * (1 + 0.6 * np.exp(-tt * 40)) * tt) * env(n, 0.002, 0.04)


def chime(base=523.25):
    s = np.zeros(int(1.5 * SR))
    for k, f in enumerate([base, base * 1.26, base * 1.5, base * 2]):
        nt = note(f, 1.2, a=0.004, r=0.45, harm=(1, 0.3))
        i = int(k * 0.07 * SR)
        s[i : i + len(nt)] += nt
    return s


def buzz():
    n = int(0.35 * SR)
    tt = np.arange(n) / SR
    return np.sign(np.sin(2 * np.pi * 110 * tt)) * env(n, 0.005, 0.12) * 0.5


def impact():
    s = kick * 1.4
    w = whoosh(0.35)[::-1]
    s[: len(w)] += 0.5 * w
    return s


for at in [5, 12, 20, 28, 38]:  # scene wipes
    add(whoosh(), at - 0.35, 0.35)
add(impact(), 0.95, 0.5)  # INDEXED slam
for i in range(10):  # countdown ticks
    add(click(), 3.0 + i * 0.2, 0.25)
for i in range(19):  # typing site:yourdomain.com
    add(click(), 8.4 + i * 0.12 + rng.uniform(-0.01, 0.01), 0.45, pan=rng.uniform(-0.2, 0.2))
add(thock(), 12.7, 0.6)  # Enter
for k, at in enumerate([13.2, 13.58, 13.96]):  # results slide in
    add(whoosh(0.3), at, 0.18)
for k, at in enumerate([14.9, 15.2, 15.5]):  # indexed badges
    add(pop(880 + 220 * k), at, 0.35)
add(chime(), 16.75, 0.3)  # verdict
add(buzz(), 21.1, 0.25)  # 0 results shake
add(pop(660), 25.3, 0.35)  # Search Console card
add(thock(), 29.55, 0.5)  # Ctrl+V
add(whoosh(0.4), 30.6, 0.12)
add(chime(659.25), 32.7, 0.32)  # URL is on Google
for k, at in enumerate([33.5, 33.85, 34.2]):
    add(pop(990 + 110 * k), at, 0.25)
add(impact(), 40.1, 0.45)  # MAT BHOOLNA slam
add(pop(740), 42.2, 0.35)  # follow button
add(thock(), 43.25, 0.5)  # tap
add(chime(784.0), 43.32, 0.28)

# ---------- master ----------
mix /= max(1.0, np.abs(mix).max() / 0.89)
out = Path(__file__).parent / "out" / "audio.wav"
out.parent.mkdir(exist_ok=True)
with wave.open(str(out), "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print("wrote", out)
