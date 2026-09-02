"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, X, Sparkles, Layers, Activity } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/content/portfolio-data";
import { PillButton } from "@/components/ui/pill-button";
import { GithubIcon } from "@/components/ui/icons";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="w-full py-24 md:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      {/* Section Header Row (Matching Screenshot 5) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase font-semibold text-neutral-500 mb-2 block">
            SELECTED WORK (2022 – 2026)
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold text-neutral-950 font-sans">
            Featured Projects
          </h2>
        </div>

        <PillButton
          as="a"
          href={PORTFOLIO_DATA.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="md"
          icon={<ArrowUpRight className="w-4 h-4" />}
          iconPosition="right"
          className="border-neutral-300 font-semibold self-start sm:self-auto"
        >
          View All Work
        </PillButton>
      </div>

      {/* 2-Column Responsive Grid (Matching Screenshot 5) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedProject(project)}
            className="group cursor-pointer flex flex-col gap-4"
          >
            {/* Colorful Frame Container with Rounded Corners (rounded-[28px]) */}
            <div
              className={`relative w-full aspect-[4/3] rounded-[28px] lg:rounded-[36px] p-6 sm:p-8 overflow-hidden bg-gradient-to-br ${project.gradient} shadow-lg transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:shadow-2xl flex flex-col justify-between`}
            >
              {/* Top Card Bar inside Frame */}
              <div className="flex items-center justify-between z-10">
                <span className="text-xs font-mono font-medium tracking-wider px-3 py-1 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10">
                  {project.category}
                </span>

                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Realistic Web UI Mockup Container */}
              <div className="relative w-full h-[68%] rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-neutral-900/90 backdrop-blur-md p-3 sm:p-4 transition-transform duration-500 group-hover:scale-[1.03]">
                
                {/* Browser Header Dots */}
                <div className="flex items-center gap-1.5 pb-3 mb-2 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <div className="ml-2 px-3 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-white/60 truncate max-w-[160px]">
                    https://{project.id}.dev
                  </div>
                </div>

                {/* UI Mockup Content Preview based on Mockup Type */}
                <div className="w-full h-full flex flex-col justify-between text-white/90">
                  {project.mockupType === "agency" && (
                    <div className="space-y-2 p-1">
                      <div className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> BRINGING YOUR VISION TO LIFE.
                      </div>
                      <div className="w-3/4 h-2 rounded bg-white/20" />
                      <div className="w-1/2 h-2 rounded bg-white/10" />
                      <div className="pt-2 flex gap-2">
                        <span className="px-2 py-1 rounded text-[10px] bg-amber-400 text-black font-semibold">Let's Collab</span>
                        <span className="px-2 py-1 rounded text-[10px] bg-white/10 text-white">Ideas Crafted</span>
                      </div>
                    </div>
                  )}

                  {project.mockupType === "ai-app" && (
                    <div className="space-y-2 p-1">
                      <div className="text-sm font-bold text-purple-300 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Your AI-Powered Design Assistant
                      </div>
                      <div className="w-4/5 h-2 rounded bg-purple-200/20" />
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="p-2 rounded bg-white/5 border border-white/10 text-[10px]">
                          Upload Brief
                        </div>
                        <div className="p-2 rounded bg-purple-500/20 border border-purple-500/30 text-[10px] text-purple-200">
                          Generate Layout
                        </div>
                      </div>
                    </div>
                  )}

                  {project.mockupType === "saas" && (
                    <div className="space-y-2 p-1">
                      <div className="text-sm font-bold text-rose-200">
                        Design Smarter. Build Faster.
                      </div>
                      <div className="w-full h-2 rounded bg-white/20" />
                      <div className="w-2/3 h-2 rounded bg-white/10" />
                      <div className="pt-2 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-[10px] font-semibold">Launch in Minutes</span>
                        <span className="text-[10px] text-rose-200/70">10k+ Happy Creators</span>
                      </div>
                    </div>
                  )}

                  {project.mockupType === "dashboard" && (
                    <div className="space-y-2 p-1">
                      <div className="text-sm font-bold text-sky-200 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Write once. Publish everywhere.
                      </div>
                      <div className="w-full h-2 rounded bg-white/20" />
                      <div className="flex gap-2 pt-2">
                        <div className="flex-1 h-12 rounded bg-white/10 p-2 text-[10px]">Analytics Overview</div>
                        <div className="flex-1 h-12 rounded bg-sky-500/20 border border-sky-400/30 p-2 text-[10px] text-sky-200">Publish Queue</div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Below Card Details (Exact match to Screenshot 5 layout) */}
            <div className="flex items-baseline justify-between pt-1 px-1">
              <div>
                <h3 className="text-2xl font-bold text-neutral-950 font-sans group-hover:text-neutral-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-600 font-medium">
                  {project.category}
                </p>
              </div>

              {project.metrics && (
                <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200">
                  {project.metrics}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="bg-neutral-900 text-white rounded-[32px] p-6 sm:p-10 max-w-2xl w-full border border-neutral-800 shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider block mb-2">
                {selectedProject.category}
              </span>

              <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                {selectedProject.title}
              </h3>

              <p className="text-neutral-300 text-base leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-neutral-200 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-800">
                <PillButton
                  as="a"
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="white"
                  size="md"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  Live Preview
                </PillButton>

                {selectedProject.githubUrl && (
                  <PillButton
                    as="a"
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="md"
                    icon={<GithubIcon className="w-4 h-4" />}
                    className="border-neutral-700 text-white hover:bg-white/10"
                  >
                    View Source
                  </PillButton>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
