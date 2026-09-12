<script setup lang='ts'>
import { portfolio_assets, signals, milestones, proof_items } from '@/data/portfolio';
import TagList from '@/components/ui/tag_list/tag_list.vue';
// Imported explicitly (rather than relying on Nuxt's compile-time
// auto-import) because it's used as a dynamic `:is` value below, which
// needs an actual component reference, not just the tag name — matching
// the pattern already used in trajectory_section.
import { NuxtLink } from '#components';

const skill_groups: Array<{ label: string; items: string[] }> = [
  { label: 'Frontend', items: ['Vue 2/3', 'React', 'Nuxt', 'Next.js', 'TypeScript', 'JavaScript', 'Pinia', 'Vuex', 'Redux', 'HTML5', 'CSS3', 'Tailwind', 'Mapbox GL JS'] },
  { label: 'Architecture & quality', items: ['SSR', 'Design systems', 'WCAG accessibility', 'Core Web Vitals', 'Cross-browser compatibility', 'PWA', 'BEM'] },
  { label: 'Testing', items: ['Vitest', 'Jest', 'Playwright'] },
  { label: 'Backend', items: ['Python', 'Django REST Framework', 'PostgreSQL', 'Elasticsearch', 'REST APIs', 'WebSockets'] },
  { label: 'Tools & DevOps', items: ['Git', 'GitLab', 'Vite', 'Docker', 'CI/CD', 'ESLint', 'Stylelint', 'Sentry', 'Agile/Scrum'] },
];

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    // 'instant', not 'auto' — 'auto' defers to the global smooth
    // scroll-behavior on <html> and visibly animates from wherever the
    // previous page was scrolled to.
    behavior: 'instant',
  });
});

useHead({
  title: 'CV',
  meta: [
    {
      name: 'description',
      content: 'The CV of Zhassulan Serikuly — Senior Software Engineer — as a downloadable PDF, alongside the same experience, skills and proof shown on the notebook itself.',
    },
  ],
});
</script>

<template>
  <main class='cv_page' id='main_content' tabindex='-1'>
    <section class='cv_page__hero wrap'>
      <div v-reveal class='cv_page__heading'>
        <NuxtLink class='cv_page__back' to='/'>
          <span aria-hidden='true'>←</span> Engineering notebook
        </NuxtLink>
        <p class='eyebrow'>Curriculum vitae</p>
        <h1 class='cv_page__title'>
          Everything on this page,<br />
          as one PDF.
        </h1>
        <p class='cv_page__intro'>
          The same experience, skills and proof as the rest of this notebook,
          laid out as a single document — for applicant tracking systems,
          email attachments, or printing.
        </p>
      </div>

      <div v-reveal class='cv_page__download'>
        <a class='button cv_page__download_button'
          :href="portfolio_assets.cv"
          aria-label='Download CV as PDF'
          download>
          Download CV <span aria-hidden='true'>↓</span>
        </a>
        <a class='cv_page__view_link'
          :href="portfolio_assets.cv"
          target='_blank'
          rel='noreferrer'>
          Open in a new tab <span aria-hidden='true'>↗</span>
          <span class='sr_only'>(opens in a new tab)</span>
        </a>
        <p class='cv_page__file_meta'>PDF · updated for 2026</p>
      </div>
    </section>

    <section class='cv_page__signals wrap' aria-label='Career snapshot'>
      <div class='cv_page__signal'
        v-for='signal in signals'
        :key="signal.label"
        v-reveal>
        <strong v-text='signal.value'></strong>
        <span v-text='signal.label'></span>
      </div>
    </section>

    <section class='cv_page__section wrap'>
      <h2>Experience</h2>

      <div class='cv_page__timeline'>
        <article class='cv_page__timeline_item'
          v-for='item in milestones'
          :key="item.company"
          v-reveal>
          <div class='cv_page__timeline_head'>
            <img :src="item.logo" :alt="`${item.company} logo`" />
            <div>
              <h3 v-text='item.company'></h3>
              <small v-text='item.period'></small>
            </div>
          </div>
          <p class='cv_page__timeline_role' v-text='item.role'></p>
          <p class='cv_page__timeline_focus' v-text='item.focus'></p>
        </article>
      </div>
    </section>

    <section class='cv_page__section wrap'>
      <h2>Skills</h2>

      <div class='cv_page__skills'>
        <div class='cv_page__skill_group'
          v-for='group in skill_groups'
          :key="group.label"
          v-reveal>
          <h3 v-text='group.label'></h3>
          <TagList :items="group.items" />
        </div>
      </div>
    </section>

    <section class='cv_page__section wrap'>
      <h2>Education, certifications &amp; proof</h2>

      <div class='cv_page__proof_grid'>
        <component class='cv_page__proof_item'
          :is="item.href ? NuxtLink : 'article'"
          v-for='item in proof_items'
          :key="item.label"
          v-reveal
          :to="item.href">
          <img v-if='item.logo' :src="item.logo" :alt="`${item.label} logo`" />
          <span v-text='item.label'></span>
          <strong v-text='item.value'></strong>
          <p v-text='item.note'></p>
          <em v-if='item.href'>Open proof <span aria-hidden='true'>↗</span></em>
        </component>
      </div>

      <NuxtLink class='cv_page__proof_link' to='/proof'>
        View all certificates &amp; recommendations <span aria-hidden='true'>↗</span>
      </NuxtLink>
    </section>

    <section class='cv_page__cta wrap' v-reveal>
      <div>
        <h2>Want it as a file?</h2>
        <p>Same content, one PDF — ready for an application or an inbox.</p>
      </div>
      <a class='button cv_page__cta_button'
        :href="portfolio_assets.cv"
        aria-label='Download CV as PDF'
        download>
        Download CV <span aria-hidden='true'>↓</span>
      </a>
    </section>
  </main>
</template>

<style src='./cv_page.css'></style>
