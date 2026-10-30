#!/usr/bin/env node
// Language tooling.
//
//   node scripts/i18n.mjs check [--min <percent>]
//     Prints coverage per language. Fails on keys that don't exist in English,
//     mismatched {placeholders}, missing files, and (with --min) published
//     languages below that UI coverage.
//
//   node scripts/i18n.mjs add <code> "<native name>" [bcp47-tag] [--publish]
//     Creates locales/<code>.json and data/translations/<code>.ts and adds the
//     language to config/locales.json as `published: false` unless --publish.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY_PATH = join(ROOT, 'config/locales.json');
const DEFAULT_LOCALE = 'en';
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

const read_json = (path) => JSON.parse(readFileSync(path, 'utf8'));

function flatten(object, prefix = '') {
  return Object.entries(object).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    return value && typeof value == 'object' ? flatten(value, path) : [[path, String(value)]];
  });
}

// One entry per line, like the hand-written file.
const format_entry = (entry) => `{ ${Object.entries(entry).map(([key, value]) => `"${key}": ${JSON.stringify(value)}`).join(', ')} }`;
const format_registry = (registry) => `[\n${registry.map((entry) => `  ${format_entry(entry)}`).join(',\n')}\n]\n`;

const placeholders = (text) => (text.match(/\{[a-z_]+\}/gi) ?? []).sort().join(',');

// Overlays are TypeScript and only their keys matter, so read them with a regex.
function overlay_keys(code) {
  const path = join(ROOT, `data/translations/${code}.ts`);

  if (!existsSync(path)) {
    return null;
  }

  return Array.from(readFileSync(path, 'utf8').matchAll(/^\s*'([^']+)':/gm), (match) => match[1]);
}

function check(min_coverage) {
  const registry = read_json(REGISTRY_PATH);
  const english = new Map(flatten(read_json(join(ROOT, `locales/${DEFAULT_LOCALE}.json`))));
  const overlay_union = new Set(registry.flatMap((entry) => overlay_keys(entry.code) ?? []));
  const errors = [];
  const rows = [];

  for (const entry of registry) {
    const ui_path = join(ROOT, `locales/${entry.code}.json`);

    if (!existsSync(ui_path)) {
      errors.push(`${entry.code}: locales/${entry.code}.json is missing`);
      continue;
    }

    const ui = new Map(flatten(read_json(ui_path)));
    let translated = 0;

    for (const [key, value] of ui) {
      if (!english.has(key)) {
        errors.push(`${entry.code}: "${key}" does not exist in ${DEFAULT_LOCALE}.json (typo or removed key)`);
        continue;
      }

      if (entry.code != DEFAULT_LOCALE && placeholders(value) != placeholders(english.get(key))) {
        errors.push(`${entry.code}: "${key}" has different {placeholders} than English`);
      }

      translated += 1;
    }

    const ui_percent = Math.round((translated / english.size) * 100);
    const keys = overlay_keys(entry.code);
    const overlay_percent = entry.code == DEFAULT_LOCALE
      ? 100
      : keys ? Math.round((keys.filter((key) => overlay_union.has(key)).length / overlay_union.size) * 100) : 0;

    if (min_coverage != null && entry.published !== false && ui_percent < min_coverage) {
      errors.push(`${entry.code}: UI strings ${ui_percent}% < required ${min_coverage}%`);
    }

    rows.push({
      code: entry.code,
      name: entry.name,
      published: entry.published !== false ? 'yes' : 'draft',
      'ui %': ui_percent,
      'content %': overlay_percent,
    });
  }

  console.table(rows);

  if (errors.length) {
    console.error(`\n${errors.length} problem(s):`);
    errors.forEach((message) => console.error(`  - ${message}`));
    process.exit(1);
  }

  console.log('\nAll language files are consistent.');
}

function add(code, name, tag, publish) {
  if (!/^[a-z]{2,3}(-[A-Za-z0-9]+)?$/.test(code ?? '') || !name) {
    console.error('Usage: node scripts/i18n.mjs add <code> "<native name>" [bcp47-tag] [--publish]');
    process.exit(1);
  }

  const registry = read_json(REGISTRY_PATH);

  if (registry.some((entry) => entry.code == code)) {
    console.error(`Language "${code}" is already registered.`);
    process.exit(1);
  }

  const entry = { code, language: tag || code, name };

  if (RTL_LANGUAGES.includes(code.split('-')[0])) {
    entry.dir = 'rtl';
  }

  if (!publish) {
    entry.published = false;
  }

  registry.push(entry);
  writeFileSync(REGISTRY_PATH, format_registry(registry));

  const ui_path = join(ROOT, `locales/${code}.json`);
  const overlay_path = join(ROOT, `data/translations/${code}.ts`);

  if (!existsSync(ui_path)) {
    writeFileSync(ui_path, '{}\n');
  }

  if (!existsSync(overlay_path)) {
    writeFileSync(overlay_path, `// Content overlay for ${name} (${code}). Same keys as data/translations/ru.ts;\n// anything missing falls back to the English text in data/portfolio.ts.\nconst ${code.replace(/\W/g, '_')}: Record<string, string> = {};\n\nexport default ${code.replace(/\W/g, '_')};\n`);
  }

  console.log(`Added ${name} (${code}).`);
  console.log(`  1. Fill locales/${code}.json (copy keys from locales/en.json; missing keys fall back to English).`);
  console.log(`  2. Optionally fill data/translations/${code}.ts.`);
  console.log(`  3. Run: npm run i18n:check`);
  console.log(publish ? '  Published.' : `  4. When ready, remove "published": false from config/locales.json.`);
}

const [command, ...args] = process.argv.slice(2);
const positional = args.filter((arg) => !arg.startsWith('--'));

if (command == 'check') {
  const min_index = args.indexOf('--min');

  check(min_index >= 0 ? Number(args[min_index + 1]) : null);
} else if (command == 'add') {
  add(positional[0], positional[1], positional[2], args.includes('--publish'));
} else {
  console.error('Usage: node scripts/i18n.mjs <check|add> …');
  process.exit(1);
}
