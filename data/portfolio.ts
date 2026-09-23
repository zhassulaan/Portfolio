import portrait from '@/assets/images/main.webp';
import ciklum_logo from '@/assets/logos/ciklum.svg';
import keyhorse_logo from '@/assets/logos/keyhorse.svg';
import dar_logo from '@/assets/logos/dar.svg';
import epam_logo from '@/assets/logos/epam.svg';
import sdu_logo from '@/assets/logos/sdu.svg';
import geonomix_image from '@/assets/images/projects/geonomix.webp';
import melissa_image from '@/assets/images/projects/melissa.webp';
import kostyum_image from '@/assets/images/projects/kostyum.webp';
import stroymarket_image from '@/assets/images/projects/stroymarket.webp';
import magnum_image from '@/assets/images/projects/magnum.webp';
import midas_event_image from '@/assets/images/projects/midas-event.webp';
import dostyk_trans_terminal_image from '@/assets/images/projects/dostyk-trans-terminal.webp';
import unistory_image from '@/assets/images/projects/unistory.webp';
import kazmed_image from '@/assets/images/projects/kazmed.webp';
import abi_construction_image from '@/assets/images/projects/abi-construction.webp';
import tahit_image from '@/assets/images/projects/tahit.webp';
import dobraya_image from '@/assets/images/projects/dobraya.webp';
import azm_trade_image from '@/assets/images/projects/azm-trade.webp';
import pharmacom_image from '@/assets/images/projects/pharmacom.webp';
import new_navat_image from '@/assets/images/projects/new-navat.webp';
import asia_credit_bank_image from '@/assets/images/projects/asia-credit-bank.webp';
import type { CaseStudy, Milestone, Principle, ProofDocument, ProofItem, Project, Signal, Surface } from '@/types/portfolio';

// Served straight from /public — a static file needs no build-time import,
// unlike the images/logos above which go through Vite's asset pipeline.
export const portfolio_assets = { portrait, cv: '/files/Zhassulan-Serikuly-Senior-Software-Engineer-Resume.pdf' };

export const nav_items = [{
  label: 'Signals',
  href: '/#signals',
}, {
  label: 'Cases',
  href: '/#cases',
}, {
  label: 'Builds',
  href: '/#builds',
}, {
  label: 'Projects',
  href: '/projects',
}, {
  label: 'Proof',
  href: '/proof',
}, {
  label: 'CV',
  href: '/cv',
}, {
  label: 'Path',
  href: '/#path',
}, {
  label: 'Contact',
  href: '/#contact',
}];

export const signals: Signal[] = [{
  value: '6+',
  label: 'years in production',
  note: 'From React internship work to senior ownership across international product teams.',
}, {
  value: '1-3M',
  label: 'users served',
  note: 'Production interfaces operating at meaningful product scale.',
}, {
  value: '200+',
  label: 'projects delivered',
  note: 'Across web, mobile and data-intensive platforms.',
}, {
  value: '75+',
  label: 'projects optimized',
  note: 'Performance, architecture and maintainability improvements.',
}];

