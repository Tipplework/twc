import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "link" | "image";

const desktopCursor = () =>
  window.matchMedia("(pointer: fine)").matches &&
  window.matchMedia("(hover: hover)").matches &&
  !window.matchMedia("(pointer: coarse)").matches;

function cursorState(target: EventTarget | null): CursorState {
  if (!(target instanceof Element)) return "default";
  if (target.closest("#featured .group, #clients a")) return "image";
  const link = target.closest("a");
  if (link?.querySelector("img")) return "image";
  if (target.closest('a, button, [role="button"], input, textarea, select, label')) return "link";
  return "default";
}

export const CustomCursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(desktopCursor());
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = dot.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let shown = false;
    let frame = 0;
    let state: CursorState = "default";

    const tick = () => {
      cx += (x - cx) * 0.62;
      cy += (y - cy) * 0.62;
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      frame = requestAnimationFrame(tick);
    };

    const show = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      const next = cursorState(event.target);
      if (next !== state) {
        state = next;
        el.dataset.state = next;
      }
      if (shown) return;
      shown = true;
      cx = x;
      cy = y;
      el.style.opacity = "1";
      document.documentElement.classList.add("twc-cursor");
    };

    const hide = () => {
      if (!shown) return;
      shown = false;
      el.style.opacity = "0";
      document.documentElement.classList.remove("twc-cursor");
    };

    window.addEventListener("mousemove", show, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", show);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.classList.remove("twc-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={dot} className="custom-cursor" data-state="default" style={{ opacity: 0 }} aria-hidden="true" />;
};
