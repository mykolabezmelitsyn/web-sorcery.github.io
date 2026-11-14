"""Build annotated side-by-side reference/adaptation state sheets, without pixel-match claims."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
import json

folder = Path(__file__).resolve().parents[1]
repository = folder.parents[1]
clone = repository / ".reanimate/field-notes/clone-4"
comparison = repository / ".reanimate/field-notes/compare-4"
comparison.mkdir(parents=True, exist_ok=True)
references = {
    "cursor-driven-perspective-tilt": [1, 3, 10],
    "scrubbed-bento-gallery": [1, 3, 4],
    "image-mask-on-scroll": [4, 6, 8],
    "horizontal-text": [1, 17, 33],
    "horizontal-scrolling-gallery": [1, 8, 15],
    "flip-carousel": [1, 2, 3],
}
manifest = []
for name, indices in references.items():
    sheet = Image.new("RGB", (1000, 980), "white")
    draw = ImageDraw.Draw(sheet)
    draw.text(
        (12, 10), name + " / adapted content and unchanged project theme", fill="black"
    )
    for state, index in enumerate(indices):
        reference = folder / "checks/reference" / name / f"frame-{index:03d}.jpg"
        adaptation = clone / name / f"state-{state}.png"
        y = 45 + state * 310
        left = ImageOps.contain(Image.open(reference).convert("RGB"), (490, 276))
        right = ImageOps.contain(Image.open(adaptation).convert("RGB"), (490, 276))
        sheet.paste(left, (0, y))
        sheet.paste(right, (505, y))
        draw.text((10, y - 18), f"Reference video {(index - 1) / 2:.1f}s", fill="black")
        draw.text(
            (515, y - 18),
            f"Adaptation state {state} (normalized scroll/pointer/click state)",
            fill="black",
        )
    path = comparison / f"{name}.jpg"
    sheet.save(path, quality=90)
    manifest.append(
        {
            "reference": name,
            "sheet": str(path.relative_to(repository)),
            "reference_frames": indices,
            "adaptation_states": [0, 1, 2],
            "pixel_comparison": "Not applicable: explicitly adapted content, composition, and palette.",
        }
    )
(comparison / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(f"Created {len(manifest)} state-by-state comparison sheets in {comparison}")
