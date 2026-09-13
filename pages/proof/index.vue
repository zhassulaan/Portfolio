<script setup lang='ts'>
import { proof_documents } from '@/data/portfolio';
import { useProofFilter } from '@/composables/use_proof_filter';
import ProofCard from '@/components/cards/proof_card/proof_card.vue';

const { t } = useI18n();

const {
  search_query,
  active_kind,
  kinds,
  filtered_documents,
  reset_filters,
} = useProofFilter(proof_documents);

const kind_label = (kind: string) => {
  if (kind === 'certificate') return t('proof_page.kind_certificates');
  if (kind === 'recommendation') return t('proof_page.kind_recommendations');

  return t('proof_page.kind_all');
};

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
});

useHead({
  title: () => t('nav.proof'),
  meta: [
    {
      name: 'description',
      content: computed(() => t('proof_page.intro')),
    },
  ],
});
</script>

<template>
  <main class='proof_page' id='main_content' tabindex='-1'>
    <section class='proof_page__hero wrap'>
      <div v-reveal class='proof_page__heading'>
        <NuxtLink class='proof_page__back' to='/'>
          <span aria-hidden='true'>←</span> {{ $t('proof_page.back_link') }}
        </NuxtLink>
        <p class='eyebrow'>{{ $t('proof_page.eyebrow') }}</p>
        <h1 class='proof_page__title' v-html="$t('proof_page.heading')"></h1>
      </div>

      <p v-reveal class='proof_page__intro'>
        {{ $t('proof_page.intro') }}
      </p>
    </section>

    <section class='proof_page__controls wrap' aria-label='Proof document filters'>
      <label class='proof_page__search'>
        <span>{{ $t('proof_page.search_label') }}</span>
        <input v-model='search_query'
          type='search'
          :placeholder="$t('proof_page.search_placeholder')" />
      </label>

      <label class='proof_page__select'>
        <span>{{ $t('proof_page.type_label') }}</span>
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
        {{ $t('proof_page.reset') }}
      </button>
    </section>

    <section class='proof_page__results wrap'>
      <div class='proof_page__result_meta' aria-live='polite'>
        <strong v-text='filtered_documents.length'></strong>
        <span v-text="filtered_documents.length === 1 ? $t('proof_page.result_singular') : $t('proof_page.result_plural')"></span>
      </div>

      <div class='proof_page__grid' v-if='filtered_documents.length'>
        <ProofCard v-for='document in filtered_documents'
          :key="`${document.kind}-${document.slug}`"
          :doc="document" />
      </div>

      <div class='proof_page__empty' v-else>
        <strong>{{ $t('proof_page.empty_title') }}</strong>
        <p>{{ $t('proof_page.empty_text') }}</p>
        <button class='button'
          type='button'
          v-on:click="reset_filters">
          {{ $t('proof_page.reset_filters') }}
        </button>
      </div>
    </section>
  </main>
</template>

<style src='./proof_page.css'></style>
