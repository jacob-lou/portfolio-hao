// app/api/match/route.ts
import { NextResponse } from "next/server";
import { profile, projects, resumeSectionsAll } from "../../data";
import { checkRateLimit } from "../_shared/rate-limit";
import { callGemini } from "../_shared/gemini";
import type { MatchResult } from "./types";

export const runtime = "nodejs";

type ReqBody = { jd?: string };

function fallbackMatch(jd: string): MatchResult {
  const q = jd.toLowerCase();

  const allSkills = resumeSectionsAll
    .find((s) => s.id === "skills")
    ?.items.flatMap((it) => (it.chips ?? []).map((c) => c.label)) ?? [];
  const matchedSkills = Array.from(new Set(allSkills)).filter((s) =>
    q.includes(s.toLowerCase()),
  );

  const expSec = resumeSectionsAll.find((s) => s.id === "experience");
  const matchedExperiences = (expSec?.items ?? [])
    .filter((it) => {
      const tags = (it.chips ?? []).map((c) => c.label.toLowerCase());
      return tags.some((t) => q.includes(t));
    })
    .map((it) => ({ heading: it.heading, reason: "Skills overlap with JD requirements." }));

  const matchedProjects = projects
    .filter((p) => p.tags.some((t) => q.includes(t.toLowerCase())))
    .slice(0, 4)
    .map((p) => ({ title: p.title, reason: "Tech stack aligns with job requirements." }));

  return {
    fitSummary: matchedSkills.length
      ? `Hao's background in ${matchedSkills.slice(0, 3).join(", ")} aligns with this role. Fight On ✌️`
      : "Hao brings a strong mix of full-stack and ML skills. Fight On ✌️",
    matchedSkills,
    matchedExperiences,
    matchedProjects,
    growthAreas: [],
  };
}

export async function POST(req: Request) {
  try {
    const rl = checkRateLimit(req, { max: 6 });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests — slow down, Fight On ✌️" },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) },
        },
      );
    }

    const body = (await req.json()) as ReqBody;
    const jd = (body.jd ?? "").trim();

    if (!jd) {
      return NextResponse.json({ error: "Please provide a job description." }, { status: 400 });
    }

    if (jd.length > 3000) {
      return NextResponse.json(
        { error: "Job description too long (≤3000 chars). Fight On ✌️" },
        { status: 400 },
      );
    }

    const system = `
You are a job-match analyst for Hao Lou's portfolio.
Given Hao's data and a Job Description, return ONLY valid JSON (no markdown fences, no explanation) in this exact shape:
{
  "fitSummary": "2-3 sentences on why Hao fits this role",
  "matchedSkills": ["skill1", "skill2"],
  "matchedExperiences": [{"heading": "exact heading from data", "reason": "1-sentence why relevant"}],
  "matchedProjects": [{"title": "exact title from data", "reason": "1-sentence why relevant"}],
  "growthAreas": ["area Hao is still developing"]
}

Rules:
- Use ONLY headings/titles that exist in the provided data. Never invent entries.
- matchedSkills: pull from the Skills section chips only.
- If a dimension has no matches, use an empty array.
- growthAreas: list JD requirements Hao doesn't fully cover yet. Be honest.
- Keep fitSummary upbeat but factual, with USC Trojan spirit ("Fight On ✌️").

DATA:
PROFILE: ${JSON.stringify(profile)}
RESUME: ${JSON.stringify(resumeSectionsAll)}
PROJECTS: ${JSON.stringify(projects)}
`.trim();

    const raw = await callGemini(jd, system, () => "");

    if (!raw) {
      const fb = fallbackMatch(jd);
      return NextResponse.json(fb);
    }

    try {
      // Strip potential markdown fences
      const cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      const parsed = JSON.parse(cleaned) as MatchResult;

      // Validate shape minimally
      const result: MatchResult = {
        fitSummary: typeof parsed.fitSummary === "string" ? parsed.fitSummary : "",
        matchedSkills: Array.isArray(parsed.matchedSkills) ? parsed.matchedSkills : [],
        matchedExperiences: Array.isArray(parsed.matchedExperiences) ? parsed.matchedExperiences : [],
        matchedProjects: Array.isArray(parsed.matchedProjects) ? parsed.matchedProjects : [],
        growthAreas: Array.isArray(parsed.growthAreas) ? parsed.growthAreas : [],
      };

      return NextResponse.json(result);
    } catch {
      // Gemini returned non-JSON; use as fitSummary with fallback structure
      const fb = fallbackMatch(jd);
      fb.fitSummary = raw.slice(0, 500);
      return NextResponse.json(fb);
    }
  } catch {
    return NextResponse.json(
      { error: "Something went wrong — try again." },
      { status: 500 },
    );
  }
}
