import React from 'react';
import { Instagram, Twitter, Linkedin, Circle } from 'lucide-react';

const FloatingSocials = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
      <a href="https://instagram.com/tippleworksco" target="_blank" rel="noopener noreferrer">
        <div className="bg-black p-2 rounded-full hover:bg-tipple-yellow transition">
          <Instagram className="text-white w-5 h-5" />
        </div>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <div className="bg-black p-2 rounded-full hover:bg-tipple-red transition">
          <Twitter className="text-white w-5 h-5" />
        </div>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <div className="bg-black p-2 rounded-full hover:bg-tipple-purple transition">
          <Linkedin className="text-white w-5 h-5" />
        </div>
      </a>
      <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer">
        <div className="bg-black p-2 rounded-full hover:bg-yellow-400 transition">
          <Circle className="text-white w-5 h-5" />
        </div>
      </a>
    </div>
  );
};

export default FloatingSocials;
