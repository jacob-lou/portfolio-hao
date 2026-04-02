import type { ReactNode } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  FileDown,
  Sparkles,
  Code2,
  Trophy,
  FlaskConical,
  ShieldCheck,
  Globe,
  Cpu,
  LineChart,
  Database,
  Layers,
  Beaker,
} from "lucide-react";

// ── JSON content (CLI-writable, no JSX) ──
import profileJSON from "./content/profile.json";
import resumeJSON from "./content/resume.json";
import projectsJSON from "./content/projects.json";
import type { ResumeSectionJSON, ProjectJSON, ProfileJSON } from "./content/schema";

export type NavItem = { href: string; label: string };

export type Chip = { label: string };

export type ResumeSection = {
  id: string;
  title: string;
  icon: ReactNode;
  items: Array<{
    heading: string;
    subheading?: string;
    meta?: string;
    chips?: Chip[];
    bullets?: string[];
  }>;
};

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  links: Array<{ label: string; href: string }>;
};

export type Stat = { value: number | string; label: string };

// ── Icon maps: iconId → JSX (keeps JSX out of JSON files) ──
const sectionIconMap: Record<string, ReactNode> = {
  education: <GraduationCap className="h-5 w-5" />,
  skills: <Code2 className="h-5 w-5" />,
  experience: <Sparkles className="h-5 w-5" />,
  projects: <Layers className="h-5 w-5" />,
  honors: <Trophy className="h-5 w-5" />,
};

const linkIconMap: Record<string, typeof Mail> = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
};

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/match", label: "Match Me" },
];

export const site = {
  title: "Fight On. Code On.",
  subtitle:
    "USC energy, Cardinal + Gold. I design and ship interfaces that feel inevitable — bold typography, glass depth, disciplined motion.",
  ctas: [
    { label: "View Projects", href: "/projects" },
    { label: "Contact Me", href: "/contact" },
  ],
  resumePdfs: {
    swe: { label: "Resume (SWE · 2026)", href: "/Hao_Lou_resume_SWE_2026.pdf" },
    mle: { label: "Resume (MLE · 2026)", href: "/Hao_Lou_resume_MLE_2026.pdf" },
  },
};


// ── Profile (assembled from JSON + icon map) ──
const pj = profileJSON as ProfileJSON;
export const profile = {
  ...pj,
  links: pj.links.map((l) => ({
    label: l.label,
    href: l.href,
    icon: linkIconMap[l.iconId] ?? Mail,
  })),
};

// ── Resume sections (assembled from JSON + icon map) ──
export const resumeSectionsAll: ResumeSection[] = (resumeJSON as ResumeSectionJSON[]).map((sec) => ({
  id: sec.id,
  title: sec.title,
  icon: sectionIconMap[sec.iconId] ?? <Code2 className="h-5 w-5" />,
  items: sec.items,
}));

// ── Projects (direct from JSON, no JSX needed) ──
export const projects: Project[] = projectsJSON as ProjectJSON[];

export const contactInfo = {
  title: "Let’s build something with USC energy.",
  note:
    "This form is a polished UI simulation (no backend) with realistic focus/hover/loading/disabled states.",
  details: [
    { icon: Mail, label: "Email", value: "jacoblou0924@gmail.com", href: "mailto:jacoblou0924@gmail.com" },
    { icon: MapPin, label: "Location", value: "Los Angeles, CA", href: "#" },
    { icon: Globe, label: "LinkedIn", value: "Linkedin Profile", href: "https://www.linkedin.com/in/REPLACE_THIS" },
    { icon: Github, label: "GitHub", value: "github.com/…", href: "https://github.com/REPLACE_THIS" },
  ],
  quickBadges: [
    { icon: Cpu, label: "Next.js / React" },
    { icon: Database, label: "Spring Boot / MySQL" },
    { icon: LineChart, label: "Optimization / ML" },
    { icon: Beaker, label: "Automation" },
  ],
  resumeCtaIcon: FileDown,
};