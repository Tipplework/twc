import React from "react";

const Services = () => {
  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center text-white text-center px-6 py-20">
      {/* Tipple Works Logo */}
      <img
        src="/lovable-uploads/twc-logo.png" // ✅ Make sure this path is correct
        alt="Tipple Works Logo"
        className="h-16 mb-10"
      />

      {/* Call to Action Button */}
      <a
        href="https://example.com/tippleworks-deck.pdf" // ✅ Replace with your actual deck URL
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-black px-8 py-3 rounded-full text-base font-semibold hover:bg-gray-100 transition"
      >
        View Our Deck
      </a>
    </section>
  );
};

export default Services;
