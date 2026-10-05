import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { EASE } from "./tokens";

/** Branded route change. The landing page is left alone so the hero can introduce itself. */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const seen = useRef<string | null>(null);
  const navigated = useRef(false);

  if (seen.current === null) {
    seen.current = pathname;
  } else if (seen.current !== pathname) {
    seen.current = pathname;
    navigated.current = true;
  }

  if (reduce || !navigated.current) return <div>{children}</div>;

  return (
    <motion.div
      key={pathname}
      initial={{ clipPath: "circle(10px at calc(100% - 2.25rem) 1.6rem)" }}
      animate={{ clipPath: "circle(120vmax at calc(100% - 2.25rem) 1.6rem)" }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
