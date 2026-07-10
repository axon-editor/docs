"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const rows = 9;
const columns = 22;

export function BackgroundRipple() {
  const reduceMotion = useReducedMotion();
  const [ripple, setRipple] = useState({ row: 4, column: 11, version: 0 });

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 grid h-[620px] overflow-hidden opacity-35 [grid-template-columns:repeat(22,minmax(0,1fr))] dark:opacity-25"
    >
      {Array.from({ length: rows * columns }, (_, index) => {
        const row = Math.floor(index / columns);
        const column = index % columns;
        const distance = Math.hypot(row - ripple.row, column - ripple.column);

        return (
          <motion.button
            key={`${index}-${ripple.version}`}
            type="button"
            tabIndex={-1}
            className="relative border-b border-r border-black/[0.045] outline-none dark:border-white/[0.04]"
            onClick={() => setRipple({ row, column, version: ripple.version + 1 })}
          >
            <motion.span
              className="absolute inset-0 bg-violet-500"
              initial={{ opacity: 0 }}
              animate={reduceMotion ? { opacity: 0 } : { opacity: [0, 0.18, 0] }}
              transition={{
                duration: 0.9,
                delay: Math.min(distance * 0.045, 0.8),
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
