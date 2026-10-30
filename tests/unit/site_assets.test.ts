// @vitest-environment node
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { portfolio_assets, proof_documents } from '../../data/portfolio';

const PUBLIC_DIR = join(__dirname, '../../public');

describe('files the site links to', () => {
  it('the CV download exists, is a real PDF and is not empty', () => {
    const path = join(PUBLIC_DIR, portfolio_assets.cv);

    expect(existsSync(path), portfolio_assets.cv).toBe(true);
    expect(statSync(path).size).toBeGreaterThan(10_000);
    expect(readFileSync(path).subarray(0, 5).toString()).toBe('%PDF-');
  });

  it('every proof document with a file points at a file that exists', () => {
    for (const document of proof_documents.filter((item) => item.file)) {
      expect(existsSync(join(PUBLIC_DIR, document.file ?? '')), document.file).toBe(true);
    }
  });

  it('the stable /cv.pdf redirect targets the same file as the CV button', () => {
    const redirects = readFileSync(join(PUBLIC_DIR, '_redirects'), 'utf8');

    expect(redirects).toContain(`/cv.pdf ${portfolio_assets.cv}`);
  });
});
