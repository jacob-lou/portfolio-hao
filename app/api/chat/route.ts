// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { profile, projects, resumeSectionsAll, site } from "../../data";
import { checkRateLimit } from "../_shared/rate-limit";
import { callGemini } from "../_shared/gemini";

export const runtime = "nodejs";

type ReqBody = { message?: string };

function normalize(s: string) {
  return s.toLowerCase().trim();
}

function fallbackReply(userMessage: string): string {
  const q = normalize(userMessage);

  if (q.includes("email") || q.includes("mail") || q.includes("邮箱")) {
    return `You can reach Hao at ${profile.email}. Fight On ✌️`;
  }
  if (q.includes("linkedin")) {
    const li = profile.links.find((l) => l.label.toLowerCase().includes("linkedin"))?.href;
    return li ? `LinkedIn: ${li}` : "LinkedIn link isn't listed yet.";
  }
  if (q.includes("github")) {
    const gh = profile.links.find((l) => l.label.toLowerCase().includes("github"))?.href;
    return gh ? `GitHub: ${gh}` : "GitHub link isn't listed yet.";
  }
  if (q.includes("gpa")) {
    const gpa = profile.stats.find((s) => String(s.label).toLowerCase().includes("gpa"))?.value;
    return gpa ? `GPA: ${gpa}` : "GPA isn't listed yet.";
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("技术")) {
    const skillsSec = resumeSectionsAll.find((s) => s.id === "skills");
    const chips = skillsSec?.items.flatMap((it) => (it.chips ?? []).map((c) => c.label)) ?? [];
    const uniq = Array.from(new Set(chips)).slice(0, 12);
    return uniq.length ? `Top skills: ${uniq.join(", ")}.` : "Skills aren't listed yet.";
  }

  if (q.includes("experience") || q.includes("research") || q.includes("intern") || q.includes("经历")) {
    const expSec = resumeSectionsAll.find((s) => s.id === "experience");
    const heads = expSec?.items.map((it) => it.heading).slice(0, 4) ?? [];
    return heads.length ? `Highlights: ${heads.join(" · ")}. Want details on any one?` : "Experience isn't listed yet.";
  }

  if (q.includes("project") || q.includes("作品")) {
    const names = projects.slice(0, 4).map((p) => p.title);
    return names.length
      ? `Featured projects: ${names.join(" · ")}. Ask "tell me more about <project>".`
      : "Projects aren't listed yet.";
  }

  return `Fight On ✌️ I can help with Hao's resume, projects, and contact. Try: "What's your best project?", "What's your tech stack?", or "Email?"`;
}

export async function POST(req: Request) {
  try {
    const rl = checkRateLimit(req);
    if (!rl.ok) {
      return NextResponse.json(
        { reply: "Too many requests — slow down, Fight On ✌️" },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) },
        },
      );
    }

    const body = (await req.json()) as ReqBody;
    const message = (body.message ?? "").trim();

    if (!message) {
      return NextResponse.json({ reply: "Ask me anything — resume, projects, or contact." });
    }

    if (message.length > 800) {
      return NextResponse.json({ reply: "Keep it short (≤800 chars) — Fight On ✌️" }, { status: 400 });
    }

    const system = `
You are Hao Lou's portfolio assistant. USC Trojan spirit: upbeat, confident, "Fight On ✌️".
Default: 1–2 short sentences. Only expand if the user asks for details.
Rules:
- Use ONLY the provided data below.
- If not listed, say: "Not listed yet."
- Prefer concrete facts + numbers. No fluff.

DATA:
SITE: ${JSON.stringify(site)}
PROFILE: ${JSON.stringify(profile)}
RESUME: ${JSON.stringify(resumeSectionsAll)}
PROJECTS: ${JSON.stringify(projects)}
`.trim();

    const reply = await callGemini(message, system, fallbackReply);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Connection signal lost — try again." }, { status: 200 });
  }
}
