<script setup lang='ts'>
import { portfolio_assets } from '@/data/portfolio';
import { useAnalytics } from '@/composables/use_analytics';
import { useContactLinks } from '@/composables/use_contact_links';

// Facts are translated strings (hire.fact_*); edit them in locales/*.json.
const fact_keys = ['roles', 'stack', 'format', 'relocation', 'availability', 'languages'] as const;

const { track } = useAnalytics();
const contact = useContactLinks();

const is_copied = ref(false);
let copied_timer: ReturnType<typeof setTimeout> | null = null;

async function copy_email() {
  track('Email Copy');

  try {
    await navigator.clipboard.writeText(contact.email);
  } catch (error) {
    // Clipboard can be blocked; the address is shown below the button anyway.
    console.warn('Could not copy the email address:', error);
    return;
  }

  is_copied.value = true;

  if (copied_timer) {
    clearTimeout(copied_timer);
  }

  copied_timer = setTimeout(() => {
    is_copied.value = false;
  }, 2500);
}

onBeforeUnmount(() => {
  if (copied_timer) {
    clearTimeout(copied_timer);
  }
});
</script>

<template>
  <section class='hire_section section wrap' id='hire'>
    <div class='section_heading'>
      <div v-reveal>
        <p class='eyebrow'>{{ $t('hire.eyebrow') }}</p>
        <h2>{{ $t('hire.heading') }}</h2>
      </div>
      <p v-reveal>{{ $t('hire.intro') }}</p>
    </div>

    <div class='hire_section__body'>
      <dl class='hire_section__facts' v-reveal>
        <div class='hire_section__fact'
          v-for='key in fact_keys'
          :key='key'>
          <dt>{{ $t(`hire.fact_${key}_label`) }}</dt>
          <dd>{{ $t(`hire.fact_${key}_value`) }}</dd>
        </div>
      </dl>

      <div class='hire_section__actions' v-reveal>
        <a class='button hire_section__book'
          :href='contact.booking_href'
          :target="contact.booking_opens_new_tab ? '_blank' : undefined"
          :rel="contact.booking_opens_new_tab ? 'noreferrer' : undefined"
          v-on:click="track('Booking Click', { source: 'hire_section' })">
          {{ $t('hire.cta_book') }} <span aria-hidden='true'>↗</span>
          <span class='sr_only' v-if='contact.booking_opens_new_tab'>{{ $t('hero.opens_new_tab_sr') }}</span>
        </a>

        <a class='button button--ghost'
          :href='portfolio_assets.cv'
          :aria-label="$t('cv_page.download_cv_aria')"
          download
          v-on:click="track('CV Download', { source: 'hire_section' })">
          {{ $t('cv_page.download_cv') }} <span aria-hidden='true'>↓</span>
        </a>

        <button class='button button--ghost'
          type='button'
          v-on:click='copy_email'>
          {{ $t('hire.cta_copy_email') }}
        </button>

        <p class='hire_section__email'>
          <a :href='contact.mailto_href' v-on:click="track('Email Click', { source: 'hire_section' })">{{ contact.email }}</a>
          <span class='hire_section__copied'
            role='status'
            aria-live='polite'>
            {{ is_copied ? $t('hire.copied') : '' }}
          </span>
        </p>
      </div>
    </div>
  </section>
</template>

<style src='./hire_section.css'></style>
