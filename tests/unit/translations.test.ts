// @vitest-environment node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import registry from '../../config/locales.json';
import { case_studies, milestones, principles, proof_documents, proof_items, projects, signals, surfaces } from '../../data/portfolio';

const ROOT = join(__dirname, '../..');
const DEFAULT_LOCALE = 'en';

type Messages = { [key: string]: string | Messages };

function flatten(object: Messages, prefix = ''): Array<[string, string]> {
  return Object.entries(object).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    return typeof value == 'object' ? flatten(value, path) : [[path, value] as [string, string]];
  });
}

const placeholders = (text: string) => (text.match(/\{[a-z_]+\}/gi) ?? []).sort().join(',');
const read_ui = (code: string) => new Map(flatten(JSON.parse(readFileSync(join(ROOT, `locales/${code}.json`), 'utf8'))));

// Every key tx() can look up, built from the same data the components render.
// A translation key that matches none of them is a typo or stale.
function valid_content_keys(): Set<string> {
  const keys = new Set<string>();
  const add = (prefix: string, fields: string[]) => fields.forEach((field) => keys.add(`${prefix}.${field}`));
  const add_highlights = (prefix: string, count: number) => {
    for (let index = 0; index < count; index += 1) {
      add(`${prefix}.highlight_${index}`, ['label', 'text']);
    }
  };

  signals.forEach((_, index) => add(`signals.${index}`, ['label', 'note', 'value']));
  case_studies.forEach((item) => {
    add(`case_studies.${item.index}`, ['kicker', 'title', 'problem', 'solution', 'result']);
    item.metrics.forEach((_, index) => add(`case_studies.${item.index}.metrics.${index}`, ['label', 'value']));
  });
  surfaces.forEach((item) => add(`surfaces.${item.index}`, ['title', 'text']));
  principles.forEach((item) => add(`principles.${item.number}`, ['title', 'text']));
  proof_items.forEach((_, index) => add(`proof_items.${index}`, ['label', 'value', 'note']));
  proof_documents.forEach((item) => add(`proof_documents.${item.slug}`, ['title', 'description']));
  projects.forEach((item) => add(`projects.${item.id}`, ['title', 'description', 'note']));
  milestones.forEach((item) => {
    const prefix = `milestones.${item.id || item.company}`;

    add(prefix, ['role', 'focus', 'location', 'summary']);
    add_highlights(prefix, item.highlights?.length ?? 0);
    item.roles?.forEach((role) => {
      add(`${prefix}.roles.${role.id}`, ['label']);
      add_highlights(`${prefix}.roles.${role.id}`, role.highlights.length);
    });
  });

  return keys;
}

const overlay_modules = import.meta.glob<Record<string, unknown>>('../../data/translations/*.ts', { eager: true });

describe('language registry (config/locales.json)', () => {
  it('has unique codes and includes the default language', () => {
    const codes = registry.map((entry) => entry.code);

    expect(new Set(codes).size).toBe(codes.length);
    expect(codes).toContain(DEFAULT_LOCALE);
  });

  it('gives every registered language its UI strings file', () => {
    for (const entry of registry) {
      expect(() => readFileSync(join(ROOT, `locales/${entry.code}.json`), 'utf8'), `locales/${entry.code}.json`).not.toThrow();
    }
  });
});

describe('UI strings (locales/*.json)', () => {
  const english = read_ui(DEFAULT_LOCALE);

  for (const entry of registry.filter((item) => item.code != DEFAULT_LOCALE)) {
    it(`${entry.code}: only uses keys that exist in English, with matching {placeholders}`, () => {
      const translated = read_ui(entry.code);
      const unknown = [...translated.keys()].filter((key) => !english.has(key));
      const mismatched = [...translated].filter(([key, value]) => english.has(key) && placeholders(value) != placeholders(english.get(key) ?? ''));

      expect(unknown, 'keys not present in en.json').toEqual([]);
      expect(mismatched.map(([key]) => key), 'placeholder mismatch').toEqual([]);
    });
  }
});

describe('content overlays (data/translations/*.ts)', () => {
  const valid = valid_content_keys();

  for (const [path, module] of Object.entries(overlay_modules)) {
    const code = path.replace(/^.*\//, '').replace(/\.ts$/, '');

    it(`${code}: every key points at real content`, () => {
      const dictionary = (module.default ?? module[code]) as Record<string, string>;
      const orphans = Object.keys(dictionary).filter((key) => !valid.has(key));

      expect(orphans, 'keys that match no content in data/portfolio.ts').toEqual([]);
    });
  }
});
