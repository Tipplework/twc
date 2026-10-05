import { useEffect, type ReactNode } from "react";

export const fieldClass = "w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-neutral-500">{label}</span>
      {children}
    </label>
  );
}

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "green" | "amber" | "red" }) {
  const tones = {
    neutral: "bg-black/5 text-black/70",
    green: "bg-emerald-50 text-emerald-800",
    amber: "bg-amber-50 text-amber-800",
    red: "bg-red-50 text-red-800",
  };
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] uppercase tracking-[0.12em] ${tones[tone]}`}>{children}</span>;
}

export function Button({
  children,
  onClick,
  type = "button",
  tone = "dark",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  tone?: "dark" | "light" | "danger";
  disabled?: boolean;
}) {
  const tones = {
    dark: "bg-black text-white",
    light: "bg-white text-black border border-black/10",
    danger: "bg-red-700 text-white",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-sm disabled:opacity-40 ${tones[tone]}`}
    >
      {children}
    </button>
  );
}

export function useUnsaved(dirty: boolean) {
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
}

export function SaveState({ state, updatedAt }: { state: string; updatedAt?: string | null }) {
  return (
    <p className="text-xs text-neutral-500">
      {state}
      {updatedAt ? ` · Updated ${new Date(updatedAt).toLocaleString()}` : ""}
    </p>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">{children}</p>;
}
