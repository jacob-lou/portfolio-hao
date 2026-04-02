// scripts/update-resume.ts
// Usage: npx tsx scripts/update-resume.ts resumes/latest.pdf
//   or:  npx tsx scripts/update-resume.ts resumes/latest.md
//   or:  npm run update-resume resumes/latest.pdf

import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.resolve(__dirname, "../app/content");
const RESUME_PATH = path.join(CONTENT_DIR, "resume.json");
const PROJECTS_PATH = path.join(CONTENT_DIR, "projects.json");
const PROFILE_PATH = path.join(CONTENT_DIR, "profile.json");

// ── Helpers ──────────────────────────────────────────────

async function extractText(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".pdf") {
    // Dynamic import so non-PDF users don't need pdf-parse installed
    const pdfParse = (await import("pdf-parse")).default;
    const buf = fs.readFileSync(filePath);
    const data = await pdfParse(buf);
    return data.text;
  }

  // .txt, .md, etc.
  return fs.readFileSync(filePath, "utf-8");
}

async function callGemini(message: string, system: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not set. Export it first:");
    console.error('   export GEMINI_API_KEY="your-key-here"');
    process.exit(1);
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: message }] }],
      systemInstruction: { parts: [{ text: system }] },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${body.slice(0, 300)}`);
  }

  const data = (await res.json()) as Record<string, unknown>;
  const candidates = data?.candidates as Array<Record<string, unknown>> | undefined;
  const content = candidates?.[0]?.content as Record<string, unknown> | undefined;
  const parts = content?.parts as Array<Record<string, unknown>> | undefined;
  const text = parts?.[0]?.text ?? parts?.map((p) => p?.text).join("") ?? "";
  return String(text).trim();
}

function cleanJSON(raw: string): string {
  return raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
}

// ── Diff summary ─────────────────────────────────────────

function diffItems(
  oldItems: Array<{ heading?: string; title?: string }>,
  newItems: Array<{ heading?: string; title?: string }>,
  keyField: "heading" | "title",
): void {
  const oldKeys = new Set(oldItems.map((it) => (it as Record<string, string>)[keyField]));
  const newKeys = new Set(newItems.map((it) => (it as Record<string, string>)[keyField]));

  for (const k of newKeys) {
    if (!oldKeys.has(k)) {
      console.log(`  [ADDED]     ${k}`);
    }
  }
  for (const k of oldKeys) {
    if (newKeys.has(k)) {
      console.log(`  [UPDATED]   ${k}`);
    } else {
      console.log(`  [KEPT]      ${k}`);
    }
  }
}

// ── Main ─────────────────────────────────────────────────

async function main() {
  const inputFile = process.argv[2];
  if (!inputFile) {
    console.error("Usage: npx tsx scripts/update-resume.ts <path-to-resume>");
    console.error("  Supports: .pdf, .md, .txt");
    process.exit(1);
  }

  const absPath = path.resolve(inputFile);
  if (!fs.existsSync(absPath)) {
    console.error(`❌ File not found: ${absPath}`);
    process.exit(1);
  }

  console.log(`📄 Reading ${path.basename(absPath)}…`);
  const resumeText = await extractText(absPath);
  console.log(`   Extracted ${resumeText.length} characters.\n`);

  // Read current data
  const currentResume = JSON.parse(fs.readFileSync(RESUME_PATH, "utf-8"));
  const currentProjects = JSON.parse(fs.readFileSync(PROJECTS_PATH, "utf-8"));
  const currentProfile = JSON.parse(fs.readFileSync(PROFILE_PATH, "utf-8"));

  const system = `
You are a resume-to-JSON merger for a portfolio website. You will receive:
1. The text of a new resume (extracted from PDF/markdown).
2. The current website data as JSON.

Your job: perform an INCREMENTAL MERGE and return the updated JSON.

MERGE RULES:
- Match existing entries by "heading" (for resume sections) or "title" (for projects).
  Use semantic matching — e.g., "RA at Tsinghua" matches "Research Assistant (Occupational Coding at Scale)".
- For MATCHED entries: update subheading, meta, chips, bullets, blurb, tags with new info from the resume.
- For NEW entries found in the resume but not in current data: ADD them to the appropriate section.
- For entries in current data but NOT in the new resume: KEEP them unchanged. Never delete.
- For profile: update stats, role, school info if the resume has newer data. Keep introSubline and photo fields unchanged.

OUTPUT FORMAT — return ONLY valid JSON (no markdown fences), with this structure:
{
  "resume": [ ...updated resume sections array... ],
  "projects": [ ...updated projects array... ],
  "profile": { ...updated profile object... }
}

The resume array items must have: id, title, iconId, items[{heading, subheading?, meta?, chips?[], bullets?[]}]
The projects array items must have: title, blurb, tags[], links[{label, href}]
The profile object must match the current profile schema exactly.

CURRENT WEBSITE DATA:
RESUME: ${JSON.stringify(currentResume)}
PROJECTS: ${JSON.stringify(currentProjects)}
PROFILE: ${JSON.stringify(currentProfile)}
`.trim();

  console.log("🤖 Calling Gemini for incremental merge…\n");
  const raw = await callGemini(resumeText, system);
  const cleaned = cleanJSON(raw);

  let merged: { resume: unknown[]; projects: unknown[]; profile: Record<string, unknown> };
  try {
    merged = JSON.parse(cleaned);
  } catch {
    console.error("❌ Gemini returned invalid JSON. Raw output:");
    console.error(raw.slice(0, 1000));
    process.exit(1);
  }

  // Print diff summary
  console.log("📊 Resume sections:");
  for (const sec of merged.resume as Array<{ id: string; title: string; items: Array<{ heading: string }> }>) {
    const oldSec = (currentResume as Array<{ id: string; items: Array<{ heading: string }> }>)
      .find((s) => s.id === sec.id);
    if (oldSec) {
      console.log(`\n  Section: ${sec.title ?? sec.id}`);
      diffItems(oldSec.items, sec.items, "heading");
    }
  }

  console.log("\n📊 Projects:");
  diffItems(
    currentProjects as Array<{ title: string }>,
    merged.projects as Array<{ title: string }>,
    "title",
  );

  // Write back
  fs.writeFileSync(RESUME_PATH, JSON.stringify(merged.resume, null, 2) + "\n");
  fs.writeFileSync(PROJECTS_PATH, JSON.stringify(merged.projects, null, 2) + "\n");
  fs.writeFileSync(PROFILE_PATH, JSON.stringify(merged.profile, null, 2) + "\n");

  console.log("\n✅ Done! Files updated:");
  console.log(`   ${RESUME_PATH}`);
  console.log(`   ${PROJECTS_PATH}`);
  console.log(`   ${PROFILE_PATH}`);
  console.log('\n🔍 Review: git diff app/content/');
  console.log('🚀 Then:   npm run dev → preview → git commit → deploy');
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
