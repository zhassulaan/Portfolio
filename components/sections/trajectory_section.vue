<script setup lang="ts">
import { milestones, proof_items } from '@/data/portfolio';
</script>

<template>
  <section id="path" class="trajectory_section section wrap">
    <div class="section_heading">
      <div>
        <p class="eyebrow">Engineering path</p>
        <h2>A progression of scope,<br />not a second résumé.</h2>
      </div>
      <p>The chronology is deliberately compressed. The interesting part is how the work changed: UI → delivery → systems → technical ownership.</p>
    </div>

    <div class="trajectory_section__companies">
      <article v-for="(item, index) in milestones" :key="item.company" v-reveal class="trajectory_section__company">
        <div class="trajectory_section__company_head">
          <span>0{{ index + 1 }}</span>
          <img :src="item.logo" :alt="`${item.company} logo`" />
        </div>
        <div class="trajectory_section__company_body">
          <small>{{ item.period }}</small>
          <h3>{{ item.role }}</h3>
          <p>{{ item.focus }}</p>
        </div>
      </article>
    </div>

    <div class="trajectory_section__proof">
      <div v-reveal class="trajectory_section__proof_intro">
        <p class="eyebrow">Proof, not decoration</p>
        <h3>Things that can be checked.</h3>
        <p>Education, language evidence, competition recognition and a signed recommendation — kept separate from the engineering story.</p>
      </div>
      <div class="trajectory_section__proof_grid">
        <component
          :is="item.href ? 'a' : 'article'"
          v-for="item in proof_items"
          :key="item.label"
          v-reveal
          class="trajectory_section__proof_item"
          :href="item.href"
          :target="item.href ? '_blank' : undefined"
        >
          <img v-if="item.logo" :src="item.logo" :alt="`${item.label} logo`" />
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <p>{{ item.note }}</p>
          <em v-if="item.href">Open proof ↗</em>
        </component>
      </div>
    </div>
  </section>
</template>

<style src="@/assets/css/components/trajectory_section.css"></style>
