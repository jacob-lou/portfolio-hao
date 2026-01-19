"use client";

import type { MouseEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "../data";
import { ArrowUpRight } from "lucide-react";
import { cn } from "./utils";

type Tilt = { rx: number; ry: number; hx: number; hy: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<Tilt>({ rx: 0, ry: 0, hx: 50, hy: 50 });

  const delay = useMemo(() => index * 0.05, [index]);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    const ry = clamp((px - 0.5) * 10, -6, 6);
    const rx = clamp(-(py - 0.5) * 10, -6, 6);

    setTilt({ rx, ry, hx: px * 100, hy: py * 100 });
  }

  function onLeave() {
    setTilt({ rx: 0, ry: 0, hx: 50, hy: 50 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative h-full rounded-xl2 border border-white/10 bg-white/5 shadow-insetGlow"
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 180ms ease",
        }}
      >
        {/* highlight follow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl2"
          style={{
            background: `radial-gradient(420px 260px at ${tilt.hx}% ${tilt.hy}%, rgba(255,204,0,.22), transparent 55%)`,
            opacity: 0.9,
          }}
        />

        {/* glass content */}
        <div className="relative p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-serifDisplay text-2xl tracking-tight">
              {project.title}
            </h3>
            <span className="h-9 w-9 rounded-xl2 border border-white/10 bg-usc-red/20 shadow-insetGlow grid place-items-center">
              <span className="h-2 w-2 rounded-full bg-usc-gold shadow-[0_0_20px_rgba(255,204,0,.55)]" />
            </span>
          </div>

          <p className="mt-3 muted leading-relaxed">{project.blurb}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-xl2 border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.links.map((l) => (
              <motion.a
                key={l.href + l.label}
                href={l.href}
                target={l.href.startsWith("/") ? undefined : "_blank"}
                rel={l.href.startsWith("/") ? undefined : "noreferrer"}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl2 px-3 py-2 text-sm",
                  "border border-usc-gold/25 bg-usc-red/18 hover:bg-usc-red/24",
                  "shadow-[0_0_0_1px_rgba(255,204,0,.12)]"
                )}
              >
                <span className="text-usc-gold">{l.label}</span>
                <ArrowUpRight className="h-4 w-4 text-usc-gold" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}