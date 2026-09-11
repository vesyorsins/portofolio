export interface ArchitectureNode {
  name: string;
  type: string;
  latency: string;
}

export interface ProjectTelemetry {
  status: string;
  rps: string;
  p99: string;
  pipeline: ArchitectureNode[];
}

export interface ProjectItem {
  id: string;
  serial: string;
  title: string;
  category: "Full-Stack Web" | "Cloud & DevOps" | "Cybersecurity" | "Machine Learning & AI";
  role: string;
  year: string;
  tagline: string;
  description: string;
  metrics: string;
  technologies: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  telemetry: ProjectTelemetry;
}

export interface ChampionshipCard {
  number: string;
  badge: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  stats: string;
  bullets: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  serial: string;
  date: string;
  category: string;
  skills: string[];
  verified: boolean;
}

export interface SkillItem {
  name: string;
  level: number;
  category: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  tagline: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  summary: string;
  achievements: string[];
  skills: string[];
}

export interface StatMetric {
  label: string;
  value: string;
  subtext: string;
}

export interface SiteSettings {
  name: string;
  headline: string;
  specializingRoles: string[];
  bio: string;
  directEmail: string;
  avatarImage: string;
  location: string;
  timezone: string;
  availabilityStatus: string;
  specBadge: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  discordHandle: string;
  jackTitle: string;
  jackSubtitle: string;
  jackQuote: string;
  jackPills: string[];
  stats: StatMetric[];
  marqueeLine1: string;
  marqueeLine2: string;
  manifestoTag: string;
  manifestoText: string;
}

export interface NavLink {
  name: string;
  href: string;
  id: string;
}

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
}
