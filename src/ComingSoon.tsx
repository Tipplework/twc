import React from 'react';

export default function ComingSoon() {
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-center px-4">
      <img
        src="/twc-logo.png"
        alt="Tipple Works Co. Logo"
        className="w-72 mb-6"
      />
      <h1 className="text-white text-2xl md:text-4xl font-bold">
        Our New Website is Launching Soon!
      </h1>
    </div>
  );
}
