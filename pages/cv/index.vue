<script setup lang='ts'>
import { portfolio_assets, signals, milestones, proof_items } from '@/data/portfolio';
import TagList from '@/components/ui/tag_list/tag_list.vue';
// Imported explicitly (rather than relying on Nuxt's compile-time
// auto-import) because it's used as a dynamic `:is` value below, which
// needs an actual component reference, not just the tag name — matching
// the pattern already used in trajectory_section.
import { NuxtLink } from '#components';
import { useLocaleText } from '@/composables/use_locale_text';

const { t } = useI18n();
const { tx } = useLocaleText();
const local_path = useLocalePath();

// Group labels are translated via cv_page.skill_* keys below; the items
// themselves are product/technology names and stay as-is in every locale.
const skill_groups: Array<{ key: string; label: string; items: string[] }> = [{
  key: 'frontend',
  label: 'Frontend',
  items: ['Vue.js 2/3', 'React', 'Nuxt.js', 'Next.js', 'TypeScript', 'JavaScript', 'Pinia', 'Vuex', 'Redux', 'HTML5', 'CSS3', 'Tailwind CSS', 'Mapbox GL JS']
}, {
  key: 'architecture',
  label: 'Architecture & Quality',
  items: ['Server-Side Rendering (SSR)', 'Design systems', 'Responsive UI', 'WCAG accessibility', 'Cross-browser compatibility', 'Progressive Web Apps (PWA)', 'BEM', 'Full-Stack Development', 'Object-Oriented Programming (OOP)']
}, {
  key: 'performance',
  label: 'Performance',
  items: ['Core Web Vitals (LCP, INP, CLS)', 'Code Splitting', 'Lazy Loading', 'Tree Shaking', 'Bundle Optimization', 'Technical SEO']
}, {
  key: 'testing',
  label: 'Testing',
  items: ['Vitest', 'Jest', 'Playwright', 'Unit Testing', 'E2E Testing']
}, {
  key: 'backend',
  label: 'Backend',
  items: ['Python', 'Django REST Framework', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'PL/SQL', 'Elasticsearch', 'REST APIs', 'WebSockets']
}, {
  key: 'mobile',
  label: 'Mobile',
  items: ['React Native', 'Ionic', 'Capacitor']
}, {
  key: 'tools',
  label: 'Tools & DevOps',
  items: ['Git', 'GitLab', 'Vite', 'Docker', 'CI/CD', 'ESLint', 'Stylelint', 'Sentry', 'Postman', 'Agile/Scrum', 'Kanban']
}];

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
  <main class='cv_page' id='main_content' tabindex='-1'>
    <section class='cv_page__hero wrap'>
      <div v-reveal class='cv_page__heading'>
        <NuxtLink class='cv_page__back' :to="local_path('/')">
          <span aria-hidden='true'>←</span> {{ $t('cv_page.back_link') }}
        </NuxtLink>
        <p class='eyebrow'>{{ $t('cv_page.eyebrow') }}</p>
        <h1 class='cv_page__title' v-html="$t('cv_page.title')"></h1>
        <p class='cv_page__intro'>
          {{ $t('cv_page.intro') }}
        </p>
      </div>

      <div v-reveal class='cv_page__download'>
        <a class='button cv_page__download_button'
          :href="portfolio_assets.cv"
          :aria-label="$t('cv_page.download_cv_aria')"
          download>
          {{ $t('cv_page.download_cv') }} <span aria-hidden='true'>↓</span>
        </a>
        <a class='cv_page__view_link'
          :href="portfolio_assets.cv"
          target='_blank'
          rel='noreferrer'>
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

    <section class='cv_page__section wrap'>
      <h2>{{ $t('cv_page.experience_heading') }}</h2>

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
          <p class='cv_page__timeline_role' v-text="tx(`milestones.${item.company}.role`, item.role)"></p>
          <p class='cv_page__timeline_focus' v-text="tx(`milestones.${item.company}.focus`, item.focus)"></p>
        </article>
      </div>
    </section>

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
          v-reveal
          :to="item.href ? local_path(item.href) : undefined">
          <img v-if='item.logo' :src="item.logo" :alt="`${item.label} logo`" />
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
        download>
        {{ $t('cv_page.download_cv') }} <span aria-hidden='true'>↓</span>
      </a>
    </section>
  </main>
</template>

<style src='./cv_page.css'></style>
