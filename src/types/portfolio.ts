export interface Project {
  id: string;
  title: string;
  kicker: string;
  tagline: string;
  category: 'Distributed Systems' | 'High-Throughput Java' | 'Quantitative Engine' | 'Cloud Infrastructure';
  technologies: string[];
  metrics: { label: string; value: string }[];
  overview: string;
  architectureDetails: string[];
  tradeoffs: string;
  codeSnippet?: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  iconName: string;
  skills: { name: string; proficiency: number; context: string }[];
  highlights: string[];
}

export interface Methodology {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  impactMetrics: string[];
  technologies: string[];
}

export interface BenchmarkModel {
  name: string;
  description: string;
  metricLabel: string;
  unit: string;
  competitors: { name: string; value: number; baselineNote: string; isOptimal?: boolean }[];
  complexity: { time: string; space: string };
  insight: string;
}
