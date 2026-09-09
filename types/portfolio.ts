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

export interface Milestone {
  period: string;
  company: string;
  role: string;
  focus: string;
  logo: string;
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
  description: string;
  stack: string[];
  href?: string;
  featured?: boolean;
  note?: string;
}
