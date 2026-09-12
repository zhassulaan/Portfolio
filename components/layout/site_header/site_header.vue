<script setup lang='ts'>
import { nav_items } from '@/data/portfolio';
import ThemeToggle from '@/components/ui/theme_toggle/theme_toggle.vue';

const route = useRoute();

const active_section = ref('');
const is_mobile_nav_open = ref(false);
const section_ids = nav_items
  .filter((item) => item.href.startsWith('/#'))
  .map((item) => item.href.slice(2));

let observer: IntersectionObserver | null = null;

const is_nav_item_active = (href: string) => {
  if (!href.startsWith('/#')) {
    return route.path === href;
  }

  if (route.path !== '/') {
    return false;
  }

  return href === `/#${active_section.value}`;
};

const sync_active_section = () => {
  if (route.path !== '/') {
    active_section.value = '';
    return;
  }

  const is_bottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  if (is_bottom) {
    active_section.value = 'contact';

    if (route.hash !== '#contact') {
      window.history.replaceState(null, '', '/#contact');
    }

    return;
  }

  const header_offset = 112;

  const sections = section_ids
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => Boolean(section));

  const current_section = [...sections]
    .reverse()
    .find((section) => section.getBoundingClientRect().top <= header_offset);

  const next_active_section =
    current_section?.id ||
    route.hash.slice(1) ||
    section_ids[0] ||
    '';

  active_section.value = next_active_section;

  if (
    next_active_section &&
    route.hash !== `#${next_active_section}`
  ) {
    window.history.replaceState(
      null,
      '',
      `/#${next_active_section}`,
    );
  }
};

const observe_sections = () => {
  observer?.disconnect();

  observer = new IntersectionObserver(sync_active_section, {
    rootMargin: '-112px 0px -65% 0px',
    threshold: [0, .01, 1],
  });

  section_ids.forEach((id) => {
    const section = document.getElementById(id);

    if (section) {
      observer?.observe(section);
    }
  });

  sync_active_section();
};

const close_mobile_nav = () => {
  is_mobile_nav_open.value = false;
};

const toggle_mobile_nav = () => {
  is_mobile_nav_open.value = !is_mobile_nav_open.value;
};

const handle_keydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && is_mobile_nav_open.value) {
    close_mobile_nav();
  }
};

onMounted(() => {
  observe_sections();

  window.addEventListener(
    'scroll',
    sync_active_section,
    { passive: true },
  );

  window.addEventListener('keydown', handle_keydown);
});

watch(
  () => route.fullPath,
  async () => {
    close_mobile_nav();

    await nextTick();

    observe_sections();
  },
);

watch(is_mobile_nav_open, (is_open) => {
  document.documentElement.classList.toggle('has_locked_scroll', is_open);
});

onBeforeUnmount(() => {
  observer?.disconnect();

  window.removeEventListener(
    'scroll',
    sync_active_section,
  );

  window.removeEventListener('keydown', handle_keydown);
  document.documentElement.classList.remove('has_locked_scroll');
});
</script>

<template>
  <header class='site_header'>
    <div class='site_header__inner'>
      <NuxtLink class='site_header__brand'
        to='/'
        aria-label='Home'>
        <span class='site_header__brand_text' v-text="'ZS'"></span>
      </NuxtLink>

      <nav class='site_header__nav' aria-label='Primary navigation'>
        <NuxtLink class='site_header__nav_link'
          :class="{ 'site_header__nav_link--active': is_nav_item_active(item.href) }"
          v-for='item in nav_items'
          :key='item.href'
          :to='item.href'
          :aria-current="is_nav_item_active(item.href) ? 'page' : null">
          <span class='site_header__nav_text' v-text='item.label'></span>
        </NuxtLink>
      </nav>

      <div class='site_header__actions'>
        <ThemeToggle class='site_header__theme' />

        <a class='site_header__cta' href='mailto:zhassulan.serikuly@gmail.com'>
          <span class='site_header__cta_text' v-text="'Start a conversation'"></span>
          <i class='site_header__cta_arrow' aria-hidden='true' v-text="'↗'"></i>
        </a>

        <button class='site_header__burger'
          type='button'
          :aria-expanded="is_mobile_nav_open"
          aria-controls='mobile_nav'
          :aria-label="is_mobile_nav_open ? 'Close menu' : 'Open menu'"
          v-on:click="toggle_mobile_nav">
          <span class='site_header__burger_box' :class="{ 'site_header__burger_box--open': is_mobile_nav_open }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <div class='site_header__mobile_nav'
      :class="{ 'site_header__mobile_nav--open': is_mobile_nav_open }"
      id='mobile_nav'>
      <nav class='site_header__mobile_links' aria-label='Mobile navigation'>
        <NuxtLink class='site_header__mobile_link'
          :class="{ 'site_header__mobile_link--active': is_nav_item_active(item.href) }"
          v-for='item in nav_items'
          :key='item.href'
          :to='item.href'
          :aria-current="is_nav_item_active(item.href) ? 'page' : null"
          v-on:click="close_mobile_nav">
          <span v-text='item.label'></span>
        </NuxtLink>
      </nav>

      <div class='site_header__mobile_footer'>
        <ThemeToggle />

        <a class='button site_header__mobile_cta' href='mailto:zhassulan.serikuly@gmail.com'>
          Start a conversation <span aria-hidden='true'>↗</span>
        </a>
      </div>
    </div>
  </header>
</template>

<style src='./site_header.css'></style>
