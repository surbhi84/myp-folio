"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, X } from "lucide-react";
import { PORTFOLIO_DATA } from "@/content/portfolio-data";

export function FloatingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Allow dropdown menu closing animation to start before smooth scroll
    setTimeout(() => {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 40);
  };

  return (
    <header className="fixed top-8 inset-x-0 z-50 flex items-start justify-center px-4 sm:px-8 pointer-events-none max-w-7xl mx-auto">
      {/* Integrated Floating Card Header with Downward Expansion */}
      <div ref={headerRef} className="pointer-events-auto relative z-50">
        <motion.div
          layout
          initial={false}
          transition={{
            layout: { type: "spring", stiffness: 210, damping: 25, mass: 0.9 },
          }}
          className={`bg-[#0d0d0e] text-white overflow-hidden rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-neutral-800/80 backdrop-blur-xl transition-shadow duration-300 w-[320px] px-4 py-3 ${
            isScrolled && !isMenuOpen ? "scale-95 shadow-2xl bg-black/90" : ""
          }`}
        >
          {/* Header Bar Row */}
          <div className="flex items-center justify-between gap-8">
            <a
              href="#hero"
              onClick={(e) => {
                if (isMenuOpen) {
                  handleNavClick(e, "#hero");
                }
              }}
              className="text-lg sm:text-xl font-bold text-white hover:text-neutral-300 transition-colors pl-1 select-none"
            >
              {PORTFOLIO_DATA.personal.name}
            </a>

            {/* Toggle Button with Morphing Icon: ... <-> X */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-11 h-9 rounded-[8px] bg-[#f5f4ef] hover:bg-white active:bg-[#e6e4de] text-neutral-900 flex items-center justify-center transition-colors duration-200 focus:outline-none cursor-pointer overflow-hidden relative shadow-sm"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 24,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="ellipsis"
                    initial={{ rotate: 90, scale: 0.4, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0.4, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 24,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <MoreHorizontal className="w-5 h-5 stroke-[2.5]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Integrated Dropdown Menu Content */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 230 }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden"
              >
                {/* Navigation Pill List */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.09,
                        delayChildren: 0.05,
                      },
                    },
                    hidden: { opacity: 0 },
                    exit: {
                      opacity: 0,
                      transition: { duration: 0.2, ease: "easeOut" },
                    },
                  }}
                  className="flex flex-col items-start gap-2.5 pt-5 pb-2 px-1"
                >
                  {PORTFOLIO_DATA.navigation.map((item) => (
                    <motion.button
                      key={item.label}
                      variants={{
                        hidden: { opacity: 0, x: -28, scale: 0.94 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 170,
                            damping: 22,
                            mass: 0.9,
                          },
                        },
                        exit: {
                          opacity: 0,
                          x: -12,
                          transition: { duration: 0.18 },
                        },
                      }}
                      whileHover={{ scale: 1.03, x: 2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="w-auto px-4 py-1 bg-[#f5f4ef] text-neutral-900 font-semibold text-sm sm:text-base rounded-[8px] shadow-sm hover:bg-white transition-colors duration-150 focus:outline-none text-left cursor-pointer select-none"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}
