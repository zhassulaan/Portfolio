#!/usr/bin/env node
/**
 * Runs html-validate on every .vue template (through html-validate-vue) and on
 * any .html file in the project.
 *
 * Rule overrides, with reasons (.htmlvalidate.json can't hold comments):
 *  - attr-quotes 'any': single quotes for static attributes, double for bound ones.
 *  - element-case / element-name: allow PascalCase components like <SiteHeader>.
 *  - void-style 'omit': void elements have no trailing slash.
 *  - empty-heading, wcag/h30, text-content (off): false positives, because
 *    v-text content is invisible to the linter.
 *  - prefer-native-element (off): language_switcher.vue is a custom listbox on purpose.
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
