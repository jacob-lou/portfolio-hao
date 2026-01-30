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
    swe: { label: "Resume (SWE · 2026)", href: "/Hao_Lou_resume_SWE_2026.pdf" },
    mle: { label: "Resume (MLE · 2026)", href: "/Hao_Lou_resume_MLE_2026.pdf" },
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
    "I’m Hao Lou, an Applied & Computational Mathematics student at USC (CS minor). I build systems that feel fast, clean, and dependable — from civic platforms in Next.js to ML pipelines like occupational coding at scale and CLAP-powered music retrieval. When I’m not building, I’m usually training, listening to music, or exploring LA — staying curious, staying sharp. ",
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
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hao-lou-799a62261", icon: Linkedin },
    { label: "GitHub", href: "https://github.com/jacob-lou", icon: Github },
  ],
};

export const resumeSectionsAll: ResumeSection[] = [
  {
    id: "education",
    title: "Education",
    icon: <GraduationCap className="h-5 w-5" />,
    items: [
      {
        heading: "University of Southern California",
        subheading: "B.S. Applied & Computational Mathematics · Minor: Computer Science",
        meta: "Aug 2024 — May 2028 · Los Angeles",
        chips: [{ label: "GPA: 3.85/4.0" }],
        bullets: [
          "Coursework: Data Structure, Discrete Methods, Numerical Methods, Probability Theory, Web Development.",
          "Coursework (ML track): Math for ML, Design Theory, Calculus III.",
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
        heading: "Tech Stack",
        chips: [
          { label: "Java" },
          { label: "Python" },
          { label: "C++" },
          { label: "JavaScript/TS" },
          { label: "React / Next.js" },
          { label: "Spring Boot / Flask" },
          { label: "MySQL" },
          { label: "Mapbox" },
          { label: "Cloudflare" },
          { label: "PyTorch" },
          { label: "pandas" },
        ],
        bullets: [
          "Web: React.js, Next.js, Ant Design, Mapbox · Backend: Spring Boot, Flask · Data: pandas, PyTorch · Infra: Git/GitHub, Cloudflare, Task Scheduler.",
          "ML/NLP: embeddings, retrieval + reranking, evaluation (e.g., Precision@k), data labeling + IRR workflows.",
        ],
      },
      {
        heading: "Top Skills (Profile)",
        chips: [{ label: "Tokenomics" }, { label: "Blockchain" }, { label: "Web3" }],
        bullets: ["Tokenomics · Blockchain · Web3"],
      },
      {
        heading: "Languages",
        chips: [{ label: "Chinese" }, { label: "English" }, { label: "Spanish" }],
        bullets: ["Chinese (Native/Bilingual)", "English (Native/Bilingual)", "Spanish (Elementary)"],
      },
    ],
  },

  {
    id: "experience",
    title: "Experience & Research",
    icon: <Sparkles className="h-5 w-5" />,
    items: [
      {
        heading: "Research Assistant (Occupational Coding at Scale)",
        subheading: "Tsinghua University · Prof. Zhuo Chen",
        meta: "Sep 2025 — Present",
        chips: [
          { label: "Python" },
          { label: "pandas" },
          { label: "jieba" },
          { label: "rapidfuzz" },
          { label: "Sentence Transformers" },
        ],
        bullets: [
          "Built a large-scale occupational coding pipeline mapping job titles to 1,636 categories using fuzzy matching + embedding-based retrieval.",
          "Improved precision/recall and produced reusable training data for downstream clustering / active learning.",
        ],
      },
      {
        heading: "Research Assistant (LLM-based Cannabis Use Disorder Detection)",
        subheading: "USC · Dr. Shinyi Wu",
        meta: "Dec 2025 — Present",
        chips: [{ label: "LLM" }, { label: "Data Labeling" }, { label: "IRR" }, { label: "Python" }],
        bullets: [
          "Labeled Reddit posts using DSM-based guidelines; built Python scripts for cleaning, inter-rater reliability checks, and baseline experiments to support LLM fine-tuning/evaluation.",
        ],
      },
      {
        heading: "Huntsman Corporation",
        subheading: "Product Development Intern · Shanghai, China",
        meta: "May 2025 — Aug 2025",
        chips: [
          { label: "Spring Boot" },
          { label: "MySQL" },
          { label: "React" },
          { label: "Optimization" },
          { label: "Regression/NN" },
        ],
        bullets: [
          "Built a Ratio Optimization + feature-importance visualization module on an internal BI platform for process monitoring and analysis.",
          "Reduced analysis/prediction time by 60% and identified optimal gas ratio (2.12:1), extending catalyst lifetime.",
          "Modeled and optimized methanol synthesis: regression + neural networks + multi-objective optimization; explored Bayesian + genetic algorithms; proposed RL-based adaptive control direction.",
          "Designed process classification models; identified effective operating ranges (e.g., inert gas and CO2 bands) to suppress side reactions.",
        ],
      },
      {
        heading: "Hundsun Technologies Inc.",
        subheading: "Java Software Engineer Intern · China",
        meta: "Jun 2023 — Aug 2023",
        chips: [{ label: "Java" }, { label: "React.js" }, { label: "Spring Boot" }, { label: "REST APIs" }],
        bullets: [
          "Migrated financial product UI features and integrated REST APIs with aligned contracts (request/response formats, error handling), coordinating testing for smooth rollout.",
          "Automated reconciliation via parsing + mismatch detection + real-time alerts, cutting batch time from 45 minutes to <5 minutes (85% faster) and improving accuracy by 90%.",
        ],
      },
    ],
  },

  {
    id: "projects",
    title: "Projects & Activities",
    icon: <Layers className="h-5 w-5" />,
    items: [
      {
        heading: "VIOLA — Text-to-Music Retrieval for CRM SaaS (MVP)",
        meta: "Sep 2025 — Present",
        chips: [{ label: "PyTorch" }, { label: "CLAP" }, { label: "ChromaDB" }, { label: "Re-ranking" }],
        bullets: [
          "Built a CLAP-embedding retrieval pipeline with ChromaDB and emotion-aware reranking; improved search efficiency and boosted top-k relevance.",
          "Designed evaluation workflow (Precision@k) and iterated retrieval + rerank strategies for stable performance.",
        ],
      },
      {
        heading: "Large-Scale Occupational Coding (15M titles → 1,636 categories)",
        chips: [{ label: "Python" }, { label: "Embeddings" }, { label: "Active Learning" }],
        bullets: [
          "Designed a scalable pipeline using fuzzy matching + sentence-transformer embeddings to normalize job titles and assign standardized occupational codes.",
        ],
      },
      {
        heading: "USC Code The Change",
        meta: "Nov 2024 — Present",
        chips: [{ label: "Next.js" }, { label: "Cloudflare" }, { label: "Mapbox" }, { label: "Civic Tech" }],
        bullets: [
          "Implemented a secure anonymous forum for Voices Beyond Assault supporting 100+ survivors.",
          "Built an interactive platform for Blue Sky LA climate projects — visible, searchable, engaging for the public.",
        ],
      },
      {
        heading: "Intelligent Data Analysis Platform",
        meta: "Sep 2024 — Jul 2025",
        chips: [{ label: "React" }, { label: "Spring Boot" }, { label: "Ant Design" }, { label: "AIGC" }],
        bullets: [
          "Built a full-stack intelligent BI platform to upload datasets and auto-generate visualizations and insights.",
          "Implemented async processing / message queues for scalability; integrated AIGC for chart generation + narrative analysis.",
        ],
      },
      {
        heading: "Automated Chemistry Lab Workflows",
        chips: [{ label: "Flask" }, { label: "Python" }, { label: "PyPDF2" }, { label: "VBA" }],
        bullets: [
          "Built a web interface for experiment-request PDFs and monthly summaries; automated MSDS expiration alerts and procurement forecasting.",
          "Reduced manual effort by 40% using pandas/PyPDF2 + VBA macros + Task Scheduler automation.",
        ],
      },
      {
        heading: "IN THE PINES INC.",
        meta: "Jun 2022 — May 2024",
        chips: [{ label: "STEM Outreach" }, { label: "Co-Founder" }],
        bullets: [
          "Co-founded and led STEM outreach lessons for grades 7–12; tailored teaching and mediated conflicts to keep sessions accessible and collaborative.",
        ],
      },
      {
        heading: "Midwest Blockchain Conference · Researchathon (MBC 2025)",
        chips: [{ label: "Tokenomics" }, { label: "DePIN" }, { label: "Web3" }],
        bullets: [
          "Researchathon participant; produced a token/incentive-focused investment thesis with valuation narrative and risk analysis.",
        ],
      },
    ],
  },

  {
    id: "honors",
    title: "Honors & Recognition",
    icon: <Trophy className="h-5 w-5" />,
    items: [
      { heading: "USACO Platinum Division Qualifier", meta: "Top 2–3%" },
      { heading: "Kaggle AMP® Parkinson’s Disease Progression Prediction", meta: "Top 30% of 1,805 teams" },
      { heading: "First Tech Challenge Florida Championship", meta: "States finalist (Top 6 / 56 teams)" },
      { heading: "Dean’s List", meta: "Recognition" },
      { heading: "Academic Achievement Award", meta: "Recognition" },
      { heading: "iGEM Bronze qualifier + GFSSM First prize", meta: "Recognition" },
    ],
  },
];

export const projects: Project[] = [

  {
    title: "Large-Scale Occupational Coding (15M titles → 1,636 categories)",
    blurb:
      "Built a large-scale occupational coding pipeline (pandas/jieba/rapidfuzz + Sentence Transformer embeddings), improving precision & recall by 18% and enabling downstream clustering/active learning.",
    tags: ["Python", "pandas", "jieba", "rapidfuzz", "Sentence Transformers", "Active Learning"],
    links: [{ label: "Read More", href: "/projects" }],
  },
  {
    title: "LLM-based Cannabis Use Disorder Detection (Early-stage research)",
    blurb:
      "Labeled thousands of Reddit posts with DSM-based guidelines; wrote Python scripts for cleaning, inter-rater reliability checks, and baseline modeling to speed up fine-tuning & evaluation.",
    tags: ["LLM", "NLP", "Python", "Data Labeling", "IRR", "Baselines"],
    links: [{ label: "Read More", href: "/projects" }],
  },
  {
    title: "VIOLA — Text-to-Music Retrieval for CRM SaaS (MVP)",
    blurb:
      "Architected a text-to-music retrieval pipeline using CLAP embeddings + ChromaDB + emotion-aware reranking; improved search efficiency by 80% and boosted top-10 relevant hit rate by 30%.",
    tags: ["PyTorch", "CLAP", "ChromaDB", "Retrieval", "Re-ranking", "Precision@k"],
    links: [{ label: "Read More", href: "/projects" }],
  },

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