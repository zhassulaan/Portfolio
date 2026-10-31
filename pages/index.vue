<script setup lang='ts'>
import HeroSection from '@/components/sections/hero_section/hero_section.vue';
import SignalSection from '@/components/sections/signal_section/signal_section.vue';
import CaseStudiesSection from '@/components/sections/case_studies_section/case_studies_section.vue';
import SelectedProjectsSection from '@/components/sections/selected_projects_section/selected_projects_section.vue';
import WorkSection from '@/components/sections/work_section/work_section.vue';
import PrinciplesSection from '@/components/sections/principles_section/principles_section.vue';
import TrajectorySection from '@/components/sections/trajectory_section/trajectory_section.vue';
import HireSection from '@/components/sections/hire_section/hire_section.vue';
import ContactSection from '@/components/sections/contact_section/contact_section.vue';

const { t } = useI18n();

// The home page names the role in the title, which Google and link previews show.
const home_title = computed(() => t('site.home_title'));
const description = computed(() => t('site.description'));

useHead({
  title: home_title,
  titleTemplate: '%s',
});

useSeoMeta({
  ogTitle: home_title,
  twitterTitle: home_title,
  ogDescription: description,
  twitterDescription: description,
});
</script>

<template>
  <main class='site_shell__main'
    id='main_content'
    tabindex='-1'>
    <HeroSection />
    <SignalSection />
    <CaseStudiesSection />
    <SelectedProjectsSection />
    <WorkSection />
    <PrinciplesSection />
    <TrajectorySection />
    <HireSection />
    <ContactSection />
  </main>
</template>
