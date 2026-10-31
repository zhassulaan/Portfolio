<script setup lang='ts'>
import { case_studies } from '@/data/portfolio';
import CaseStudyCard from '@/components/cards/case_study_card/case_study_card.vue';
import { useLocaleText } from '@/composables/use_locale_text';

const route = useRoute();
const { tx } = useLocaleText();
const local_path = useLocalePath();

const position = case_studies.findIndex((item) => item.slug == route.params.slug);

if (position < 0) {
  throw createError({ statusCode: 404, statusMessage: 'Case not found' });
}

const case_study = case_studies[position];
const previous = case_studies[position - 1];
const next = case_studies[position + 1];

const title = computed(() => tx(`case_studies.${case_study.index}.title`, case_study.title));
const description = computed(() => tx(`case_studies.${case_study.index}.result`, case_study.result));

useHead({
  title,
  meta: [{ name: 'description', content: description }],
});

useSeoMeta({
  ogTitle: title,
  twitterTitle: title,
  ogDescription: description,
  twitterDescription: description,
});

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
});
</script>

<template>
  <main class='case_page wrap'
    id='main_content'
    tabindex='-1'>
    <NuxtLink class='case_page__back' :to="local_path('/#cases')">
      <span aria-hidden='true'>←</span> {{ $t('case_studies.back_to_cases') }}
    </NuxtLink>

    <CaseStudyCard :case_study='case_study' :standalone='true' />

    <nav class='case_page__nav' :aria-label="$t('case_studies.nav_aria')">
      <NuxtLink class='case_page__link'
        v-if='previous'
        :to="local_path(`/cases/${previous.slug}`)">
        <small>← {{ $t('case_studies.previous_case') }}</small>
        <span>{{ tx(`case_studies.${previous.index}.title`, previous.title) }}</span>
      </NuxtLink>
      <NuxtLink class='case_page__link case_page__link--next'
        v-if='next'
        :to="local_path(`/cases/${next.slug}`)">
        <small>{{ $t('case_studies.next_case') }} →</small>
        <span>{{ tx(`case_studies.${next.index}.title`, next.title) }}</span>
      </NuxtLink>
    </nav>

    <div class='case_page__cta'>
      <p>{{ $t('contact.heading') }}</p>
      <NuxtLink class='button' :to="local_path('/#hire')">
        {{ $t('hire.cta_book') }} <span aria-hidden='true'>↗</span>
      </NuxtLink>
    </div>
  </main>
</template>

<style src='./case_page.css'></style>
