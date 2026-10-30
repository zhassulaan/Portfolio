import type { BlogPost } from '@/types/portfolio';

const WORDS_PER_MINUTE = 200;

// Plain text of a post, used for the reading-time estimate.
function post_text(post: BlogPost): string {
  return post.blocks
    .map((block) => ('items' in block ? block.items.join(' ') : block.text))
    .join(' ');
}

export function reading_minutes(post: BlogPost): number {
  const words = post_text(post).split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// 'YYYY-MM-DD' parses as UTC midnight; format in UTC so the day doesn't shift.
export function format_post_date(iso_date: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso_date));
  } catch {
    return iso_date;
  }
}
