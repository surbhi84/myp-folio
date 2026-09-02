"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/content/portfolio-data";
import { PillButton } from "@/components/ui/pill-button";
import { ScrollCard3D } from "@/components/ui/scroll-card-3d";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-20 w-full py-24 md:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto"
    >
      {/* 3-Column Asymmetric Layout (Exact layout from Screenshot 3 & m.mp4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: "Hey!" Greeting & Lead Bio (lg:col-span-3) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3 flex flex-col justify-between h-full py-2 space-y-6"
        >
          <h2 className="text-5xl sm:text-7xl font-bold text-neutral-950 font-sans">
            {PORTFOLIO_DATA.personal.bioGreeting}
          </h2>

          <p className="text-base sm:text-lg font-medium text-neutral-900 leading-snug">
            {PORTFOLIO_DATA.personal.bioLead}
          </p>
        </motion.div>

        {/* Center Column: 3D Scroll Card settling between "Hey!" and Bio Text */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <ScrollCard3D className="mx-auto" />
        </div>

        {/* Right Column: Bio Paragraphs & "Get Started ↗" Pill Button (lg:col-span-4) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-3 flex flex-col justify-center space-y-6 lg:pl-4"
        >
          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
            {PORTFOLIO_DATA.personal.bioParagraph1}
          </p>

          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
            {PORTFOLIO_DATA.personal.bioParagraph2}
          </p>

          <div className="pt-2">
            <PillButton
              as="a"
              href="#contact"
              variant="white"
              size="md"
              icon={<ArrowUpRight className="w-4 h-4" />}
              iconPosition="right"
              className="border border-neutral-300 hover:border-neutral-950 font-semibold"
            >
              Get Started
            </PillButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
