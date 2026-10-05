import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { fallbackHeader } from "@/lib/cms/fallback";
import { useNav } from "@/lib/cms/usePublic";

export const Navbar = () => {
  const links = useNav("header", fallbackHeader).map((link) => ({ href: link.href, label: link.label }));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const lightPage =
    location.pathname === "/about" ||
    location.pathname.startsWith("/project/") ||
    location.pathname.startsWith("/admin");
  const onDark = !isScrolled && !isMenuOpen && !lightPage;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 px-6 md:px-10 transition-colors duration-300",
        isMenuOpen || isScrolled ? "bg-white text-black" : "bg-transparent",
        onDark ? "text-white" : "text-black"
      )}
    >
      <div className="flex justify-end items-center h-16">
        <button
          className="z-50"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>
      </div>

      <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className={cn("overflow-hidden bg-white text-black", !isMenuOpen && "pointer-events-none")}>
          <nav className="flex flex-col items-center gap-6 py-8" aria-hidden={!isMenuOpen}>
            {links.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className={cn(
                    "text-2xl font-medium tracking-[-0.03em]",
                    active ? "text-black" : "text-black/45 hover:text-black"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
