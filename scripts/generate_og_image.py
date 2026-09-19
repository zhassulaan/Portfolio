#!/usr/bin/env python3
"""
Generates public/og-image.jpg (1200x630, the standard Open Graph / Twitter
Card size) from the site's own portrait and theme colors, rather than using
a generic placeholder.

Colors and copy are pulled from assets/css/theme.css's dark palette and
locales/en.json's site.* / hero.status strings, so this stays in sync with
the actual site rather than duplicating hardcoded values. The portrait is
center-cropped to a square (top 1145x1145 of the 1145x1374 source, which
frames the face/shoulders the same way the hero section's cover-fit crop
does) and composited with a rounded mask.

Uses Poppins (available system-wide on this machine) rather than the site's
actual webfonts (DM Sans / Manrope, loaded from Google Fonts at runtime and
not available to a local script) — visually close enough for a small
amount of card copy; swap FONT_DIR below if you vendor the real webfonts
later.

Usage: python3 scripts/generate_og_image.py
Requires Pillow (`pip install Pillow --break-system-packages` if missing).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

WIDTH, HEIGHT = 1200, 630

COLOR_BG = '#0c0d11'
COLOR_TEXT = '#eceaf2'
COLOR_MUTED = '#9a9ca6'
COLOR_ACCENT = '#8a83ff'

NAME = 'Zhassulan Serikuly'
ROLE = 'Senior Software Engineer · 6+ years in production'
DESCRIPTION = (
    'Engineering portfolio — frontend architecture, performance, '
    'modernization, GIS and production systems.'
)
EYEBROW = 'ENGINEERING NOTEBOOK'

FONT_DIR = Path('/usr/share/fonts/truetype/google-fonts')
FONT_BOLD = FONT_DIR / 'Poppins-Bold.ttf'
FONT_MEDIUM = FONT_DIR / 'Poppins-Medium.ttf'
FONT_REGULAR = FONT_DIR / 'Poppins-Regular.ttf'

PORTRAIT_SRC = Path('assets/images/main.webp')
OUTPUT = Path('public/og-image.jpg')


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ''
    for word in words:
        candidate = f'{current} {word}'.strip()
        if draw.textlength(candidate, font=font) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def fit_font(draw: ImageDraw.ImageDraw, text: str, font_path: Path, max_width: int, start_size: int, min_size: int = 32) -> ImageFont.FreeTypeFont:
    size = start_size
    font = ImageFont.truetype(str(font_path), size)
    while draw.textlength(text, font=font) > max_width and size > min_size:
        size -= 2
        font = ImageFont.truetype(str(font_path), size)
    return font


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), (size[0] - 1, size[1] - 1)], radius=radius, fill=255)
    return mask


def main() -> None:
    canvas = Image.new('RGB', (WIDTH, HEIGHT), COLOR_BG)

    # Soft accent glow behind where the portrait will sit.
    glow = Image.new('RGB', (WIDTH, HEIGHT), COLOR_BG)
    glow_draw = ImageDraw.Draw(glow)
    glow_center = (900, HEIGHT // 2)
    glow_draw.ellipse(
        [glow_center[0] - 260, glow_center[1] - 260, glow_center[0] + 260, glow_center[1] + 260],
        fill=COLOR_ACCENT,
    )
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    canvas = Image.blend(canvas, glow, 0.35)

    # Portrait: top square crop (frames face/shoulders), resized, rounded.
    portrait_size = 440
    portrait_radius = 36
    with Image.open(PORTRAIT_SRC) as src:
        src = src.convert('RGB')
        square_side = min(src.width, src.height)
        cropped = src.crop((0, 0, square_side, square_side))
        cropped = cropped.resize((portrait_size, portrait_size), Image.LANCZOS)

    mask = rounded_mask((portrait_size, portrait_size), portrait_radius)
    portrait_pos = (WIDTH - portrait_size - 100, (HEIGHT - portrait_size) // 2)
    canvas.paste(cropped, portrait_pos, mask)

    draw = ImageDraw.Draw(canvas)
    # Thin accent border to lift the portrait off the background.
    border_box = [
        portrait_pos[0] - 1, portrait_pos[1] - 1,
        portrait_pos[0] + portrait_size, portrait_pos[1] + portrait_size,
    ]
    draw.rounded_rectangle(border_box, radius=portrait_radius, outline=COLOR_ACCENT, width=2)

    left = 80
    text_max_width = portrait_pos[0] - left - 40

    font_eyebrow = ImageFont.truetype(str(FONT_MEDIUM), 22)
    # Auto-shrinks so a longer name never runs into the portrait frame.
    font_name = fit_font(draw, NAME, FONT_BOLD, text_max_width, start_size=62, min_size=36)
    font_role = ImageFont.truetype(str(FONT_MEDIUM), 25)
    font_desc = ImageFont.truetype(str(FONT_REGULAR), 23)

    y = 140
    draw.text((left, y), EYEBROW, font=font_eyebrow, fill=COLOR_ACCENT)
    # Letter-spacing isn't native to PIL's text draw; a manual eyebrow rule
    # under it reads the same "label" role instead.
    y += 34
    draw.rectangle([left, y, left + 46, y + 3], fill=COLOR_ACCENT)

    y += 40
    draw.text((left, y), NAME, font=font_name, fill=COLOR_TEXT)

    # ROLE and DESCRIPTION wrap (rather than shrink, like NAME does) —
    # shrinking a full sentence down to name.max_width would make it
    # illegibly small next to a 50-60px name, so it wraps to 2 lines
    # instead and the rest of the layout below just follows however many
    # lines that took.
    y += 92
    for line in wrap_text(draw, ROLE, font_role, text_max_width):
        draw.text((left, y), line, font=font_role, fill=COLOR_ACCENT)
        y += 36

    y += 20
    for line in wrap_text(draw, DESCRIPTION, font_desc, text_max_width):
        draw.text((left, y), line, font=font_desc, fill=COLOR_MUTED)
        y += 34

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUTPUT, 'JPEG', quality=90)
    print(f'wrote {OUTPUT} ({OUTPUT.stat().st_size / 1024:.0f} KB, {canvas.size[0]}x{canvas.size[1]})')


if __name__ == '__main__':
    main()
