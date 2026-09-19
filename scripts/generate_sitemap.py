#!/usr/bin/env python3
"""
Generates public/sitemap.xml for every route x locale combination.

This site is a static Nuxt/Netlify deploy (no server), so a full sitemap
module (@nuxtjs/sitemap etc.) would pull in a build-time dependency the
project doesn't otherwise need. The route list is small and only changes
when a page or a proof document is added, so a small script that reads the
same data the app itself renders from (data/portfolio.ts's proof_documents)
is enough, and keeps the sitemap from drifting out of sync with the app.

Locale/routing rules mirror nuxt.config.ts's i18n block: 7 locales,
strategy 'prefix_except_default' (the default locale, 'en', is served
unprefixed; every other locale gets a /{locale} prefix), defaultLocale
'en'. If either of those change in nuxt.config.ts, update LOCALES /
DEFAULT_LOCALE below to match.

Usage: python3 scripts/generate_sitemap.py
"""
import re
from datetime import date
from pathlib import Path

SITE_URL = 'https://zhassulan.netlify.app'

LOCALES = ['en', 'ru', 'kk', 'tr', 'zh', 'nl', 'de']
DEFAULT_LOCALE = 'en'

PORTFOLIO_DATA = Path('data/portfolio.ts')
OUTPUT = Path('public/sitemap.xml')

# Static routes, matching pages/**/*.vue one-for-one.
STATIC_ROUTES = ['/', '/projects', '/cv', '/proof']


def load_proof_slugs() -> list[tuple[str, str]]:
    """Returns (slug, kind) for every entry in data/portfolio.ts's proof_documents,
    so certificate/[slug] and recommendation/[slug] routes stay in sync with
    the real data instead of being hand-maintained here."""
    text = PORTFOLIO_DATA.read_text(encoding='utf-8')
    match = re.search(r'export const proof_documents: ProofDocument\[\] = \[(.*?\n\})\];', text, re.DOTALL)
    if not match:
        raise RuntimeError('could not find proof_documents in data/portfolio.ts')
    body = match.group(1)
    entries = []
    for entry_match in re.finditer(r"slug:\s*'([\w-]+)',\s*\n\s*kind:\s*'(\w+)',", body):
        entries.append((entry_match.group(1), entry_match.group(2)))
    return entries


def build_routes() -> list[str]:
    routes = list(STATIC_ROUTES)
    for slug, kind in load_proof_slugs():
        routes.append(f'/{kind}/{slug}')
    return routes


def localized_path(route: str, locale: str) -> str:
    """Mirrors useLocalePath()'s prefix_except_default output."""
    if locale == DEFAULT_LOCALE:
        return route
    if route == '/':
        return f'/{locale}'
    return f'/{locale}{route}'


def build_url(route: str, locale: str) -> str:
    path = localized_path(route, locale)
    return f'{SITE_URL}{path}'


def main() -> None:
    routes = build_routes()
    lastmod = date.today().isoformat()

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ]

    url_count = 0
    for route in routes:
        for locale in LOCALES:
            loc = build_url(route, locale)
            lines.append('  <url>')
            lines.append(f'    <loc>{loc}</loc>')
            lines.append(f'    <lastmod>{lastmod}</lastmod>')
            for alt_locale in LOCALES:
                alt_href = build_url(route, alt_locale)
                lines.append(f'    <xhtml:link rel="alternate" hreflang="{alt_locale}" href="{alt_href}"/>')
            # x-default points at the unprefixed (default-locale) version.
            lines.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{build_url(route, DEFAULT_LOCALE)}"/>')
            lines.append('  </url>')
            url_count += 1

    lines.append('</urlset>')

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print(f'wrote {OUTPUT}: {url_count} URLs ({len(routes)} routes x {len(LOCALES)} locales)')


if __name__ == '__main__':
    main()
