<script setup lang='ts'>
import { blog_posts } from '@/data/blog_posts';
import { format_post_date, reading_minutes } from '@/composables/use_blog_format';
import TagList from '@/components/ui/tag_list/tag_list.vue';

const { t, locale } = useI18n();
const local_path = useLocalePath();

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
});

useHead({
  title: () => t('nav.blog'),
  meta: [{
    name: 'description',
    content: computed(() => t('blog_page.intro')),
  }],
});
</script>

<template>
  <main class='blog_page wrap'
    id='main_content'
    tabindex='-1'>
    <header class='blog_page__heading'>
      <p class='eyebrow'>{{ $t('blog_page.eyebrow') }}</p>
      <h1 class='blog_page__title'>{{ $t('blog_page.title') }}</h1>
      <p class='blog_page__intro'>{{ $t('blog_page.intro') }}</p>
      <p class='blog_page__language_note' v-if="locale != 'en'">{{ $t('blog_page.english_only') }}</p>
    </header>

    <ul class='blog_page__list'>
      <li class='blog_page__item'
        v-for='post in blog_posts'
        :key='post.slug'
        v-reveal>
        <NuxtLink class='blog_page__link' :to="local_path(`/blog/${post.slug}`)">
          <p class='blog_page__meta'>
            <time :datetime='post.date'>{{ format_post_date(post.date, locale) }}</time>
            · {{ $t('blog_page.read_time', { minutes: reading_minutes(post) }) }}
          </p>
          <h2>{{ post.title }}</h2>
          <p class='blog_page__summary'>{{ post.summary }}</p>
        </NuxtLink>
        <TagList :items='post.tags' />
      </li>
    </ul>

    <p class='blog_page__empty' v-if='!blog_posts.length'>{{ $t('blog_page.empty') }}</p>
  </main>
</template>

<style src='./blog_page.css'></style>