export const case_studies: CaseStudy[] = [
  {
    index: '01',
    company: 'Ciklum',
    kicker: 'Architecture at product scale',
    title: 'Make ten modules feel like one system.',
    problem: 'A growing Vue product surface had to stay coherent while 10+ modules evolved in parallel for a platform serving more than one million users annually.',
    solution: 'Defined reusable Vue 3 / TypeScript patterns around composition, routing, state and shared product workflows so new features could start from an established system instead of local conventions.',
    result: 'The architecture reduced feature implementation time by roughly 30% while creating a stronger base for cross-module development.',
    metrics: [{
      value: '10+',
      label: 'product modules',
    }, {
      value: '~30%',
      label: 'faster feature delivery',
    }],
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Vue Router', 'Composition API', 'Vite'],
  }, {
    index: '02',
    company: 'Ciklum',
    kicker: 'Performance as architecture',
    title: 'Treat loading time as a graph, not a number.',
    problem: 'High-traffic screens were slowed by work happening across rendering, data fetching, caching and asynchronous UI flows rather than one obvious bottleneck.',
    solution: 'Optimized the full request-to-render path: rendering behavior, caching, async orchestration and API request patterns, then backed the work with Core Web Vitals, Lighthouse, tests and Sentry monitoring.',
    result: 'Average page load time moved from about 3.2 seconds to 2.1 seconds while the platform continued to evolve.',
    metrics: [{
      value: '3.2 → 2.1s',
      label: 'average page load',
    }, {
      value: '34%',
      label: 'approx. reduction',
    }],
    stack: ['Core Web Vitals', 'Lighthouse', 'Vitest', 'Jest', 'Sentry', 'CI/CD'],
  }, {
    index: '03',
    company: 'KeyHorse',
    kicker: 'Geospatial performance',
    title: 'Half a million map objects should still feel interactive.',
    problem: 'Dense GIS interfaces had to render and manipulate datasets containing roughly 300K–500K geospatial objects without making the first interaction feel delayed.',
    solution: 'Restructured layers and styles, introduced clustering and client-side filtering, and tightened the data path between the React state layer and Elasticsearch to eliminate repeated work.',
    result: 'Initial Mapbox GL JS rendering dropped from about 800ms to 480ms, with a 30% improvement in geospatial search response time from separate algorithm work.',
    metrics: [{
      value: '800 → 480ms',
      label: 'initial map render',
    }, {
      value: '300K–500K',
      label: 'geospatial objects',
    }],
    stack: ['React', 'Mapbox GL JS', 'Redux', 'Elasticsearch', 'Performance Profiling'],
  }, {
    index: '04',
    company: 'KeyHorse',
    kicker: 'Reusable delivery systems',
    title: 'Build the next regional product by configuring, not copying.',
    problem: 'Dozens of regional GIS products shared recurring UI and data patterns, but repeated implementations made delivery slower and consistency expensive.',
    solution: 'Created a centralized React architecture using Feature-Sliced Design, with 100+ reusable components documented in Storybook, then standardized TypeScript, theming, role-aware patterns, linting and test practices around it.',
    result: 'Similar implementation work dropped by up to 50%; some launches that previously took about a month could be completed in roughly a week.',
    metrics: [{
      value: '100+',
      label: 'reusable components',
    }, {
      value: '1 month → 1 week',
      label: 'similar implementations',
    }],
    stack: ['React', 'TypeScript', 'Feature-Sliced Design', 'Storybook', 'Vitest', 'Playwright'],
  },
];

