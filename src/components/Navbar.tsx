
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const NavLink = ({ href, label, onClick }: NavLinkProps) => (
  <Link 
    to={href} 
    className="hover-link py-2 px-4 nav-item"
    onClick={onClick}
  >
    {label}
  </Link>
);

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
        isScrolled ? "bg-white/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      
            src="/lovable-uploads/50a52fb1-e68c-4f55-8d9b-8f706d18b161.png" 
            alt="Tipple Works Co." 
            className="h-10 md:h-12 w-auto"
            style={{
              opacity: isLogoHovered ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
          <img 
            src="/lovable-uploads/260ff3be-b535-429f-a94b-22d4394053b2.png" 
            alt="Tipple Works Co." 
            className="h-10 md:h-12 w-auto absolute top-0 left-0"
            style={{
              opacity: isLogoHovered ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
          <NavLink href="/work" label="Work" />
          <NavLink href="/services" label="Services" />
          <NavLink href="/contact" label="Contact" />
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden z-50 p-2" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

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
      </div>
    </header>
  );
};
