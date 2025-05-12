import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectData } from '../lib/projectData';

export const FeaturedProjects = () => {
  const isMobile = window.innerWidth < 768;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const slides = projectData.slice(0, 6);
  const slideCount = slides.length;

  // Auto scroll every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [slideCount]);

  // Scroll to current index
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
    <section className={`relative bg-white ${isMobile ? 'pt-0' : 'py-16 px-4'}`} id="featured">
      <div
        ref={carouselRef}
        className={`flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar ${
          isMobile ? 'h-[100dvh]' : 'max-w-6xl mx-auto gap-6'
        }`}
      >
        {slides.map((project, i) => (
          <Link
            to={`/project/${project.slug}`}
            key={project.slug}
            className={`relative flex-shrink-0 ${
              isMobile ? 'w-screen h-full snap-center' : 'w-full sm:w-[48%] md:w-[32%] aspect-video rounded-lg overflow-hidden'
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </Link>
        ))}
      </div>

      {/* Arrows for Desktop only */}
      {!isMobile && (
        <>
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
        </>
      )}
    </section>
  );
};
