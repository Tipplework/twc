import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { useTransform } from "framer-motion";
import { useSpring } from "framer-motion";
import { useVelocity } from "framer-motion";
import { useRefScrollProgress } from "@/hooks/use-ref-scroll-progress";
import { useSectionObserver } from "@/hooks/use-section-observer";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold">Tipple Works Co.</h1>
    </div>
  );
};

export const BlackHero = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <img
        src="/logo.png"
        alt="Tipple Works Co. Logo"
        className="w-[280px] md:w-[380px] lg:w-[480px]"
      />
    </div>
  );
};

export const Shlok = () => {
  return (
    <section className="flex justify-center items-end h-[calc(100vh-64px)]">
      <motion.div
        className="text-white text-center mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex justify-center space-x-3">
          <div className="flex-1 bg-tipple-yellow h-1.5" />
          <div className="flex-1 bg-tipple-red h-1.5" />
          <div className="flex-1 bg-tipple-purple h-1.5" />
        </div>
      </motion.div>
    </section>
  );
};

export const VissionStatement = () => {
  return (
    <section className="px-4 py-6 lg:px-8 lg:py-16 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
        <p className="text-lg leading-relaxed">
          We collaborate with innovative brands across various industries, helping them reach new heights with our creative solutions. At Tipple Works Co., we don’t just craft campaigns—we build brands, drive growth, and shape the future of business.
        </p>
      </div>
    </section>
  );
};

// ✅ Export all non-default components here
export { Shlok, VissionStatement };

// ✅ Default export for main page
export default Home;
