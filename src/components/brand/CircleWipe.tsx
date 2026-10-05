import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./tokens";

/** Circle → expansion → the content inside it. One transition, reused. */
export function CircleWipe({
  children,
  className = "",
  origin = "22% 18%",
}: {
  children: React.ReactNode;
  className?: string;
  origin?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: `circle(10px at ${origin})` }}
      whileInView={{ clipPath: `circle(140% at ${origin})` }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1.15, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
