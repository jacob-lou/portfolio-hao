"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site, profile } from "./data";
import { GlassPanel } from "./components/GlassPanel";
import { pageVariants, staggerVariants, itemVariants } from "./components/MotionPrimitives";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <GlassPanel className="relative overflow-hidden px-6 py-8 sm:px-10 sm:py-12">
        {/* hero glow accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-usc-red/35 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-usc-gold/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px 280px at 30% 20%, rgba(255,204,0,.18), transparent 55%), radial-gradient(700px 320px at 80% 55%, rgba(153,0,0,.22), transparent 62%)",
          }}
        />

        <motion.div variants={staggerVariants} initial="hidden" animate="show" className="relative">
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <span className="smallcaps text-xs text-white/75">USC-Spirited Portfolio</span>
            <span className="inline-flex items-center gap-1 rounded-xl2 border border-white/10 bg-white/5 px-2 py-1 text-xs text-usc-gold shadow-insetGlow">
              <Sparkles className="h-3.5 w-3.5" />
              High-craft UI
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-4 font-serifDisplay text-5xl sm:text-6xl tracking-tight"
          >
            <span className="text-white/95">Fight On.</span>{" "}
            <span className="text-usc-gold">Code On.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-4 max-w-2xl muted text-base sm:text-lg leading-relaxed">
            {site.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-3">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={site.ctas[0].href}
                className="inline-flex items-center gap-2 rounded-xl2 border border-usc-gold/35 bg-usc-red/22 px-4 py-3 text-sm shadow-glow"
              >
                <span className="text-usc-gold">{site.ctas[0].label}</span>
                <ArrowUpRight className="h-4 w-4 text-usc-gold" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={site.ctas[1].href}
                className="inline-flex items-center gap-2 rounded-xl2 border border-white/12 bg-white/6 px-4 py-3 text-sm shadow-insetGlow"
              >
                <span className="text-white/85">{site.ctas[1].label}</span>
                <ArrowUpRight className="h-4 w-4 text-white/80" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Role", v: profile.role },
              { k: "Focus", v: "Brand-native UI, Motion, Reliability" },
              { k: "Location", v: profile.location },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-4 shadow-insetGlow"
              >
                <div className="smallcaps text-xs muted">{x.k}</div>
                <div className="mt-1 text-sm text-white/88">{x.v}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </GlassPanel>

      <div className="grid gap-4 sm:grid-cols-2">
        <GlassPanel className="px-6 py-6">
          <div className="smallcaps text-xs muted">Design principle</div>
          <div className="mt-2 font-serifDisplay text-2xl tracking-tight">
            Power in typography. Precision in spacing.
          </div>
          <p className="mt-3 muted leading-relaxed">
            Editorial serif headlines for ceremony and strength, paired with modern sans body
            text for clarity — all under USC’s Cardinal + Gold energy.
          </p>
        </GlassPanel>

        <GlassPanel className="px-6 py-6">
          <div className="smallcaps text-xs muted">Engineering principle</div>
          <div className="mt-2 font-serifDisplay text-2xl tracking-tight">
            Motion as feedback, not decoration.
          </div>
          <p className="mt-3 muted leading-relaxed">
            Framer Motion is used with discipline: subtle entry, micro-lifts on hover, and
            stable UI states that communicate intent without visual fatigue.
          </p>
        </GlassPanel>
      </div>
    </motion.section>
  );
}