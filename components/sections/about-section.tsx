"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/content/portfolio-data";
import { ScrollCard3D } from "@/components/ui/scroll-card-3d";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-20 w-full py-24 md:py-36 px-6 sm:px-10  max-w-7xl mx-auto"
    >
      {/* 3-Column Layout: Center-aligned vertically with right text closer to image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-end">
        {/* Left Column: "Hey!" at Top, Lead Bio at Bottom */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3 self-stretch flex flex-col justify-between py-2 space-y-6 lg:space-y-0"
        >
          <div>
            <h2 className="text-5xl sm:text-7xl font-bold text-neutral-950 font-sans">
              {PORTFOLIO_DATA.personal.bioGreeting}
            </h2>
          </div>

          <div>
            <p className="text-base sm:text-lg font-medium text-neutral-900 leading-snug">
              {PORTFOLIO_DATA.personal.bioLead}
            </p>
          </div>
        </motion.div>

        {/* Center Column: 3D Scroll Card shifted toward the right column */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end  w-full">
          <ScrollCard3D className="mx-auto lg:mr-0" />
        </div>

        {/* Right Column: Bio Paragraphs & Button — closer to image & vertically centered */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-4 flex flex-col justify-center space-y-6 lg:pl-2"
        >
          <p className="text-sm sm:text-base text-neutral-800 tracking-tighter text-balance text-left leading-relaxed font-normal">
            {PORTFOLIO_DATA.personal.bioParagraph1}
          </p>

          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
            {PORTFOLIO_DATA.personal.bioParagraph2}
          </p>

          <div className="pt-2">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-transparent cursor-pointer select-none"
            >
              <span className="text-base font-semibold text-neutral-950 tracking-tight">
                Get Started
              </span>
              <div className="relative w-8 h-8 rounded-lg border border-black overflow-hidden flex items-center justify-center bg-transparent shrink-0">
                {/* Black fill expanding from bottom-left corner */}
                <span className="absolute inset-0 bg-black origin-bottom-left scale-0 group-hover:scale-100 transition-transform duration-300 ease-out pointer-events-none" />

                {/* Arrow 1 (Black): Slides out towards top-right corner on hover */}
                <ArrowUpRight className="relative z-10 w-4 h-4 text-black transition-transform duration-300 ease-out group-hover:translate-x-6 group-hover:-translate-y-6 pointer-events-none" />

                {/* Arrow 2 (White): Slides in from bottom-left corner to center on hover */}
                <ArrowUpRight className="absolute z-10 w-4 h-4 text-white -translate-x-6 translate-y-6 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none" />
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
