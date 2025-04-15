import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// Components for export
const Shlok = () => (
  <section className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center py-6">
    <h2 className="text-2xl font-bold">Shlok</h2>
    <p>This is where your Shlok content will go.</p>
  </section>
);

const VissionStatement = () => (
  <section className="bg-white text-black px-6 py-10">
    <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
    <p>
      Tipple Works Co. is a creative marketing agency that transforms brands with bold thinking, beautiful design, and
      performance-driven strategies.
    </p>
  </section>
);

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

const Home = () => {
  const containerRef = useRef(null);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["build", "stand out", "win awards"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="text-white text-center py-16">
      <h1 className="text-4xl font-bold">
        Tipple Works Co.
      </h1>
      <p className="mt-4 text-xl">We {words[currentWord]}</p>
    </div>
  );
};

// ✅ Final exports
export { BlackHero, Shlok, VissionStatement };
export default Home;