export const projects: Project[] = [
  { id: 'geonomix', title: 'Geonomix', category: 'GIS & Platforms', image: geonomix_image, image_width: 1200, image_height: 652, description: 'A large-scale geospatial and digital-twin platform combining interactive maps, municipal data, digital registries, government services and monitoring tools across regional deployments.', stack: ['React', 'Mapbox GL JS', 'Node.js', 'NestJS', 'PostgreSQL', 'Elasticsearch'], href: 'https://iulytau.kz', note: 'Map-first product where data volume and reusable regional delivery shaped the frontend architecture.' },
  { id: 'stroymarket', title: 'Stroymarket.kz', category: 'Marketplace', image: stroymarket_image, image_width: 1200, image_height: 672, description: 'A nationwide B2B marketplace connecting construction material suppliers, contractors, and equipment rental across Kazakhstan — live catalog and supplier search across 39 cities, an AI-powered project assistant, and a cost-estimation calculator for common build types.', stack: ['Vue.js', 'Nuxt.js'], href: 'https://stroymarket.kz', featured: true, note: 'Solo-built, from supplier/catalog discovery to an AI construction assistant and cost estimator.' },
  { id: 'kostyum', title: 'Kostyum.kz', category: 'E-commerce', image: kostyum_image, image_width: 1200, image_height: 618, description: 'A responsive men’s and women’s fashion e-commerce frontend — reusable product-catalog UI covering apparel, footwear, and accessories, with a focus on a smooth desktop and mobile shopping experience.', stack: ['Nuxt.js', 'Vue.js', 'SSR'], href: 'https://kostyum.kz', featured: true },
  { id: 'midas-event', title: 'Midas Event', category: 'Corporate', image: midas_event_image, image_width: 1200, image_height: 749, description: 'An event-agency site built as a browsable portfolio of past events rather than a static services list, with React-driven interactive detail throughout.', stack: ['React', 'JavaScript', 'CSS'], href: 'https://midasevent.kz', featured: true },
  { id: 'magnum', title: 'Magnum.kz', category: 'Retail', image: magnum_image, image_width: 1200, image_height: 616, description: 'Frontend contributor on Kazakhstan’s largest supermarket chain’s site — built the product catalog and promotions, the Magnum Chef sub-brand pages (bakery, culinary, confectionery), the loyalty/bonus-app promotion section, and the careers page.', stack: ['Vue.js', 'Nuxt.js'], href: 'https://magnum.kz', featured: false, note: 'Contributed core customer-facing sections as part of the delivery team; not a solo build.' },
  { id: 'unistory', title: 'UniStory', category: 'AI & Web3', image: unistory_image, image_width: 1200, image_height: 684, description: 'A digital product interface integrating crypto-wallet state and asynchronous backend data into reusable React product experiences.', stack: ['React', 'TypeScript', 'REST APIs', 'Web3'], href: 'https://unistory.app/ru/', featured: true },
  { id: 'kazmed', title: 'KazMedEngineering', category: 'Healthcare', image: kazmed_image, image_width: 1200, image_height: 647, description: 'A corporate frontend for an authorized medical-equipment service partner, built around a Swiper-driven catalog of equipment and service lines instead of long text pages.', stack: ['Nuxt.js', 'Swiper'], href: 'https://www.kme.kz' },
  { id: 'dostyk-trans-terminal', title: 'Dostyk Trans Terminal', category: 'Corporate', image: dostyk_trans_terminal_image, image_width: 1200, image_height: 644, description: 'A corporate website for a logistics terminal at the Dostyk–Alashankou border crossing, presenting container handling, storage and transshipment services.', stack: ['Nuxt.js', 'Vue.js'], href: 'https://www.dtt.kz/' },
  { id: 'melissa', title: 'Melissa', category: 'E-commerce', image: melissa_image, image_width: 1200, image_height: 640, description: 'A large online pharmacy with 13,000+ products, including catalog navigation, search, filtering, sorting, product pages, cart flows and backend integrations.', stack: ['Nuxt.js', 'Vue.js', 'REST APIs'], href: 'https://melissaapteka.kz', note: 'A large catalogue experience where information architecture matters as much as UI polish.' },
  { id: 'abi-construction', title: 'ABI Construction', category: 'Corporate', image: abi_construction_image, image_width: 1200, image_height: 634, description: 'A construction-company website pairing a WordPress content backend with Vue-driven project galleries and interactive UI on top.', stack: ['WordPress', 'Vue.js', 'PHP', 'SCSS'], href: 'https://abi-construction.kz' },
  { id: 'tahit', title: 'TAHIT', category: 'Corporate', image: tahit_image, image_width: 1200, image_height: 642, description: 'A manufacturing-company frontend showcasing textile production capabilities, technologies, products and services across desktop and mobile.', stack: ['Vue.js'], href: 'https://tahit.kz' },
  { id: 'dobraya', title: 'Dobraya Pharmacy', category: 'E-commerce', image: dobraya_image, image_width: 1200, image_height: 643, description: 'An online-pharmacy storefront with responsive catalogs, category navigation, search, filtering and product flows.', stack: ['HTML', 'JavaScript', 'SCSS', 'Bootstrap', 'jQuery'], href: 'https://dobraya-apteka.kz' },
  { id: 'asia-mebel', title: 'Asia Mebel', category: 'E-commerce', image: azm_trade_image, image_width: 1200, image_height: 750, description: 'A commercial catalog for furniture materials, fittings, tools and services with structured navigation, filtering, search and product pages.', stack: ['1C Bitrix', 'PHP', 'JavaScript', 'SASS', 'Bootstrap'], href: 'https://asiamebel.com' },
  { id: 'pharmacom', title: 'Pharmacom', category: 'Healthcare', image: pharmacom_image, image_width: 1200, image_height: 639, description: 'A healthcare website for a vaccination clinic and pharmacy network, organized around locations, services and patient information rather than one static homepage.', stack: ['JavaScript', 'HTML', 'CSS', 'Bootstrap', 'jQuery'], href: 'https://pharma.com.kz' },
  { id: 'navat', title: 'NAVAT', category: 'Hospitality', image: new_navat_image, image_width: 1200, image_height: 658, description: 'A promotional restaurant landing page with a responsive visual experience built around menu, atmosphere and brand identity.', stack: ['JavaScript', 'HTML', 'CSS', 'jQuery'], href: 'https://newnavat.netlify.app' },
  { id: 'asia-credit-bank', title: 'AsiaCredit Bank', category: 'Finance', image: asia_credit_bank_image, image_width: 1200, image_height: 645, description: 'A bank contact-center website turning a large set of product and support pages into a fast, easy-to-navigate structure for customers.', stack: ['PHP', 'HTML', 'JavaScript', 'SCSS'], href: 'https://asiacreditbank.kz' },
];

