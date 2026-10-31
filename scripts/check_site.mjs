#!/usr/bin/env node
// Checks that the live site answers and serves the files people rely on.
// Usage: node scripts/check_site.mjs [base_url]   (exit code 1 on any failure)
const base_url = (process.argv[2] ?? 'https://zhassulan.netlify.app').replace(/\/$/, '');
const TIMEOUT_MS = 15000;

// Each check: the path, an optional text the body must contain, and for PDFs
// the expected content type.
const CHECKS = [
  { path: '/', contains: 'Zhassulan' },
  { path: '/ru', contains: 'Жасулан' },
  { path: '/cv', contains: 'CV' },
  { path: '/blog', contains: 'Engineering notes' },
  { path: '/sitemap.xml', contains: '<urlset' },
  { path: '/cv.pdf', pdf: true },
  { path: '/files/Zhassulan-Serikuly-CV.pdf', pdf: true },
];

async function fetch_once(path) {
  const response = await fetch(`${base_url}${path}`, { signal: AbortSignal.timeout(TIMEOUT_MS), redirect: 'follow' });

  return response;
}

async function check({ path, contains, pdf }) {
  // One retry, so a single network hiccup doesn't raise a false alarm.
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch_once(path);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      if (pdf) {
        const bytes = Buffer.from(await response.arrayBuffer());

        if (!response.headers.get('content-type')?.includes('pdf') || bytes.length < 10000 || bytes.subarray(0, 5).toString() != '%PDF-') {
          throw new Error('not a valid PDF');
        }
      } else if (contains && !(await response.text()).includes(contains)) {
        throw new Error(`text "${contains}" not found`);
      }

      return null;
    } catch (error) {
      if (attempt == 2) {
        return `${path}: ${error.message}`;
      }
    }
  }

  return null;
}

const problems = (await Promise.all(CHECKS.map(check))).filter(Boolean);

if (problems.length) {
  console.error(`Problems on ${base_url}:`);
  problems.forEach((problem) => console.error(`  - ${problem}`));
  process.exit(1);
}

console.log(`${base_url} is up: ${CHECKS.length} checks passed.`);
