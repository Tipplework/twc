import { Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { TwcLockup } from "@/components/brand/TwcLockup";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-20 md:pt-28 pb-12">
        <TwcLockup animate={false} className="w-[min(100%,720px)]" />

        <div className="mt-16 grid grid-cols-2 gap-10 max-w-md">
          <div>
            <h3 className="twc-micro text-white/45">Navigation</h3>
            <ul className="mt-5 space-y-3">
              <li><Link to="/" className="text-white/80 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-white/80 hover:text-white">About</Link></li>
              <li><Link to="/work" className="text-white/80 hover:text-white">Work</Link></li>
              <li><Link to="/services" className="text-white/80 hover:text-white">Services</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="twc-micro text-white/45">Connect</h3>
            <div className="mt-5 flex gap-5">
              <a
                href="https://www.instagram.com/tippleworksco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/tippleworksco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-white/50">
        <p>© 2025 Tipple Works Private Limited. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/privacy-policy" className="text-white/50 hover:text-white mr-4">Privacy Policy</Link>
          <Link to="/terms-of-service" className="text-white/50 hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