export const featured_projects = projects.filter((project) => project.featured);

export const surfaces: Surface[] = [{
  index: 'A',
  title: 'High-traffic product modules',
  text: 'Interfaces where architecture, caching, state and API behavior have to work as one product system.',
  tags: ['Vue 3', 'TypeScript', 'Pinia', 'Vite'],
  variant: 'grid',
}, {
  index: 'B',
  title: 'Geospatial systems',
  text: 'Map-heavy products where data volume changes the frontend architecture, not just the rendering layer.',
  tags: ['Mapbox GL JS', 'Elasticsearch', 'GIS', 'Data-intensive UI'],
  variant: 'map',
}, {
  index: 'C',
  title: 'Modernization programs',
  text: 'Legacy-to-modern migrations that keep product delivery moving while the technical foundation changes underneath.',
  tags: ['Vue 2 → Vue 3', 'Composition API', 'Testing', 'CI/CD'],
  variant: 'flow',
}, {
  index: 'D',
  title: 'End-to-end product delivery',
  text: 'Frontend-first engineering with enough backend depth to own APIs, integration boundaries and production behavior.',
  tags: ['Node.js', 'NestJS', 'PostgreSQL', 'REST APIs'],
  variant: 'pulse',
}];

export const principles: Principle[] = [{
  number: '01',
  title: 'Measure before rewriting.',
  text: 'A performance change should begin with evidence and end with a user-visible outcome.',
}, {
  number: '02',
  title: 'Architecture is a delivery tool.',
  text: 'The best abstraction is the one that makes the next feature cheaper, safer and easier to understand.',
}, {
  number: '03',
  title: 'Frontend is part of the system.',
  text: 'Rendering, data shape, APIs, accessibility, observability and release pipelines are one engineering surface.',
}, {
  number: '04',
  title: 'Senior means reducing uncertainty.',
  text: 'Technical leadership is making trade-offs visible so a team can move quickly without accumulating hidden risk.',
}];

