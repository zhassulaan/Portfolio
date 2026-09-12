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

export interface ProofDocument {
  slug: string;
  kind: 'certificate' | 'recommendation';
  title: string;
  issuer: string;
  date: string;
  description: string;
  /** Import from assets/files/... once the real scan is added; see PROOF_GUIDE.md. */
  file?: string;
  file_type?: 'image' | 'pdf';
}
