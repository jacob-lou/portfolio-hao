// app/content/schema.ts
// Pure data types for JSON content files — no JSX/React dependencies.
// Shared by data.tsx (runtime) and scripts/update-resume.ts (CLI).

export type Chip = { label: string };

export type ResumeSectionItem = {
  heading: string;
  subheading?: string;
  meta?: string;
  chips?: Chip[];
  bullets?: string[];
};

export type ResumeSectionJSON = {
  id: string;
  title: string;
  iconId: string;
  items: ResumeSectionItem[];
};

export type ProjectJSON = {
  title: string;
  blurb: string;
  tags: string[];
  links: Array<{ label: string; href: string }>;
};

export type Stat = { value: number | string; label: string };

export type ProfileLink = {
  label: string;
  href: string;
  iconId: string;
};

export type ProfileJSON = {
  name: string;
  role: string;
  school: string;
  location: string;
  email: string;
  phone: string;
  introHeadline: string;
  introName: string;
  introSubline: string;
  photoSrc: string;
  photoAlt: string;
  stats: Stat[];
  links: ProfileLink[];
};
