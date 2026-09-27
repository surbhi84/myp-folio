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
  const [deltaY, setDeltaY] = useState<number>(-700);
  // Pixel scroll positions for the animation window:
  //   scrollStart = when bottom edge of image touches bottom edge of browser viewport
  //   scrollEnd   = when about card center lands at viewport center
  const [scrollStart, setScrollStart] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(2000);

  // Measure layout positions and derive both deltaY and the scroll animation range
  useEffect(() => {
    const measure = () => {
      const heroAnchor = document.getElementById("hero-card-anchor");
      if (heroAnchor && containerRef.current) {
        const vh = window.innerHeight;
        const scrollY = window.scrollY;
        const heroRect = heroAnchor.getBoundingClientRect();
        const cardRect = containerRef.current.getBoundingClientRect();

        const heroDocTop = heroRect.top + scrollY;
        const cardDocTop = cardRect.top + scrollY;
        const cardDocHeight = cardRect.height;

        setDeltaY(heroDocTop - cardDocTop);

        // Start: hero anchor is 70% down the viewport (card visible in hero, user just starting to scroll)
        const start = Math.max(0, heroDocTop - vh * 0.7);
        // End: about card center is at viewport center
        const end = cardDocTop + cardDocHeight / 2 - vh / 2;

        setScrollStart(start);
        setScrollEnd(Math.max(start + 1, end));
      }
    };

    measure();
    const timer = setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Track raw window scroll and map to [0,1] over the measured pixel range
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(
    scrollY,
    [scrollStart, scrollEnd],
    [0, 1],
    { clamp: true },
  );

  // Spring physics for smooth, physical feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Reactive translation from Hero position (deltaY) to About slot (0)
  // Shifted downward so the card sits nicely balanced in its initial Hero position;
  // the offset interpolates to 0 at p=1 so the About resting position is unaffected.
  const y = useTransform(smoothProgress, (p) => (deltaY - 12) * (1 - p));

  // Rotation is synced to the spring — starts when bottom edge of image touches viewport bottom,
  // completes exactly when the card lands in the About section.
  const rotateY = useTransform(smoothProgress, [0, 0.2, 1], [0, 0, -180]);

  // Scale: 20% smaller initial scale in Hero (0.512) → Full size (1.0) settled in About
  const scale = useTransform(smoothProgress, [0, 1], [0.512, 1.0]);

  // Monochrome B&W at Hero top -> Vibrant full color + Red ambient glow as it settles in About
  const grayscale = useTransform(smoothProgress, [0, 0.85], [100, 0]);
  const grayscaleFilter = useTransform(
    grayscale,
    (val) => `grayscale(${val}%) contrast(120%)`,
  );
  const colorOpacity = useTransform(smoothProgress, [0.15, 0.85], [0, 1]);

  // Glass Specular Glare translation across card face as card flips
  const glarePos = useTransform(scrollYProgress, [0, 1], [-120, 160]);
  const glareGradient = useTransform(
    glarePos,
    (pos) =>
      `linear-gradient(${115 + pos * 0.2}deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`,
  );

  return (
    <div
      ref={containerRef}
      className={`relative z-30 flex items-center justify-center select-none w-full max-w-xs sm:max-w-sm ${className}`}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{
          y,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl group bg-neutral-950 transition-shadow duration-500 "
      >
        {/* --- FRONT FACE --- */}
        <div className="absolute inset-0 rounded-[32px] overflow-hidden bg-neutral-950 flex items-center justify-center">
          {/* Base Black & White Portrait Layer (Hero scroll state) */}
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

          {/* Smooth Full-Color Overlay with Glowing Red Ambient Accent Layer (About Section state) */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: colorOpacity,
              filter: "contrast(1.1) saturate(1.1)",
            }}
          >
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
          </motion.div>

          {/* Glossy Dynamic Glass Specular Glare */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-500"
            style={{
              background: glareGradient,
            }}
          />

          {/* Outer Glass Border Line */}
          <div className="absolute inset-0 border border-white/10 rounded-[32px] pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
