
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-10 bg-black border-t border-zinc-900">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 mb-6 md:mb-0">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-tipple-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-tipple-red ml-0.5"></div>
              <div className="w-3 h-3 rounded-full bg-tipple-purple ml-0.5"></div>
            </div>
            <span className="ml-2 font-bold text-xl">tipple works co.</span>
          </Link>
          
          {/* Navigation */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="space-y-3">
              <p className="text-sm text-zinc-500">Navigation</p>
              <div className="space-y-2">
                <Link to="/" className="block text-zinc-400 hover:text-white transition-colors">Home</Link>
                <Link to="/about" className="block text-zinc-400 hover:text-white transition-colors">About</Link>
                <Link to="/work" className="block text-zinc-400 hover:text-white transition-colors">Work</Link>
                <Link to="/services" className="block text-zinc-400 hover:text-white transition-colors">Services</Link>
                <Link to="/contact" className="block text-zinc-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-zinc-500">Contact</p>
              <div className="space-y-2">
                <a href="tel:+919810035669" className="block text-zinc-400 hover:text-white transition-colors">+91 9810035669</a>
                <a href="mailto:srishti.bhatia@tippeworks.com" className="block text-zinc-400 hover:text-white transition-colors">srishti.bhatia@tippeworks.com</a>
                <div className="pt-2">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-full transition-colors inline-flex"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900 text-sm text-zinc-500">
          <p>© {currentYear} Tipple Works Co. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
