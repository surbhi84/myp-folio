"use client";

import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/content/portfolio-data";
import { Badge3D } from "@/components/ui/badge-3d";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-10 min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-between mb-4 pb-4 px-6 sm:px-10 lg:px-48"
    >
      {/* Spacer top */}
      <div className="w-full h-8" />

      {/* Main Center Display Typography Area */}
      <div className="relative mt-32 mb-0 flex flex-col items-center justify-center text-center">
        {/* Titles Group: Positioned above hero-card-anchor */}
        <div className="relative">
          {/* Line 1: SOFTWARE */}
          <div className="relative inline-block">
            {/* Floating 3D Star Badge on Top-Left (Diagonally away) */}
            <div className="absolute -top-8 -left-12 sm:-top-14 sm:-left-18 md:-top-18 md:-left-22 lg:-top-22 lg:-left-26 z-10">
              <Badge3D type="star" />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-extrabold tracking-tight
               leading-[0.88] text-neutral-950 uppercase font-archivo cursor-text"
            >
              SOFTWARE
            </motion.h1>
          </div>

          {/* Line 2: ENGINEER */}
          <div className="relative inline-block">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-extrabold leading-[0.88] text-neutral-950 uppercase font-archivo cursor-text"
            >
              ENGINEER
            </motion.h1>

            {/* Floating 3D Lightning Bolt Badge on Bottom-Right (Diagonally away) */}
            <div className="absolute -bottom-10 -right-14 sm:-bottom-16 sm:-right-20 md:-bottom-20 md:-right-24 lg:-bottom-24 lg:-right-28 z-10">
              <Badge3D type="bolt" />
            </div>
          </div>
        </div>

        {/* Center Hero Anchor Space for the 3D Logo Card */}
        <div
          id="hero-card-anchor"
          className="h-64 mx-auto w-full max-w-[192px] sm:max-w-[224px] aspect-[4/5] pointer-events-none"
        />
      </div>

      {/* Hero Footer Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full flex items-end justify-between pt-8 text-neutral-900"
      >
        {/* Bottom Left: Availability & Location Status Badge */}
        <div className="flex flex-col gap-1.5 pb-1">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/[0.04] hover:bg-neutral-900/[0.08] border border-neutral-900/10 backdrop-blur-xs transition-all duration-200 cursor-pointer w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono font-medium tracking-wider text-neutral-900 uppercase">
              Open to opportunities
            </span>
          </a>
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 pl-2">
            Based in {PORTFOLIO_DATA.personal.location}
          </span>
        </div>

        {/* Bottom Right: /ENGINEERING SINCE 2021 */}
        <div className="text-right pb-1">
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold text-neutral-800">
            /{PORTFOLIO_DATA.personal.timeline}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
