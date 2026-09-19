#!/usr/bin/env python3
"""
Resizes and re-encodes the project screenshots in assets/images/ as WebP.

Most of these started life as raw macOS screenshots (2880px+ wide), which is
far more resolution than any card in the UI ever displays them at — the
largest rendered size is the archive grid, well under 800px wide even on a
large desktop viewport. This script downscales anything wider than
MAX_WIDTH and re-encodes to WebP, which at equivalent visual quality is
routinely 70-90% smaller than PNG for a photographic/UI screenshot.

Usage: python3 scripts/compress_images.py
Requires Pillow (`pip install Pillow --break-system-packages` if missing).

It does NOT delete the original .png files or touch any .ts/.vue source —
it only writes new .webp files alongside the sources it read. Wiring the
new paths into data/portfolio.ts (plus the real post-resize width/height,
printed below) and removing the now-unused .png files are separate,
deliberate steps — see the project's own notes on this pass for why.
"""
from pathlib import Path
from PIL import Image

MAX_WIDTH = 1600
QUALITY = 82

TARGETS = [
    *sorted(Path('assets/images/projects').glob('*.png')),
    Path('assets/images/main.png'),
]


def compress(src: Path) -> tuple[int, int, int, int]:
    dest = src.with_suffix('.webp')
    with Image.open(src) as img:
        img = img.convert('RGB') if img.mode in ('P', 'CMYK') else img
        original_width, original_height = img.size
        if original_width > MAX_WIDTH:
            ratio = MAX_WIDTH / original_width
            new_size = (MAX_WIDTH, round(original_height * ratio))
            img = img.resize(new_size, Image.LANCZOS)
        img.save(dest, 'WEBP', quality=QUALITY, method=6)
    before = src.stat().st_size
    after = dest.stat().st_size
    return before, after, img.width, img.height


def main() -> None:
    total_before = 0
    total_after = 0
    rows = []
    for src in TARGETS:
        if not src.exists():
            print(f'skip (not found): {src}')
            continue
        before, after, width, height = compress(src)
        total_before += before
        total_after += after
        rows.append((src.name, before, after, width, height))

    name_w = max(len(r[0]) for r in rows)
    print(f"{'file'.ljust(name_w)}  {'before':>10}  {'after':>10}  {'reduction':>10}  dimensions")
    for name, before, after, width, height in rows:
        reduction = 1 - (after / before) if before else 0
        print(f'{name.ljust(name_w)}  {before/1024:>7.0f} KB  {after/1024:>7.0f} KB  {reduction:>9.0%}  {width}x{height}')

    print()
    print(f'{len(rows)} images: {total_before/1024/1024:.1f} MB -> {total_after/1024/1024:.1f} MB '
          f'({1 - total_after/total_before:.0%} reduction)')


if __name__ == '__main__':
    main()
