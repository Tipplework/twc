import FloatingSocials from '@/components/FloatingSocials';
import React, { lazy, Suspense, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { Testimonials } from "@/components/Testimonials";
import { ServicesAccordion } from "@/components/ServicesAccordion";
import { Clients } from "@/components/Clients";
import { FeaturedProjects } from "@/components/FeaturedProjects";

const HeroDepth = lazy(() => import("@/components/three/HeroDepth"));

const Index = () => {
  const [depth, setDepth] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const logoX = useSpring(pointerX, { stiffness: 40, damping: 20 });
  const logoY = useSpring(pointerY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    document.title = "Tipple Works Co. | Creative Marketing Agency";
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 900;
    if (reduced || coarse || narrow) return;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return;
    const start = () => setDepth(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="bg-white text-black min-h-screen grid grid-cols-1">
      <CustomCursor />
      <Navbar />

      <main className="grid grid-cols-1 w-full">
        <div
          className="relative min-h-screen bg-black flex flex-col justify-center items-center overflow-hidden"
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 24);
            pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 16);
          }}
          onMouseLeave={() => {
            pointerX.set(0);
            pointerY.set(0);
          }}
        >
          {depth && (
            <Suspense fallback={null}>
              <HeroDepth />
            </Suspense>
          )}
          <motion.img
            src="/twc-logo.png"
            alt="Tipple Works Co. Logo"
            className="relative z-10 w-[280px] md:w-[380px] lg:w-[480px]"
            style={{ x: logoX, y: logoY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 flex h-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex-1 bg-tipple-yellow"></div>
            <div className="flex-1 bg-tipple-red"></div>
            <div className="flex-1 bg-tipple-purple"></div>
          </motion.div>
        </div>

        {/* ✅ Homepage Sections */}
        <FeaturedProjects />
        <Clients />
        <Testimonials />
        <ServicesAccordion />
      </main>

      <FloatingSocials />
      <Footer />
    </div>
  );
};

export default Index;
