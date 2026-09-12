<script setup lang='ts'>
import { portfolio_assets } from '@/data/portfolio';
</script>

<template>
  <section class='hero_section wrap'>
    <div class='hero_section__copy' v-reveal>
      <p class='hero_section__status'>
        <span></span>
        Senior Software Engineer · 6+ years in production
      </p>

      <h1 class='hero_section__title'>
        I engineer the parts users <em>feel</em> and teams have to
        <em>live with.</em>
      </h1>

      <p class='hero_section__lead'>
        This is not a mirror of my LinkedIn. It is a small engineering notebook
        about speed, architecture, modernization and the decisions behind
        production software.
      </p>

      <div class='hero_section__actions'>
        <a class='button' href='#cases'>
          Open the notebook <span aria-hidden='true'>↓</span>
        </a>
        <a class='button button--ghost'
          :href="portfolio_assets.cv"
          aria-label='Download CV as PDF'
          download>
          CV / PDF
        </a>
      </div>

      <div class='hero_section__socials' aria-label='Social links'>
        <a class='hero_section__social_link'
          href='https://www.linkedin.com/in/serikulyzhassulan'
          target='_blank'
          rel='noreferrer'>
          LinkedIn <span aria-hidden='true'>↗</span>
          <span class='sr_only'>(opens in a new tab)</span>
        </a>
        <a class='hero_section__social_link'
          href='https://github.com/zhassulaan'
          target='_blank'
          rel='noreferrer'>
          GitHub <span aria-hidden='true'>↗</span>
          <span class='sr_only'>(opens in a new tab)</span>
        </a>
        <a class='hero_section__social_link'
          href='mailto:zhassulan.serikuly@gmail.com'>
          Email <span aria-hidden='true'>↗</span>
        </a>
      </div>

      <div class='hero_section__meta'>
        <span>Vue / React / Nuxt / Next / TypeScript</span>
        <span>Python / Django REST</span>
        <span>Performance / Architecture / Leadership</span>
      </div>
    </div>

    <div v-reveal class='hero_section__visual'>
      <div class='hero_section__orbit hero_section__orbit--one'></div>
      <div class='hero_section__orbit hero_section__orbit--two'></div>

      <div class='hero_section__portrait_frame'>
        <img class='hero_section__portrait'
          :src="portfolio_assets.portrait"
          alt='Zhassulan Serikuly'
        />
      </div>

      <div class='hero_section__signal hero_section__signal--top'>
        <small>current mode</small>
        <strong>reduce complexity</strong>
        <i></i>
      </div>

      <div class='hero_section__signal hero_section__signal--bottom'>
        <small>loop</small>
        <strong>profile → simplify → prove</strong>
      </div>
    </div>
  </section>
</template>

<style src='./hero_section.css'></style>
