import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { Testimonials } from "@/components/Testimonials";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ServicesAccordion } from "@/components/ServicesAccordion";
import { Clients } from "@/components/Clients";
import { FeaturedProjects } from "@/components/FeaturedProjects";

const Index = () => {
  useEffect(() => {
    document.title = "Tipple Works Co. | Creative Marketing Agency";
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div className="bg-white text-black min-h-screen grid grid-cols-1" ref={containerRef}>
      <CustomCursor />
      <Navbar />

      <main className="grid grid-cols-1 w-full">
        <div className="min-h-screen bg-black flex flex-col justify-center items-center">
          <img
            src="/logo.png"
            alt="Tipple Works Co. Logo"
            className="w-[280px] md:w-[380px] lg:w-[480px]"
          />
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
        </div>

        <FeaturedProjects />
        <Clients />
        <Testimonials />
        <ServicesAccordion />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
