"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { contactInfo, profile, site } from "../data";
import { GlassPanel } from "../components/GlassPanel";
import { pageVariants, itemVariants, staggerVariants } from "../components/MotionPrimitives";
import { ArrowUpRight, Loader2, Send, FileDown } from "lucide-react";

type FormState = "idle" | "loading" | "sent";

export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const disabled = state === "loading" || state === "sent";

  const statusText = useMemo(() => {
    if (state === "loading") return "Sending…";
    if (state === "sent") return "Sent (UI simulation)";
    return "Send Message";
  }, [state]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled) return;

    setState("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setState("sent");
    await new Promise((r) => setTimeout(r, 1200));
    setState("idle");
  }

  return (
    <motion.section variants={pageVariants} initial="hidden" animate="show" className="space-y-8">
      <GlassPanel className="px-6 py-7 sm:px-10 sm:py-10">
        <div className="smallcaps text-xs muted">Contact</div>
        <h1 className="mt-2 font-serifDisplay text-4xl sm:text-5xl tracking-tight">
          {contactInfo.title}
        </h1>
        <p className="mt-3 muted max-w-2xl leading-relaxed">{contactInfo.note}</p>
      </GlassPanel>

      <motion.div variants={staggerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants}>
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Left: Info */}
            <GlassPanel className="px-6 py-6 sm:px-8">
              <div className="smallcaps text-xs muted">Details</div>
              <div className="mt-2 font-serifDisplay text-2xl tracking-tight">
                {profile.school}
              </div>
              <div className="mt-1 muted">{profile.location}</div>

              <div className="mt-5 grid gap-3">
                {contactInfo.details.map((d) => (
                  <a
                    key={d.label}
                    href={d.href}
                    target={d.href.startsWith("http") ? "_blank" : undefined}
                    rel={d.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group rounded-xl2 border border-white/10 bg-white/5 px-4 py-3 shadow-insetGlow transition hover:bg-white/8"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="h-10 w-10 rounded-xl2 border border-white/10 bg-usc-red/18 grid place-items-center shadow-insetGlow">
                          <d.icon className="h-5 w-5 text-usc-gold" />
                        </span>
                        <div>
                          <div className="text-sm text-white/88">{d.label}</div>
                          <div className="text-xs muted">{d.value}</div>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-white/70 group-hover:text-usc-gold transition" />
                    </div>
                  </a>
                ))}
              </div>

              <motion.a
                href={site.resumePdf.href}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl2 border border-usc-gold/35 bg-usc-red/22 px-4 py-3 text-sm shadow-glow"
              >
                <FileDown className="h-4 w-4 text-usc-gold" />
                <span className="text-usc-gold">Download Resume PDF</span>
                <ArrowUpRight className="h-4 w-4 text-usc-gold" />
              </motion.a>
            </GlassPanel>

            {/* Right: Form */}
            <GlassPanel className="px-6 py-6 sm:px-8">
              <div className="smallcaps text-xs muted">Message</div>
              <div className="mt-2 font-serifDisplay text-2xl tracking-tight">
                Send a note (simulation)
              </div>

              <form onSubmit={onSubmit} className="mt-5 space-y-4">
                <Field label="Name">
                  <input
                    className="w-full rounded-xl2 border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 shadow-insetGlow transition focus:border-usc-gold/45 focus:bg-white/7"
                    placeholder="Your name"
                    required
                    disabled={disabled}
                  />
                </Field>

                <Field label="Email">
                  <input
                    type="email"
                    className="w-full rounded-xl2 border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 shadow-insetGlow transition focus:border-usc-gold/45 focus:bg-white/7"
                    placeholder="you@domain.com"
                    required
                    disabled={disabled}
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    className="min-h-[140px] w-full resize-none rounded-xl2 border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 shadow-insetGlow transition focus:border-usc-gold/45 focus:bg-white/7"
                    placeholder="What do you want to build?"
                    required
                    disabled={disabled}
                  />
                </Field>

                <motion.button
                  type="submit"
                  whileHover={!disabled ? { y: -1 } : undefined}
                  whileTap={!disabled ? { scale: 0.98 } : undefined}
                  disabled={disabled}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl2 border border-usc-gold/35 bg-usc-red/22 px-4 py-3 text-sm shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "loading" ? (
                    <Loader2 className="h-4 w-4 text-usc-gold animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 text-usc-gold" />
                  )}
                  <span className="text-usc-gold">{statusText}</span>
                </motion.button>

                <div className="text-xs muted">
                  Tip: You can wire this to EmailJS / Resend later — the UI states are ready.
                </div>
              </form>
            </GlassPanel>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 smallcaps text-xs muted">{label}</div>
      {children}
    </label>
  );
}