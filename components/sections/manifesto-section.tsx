"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_DATA } from "@/content/portfolio-data";

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const leadText = PORTFOLIO_DATA.personal.manifesto.lead;
  const subText = PORTFOLIO_DATA.personal.manifesto.sub;

  const fullTextWords = `${leadText} ${subText}`.split(" ");
  const leadWordCount = leadText.split(" ").length;

  return (
    <section
      ref={containerRef}
      className="w-full py-28 md:py-44 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto flex items-center justify-center text-center"
    >
      <div className="flex flex-wrap justify-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.25] md:leading-[1.2]">
        {fullTextWords.map((word, index) => {
          const isLeadWord = index < leadWordCount;

          // Word-by-word scroll reveal transform calculation
          const start = index / fullTextWords.length;
          const end = start + 1 / fullTextWords.length;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(
            scrollYProgress,
            [start, end],
            [isLeadWord ? 0.3 : 0.15, 1]
          );

          return (
            <motion.span
              key={index}
              style={{ opacity }}
              className={`mr-2.5 my-1 transition-colors duration-200 ${
                isLeadWord
                  ? "text-neutral-950 font-semibold"
                  : "text-neutral-900 font-medium"
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </div>
    </section>
  );
}
