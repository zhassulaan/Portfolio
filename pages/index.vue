<script setup lang='ts'>
import HeroSection from '@/components/sections/hero_section/hero_section.vue';
import SignalSection from '@/components/sections/signal_section/signal_section.vue';
import CaseStudiesSection from '@/components/sections/case_studies_section/case_studies_section.vue';
import SelectedProjectsSection from '@/components/sections/selected_projects_section/selected_projects_section.vue';
import WorkSection from '@/components/sections/work_section/work_section.vue';
import PrinciplesSection from '@/components/sections/principles_section/principles_section.vue';
import TrajectorySection from '@/components/sections/trajectory_section/trajectory_section.vue';
import ContactSection from '@/components/sections/contact_section/contact_section.vue';

useHead({
  title: 'Engineering Notebook',
  meta: [{
    property: 'og:title',
    content: 'Zhassulan Serikuly — Engineering Notebook'
  }, {
    property: 'og:description',
    content: 'A portfolio about engineering decisions and measurable outcomes rather than a duplicate résumé.'
  }],
});
</script>

<template>
  <main class='site_shell__main' id='top'>
    <HeroSection />
    <SignalSection />
    <CaseStudiesSection />
    <SelectedProjectsSection />
    <WorkSection />
    <PrinciplesSection />
    <TrajectorySection />
    <ContactSection />
  </main>
</template>
