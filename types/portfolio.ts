export interface Signal {
  value: string;
  label: string;
  note: string;
}

export interface CaseStudy {
  index: string;
  company: string;
  kicker: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  metrics: Array<{ value: string; label: string }>;
  stack: string[];
}

export interface Surface {
  index: string;
  title: string;
  text: string;
  tags: string[];
  variant: 'grid' | 'map' | 'flow' | 'pulse';
}

export interface Principle {
  number: string;
  title: string;
  text: string;
}

export interface MilestoneHighlight {
  label: string;
  text: string;
}

export interface MilestoneRole {
  id: string;
  label: string;
  role: string;
  period: string;
  highlights: MilestoneHighlight[];
}

export interface Milestone {
  id?: string;
  period: string;
  company: string;
  role: string;
  focus: string;
  logo?: string;
  location?: string;
  summary?: string;
  highlights?: MilestoneHighlight[];
  roles?: MilestoneRole[];
}

export interface ProofItem {
  label: string;
  value: string;
  note: string;
  href?: string;
  logo?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  image_width: number;
  image_height: number;
  description: string;
  stack: string[];
  href?: string;
  featured?: boolean;
  note?: string;
}

export interface ProofDocument {
  slug: string;
  kind: 'certificate' | 'recommendation';
  title: string;
  issuer: string;
  date: string;
  description: string;
  file?: string;
  file_type?: 'image' | 'pdf';
}

// A post is a list of typed blocks instead of Markdown: no extra dependency,
// and everything renders as escaped text.
export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; language: string; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  // ISO date (YYYY-MM-DD), formatted per language when shown.
  date: string;
  summary: string;
  tags: string[];
  blocks: BlogBlock[];
}
