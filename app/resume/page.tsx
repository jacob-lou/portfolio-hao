"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { resumeSectionsByTrack, site } from "../data";
import { GlassPanel } from "../components/GlassPanel";
import { SectionHeading } from "../components/SectionHeading";
import { pageVariants, staggerVariants, itemVariants } from "../components/MotionPrimitives";
import { ArrowUpRight, FileDown } from "lucide-react";

type Track = "swe" | "mle";

export default function ResumePage() {
  const [track, setTrack] = useState<Track>("swe");
  const sections = useMemo(() => resumeSectionsByTrack[track], [track]);

  return (
    <motion.section variants={pageVariants} initial="hidden" animate="show" className="space-y-8">
      <GlassPanel className="px-6 py-7 sm:px-10 sm:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="smallcaps text-xs muted">Resume</div>
            <h1 className="mt-2 font-serifDisplay text-4xl sm:text-5xl tracking-tight">
              Hao Lou · Fight On. Code On.
            </h1>
            <p className="mt-3 muted max-w-2xl leading-relaxed">
              Choose a track — SWE for engineering breadth, MLE for modeling/optimization depth.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTrack("swe")}
              className={`rounded-xl2 px-4 py-2 text-sm border transition ${
                track === "swe"
                  ? "border-usc-gold/45 bg-usc-red/22 text-usc-gold"
                  : "border-white/10 bg-white/5 text-white/80 hover:bg-white/8"
              }`}
            >
              SWE Track
            </button>
            <button
              onClick={() => setTrack("mle")}
              className={`rounded-xl2 px-4 py-2 text-sm border transition ${
                track === "mle"
                  ? "border-usc-gold/45 bg-usc-red/22 text-usc-gold"
                  : "border-white/10 bg-white/5 text-white/80 hover:bg-white/8"
              }`}
            >
              MLE Track
            </button>

            <motion.a
              href={site.resumePdfs.swe.href}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl2 border border-usc-gold/28 bg-usc-red/18 px-4 py-2 text-sm shadow-[0_0_0_1px_rgba(255,204,0,.10)]"
            >
              <FileDown className="h-4 w-4 text-usc-gold" />
              <span className="text-usc-gold">SWE PDF</span>
              <ArrowUpRight className="h-4 w-4 text-usc-gold" />
            </motion.a>

            <motion.a
              href={site.resumePdfs.mle.href}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl2 border border-white/12 bg-white/6 px-4 py-2 text-sm shadow-insetGlow"
            >
              <FileDown className="h-4 w-4 text-white/80" />
              <span className="text-white/85">MLE PDF</span>
              <ArrowUpRight className="h-4 w-4 text-white/70" />
            </motion.a>
          </div>
        </div>
      </GlassPanel>

      <motion.div variants={staggerVariants} initial="hidden" animate="show" className="grid gap-4">
        {sections.map((sec) => (
          <motion.div key={sec.id} variants={itemVariants}>
            <GlassPanel className="px-6 py-6 sm:px-8">
              <SectionHeading eyebrow="Section" title={sec.title} icon={sec.icon} />
              <div className="mt-5 grid gap-4">
                {sec.items.map((it) => (
                  <div
                    key={it.heading + (it.meta ?? "")}
                    className="rounded-xl2 border border-white/10 bg-white/5 p-5 shadow-insetGlow"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="font-serifDisplay text-2xl tracking-tight">{it.heading}</div>
                        {it.subheading ? <div className="mt-1 text-sm text-white/85">{it.subheading}</div> : null}
                      </div>
                      {it.meta ? <div className="smallcaps text-xs muted sm:text-right">{it.meta}</div> : null}
                    </div>

                    {it.chips?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {it.chips.map((c) => (
                          <span
                            key={c.label}
                            className="inline-flex items-center rounded-xl2 border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
                          >
                            {c.label}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {it.bullets?.length ? (
                      <ul className="mt-4 space-y-2">
                        {it.bullets.map((b) => (
                          <li key={b} className="muted leading-relaxed">
                            <span className="mr-2 text-usc-gold">•</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}