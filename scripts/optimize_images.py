#!/usr/bin/env python3
"""Batch convert JPG/PNG images to WebP for faster web delivery.

Usage examples:
  python3 scripts/optimize_images.py
  python3 scripts/optimize_images.py assets/images/home-hero
  python3 scripts/optimize_images.py assets/images/home-hero/new.png --force
"""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageOps

SUPPORTED_SUFFIXES = {".jpg", ".jpeg", ".png"}


def collect_sources(inputs: list[str]) -> list[Path]:
    roots = [Path("assets/images")] if not inputs else [Path(item) for item in inputs]
    collected: set[Path] = set()

    for root in roots:
        if not root.exists():
            continue
        if root.is_file():
            if root.suffix.lower() in SUPPORTED_SUFFIXES:
                collected.add(root)
            continue
        for path in root.rglob("*"):
            if path.is_file() and path.suffix.lower() in SUPPORTED_SUFFIXES:
                collected.add(path)

    return sorted(collected)


def target_path(src: Path) -> Path:
    return Path(f"{src}.webp")


def should_skip(src: Path, dst: Path, force: bool) -> bool:
    if force:
        return False
    if not dst.exists():
        return False
    return dst.stat().st_mtime >= src.stat().st_mtime


def convert_one(
    src: Path,
    max_edge: int,
    quality: int,
    alpha_quality: int,
    force: bool,
    dry_run: bool,
) -> tuple[str, int, int]:
    dst = target_path(src)
    if should_skip(src, dst, force):
        return ("skipped", 0, 0)

    before = src.stat().st_size
    if dry_run:
        return ("dry-run", before, before)

    with Image.open(src) as img:
        img = ImageOps.exif_transpose(img)
        width, height = img.size
        if max_edge > 0 and max(width, height) > max_edge:
            scale = max_edge / float(max(width, height))
            new_size = (max(1, int(width * scale)), max(1, int(height * scale)))
            img = img.resize(new_size, Image.Resampling.LANCZOS)

        has_alpha = img.mode in ("RGBA", "LA") or ("transparency" in img.info)
        if has_alpha:
            out = img.convert("RGBA")
            out.save(
                dst,
                "WEBP",
                quality=quality,
                method=6,
                alpha_quality=alpha_quality,
            )
        else:
            out = img.convert("RGB")
            out.save(dst, "WEBP", quality=quality, method=6)

    after = dst.stat().st_size
    return ("converted", before, after)


def bytes_to_mb(num: int) -> float:
    return round(num / 1024 / 1024, 2)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Convert project images to WebP.")
    parser.add_argument(
        "paths",
        nargs="*",
        help="Files or directories to process. Defaults to assets/images.",
    )
    parser.add_argument("--max-edge", type=int, default=2000, help="Max image edge in px. 0 disables resizing.")
    parser.add_argument("--quality", type=int, default=80, help="WebP quality 0-100.")
    parser.add_argument("--alpha-quality", type=int, default=85, help="WebP alpha quality 0-100.")
    parser.add_argument("--force", action="store_true", help="Rebuild even if .webp is newer than source.")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be converted.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    sources = collect_sources(args.paths)
    if not sources:
        print("No JPG/PNG files found.")
        return 0

    converted = 0
    skipped = 0
    failed = 0
    total_before = 0
    total_after = 0

    for src in sources:
        try:
            status, before, after = convert_one(
                src=src,
                max_edge=args.max_edge,
                quality=args.quality,
                alpha_quality=args.alpha_quality,
                force=args.force,
                dry_run=args.dry_run,
            )
            if status == "converted":
                converted += 1
                total_before += before
                total_after += after
                print(f"[ok] {src} -> {target_path(src)}")
            elif status == "dry-run":
                converted += 1
                print(f"[dry] {src} -> {target_path(src)}")
            else:
                skipped += 1
        except Exception as exc:  # noqa: BLE001
            failed += 1
            print(f"[err] {src}: {exc}")

    print("")
    print(f"files scanned: {len(sources)}")
    print(f"converted:    {converted}")
    print(f"skipped:      {skipped}")
    print(f"failed:       {failed}")
    if total_before > 0:
        ratio = (1 - total_after / total_before) * 100
        print(f"size before:  {bytes_to_mb(total_before)} MB")
        print(f"size after:   {bytes_to_mb(total_after)} MB")
        print(f"reduction:    {round(ratio, 2)}%")

    return 0 if failed == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
