<script setup lang='ts'>
import { milestones, proof_items } from '@/data/portfolio';
import { NuxtLink } from '#components';
</script>

<template>
  <section class='trajectory_section section wrap' id='path'>
    <div class='section_heading'>
      <div>
        <p class='eyebrow'>Engineering path</p>
        <h2>A progression of scope,<br />not a second résumé.</h2>
      </div>
      <p>The chronology is deliberately compressed. The interesting part is how the work changed: UI → delivery → systems → technical ownership.</p>
    </div>

    <div class='trajectory_section__companies'>
      <article class='trajectory_section__company'
        v-for='(item, index) in milestones'
        :key="item.company"
        v-reveal>
        <div class='trajectory_section__company_head'>
          <span v-text='`0${index + 1}`'></span>
          <img :src="item.logo" :alt="`${item.company} logo`" />
        </div>

        <div class='trajectory_section__company_body'>
          <small v-text='item.period'></small>
          <h3 v-text='item.role'></h3>
          <p v-text='item.focus'></p>
        </div>
      </article>
    </div>

    <div class='trajectory_section__proof'>
      <div class='trajectory_section__proof_intro' v-reveal>
        <p class='eyebrow'>Proof, not decoration</p>
        <h3>Things that can be checked.</h3>
        <p>Education, language evidence, competition recognition and a signed recommendation — kept separate from the engineering story.</p>
        <NuxtLink class='trajectory_section__proof_link' to='/proof'>
          View all certificates &amp; recommendations <span aria-hidden='true'>↗</span>
        </NuxtLink>
      </div>

      <div class='trajectory_section__proof_grid'>
        <component class='trajectory_section__proof_item'
          :is="item.href ? NuxtLink : 'article'"
          v-for='item in proof_items'
          :key="item.label"
          v-reveal
          :to="item.href"
        >
          <img v-if='item.logo'
            :src="item.logo"
            :alt="`${item.label} logo`"
          />
          <span v-text='item.label'></span>
          <strong v-text='item.value'></strong>
          <p v-text='item.note'></p>
          <em v-if='item.href'>Open proof <span aria-hidden='true'>↗</span></em>
        </component>
      </div>
    </div>
  </section>
</template>

<style src='./trajectory_section.css'></style>
