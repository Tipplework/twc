import React from "react";
import { motion } from "framer-motion";

// 💡 Hero section with logo on black
const BlackHero = () => {
  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Tipple Works Co. Logo"
          className="w-[280px] md:w-[380px] lg:w-[480px]"
        />
      </div>

      {/* Colored bar at the bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex h-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex-1 bg-tipple-yellow"></div>
        <div className="flex-1 bg-tipple-red"></div>
        <div className="flex-1 bg-tipple-purple"></div>
      </motion.div>
    </>
  );
};

// 💡 Shlok section placeholder
const Shlok = () => (
  <section className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center py-6">
    <h2 className="text-2xl font-bold">Shlok</h2>
    <p>This is where your Shlok content will go.</p>
  </section>
);

// 💡 Vision statement section placeholder
const VissionStatement = () => (
  <section className="bg-white text-black px-6 py-10">
    <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
    <p>
      Tipple Works Co. is a creative marketing agency that transforms brands
      with bold thinking, beautiful design, and performance-driven strategies.
    </p>
  </section>
);

// ✅ Default export for hero page
export default BlackHero;

// ✅ Named exports (no duplicates)
export { Shlok, VissionStatement };
