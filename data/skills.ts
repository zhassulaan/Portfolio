export interface SkillGroup {
  key: string;
  label: string;
  items: string[];
}

// Group labels are translated via cv_page.skill_* keys below; the items
// themselves are product/technology names and stay as-is in every locale.
export const skill_groups: SkillGroup[] = [{
  key: 'frontend',
  label: 'Frontend',
  items: ['React', 'Next.js', 'Vue.js', 'Nuxt.js', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Mapbox GL JS']
}, {
  key: 'state',
  label: 'State Management',
  items: ['Redux', 'Pinia', 'Zustand', 'TanStack Query']
}, {
  key: 'backend',
  label: 'Backend & APIs',
  items: ['Node.js', 'NestJS', 'Express.js', 'FastAPI', 'Python', 'REST APIs', 'GraphQL', 'OpenAPI', 'WebSockets', 'Microservices', 'DDD', 'RBAC']
}, {
  key: 'database',
  label: 'Database & Messaging',
  items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Apache Kafka', 'RabbitMQ']
}, {
  key: 'mobile',
  label: 'Mobile / Cross-Platform',
  items: ['React Native', 'Ionic', 'Capacitor', 'PWA']
}, {
  key: 'architecture',
  label: 'Architecture',
  items: ['Frontend Architecture', 'Feature-Sliced Design (FSD)', 'Server-Side Rendering (SSR)', 'React Server Components', 'Design Systems', 'Micro-Frontends', 'Storybook', 'Object-Oriented Programming (OOP)', 'BEM', 'WCAG AA Accessibility', 'i18n']
}, {
  key: 'performance',
  label: 'Performance',
  items: ['Core Web Vitals (LCP/INP/CLS)', 'Performance Profiling', 'Code Splitting', 'Lazy Loading', 'Bundle Optimization', 'Tree Shaking', 'Technical SEO']
}, {
  key: 'testing',
  label: 'Testing & Quality',
  items: ['Vitest', 'Jest', 'Playwright', 'Cypress', 'Unit Testing', 'Integration Testing', 'E2E Testing', 'ESLint']
}, {
  key: 'tools',
  label: 'Cloud & DevOps',
  items: ['Git', 'GitLab CI/CD', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Terraform', 'Grafana', 'Sentry', 'Vite', 'Webpack', 'Monorepo Tooling (Nx/Turborepo/pnpm)']
}, {
  key: 'process',
  label: 'Engineering & Leadership',
  items: ['Technical Leadership', 'Software Architecture', 'Code Review', 'Mentoring', 'Scrum', 'Kanban', 'Task Decomposition & Estimation', 'Technical Documentation', 'SDLC', 'Developer Experience (DX)']
}, {
  key: 'ai',
  label: 'AI-Assisted Development',
  items: ['Cursor', 'Claude Code', 'GitHub Copilot']
}];
