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
        {/* Titles Group: Shifted 48px downward without affecting hero-card-anchor or layout flow */}
        <div className="relative transform translate-y-[80px]">
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
          className="h-54 mx-auto w-full max-w-[192px] sm:max-w-[224px] aspect-[4/5] pointer-events-none"
        />
      </div>

      {/* Hero Footer Row (Exact match to Screenshot 2 bottom layout) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full flex items-end justify-between pt-8 text-neutral-900"
      >
        {/* Bottom Left: ©2026 */}
        <div className="flex flex-col">
          <span className="text-3xl sm:text-5xl md:text-6xl font-bold font-sans">
            ©{PORTFOLIO_DATA.personal.copyrightYear}
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
