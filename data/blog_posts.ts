import type { BlogPost } from '@/types/portfolio';

// Newest first. After adding a post, run `npm run sitemap`. See guide/BLOG_GUIDE.md.
export const blog_posts: BlogPost[] = [{
  slug: 'half-a-million-map-objects',
  title: '500K map objects, first render cut from 800 to 480 ms',
  date: '2026-10-16',
  summary: 'A Mapbox GL JS interface with 300K–500K geospatial objects: first render from about 800 ms to about 480 ms.',
  tags: ['Mapbox GL JS', 'Performance', 'React', 'Elasticsearch', 'GIS'],
  blocks: [{
    type: 'p',
    text: 'At KeyHorse, GIS interfaces had to render and work with datasets of 300K–500K geospatial objects. The first interaction on the map felt slow, and the delay was spread over several places instead of sitting in one function.',
  }, {
    type: 'h2',
    text: 'What changed',
  }, {
    type: 'list',
    items: [
      'Restructured map layers and styles.',
      'Added clustering.',
      'Moved filtering to the client.',
      'Shortened the data path between the React state layer and Elasticsearch to remove repeated work.',
    ],
  }, {
    type: 'h2',
    text: 'Result',
  }, {
    type: 'p',
    text: 'Initial Mapbox GL JS rendering went from about 800 ms to about 480 ms. Separate work on the search algorithms made geospatial search about 30% faster.',
  }],
}, {
  slug: 'pages-router-to-app-router',
  title: 'Moving from the Pages Router to the App Router',
  date: '2026-10-15',
  summary: 'Modernizing legacy React/Next.js codebases at Ciklum: App Router, strict TypeScript, and INP from about 280 ms to about 150 ms.',
  tags: ['Next.js', 'React Server Components', 'TypeScript', 'Performance', 'Architecture'],
  blocks: [{
    type: 'p',
    text: 'At Ciklum I worked on legacy React/Next.js codebases behind a product with 1M+ users. The goal was to modernize them and standardize the architecture.',
  }, {
    type: 'h2',
    text: 'What changed',
  }, {
    type: 'list',
    items: [
      'Moved from the Pages Router to the App Router, using Server Components.',
      'Moved from JavaScript to strict TypeScript.',
      'Introduced Feature-Sliced Design for project structure.',
      'Introduced TanStack Query for data fetching, which reduced duplicated requests.',
    ],
  }, {
    type: 'h2',
    text: 'Performance',
  }, {
    type: 'p',
    text: 'I profiled rendering, hydration and interaction-heavy flows in the high-traffic modules. Interaction to Next Paint (INP) went from about 280 ms to about 150 ms.',
  }, {
    type: 'h2',
    text: 'Testing and monitoring',
  }, {
    type: 'p',
    text: 'I also expanded automated testing (unit, integration and E2E), with CI/CD gates and Sentry monitoring.',
  }],
}];

export const find_blog_post = (slug: string) => blog_posts.find((post) => post.slug == slug);
