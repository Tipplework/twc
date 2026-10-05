import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import { fallbackSettings } from "@/lib/cms/fallback";
import { useSiteSettings } from "@/lib/cms/usePublic";

const FloatingSocials = () => {
  const settings = useSiteSettings(fallbackSettings);
  return (
    <div className="fixed bottom-6 left-6 z-50 hidden md:flex flex-col gap-2">
      <a
        href={settings.instagram_floating}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="bg-black p-1.5 rounded-full hover:bg-tipple-yellow transition">
          <Instagram className="text-white w-3 h-3" />
        </div>
      </a>
      <a
        href={settings.linkedin_floating}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="bg-black p-1.5 rounded-full hover:bg-tipple-purple transition">
          <Linkedin className="text-white w-3 h-3" />
        </div>
      </a>
    </div>
  );
};

export default FloatingSocials;
