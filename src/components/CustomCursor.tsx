import { useEffect, useRef, useState } from "react";

const desktopCursor = () =>
  window.matchMedia("(pointer: fine)").matches &&
  window.matchMedia("(hover: hover)").matches &&
  !window.matchMedia("(pointer: coarse)").matches;

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

    const tick = () => {
      cx += (x - cx) * 0.5;
      cy += (y - cy) * 0.5;
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      frame = requestAnimationFrame(tick);
    };

    const show = (clientX: number, clientY: number) => {
      x = clientX;
      y = clientY;
      if (shown) return;
      shown = true;
      cx = clientX;
      cy = clientY;
      el.style.opacity = "1";
      document.documentElement.classList.add("twc-cursor");
    };

    const hide = () => {
      if (!shown) return;
      shown = false;
      el.style.opacity = "0";
      document.documentElement.classList.remove("twc-cursor");
    };

    const onMove = (event: MouseEvent) => show(event.clientX, event.clientY);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.classList.remove("twc-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={dot} className="custom-cursor" style={{ opacity: 0 }} aria-hidden="true" />;
};
