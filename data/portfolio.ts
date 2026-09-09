import portrait from '@/assets/images/image.png';
import cv from '@/assets/files/Zhassulan_Serikuly-CV.pdf';
import recommendation_keyhorse from '@/assets/files/recommendation_keyhorse.pdf';
import ciklum_logo from '@/assets/logos/ciklum.svg';
import keyhorse_logo from '@/assets/logos/keyhorse.svg';
import dar_logo from '@/assets/logos/dar.svg';
import epam_logo from '@/assets/logos/epam.svg';
import sdu_logo from '@/assets/logos/sdu.svg';
import geonomix_image from '@/assets/images/projects/geonomix.png';
import melissa_image from '@/assets/images/projects/melissa.png';
import rento_image from '@/assets/images/projects/rento.png';
import tez_zhet_image from '@/assets/images/projects/tez-zhet.png';
import kostyum_image from '@/assets/images/projects/kostyum.png';
import midas_event_image from '@/assets/images/projects/midas-event.png';
import dostyk_trans_terminal_image from '@/assets/images/projects/dostyk-trans-terminal.png';
import unistory_image from '@/assets/images/projects/unistory.png';
import kazmed_image from '@/assets/images/projects/kazmed.png';
import abi_construction_image from '@/assets/images/projects/abi-construction.png';
import tahit_image from '@/assets/images/projects/tahit.png';
import dobraya_image from '@/assets/images/projects/dobraya.png';
import qazbooking_image from '@/assets/images/projects/qazbooking.png';
import azm_trade_image from '@/assets/images/projects/azm-trade.png';
import pharmacom_image from '@/assets/images/projects/pharmacom.png';
import mobi_event_image from '@/assets/images/projects/mobi-event.png';
import new_navat_image from '@/assets/images/projects/new-navat.png';
import qonys_toi_image from '@/assets/images/projects/qonys-toi.png';
import qazaq_taxi_image from '@/assets/images/projects/qazaq-taxi.png';
import yaq_image from '@/assets/images/projects/yaq.png';
import asia_credit_bank_image from '@/assets/images/projects/asia-credit-bank.png';
import ikeruen_image from '@/assets/images/projects/ikeruen.png';
import rakhat_image from '@/assets/images/projects/rakhat.png';
import m1_service_image from '@/assets/images/projects/m1-service.png';
import type { CaseStudy, Milestone, Principle, ProofItem, Project, Signal, Surface } from '@/types/portfolio';

export const portfolio_assets = { portrait, cv };

export const nav_items = [
  { label: 'Signals', href: '#signals' }, { label: 'Cases', href: '#cases' }, { label: 'Builds', href: '#builds' }, { label: 'Path', href: '#path' }, { label: 'Contact', href: '#contact' },
];

export const signals: Signal[] = [
  { value: '6+', label: 'years in production', note: 'From React internship work to senior ownership across international product teams.' }, { value: '10+', label: 'product modules', note: 'Architecture evolved across a high-traffic Vue 3 / TypeScript platform.' }, { value: '1M+', label: 'annual users', note: 'Production interfaces operating at meaningful product scale.' }, { value: '3.2 → 2.1s', label: 'page load', note: 'Rendering, caching, async flows and request patterns treated as one system.' },
];

