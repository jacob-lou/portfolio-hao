// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { profile, projects, resumeSectionsAll, site } from "../../data";

export const runtime = "nodejs";

type ReqBody = { message?: string };

function normalize(s: string) {
  return s.toLowerCase().trim();
}

function fallbackReply(userMessage: string): string {
  const q = normalize(userMessage);

  // Basic contact
  if (q.includes("email") || q.includes("mail") || q.includes("邮箱")) {
    return `You can reach Hao at ${profile.email}. Fight On ✌️`;
  }
  if (q.includes("linkedin")) {
    const li = profile.links.find((l) => l.label.toLowerCase().includes("linkedin"))?.href;
    return li ? `LinkedIn: ${li}` : "LinkedIn link isn’t listed yet.";
  }
  if (q.includes("github")) {
    const gh = profile.links.find((l) => l.label.toLowerCase().includes("github"))?.href;
    return gh ? `GitHub: ${gh}` : "GitHub link isn’t listed yet.";
  }
  if (q.includes("gpa")) {
    const gpa = profile.stats.find((s) => String(s.label).toLowerCase().includes("gpa"))?.value;
    return gpa ? `GPA: ${gpa}` : "GPA isn’t listed yet.";
  }

  // Skills
  if (q.includes("skill") || q.includes("stack") || q.includes("技术")) {
    const skillsSec = resumeSectionsAll.find((s) => s.id === "skills");
    const chips =
      skillsSec?.items.flatMap((it) => (it.chips ?? []).map((c) => c.label)) ?? [];
    const uniq = Array.from(new Set(chips)).slice(0, 12);
    return uniq.length
      ? `Top skills: ${uniq.join(", ")}.`
      : "Skills aren’t listed yet.";
  }

  // Experience
  if (q.includes("experience") || q.includes("research") || q.includes("intern") || q.includes("经历")) {
    const expSec = resumeSectionsAll.find((s) => s.id === "experience");
    const heads = expSec?.items.map((it) => it.heading).slice(0, 4) ?? [];
    return heads.length
      ? `Highlights: ${heads.join(" · ")}. Want details on any one?`
      : "Experience isn’t listed yet.";
  }

  // Projects
  if (q.includes("project") || q.includes("作品")) {
    const names = projects.slice(0, 4).map((p) => p.title);
    return names.length
      ? `Featured projects: ${names.join(" · ")}. Ask “tell me more about <project>”.`
      : "Projects aren’t listed yet.";
  }

  // Default: short portfolio assistant
  return `Fight On ✌️ I can help with Hao’s resume, projects, and contact. Try: “What’s your best project?”, “What’s your tech stack?”, or “Email?”`;
}

async function callGemini(message: string, systemInstruction: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return fallbackReply(message);

  const endpoint =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  // simple retry (stable)
  const delays = [500, 1000, 2000];

  for (let i = 0; i <= delays.length; i++) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      });

      if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
      const data = (await res.json()) as any;

      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).join("") ??
        "";

      return text.trim() || fallbackReply(message);
    } catch {
      if (i === delays.length) return fallbackReply(message);
      await new Promise((r) => setTimeout(r, delays[i]));
    }
  }

  return fallbackReply(message);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;
    const message = (body.message ?? "").trim();
    if (!message) {
      return NextResponse.json({ reply: "Ask me anything — resume, projects, or contact." });
    }

    const system = `
You are Hao Lou's portfolio assistant. Tone: energetic, USC spirit (“Fight On”), concise, helpful.
Answer using ONLY the data below. If not present, say it isn't listed.
Keep replies under ~60 words unless asked for detail.

SITE: ${JSON.stringify(site)}
PROFILE: ${JSON.stringify(profile)}
RESUME: ${JSON.stringify(resumeSectionsAll)}
PROJECTS: ${JSON.stringify(projects)}
    `.trim();

    const reply = await callGemini(message, system);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Connection signal lost — try again." }, { status: 200 });
  }
}