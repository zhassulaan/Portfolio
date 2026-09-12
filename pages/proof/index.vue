<script setup lang='ts'>
import { proof_documents } from '@/data/portfolio';
import { useProofFilter } from '@/composables/use_proof_filter';
import ProofCard from '@/components/cards/proof_card/proof_card.vue';

const {
  search_query,
  active_kind,
  kinds,
  filtered_documents,
  reset_filters,
} = useProofFilter(proof_documents);

const kind_label = (kind: string) => {
  if (kind === 'certificate') return 'Certificates';
  if (kind === 'recommendation') return 'Recommendations';

  return 'All';
};

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  });
});

useHead({
  title: 'Proof',
  meta: [
    {
      name: 'description',
      content: 'Certificates and recommendation letters for Zhassulan Serikuly — verifiable proof kept separate from the engineering story.',
    },
  ],
});
</script>

<template>
  <main class='proof_page' id='main_content' tabindex='-1'>
    <section class='proof_page__hero wrap'>
      <div v-reveal class='proof_page__heading'>
        <NuxtLink class='proof_page__back' to='/'>
          ← Engineering notebook
        </NuxtLink>
        <p class='eyebrow'>Proof archive</p>
        <h1 class='proof_page__title'>
          Certificates and<br />
          recommendations.
        </h1>
      </div>

      <p v-reveal class='proof_page__intro'>
        Education, language evidence, competition recognition and signed
        recommendations — the verifiable record behind the engineering story.
      </p>
    </section>

    <section class='proof_page__controls wrap' aria-label='Proof document filters'>
      <label class='proof_page__search'>
        <span>Search</span>
        <input v-model='search_query'
          type='search'
          placeholder='Try “IELTS”, “KeyHorse”…'
        />
      </label>

      <label class='proof_page__select'>
        <span>Type</span>
        <select v-model='active_kind'>
          <option v-for='kind in kinds'
            :key="kind"
            :value="kind"
            v-text='kind_label(kind)'></option>
        </select>
      </label>

      <button class='proof_page__reset'
        type='button'
        v-on:click="reset_filters">
        Reset
      </button>
    </section>

    <section class='proof_page__results wrap'>
      <div class='proof_page__result_meta'>
        <strong v-text='filtered_documents.length'></strong>
        <span v-text="filtered_documents.length === 1 ? 'document' : 'documents'"></span>
      </div>

      <div class='proof_page__grid' v-if='filtered_documents.length'>
        <ProofCard v-for='document in filtered_documents'
          :key="`${document.kind}-${document.slug}`"
          :doc="document"
        />
      </div>

      <div v-else class='proof_page__empty'>
        <strong>No matching documents.</strong>
        <p>Try a broader search or reset the filters.</p>
        <button class='button'
          type='button'
          v-on:click="reset_filters">
          Reset filters
        </button>
      </div>
    </section>
  </main>
</template>

<style src='./proof_page.css'></style>
