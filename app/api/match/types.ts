// app/api/match/types.ts

export type MatchResult = {
  fitSummary: string;
  matchedSkills: string[];
  matchedExperiences: { heading: string; reason: string }[];
  matchedProjects: { title: string; reason: string }[];
  growthAreas: string[];
};
