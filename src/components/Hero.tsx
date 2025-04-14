
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center relative px-6 md:px-10 py-20">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/10 via-black to-black pointer-events-none"></div>

      <div className="container mx-auto relative z-10 mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 md:col-start-2">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's Create
          </motion.h1>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-zinc-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl">
              +91 9810035669
            </p>
            <p className="text-lg md:text-xl">
              srishti.bhatia@tippeworks.com
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              to="/contact" 
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-opacity-90 transition-all duration-300"
            >
              Start a Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Colored bar at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex h-1.5">
        <div className="flex-1 bg-tipple-yellow"></div>
        <div className="flex-1 bg-tipple-red"></div>
        <div className="flex-1 bg-tipple-purple"></div>
      </div>
    </section>
  );
};
