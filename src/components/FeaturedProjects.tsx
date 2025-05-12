import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { projectData } from "../lib/projectData";

export const FeaturedProjects = () => {
  const featured = projectData.slice(0, 5); // Top 5 featured projects
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => (prev + 1) % featured.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + featured.length) % featured.length);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <section className="py-16 px-4 bg-white text-black relative overflow-hidden" {...swipeHandlers}>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Selected Work
      </h2>

      <div className="max-w-4xl mx-auto relative h-[250px] sm:h-[320px] md:h-[400px] lg:h-[450px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={featured[index].slug}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full"
          >
            <Link to={`/project/${featured[index].slug}`}>
              <img
                src={featured[index].image}
                alt={featured[index].title}
                className="w-full h-full object-cover rounded-xl shadow-md"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white rounded-b-xl">
                <h3 className="text-lg md:text-2xl font-semibold">{featured[index].title}</h3>
                <p className="text-sm md:text-base opacity-80">{featured[index].category}</p>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-3 mt-6">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
