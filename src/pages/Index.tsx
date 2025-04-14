
import { useEffect, useState, useRef } from 'react';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Clients } from '@/components/Clients';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { motion, useScroll, useTransform } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    // Update the document title
    document.title = "Tipple Works Co. | Creative Marketing Agency";
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div className="bg-white text-black min-h-screen grid grid-cols-1" ref={containerRef}>
      <CustomCursor />
      <Navbar />

      <main className="grid grid-cols-1 w-full">
        <Hero />
        <Services />
        <Clients />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
