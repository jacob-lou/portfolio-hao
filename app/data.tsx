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

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
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
    swe: { label: "Download SWE PDF", href: "/Hao_Lou_resume_SWE.pdf" },
    mle: { label: "Download MLE PDF", href: "/Hao_Lou_resume_MLE.pdf" },
  },
};

export const profile = {
  name: "Hao Lou",
  role: "Frontend Engineer · Software Engineer · Applied Math @ USC",
  school: "University of Southern California",
  location: "Los Angeles, CA",
  email: "jacoblou0924@gmail.com",
  phone: "(561) 765-0543",

  // Home hero copy（校园精神/学生感更强）
  introHeadline: "Fight On! ✌️  Hi, I’m",
  introName: "Hao",
  introSubline:
    "I’m studying Applied & Computational Mathematics at USC (minor in Computer Science), building reliable web products and data-driven systems — from Next.js civic platforms to full-stack BI tools and ML-oriented optimization.",
  photoSrc: "/profile.jpg",
  photoAlt: "Hao Lou portrait",

  // 用真实信息做 stats（避免瞎编年限/项目数）
  stats: [
    { value: "3.85/4.0", label: "GPA (USC)" }, //  [oai_citation:6‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)
    { value: "Platinum", label: "USACO Division" }, //  [oai_citation:7‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)
    { value: "Top 30%", label: "Kaggle AMP® (1,805 teams)" }, //  [oai_citation:8‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)
    { value: "100+", label: "Users supported (Code the Change)" }, //  [oai_citation:9‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)  [oai_citation:10‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
  ] as Stat[],

  links: [
    { label: "Email", href: "mailto:jacoblou0924@gmail.com", icon: Mail },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/REPLACE_THIS", // 你把真实链接填上
      icon: Linkedin,
    },
    { label: "GitHub", href: "https://github.com/REPLACE_THIS", icon: Github },
  ],
};

