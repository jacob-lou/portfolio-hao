"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { site, profile } from "./data";
import { GlassPanel } from "./components/GlassPanel";
import { pageVariants, staggerVariants, itemVariants } from "./components/MotionPrimitives";
import { ArrowUpRight, FileDown } from "lucide-react";
import { StatsRow } from "./components/StatsRow";
import { StickerBadges } from "./components/StickerBadges";

export default function HomePage() {
  return (
    <motion.section variants={pageVariants} initial="hidden" animate="show" className="space-y-8">
      <GlassPanel className="relative overflow-hidden px-6 py-8 sm:px-10 sm:py-12">
        {/* punchy campus glow */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-usc-red/45 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-usc-gold/22 blur-3xl" />

        <motion.div variants={staggerVariants} initial="hidden" animate="show" className="relative">
          <motion.div variants={itemVariants} className="flex items-center justify-between gap-4">
            <div className="smallcaps text-xs text-white/75">
              Fight On! <span className="text-usc-gold">✌️</span>
            </div>

            <motion.a
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              href={site.resumePdfs.mle.href}
              className="inline-flex items-center gap-2 rounded-xl2 border border-usc-gold/28 bg-usc-red/18 px-3 py-2 text-sm shadow-[0_0_0_1px_rgba(255,204,0,.10)]"
            >
              <FileDown className="h-4 w-4 text-usc-gold" />
              <span className="text-usc-gold">Resume</span>
              <ArrowUpRight className="h-4 w-4 text-usc-gold" />
            </motion.a>
          </motion.div>

          <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left copy */}
            <div className="lg:col-span-7">
              <motion.div variants={itemVariants}>
                <StickerBadges />
              </motion.div>

              <motion.h1 variants={itemVariants} className="mt-5 font-serifDisplay text-5xl sm:text-6xl tracking-tight">
                <span className="text-white/90">{profile.introHeadline}</span>{" "}
                <span className="text-usc-gold">{profile.introName}</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="mt-4 max-w-2xl muted text-base sm:text-lg leading-relaxed">
                {profile.introSubline}
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
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl2 border border-white/12 bg-white/6 px-4 py-3 text-sm shadow-insetGlow"
                  >
                    <span className="text-white/85">Let’s Connect</span>
                    <ArrowUpRight className="h-4 w-4 text-white/80" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-7">
                <StatsRow stats={profile.stats} />
              </motion.div>
            </div>

            {/* Right photo card */}
            <div className="lg:col-span-5">
              <motion.div
                variants={itemVariants}
                className="relative rounded-xl2 border border-white/10 bg-white/5 p-4 shadow-insetGlow"
              >
                {/* subtle float */}
                <motion.div
                  className="relative overflow-hidden rounded-xl2 border border-white/10 bg-usc-red/12"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(600px 260px at 40% 20%, rgba(255,204,0,.16), transparent 55%), radial-gradient(700px 300px at 70% 60%, rgba(153,0,0,.20), transparent 62%)",
                    }}
                  />
                  <Image
                    src={profile.photoSrc}
                    alt={profile.photoAlt}
                    width={900}
                    height={1100}
                    className="h-[360px] w-full object-cover object-center opacity-95"
                    priority
                  />
                </motion.div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.links.map((l) => (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 rounded-xl2 border border-white/10 bg-white/6 px-3 py-2 text-sm shadow-insetGlow"
                    >
                      <l.icon className="h-4 w-4 text-usc-gold" />
                      <span className="text-white/85">{l.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-white/70" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <div className="mt-4 rounded-xl2 border border-white/10 bg-white/5 px-4 py-4 shadow-insetGlow">
                <div className="smallcaps text-xs muted">Core spirit</div>
                <div className="mt-2 font-serifDisplay text-2xl tracking-tight">
                  <span className="text-white/90">Fight On.</span>{" "}
                  <span className="text-usc-gold">Code On.</span>
                </div>
                <p className="mt-2 muted leading-relaxed">
                  Brand energy meets engineering stability — bold, readable, and always shippable.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </GlassPanel>

      {/* Secondary campus vibe panels */}
      <div className="grid gap-4 sm:grid-cols-2">
        <GlassPanel className="px-6 py-6">
          <div className="smallcaps text-xs muted">Campus energy</div>
          <div className="mt-2 font-serifDisplay text-2xl tracking-tight">
            Cardinal grit. Gold glow.
          </div>
          <p className="mt-3 muted leading-relaxed">
            A USC-forward palette with jersey-like stripes, warm halos, and glass depth—alive, but never noisy.
          </p>
        </GlassPanel>

        <GlassPanel className="px-6 py-6">
          <div className="smallcaps text-xs muted">Motion discipline</div>
          <div className="mt-2 font-serifDisplay text-2xl tracking-tight">
            Smooth entry. Subtle lift. Clear intent.
          </div>
          <p className="mt-3 muted leading-relaxed">
            Every animation is feedback: navigation, hover, and loading states feel responsive and confident.
          </p>
        </GlassPanel>
      </div>
    </motion.section>
  );
}