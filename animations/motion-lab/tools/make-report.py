"""Produce the final printable report after browser verification."""

import html
import json
from pathlib import Path

folder = Path(__file__).resolve().parents[1]
read = lambda name: (folder / name).read_text()
data = json.loads(read("inputs.json"))
data["inventory"] = [
    {
        "file": "brief.md",
        "type": "text/markdown",
        "bytes": (folder / "brief.md").stat().st_size,
    },
    {"container": ".gsap-container", "integration": "src/pages/gsap-animations.njk"},
]
(folder / "inputs.json").write_text(json.dumps(data, indent=2) + "\n")
results = json.loads(read("checks/results.json"))
motion = json.loads(read("checks/motion-results.json"))
source = read("showcase.js").splitlines()


def excerpt(marker, count):
    start = next(i for i, line in enumerate(source) if marker in line)
    return "\n".join(source[start : start + count])


snippets = [
    ("Scoped lifecycle", excerpt("export function mountAnimation", 10)),
    ("Labeled entrance sequence", excerpt("// Chapter 1:", 20)),
    ("Container-based resizing", excerpt("const measure =", 23)),
    ("Calm readable state", excerpt("motionContext = gsap.context(() => {", 8)),
    ("Cleanup", excerpt("destroy() {", 20)),
]
code = "".join(
    f"<article><h3>{html.escape(title)}</h3><pre>{html.escape(snippet)}</pre></article>"
    for title, snippet in snippets
)
figures = "".join(
    f'<figure><img src="checks/{name}.png" alt="{label}"><figcaption>{label}</figcaption></figure>'
    for name, label in [
        ("theme-light", "Home page palette / light theme / 1440 × 900"),
        ("theme-dark", "Home page palette / dark theme / 1440 × 900"),
    ]
)
report = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Motion, by design — Implementation report</title>
<style>
@page {{ size: A4; margin: 16mm; }}
body {{ font: 11px/1.6 Arial, sans-serif; color: #24241f; }}
h1 {{ font-size: 36px; letter-spacing: -1.5px; line-height: 1.1; }}
h2 {{ border-top: 1px solid #bdbbb1; padding-top: 14px; margin-top: 28px; font-size: 20px; }}
h3 {{ font-size: 13px; }}
pre {{ white-space: pre-wrap; overflow-wrap: anywhere; font: 9px/1.5 monospace; background: #f2f0e8; padding: 12px; }}
article, figure {{ break-inside: avoid; }}
figure {{ margin: 20px 0; }}
img {{ max-width: 100%; max-height: 155mm; object-fit: contain; border: 1px solid #ccc; }}
figcaption {{ color: #555; }}
.quote {{ font: 10px/1.5 monospace; white-space: pre-wrap; }}
.tag {{ color: #b73515; letter-spacing: 2px; font-size: 10px; }}
</style>
</head>
<body>
<p class="tag">WEB SORCERY / MOTION LAB / VOL. 01</p>
<h1>Motion,<br><em>by design.</em></h1>
<p>Implementation and verification report • 13 November 2026</p>
<h2>1. Task description</h2>
<p>Ten full-viewport chapters showcase every category in the supplied brief. Generated artwork, local modules, accessible controls, and container scoping allow the page to run independently or within the existing website.</p>
<div class="quote">{html.escape(read("brief.md"))}</div>
<h2>2. Input data</h2>
<p>The supplied input was a text brief and the required root selector. No external imagery, video, or datasets were supplied. The inventory and extracted parameters follow; all requested categories are implemented.</p>
<pre>{html.escape(json.dumps(data, indent=2))}</pre>
<h2>3. Solution architecture</h2>
<p>GSAP 3.15.0 with ScrollTrigger, SplitText, Draggable, InertiaPlugin, Flip, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, Physics2DPlugin, TextPlugin, ScrambleTextPlugin, and ScrollToPlugin provides timeline and interaction behavior. Canvas 2D renders the particle field; a six-face CSS 3D cube provides depth without WebGL. GSAP 3.15.1 was checked as the current registry version; the installed 3.15.0 is retained locally.</p>
<p>sections.html is shared content. showcase.css scopes every component selector to .gsap-container. showcase.js exports CONFIG and mountAnimation(container, options), returning play, pause, and destroy. index.html runs independently over HTTP; sync-page.py mirrors the content into the existing Nunjucks page. vendor/gsap contains only required local module dependencies.</p>
<p>Timeline: chapter 1 entrance starts at arrival (0s), copy at 0.35s and artwork at 0.45s, settling by 1.65s. Chapter 2 is controlled by scrolling. Chapter 3 letter reveal and stagger runs alongside typing and scrambling from 0.6s, completing by 2.6s. Chapter 4 uses a scrubbed 3-unit route timeline: path drawing and travel span all three units, and morphing spans units 1.6–2.8. The timeline starts only when 10% of its parent section has entered the viewport and completes when the section bottom reaches viewport center. Chapter 5 FLIP transitions take 0.8s plus stagger. Chapter 6 launches for 1s, returns for 0.8s, then pulses for 0.5s. Chapter 7 crossfades over 0.48s. Chapter 8 pins a stable image wrapper at viewport center and scrubs a child scale-up from 0.72 to 1 over 0.9 viewport heights of scroll. Its mask opens symmetrically on all four sides from the center over the first quarter of that sequence; the transform origin is explicitly 50% 50%. Ambient flower and marquee loops take 24s. Chapter 10 horizontal progression is scroll-driven.</p>
<p>Container queries and ResizeObserver determine layout and graphical dimensions; matchMedia handles viewport conditions and reduced motion. Compact containers halve particle count and stack the horizontal sequence. Tall desktop viewports allow two pinned sections. Offscreen/background ambient motion is paused, canvas resolution is capped at devicePixelRatio 2, and one GSAP ticker drives canvas and cube updates.</p>
<p>Reduced motion and Pause remove pinning and ambient animation, restore readable content, and keep direct controls functional. Keyboard movement, swipe logic, native modal focus behavior, real text, screen reader descriptions, focus rings, and semantic buttons are included. No flashing effects are used.</p>
<h2>4. Key code</h2>
{code}
<h2>5. Run and customise</h2>
<p>The README below includes the exact commands, category map, configuration keys, embed API, assumptions, and browser requirements.</p>
<pre>{html.escape(read("README.md"))}</pre>
<h2>6. Verification</h2>
<p>Production build, JavaScript syntax, formatting, three viewport sizes, resize behavior, keyboard pause, UI controls, drag, swipe logic, reduced motion, cleanup, integrated route, and playback performance were exercised in Chrome. No console errors were recorded. The particle playback sample recorded no tasks longer than 50ms. The timeline trace is stored in checks/performance-trace.json; a short sample does not prove performance on all hardware.</p>
<pre>{html.escape(json.dumps(results, indent=2))}</pre>
<pre>{html.escape(json.dumps(motion, indent=2))}</pre>
{figures}
<h3>Home page theme matching</h3><p>The showcase now inherits the home page color tokens for backgrounds, text, borders, surfaces, artwork, and blue accents. Light/dark palette equality, the live theme toggle, static canvas recoloring, and standalone system-theme fallbacks were checked. See checks/theme-results.json.</p><h3>Centered image scale-up</h3><p>Chapter 08 now keeps the image at viewport center throughout its scroll-driven scale-up. Bounding boxes were measured at 10%, 50%, and 90% progress for 375×667, 768×1024, and 1440×900. Both center coordinates remained within two pixels of viewport center; image width increased. Pause and reduced motion remove image pinning. See checks/image-results.json.</p><h3>Scroll-driven route</h3><p>The route circle follows scroll progress, holds when scrolling stops, and reverses when scrolling backward. The start threshold is exactly 10% of the parent section visible (10% bottom), with geometry and playback checked at all three required viewport sizes. See checks/route-results.json.</p><h2>7. Assumptions and limitations</h2>
<p>Ten chapters group the 25 requested technique categories. Full-screen is a minimum height: dense mobile content grows naturally. Canvas 2D satisfies the graphical category; no WebGL shader is needed. Pausing resets entrance states, and resuming rebuilds them. No visual timing reference was supplied. Synthetic swipe events validate gesture logic; physical touch hardware and browsers other than Chrome were not tested. Modern ES modules require HTTP. Desktop horizontal pinning is replaced by a static vertical stack for calm, compact, or short layouts. All work remains in the local repository.</p>
</body>
</html>
"""
(folder / "report.html").write_text(report)
