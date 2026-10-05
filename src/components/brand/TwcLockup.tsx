import { motion, useReducedMotion } from "framer-motion";
import { EASE, LOGO, TWC_COLORS } from "./tokens";

const DEPTH = [20, 0, -16];
const SLOT = [1, 0, -1];

/**
 * The real TWC lockup: wordmark cropped from the logo file,
 * circles redrawn as flat discs on the measured positions so they can move.
 */
export function TwcLockup({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const reduce = useReducedMotion();
  const reveal = animate && !reduce;
  const { crop } = LOGO;
  const leftInset = (LOGO.wordLeft / LOGO.width) * 100;
  const rightInset = ((LOGO.width - LOGO.wordRight) / LOGO.width) * 100;

  return (
    <div
      className={`twc-lockup relative shrink-0 ${className}`}
      style={{ paddingBottom: `${(crop.h / crop.w) * 100}%` }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={reveal ? { clipPath: "inset(0 100% 0 0)" } : false}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.9, ease: EASE, delay: reveal ? 0.18 : 0 }}
      >
        <img
          src="/twc-logo.png"
          alt="Tipple Works Co."
          draggable={false}
          className="absolute max-w-none"
          style={{
            width: `${(LOGO.width / crop.w) * 100}%`,
            height: `${(LOGO.height / crop.h) * 100}%`,
            left: `${-(crop.x / crop.w) * 100}%`,
            top: `${-(crop.y / crop.h) * 100}%`,
            clipPath: `inset(0 ${rightInset}% 0 ${leftInset}%)`,
          }}
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0" style={{ perspective: 800 }} aria-hidden>
        {TWC_COLORS.map((color, index) => (
          <span
            key={color}
            className={`${animate ? "twc-disc-in" : ""} absolute`}
            style={{
              left: `${((LOGO.circleLefts[index] - crop.x) / crop.w) * 100}%`,
              top: `${((LOGO.circleTop - crop.y) / crop.h) * 100}%`,
              width: `${(LOGO.circleD / crop.w) * 100}%`,
              animationDelay: `${index * 80}ms`,
              zIndex: index + 1,
            }}
          >
            <span
              className="twc-disc block w-full rounded-full"
              style={
                {
                  aspectRatio: "1",
                  background: color,
                  "--i": SLOT[index],
                  "--z": `${DEPTH[index]}px`,
                } as React.CSSProperties
              }
            />
          </span>
        ))}
      </div>
    </div>
  );
}
