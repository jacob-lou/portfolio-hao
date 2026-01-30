"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, FileDown } from "lucide-react";

type Item = { label: string; href: string };

export function ResumeDropdown({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const btnId = useId();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (!rootRef.current?.contains(t)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        id={btnId}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl2 border border-white/10 bg-white/6 px-3 py-2 text-sm text-white/85 shadow-insetGlow hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-usc-gold/40"
      >
        <FileDown className="h-4 w-4 text-usc-gold" />
        <span>Resume</span>
        <span className="text-white/55">(SWE/MLE)</span>
        <ChevronDown className="h-4 w-4 text-white/70" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-labelledby={btnId}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 z-50 mt-2 w-[260px] overflow-hidden rounded-xl2 border border-white/10 bg-black/55 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,.45)]"
          >
            <div className="px-3 py-2 smallcaps text-xs text-white/60">Download</div>
            <div className="pb-2">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-3 px-3 py-2 text-sm text-white/85 hover:bg-white/8 focus:bg-white/8 focus:outline-none"
                >
                  <span>{it.label}</span>
                  <span className="text-usc-gold">↗</span>
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}