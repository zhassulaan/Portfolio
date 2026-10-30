import { describe, expect, it } from 'vitest';
import { blog_posts, find_blog_post } from '@/data/blog_posts';
import { format_post_date, reading_minutes } from '@/composables/use_blog_format';

describe('blog data', () => {
  it('has unique, URL-safe slugs', () => {
    const slugs = blog_posts.map((post) => post.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it('has valid ISO dates, newest first', () => {
    const dates = blog_posts.map((post) => post.date);

    dates.forEach((date) => expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/));
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('gives every post a title, summary, tags and body', () => {
    for (const post of blog_posts) {
      expect(post.title.length, post.slug).toBeGreaterThan(0);
      expect(post.summary.length, post.slug).toBeGreaterThan(0);
      expect(post.tags.length, post.slug).toBeGreaterThan(0);
      expect(post.blocks.length, post.slug).toBeGreaterThan(0);
    }
  });

  it('finds a post by slug and returns undefined for an unknown one', () => {
    expect(find_blog_post(blog_posts[0].slug)).toBe(blog_posts[0]);
    expect(find_blog_post('does-not-exist')).toBeUndefined();
  });
});

describe('blog formatting', () => {
  it('estimates reading time as at least one minute', () => {
    const short = { ...blog_posts[0], blocks: [{ type: 'p' as const, text: 'Short.' }] };

    expect(reading_minutes(short)).toBe(1);
  });

  it('formats the date in UTC so the day never shifts', () => {
    expect(format_post_date('2026-10-16', 'en')).toBe('October 16, 2026');
  });

  it('falls back to the ISO date for an invalid locale tag', () => {
    expect(format_post_date('2026-10-16', 'not a locale!!')).toBe('2026-10-16');
  });
});
