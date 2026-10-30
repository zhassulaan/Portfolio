<script setup lang='ts'>
import { find_blog_post } from '@/data/blog_posts';
import { format_post_date, reading_minutes } from '@/composables/use_blog_format';
import TagList from '@/components/ui/tag_list/tag_list.vue';

const route = useRoute();
const { locale } = useI18n();
const local_path = useLocalePath();
const { public: public_config } = useRuntimeConfig();

const post = find_blog_post(route.params.slug as string);

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' });
}

const post_url = `${public_config.siteUrl}${local_path(`/blog/${post.slug}`)}`;

useHead({
  title: post.title,
  meta: [
    { name: 'description', content: post.summary },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: post.title },
    { property: 'og:description', content: post.summary },
    { property: 'article:published_time', content: post.date },
  ],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      keywords: post.tags.join(', '),
      url: post_url,
      author: { '@type': 'Person', name: 'Zhassulan Serikuly', url: public_config.siteUrl },
    }),
  }],
});

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
});
</script>

<template>
  <main class='blog_post wrap'
    id='main_content'
    tabindex='-1'>
    <NuxtLink class='blog_post__back' :to="local_path('/blog')">
      <span aria-hidden='true'>←</span> {{ $t('blog_page.back_link') }}
    </NuxtLink>

    <article v-if='post'>
      <header class='blog_post__header'>
        <p class='blog_post__meta'>
          <time :datetime='post.date'>{{ format_post_date(post.date, locale) }}</time>
          · {{ $t('blog_page.read_time', { minutes: reading_minutes(post) }) }}
        </p>
        <h1>{{ post.title }}</h1>
        <p class='blog_post__summary'>{{ post.summary }}</p>
        <TagList :items='post.tags' />
        <p class='blog_post__language_note' v-if="locale != 'en'">{{ $t('blog_page.english_only') }}</p>
      </header>

      <div class='blog_post__body'>
        <template v-for='(block, index) in post.blocks' :key='index'>
          <h2 v-if="block.type == 'h2'">{{ block.text }}</h2>
          <p v-else-if="block.type == 'p'">{{ block.text }}</p>
          <ul v-else-if="block.type == 'list'">
            <li v-for='item in block.items' :key='item'>{{ item }}</li>
          </ul>
          <pre v-else-if="block.type == 'code'"><code>{{ block.text }}</code></pre>
        </template>
      </div>

      <footer class='blog_post__footer'>
        <p>{{ $t('blog_page.footer_text') }}</p>
        <NuxtLink class='button' :to="local_path('/#hire')">
          {{ $t('hire.cta_book') }} <span aria-hidden='true'>↗</span>
        </NuxtLink>
      </footer>
    </article>
  </main>
</template>

<style src='./blog_page.css'></style>
