"use client";

import { useEffect, useMemo, useState } from "react";
import { animate, motion } from "framer-motion";
import type { Stat } from "../data";

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <StatCard key={s.label} stat={s} />
      ))}
    </div>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const isNumeric = typeof stat.value === "number";
  const [display, setDisplay] = useState(0);
  const target = useMemo(() => (isNumeric ? (stat.value as number) : 0), [isNumeric, stat.value]);

  useEffect(() => {
    if (!isNumeric) return;
    const controls = animate(0, target, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isNumeric, target]);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-4 shadow-insetGlow"
    >
      <div className="font-serifDisplay text-2xl sm:text-3xl tracking-tight text-usc-gold">
        {isNumeric ? `${formatNumber(display)}+` : String(stat.value)}
      </div>
      <div className="mt-1 text-xs muted smallcaps">{stat.label}</div>
    </motion.div>
  );
}