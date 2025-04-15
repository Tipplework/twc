import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import About from "./About";
import Work from "./Work";
import Services from "./Services";
import Contact from "./Contact";
import NotFound from "./NotFound";

import Footer from "../components/Footer";
import Shlok from "../components/Shlok";
import VisionStatement from "../components/VisionStatement";

const queryClient = new QueryClient();

// BlackHero Section – Hero Logo on Black Background
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

// Main Page Content
const Index = () => {
  return (
    <>
      <BlackHero />
      <main className="bg-black text-white">
        <About />
        <Work />
        <Services />
        <Contact />
        <Shlok />
        <VisionStatement />
        <Footer />
      </main>
    </>
  );
};

export default Index;
