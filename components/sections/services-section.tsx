"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PORTFOLIO_DATA } from "@/content/portfolio-data";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full py-24 md:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="mb-16">
        <span className="text-xs font-mono tracking-widest uppercase font-semibold text-neutral-500 mb-2 block">
          WHAT I DO
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold text-neutral-950 font-sans">
          Services & Capabilities
        </h2>
      </div>

      {/* Services List / Accordion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {PORTFOLIO_DATA.services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative p-8 sm:p-10 rounded-[32px] bg-white/70 hover:bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Service Number & Accent */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-mono font-bold text-neutral-400 group-hover:text-neutral-950 transition-colors">
                  {service.number}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 group-hover:bg-emerald-500 transition-colors" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-4 font-sans">
                {service.title}
              </h3>

              <p className="text-neutral-700 text-base leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            {/* Skills Tag Pills */}
            <div className="pt-4 border-t border-neutral-100 flex flex-wrap gap-2">
              {service.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-medium border border-neutral-200/60"
                >
                  <Check className="w-3 h-3 text-emerald-600" />
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
