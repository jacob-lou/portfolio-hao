"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, profile } from "../data";
import { cn } from "./utils";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { ResumeDropdown } from "../components/ResumeDropdown";
import { site } from "../data";


export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="glass rounded-xl2 px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-2"
                aria-label="Go Home"
              >
                <span className="h-9 w-9 rounded-xl2 bg-usc-red/25 border border-usc-gold/30 shadow-insetGlow flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-usc-gold shadow-[0_0_30px_rgba(255,204,0,.45)]" />
                </span>
                <div className="leading-tight">
                  <div className="font-serifDisplay text-lg tracking-tight">
                    {profile.name}
                  </div>
                  <div className="text-xs muted">{profile.role}</div>
                </div>
              </Link>

              <motion.a
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                href={profile.links[1]?.href ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="sm:hidden inline-flex items-center gap-2 rounded-xl2 border border-white/10 bg-white/5 px-3 py-2 text-sm shadow-insetGlow"
              >
                <span className="text-usc-gold">Network</span>
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </div>

            <nav className="flex flex-wrap gap-2" aria-label="Primary">
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative inline-flex items-center rounded-xl2 px-3 py-2 text-sm transition",
                      "border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/16",
                      active && "border-usc-gold/40 bg-usc-red/18"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className={cn(active ? "text-usc-gold" : "muted")}>
                      {item.label}
                    </span>
                    {active ? (
                      <span className="ml-2 h-1.5 w-1.5 rounded-full bg-usc-gold shadow-[0_0_18px_rgba(255,204,0,.55)]" />
                    ) : null}
                  </Link>
                );
              })}
              <div className="ml-1">
                <ResumeDropdown
                  items={[
                    { label: site.resumePdfs.swe.label, href: site.resumePdfs.swe.href },
                    { label: site.resumePdfs.mle.label, href: site.resumePdfs.mle.href },
                  ]}
                />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}