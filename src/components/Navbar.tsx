import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { TwcCircles } from "@/components/brand/TwcCircles";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
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
      <div className="flex justify-end items-center h-16 gap-4">
        <span className="twc-nav-mark" style={{ ["--spread" as string]: isMenuOpen ? 1 : 0 }}>
          <TwcCircles size={8} still />
        </span>
        <button
          className="z-50"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-out",
          isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className={cn("overflow-hidden bg-white text-black", !isMenuOpen && "pointer-events-none")}>
          <nav className="flex flex-col items-center gap-5 py-10" aria-hidden={!isMenuOpen}>
            {links.map((link, index) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="twc-heading flex items-center gap-3 text-black"
                  style={{
                    transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: isMenuOpen ? `${80 + index * 50}ms` : "0ms",
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "translateY(0)" : "translateY(12px)",
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full bg-tipple-red transition-opacity duration-300"
                    style={{ opacity: active ? 1 : 0 }}
                  />
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
