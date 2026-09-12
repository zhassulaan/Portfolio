<script setup lang='ts'>
import { proof_documents } from '@/data/portfolio';
import type { ProofDocument } from '@/types/portfolio';

const props = defineProps<{ kind: ProofDocument['kind']; slug: string }>();

const proof_document = proof_documents.find(
  (item) => item.kind === props.kind && item.slug === props.slug,
);

if (!proof_document) {
  throw createError({ statusCode: 404, statusMessage: 'Document not found' });
}

useHead({
  title: proof_document.title,
  meta: [{ name: 'description', content: proof_document.description }],
});

const kind_label = props.kind === 'certificate' ? 'Certificate' : 'Recommendation letter';
</script>

<template>
  <main class='proof_detail wrap' id='main_content' tabindex='-1'>
    <NuxtLink class='proof_detail__back' to='/proof'>
      ← All proof documents
    </NuxtLink>

    <p class='eyebrow' v-text='kind_label'></p>
    <h1 class='proof_detail__title' v-text='proof_document.title'></h1>

    <p class='proof_detail__meta'>
      <span v-text='proof_document.issuer'></span>
      <span aria-hidden='true' v-text="' · '"></span>
      <span v-text='proof_document.date'></span>
    </p>

    <p class='proof_detail__description' v-text='proof_document.description'></p>

    <div class='proof_detail__viewer' v-if='proof_document.file'>
      <img v-if="proof_document.file_type !== 'pdf'"
        :src='proof_document.file'
        :alt="`${proof_document.title} scan`"
      />
      <iframe v-else
        :src='proof_document.file'
        :title='proof_document.title'
      ></iframe>

      <a class='button proof_detail__open'
        :href='proof_document.file'
        target='_blank'
        rel='noreferrer'>
        Open full document ↗
      </a>
    </div>

    <div class='proof_detail__placeholder' v-else>
      <strong>Scan not uploaded yet.</strong>
      <p>
        This entry is set up but the original file hasn't been attached to the
        site yet — see <code>PROOF_GUIDE.md</code> for how to add it.
      </p>
    </div>
  </main>
</template>

<style src='./proof_detail_section.css'></style>
