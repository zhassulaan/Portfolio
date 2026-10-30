import { describe, expect, it } from 'vitest';
import { useProofFilter } from '@/composables/use_proof_filter';
import type { ProofDocument } from '@/types/portfolio';

const documents: ProofDocument[] = [{
  slug: 'ielts',
  kind: 'certificate',
  title: 'IELTS Academic',
  issuer: 'British Council',
  date: '2023',
  description: 'English proficiency result.',
}, {
  slug: 'letter',
  kind: 'recommendation',
  title: 'Recommendation Letter',
  issuer: 'KeyHorse LLP',
  date: '2026',
  description: 'A signed recommendation.',
}];

describe('useProofFilter', () => {
  it('lists everything by default', () => {
    const { filtered_documents } = useProofFilter(documents);

    expect(filtered_documents.value).toHaveLength(2);
  });

  it('filters by kind', () => {
    const { active_kind, filtered_documents } = useProofFilter(documents);

    active_kind.value = 'certificate';
    expect(filtered_documents.value.map((item) => item.slug)).toEqual(['ielts']);
  });

  it('searches title, issuer and description', () => {
    const { search_query, filtered_documents } = useProofFilter(documents);

    search_query.value = 'keyhorse';
    expect(filtered_documents.value.map((item) => item.slug)).toEqual(['letter']);
  });

  it('reset_filters clears search and kind', () => {
    const { search_query, active_kind, filtered_documents, reset_filters } = useProofFilter(documents);

    search_query.value = 'zzz';
    active_kind.value = 'recommendation';
    reset_filters();

    expect(filtered_documents.value).toHaveLength(2);
  });
});
