// app/match/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "../components/GlassPanel";
import { SectionHeading } from "../components/SectionHeading";
import {
  pageVariants,
  staggerVariants,
  itemVariants,
} from "../components/MotionPrimitives";
import { Sparkles, Send, AlertTriangle, Briefcase, Code2, FolderOpen, TrendingUp } from "lucide-react";

type MatchResult = {
  fitSummary: string;
  matchedSkills: string[];
  matchedExperiences: { heading: string; reason: string }[];
  matchedProjects: { title: string; reason: string }[];
  growthAreas: string[];
};

type Status = "idle" | "loading" | "done" | "error";

export default function MatchPage() {
  const [jd, setJd] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function analyze() {
    const text = jd.trim();
    if (!text || status === "loading") return;

    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd: text }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? `Error ${res.status}`);
      }

      const data = (await res.json()) as MatchResult;
      setResult(data);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <GlassPanel className="relative overflow-hidden px-6 py-8 sm:px-10 sm:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-usc-red/45 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-usc-gold/22 blur-3xl"
        />

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="show"
          className="relative space-y-6"
        >
          <motion.div variants={itemVariants}>
            <SectionHeading
              eyebrow="AI-Powered"
              title="Match Me"
              icon={<Sparkles className="h-5 w-5 text-usc-gold" />}
            />
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
              Paste a job description below — I&apos;ll analyze how Hao&apos;s
              skills, experience, and projects align with your requirements.
            </p>
          </motion.div>

          {/* Input */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="relative">
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                maxLength={3000}
                rows={6}
                placeholder="Paste the job description here…"
                className="w-full resize-y rounded-xl2 border border-white/12 bg-white/5 px-4 py-3 text-sm text-white/85 placeholder:text-white/35 outline-none focus:border-usc-gold/55 backdrop-blur-sm"
              />
              <div className="absolute bottom-3 right-3 text-xs text-white/30">
                {jd.length}/3000
              </div>
            </div>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={analyze}
              disabled={status === "loading" || !jd.trim()}
              className="inline-flex items-center gap-2 rounded-xl2 border border-usc-gold/30 bg-usc-red/25 px-5 py-2.5 text-sm font-medium text-usc-gold shadow-insetGlow hover:bg-usc-red/35 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {status === "loading" ? (
                <>
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-usc-gold" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-usc-gold [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-usc-gold [animation-delay:240ms]" />
                  </span>
                  Analyzing…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Analyze Match
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </GlassPanel>

      {/* Error */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <GlassPanel className="flex items-center gap-3 px-6 py-4">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
              <p className="text-sm text-red-300">{errorMsg}</p>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {status === "done" && result && (
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Fit Summary */}
            <motion.div variants={itemVariants}>
              <GlassPanel className="px-6 py-6 sm:px-10">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 shrink-0 text-usc-gold" />
                  <div>
                    <h3 className="font-serifDisplay text-lg tracking-tight text-white/90">
                      Why Hao Fits
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {result.fitSummary}
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>

            {/* Matched Skills */}
            {result.matchedSkills.length > 0 && (
              <motion.div variants={itemVariants}>
                <GlassPanel className="px-6 py-6 sm:px-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="h-5 w-5 text-usc-gold" />
                    <h3 className="font-serifDisplay text-lg tracking-tight text-white/90">
                      Matched Skills
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-xl2 border border-usc-gold/30 bg-usc-gold/12 px-3 py-1.5 text-xs font-medium text-usc-gold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            )}

            {/* Matched Experience */}
            {result.matchedExperiences.length > 0 && (
              <motion.div variants={itemVariants}>
                <GlassPanel className="px-6 py-6 sm:px-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="h-5 w-5 text-usc-gold" />
                    <h3 className="font-serifDisplay text-lg tracking-tight text-white/90">
                      Relevant Experience
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {result.matchedExperiences.map((exp) => (
                      <div
                        key={exp.heading}
                        className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <div className="font-medium text-sm text-white/90">
                          {exp.heading}
                        </div>
                        <div className="mt-1 text-xs text-white/55">
                          {exp.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            )}

            {/* Matched Projects */}
            {result.matchedProjects.length > 0 && (
              <motion.div variants={itemVariants}>
                <GlassPanel className="px-6 py-6 sm:px-10">
                  <div className="flex items-center gap-2 mb-4">
                    <FolderOpen className="h-5 w-5 text-usc-gold" />
                    <h3 className="font-serifDisplay text-lg tracking-tight text-white/90">
                      Relevant Projects
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {result.matchedProjects.map((proj) => (
                      <div
                        key={proj.title}
                        className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <div className="font-medium text-sm text-white/90">
                          {proj.title}
                        </div>
                        <div className="mt-1 text-xs text-white/55">
                          {proj.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            )}

            {/* Growth Areas */}
            {result.growthAreas.length > 0 && (
              <motion.div variants={itemVariants}>
                <GlassPanel className="px-6 py-6 sm:px-10">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-white/60" />
                    <h3 className="font-serifDisplay text-lg tracking-tight text-white/90">
                      Growth Areas
                    </h3>
                  </div>
                  <p className="mb-3 text-xs text-white/45">
                    Areas Hao is actively developing — transparency matters.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.growthAreas.map((area) => (
                      <span
                        key={area}
                        className="rounded-xl2 border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
