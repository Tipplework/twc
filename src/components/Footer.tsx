// src/components/Footer.tsx

import { Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-start">
        {/* Logo */}
        <div className="mb-8 lg:mb-0">
          <img
            src="/lovable-uploads/twc-logo.png"
            alt="Tipple Works Logo"
            className="h-8"
          />
        </div>

        {/* Navigation and Connect */}
        <div className="grid grid-cols-2 gap-8">
          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-700 hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-base text-gray-700 hover:text-black">
                  About
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-base text-gray-700 hover:text-black">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-base text-gray-700 hover:text-black">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-700 hover:text-black">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Connect
            </h3>
            <div className="mt-4 flex space-x-6">
              <a
                href="https://www.instagram.com/tippleworksco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/tippleworksco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <p>© 2025 Tipple Works Private Limited. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/privacy-policy" className="text-gray-500 hover:text-black mr-4">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-gray-500 hover:text-black">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
