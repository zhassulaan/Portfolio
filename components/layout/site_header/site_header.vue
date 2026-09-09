<script setup lang='ts'>
import { nav_items } from '@/data/portfolio';

const route = useRoute();

const active_section = ref('');
const section_ids = nav_items
  .filter((item) => item.href.startsWith('/#'))
  .map((item) => item.href.slice(2));

let observer: IntersectionObserver | null = null;

const is_nav_item_active = (href: string) => {
  if (href === '/projects') {
    return route.path === '/projects';
  }

  if (!href.startsWith('/#') || route.path !== '/') {
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

onMounted(() => {
  observe_sections();

  window.addEventListener(
    'scroll',
    sync_active_section,
    { passive: true },
  );
});

watch(
  () => route.fullPath,
  async () => {
    await nextTick();

    observe_sections();
  },
);

onBeforeUnmount(() => {
  observer?.disconnect();

  window.removeEventListener(
    'scroll',
    sync_active_section,
  );
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
          :to='item.href'>
          <span class='site_header__nav_text' v-text='item.label'></span>
        </NuxtLink>
      </nav>

      <a class='site_header__cta' href='mailto:zhassulan.serikuly@gmail.com'>
        <span class='site_header__cta_text' v-text="'Start a conversation'"></span>
        <i class='site_header__cta_arrow' v-text="'↗'"></i>
      </a>
    </div>
  </header>
</template>

<style src='./site_header.css'></style>