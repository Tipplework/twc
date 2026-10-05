/** Measured from public/twc-logo.png (1850×642, indexed). */
export const LOGO = {
  width: 1850,
  height: 642,
  circleD: 47,
  circleTop: 294,
  /** Full-circle left edges. Later discs are painted on top. */
  circleLefts: [329, 362, 394] as const,
  wordLeft: 466,
  wordRight: 1458,
  /** Ink bounds, with a little air so the mark is the box, not the black padding. */
  crop: { x: 320, y: 248, w: 1146, h: 148 },
} as const;

export const TWC_COLORS = ["#FFC700", "#FF3D00", "#8A2BE2"] as const;

export const EASE = [0.16, 1, 0.3, 1] as const;