export const milestones: Milestone[] = [{
  id: 'ciklum',
  period: 'Aug 2025 — Sep 2026',
  company: 'Ciklum',
  role: 'Senior Software Engineer',
  focus: 'Frontend architecture · product modernization · performance · technical leadership',
  logo: ciklum_logo,
  location: 'Bucharest, Romania (Remote)',
  summary: 'UK-based global digital product and enterprise software transformation leader.',
  highlights: [{
    label: 'Architecture',
    text: 'Established a shared React/Next.js component library (strict TypeScript, WCAG AA) plus a type-safe REST/GraphQL API layer across 10+ production modules serving 1–3M users — cut feature implementation time by ~30%.',
  }, {
    label: 'Modernization',
    text: 'Modernized legacy React/Next.js codebases incrementally, migrating from Pages Router to App Router and Server Components and converting JavaScript modules to strict TypeScript without disrupting ongoing releases.',
  }, {
    label: 'Performance & Core Web Vitals',
    text: 'Profiled and optimized rendering, hydration, and interaction-heavy user flows across high-traffic modules, reducing Interaction to Next Paint (INP) from ~280ms to ~150ms.',
  }, {
    label: 'Technical Leadership',
    text: 'Drove frontend architecture and technical planning for a team of 6 engineers and reviewed ~15 GitLab merge requests per week — improved review practices helped reduce post-merge defects by 35%.',
  }, {
    label: 'Production Reliability',
    text: 'Expanded unit, integration, and end-to-end test coverage for critical user flows and API integrations, added type-check and lint gates to CI/CD, and set up Sentry monitoring to catch regressions before and after deployment.',
  }],
}, {
  id: 'keyhorse',
  period: 'Jul 2021 — Aug 2025',
  company: 'KeyHorse',
  role: 'Middle → Senior → Team Lead Software Engineer',
  focus: 'GIS · digital twins · engineering leadership · reusable systems · backend APIs',
  logo: keyhorse_logo,
  location: 'Almaty, Kazakhstan',
  summary: 'GIS and digital-twin platform company serving Central Asia.',
  roles: [{
    id: 'team-lead',
    label: 'Team Lead',
    period: 'Sep 2023 — Aug 2025',
    role: 'Team Lead Software Engineer',
    highlights: [{
      label: 'Engineering Leadership',
      text: 'Led 18 engineers across 3 teams, setting technical direction for 80+ large-scale regional GIS platforms and 100+ smaller digital-twin deployments serving 1.5M+ users across 4 countries.',
    }, {
      label: 'Solo Product Delivery',
      text: 'Independently architected and launched 10 enterprise platforms from scratch, typically taking each from initial requirements to production in 1–1.5 months — roughly 2x faster than the company\'s previous delivery cycle.',
    }, {
      label: 'Engineering Process',
      text: 'Introduced Scrum across 3 teams and established shared planning, estimation, code review, and documentation practices, reviewing ~50 merge requests per week and reducing new-hire onboarding time by 40%.',
    }],
  }, {
    id: 'mid-senior',
    label: 'Middle → Senior',
    period: 'Jul 2021 — Sep 2023',
    role: 'Middle → Senior Software Engineer',
    highlights: [{
      label: 'Frontend Architecture',
      text: 'Built a shared React architecture using Feature-Sliced Design, with 100+ reusable components documented in Storybook, standardizing UI development across regional projects and cutting feature implementation time by 50%.',
    }, {
      label: 'Geospatial Performance',
      text: 'Optimized Mapbox GL JS rendering and Elasticsearch indexing/query patterns across 500K+ geospatial objects, reducing map render time by 40% (800ms → 480ms) and search latency by 30%.',
    }, {
      label: 'Backend & Data',
      text: 'Designed and built 35+ REST APIs with Node.js and NestJS for data-intensive GIS platforms, working with PostgreSQL, MongoDB, and Redis for persistence and caching. Generated type-safe TypeScript clients from OpenAPI contracts to keep frontend and backend integrations in sync.',
    }, {
      label: 'Event-Driven Architecture',
      text: 'Moved long-running GIS processing from synchronous API flows to Kafka consumers and background workers, with retries and idempotency to handle failures safely. Used WebSockets to send processing updates back to clients.',
    }, {
      label: 'Quality & Observability',
      text: 'Set up shared testing with Vitest, Playwright, and Cypress across 86 repositories, with automated checks running through GitLab CI/CD. Used Grafana dashboards and alerts to monitor production after deployment — critical-path coverage reached 70–80%, while regression bugs dropped by 30%.',
    }],
  }],
}, {
  id: 'dar',
  period: 'Jun 2020 — Jul 2021',
  company: 'DAR',
  role: 'Junior Software Engineer',
  focus: 'High-volume web delivery · e-commerce · mobile · performance',
  logo: dar_logo,
  summary: 'Technology group developing digital products and platforms across fintech, education, hospitality, and business operations.',
  highlights: [{
    label: 'Project Delivery',
    text: 'Delivered nearly 20 web applications with React and Vue, often working across 3–4 projects in parallel and taking features from requirements through production.',
  }, {
    label: 'End-to-End Ownership',
    text: 'Independently architected and shipped food-delivery and accommodation-booking platforms in ~1 month each, supporting 150–200 restaurants across 3 cities and 1,000+ property listings.',
  }, {
    label: 'Web Performance',
    text: 'Improved frontend performance through bundle optimization, lazy loading, and rendering improvements, reducing page load times by up to 40% (to 1.8–2.2s) on selected applications.',
  }, {
    label: 'Cross-Platform Development',
    text: 'Built and released 5–7 production mobile applications for iOS and Android using Ionic, Capacitor, and React Native, sharing business logic and API integrations across platforms where practical.',
  }, {
    label: 'Full-Stack Development',
    text: 'Built FastAPI/MySQL backends for 6 production applications, owning REST API design, database schemas, authentication, and frontend integration.',
  }],
}, {
  id: 'epam',
  period: 'Jan 2020 - Jun 2020',
  company: 'EPAM Systems',
  role: 'Software Engineer Intern',
  focus: 'React · TypeScript · reusable UI · engineering foundations',
  logo: epam_logo,
  summary: 'Global IT consulting and digital engineering company.',
  highlights: [{
    label: 'Competitive Selection',
    text: 'Selected as 1 of 3 engineers to join the development team from 40+ candidates, following the company\'s technical selection process.',
  }, {
    label: 'Frontend Development',
    text: 'Built and maintained internal web applications with React and TypeScript, developing reusable UI components, complex forms, data tables, and REST API integrations.',
  }, {
    label: 'Application Development',
    text: 'Developed features and resolved production issues across 5+ internal React applications, working within existing codebases and established engineering practices.',
  }, {
    label: 'Engineering Practices',
    text: 'Wrote unit tests, participated in code reviews, and supported debugging and production releases.',
  }],
}, {
  id: 'freelance',
  period: '2019 — 2025',
  company: 'Independent Contractor',
  role: 'Freelance Software Engineer',
  focus: 'Full-cycle SaaS & e-commerce delivery · multi-framework frontend · client management',
  location: 'Remote (international clients)',
  summary: 'Independent freelance and contract work for international clients, run alongside full-time roles.',
  highlights: [{
    label: 'Client Delivery',
    text: 'Delivered 40+ web applications for international clients across SaaS, e-commerce, and internal business tools, working directly with clients from requirements through production.',
  }, {
    label: 'Frontend Development',
    text: 'Built production applications with React, Vue, and Angular, intentionally taking on projects across different frameworks to maintain hands-on experience beyond my primary React stack.',
  }, {
    label: 'Project Highlight',
    text: 'Built a multi-tenant SaaS platform for a Middle Eastern client, designing the frontend architecture, role-based access, dashboards, and API integrations from scratch and taking the product through production launch.',
  }, {
    label: 'End-to-End Ownership',
    text: 'Managed projects independently from estimation and technical planning through implementation, testing, deployment, and post-release support.',
  }],
}];