export const resumeSectionsByTrack: Record<"swe" | "mle", ResumeSection[]> = {
  // SWE 版本：强调技术栈 + 全栈项目
  swe: [
    {
      id: "education",
      title: "Education",
      icon: <GraduationCap className="h-5 w-5" />,
      items: [
        {
          heading: "University of Southern California",
          subheading: "B.S. Applied & Computational Mathematics · Minor: Computer Science",
          meta: "Aug 2024 — May 2028 · Los Angeles",
          chips: [{ label: "GPA: 3.85/4.0" }], //  [oai_citation:11‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
          bullets: [
            "Coursework: Data Structure, Discrete Methods, Numerical Methods, Probability Theory, Web Development.",
          ], //  [oai_citation:12‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
        },
      ],
    },
    {
      id: "skills",
      title: "Skills",
      icon: <Code2 className="h-5 w-5" />,
      items: [
        {
          heading: "Tech Stack",
          chips: [
            { label: "Java" },
            { label: "Python" },
            { label: "C++" },
            { label: "JavaScript" },
            { label: "React / Next.js" },
            { label: "Spring Boot / Flask" },
            { label: "MySQL" },
            { label: "Mapbox" },
            { label: "Cloudflare" },
          ],
          bullets: [
            "Web: React.js, Next.js, Ant Design, Mapbox · Backend: Spring Boot, Flask · Data: Pandas, PyTorch · Infra: Git/GitHub, Cloudflare, Task Scheduler.",
          ], //  [oai_citation:13‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
        },
      ],
    },
    {
      id: "experience",
      title: "Experience",
      icon: <Sparkles className="h-5 w-5" />,
      items: [
        {
          heading: "Huntsman Corporation",
          subheading: "Product Development Intern · Shanghai, China",
          meta: "May 2025 — Aug 2025",
          chips: [{ label: "Spring Boot" }, { label: "MySQL" }, { label: "React" }, { label: "Optimization" }],
          bullets: [
            "Built a Ratio Optimization + feature-importance visualization module on an internal BI platform for process monitoring and analysis.",
            "Reduced analysis/prediction time by 60% and identified optimal gas ratio (2.12:1), extending catalyst lifetime.",
          ], //  [oai_citation:14‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
        },
        {
          heading: "Hundsun Technologies Inc.",
          subheading: "Java Software Engineer Intern · China",
          meta: "Jun 2023 — Aug 2023",
          chips: [{ label: "Java" }, { label: "React.js" }, { label: "Spring Boot" }, { label: "REST APIs" }],
          bullets: [
            "Migrated financial product UI features and integrated REST APIs with aligned contracts and coordinated testing.",
            "Automated reconciliation via parsing + mismatch detection + realtime alerts, cutting batch time from 45 minutes to <5 minutes (85% faster) and improving accuracy by 90%.",
          ], //  [oai_citation:15‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
        },
      ],
    },
    {
      id: "projects",
      title: "Projects & Activities",
      icon: <Layers className="h-5 w-5" />,
      items: [
        {
          heading: "Intelligent Data Analysis Platform",
          meta: "Sep 2024 — Jul 2025",
          chips: [{ label: "React" }, { label: "Spring Boot" }, { label: "Ant Design" }, { label: "AIGC" }],
          bullets: [
            "Built a full-stack intelligent BI platform to upload datasets and auto-generate visualizations and insights.",
            "Implemented async processing / message queues for scalability; integrated AIGC for chart generation + narrative analysis.",
          ], //  [oai_citation:16‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
        },
        {
          heading: "USC Code The Change",
          meta: "Nov 2024 — Present",
          chips: [{ label: "Next.js" }, { label: "Cloudflare" }, { label: "Mapbox" }, { label: "Civic Tech" }],
          bullets: [
            "Implemented a secure anonymous forum for Voices Beyond Assault supporting 100+ survivors.",
            "Built an interactive platform for Blue Sky LA climate projects — visible, searchable, engaging for the public.",
          ], //  [oai_citation:17‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
        },
        {
          heading: "Automated Chemistry Lab Workflows",
          chips: [{ label: "Flask" }, { label: "Python" }, { label: "PyPDF2" }, { label: "VBA" }],
          bullets: [
            "Built a web interface for experiment-request PDFs and monthly summaries; automated MSDS expiration alerts and procurement forecasting.",
            "Reduced manual effort by 40% using pandas/PyPDF2 + VBA macros + Task Scheduler automation.",
          ], //  [oai_citation:18‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
        },
        {
          heading: "IN THE PINES INC.",
          meta: "Jun 2022 — May 2024",
          chips: [{ label: "STEM Outreach" }, { label: "Co-Founder" }],
          bullets: [
            "Co-founded and led STEM outreach lessons for grades 7–12; tailored teaching and mediated conflicts to keep sessions accessible and collaborative.",
          ], //  [oai_citation:19‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
        },
      ],
    },
    {
      id: "honors",
      title: "Honors",
      icon: <Trophy className="h-5 w-5" />,
      items: [
        {
          heading: "USACO Platinum Division Qualifier",
          meta: "Top 2–3%",
        }, //  [oai_citation:20‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
        {
          heading: "Kaggle AMP® Parkinson’s Disease Progression Prediction",
          meta: "Top 30% of 1,805 teams",
        }, //  [oai_citation:21‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
        {
          heading: "First Tech Challenge Florida Championship",
          meta: "States finalist (Top 6 / 56 teams)",
        }, //  [oai_citation:22‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
      ],
    },
  ],

  // MLE 版本：强调 Kaggle + 建模 + 优化
  mle: [
    {
      id: "education",
      title: "Education",
      icon: <GraduationCap className="h-5 w-5" />,
      items: [
        {
          heading: "University of Southern California",
          subheading: "B.S. Applied & Computational Mathematics · Minor: Computer Science",
          meta: "Aug 2024 — May 2027 · Los Angeles",
          chips: [{ label: "GPA: 3.85/4.0" }],
          bullets: [
            "Coursework: Numerical Methods, Probability Theory, Discrete Methods, Calculus III, Data Structure, Design Theory, Math for ML.",
          ],
        }, //  [oai_citation:23‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)
      ],
    },
    {
      id: "research",
      title: "Research & Work",
      icon: <FlaskConical className="h-5 w-5" />,
      items: [
        {
          heading: "Huntsman Corporation",
          subheading: "Product Development Intern · Shanghai, China",
          meta: "May 2025 — Aug 2025",
          chips: [{ label: "Multi-objective Optimization" }, { label: "Regression/NN" }, { label: "Feature Importance" }],
          bullets: [
            "Optimized methanol synthesis H2:CO ratio using multi-objective optimization and feature-importance analysis; built regression + neural network models to suppress side reactions and extend catalyst lifetime.",
            "Designed classification models for process prediction; found effective ranges: inert gas 15%–25%, CO2 2%–8%.",
            "Explored Bayesian + genetic algorithms for temp–pressure tradeoffs; proposed RL for adaptive control (ongoing).",
          ],
        }, //  [oai_citation:24‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)
        {
          heading: "Kaggle AMP® Parkinson’s Disease Progression Prediction",
          subheading: "Individual Researcher · Online competition",
          meta: "Feb 2023 — May 2023",
          chips: [{ label: "Time-series" }, { label: "Feature Engineering" }, { label: "CV / HPO" }],
          bullets: [
            "Modeled longitudinal protein/peptide abundance to forecast MDS-UPDRS progression scores.",
            "Applied normalization, dimensionality reduction, and ensemble/NN tuning with cross-validation + hyperparameter search; ranked Top 30% of 1,805 teams.",
          ],
        }, //  [oai_citation:25‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)
        {
          heading: "Hundsun Technologies Inc.",
          subheading: "Java Software Engineer Intern · China",
          meta: "Jun 2023 — Aug 2023",
          chips: [{ label: "Java" }, { label: "Spring Boot" }, { label: "REST APIs" }],
          bullets: [
            "Integrated UI features and REST APIs with aligned contracts and coordinated testing.",
            "Automated reconciliation + realtime alerts, reducing batch time from 45 minutes to <5 minutes and improving accuracy by 90%.",
          ],
        }, //  [oai_citation:26‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)
      ],
    },
    {
      id: "activities",
      title: "Activities",
      icon: <ShieldCheck className="h-5 w-5" />,
      items: [
        {
          heading: "USC Code The Change",
          meta: "Nov 2024 — Present",
          chips: [{ label: "Next.js" }, { label: "Cloudflare" }, { label: "Mapbox" }],
          bullets: [
            "Implemented a secure anonymous forum for Voices Beyond Assault (100+ users).",
            "Built a public-facing interactive platform for Blue Sky LA climate projects: visible, searchable, engaging.",
          ],
        }, //  [oai_citation:27‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)
        {
          heading: "Automated Chemistry Lab Workflows",
          chips: [{ label: "Python" }, { label: "pandas" }, { label: "PyPDF2" }, { label: "VBA" }],
          bullets: [
            "Automated PDF extraction/upload, monthly report summarization, MSDS expiration tracking with alerts, and procurement forecasting; reduced manual effort by 40%.",
          ],
        }, //  [oai_citation:28‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)
      ],
    },
    {
      id: "honors",
      title: "Honors",
      icon: <Trophy className="h-5 w-5" />,
      items: [
        { heading: "USACO Platinum Division Qualifier", meta: "Top 2–3%" },
        { heading: "Kaggle AMP® Parkinson’s Prediction", meta: "Top 30% / 1,805 teams" },
        { heading: "FTC Florida Championship", meta: "States finalist (Top 6 / 56 teams)" },
        { heading: "iGEM Bronze qualifier + GFSSM First prize", meta: "Achievement highlights" },
      ], //  [oai_citation:29‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)
    },
  ],
};

