"use client";

import { motion } from "framer-motion";

export function StickerBadges() {
  const badges = ["USC", "Cardinal • Gold", "LA", "Fight On ✌️", "Design × Code"];

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => (
        <motion.span
          key={b}
          whileHover={{ y: -1, rotate: -0.6 }}
          className="inline-flex items-center rounded-xl2 border border-white/10 bg-white/6 px-2.5 py-1 text-xs text-white/85 shadow-insetGlow"
        >
          {b}
        </motion.span>
      ))}
    </div>
  );
}