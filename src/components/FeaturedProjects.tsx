import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectData } from '../lib/projectData';

export const FeaturedProjects = () => {
  const projects = projectData.slice(0, 5);
  const [[index, direction], setIndex] = useState([0, 0]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const paginate = (newDirection: number) => {
    setIndex(([prevIndex]) => {
      const nextIndex = (prevIndex + newDirection + projects.length) % projects.length;
      return [nextIndex, newDirection];
    });
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => paginate(1), 2000); // Auto-scroll every 2 sec
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <section className="py-16 px-4 bg-white text-black overflow-hidden">
      {/* ✅ Original heading style restored */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Selected Work
      </h2>

      <div className="relative max-w-4xl mx-auto h-[280px] md:h-[400px] overflow-hidden rounded-xl flex justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={projects[index].slug}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-0 w-full h-full flex justify-center"
          >
            <Link to={`/project/${projects[index].slug}`} className="block w-full h-full relative group max-w-3xl">
              <motion.img
                src={projects[index].image}
                alt={projects[index].title}
                className="w-full h-full object-cover object-center rounded-xl shadow-md"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 1.06 }} // works on mobile tap too
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Arrows (desktop only) */}
        <button
          onClick={() => paginate(-1)}
          className="absolute top-1/2 -translate-y-1/2 left-2 bg-white/80 text-black rounded-full p-2 shadow hover:bg-white transition hidden md:block"
          aria-label="Previous Slide"
        >
          ‹
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute top-1/2 -translate-y-1/2 right-2 bg-white/80 text-black rounded-full p-2 shadow hover:bg-white transition hidden md:block"
          aria-label="Next Slide"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex([i, i > index ? 1 : -1])}
              className={`w-3 h-3 rounded-full ${i === index ? 'bg-black' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};
