"use client";

import { useEffect } from "react";

// Matches qworp-vyuha-redesign.html lines 1235-1243 exactly — one shared
// IntersectionObserver for every [data-reveal]/[data-reveal-stagger]
// element on the page, regardless of which section rendered it. Renders
// nothing; mounted once in page.tsx.
export function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
