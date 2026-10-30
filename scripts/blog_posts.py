"""Reads the posts in data/blog_posts.ts for the sitemap and RSS scripts."""
import re
from pathlib import Path

BLOG_DATA = Path('data/blog_posts.ts')
STRING = r"'((?:[^'\\]|\\.)*)'"


def _unescape(value: str) -> str:
    return value.replace("\\'", "'").replace('\\\\', '\\')


def load_posts() -> list[dict]:
    """Returns slug, title, date and summary of every post, newest first."""
    if not BLOG_DATA.exists():
        return []
    text = BLOG_DATA.read_text(encoding='utf-8')
    posts = []
    for match in re.finditer(rf"^\s*slug:\s*{STRING},\s*\n\s*title:\s*{STRING},\s*\n\s*date:\s*{STRING},\s*\n\s*summary:\s*{STRING},", text, re.MULTILINE):
        slug, title, date, summary = (_unescape(group) for group in match.groups())
        posts.append({'slug': slug, 'title': title, 'date': date, 'summary': summary})
    return posts
