#!/usr/bin/env node
// Runs Lighthouse on the main pages and fails when a median score is below its
// minimum. Usage: node scripts/check_lighthouse.mjs [base_url] [runs]
//
// Lighthouse is pinned to 13.x on purpose: @lhci/cli bundles 12.x, which uses a
// harsher mobile simulation and scores this site about 35 points lower.
import { execFileSync } from 'node:child_process';

const LIGHTHOUSE = 'lighthouse@13.6.0';
const MINIMUMS = { performance: 0.9, accessibility: 1, 'best-practices': 0.95, seo: 0.95 };
const PAGES = ['/', '/cv', '/blog', '/cases/one-shared-system-for-10-modules'];

const base_url = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');
const runs = Number(process.argv[3] ?? 3);

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];

function run_once(url) {
  const output = execFileSync('npx', [
    '-y', LIGHTHOUSE, url,
    '--quiet',
    '--chrome-flags=--headless=new --no-sandbox',
    `--only-categories=${Object.keys(MINIMUMS).join(',')}`,
    '--output=json',
    '--output-path=stdout',
  ], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const { categories } = JSON.parse(output);

  return Object.fromEntries(Object.keys(MINIMUMS).map((name) => [name, categories[name].score]));
}

const failures = [];
const rows = [];

for (const path of PAGES) {
  const results = Array.from({ length: runs }, () => run_once(`${base_url}${path}`));
  const row = { page: path };

  for (const [name, minimum] of Object.entries(MINIMUMS)) {
    const score = median(results.map((result) => result[name]));

    row[name] = Math.round(score * 100);

    if (score < minimum) {
      failures.push(`${path}: ${name} ${Math.round(score * 100)} < ${Math.round(minimum * 100)}`);
    }
  }

  rows.push(row);
}

console.table(rows);

if (failures.length) {
  console.error(`\n${failures.length} score(s) below the minimum (median of ${runs} runs):`);
  failures.forEach((message) => console.error(`  - ${message}`));
  process.exit(1);
}

console.log(`\nAll scores meet the minimums (median of ${runs} runs).`);
