"use client";

import { motion } from "framer-motion";
import { projects } from "../data";
import { GlassPanel } from "../components/GlassPanel";
import { SectionHeading } from "../components/SectionHeading";
import { ProjectCard } from "../components/ProjectCard";
import { pageVariants, staggerVariants, itemVariants } from "../components/MotionPrimitives";
import { Boxes } from "lucide-react";

export default function ProjectsPage() {
  return (
    <motion.section variants={pageVariants} initial="hidden" animate="show" className="space-y-8">
      <GlassPanel className="px-6 py-7 sm:px-10 sm:py-10">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects with momentum."
          icon={<Boxes className="h-5 w-5" />}
        />
        <p className="mt-3 muted max-w-2xl leading-relaxed">
          Each card is engineered for stable interaction: subtle 3D tilt, highlight-follow, and readable tags.
        </p>
      </GlassPanel>

      <motion.div variants={staggerVariants} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div key={p.title} variants={itemVariants}>
            <ProjectCard project={p} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}