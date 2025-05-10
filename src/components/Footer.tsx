import { Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-10 bg-white border-t border-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          {/* Logo */}
          <Link to="/" className="flex items-center mb-6 md:mb-0">
            <img 
              src="/lovable-uploads/TWC Logoblack.png" 
              alt="Tipple Works Co." 
              className="h-5 w-auto"
            />
          </Link>
          
          {/* Navigation */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="space-y-3">
              <p className="text-sm text-gray-400">Navigation</p>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-600 hover:text-black transition-colors">Home</Link>
                <Link to="/about" className="block text-gray-600 hover:text-black transition-colors">About</Link>
                <Link to="/work" className="block text-gray-600 hover:text-black transition-colors">Work</Link>
                <Link to="/services" className="block text-gray-600 hover:text-black transition-colors">Services</Link>
                <Link to="/contact" className="block text-gray-600 hover:text-black transition-colors">Contact</Link>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-400">Connect</p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/tippleworksco/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors inline-flex"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/company/tippleworksco/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors inline-flex"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-sm text-gray-400">
          <p>© 2025 Tipple Works Private Limited. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
