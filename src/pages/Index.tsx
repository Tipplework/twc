import React from "react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Shlok from "@/components/Shlok";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Work from "@/components/Work";
import About from "@/components/About";
import Industries from "@/components/Industries";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      {/* ✅ BlackHero Section (Logo on Black Background) */}
      <div className="min-h-screen bg-black flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Tipple Works Co. Logo"
          className="w-[280px] md:w-[380px] lg:w-[480px]"
        />
      </div>

      {/* ✅ Colored Bar */}
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

      {/* ✅ All original homepage sections below */}
      <Navbar />
      <Shlok />
      <Hero />
      <Clients />
      <Services />
      <Work />
      <About />
      <Industries />
      <Contact />
      <Footer />
    </>
  );
};

export default Index;
