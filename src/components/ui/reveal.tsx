"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Horizontal offset variant for side-by-side reveals. Defaults to "up". */
  direction?: "up" | "none";
}

/**
 * Gentle fade-in with a slight upward shift on scroll reveal -- the
 * project's single motion primitive so every section animates
 * consistently. Reduces to a plain fade when the user prefers reduced
 * motion.
 */
export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion || direction === "none" ? 0 : 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
