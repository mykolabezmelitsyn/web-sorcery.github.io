"""Compare equivalent curve states, allowing the requested palette/content adaptation."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageOps

repository = Path(__file__).resolve().parents[3]
output = repository / ".reanimate/field-notes/curve-comparison"
output.mkdir(parents=True, exist_ok=True)
pairs = [(2, 1), (5, 2), (8, 4), (28, 6), (31, 7), (36, 8)]
for group, start in enumerate([0, 3]):
    sheet = Image.new("RGB", (1040, 1000), "white")
    draw = ImageDraw.Draw(sheet)
    draw.text(
        (10, 5),
        "Curve swipe: reference / adaptation in the existing theme",
        fill="black",
    )
    for row, (reference, adaptation) in enumerate(pairs[start : start + 3]):
        y = 30 + row * 320
        first = Image.open(
            repository
            / f"animations/field-notes/checks/curve-reference/frame-{reference:03d}.jpg"
        )
        second = Image.open(
            repository / f".reanimate/field-notes/curve-swipe/state-{adaptation}.png"
        )
        sheet.paste(ImageOps.contain(first, (510, 285)), (0, y + 20))
        sheet.paste(ImageOps.contain(second, (510, 285)), (525, y + 20))
        draw.text((5, y), f"Reference {(reference - 1) / 20:.2f}s", fill="black")
        draw.text((535, y), f"Adaptation sampled state {adaptation}", fill="black")
    sheet.save(output / f"sheet-{group + 1}.jpg", quality=92)
print("Updated curve comparison sheets.")
