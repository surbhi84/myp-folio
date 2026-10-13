"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PORTFOLIO_DATA } from "@/content/portfolio-data";

interface ScrollCard3DProps {
  className?: string;
}

export function ScrollCard3D({ className = "" }: ScrollCard3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(true);
  const scrollEndRef = useRef(1000);

  // Track raw window scroll and map to [0,1] as card travels to About section
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (value) => {
    const end = scrollEndRef.current || 1;
    return Math.min(1, Math.max(0, value / end));
  });

  // Spring physics for smooth, physical feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll-driven progressive 3D card rotation (continuous flip)
  const rotateY = useTransform(smoothProgress, [0, 1], [0, -180]);

  // Scale: smaller initial scale (~51.2%) when stuck -> Full size (1.0) settled in About
  const scale = useTransform(smoothProgress, [0, 1], [0.512, 1.0], {
    clamp: true,
  });

  // Monochrome B&W at initial stuck state -> Vibrant full color as it settles in About
  const grayscale = useTransform(smoothProgress, [0, 0.85], [100, 0], {
    clamp: true,
  });
  const grayscaleFilter = useTransform(
    grayscale,
    (val) => `grayscale(${val}%) contrast(120%)`,
  );

  useEffect(() => {
    let rafId: number | null = null;

    const checkPosition = () => {
      const container = containerRef.current;
      const about = document.getElementById("about");
      if (!container || !about) return;

      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      // Positions relative to current viewport
      const aboutRect = about.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Measure scroll position where card reaches its resting place in About
      const containerDocBottom = containerRect.bottom + scrollY;
      const targetEnd = Math.max(1, containerDocBottom - vh + 32);
      scrollEndRef.current = targetEnd;

      // Card reaches resting place in About when container's bottom edge reaches sticky bottom offset
      const reachedAbout = aboutRect.top <= vh && containerRect.bottom <= vh - 32;
      setIsSticky(!reachedAbout);
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        checkPosition();
        rafId = null;
      });
    };

    checkPosition();
    const timer = setTimeout(checkPosition, 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      clearTimeout(timer);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative z-30 flex items-center justify-center select-none w-full max-w-xs sm:max-w-sm aspect-[4/5] ${className}`}
    >
      <div
        className={
          isSticky
            ? "fixed bottom-8 left-1/2 -translate-x-1/2 z-30 w-[calc(100vw-3rem)] max-w-xs sm:max-w-sm aspect-[4/5]"
            : "relative z-30 w-full h-full"
        }
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{
            scale,
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            rotateY,
          }}
          className="relative w-full h-full rounded-[32px] shadow-2xl group bg-neutral-950 transition-shadow duration-500"
        >
          {/* --- FRONT FACE (B&W Portrait) --- */}
          <div
            className="absolute inset-0 rounded-[32px] overflow-hidden bg-neutral-950 flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                filter: grayscaleFilter,
              }}
            >
              <Image
                src="/surbhi.jpg"
                alt={`${PORTFOLIO_DATA.personal.name} Portrait`}
                fill
                className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 256px, 384px"
                priority
              />
            </motion.div>
            {/* Outer Glass Border Line */}
            <div className="absolute inset-0 border border-white/10 rounded-[32px] pointer-events-none" />
          </div>

          {/* --- BACK FACE (Color Portrait with Glowing Red Atmosphere) --- */}
          <div
            className="absolute inset-0 rounded-[32px] overflow-hidden bg-neutral-950 flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              WebkitTransform: "rotateY(180deg)",
            }}
          >
            <div className="absolute inset-0 w-full h-full [filter:contrast(1.1)_saturate(1.1)]">
              <Image
                src="/surbhi.jpg"
                alt={`${PORTFOLIO_DATA.personal.name} Portrait Color`}
                fill
                className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 256px, 384px"
                priority
              />
              {/* Glowing Red Atmosphere Accent Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-red-900/30 mix-blend-color-dodge opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            {/* Outer Glass Border Line */}
            <div className="absolute inset-0 border border-white/10 rounded-[32px] pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
