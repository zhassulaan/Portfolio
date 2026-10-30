<script setup lang='ts'>
import { portfolio_assets, signals, milestones, proof_items } from '@/data/portfolio';
import { skill_groups } from '@/data/skills';
import TagList from '@/components/ui/tag_list/tag_list.vue';
import Modal from '@/components/ui/modal/modal.vue';
import MilestoneCard from '@/components/cards/milestone/milestone_card.vue';
import MilestoneDetail from '@/components/cards/milestone/milestone_detail.vue';
// Imported explicitly because it's used as a dynamic :is value below.
import { NuxtLink } from '#components';
import { useAnalytics } from '@/composables/use_analytics';
import { useLocaleText } from '@/composables/use_locale_text';
import type { Milestone } from '@/types/portfolio';

const { t } = useI18n();
const { track } = useAnalytics();
const { tx } = useLocaleText();
const local_path = useLocalePath();

// Role details only open in the modal; the timeline card stays a short summary.
const active_milestone = ref<Milestone | null>(null);

function open_milestone_details(item: Milestone) {
  active_milestone.value = item;
}

function close_milestone_details() {
  active_milestone.value = null;
}

const active_milestone_title = computed(() => {
  if (!active_milestone.value) {
    return '';
  }

  const key = active_milestone.value.id || active_milestone.value.company;
  const role = tx(`milestones.${key}.role`, active_milestone.value.role);

  return `${active_milestone.value.company} — ${role}`;
});

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    // 'instant' because 'auto' follows the global smooth scroll and animates
    // from the old position.
    behavior: 'instant',
  });
});

useHead({
  title: () => t('nav.cv'),
  meta: [
    {
      name: 'description',
      content: computed(() => t('cv_page.intro')),
    },
  ],
});
</script>

<template>
  <main class='cv_page'
    id='main_content'
    tabindex='-1'>
    <section class='cv_page__hero wrap'>
      <div class='cv_page__heading' v-reveal>
        <NuxtLink class='cv_page__back' :to="local_path('/')">
          <span aria-hidden='true'>←</span> {{ $t('cv_page.back_link') }}
        </NuxtLink>
        <p class='eyebrow'>{{ $t('cv_page.eyebrow') }}</p>
        <h1 class='cv_page__title' v-html="$t('cv_page.title')"></h1>
        <p class='cv_page__intro'>
          {{ $t('cv_page.intro') }}
        </p>
      </div>

      <div class='cv_page__download' v-reveal>
        <a class='button cv_page__download_button'
          :href="portfolio_assets.cv"
          :aria-label="$t('cv_page.download_cv_aria')"
          download
          v-on:click="track('CV Download', { source: 'cv_page_top' })">
          {{ $t('cv_page.download_cv') }} <span aria-hidden='true'>↓</span>
        </a>
        <a class='cv_page__view_link'
          :href="portfolio_assets.cv"
          target='_blank'
          rel='noreferrer'
          v-on:click="track('CV Open', { source: 'cv_page_top' })">
          {{ $t('cv_page.open_new_tab') }} <span aria-hidden='true'>↗</span>
          <span class='sr_only'>{{ $t('cv_page.opens_new_tab_sr') }}</span>
        </a>
        <p class='cv_page__file_meta'>{{ $t('cv_page.file_meta') }}</p>
      </div>
    </section>

    <section class='cv_page__signals wrap' :aria-label="$t('cv_page.snapshot_aria')">
      <div class='cv_page__signal'
        v-for='(signal, index) in signals'
        :key="signal.label"
        v-reveal>
        <strong v-text="tx(`signals.${index}.value`, signal.value)"></strong>
        <span v-text="tx(`signals.${index}.label`, signal.label)"></span>
      </div>
    </section>

    <section class='cv_page__section wrap' v-reveal>
      <h2>{{ $t('cv_page.profile_heading') }}</h2>
      <p class='cv_page__profile_text'>{{ $t('cv_page.profile_text') }}</p>
      <p class='cv_page__profile_text'>{{ $t('cv_page.profile_text_2') }}</p>
    </section>

    <section class='cv_page__section wrap'>
      <h2>{{ $t('cv_page.achievements_heading') }}</h2>

      <ul class='cv_page__achievements'>
        <li class='cv_page__achievement' v-reveal>{{ $t('cv_page.achievement_1') }}</li>
        <li class='cv_page__achievement' v-reveal>{{ $t('cv_page.achievement_2') }}</li>
      </ul>
    </section>

    <section class='cv_page__section wrap'>
      <h2>{{ $t('cv_page.experience_heading') }}</h2>

      <div class='cv_page__timeline'>
        <MilestoneCard v-for='item in milestones'
          :key="item.id || item.company"
          :milestone='item'
          v-on:view-details='open_milestone_details' />
      </div>
    </section>

    <Modal :title='active_milestone_title'
      :open='!!active_milestone'
      :close_label="$t('cv_page.close_modal_aria')"
      v-on:close='close_milestone_details'>
      <MilestoneDetail v-if='active_milestone' :milestone='active_milestone' />
    </Modal>

    <section class='cv_page__section wrap'>
      <h2>{{ $t('cv_page.skills_heading') }}</h2>

      <div class='cv_page__skills'>
        <div class='cv_page__skill_group'
          v-for='group in skill_groups'
          :key="group.key"
          v-reveal>
          <h3>{{ $t('cv_page.skill_' + group.key) }}</h3>
          <TagList :items="group.items" />
        </div>
      </div>
    </section>

    <section class='cv_page__section wrap'>
      <h2>{{ $t('cv_page.education_heading') }}</h2>

      <div class='cv_page__proof_grid'>
        <component class='cv_page__proof_item'
          :is="item.href ? NuxtLink : 'article'"
          v-for='(item, index) in proof_items'
          :key="item.label"
          :to="item.href ? local_path(item.href) : undefined"
          v-reveal>
          <img v-if='item.logo'
            :src="item.logo"
            :alt="`${item.label} logo`"
            width='120'
            height='60'>
          <span v-text="tx(`proof_items.${index}.label`, item.label)"></span>
          <strong v-text="tx(`proof_items.${index}.value`, item.value)"></strong>
          <p v-text="tx(`proof_items.${index}.note`, item.note)"></p>
          <em v-if='item.href'>{{ $t('cv_page.open_proof') }} <span aria-hidden='true'>↗</span></em>
        </component>
      </div>

      <NuxtLink class='cv_page__proof_link' :to="local_path('/proof')">
        {{ $t('cv_page.view_all_proof') }} <span aria-hidden='true'>↗</span>
      </NuxtLink>
    </section>

    <section class='cv_page__cta wrap' v-reveal>
      <div>
        <h2>{{ $t('cv_page.want_file_heading') }}</h2>
        <p>{{ $t('cv_page.want_file_text') }}</p>
      </div>
      <a class='button cv_page__cta_button'
        :href="portfolio_assets.cv"
        :aria-label="$t('cv_page.download_cv_aria')"
        download
        v-on:click="track('CV Download', { source: 'cv_page_bottom' })">
        {{ $t('cv_page.download_cv') }} <span aria-hidden='true'>↓</span>
      </a>
    </section>
  </main>
</template>

<style src='./cv_page.css'></style>
