
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
    className="text-xl md:text-2xl font-semibold text-black hover:text-neutral-500 transition-colors"
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
        <button
          className="z-50 text-black"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Improved Drop Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-md border-t transition-all duration-300 z-40 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto py-8' : 'opacity-0 pointer-events-none py-0'
        }`}
      >
        <div className="flex flex-col items-center space-y-6">
          <NavLink href="/" label="Home" onClick={closeMenu} />
          <NavLink href="/about" label="About" onClick={closeMenu} />
          <NavLink href="/work" label="Work" onClick={closeMenu} />
          <NavLink href="/services" label="Services" onClick={closeMenu} />
          <NavLink href="/contact" label="Contact" onClick={closeMenu} />
        </div>
      </div>
    </header>
  );
};
