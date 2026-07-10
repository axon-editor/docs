"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type IndicatorBox = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export function SidebarActiveIndicator() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [sidebar, setSidebar] = useState<HTMLElement | null>(null);
  const [box, setBox] = useState<IndicatorBox | null>(null);

  useEffect(() => {
    let frame = 0;
    let resizeObserver: ResizeObserver | undefined;
    let mutationObserver: MutationObserver | undefined;

    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const nextSidebar = document.querySelector<HTMLElement>("#nd-sidebar");
        const activeLink = nextSidebar?.querySelector<HTMLElement>(
          'a[data-active="true"]',
        );

        if (!nextSidebar || !activeLink) {
          setBox(null);
          return;
        }

        setSidebar(nextSidebar);
        const sidebarRect = nextSidebar.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        setBox({
          top: linkRect.top - sidebarRect.top,
          left: linkRect.left - sidebarRect.left,
          width: linkRect.width,
          height: linkRect.height,
        });
      });
    };

    const connectObservers = () => {
      const nextSidebar = document.querySelector<HTMLElement>("#nd-sidebar");
      if (!nextSidebar) {
        update();
        return;
      }

      resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(nextSidebar);

      mutationObserver = new MutationObserver(update);
      mutationObserver.observe(nextSidebar, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ["data-active", "data-state", "class"],
      });

      update();
    };

    connectObservers();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [pathname]);

  if (!sidebar || !box) return null;

  return createPortal(
    <motion.div
      aria-hidden="true"
      className="sidebar-active-indicator"
      initial={false}
      animate={box}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 360, damping: 34, mass: 0.8 }
      }
    >
      <span />
    </motion.div>,
    sidebar,
  );
}
