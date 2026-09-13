<script setup lang='ts'>
import { portfolio_assets } from '@/data/portfolio';
</script>

<template>
  <section class='hero_section wrap'>
    <div class='hero_section__copy' v-reveal>
      <p class='hero_section__status'>
        <span></span>
        {{ $t('hero.status') }}
      </p>

      <h1 class='hero_section__title' v-html="$t('hero.title')"></h1>

      <p class='hero_section__lead'>
        {{ $t('hero.lead') }}
      </p>

      <div class='hero_section__actions'>
        <a class='button' href='#cases'>
          {{ $t('hero.cta_open_notebook') }} <span aria-hidden='true'>↓</span>
        </a>
        <NuxtLink class='button button--ghost'
          to='/cv'
          :aria-label="$t('hero.cta_cv_aria')">
          {{ $t('hero.cta_cv') }}
        </NuxtLink>
      </div>

      <div class='hero_section__socials' aria-label='Social links'>
        <a class='hero_section__social_link'
          href='https://www.linkedin.com/in/zhassulan-serikuly'
          target='_blank'
          rel='noreferrer'>
          {{ $t('hero.social_linkedin') }} <span aria-hidden='true'>↗</span>
          <span class='sr_only'>{{ $t('hero.opens_new_tab_sr') }}</span>
        </a>
        <a class='hero_section__social_link'
          href='https://github.com/zhassulaan'
          target='_blank'
          rel='noreferrer'>
          {{ $t('hero.social_github') }} <span aria-hidden='true'>↗</span>
          <span class='sr_only'>{{ $t('hero.opens_new_tab_sr') }}</span>
        </a>
        <a class='hero_section__social_link'
          href='mailto:zhassulan.serikuly@gmail.com'>
          {{ $t('hero.social_email') }} <span aria-hidden='true'>↗</span>
        </a>
      </div>

      <div class='hero_section__meta'>
        <span>{{ $t('hero.meta_1') }}</span>
        <span>{{ $t('hero.meta_2') }}</span>
        <span>{{ $t('hero.meta_3') }}</span>
      </div>
    </div>

    <div v-reveal class='hero_section__visual'>
      <div class='hero_section__orbit hero_section__orbit--one'></div>
      <div class='hero_section__orbit hero_section__orbit--two'></div>

      <div class='hero_section__portrait_frame'>
        <img class='hero_section__portrait'
          :src="portfolio_assets.portrait"
          alt='Zhassulan Serikuly' />
      </div>

      <div class='hero_section__signal hero_section__signal--top'>
        <small>{{ $t('hero.signal_top_label') }}</small>
        <strong>{{ $t('hero.signal_top_value') }}</strong>
        <i></i>
      </div>

      <div class='hero_section__signal hero_section__signal--bottom'>
        <small>{{ $t('hero.signal_bottom_label') }}</small>
        <strong>{{ $t('hero.signal_bottom_value') }}</strong>
      </div>
    </div>
  </section>
</template>

<style src='./hero_section.css'></style>
