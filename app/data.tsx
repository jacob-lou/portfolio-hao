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
} from "lucide-react";

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

export const site = {
  title: "Fight On. Code On.",
  subtitle:
    "A USC-spirited portfolio with bold typography, glass layers, and motion that feels like momentum.",
  ctas: [
    { label: "View Projects", href: "/projects" },
    { label: "Download Resume", href: "/resume#download" },
  ],
  resumePdf: {
    label: "Download PDF",
    href: "/resume.pdf", // 你可以把简历 PDF 放到 /public/resume.pdf
  },
};

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export const profile = {
  name: "Your Name",
  role: "Frontend Engineer · Web/Brand Designer",
  school: "USC (University of Southern California)",
  location: "Los Angeles, CA",
  tagline:
    "I build high-impact interfaces with brand precision, motion discipline, and engineering reliability.",
  links: [
    { label: "Email", href: "mailto:you@example.com", icon: Mail },
    { label: "LinkedIn", href: "https://linkedin.com/in/your", icon: Linkedin },
    { label: "GitHub", href: "https://github.com/your", icon: Github },
  ],
};

export const resumeSections: ResumeSection[] = [
  {
    id: "education",
    title: "Education",
    icon: <GraduationCap className="h-5 w-5" />,
    items: [
      {
        heading: "University of Southern California",
        subheading: "B.S. / M.S. (Your Program Here)",
        meta: "Expected 20XX · Los Angeles",
        chips: [{ label: "GPA: X.XX" }, { label: "Dean’s List" }, { label: "Scholarship" }],
        bullets: [
          "Focus: Human-centered interfaces, systems thinking, and applied ML for product experiences.",
          "Selected coursework: Web Systems, Interaction Design, Data Structures, Visual Communication.",
        ],
      },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    icon: <Code2 className="h-5 w-5" />,
    items: [
      {
        heading: "Frontend",
        chips: [{ label: "Next.js" }, { label: "TypeScript" }, { label: "Tailwind" }, { label: "Motion" }],
        bullets: [
          "App Router architecture, component systems, accessible UI states, performance budgeting.",
          "Design-engineer workflows: tokens → components → interactions → QA.",
        ],
      },
      {
        heading: "Design",
        chips: [{ label: "Brand Systems" }, { label: "Typography" }, { label: "Figma" }, { label: "Motion Spec" }],
        bullets: [
          "Glass layers, depth cues, and kinetic hierarchy without visual overload.",
          "Grid systems + editorial typography for authority and clarity.",
        ],
      },
    ],
  },
  {
    id: "experience",
    title: "Experience",
    icon: <Sparkles className="h-5 w-5" />,
    items: [
      {
        heading: "Frontend / Design Engineer (Example)",
        subheading: "Company · Internship",
        meta: "20XX — 20XX",
        chips: [{ label: "Next.js" }, { label: "Framer Motion" }, { label: "Design Systems" }],
        bullets: [
          "Built reusable UI primitives and improved perceived performance via motion + skeleton patterns.",
          "Partnered with stakeholders to translate brand voice into scalable components and pages.",
        ],
      },
    ],
  },
  {
    id: "research",
    title: "Research",
    icon: <FlaskConical className="h-5 w-5" />,
    items: [
      {
        heading: "Applied Interaction / ML (Example)",
        meta: "Lab / Group · USC",
        chips: [{ label: "Prototyping" }, { label: "Evaluation" }, { label: "Data" }],
        bullets: [
          "Explored how micro-interactions influence trust and comprehension in complex dashboards.",
        ],
      },
    ],
  },
  {
    id: "awards",
    title: "Awards",
    icon: <Trophy className="h-5 w-5" />,
    items: [
      {
        heading: "USC Recognition (Example)",
        meta: "20XX",
        chips: [{ label: "Leadership" }, { label: "Design" }],
        bullets: ["Awarded for excellence in communication and craft in a cross-disciplinary project."],
      },
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Fight On Portfolio System",
    blurb:
      "A USC-brand multi-page portfolio with glass depth, dynamic background texture, and disciplined motion patterns for a premium feel.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Framer Motion"],
    links: [
      { label: "GitHub", href: "https://github.com/your/repo" },
      { label: "Demo", href: "https://example.com" },
      { label: "Read More", href: "/projects" },
    ],
  },
  {
    title: "Design Token Playground",
    blurb:
      "A token-driven component playground that keeps typography, spacing, shadows, and color roles consistent across pages.",
    tags: ["Design System", "Tokens", "A11y", "UI Engineering"],
    links: [
      { label: "GitHub", href: "https://github.com/your/repo2" },
      { label: "Demo", href: "https://example.com" },
    ],
  },
  {
    title: "Interactive Card Motion Lab",
    blurb:
      "3D hover cards with subtle perspective and highlight-follow effects, tuned to avoid dizziness while preserving impact.",
    tags: ["Motion", "3D Hover", "Micro-interactions"],
    links: [
      { label: "GitHub", href: "https://github.com/your/repo3" },
      { label: "Demo", href: "https://example.com" },
    ],
  },
];

export const contactInfo = {
  title: "Let’s build something that feels inevitable.",
  note:
    "No backend required here — the form is a polished UI simulation with realistic states (focus/hover/loading/disabled).",
  details: [
    { icon: Mail, label: "Email", value: "you@example.com", href: "mailto:you@example.com" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/your", href: "https://linkedin.com/in/your" },
    { icon: Github, label: "GitHub", value: "github.com/your", href: "https://github.com/your" },
    { icon: MapPin, label: "Location", value: "Los Angeles, CA", href: "#" },
  ],
  resumeCtaIcon: FileDown,
};