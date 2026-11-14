"""Generate the final A4 report from the completed implementation and checks."""

from pathlib import Path
import html
import json
import re
import shutil

folder = Path(__file__).resolve().parents[1]
repository = folder.parents[1]
read = lambda name: (folder / name).read_text()
escape = html.escape
inputs = json.loads(read("inputs.json"))
results = json.loads(read("checks/results.json"))
captures = json.loads(read("checks/capture-results.json"))
source = read("animation.js")


def excerpt(marker, count):
    lines = source.splitlines()
    start = next(i for i, line in enumerate(lines) if marker in line)
    return (
        "\n".join(lines[start : start + count])
        + "\n// Remaining setup omitted from this excerpt."
    )


reference_roles = {
    "Cursor-driven perspective tilt": "Hero photograph follows the pointer with shallow eased X/Y rotation.",
    "Scrubbed bento gallery": "The collage expands around its central lake photograph, then releases into editorial copy.",
    "Image Mask On Scroll": "A right-to-left reveal changes the forest photograph into an open lake view.",
    "Horizontal Text": "A sentence travels left; its live glyphs roll through a wave and settle at the end.",
    "Horizontal scrolling gallery": "Staggered-height cards arrive from below, travel sideways, and depart upward.",
    "FLIP Carousel": "Four equal-width notes reorder; an end note wraps to the opposite side.",
    "Curve swipe": "Scrolling through the pinned footer drives a bowed SVG panel rise, full cover, hold, and downward return using the existing blue theme.",
}
reference_rows = ""
for name, data in inputs["references"].items():
    metadata = data["metadata"]
    stream = metadata["streams"][0]
    reference_rows += (
        f"<tr><td>{escape(name)}</td><td>{data['bytes']:,} bytes; "
        f"{stream['width']}×{stream['height']}; {metadata['format']['duration']}s; "
        f"{stream['r_frame_rate']}fps; {len(data['motion_path'])} motion samples</td>"
        f"<td>{escape(reference_roles[name])}</td></tr>"
    )
image_rows = ""
for name, data in inputs["images"].items():
    if name.startswith("_"):
        continue
    image_rows += (
        f"<tr><td>{escape(name)}</td><td>{data['width']}×{data['height']}; "
        f"{data['bytes']:,} bytes</td><td>{escape(', '.join(data['palette']))}</td></tr>"
    )
config_rows = "".join(
    f"<tr><td><code>{escape(key)}</code></td><td><code>{escape(default)}</code></td><td>{escape(note)}</td></tr>"
    for key, default, note in re.findall(
        r"^  (\w+): ([^\n]+?), // ([^\n]+)$", source, re.M
    )
)
code = "".join(
    f"<article><h3>{title}</h3><pre>{escape(excerpt(marker, count))}</pre></article>"
    for title, marker, count in [
        (
            "Bento timeline and native-resolution limit",
            "// Source: Scrubbed bento gallery",
            28,
        ),
        ("Reversible image wipe", "// Source: Image Mask On Scroll", 23),
        ("Reduced motion and pause", "if (calm()) {", 10),
        ("Container-based resize handling", "const refreshSize =", 17),
        ("Scoped cleanup", "destroy() {", 18),
    ]
)
max_pin_drift = max(
    max(sample["pinY"] for sample in scene["samples"])
    - min(sample["pinY"] for sample in scene["samples"])
    for viewport in results["results"]
    for scene in viewport["sceneResults"]
)
max_progress_error = max(
    abs(sample["progress"] - expected)
    for viewport in results["results"]
    for scene in viewport["sceneResults"]
    for sample, expected in zip(scene["samples"], [0.1, 0.5, 0.9])
)
for name, source_file in [
    ("final-bento.png", "scrubbed-bento-gallery/state-2.png"),
    ("final-mask.png", "image-mask-on-scroll/state-1.png"),
    ("final-carousel.png", "flip-carousel/state-2.png"),
]:
    shutil.copy2(
        repository / ".reanimate/field-notes/clone-4" / source_file,
        folder / "checks" / name,
    )
