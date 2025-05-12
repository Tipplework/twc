import { useEffect, useRef, useState } from 'react';
import { projectData } from '../lib/projectData';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const FeaturedProjects = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const visibleProjects = projectData.slice(0, 10); // Adjust as needed

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [scrollIndex]);

  const scrollByIndex = (index: number) => {
    const container = scrollContainer.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement;
    if (child) child.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    scrollIntervalRef.current = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % visibleProjects.length);
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    stopAutoScroll();
    setScrollIndex((prev) =>
      direction === 'left'
        ? (prev - 1 + visibleProjects.length) % visibleProjects.length
        : (prev + 1) % visibleProjects.length
    );
  };

  useEffect(() => {
    scrollByIndex(scrollIndex);
  }, [scrollIndex]);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="relative">
        {/* Carousel container */}
        <div
          ref={scrollContainer}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {visibleProjects.map((project, idx) => (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className="min-w-full flex-shrink-0 snap-center relative"
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-screen object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </Link>
          ))}
        </div>

        {/* Left arrow */}
        <button
          onClick={() => handleArrowClick('left')}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black transition"
        >
          &#8592;
        </button>

        {/* Right arrow */}
        <button
          onClick={() => handleArrowClick('right')}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black transition"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};
