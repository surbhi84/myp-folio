"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Badge3DProps {
  type: "star" | "bolt";
  className?: string;
}

export function Badge3D({ type, className = "" }: Badge3DProps) {
  if (type === "star") {
    // Sharp, defined 4-point sparkle star with deep concave inward curves
    const starPath =
      "M 50 7 C 56 35, 63 43, 94 50 C 65 57, 56 65, 50 94 C 44 65, 35 57, 6 50 C 35 43, 44 35, 50 7 Z";
    return (
      <motion.div
        drag
        dragMomentum={true}
        dragElastic={0.15}
        whileDrag={{ scale: 1.35, cursor: "grabbing" }}
        animate={{
          y: [-4, 6, -4],
          rotate: [-3, 5, -3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`relative inline-block pointer-events-auto cursor-grab active:cursor-grabbing select-none filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.3)] touch-none ${className}`}
        whileHover={{ scale: 1.25, rotate: 20 }}
      >
        <svg
          width="112"
          height="112"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36"
        >
          <defs>
            {/* Iridescent Chromatic Bevel Gradient */}
            <linearGradient
              id="starBevelGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#d8b4fe" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="80%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Specular White Rim Highlight */}
            <linearGradient
              id="starGlassGlint"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#e9d5ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>

            {/* Solid Deep Pitch Black Face */}
            <linearGradient id="blackFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#121214" />
              <stop offset="100%" stopColor="#050506" />
            </linearGradient>
          </defs>

          {/* 3D Extrusion Back Layer (Bottom-Right Perspective Offset) */}
          <path
            d={starPath}
            transform="translate(4.5, 4.5)"
            fill="url(#starBevelGrad)"
          />

          {/* Connective Extrusion Spine Walls to form solid 3D depth */}
          <path
            d="M 50 7 L 54.5 11.5 C 60.5 39.5, 67.5 47.5, 98.5 54.5 L 94 50 C 63 43, 56 35, 50 7 Z"
            fill="url(#starBevelGrad)"
          />
          <path
            d="M 94 50 L 98.5 54.5 C 69.5 61.5, 60.5 69.5, 54.5 98.5 L 50 94 C 56 65, 65 57, 94 50 Z"
            fill="url(#starBevelGrad)"
            className="brightness-90"
          />

          {/* Main Front Pitch Black Face */}
          <path
            d={starPath}
            fill="url(#blackFace)"
            stroke="url(#starGlassGlint)"
            strokeWidth="1.6"
          />

          {/* Specular Edge Highlight Stroke along top-left edge */}
          <path
            d="M 6 50 C 35 43, 44 35, 50 7"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-90"
          />
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div
      drag
      dragMomentum={true}
      dragElastic={0.15}
      whileDrag={{ scale: 1.35, cursor: "grabbing" }}
      animate={{
        y: [5, -5, 5],
        rotate: [4, -4, 4],
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
      className={`relative inline-block pointer-events-auto cursor-grab active:cursor-grabbing select-none filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.3)] touch-none ${className}`}
      whileHover={{ scale: 1.25, rotate: -15 }}
    >
      <svg
        width="112"
        height="112"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36"
      >
        <defs>
          {/* Iridescent Violet & Electric Blue Bevel Gradient */}
          <linearGradient
            id="boltBevelGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#c084fc" />
            <stop offset="60%" stopColor="#9333ea" />
            <stop offset="85%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          {/* Specular White Rim Highlight */}
          <linearGradient
            id="boltGlassGlint"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#e9d5ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
          </linearGradient>

          {/* Deep Pitch Black Face */}
          <linearGradient
            id="blackBoltFace"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#121214" />
            <stop offset="100%" stopColor="#050506" />
          </linearGradient>
        </defs>

        {/* 3D Extrusion Back Layer (Extruded along top-left spine) */}
        <path
          d="M 52 8 L 30 46 C 28 49, 31 53, 35 53 H 46 L 40 88 C 39 92, 44 94, 47 90 L 72 48 C 74 45, 71 41, 67 41 H 56 L 62 12 C 63 8, 57 6, 52 8 Z"
          transform="translate(-4, -3)"
          fill="url(#boltBevelGrad)"
        />

        {/* 3D Spine Wall connection */}
        <path d="M 52 8 L 48 5 L 26 43 L 30 46 Z" fill="url(#boltBevelGrad)" />
        <path
          d="M 30 46 L 26 43 L 31 50 L 35 53 Z"
          fill="url(#boltBevelGrad)"
        />

        {/* Main Front Pitch Black Face with crisp glass glint border */}
        <path
          d="M 52 8 L 30 46 C 28 49, 31 53, 35 53 H 46 L 40 88 C 39 92, 44 94, 47 90 L 72 48 C 74 45, 71 41, 67 41 H 56 L 62 12 C 63 8, 57 6, 52 8 Z"
          fill="url(#blackBoltFace)"
          stroke="url(#boltGlassGlint)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Glossy Chromatic Highlight Spine along left top edge */}
        <path
          d="M 52 8 L 30 46 C 28 49, 31 53, 35 53"
          stroke="url(#boltBevelGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Specular White Highlight stroke perfectly aligned along the bottom-right border contour */}
        <path
          d="M 47 90 L 72 48 C 74 45, 71 41, 67 41"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="opacity-95"
        />
      </svg>
    </motion.div>
  );
}
