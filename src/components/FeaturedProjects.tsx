import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectData } from '../lib/projectData';

export const FeaturedProjects = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = projectData.slice(0, 6); // Adjust number of featured items

  // Auto-scroll every 3s on mobile only
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, slides.length]);

  // Scroll on index change
  useEffect(() => {
    if (!isMobile || !carouselRef.current) return;

    const scrollTo = carouselRef.current.offsetWidth * currentIndex;
    carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
  }, [currentIndex, isMobile]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className={`relative bg-white ${isMobile ? 'pt-0' : 'py-16 px-4'}`} id="featured">
      {isMobile ? (
        // --------- MOBILE: HORIZONTAL FULLSCREEN SCROLL ---------
        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar w-screen h-[100dvh]"
          >
            {slides.map((project) => (
              <Link
                key={project.slug}
                to={`/project/${project.slug}`}
                className="w-full flex-shrink-0 snap-center relative"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 text-black rounded-full p-2"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 text-black rounded-full p-2"
          >
            &#8594;
          </button>
        </div>
      ) : (
        // --------- DESKTOP: GRID DISPLAY (NO SCROLL) ---------
        <>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Selected Work</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {slides.map((project) => (
              <Link
                key={project.slug}
                to={`/project/${project.slug}`}
                className="block overflow-hidden rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover aspect-video"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
