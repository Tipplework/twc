import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
        isScrolled ? "bg-white/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="flex justify-between items-center">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
          <NavLink href="/work" label="Work" />
          <NavLink href="/services" label="Services" />
          <NavLink href="/contact" label="Contact" />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center space-y-6 text-2xl">
          <NavLink href="/" label="Home" onClick={closeMenu} />
          <NavLink href="/about" label="About" onClick={closeMenu} />
          <NavLink href="/work" label="Work" onClick={closeMenu} />
          <NavLink href="/services" label="Services" onClick={closeMenu} />
          <NavLink href="/contact" label="Contact" onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};