export const case_studies: CaseStudy[] = [
  {
    index: '01',
    company: 'Ciklum',
    kicker: 'Architecture at product scale',
    title: 'Make ten modules feel like one system.',
    problem: 'A growing Vue product surface had to stay coherent while 10+ modules evolved in parallel for a platform serving more than one million users annually.',
    solution: 'Defined reusable Vue 3 / TypeScript patterns around composition, routing, state and shared product workflows so new features could start from an established system instead of local conventions.',
    result: 'The architecture reduced feature implementation time by roughly 30% while creating a stronger base for cross-module development.',
    metrics: [{ value: '10+', label: 'product modules' }, { value: '~30%', label: 'faster feature delivery' }],
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Vue Router', 'Composition API', 'Vite'],
  }, {
    index: '02',
    company: 'Ciklum',
    kicker: 'Performance as architecture',
    title: 'Treat loading time as a graph, not a number.',
    problem: 'High-traffic screens were slowed by work happening across rendering, data fetching, caching and asynchronous UI flows rather than one obvious bottleneck.',
    solution: 'Optimized the full request-to-render path: rendering behavior, caching, async orchestration and API request patterns, then backed the work with Core Web Vitals, Lighthouse, tests and Sentry monitoring.',
    result: 'Average page load time moved from about 3.2 seconds to 2.1 seconds while the platform continued to evolve.',
    metrics: [{ value: '3.2 → 2.1s', label: 'average page load' }, { value: '34%', label: 'approx. reduction' }],
    stack: ['Core Web Vitals', 'Lighthouse', 'Vitest', 'Jest', 'Sentry', 'CI/CD'],
  }, {
    index: '03',
    company: 'KeyHorse',
    kicker: 'Geospatial performance',
    title: 'Half a million map objects should still feel interactive.',
    problem: 'Dense GIS interfaces had to render and manipulate datasets containing roughly 300K–500K geospatial objects without making the first interaction feel delayed.',
    solution: 'Restructured layers and styles, introduced clustering and client-side filtering, and tightened the Vuex-to-Elasticsearch data path to eliminate repeated work.',
    result: 'Initial Mapbox GL JS rendering dropped from about 800ms to 480ms, with a 30% improvement in geospatial search response time from separate algorithm work.',
    metrics: [{ value: '800 → 480ms', label: 'initial map render' }, { value: '300K–500K', label: 'geospatial objects' }],
    stack: ['Vue.js', 'Mapbox GL JS', 'Vuex', 'Elasticsearch', 'Performance Profiling'],
  }, {
    index: '04',
    company: 'KeyHorse',
    kicker: 'Reusable delivery systems',
    title: 'Build the next regional product by configuring, not copying.',
    problem: 'Dozens of regional GIS products shared recurring UI and data patterns, but repeated implementations made delivery slower and consistency expensive.',
    solution: 'Created a centralized architecture with 100+ reusable Vue components and shared modules, then standardized BEM, theming, role-aware patterns, linting and test practices around it.',
    result: 'Similar implementation work dropped by up to 50%; some launches that previously took about a month could be completed in roughly a week.',
    metrics: [{ value: '100+', label: 'reusable components' }, { value: '1 month → 1 week', label: 'similar implementations' }],
    stack: ['Vue.js', 'TypeScript', 'BEM', 'Vitest', 'Playwright', 'GitLab CI/CD'],
  },
];