figures = "".join(
    f'<figure><img src="checks/{name}" alt="{label}"><figcaption>{label}</figcaption></figure>'
    for name, label in [
        ("desktop.png", "Desktop landing page, existing light palette / 1440×900"),
        ("mobile.png", "Compact layout / 375×667"),
        ("final-mask.png", "Right-to-left image reveal at its midpoint / 1500×844"),
        (
            "curve-scroll-0.5.png",
            "Scroll-driven Curve swipe footer at 50% progress / 1440×900",
        ),
    ]
)
assumptions = "".join(f"<li>{escape(item)}</li>" for item in inputs["assumptions"])
checks = f"""
<table><thead><tr><th>Check</th><th>Result</th></tr></thead><tbody>
<tr><td>Production Vite build, JS syntax, authored-file formatting</td><td>Passed</td></tr>
<tr><td>375×667, 768×1024, 1440×900; resize</td><td>No horizontal document overflow; component responds to container size</td></tr>
<tr><td>Four scrubbed scenes and reverse scroll</td><td>Passed at 10%, 50%, and 90% progress; max pin drift {max_pin_drift:.3f}px; max progress error {max_progress_error:.5f}</td></tr>
<tr><td>FLIP next, previous, keyboard and equal widths</td><td>Passed; no remaining temporary wrapping copy</td></tr>
<tr><td>Pause, reduced motion, cleanup</td><td>Pins removed; text/images readable; original markup restored; component triggers removed</td></tr>
<tr><td>Assets and theme</td><td>All ten supplied files match copied bytes; standalone/root/dist paths resolve; current theme tokens unchanged</td></tr>
<tr><td>Console errors</td><td>{len(results['errors'])} recorded</td></tr>
<tr><td>Playback long tasks</td><td>{len(captures['longTasks'])} over 50ms in the sampled image-wipe playback; trace saved</td></tr>
</tbody></table>
"""
report = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Field Notes — implementation and verification report</title>
<style>
@page {{ size: A4; margin: 16mm; }}
body {{ color: #182337; font: 11px/1.6 Arial, sans-serif; }}
h1 {{ font: 48px/1 Georgia, serif; letter-spacing: -2px; margin-bottom: 12px; }}
h2 {{ font: 24px/1.2 Georgia, serif; border-top: 1px solid #d8e1ee; padding-top: 18px; margin-top: 30px; }}
h3 {{ font-size: 13px; }}
table {{ width: 100%; border-collapse: collapse; font-size: 9px; margin-block: 18px; }}
th, td {{ text-align: left; vertical-align: top; border-bottom: 1px solid #d8e1ee; padding: 7px 5px; overflow-wrap: anywhere; }}
thead {{ display: table-header-group; }}
tr, article, figure {{ break-inside: avoid; }}
pre {{ background: #f0f4fa; padding: 12px; font: 9px/1.5 monospace; white-space: pre-wrap; overflow-wrap: anywhere; }}
.brief {{ background: none; padding: 0; font: 10px/1.6 Arial, sans-serif; }}
code {{ font: 10px monospace; }}
figure {{ margin: 20px 0; }}
img {{ max-width: 100%; max-height: 155mm; object-fit: contain; border: 1px solid #d8e1ee; }}
figcaption, .eyebrow {{ color: #5b6980; font-size: 10px; }}
.eyebrow {{ letter-spacing: 2px; }}
</style>
</head>
<body>
<p class="eyebrow">WEB SORCERY / VISUAL JOURNAL / VOL. 01</p>
<h1>Field Notes.</h1>
<p>Implementation and verification report • 14 November 2026</p>
<h2>1. Task description</h2>
<p>A cohesive visual landing page adapts seven supplied GSAP examples to the user's photographs. The site theme is preserved exactly, with no external assets or extra runtime build step. The brief follows verbatim.</p>
<pre class="brief">{escape(read('brief.md'))}</pre>
<h2>2. Input data</h2>
<p>Seven video/description pairs and their assets descriptions were studied. Reference contact sheets were inspected at 2fps for the original examples and 20fps for Curve swipe. Video streams are 60fps; the tilt recording is 1500×846 and the other selected recordings are 1500×844. Full extracted parameters, normalized motion paths, palettes, and file sizes are in inputs.json.</p>
<table><thead><tr><th>Reference</th><th>Extracted parameters</th><th>Use</th></tr></thead><tbody>{reference_rows}</tbody></table>
<p>The ten original JPEG files are copied without edits and retain their original names. No supplied photograph is replaced or recolored.</p>
<table><thead><tr><th>Source image</th><th>Dimensions and size</th><th>Extracted palette (photo content only)</th></tr></thead><tbody>{image_rows}</tbody></table>
<p>Theme source: src/scss/base/_root.scss, unchanged. The integrated page inherits its color tokens; theme.css mirrors them for standalone use. The user brief and .gsap-container root contract are recorded in inputs.json.</p>
<h2>3. Solution architecture</h2>
<p>GSAP 3.15.0, ScrollTrigger, Flip and SplitText are local ES modules, copied from the installed repository package. GSAP 3.15.1 was checked as the current release; dependencies were not changed. DOM, CSS perspective and image clipping are sufficient. The existing Vite pipeline bundles the integrated page; a standalone HTTP-served page needs no build.</p>
<p>sections.html is shared content; style.css scopes every rule to the component; animation.js exports CONFIG and mountAnimation(container, options), returning play, pause, destroy. vendor/ contains the required GSAP modules, assets/ contains original-name copies of source-images. sync-page.py writes the standalone index and the named Nunjucks page, converting image paths for Vite.</p>
<p>The motion is paced by scroll rather than autonomous loops. Bento, mask, wave and gallery use labeled, scrubbed timelines with linear scroll mapping. Pointer tilt uses a 0.5s power2.out lag; direct carousel transitions use a consistent 0.6s power2.inOut ease. Gallery entry spans timeline units 0–0.66, lateral travel 0.35–2.55, departure 2.55–3.21. These units are normalized against scroll distance, not wall-clock seconds.</p>
<p>ResizeObserver measures the container. Compact motion shortens pin ranges and retains native access to all cards. Reduced motion and Pause remove pins and restore readable static layouts. Keyboard controls, alt text, real-text wave alternatives, visible focus rings and live carousel status are included. No ambient ticker, shader, external font or network library is used. Geometry is cached for per-frame glyph movement; image dimensions cap central bento enlargement.</p>
<h2>4. Key code</h2>
{code}
<h2>5. Run and customise</h2>
<pre>python3 animations/field-notes/tools/serve.py
# http://localhost:8080/gsap-animations.html
# http://localhost:8080/animations/field-notes/index.html

# After editing sections.html:
python3 animations/field-notes/tools/sync-page.py
npm run build</pre>
<p>The normal npm run dev / npm run build workflow is unchanged. The standalone folder can be copied to any static server. Local ES modules require HTTP; file:// is unsupported.</p>
<table><thead><tr><th>CONFIG key</th><th>Default</th><th>Effect</th></tr></thead><tbody>{config_rows}</tbody></table>
<pre>import {{ mountAnimation }} from "./animation.js";
const root = document.querySelector(".gsap-container.field-notes");
const animation = mountAnimation(root);
animation.pause();
animation.play();
// On component or route removal:
animation.destroy();</pre>
<p>The module auto-mounts the first component; repeated mounting returns its existing instance. Supply options on the first mount when customizing. Cleanup aborts listeners, removes observers, reverts media/GSAP contexts and SplitText, removes pinning, and restores the original markup without killing unrelated animations. Copy and image choices live in sections.html; geometry lives in style.css; the existing palette has no new override tokens.</p>
<h2>6. Verification</h2>
{checks}
<p>Six original reference and adaptation comparison sheets are in .reanimate/field-notes/compare-4. Final clone videos are in clone-4; earlier rounds are preserved. Round 4 corrects the mask direction, preloads the collage, settles the final text baseline, and removes a capture-induced carousel viewport shift.</p>
<table><thead><tr><th>Reference behavior</th><th>Adaptation result</th><th>Timing/easing limitation</th></tr></thead><tbody>
<tr><td>Pointer tilt</td><td>Shallow X/Y rotations verified at ±6.4° for the sampled 80% pointer offsets</td><td>0.5s eased lag; reference pointer coordinates were not recorded</td></tr>
<tr><td>Bento expansion</td><td>Center image grows, outer tiles leave, reverse restores collage</td><td>Linear scroll mapping; source manual scroll time cannot be aligned exactly</td></tr>
<tr><td>Image mask</td><td>Right-to-left boundary and reverse restoration match observed behavior</td><td>Still-photo adaptation; no moving footage inside the image</td></tr>
<tr><td>Horizontal text/gallery</td><td>Leftward travel, glyph wave, card entry and departure verified</td><td>New text length and composition intentionally change total travel</td></tr>
<tr><td>FLIP reorder</td><td>Equal-size four-card order changes and external wrap verified</td><td>0.6s smooth transition; reference click timing is estimated, not instrumented</td></tr>
</tbody></table>
<p>Pixel mismatch and ±80ms temporal equivalence are not claimed: content, composition and palette are intentionally adapted, and the supplied videos have no scroll-position trace. The checks establish normalized progress, stable pinning, reversal, visual sequence and functional controls. Chrome was tested; physical touch hardware, assistive technology sessions and other engines were not manually tested.</p>
{figures}
<h3>Requested wave entrance adjustment</h3><p>The horizontal sentence now starts beyond the right edge of its stage and enters from the right as scrolling advances. Its scroll range includes the entrance distance, and the final baseline still settles. This user-requested variation was checked at all three viewport sizes; see checks/wave-results.json. Earlier comparison captures document the preceding reference adaptation.</p><h3>Carousel continuity correction</h3><p>A frame-by-frame comparison with the first transition in the reference video identified a 984px next-transition snap caused by removing three cards from grid flow. The correction keeps all cards in flow, positions the wrapping copy relative to its window, and drives FLIP, the outgoing copy, and incoming card on one timeline. It includes the card gap in travel distance and reproduces the temporary edge shrink. Duration is 0.6s. Desktop maximum visible frame displacement fell to about 33px; normalized displacement fell from 3.21 to 0.11 card widths per 16.67ms. The row height stays fixed. Both directions, rapid queued input, mid-transition pause and resize, and reduced motion were tested at 375px, 768px, and 1440px. Traces are in checks/carousel-before-results.json and checks/carousel-after-results.json; 50ms reference/adaptation sheets are in .reanimate/field-notes/carousel-comparison. The earlier page-wide captures predate this correction.</p><h3>Curve swipe footer</h3><p>The Curve swipe recording and descriptions were studied at 20fps. The footer now pins and scrubs the curved SVG panel through its rise, covered hold, and downward return. The action button has been removed. Its 0.65/0.8/0.5 phase weights map onto 1.4 viewport heights of scroll; the end is clamped so the full sequence is reachable. Stopping scroll holds the shape and reverse scrolling reverses the sequence. The reference colors are replaced with existing theme tokens; no brand palette changes were made. Scroll progress, idle hold, reverse behavior, pause, reduced motion, lifecycle cleanup, responsive layouts, and the integrated route are checked in checks/curve-results.json. Reference frames and adapted recordings are retained separately.</p><h3>Custom load-time hero text reveal</h3><p>The user additionally requested a custom reveal for the h1 and paragraphs inside fn-hero-copy. A one-time timeline unfolds the heading characters through line masks with a subtle 3D roll; the eyebrow reveals first and the introductory paragraph follows word by word. Total duration is about 1.7 seconds. The original markup and accessible text are restored after completion. The heading height remains stable; resize does not replay it. Pause, reduced motion, a hidden tab, or destruction settles or removes the reveal safely. No-script content remains visible. All three viewport sizes and the integrated page passed checks in checks/hero-results.json. This user-requested addition is separately attributed, rather than claimed as part of a supplied demo.</p><h2>7. Assumptions and limitations</h2>
<ul>{assumptions}</ul>
<p>Unused demo directories: MotionPath Waypoints, Pinned panels with overscroll, Shader on Scroll. They are not part of this page. Long-task results are a short headless-Chrome sample, not a guarantee for every device. All work remains local; no deployment or commit was performed. Full details and commands are in README.md.</p>
</body>
</html>
"""
(folder / "report.html").write_text(report)
print("Generated report.html from completed verification artifacts.")
