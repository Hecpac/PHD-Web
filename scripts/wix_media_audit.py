#!/usr/bin/env python3
"""
Audit + shortlist + optional duplicate quarantine for Wix media folders.

Usage:
  python3 scripts/wix_media_audit.py --root "Wix (1)"
  python3 scripts/wix_media_audit.py --root "Wix (1)" --apply-dedupe
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import shutil
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple

from PIL import Image

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}
VIDEO_EXTS = {".mov", ".mp4"}
MEDIA_EXTS = IMAGE_EXTS | VIDEO_EXTS


def slugify(value: str) -> str:
    out = []
    for ch in value.strip().lower():
        if ch.isalnum():
            out.append(ch)
        elif ch in {" ", "-", "_", ".", "/", "(" , ")"}:
            out.append("-")
    slug = "".join(out)
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-") or "untitled"


def md5_file(path: Path) -> str:
    h = hashlib.md5()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def dhash_64(path: Path) -> Optional[int]:
    try:
        with Image.open(path) as im:
            gray = im.convert("L").resize((9, 8), Image.Resampling.LANCZOS)
            pixels = list(gray.getdata())
    except Exception:
        return None

    bits = 0
    idx = 0
    for y in range(8):
        row = pixels[y * 9 : (y + 1) * 9]
        for x in range(8):
            bits = (bits << 1) | (1 if row[x] > row[x + 1] else 0)
            idx += 1
    return bits


def hamming_distance(a: Optional[int], b: Optional[int]) -> int:
    if a is None or b is None:
        return 64
    return (a ^ b).bit_count()


@dataclass
class ImageCandidate:
    project: str
    path: Path
    width: int
    height: int
    megapixels: float
    ratio: float
    score: float
    dhash: Optional[int]


def image_score(path: Path, w: int, h: int) -> float:
    ratio = w / h if h else 0.0
    mp = (w * h) / 1_000_000
    score = mp * 10.0

    if w > h:
        score += 8
    else:
        score -= 6

    if 1.25 <= ratio <= 1.95:
        score += 6
    elif ratio > 3.0:
        score -= 16
    elif ratio < 0.8:
        score -= 8

    if min(w, h) < 900:
        score -= 12
    if min(w, h) < 700:
        score -= 16

    stem = path.stem.lower()
    noisy_tokens = [
        "screenshot",
        "screen shot",
        "img_",
        "dji_",
        "whatsapp",
        "panorama",
        "pano",
    ]
    if any(t in stem for t in noisy_tokens):
        score -= 6

    if "(" in path.name and ")" in path.name:
        score -= 1.5

    return score


def pick_shortlist(candidates: List[ImageCandidate], hero_count: int = 1, gallery_count: int = 8) -> Tuple[List[ImageCandidate], List[ImageCandidate]]:
    if not candidates:
        return [], []

    ranked = sorted(candidates, key=lambda c: c.score, reverse=True)

    hero = ranked[:hero_count]

    gallery: List[ImageCandidate] = []
    selected_hashes = [c.dhash for c in hero]

    for cand in ranked[hero_count:]:
        if len(gallery) >= gallery_count:
            break
        if all(hamming_distance(cand.dhash, h) >= 8 for h in selected_hashes):
            gallery.append(cand)
            selected_hashes.append(cand.dhash)

    if len(gallery) < gallery_count:
        used = {c.path for c in hero + gallery}
        for cand in ranked[hero_count:]:
            if len(gallery) >= gallery_count:
                break
            if cand.path in used:
                continue
            gallery.append(cand)
            used.add(cand.path)

    return hero, gallery


def ensure_unique_target(base: Path) -> Path:
    if not base.exists():
        return base
    stem = base.stem
    suffix = base.suffix
    parent = base.parent
    i = 2
    while True:
        candidate = parent / f"{stem}__dup{i}{suffix}"
        if not candidate.exists():
            return candidate
        i += 1


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True, help='Path to media root, e.g. "Wix (1)"')
    parser.add_argument("--apply-dedupe", action="store_true", help="Move duplicate files to quarantine folder")
    args = parser.parse_args()

    cwd = Path.cwd()
    root = (cwd / args.root).resolve()
    if not root.exists() or not root.is_dir():
        raise SystemExit(f"Root not found: {root}")

    report_dir = cwd / "reports" / "wix_audit"
    report_dir.mkdir(parents=True, exist_ok=True)

    project_dirs = sorted([p for p in root.iterdir() if p.is_dir() and not p.name.startswith("_")], key=lambda p: p.name.lower())

    all_files: List[Path] = [p for p in root.rglob("*") if p.is_file()]
    media_files = [p for p in all_files if p.suffix.lower() in MEDIA_EXTS]
    image_files = [p for p in media_files if p.suffix.lower() in IMAGE_EXTS]
    video_files = [p for p in media_files if p.suffix.lower() in VIDEO_EXTS]

    total_bytes = sum(p.stat().st_size for p in all_files)

    # Duplicate detection
    hash_map: Dict[str, List[Path]] = defaultdict(list)
    for p in media_files:
        hash_map[md5_file(p)].append(p)

    duplicate_groups = [paths for paths in hash_map.values() if len(paths) > 1]
    duplicate_moves: List[Tuple[Path, Path, Path]] = []  # canonical, source, dest

    quarantine_root = root / "_quarantine_duplicates"
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    quarantine_batch = quarantine_root / timestamp

    for group in duplicate_groups:
        canonical = min(group, key=lambda p: (len(p.relative_to(root).parts), len(str(p)), str(p).lower()))
        for src in group:
            if src == canonical:
                continue
            rel = src.relative_to(root)
            dest = ensure_unique_target(quarantine_batch / rel)
            duplicate_moves.append((canonical, src, dest))

    moved_count = 0
    if args.apply_dedupe and duplicate_moves:
        for canonical, src, dest in duplicate_moves:
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(src), str(dest))
            moved_count += 1

    # Shortlist per project
    shortlist_rows: List[Dict[str, str]] = []
    project_summary_rows: List[Dict[str, str]] = []

    for project in project_dirs:
        media = [p for p in project.rglob("*") if p.is_file() and p.suffix.lower() in MEDIA_EXTS]
        imgs = [p for p in media if p.suffix.lower() in IMAGE_EXTS]
        vids = [p for p in media if p.suffix.lower() in VIDEO_EXTS]

        cands: List[ImageCandidate] = []
        for img in imgs:
            try:
                with Image.open(img) as im:
                    w, h = im.size
            except Exception:
                continue
            cand = ImageCandidate(
                project=project.name,
                path=img,
                width=w,
                height=h,
                megapixels=(w * h) / 1_000_000,
                ratio=(w / h) if h else 0,
                score=image_score(img, w, h),
                dhash=dhash_64(img),
            )
            cands.append(cand)

        hero, gallery = pick_shortlist(cands, hero_count=1, gallery_count=8)

        for idx, h in enumerate(hero, start=1):
            shortlist_rows.append(
                {
                    "project": project.name,
                    "type": "hero",
                    "rank": str(idx),
                    "path": str(h.path.relative_to(root)),
                    "width": str(h.width),
                    "height": str(h.height),
                    "score": f"{h.score:.2f}",
                }
            )
        for idx, g in enumerate(gallery, start=1):
            shortlist_rows.append(
                {
                    "project": project.name,
                    "type": "gallery",
                    "rank": str(idx),
                    "path": str(g.path.relative_to(root)),
                    "width": str(g.width),
                    "height": str(g.height),
                    "score": f"{g.score:.2f}",
                }
            )

        ext_counter = Counter(p.suffix.lower() for p in media)
        proj_bytes = sum(p.stat().st_size for p in media)
        project_summary_rows.append(
            {
                "project": project.name,
                "files": str(len(media)),
                "size_gb": f"{proj_bytes / 1024 / 1024 / 1024:.2f}",
                "jpg": str(ext_counter.get(".jpg", 0) + ext_counter.get(".jpeg", 0)),
                "png": str(ext_counter.get(".png", 0)),
                "mov": str(ext_counter.get(".mov", 0)),
                "mp4": str(ext_counter.get(".mp4", 0)),
                "hero_count": str(len(hero)),
                "gallery_count": str(len(gallery)),
            }
        )

    # Write CSV files
    shortlist_csv = report_dir / "shortlist.csv"
    with shortlist_csv.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["project", "type", "rank", "path", "width", "height", "score"])
        writer.writeheader()
        writer.writerows(shortlist_rows)

    project_summary_csv = report_dir / "project_summary.csv"
    with project_summary_csv.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "project",
                "files",
                "size_gb",
                "jpg",
                "png",
                "mov",
                "mp4",
                "hero_count",
                "gallery_count",
            ],
        )
        writer.writeheader()
        writer.writerows(project_summary_rows)

    duplicate_csv = report_dir / "duplicates_manifest.csv"
    with duplicate_csv.open("w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["canonical", "duplicate", "quarantine_target", "moved"])
        for canonical, dup, dest in duplicate_moves:
            writer.writerow([
                str(canonical.relative_to(root)),
                str(dup.relative_to(root)),
                str(dest.relative_to(root.parent)),
                "yes" if args.apply_dedupe and moved_count else "no",
            ])

    stats = {
        "root": str(root),
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "projects": len(project_dirs),
        "total_files": len(all_files),
        "total_media_files": len(media_files),
        "total_image_files": len(image_files),
        "total_video_files": len(video_files),
        "total_size_gb": round(total_bytes / 1024 / 1024 / 1024, 2),
        "duplicate_groups": len(duplicate_groups),
        "duplicate_files_extra": sum(len(g) - 1 for g in duplicate_groups),
        "duplicate_files_moved": moved_count,
        "shortlist_entries": len(shortlist_rows),
        "shortlist_csv": str(shortlist_csv),
        "project_summary_csv": str(project_summary_csv),
        "duplicates_manifest_csv": str(duplicate_csv),
    }

    stats_json = report_dir / "stats.json"
    stats_json.write_text(json.dumps(stats, indent=2, ensure_ascii=False), encoding="utf-8")

    summary_md = report_dir / "SUMMARY.md"
    summary_md.write_text(
        "\n".join(
            [
                "# Wix Media Audit",
                "",
                f"- Root: `{root}`",
                f"- Projects: **{stats['projects']}**",
                f"- Total files: **{stats['total_files']}**",
                f"- Media files: **{stats['total_media_files']}**",
                f"- Images: **{stats['total_image_files']}**",
                f"- Videos: **{stats['total_video_files']}**",
                f"- Total size: **{stats['total_size_gb']} GB**",
                f"- Duplicate groups: **{stats['duplicate_groups']}**",
                f"- Extra duplicate files: **{stats['duplicate_files_extra']}**",
                f"- Duplicate files moved to quarantine: **{stats['duplicate_files_moved']}**",
                "",
                "## Outputs",
                f"- `reports/wix_audit/project_summary.csv`",
                f"- `reports/wix_audit/shortlist.csv` (hero + 8 gallery per project)",
                f"- `reports/wix_audit/duplicates_manifest.csv`",
                f"- `reports/wix_audit/stats.json`",
            ]
        ),
        encoding="utf-8",
    )

    print(json.dumps(stats, indent=2))


if __name__ == "__main__":
    main()
