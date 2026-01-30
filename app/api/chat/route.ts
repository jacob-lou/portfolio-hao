// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { profile, projects, resumeSectionsAll, site } from "../../data";

export const runtime = "nodejs";

type ReqBody = { message?: string };

function normalize(s: string) {
  return s.toLowerCase().trim();
}

/** -----------------------------
 *  0) Rate limit (simple, no deps)
 *  - Good enough for portfolio
 *  - Note: on serverless, each instance has its own memory
 * ----------------------------- */
const RATE = {
  windowMs: 60_000, // 1 minute
  max: 12, // per IP per window
};

type Hit = { count: number; resetAt: number };
const ipHits = new Map<string, Hit>();

function getClientIp(req: Request) {
  // Vercel commonly sets this
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  // Sometimes present
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr.trim();
  return "unknown";
}

function checkRateLimit(req: Request) {
  const ip = getClientIp(req);
  const now = Date.now();
  const cur = ipHits.get(ip);

  if (!cur || now > cur.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE.windowMs });
    return { ok: true as const };
  }

  if (cur.count >= RATE.max) {
    return { ok: false as const, retryAfterMs: cur.resetAt - now };
  }

  cur.count += 1;
  ipHits.set(ip, cur);
  return { ok: true as const };
}

/** -----------------------------
 *  1) Fallback reply (no Gemini)
 * ----------------------------- */
function fallbackReply(userMessage: string): string {
  const q = normalize(userMessage);

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

  if (q.includes("skill") || q.includes("stack") || q.includes("技术")) {
    const skillsSec = resumeSectionsAll.find((s) => s.id === "skills");
    const chips = skillsSec?.items.flatMap((it) => (it.chips ?? []).map((c) => c.label)) ?? [];
    const uniq = Array.from(new Set(chips)).slice(0, 12);
    return uniq.length ? `Top skills: ${uniq.join(", ")}.` : "Skills aren’t listed yet.";
  }

  if (q.includes("experience") || q.includes("research") || q.includes("intern") || q.includes("经历")) {
    const expSec = resumeSectionsAll.find((s) => s.id === "experience");
    const heads = expSec?.items.map((it) => it.heading).slice(0, 4) ?? [];
    return heads.length ? `Highlights: ${heads.join(" · ")}. Want details on any one?` : "Experience isn’t listed yet.";
  }

  if (q.includes("project") || q.includes("作品")) {
    const names = projects.slice(0, 4).map((p) => p.title);
    return names.length
      ? `Featured projects: ${names.join(" · ")}. Ask “tell me more about <project>”.`
      : "Projects aren’t listed yet.";
  }

  return `Fight On ✌️ I can help with Hao’s resume, projects, and contact. Try: “What’s your best project?”, “What’s your tech stack?”, or “Email?”`;
}

/** -----------------------------
 *  2) Gemini call (server-side only)
 *  - with retry + timeout
 * ----------------------------- */
async function callGemini(message: string, systemInstruction: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return fallbackReply(message);

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const delays = [500, 1000, 2000];

  for (let i = 0; i <= delays.length; i++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000); // 10s timeout

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      });

      if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);

      const data: unknown = await res.json();
      const anyData = data as any;

      const text =
        anyData?.candidates?.[0]?.content?.parts?.[0]?.text ??
        anyData?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).join("") ??
        "";

      const out = String(text ?? "").trim();
      return out || fallbackReply(message);
    } catch {
      if (i === delays.length) return fallbackReply(message);
      await new Promise((r) => setTimeout(r, delays[i]));
    } finally {
      clearTimeout(timeout);
    }
  }

  return fallbackReply(message);
}

/** -----------------------------
 *  3) API handler
 * ----------------------------- */
export async function POST(req: Request) {
  try {
    // Rate limit first
    const rl = checkRateLimit(req);
    if (!rl.ok) {
      return NextResponse.json(
        { reply: "Too many requests — slow down, Fight On ✌️" },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil((rl.retryAfterMs ?? 0) / 1000)) },
        }
      );
    }

    const body = (await req.json()) as ReqBody;
    const message = (body.message ?? "").trim();

    if (!message) {
      return NextResponse.json({ reply: "Ask me anything — resume, projects, or contact." });
    }

    // Input length guard (prevents huge prompts)
    if (message.length > 800) {
      return NextResponse.json({ reply: "Keep it short (≤800 chars) — Fight On ✌️" }, { status: 400 });
    }

    const system = `
You are Hao Lou’s portfolio assistant. USC Trojan spirit: upbeat, confident, “Fight On ✌️”.
Default: 1–2 short sentences. Only expand if the user asks for details.
Rules:
- Use ONLY the provided data below.
- If not listed, say: “Not listed yet.”
- Prefer concrete facts + numbers. No fluff.

DATA:
SITE: ${JSON.stringify(site)}
PROFILE: ${JSON.stringify(profile)}
RESUME: ${JSON.stringify(resumeSectionsAll)}
PROJECTS: ${JSON.stringify(projects)}
`.trim();

    const reply = await callGemini(message, system);
    return NextResponse.json({ reply });
  } catch {
    // Never crash the UI
    return NextResponse.json({ reply: "Connection signal lost — try again." }, { status: 200 });
  }
}