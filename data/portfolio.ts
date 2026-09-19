import portrait from '@/assets/images/main.png';
import ciklum_logo from '@/assets/logos/ciklum.svg';
import keyhorse_logo from '@/assets/logos/keyhorse.svg';
import dar_logo from '@/assets/logos/dar.svg';
import epam_logo from '@/assets/logos/epam.svg';
import sdu_logo from '@/assets/logos/sdu.svg';
import geonomix_image from '@/assets/images/projects/geonomix.png';
import melissa_image from '@/assets/images/projects/melissa.png';
import kostyum_image from '@/assets/images/projects/kostyum.png';
import stroymarket_image from '@/assets/images/projects/stroymarket.png';
import magnum_image from '@/assets/images/projects/magnum.png';
import midas_event_image from '@/assets/images/projects/midas-event.png';
import dostyk_trans_terminal_image from '@/assets/images/projects/dostyk-trans-terminal.png';
import unistory_image from '@/assets/images/projects/unistory.png';
import kazmed_image from '@/assets/images/projects/kazmed.png';
import abi_construction_image from '@/assets/images/projects/abi-construction.png';
import tahit_image from '@/assets/images/projects/tahit.png';
import dobraya_image from '@/assets/images/projects/dobraya.png';
import azm_trade_image from '@/assets/images/projects/azm-trade.png';
import pharmacom_image from '@/assets/images/projects/pharmacom.png';
import new_navat_image from '@/assets/images/projects/new-navat.png';
import asia_credit_bank_image from '@/assets/images/projects/asia-credit-bank.png';
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
    solution: 'Restructured layers and styles, introduced clustering and client-side filtering, and tightened the Vuex-to-Elasticsearch data path to eliminate repeated work.',
    result: 'Initial Mapbox GL JS rendering dropped from about 800ms to 480ms, with a 30% improvement in geospatial search response time from separate algorithm work.',
    metrics: [{
      value: '800 → 480ms',
      label: 'initial map render',
    }, {
      value: '300K–500K',
      label: 'geospatial objects',
    }],
    stack: ['Vue.js', 'Mapbox GL JS', 'Vuex', 'Elasticsearch', 'Performance Profiling'],
  }, {
    index: '04',
    company: 'KeyHorse',
    kicker: 'Reusable delivery systems',
    title: 'Build the next regional product by configuring, not copying.',
    problem: 'Dozens of regional GIS products shared recurring UI and data patterns, but repeated implementations made delivery slower and consistency expensive.',
    solution: 'Created a centralized architecture with 100+ reusable Vue components and shared modules, then standardized BEM, theming, role-aware patterns, linting and test practices around it.',
    result: 'Similar implementation work dropped by up to 50%; some launches that previously took about a month could be completed in roughly a week.',
    metrics: [{
      value: '100+',
      label: 'reusable components',
    }, {
      value: '1 month → 1 week',
      label: 'similar implementations',
    }],
    stack: ['Vue.js', 'TypeScript', 'BEM', 'Vitest', 'Playwright', 'GitLab CI/CD'],
  },
];

