<template>
  <section class='contact_section' id='contact'>
    <div class='wrap contact_section__inner'>
      <div v-reveal>
        <p class='eyebrow'>{{ $t('contact.eyebrow') }}</p>
        <h2>{{ $t('contact.heading') }}</h2>
      </div>

      <div class='contact_section__action' v-reveal>
        <p>
          {{ $t('contact.role_line') }}
          <br>
          {{ $t('contact.relocation_line') }}
        </p>

        <a href='mailto:zhassulan.serikuly@gmail.com'>
          zhassulan.serikuly@gmail.com&nbsp;<span aria-hidden='true'>↗</span>
        </a>

        <div class='contact_section__socials'>
          <a class='contact_section__social_link'
            href='https://www.linkedin.com/in/zhassulan-serikuly'
            target='_blank'
            rel='noreferrer'>
            LinkedIn
            <span class='sr_only'>{{ $t('contact.opens_new_tab_sr') }}</span>
          </a>
          <a class='contact_section__social_link'
            href='https://github.com/zhassulaan'
            target='_blank'
            rel='noreferrer'>
            GitHub
            <span class='sr_only'>{{ $t('contact.opens_new_tab_sr') }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style src='./contact_section.css'></style>
