"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface PillButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "white" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

export function PillButton({
  variant = "white",
  size = "md",
  children,
  icon,
  iconPosition = "right",
  className,
  as: Component = "button",
  href,
  target,
  rel,
  ...props
}: PillButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 shadow-sm cursor-pointer select-none";

  const variants = {
    white:
      "bg-white text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 border border-neutral-200/80 shadow-sm",
    dark: "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 border border-neutral-800 shadow-md",
    outline:
      "bg-transparent text-neutral-900 border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900/5",
    ghost: "bg-transparent text-neutral-800 hover:bg-neutral-200/60",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  const MotionComponent = motion(Component as React.ComponentType<any>);

  return (
    <MotionComponent
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      href={href}
      target={target}
      rel={rel}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </MotionComponent>
  );
}
