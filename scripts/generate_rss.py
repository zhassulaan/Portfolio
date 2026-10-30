#!/usr/bin/env python3
"""Generates public/rss.xml from the posts in data/blog_posts.ts.

Usage: python3 scripts/generate_rss.py   (or `npm run feeds` for sitemap + rss)
"""
import os
from datetime import datetime, timezone
from email.utils import format_datetime
from pathlib import Path
from xml.sax.saxutils import escape

from blog_posts import load_posts

SITE_URL = os.environ.get('NUXT_PUBLIC_SITE_URL', 'https://zhassulan.netlify.app')
OUTPUT = Path('public/rss.xml')


def rfc822(iso_date: str) -> str:
    return format_datetime(datetime.fromisoformat(iso_date).replace(tzinfo=timezone.utc))


def main() -> None:
    posts = load_posts()
    items = []
    for post in posts:
        url = f"{SITE_URL}/blog/{post['slug']}"
        items.append(
            '    <item>\n'
            f"      <title>{escape(post['title'])}</title>\n"
            f'      <link>{url}</link>\n'
            f'      <guid isPermaLink="true">{url}</guid>\n'
            f"      <pubDate>{rfc822(post['date'])}</pubDate>\n"
            f"      <description>{escape(post['summary'])}</description>\n"
            '    </item>'
        )
    last_build = rfc822(posts[0]['date']) if posts else rfc822('1970-01-01')
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<rss version="2.0">\n'
        '  <channel>\n'
        '    <title>Zhassulan Serikuly: Engineering notes</title>\n'
        f'    <link>{SITE_URL}/blog</link>\n'
        '    <description>Short write-ups of engineering work: the problem, what changed and the numbers.</description>\n'
        '    <language>en</language>\n'
        f'    <lastBuildDate>{last_build}</lastBuildDate>\n'
        + '\n'.join(items) + '\n'
        '  </channel>\n'
        '</rss>\n'
    )
    OUTPUT.write_text(xml, encoding='utf-8')
    print(f'wrote {OUTPUT}: {len(posts)} posts')


if __name__ == '__main__':
    main()
