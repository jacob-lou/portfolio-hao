# Fight On. Code On. — Hao Lou Portfolio (USC)

A USC-themed, high-energy personal portfolio built with **Next.js App Router + Tailwind CSS + TypeScript + Framer Motion** — featuring glassmorphism, 3D hover interactions, and a **TrojanBot** chatbot (Gemini-powered, server-side only).

**Live:** https://REPLACE_VERCEL_OR_CUSTOM_DOMAIN

---

## ✌️ Highlights

- **USC brand system**: Cardinal Red `#990000` + Gold `#FFCC00`
- **High-design UI**: glass panels, glow layers, subtle noise texture, 3D card tilt
- **Motion discipline**: Framer Motion page transitions + micro-interactions (smooth, not flashy)
- **TrojanBot Chatbot**:
  - Runs via `/api/chat` (server route)
  - Uses Gemini API if `GEMINI_API_KEY` is set
  - Falls back to a local, deterministic reply system if key is missing
  - Quick question chips + auto-scroll + auto-focus for fast interaction
- **Resume dropdown**: `Resume (SWE/MLE)` download options

---

## 🧱 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS v3**
- **Framer Motion**
- **lucide-react** (icons)

---

## 📁 Project Structure

```txt
app/
  api/
    chat/
      route.ts            # Gemini-backed portfolio assistant (server-side)
  components/
    HomeChatbot.tsx       # TrojanBot widget (UI + quick chips)
    Navbar.tsx
    GlassPanel.tsx
    ProjectCard.tsx
    SectionHeading.tsx
    ... (other UI helpers)
  contact/
    page.tsx
  projects/
    page.tsx
  resume/
    page.tsx
  layout.tsx
  page.tsx                # Home
  globals.css

data.tsx                  # Central content management (profile/projects/resume/site)
tailwind.config.ts
postcss.config.js
next.config.js
public/
  profile.jpg
  Hao_Lou_resume_SWE_2026.pdf
  Hao_Lou_resume_MLE_2026.pdf
```

## 🚀 Getting Started (Local)

1) Install
```bash
npm install
```

2) Environment Variables (Optional: Gemini Chatbot)
```bash
touch .env.local
```

Add:
```bash
GEMINI_API_KEY=YOUR_KEY_HERE
```
.env* is ignored by git (safe).
If you don’t set a key, the chatbot still works using fallback replies.

3) Run Dev Server
```bash
npm run dev
```
Open: http://localhost:3000

## 🤖 TrojanBot (Chatbot) Notes
-	Chat UI lives in: app/components/HomeChatbot.tsx
-	Server route lives in: app/api/chat/route.ts
-	The API key is read only on the server:
-	process.env.GEMINI_API_KEY
-	Never expose the key in client components (anything with "use client").



## ✅ Deploy (Vercel)
1.	Import GitHub repo into Vercel
2.	Set Environment Variable: •	GEMINI_API_KEY (Production + Preview)
3.	Deploy

Every push to main triggers an automatic redeploy.



## 🛡️ Security
-	Do not commit secrets.
-	Keys belong in:
-	.env.local (local)
-	Vercel Environment Variables (production)

Quick check:
```bash
git ls-files | grep .env
```

## 🧩 Customize Content

All editable content is centralized in data.tsx:
-	profile (intro, links, stats)
-	resumeSectionsAll / resume content
-	projects
-	site (title, CTA, resume PDF links)

