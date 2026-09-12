import type { ProofDocument } from '@/types/portfolio';

export type ProofKindFilter = 'All' | 'certificate' | 'recommendation';

export const useProofFilter = (documents: ProofDocument[]) => {
  const search_query = ref('');
  const active_kind = ref<ProofKindFilter>('All');

  const kinds: ProofKindFilter[] = ['All', 'certificate', 'recommendation'];

  const filtered_documents = computed(() => {
    const query = search_query.value.trim().toLowerCase();

    return documents.filter((document) => {
      const searchable_text = [
        document.title,
        document.issuer,
        document.description,
      ].join(' ').toLowerCase();

      const matches_search = !query || searchable_text.includes(query);
      const matches_kind = active_kind.value === 'All' || document.kind === active_kind.value;

      return matches_search && matches_kind;
    });
  });

  const reset_filters = () => {
    search_query.value = '';
    active_kind.value = 'All';
  };

  return {
    search_query,
    active_kind,
    kinds,
    filtered_documents,
    reset_filters,
  };
};
