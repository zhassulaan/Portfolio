<script setup lang='ts'>
import { milestones, proof_items } from '@/data/portfolio';
import { NuxtLink } from '#components';
import { useLocaleText } from '@/composables/use_locale_text';

const { tx } = useLocaleText();
const local_path = useLocalePath();
</script>

<template>
  <section class='trajectory_section section wrap' id='path'>
    <div class='section_heading'>
      <div>
        <p class='eyebrow'>{{ $t('trajectory.eyebrow') }}</p>
        <h2 v-html="$t('trajectory.heading')"></h2>
      </div>
      <p>{{ $t('trajectory.intro') }}</p>
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
          <h3 v-text="tx(`milestones.${item.company}.role`, item.role)"></h3>
          <p v-text="tx(`milestones.${item.company}.focus`, item.focus)"></p>
        </div>
      </article>
    </div>

    <div class='trajectory_section__proof'>
      <div class='trajectory_section__proof_intro' v-reveal>
        <p class='eyebrow'>{{ $t('trajectory.proof_eyebrow') }}</p>
        <h3>{{ $t('trajectory.proof_heading') }}</h3>
        <p>{{ $t('trajectory.proof_intro') }}</p>
        <NuxtLink class='trajectory_section__proof_link' :to="local_path('/proof')">
          {{ $t('trajectory.proof_link') }} <span aria-hidden='true'>↗</span>
        </NuxtLink>
      </div>

      <div class='trajectory_section__proof_grid'>
        <component class='trajectory_section__proof_item'
          :is="item.href ? NuxtLink : 'article'"
          v-for='(item, index) in proof_items'
          :key="item.label"
          v-reveal
          :to="item.href ? local_path(item.href) : undefined"
        >
          <img v-if='item.logo'
            :src="item.logo"
            :alt="`${item.label} logo`"
          />
          <span v-text="tx(`proof_items.${index}.label`, item.label)"></span>
          <strong v-text="tx(`proof_items.${index}.value`, item.value)"></strong>
          <p v-text="tx(`proof_items.${index}.note`, item.note)"></p>
          <em v-if='item.href'>{{ $t('trajectory.open_proof') }} <span aria-hidden='true'>↗</span></em>
        </component>
      </div>
    </div>
  </section>
</template>

<style src='./trajectory_section.css'></style>