export const projects: Project[] = [
  {
    title: "Blue Sky LA Climate Projects Platform",
    blurb:
      "An interactive civic platform that makes Blue Sky LA climate projects visible, searchable, and engaging for the public.",
    tags: ["Next.js", "Cloudflare", "Mapbox", "Search UX"],
    links: [
      { label: "Read More", href: "/projects" },
      { label: "Demo", href: "https://REPLACE_THIS" },
      { label: "GitHub", href: "https://github.com/REPLACE_THIS" },
    ],
  }, //  [oai_citation:30‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)  [oai_citation:31‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
  {
    title: "Voices Beyond Assault Anonymous Forum",
    blurb:
      "A secure, anonymous online forum supporting 100+ survivors to share experiences and seek help.",
    tags: ["Security UX", "Web App", "Community", "Reliability"],
    links: [
      { label: "Read More", href: "/projects" },
      { label: "GitHub", href: "https://github.com/REPLACE_THIS" },
    ],
  }, //  [oai_citation:32‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)  [oai_citation:33‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
  {
    title: "Intelligent Data Analysis Platform (BI + AIGC)",
    blurb:
      "A full-stack BI platform: upload datasets, generate visualizations and insights, and accelerate analysis with AIGC narratives.",
    tags: ["React", "Spring Boot", "Ant Design", "Async", "AIGC"],
    links: [
      { label: "Read More", href: "/projects" },
      { label: "GitHub", href: "https://github.com/REPLACE_THIS" },
    ],
  }, //  [oai_citation:34‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
  {
    title: "Automated Chemistry Lab Workflows",
    blurb:
      "PDF extraction + reporting automation, MSDS expiration alerts, and procurement forecasting to reduce manual effort by 40%.",
    tags: ["Python", "pandas", "PyPDF2", "VBA", "Task Scheduler"],
    links: [
      { label: "Read More", href: "/projects" },
      { label: "GitHub", href: "https://github.com/REPLACE_THIS" },
    ],
  }, //  [oai_citation:35‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)  [oai_citation:36‡Hao_Lou_resume_SWE.pdf](sediment://file_000000006a38722faaabfcdd69286b39)
  {
    title: "Methanol Synthesis Ratio Optimization",
    blurb:
      "Multi-objective optimization + feature importance to identify operational ratios and suppress side reactions, improving catalyst lifetime.",
    tags: ["Optimization", "ML Modeling", "Feature Importance"],
    links: [
      { label: "Read More", href: "/projects" },
      { label: "GitHub", href: "https://github.com/REPLACE_THIS" },
    ],
  }, //  [oai_citation:37‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)
  {
    title: "Kaggle AMP® Parkinson’s Progression Prediction",
    blurb:
      "Time-series + feature engineering + CV/HPO for MDS-UPDRS progression forecasting; ranked Top 30% among 1,805 teams.",
    tags: ["Time-series", "Feature Engineering", "Ensembles", "CV/HPO"],
    links: [
      { label: "Read More", href: "/projects" },
      { label: "Kaggle", href: "https://www.kaggle.com/REPLACE_THIS" },
    ],
  }, //  [oai_citation:38‡Hao_Lou_resume_MLE.pdf](sediment://file_0000000015f471f592235a7144995654)
];

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