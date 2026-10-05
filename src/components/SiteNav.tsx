import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Capabilities" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 z-40 w-full mix-blend-difference text-white">
        <div className="site-pad flex items-center justify-between py-5">
          <Link to="/" className="text-sm font-semibold tracking-[-0.04em]" aria-label="Tipple Works Co. home">
            Tipple Works Co.
          </Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {links.map((link) => (
              <Link key={link.href} to={link.href} className="text-sm tracking-[-0.02em] opacity-80 hover:opacity-100">
                {link.label}
              </Link>
            ))}
          </nav>
          <button className="text-sm md:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Menu">
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#070707] px-6 pb-16 pt-24 text-[#f3efe6] md:hidden">
          <button className="absolute right-6 top-6 text-sm" onClick={() => setOpen(false)}>Close</button>
          {links.map((link) => (
            <Link key={link.href} to={link.href} className="border-t border-white/15 py-4 text-4xl font-semibold tracking-[-0.05em]">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
