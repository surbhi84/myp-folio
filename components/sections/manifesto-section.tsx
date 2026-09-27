"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { PORTFOLIO_DATA } from "@/content/portfolio-data";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const wordVariants: Variants = {
  hidden: (isLeadWord: boolean) => ({
    opacity: isLeadWord ? 0.3 : 0.15,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  }),
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export function ManifestoSection() {
  const leadText = PORTFOLIO_DATA.personal.manifesto.lead;
  const subText = PORTFOLIO_DATA.personal.manifesto.sub;

  const fullTextWords = `${leadText} ${subText}`.split(" ");
  const leadWordCount = leadText.split(" ").length;

  return (
    <section
      className="w-full py-28 md:py-44 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto flex items-center justify-center text-center"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-80px" }}
        className="flex flex-wrap justify-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.25] md:leading-[1.2]"
      >
        {fullTextWords.map((word, index) => {
          const isLeadWord = index < leadWordCount;

          return (
            <motion.span
              key={index}
              custom={isLeadWord}
              variants={wordVariants}
              className={`mr-2.5 my-1 ${
                isLeadWord
                  ? "text-neutral-950 font-semibold"
                  : "text-neutral-900 font-medium"
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    </section>
  );
}



