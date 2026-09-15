#!/usr/bin/env node
/**
 * Runs html-validate against every .vue SFC template (via the
 * html-validate-vue plugin, see .htmlvalidate.json's "transform") and any
 * standalone .html file in the project.
 *
 * Note on the config's rule overrides (see .htmlvalidate.json for the
 * comments-equivalent — JSON has no comments, so the reasoning lives here):
 *  - attr-quotes: 'any'         — this codebase intentionally mixes single
 *    quotes (static attrs) and double quotes (bound attrs containing a
 *    template literal), matching ESLint's own 'quotes' rule for <script>.
 *  - element-case / element-name — Vue SFC components are referenced in
 *    PascalCase (<SiteHeader>, <NuxtLink>, ...), which html-validate's
 *    HTML5-oriented defaults don't recognize as valid custom-element names
 *    (real custom elements need a hyphen). Both are relaxed to accept
 *    PascalCase alongside real lowercase HTML5 elements.
 *  - void-style: 'omit'         — matches the project's vue/html-self-closing
 *    ESLint config: void elements (<img>, <input>, <br>, ...) never get a
 *    trailing slash here.
 *  - empty-heading / wcag/h30 (off) — both are static-analysis false
 *    positives against v-text: `<h2 v-text='title'></h2>` renders real
 *    content at runtime, but html-validate can't see through the v-text
 *    binding at lint time and reports the element as empty.
 *  - prefer-native-element (off) — flags this codebase's deliberately
 *    custom-styled accessible dropdown (role=listbox / aria-expanded /
 *    aria-haspopup pattern in language_switcher.vue) for not being a plain
 *    <select>, which is by design here, not an oversight.
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const SKIP_DIRS = new Set(['node_modules', '.nuxt', '.output', 'dist', '.git']);

function findFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      findFiles(full, out);
    } else if (entry.endsWith('.html') || extname(entry) === '.vue') {
      out.push(full);
    }
  }
  return out;
}

const files = findFiles(process.cwd());

if (files.length === 0) {
  console.log('lint:html — no .html or .vue files found. Nothing to check.');
  process.exit(0);
}

try {
  execFileSync('npx', ['html-validate', ...files], { stdio: 'inherit' });
} catch (error) {
  process.exit(error.status ?? 1);
}
