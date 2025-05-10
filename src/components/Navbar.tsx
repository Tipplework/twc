// src/components/Navbar.tsx

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const NavLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => (
  <Link
    to={href}
    onClick={onClick}
    className="text-2xl md:text-3xl font-medium text-black hover:text-neutral-500 transition-colors"
  >
    {label}
  </Link>
);

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close the menu when navigating
    closeMenu();
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="flex justify-end items-center">
        {/* Universal Hamburger Button (both desktop & mobile) */}
        <button
          className="z-50 text-black"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Fullscreen Nav Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-10 text-center transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <NavLink href="/" label="Home" onClick={closeMenu} />
        <NavLink href="/about" label="About" onClick={closeMenu} />
        <NavLink href="/work" label="Work" onClick={closeMenu} />
        <NavLink href="/services" label="Services" onClick={closeMenu} />
        <NavLink href="/contact" label="Contact" onClick={closeMenu} />
      </div>
    </header>
  );
};
