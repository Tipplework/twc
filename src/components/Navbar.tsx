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
    className="text-xl md:text-base font-medium text-black hover:text-neutral-500 transition-colors"
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
    // close menu on route change
    closeMenu();
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="flex justify-between items-center">
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
          <NavLink href="/work" label="Work" />
          <NavLink href="/services" label="Services" />
          <NavLink href="/contact" label="Contact" />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 text-black"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-8 text-3xl font-semibold transition-all duration-300 ease-in-out ${
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