export const projects: Project[] = [
  { id: 'geonomix', title: 'Geonomix', category: 'GIS & Platforms', image: geonomix_image, description: 'A large-scale geospatial and digital-twin platform combining interactive maps, municipal data, digital registries, government services and monitoring tools across regional deployments.', stack: ['Vue.js', 'Vuex', 'Mapbox GL JS', 'Django', 'PostgreSQL', 'Elasticsearch'], href: 'https://iulytau.kz', note: 'Map-first product where data volume and reusable regional delivery shaped the frontend architecture.' },
  { id: 'stroymarket', title: 'Stroymarket.kz', category: 'Marketplace', image: stroymarket_image, description: 'A nationwide B2B marketplace connecting construction material suppliers, contractors, and equipment rental across Kazakhstan — live catalog and supplier search across 39 cities, an AI-powered project assistant, and a cost-estimation calculator for common build types.', stack: ['Vue.js', 'Nuxt.js'], href: 'https://stroymarket.kz', featured: true, note: 'Solo-built, from supplier/catalog discovery to an AI construction assistant and cost estimator.' },
  { id: 'kostyum', title: 'Kostyum.kz', category: 'E-commerce', image: kostyum_image, description: 'A responsive men’s and women’s fashion e-commerce frontend — reusable product-catalog UI covering apparel, footwear, and accessories, with a focus on a smooth desktop and mobile shopping experience.', stack: ['Nuxt.js', 'Vue.js', 'SSR'], href: 'https://kostyum.kz', featured: true },
  { id: 'midas-event', title: 'Midas Event', category: 'Corporate', image: midas_event_image, description: 'An event-agency site built as a browsable portfolio of past events rather than a static services list, with React-driven interactive detail throughout.', stack: ['React', 'JavaScript', 'CSS'], href: 'https://midasevent.kz', featured: true },
  { id: 'magnum', title: 'Magnum.kz', category: 'Retail', image: magnum_image, description: 'Frontend contributor on Kazakhstan’s largest supermarket chain’s site — built the product catalog and promotions, the Magnum Chef sub-brand pages (bakery, culinary, confectionery), the loyalty/bonus-app promotion section, and the careers page.', stack: ['Vue.js', 'Nuxt.js'], href: 'https://magnum.kz', featured: false, note: 'Contributed core customer-facing sections as part of the delivery team; not a solo build.' },
  { id: 'unistory', title: 'UniStory', category: 'AI & Web3', image: unistory_image, description: 'A digital product interface integrating crypto-wallet state and asynchronous backend data into reusable React product experiences.', stack: ['React', 'TypeScript', 'REST APIs', 'Web3'], href: 'https://unistory.app/ru/', featured: true },
  { id: 'kazmed', title: 'KazMedEngineering', category: 'Healthcare', image: kazmed_image, description: 'A corporate frontend for an authorized medical-equipment service partner, built around a Swiper-driven catalog of equipment and service lines instead of long text pages.', stack: ['Nuxt.js', 'Swiper'], href: 'https://www.kme.kz' },
  { id: 'dostyk-trans-terminal', title: 'Dostyk Trans Terminal', category: 'Corporate', image: dostyk_trans_terminal_image, description: 'A corporate website for a logistics terminal at the Dostyk–Alashankou border crossing, presenting container handling, storage and transshipment services.', stack: ['Nuxt.js', 'Vue.js'], href: 'https://www.dtt.kz/' },
  { id: 'melissa', title: 'Melissa', category: 'E-commerce', image: melissa_image, description: 'A large online pharmacy with 13,000+ products, including catalog navigation, search, filtering, sorting, product pages, cart flows and backend integrations.', stack: ['Nuxt.js', 'Vue.js', 'REST APIs'], href: 'https://melissaapteka.kz', note: 'A large catalogue experience where information architecture matters as much as UI polish.' },
  { id: 'abi-construction', title: 'ABI Construction', category: 'Corporate', image: abi_construction_image, description: 'A construction-company website pairing a WordPress content backend with Vue-driven project galleries and interactive UI on top.', stack: ['WordPress', 'Vue.js', 'PHP', 'SCSS'], href: 'https://abi-construction.kz' },
  { id: 'tahit', title: 'TAHIT', category: 'Corporate', image: tahit_image, description: 'A manufacturing-company frontend showcasing textile production capabilities, technologies, products and services across desktop and mobile.', stack: ['Vue.js'], href: 'https://tahit.kz' },
  { id: 'dobraya', title: 'Dobraya Pharmacy', category: 'E-commerce', image: dobraya_image, description: 'An online-pharmacy storefront with responsive catalogs, category navigation, search, filtering and product flows.', stack: ['HTML', 'JavaScript', 'SCSS', 'Bootstrap', 'jQuery'], href: 'https://dobraya-apteka.kz' },
  { id: 'asia-mebel', title: 'Asia Mebel', category: 'E-commerce', image: azm_trade_image, description: 'A commercial catalog for furniture materials, fittings, tools and services with structured navigation, filtering, search and product pages.', stack: ['1C Bitrix', 'PHP', 'JavaScript', 'SASS', 'Bootstrap'], href: 'https://asiamebel.com' },
  { id: 'pharmacom', title: 'Pharmacom', category: 'Healthcare', image: pharmacom_image, description: 'A healthcare website for a vaccination clinic and pharmacy network, organized around locations, services and patient information rather than one static homepage.', stack: ['JavaScript', 'HTML', 'CSS', 'Bootstrap', 'jQuery'], href: 'https://pharma.com.kz' },
  { id: 'navat', title: 'NAVAT', category: 'Hospitality', image: new_navat_image, description: 'A promotional restaurant landing page with a responsive visual experience built around menu, atmosphere and brand identity.', stack: ['JavaScript', 'HTML', 'CSS', 'jQuery'], href: 'https://newnavat.netlify.app' },
  { id: 'asia-credit-bank', title: 'AsiaCredit Bank', category: 'Finance', image: asia_credit_bank_image, description: 'A bank contact-center website turning a large set of product and support pages into a fast, easy-to-navigate structure for customers.', stack: ['PHP', 'HTML', 'JavaScript', 'SCSS'], href: 'https://asiacreditbank.kz' },
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
  tags: ['Django', 'Python', 'PostgreSQL', 'REST APIs'],
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
    text: 'Established a shared Vue 3/strict TypeScript component library and type-safe REST/GraphQL API layer across 10+ modules serving 1–3M users, built to WCAG AA standards — cutting feature implementation time by ~30%.',
  }, {
    label: 'Technical Leadership',
    text: 'Led frontend architectural decisions, driving sprint planning and backlog refinement for a team of 6 engineers; conducted ~15 GitLab merge-request reviews per week, lowering post-merge defects by 35%.',
  }, {
    label: 'Performance & Core Web Vitals',
    text: 'Optimized rendering, caching, and network request patterns across high-traffic modules, reducing interaction latency (INP) from ~280ms to ~150ms and dropping duplicate API calls by 40%.',
  }, {
    label: 'Modernization & Reliability',
    text: 'Modernized legacy Vue 2 codebases to Vue 3, Composition API, Pinia, and Vite, shrinking bundle size by 20%; strengthened reliability via Vitest/Jest testing, Sentry monitoring, and CI/CD workflows.',
  }, {
    label: 'Tooling, Mobile & AI',
    text: 'Structured codebases using Feature-Sliced Design and TanStack Query, trimming boilerplate by ~25%; extended the design system to an Ionic/Capacitor mobile app and deployed AI-assisted dev tooling (Cursor, Claude Code).',
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
      text: 'Directed an engineering department of 18 developers across 3 sub-teams, leading the shift to Scrum and setting technical direction to deliver 80+ large-scale regional projects and 100+ smaller digital-twin deployments, serving 1.5M+ active users across 4 countries.',
    }, {
      label: 'Solo Product Delivery',
      text: 'Independently architected and launched 10 enterprise platforms from scratch in 1–1.5 months each, cutting time-to-market by ~2x versus the company\'s historical average.',
    }, {
      label: 'Process & Governance',
      text: 'Led sprint planning, estimation, and technical documentation, conducting ~50 code reviews per week and establishing documentation standards that cut new-hire onboarding time by 40%.',
    }],
  }, {
    id: 'mid-senior',
    label: 'Middle → Senior',
    period: 'Jul 2021 — Sep 2023',
    role: 'Middle → Senior Software Engineer',
    highlights: [{
      label: 'Geospatial Performance',
      text: 'Reduced Mapbox GL JS rendering time by 40% (800ms → 480ms) and restructured Elasticsearch indexing/query patterns with memoized Vuex getters to cut search latency by 30% across 500K+ geo-objects.',
    }, {
      label: 'Frontend Architecture',
      text: 'Designed a shared Vue architecture (100+ FSD components), documented in a Storybook component library to standardize UI patterns across teams, reducing feature development cycle time by 50%.',
    }, {
      label: 'Backend & Data Design',
      text: 'Engineered 35+ Django/PostgreSQL REST endpoints with Redis caching and optimized PL/pgSQL stored procedures for large-scale geospatial datasets, maintaining 99.9% production uptime while generating type-safe API clients for frontend integration.',
    }, {
      label: 'DevOps & Automation',
      text: 'Designed a Vitest, Playwright, and Cypress testing strategy and enforced production quality gates via unified GitLab CI/CD pipelines across 86 repositories, lifting code coverage to 70–80% and cutting regression bugs by 30%.',
    }, {
      label: 'Design Systems & WCAG',
      text: 'Authored a CSS framework using design tokens, SCSS, and BEM methodologies built to WCAG AA standards, slashing UI implementation time from ~3 days down to ~4 hours.',
    }],
  }],
}, {
    id: 'dar',
  period: 'Jun 2020 — Jul 2021',
  company: 'DAR',
  role: 'Junior Software Engineer',
  focus: 'High-volume web delivery · e-commerce · mobile · performance',
  logo: dar_logo,
  summary: 'Technology group developing digital products and platforms across fintech, education, sports, and business operations.',
  highlights: [{
    label: 'Production Architecture',
    text: 'Delivered 30+ multi-page production applications (8+ pages each) while managing up to 3–4 concurrent projects, cutting delivery time by 25% (5–10 days/cycle) through a reusable Vue/React component library (34 components, BEM architecture).',
  }, {
    label: 'Platform Delivery',
    text: 'Independently architected and shipped two full-scale platforms — food delivery and accommodation booking — in ~1 month each, including GSAP-powered animations, supporting 150–200 restaurants across 3 cities and 100–150 property listings.',
  }, {
    label: 'Performance & SEO',
    text: 'Cut page load times by 40% (to 1.8–2.2s) via SSR, code splitting, lazy loading, and bundle optimization, achieving 100/100 Lighthouse SEO scores across most projects.',
  }, {
    label: 'Cross-Platform Development',
    text: 'Shipped 5–7 production mobile apps (iOS/Android) via Ionic, Capacitor, and React Native, sharing 40–50% of code across platforms.',
  }, {
    label: 'Backend & APIs',
    text: 'Built and maintained Laravel/MySQL REST backends — API design, database schema, and authentication — for 6 of these applications, handling 15K+ requests/day.',
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
    text: 'Selected as 1 of 3 engineering hires from 40+ applicants in a competitive technical hiring process.',
  }, {
    label: 'Frontend Development',
    text: 'Built responsive React/TypeScript interfaces and reusable component libraries, integrating APIs into production workflows; contributed to 5+ enterprise internal tools.',
  }, {
    label: 'Engineering Growth',
    text: 'Participated in enterprise-grade code reviews, unit testing, and delivery standards — a foundation carried into every role since.',
  }],
}, {
  id: 'freelance',
  period: '2019 — 2025',
  company: 'Independent Contractor',
  role: 'Freelance Software Engineer',
  focus: 'Freelance Vue/React development · full-cycle SaaS & e-commerce delivery · client management',
  location: 'Remote (international clients)',
  summary: 'Independent freelance and contract work for international clients, run alongside full-time roles.',
  highlights: [{
    label: 'Client Delivery',
    text: 'Delivered 40+ international Vue/React projects (SaaS, e-commerce) with a 100% on-time rate and 5.0 rating, owning full SDLC from client discovery to production, including complex third-party API integrations.',
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
