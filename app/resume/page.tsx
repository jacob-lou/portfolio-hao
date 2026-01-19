"use client";

import { motion } from "framer-motion";
import { resumeSections, site } from "../data";
import { GlassPanel } from "../components/GlassPanel";
import { SectionHeading } from "../components/SectionHeading";
import { pageVariants, staggerVariants, itemVariants } from "../components/MotionPrimitives";
import { FileDown, ArrowUpRight } from "lucide-react";

export default function ResumePage() {
  return (
    <motion.section variants={pageVariants} initial="hidden" animate="show" className="space-y-8">
      <GlassPanel className="px-6 py-7 sm:px-10 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="smallcaps text-xs muted">Resume</div>
            <h1 className="mt-2 font-serifDisplay text-4xl sm:text-5xl tracking-tight">
              Built with craft. Backed by reliability.
            </h1>
            <p className="mt-3 muted max-w-2xl leading-relaxed">
              Structured sections, consistent tokens, and readable hierarchy — the same way I build products.
            </p>
          </div>

          <motion.a
            id="download"
            href={site.resumePdf.href}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-xl2 border border-usc-gold/35 bg-usc-red/22 px-4 py-3 text-sm shadow-glow"
          >
            <FileDown className="h-4 w-4 text-usc-gold" />
            <span className="text-usc-gold">{site.resumePdf.label}</span>
            <ArrowUpRight className="h-4 w-4 text-usc-gold" />
          </motion.a>
        </div>
      </GlassPanel>

      <motion.div variants={staggerVariants} initial="hidden" animate="show" className="grid gap-4">
        {resumeSections.map((sec) => (
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
                        <div className="font-serifDisplay text-2xl tracking-tight">
                          {it.heading}
                        </div>
                        {it.subheading ? (
                          <div className="mt-1 text-sm text-white/85">{it.subheading}</div>
                        ) : null}
                      </div>
                      {it.meta ? (
                        <div className="smallcaps text-xs muted sm:text-right">{it.meta}</div>
                      ) : null}
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