export const proof_items: ProofItem[] = [{
  label: 'Education',
  value: 'Information Systems',
  note: 'Suleyman Demirel University · 2018–2022 · GPA 3.72 / 4.0',
  logo: sdu_logo,
}, {
  label: 'English',
  value: 'IELTS 7.0',
  note: 'Academic IELTS · CEFR C1 result',
  href: '/certificate/ielts',
}, {
  label: 'Recognition',
  value: 'Silver Medal',
  note: 'Infomatrix Asia-Pacific 2018 — International Computer Project Competition.',
  href: '/certificate/infomatrix',
}, {
  label: 'Reference',
  value: 'KeyHorse',
  note: 'Signed recommendation from company leadership',
  href: '/recommendation/keyhorse',
}, {
  label: 'Languages',
  value: '5 spoken',
  note: 'English — full working proficiency · Kazakh & Russian — native · Turkish — conversational · Chinese — basic',
}];

// One source of truth for the /proof archive and its detail pages
// (pages/certificate/[slug].vue, pages/recommendation/[slug].vue).
// See PROOF_GUIDE.md for how to attach the real scanned file to an entry.
export const proof_documents: ProofDocument[] = [{
  slug: 'ielts',
  kind: 'certificate',
  title: 'IELTS Academic 7.0/9.0',
  issuer: 'British Council',
  date: '2023',
  description: 'Academic IELTS result (CEFR C1) — evidence of full working professional English proficiency for international, remote-first engineering roles.',
}, {
  slug: 'chinese-proficiency',
  kind: 'certificate',
  title: 'Chinese Language Proficiency',
  issuer: 'East West Education',
  date: '2019',
  description: 'Basic Chinese language proficiency, developed alongside professional work with cross-border product and business teams.',
  file: '/files/certificates/chinese-proficiency.pdf',
  file_type: 'pdf',
}, {
  slug: 'infomatrix',
  kind: 'certificate',
  title: 'Silver Medal — Infomatrix Asia-Pacific 2018',
  issuer: 'Infomatrix Asia-Pacific',
  date: '2018',
  description: 'International Computer Project Competition recognition for an early software engineering project.',
  file: '/files/certificates/infomatrix.pdf',
  file_type: 'pdf',
}, {
  slug: 'keyhorse',
  kind: 'recommendation',
  title: 'Recommendation Letter — KeyHorse',
  issuer: 'Adilet Kentbayev, Company Head — KeyHorse LLP',
  date: 'Issued 21 Aug 2026',
  description: 'A signed recommendation on KeyHorse letterhead recommending Zhassulan for a senior-level engineering role.',
  file: '/files/recommendations/keyhorse.pdf',
  file_type: 'pdf',
}];
