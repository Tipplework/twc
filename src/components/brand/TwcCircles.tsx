import { TWC_COLORS } from "./tokens";

const LEFT = [0, 0.702, 1.404];
const DEPTH = [18, 0, -16];
const SLOT = [1, 0, -1];

/** The logo cluster at an explicit size. Flat discs, same overlap as the wordmark. */
export function TwcCircles({
  size = 8,
  still = false,
  className = "",
}: {
  size?: number;
  still?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`twc-mark relative inline-block ${className}`}
      style={{ width: size * 2.404, height: size, perspective: 700 }}
    >
      {TWC_COLORS.map((color, index) => (
        <span
          key={color}
          className={`${still ? "" : "twc-disc-in"} absolute top-0`}
          style={{
            left: size * LEFT[index],
            width: size,
            height: size,
            animationDelay: `${index * 70}ms`,
            zIndex: index + 1,
          }}
        >
          <span
            className="twc-disc block h-full w-full rounded-full"
            style={
              {
                background: color,
                "--i": SLOT[index],
                "--z": `${DEPTH[index]}px`,
              } as React.CSSProperties
            }
          />
        </span>
      ))}
    </span>
  );
}
