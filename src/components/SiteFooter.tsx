import { Link } from "react-router-dom";
import { settings } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-pad border-t border-white/10 pb-10 pt-12 text-sm text-[#a39c90]">
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <div>
          <p className="text-[#f3efe6]">Tipple Works Co.</p>
          <p className="mt-2 max-w-xs">{settings.address}</p>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <Link to="/work">Work</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Capabilities</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="flex flex-col gap-2">
            <a href={settings.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={settings.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 md:flex-row">
        <p>© {new Date().getFullYear()} Tipple Works Private Limited</p>
        <div className="flex gap-4">
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms-of-service">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
