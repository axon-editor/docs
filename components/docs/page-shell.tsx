"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

export function DocsPageShell({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || reduceMotion) return;

    // Long guides can contain dozens of large screenshots. A one-shot
    // IntersectionObserver reveals only the landmarks entering the viewport,
    // avoiding a continuous scroll listener and keeping motion inexpensive.
    const targets = shell.querySelectorAll<HTMLElement>(
      ".docs-motion-item, h2, h3, figure, pre, table, blockquote",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealVisible = "true";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6%", threshold: 0.06 },
    );

    targets.forEach((target) => {
      target.dataset.revealReady = "true";
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <motion.div
      ref={shellRef}
      className="docs-page-shell"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
