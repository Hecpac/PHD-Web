#!/usr/bin/env python3
"""
Export shortlist images to web-ready derivatives.

Input shortlist format: reports/wix_audit/shortlist.csv (from wix_media_audit.py)

Outputs:
- public/projects/wix-web/<project-slug>/<type>-r<rank>--w<width>.<ext>
- reports/wix_audit/web_manifest.json

Usage:
  python3 scripts/export_wix_web.py \
    --root "Wix (1)" \
    --shortlist reports/wix_audit/shortlist.csv \
    --out public/projects/wix-web
"""

from __future__ import annotations

import argparse
import csv
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple

from PIL import Image

WIDTHS = [768, 1280, 1920]
WEBP_QUALITY = 82
AVIF_QUALITY = 50


def slugify(value: str) -> str:
    out = []
    for ch in value.strip().lower():
        if ch.isalnum():
            out.append(ch)
        elif ch in {" ", "-", "_", ".", "/", "(", ")"}:
            out.append("-")
    slug = "".join(out)
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-") or "untitled"


@dataclass
class ShortlistRow:
    project: str
    media_type: str
    rank: int
    rel_path: str


def load_shortlist(path: Path) -> List[ShortlistRow]:
    rows: List[ShortlistRow] = []
    with path.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for r in reader:
            rows.append(
                ShortlistRow(
                    project=r["project"],
                    media_type=r["type"],
                    rank=int(r["rank"]),
                    rel_path=r["path"],
                )
            )
    return rows


def resized_dims(w: int, h: int, target_w: int) -> Tuple[int, int]:
    if w <= target_w:
        return w, h
    ratio = target_w / w
    return target_w, int(h * ratio)


def try_save_avif(im: Image.Image, out: Path, quality: int) -> bool:
    try:
        im.save(out, format="AVIF", quality=quality)
        return True
    except Exception:
        return False


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True, help='Media root path, e.g. "Wix (1)"')
    parser.add_argument("--shortlist", default="reports/wix_audit/shortlist.csv")
    parser.add_argument("--out", default="public/projects/wix-web")
    args = parser.parse_args()

    cwd = Path.cwd()
    root = (cwd / args.root).resolve()
    shortlist_path = (cwd / args.shortlist).resolve()
    out_root = (cwd / args.out).resolve()
    report_dir = cwd / "reports" / "wix_audit"
    report_dir.mkdir(parents=True, exist_ok=True)

    if not root.exists():
        raise SystemExit(f"Media root not found: {root}")
    if not shortlist_path.exists():
        raise SystemExit(f"Shortlist not found: {shortlist_path}")

    rows = load_shortlist(shortlist_path)

    manifest: Dict[str, Dict[str, List[Dict[str, object]]]] = {}
    exported = 0
    skipped = 0
    avif_ok_any = False

    for row in rows:
        src = root / row.rel_path
        if not src.exists():
            skipped += 1
            continue

        project_slug = slugify(row.project)
        rel_slug = slugify(Path(row.rel_path).stem)
        out_dir = out_root / project_slug
        out_dir.mkdir(parents=True, exist_ok=True)

        try:
            with Image.open(src) as im:
                im = im.convert("RGB")
                w0, h0 = im.size

                variants = []
                for target_w in WIDTHS:
                    w, h = resized_dims(w0, h0, target_w)
                    if w == 0 or h == 0:
                        continue

                    frame = im if (w == w0 and h == h0) else im.resize((w, h), Image.Resampling.LANCZOS)

                    base_name = f"{row.media_type}-r{row.rank:02d}-{rel_slug}--w{w}"
                    webp_path = out_dir / f"{base_name}.webp"
                    frame.save(webp_path, format="WEBP", quality=WEBP_QUALITY, method=6)

                    avif_path = out_dir / f"{base_name}.avif"
                    avif_ok = try_save_avif(frame, avif_path, AVIF_QUALITY)
                    avif_ok_any = avif_ok_any or avif_ok

                    variants.append(
                        {
                            "width": w,
                            "height": h,
                            "webp": str(webp_path.relative_to(cwd)),
                            "avif": str(avif_path.relative_to(cwd)) if avif_ok else None,
                        }
                    )

                exported += 1
                project_bucket = manifest.setdefault(project_slug, {"hero": [], "gallery": []})
                project_bucket[row.media_type].append(
                    {
                        "rank": row.rank,
                        "source": str(src.relative_to(root)),
                        "variants": variants,
                    }
                )
        except Exception:
            skipped += 1

    output_manifest = {
        "generated_at": __import__("datetime").datetime.now().isoformat(timespec="seconds"),
        "source_root": str(root),
        "shortlist": str(shortlist_path),
        "output_root": str(out_root),
        "exported_items": exported,
        "skipped_items": skipped,
        "avif_supported": avif_ok_any,
        "projects": manifest,
    }

    manifest_path = report_dir / "web_manifest.json"
    manifest_path.write_text(json.dumps(output_manifest, indent=2, ensure_ascii=False), encoding="utf-8")

    print(json.dumps({
        "exported_items": exported,
        "skipped_items": skipped,
        "avif_supported": avif_ok_any,
        "manifest": str(manifest_path),
        "output_root": str(out_root),
    }, indent=2))


if __name__ == "__main__":
    main()