export const projects: Project[] = [
  { id: 'geonomix', title: 'Geonomix', category: 'GIS & Platforms', image: geonomix_image, description: 'A large-scale geospatial and digital-twin platform combining interactive maps, municipal data, digital registries, government services and monitoring tools across regional deployments.', stack: ['Vue.js', 'Vuex', 'Mapbox GL JS', 'Django', 'PostgreSQL', 'Elasticsearch'], href: 'https://iulytau.kz', featured: true, note: 'Map-first product where data volume and reusable regional delivery shaped the frontend architecture.' }, { id: 'melissa', title: 'Melissa', category: 'E-commerce', image: melissa_image, description: 'A large online pharmacy with 13,000+ products, including catalog navigation, search, filtering, sorting, product pages, cart flows and backend integrations.', stack: ['Nuxt.js', 'Vue.js', 'REST APIs'], href: 'https://melissaapteka.kz', featured: true, note: 'A large catalogue experience where information architecture matters as much as UI polish.' }, { id: 'rento', title: 'Rento', category: 'Booking', image: rento_image, description: 'A sports-facility booking platform with customer and host experiences, authentication, availability, reservations and a custom administration panel.', stack: ['React', 'Redux', 'Firebase'], href: 'https://rentokz.netlify.app', featured: true, note: 'Multi-role product state and booking workflows in one frontend.' }, { id: 'tez-zhet', title: 'Tez Zhet', category: 'Delivery', image: tez_zhet_image, description: 'A mobile-first food and grocery delivery product covering discovery, search, cart, checkout, addresses, authentication, orders and backend API integration.', stack: ['Nuxt.js', 'Vue.js', 'REST APIs'], href: 'https://apps.apple.com/sk/app/tezzhet/id6473077229', featured: true, note: 'End-to-end transactional flows optimized for mobile use.' },
  { id: 'kostyum', title: 'Kostyum.kz', category: 'E-commerce', image: kostyum_image, description: 'A responsive men’s fashion e-commerce frontend with reusable product-catalog UI and a focus on a smooth desktop and mobile shopping experience.', stack: ['Nuxt.js', 'Vue.js', 'SSR'], href: 'https://kostyum.kz' }, { id: 'midas-event', title: 'Midas Event', category: 'Corporate', image: midas_event_image, description: 'An event-agency website presenting services, projects and event work through responsive pages and interactive frontend elements.', stack: ['React', 'JavaScript', 'CSS'], href: 'https://midasevent.kz' }, { id: 'dostyk-trans-terminal', title: 'Dostyk Trans Terminal', category: 'Corporate', image: dostyk_trans_terminal_image, description: 'A corporate website for a logistics terminal at the Dostyk–Alashankou border crossing, presenting container handling, storage and transshipment services.', stack: ['Nuxt.js', 'Vue.js'], href: 'https://www.dtt.kz/' }, { id: 'unistory', title: 'UniStory', category: 'AI & Web3', image: unistory_image, description: 'A digital product interface integrating crypto-wallet state and asynchronous backend data into reusable React product experiences.', stack: ['React', 'TypeScript', 'REST APIs', 'Web3'], href: 'https://unistory.app/ru/' },
  { id: 'kazmed', title: 'KazMedEngineering', category: 'Healthcare', image: kazmed_image, description: 'A responsive corporate frontend for an authorized medical-equipment service partner, presenting expertise and technical service offerings.', stack: ['Nuxt.js', 'Swiper'], href: 'https://www.kme.kz' }, { id: 'abi-construction', title: 'ABI Construction', category: 'Corporate', image: abi_construction_image, description: 'A construction-company website with responsive interfaces, dynamic functionality and content-management features.', stack: ['WordPress', 'Vue.js', 'PHP', 'SCSS'], href: 'https://abi-construction.kz' }, { id: 'tahit', title: 'TAHIT', category: 'Corporate', image: tahit_image, description: 'A manufacturing-company frontend showcasing textile production capabilities, technologies, products and services across desktop and mobile.', stack: ['Vue.js'], href: 'https://tahit.kz' }, { id: 'dobraya', title: 'Dobraya Pharmacy', category: 'E-commerce', image: dobraya_image, description: 'An online-pharmacy storefront with responsive catalogs, category navigation, search, filtering and product flows.', stack: ['HTML', 'JavaScript', 'SCSS', 'Bootstrap', 'jQuery'], href: 'https://dobraya-apteka.kz' },
  { id: 'qazbooking', title: 'QazBooking', category: 'Booking', image: qazbooking_image, description: 'An accommodation-booking platform for hostels and recreation centers with search, filters, authentication, property pages and reservation flows.', stack: ['1C Bitrix', 'PHP', 'JavaScript', 'SASS', 'Bootstrap'], href: 'https://qazbooking.kz' }, { id: 'asia-mebel', title: 'Asia Mebel', category: 'E-commerce', image: azm_trade_image, description: 'A commercial catalog for furniture materials, fittings, tools and services with structured navigation, filtering, search and product pages.', stack: ['1C Bitrix', 'PHP', 'JavaScript', 'SASS', 'Bootstrap'], href: 'https://asiamebel.com' }, { id: 'pharmacom', title: 'Pharmacom', category: 'Healthcare', image: pharmacom_image, description: 'A healthcare website for a vaccination clinic and pharmacy network, presenting services and customer information.', stack: ['JavaScript', 'HTML', 'CSS', 'Bootstrap', 'jQuery'], href: 'https://pharma.com.kz' }, { id: 'mobievent', title: 'MobiEvent', category: 'Events', image: mobi_event_image, description: 'An industry-event website focused on mobile services, digital payments and financial technologies across Kazakhstan and the CIS region.', stack: ['Nuxt.js', 'Vue.js'], href: 'https://mobievent.kz' },
  { id: 'navat', title: 'NAVAT', category: 'Hospitality', image: new_navat_image, description: 'A promotional restaurant landing page with a responsive visual experience built around menu, atmosphere and brand identity.', stack: ['JavaScript', 'HTML', 'CSS', 'jQuery'], href: 'https://newnavat.netlify.app' }, { id: 'event-invitation', title: 'Event Invitation', category: 'Events', image: qonys_toi_image, description: 'A custom event-invitation website with a responsive React interface and interactive guest-facing details.', stack: ['React'], href: 'https://qonys-toi.netlify.app' }, { id: 'qazaq-taxi', title: 'QAZAQ TAXI', category: 'Mobility', image: qazaq_taxi_image, description: 'A ride-hailing frontend with responsive interfaces and core ride-booking flows across mobile and desktop experiences.', stack: ['Vue.js', 'Nuxt.js', 'Vuetify'], href: 'https://play.google.com/store/apps/details?id=com.user.qazaqtaxi&hl=en&gl=US' }, { id: 'yaq', title: 'YAQ', category: 'E-commerce', image: yaq_image, description: 'An outdoor and sports e-commerce experience with large-catalog navigation, search, filtering, sorting and product pages.', stack: ['React'], href: 'https://yaq.kz' },
  { id: 'asia-credit-bank', title: 'AsiaCredit Bank', category: 'Finance', image: asia_credit_bank_image, description: 'A customer-facing bank contact-center website with responsive interfaces and interactive functionality for product and support information.', stack: ['PHP', 'HTML', 'JavaScript', 'SCSS'], href: 'https://asiacreditbank.kz' }, { id: 'ikeruen', title: 'IKeruen', category: 'Logistics', image: ikeruen_image, description: 'A corporate frontend for a freight-transportation company presenting logistics services and company information.', stack: ['Nuxt.js', 'Vue.js'], href: 'https://ikeruen.kz' }, { id: 'rakhat', title: 'Rakhat Qazaqstan Óneri', category: 'Culture', image: rakhat_image, description: 'A digital cultural project showcasing contemporary Kazakh art, artists and creative heritage.', stack: ['Vue.js'], href: 'https://rakhat.a-lux.dev' }, { id: 'm1-service', title: 'M1 Service', category: 'Automotive', image: m1_service_image, description: 'A corporate website for an automotive-service network providing maintenance, diagnostics and repair services.', stack: ['Nuxt.js', 'TypeScript'], href: 'https://m1-service.netlify.app' },
];

