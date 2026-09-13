<script setup lang='ts'>
import { proof_documents } from '@/data/portfolio';
import type { ProofDocument } from '@/types/portfolio';
import { useLocaleText } from '@/composables/use_locale_text';

const props = defineProps<{ kind: ProofDocument['kind']; slug: string }>();
const { t } = useI18n();
const { tx } = useLocaleText();
const local_path = useLocalePath();

const proof_document = proof_documents.find(
  (item) => item.kind === props.kind && item.slug === props.slug,
);

if (!proof_document) {
  throw createError({ statusCode: 404, statusMessage: 'Document not found' });
}

const title = computed(() => tx(`proof_documents.${proof_document.slug}.title`, proof_document.title));
const description = computed(() => tx(`proof_documents.${proof_document.slug}.description`, proof_document.description));

useHead({
  title,
  meta: [{ name: 'description', content: description }],
});

const kind_label = computed(() =>
  props.kind === 'certificate' ? t('proof_detail.certificate_label') : t('proof_detail.recommendation_label'),
);
</script>

<template>
  <main class='proof_detail wrap' id='main_content' tabindex='-1'>
    <NuxtLink class='proof_detail__back' :to="local_path('/proof')">
      <span aria-hidden='true'>←</span> {{ $t('proof_detail.back_link') }}
    </NuxtLink>

    <p class='eyebrow' v-text='kind_label'></p>
    <h1 class='proof_detail__title' v-text='title'></h1>

    <p class='proof_detail__meta'>
      <span v-text='proof_document.issuer'></span>
      <span aria-hidden='true' v-text="' · '"></span>
      <span v-text='proof_document.date'></span>
    </p>

    <p class='proof_detail__description' v-text='description'></p>

    <div class='proof_detail__viewer' v-if='proof_document.file'>
      <img v-if="proof_document.file_type !== 'pdf'"
        :src='proof_document.file'
        :alt="`${title} scan`"
      />
      <iframe v-else
        :src='proof_document.file'
        :title='title'
      ></iframe>

      <a class='button proof_detail__open'
        :href='proof_document.file'
        target='_blank'
        rel='noreferrer'>
        {{ $t('proof_detail.open_full_document') }} <span aria-hidden='true'>↗</span>
        <span class='sr_only'>{{ $t('proof_detail.opens_new_tab_sr') }}</span>
      </a>
    </div>

    <div class='proof_detail__placeholder' v-else>
      <strong>{{ $t('proof_detail.placeholder_title') }}</strong>
      <p>{{ $t('proof_detail.placeholder_text') }}</p>
    </div>
  </main>
</template>

<style src='./proof_detail_section.css'></style>
