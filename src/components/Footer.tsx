import { Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { fallbackFooterNav, fallbackLegal, fallbackSettings } from "@/lib/cms/fallback";
import { useNav, useSiteSettings } from "@/lib/cms/usePublic";

const Footer = () => {
  const settings = useSiteSettings(fallbackSettings);
  const links = useNav("footer", fallbackFooterNav);
  const legal = useNav("legal", fallbackLegal);

  return (
    <footer className="bg-white text-black border-t border-black/10">
      <div className="mx-auto max-w-[1120px] px-6 md:px-10 py-14 flex flex-col lg:flex-row justify-between items-start gap-10">
        <img src="/lovable-uploads/twc-logo.png" alt="Tipple Works Co." className="h-8" />

        <div className="grid grid-cols-2 gap-12">
          <div>
            <h3 className="twc-micro text-black/45">Navigation</h3>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.id}><Link to={link.href} className="text-black/70 hover:text-black">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="twc-micro text-black/45">Connect</h3>
            <div className="mt-4 flex gap-5">
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-black/70 hover:text-black" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="text-black/70 hover:text-black" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 py-6 text-center text-sm text-black/50">
        <p>{settings.copyright}</p>
        <div className="mt-2">
          {legal.map((link, index) => (
            <Link key={link.id} to={link.href} className={index === legal.length - 1 ? "hover:text-black" : "hover:text-black mr-4"}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