export const featured_projects = projects.filter((project) => project.featured);

export const surfaces: Surface[] = [
  { index: 'A', title: 'High-traffic product modules', text: 'Interfaces where architecture, caching, state and API behavior have to work as one product system.', tags: ['Vue 3', 'TypeScript', 'Pinia', 'Vite'], variant: 'grid' }, { index: 'B', title: 'Geospatial systems', text: 'Map-heavy products where data volume changes the frontend architecture, not just the rendering layer.', tags: ['Mapbox GL JS', 'Elasticsearch', 'GIS', 'Data-intensive UI'], variant: 'map' }, { index: 'C', title: 'Modernization programs', text: 'Legacy-to-modern migrations that keep product delivery moving while the technical foundation changes underneath.', tags: ['Vue 2 → Vue 3', 'Composition API', 'Testing', 'CI/CD'], variant: 'flow' }, { index: 'D', title: 'End-to-end product delivery', text: 'Frontend-first engineering with enough backend depth to own APIs, integration boundaries and production behavior.', tags: ['Django REST', 'Python', 'PostgreSQL', 'REST APIs'], variant: 'pulse' },
];

export const principles: Principle[] = [
  { number: '01', title: 'Measure before rewriting.', text: 'A performance change should begin with evidence and end with a user-visible outcome.' }, { number: '02', title: 'Architecture is a delivery tool.', text: 'The best abstraction is the one that makes the next feature cheaper, safer and easier to understand.' }, { number: '03', title: 'Frontend is part of the system.', text: 'Rendering, data shape, APIs, accessibility, observability and release pipelines are one engineering surface.' }, { number: '04', title: 'Senior means reducing uncertainty.', text: 'Technical leadership is making trade-offs visible so a team can move quickly without accumulating hidden risk.' },
];

export const milestones: Milestone[] = [
  { period: '2025 — 2026', company: 'Ciklum', role: 'Senior Software Engineer', focus: 'Frontend architecture · product modernization · performance · technical leadership', logo: ciklum_logo }, { period: '2021 — 2025', company: 'KeyHorse', role: 'Software Engineer → Senior · Team Lead', focus: 'GIS · digital twins · reusable systems · backend APIs · mentoring', logo: keyhorse_logo }, { period: '2020 — 2021', company: 'DAR', role: 'Junior Software Engineer', focus: 'High-volume web delivery · e-commerce · mobile · performance', logo: dar_logo }, { period: '2020', company: 'EPAM Systems', role: 'Software Engineer Intern', focus: 'React · TypeScript · reusable UI · engineering foundations', logo: epam_logo },
];

export const proof_items: ProofItem[] = [
  { label: 'Education', value: 'Information Systems', note: 'Suleyman Demirel University · 2018–2022 · GPA 3.72 / 4.0', logo: sdu_logo }, { label: 'English', value: 'IELTS 7.0', note: 'Academic IELTS · CEFR C1 result' }, { label: 'Recognition', value: 'Silver Medal', note: 'INFOMATRIX-ASIA 2018' }, { label: 'Reference', value: 'KeyHorse', note: 'Signed recommendation from company leadership', href: recommendation_keyhorse },
];
