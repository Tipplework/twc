
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Testimonials } from '@/components/Testimonials';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { ServicesAccordion } from '@/components/ServicesAccordion';
import { Clients } from '@/components/Clients';

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
        <ProjectShowcase />
        <ServicesAccordion />
        <Testimonials />
        <Clients />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

const Hero = () => {
  return (
    <section className="min-h-[90vh] bg-white text-black flex flex-col justify-center relative px-6 md:px-10 py-20 overflow-hidden">
      <div className="container mx-auto relative z-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-10 md:col-start-2">
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-black"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Tipple Works Co.
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We design brand experiences that create lasting connections. Strategic marketing solutions for brands that want to stand out.
            </motion.p>
          </div>
        </div>
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
    </section>
  );
};

export default Index;
