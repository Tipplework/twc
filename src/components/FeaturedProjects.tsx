import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectData } from '../lib/projectData';

export const FeaturedProjects = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const slides = projectData.slice(0, 6); // Adjust number as needed
  const slideCount = slides.length;

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [slideCount]);

  // Scroll to current slide
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollTo({
        left: carousel.offsetWidth * current,
        behavior: 'smooth',
      });
    }
  }, [current]);

  // Manual navigation
  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  return (
    <section className="relative bg-white pt-0 md:pt-0"> {/* pt-0 removes mobile black padding */}
      <div
        ref={carouselRef}
        className="flex overflow-x-hidden w-full scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {slides.map((project) => (
          <Link
            key={project.slug}
            to={`/project/${project.slug}`}
            className="min-w-full h-[100dvh] relative group"
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/60 hover:bg-white text-black rounded-full p-2 shadow md:block"
        aria-label="Previous slide"
      >
        &#8592;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/60 hover:bg-white text-black rounded-full p-2 shadow md:block"
        aria-label="Next slide"
      >
        &#8594;
      </button>
    </section>
  );
};
