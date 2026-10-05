import { Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-black/10">
      <div className="mx-auto max-w-[1120px] px-6 md:px-10 py-14 flex flex-col lg:flex-row justify-between items-start gap-10">
        <img src="/lovable-uploads/twc-logo.png" alt="Tipple Works Co." className="h-8" />

        <div className="grid grid-cols-2 gap-12">
          <div>
            <h3 className="twc-micro text-black/45">Navigation</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/" className="text-black/70 hover:text-black">Home</Link></li>
              <li><Link to="/about" className="text-black/70 hover:text-black">About</Link></li>
              <li><Link to="/work" className="text-black/70 hover:text-black">Work</Link></li>
              <li><Link to="/services" className="text-black/70 hover:text-black">Services</Link></li>
              <li><Link to="/contact" className="text-black/70 hover:text-black">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="twc-micro text-black/45">Connect</h3>
            <div className="mt-4 flex gap-5">
              <a href="https://www.instagram.com/tippleworksco" target="_blank" rel="noopener noreferrer" className="text-black/70 hover:text-black" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/tippleworksco" target="_blank" rel="noopener noreferrer" className="text-black/70 hover:text-black" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 py-6 text-center text-sm text-black/50">
        <p>© 2025 Tipple Works Private Limited. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/privacy-policy" className="hover:text-black mr-4">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-black">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
