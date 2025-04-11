
import { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 z-50">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-tipple-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-tipple-red ml-0.5"></div>
            <div className="w-3 h-3 rounded-full bg-tipple-purple ml-0.5"></div>
          </div>
          <span className="ml-2 font-bold text-xl">tipple works co.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
          <NavLink href="/work" label="Work" />
          <NavLink href="/services" label="Services" />
          <NavLink href="/contact" label="Contact" />
          
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
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
            "fixed inset-0 bg-black flex flex-col items-center justify-center transition-all duration-300 ease-in-out",
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col items-center space-y-6 text-2xl">
            <NavLink href="/" label="Home" onClick={closeMenu} />
            <NavLink href="/about" label="About" onClick={closeMenu} />
            <NavLink href="/work" label="Work" onClick={closeMenu} />
            <NavLink href="/services" label="Services" onClick={closeMenu} />
            <NavLink href="/contact" label="Contact" onClick={closeMenu} />
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
