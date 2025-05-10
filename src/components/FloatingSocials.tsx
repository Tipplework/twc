import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

const FloatingSocials = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-3 md:bottom-6 md:left-6">
      <a
        href="https://www.instagram.com/tippleworksco/"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="bg-black p-2 rounded-full hover:bg-tipple-yellow transition md:p-3">
          <Instagram className="text-white w-4 h-4 md:w-5 md:h-5" />
        </div>
      </a>
      <a
        href="https://in.linkedin.com/company/tippleworksco"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="bg-black p-2 rounded-full hover:bg-tipple-purple transition md:p-3">
          <Linkedin className="text-white w-4 h-4 md:w-5 md:h-5" />
        </div>
      </a>
    </div>
  );
};

export default FloatingSocials;
