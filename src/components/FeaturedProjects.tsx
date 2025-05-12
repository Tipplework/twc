import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectData } from '../lib/projectData';

export const FeaturedProjects = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const slides = projectData.slice(0, 6); // Adjust how many you want visible
  const slideCount = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [slideCount]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollTo({
        left: carousel.offsetWidth * current,
        behavior: 'smooth',
      });
    }
  }, [current]);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  return (
    <section className="relative bg-white">
      <div
        ref={carouselRef}
        className="flex overflow-x-hidden w-full scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {slides.map((project) => (
          <Link
            key={project.slug}
            to={`/project/${project.slug}`}
            className="min-w-full h-[75vh] md:h-screen relative group"
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
        className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow"
        aria-label="Previous slide"
      >
        &#8592;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow"
        aria-label="Next slide"
      >
        &#8594;
      </button>
    </section>
  );
};
