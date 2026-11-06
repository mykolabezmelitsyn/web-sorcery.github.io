#!/usr/bin/env python3
"""Summarise animation inputs as JSON. Usage: python3 -I inspect_inputs.py FILE [FILE...]"""
import json, re, subprocess, sys
from pathlib import Path


def natural(p):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", p.name)]


def motion(frames, fps):
    """Centroid of changed pixels between consecutive frames -> normalised path (0..1)."""
    import numpy as np

    path, prev = [], None
    for i, im in enumerate(frames):
        a = np.asarray(
            im.convert("L").resize((160, max(1, round(160 * im.height / im.width)))), dtype=np.int16
        )
        if prev is not None:
            ys, xs = np.nonzero(np.abs(a - prev) > 25)
            if len(xs):
                path.append(
                    {
                        "t": round(i / fps, 3),
                        "x": round(xs.mean() / a.shape[1], 3),
                        "y": round(ys.mean() / a.shape[0], 3),
                        "area": round(len(xs) / a.size, 4),
                    }
                )
        prev = a
    return path[:: max(1, len(path) // 24)]  # keep at most ~24 samples


def palette(im, n=5):
    q = im.convert("RGB").resize((96, 96)).quantize(n)
    pal, counts = q.getpalette(), sorted(q.getcolors(), reverse=True)
    return ["#%02x%02x%02x" % tuple(pal[c * 3 : c * 3 + 3]) for _, c in counts[:n]]


def video(p):
    from PIL import Image

    meta = json.loads(
        subprocess.run(
            [
                "ffprobe",
                "-v",
                "error",
                "-select_streams",
                "v:0",
                "-show_entries",
                "stream=width,height,avg_frame_rate,nb_frames:format=duration",
                "-of",
                "json",
                str(p),
            ],
            capture_output=True,
            text=True,
            check=True,
        ).stdout
    )
    s, num_den = meta["streams"][0], meta["streams"][0]["avg_frame_rate"].split("/")
    fps = float(num_den[0]) / float(num_den[1] or 1)
    out = Path(p.parent, f".frames_{p.stem}")
    out.mkdir(exist_ok=True)
    subprocess.run(
        [
            "ffmpeg",
            "-v",
            "error",
            "-y",
            "-i",
            str(p),
            "-vf",
            "fps=10,scale=320:-1",
            str(out / "f_%04d.png"),
        ],
        check=True,
    )
    frames = [Image.open(f) for f in sorted(out.glob("f_*.png"))]
    return {
        "type": "video",
        "width": s["width"],
        "height": s["height"],
        "fps": round(fps, 3),
        "duration_s": round(float(meta["format"]["duration"]), 3),
        "frames_dir": str(out),
        "palette": palette(frames[len(frames) // 2]) if frames else [],
        "motion_path": motion(frames, 10),
    }


def gif(p):
    from PIL import Image, ImageSequence

    im = Image.open(p)
    frames = [f.copy().convert("RGBA") for f in ImageSequence.Iterator(im)]
    durs = [f.info.get("duration", 100) for f in ImageSequence.Iterator(Image.open(p))]
    total = sum(durs) / 1000
    return {
        "type": "gif",
        "width": im.width,
        "height": im.height,
        "frames": len(frames),
        "duration_s": round(total, 3),
        "fps_avg": round(len(frames) / total, 2) if total else None,
        "frame_ms": sorted(set(durs)),
        "loop": {0: "infinite"}.get(im.info.get("loop"), im.info.get("loop", "plays once")),
        "palette": palette(frames[len(frames) // 2]),
        "motion_path": motion(frames, len(frames) / total if total else 10),
    }


def image(p):
    from PIL import Image

    im = Image.open(p)
    return {
        "type": "image",
        "width": im.width,
        "height": im.height,
        "mode": im.mode,
        "alpha": im.mode in ("RGBA", "LA") or "transparency" in im.info,
        "palette": palette(im),
    }


def jsonfile(p):
    d = json.loads(p.read_text(encoding="utf-8"))
    info = {"type": "json", "top_level": type(d).__name__}
    if isinstance(d, dict):
        info["keys"] = list(d)[:30]
        if {"v", "fr", "ip", "op", "layers"} <= d.keys():
            info.update(
                kind="lottie",
                fps=d["fr"],
                duration_s=round((d["op"] - d["ip"]) / d["fr"], 3),
                width=d.get("w"),
                height=d.get("h"),
                layers=len(d["layers"]),
            )
    elif isinstance(d, list):
        info.update(
            length=len(d),
            item_keys=sorted({k for x in d[:50] if isinstance(x, dict) for k in x})[:30],
        )
    return info


KIND = {
    ".mp4": video,
    ".mov": video,
    ".webm": video,
    ".mkv": video,
    ".gif": gif,
    ".json": jsonfile,
    ".png": image,
    ".jpg": image,
    ".jpeg": image,
    ".webp": image,
    ".avif": image,
    ".svg": None,
}

result = {}
for f in sorted((Path(a) for a in sys.argv[1:]), key=natural):
    fn = KIND.get(f.suffix.lower())
    try:
        result[f.name] = (
            fn(f) if fn else {"type": f.suffix.lstrip(".") or "unknown", "bytes": f.stat().st_size}
        )
    except Exception as e:  # never stop the whole run because of one bad file
        result[f.name] = {"type": "error", "error": f"{type(e).__name__}: {e}"}
seq = [n for n, v in result.items() if v.get("type") == "image"]
if len(seq) > 1:
    sizes = {(result[n]["width"], result[n]["height"]) for n in seq}
    result["_image_set"] = {
        "order": seq,
        "same_size": len(sizes) == 1,
        "likely_frame_sequence": len(sizes) == 1 and all(re.search(r"\d", n) for n in seq),
    }
print(json.dumps(result, indent=2))
