import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectData } from '../lib/projectData';

export const FeaturedProjects = () => {
  const [current, setCurrent] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const projects = projectData.slice(0, 6); // Adjust count as needed

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile, projects.length]);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % projects.length);
  };

  return (
    <section
      className={`relative ${
        isMobile ? 'pt-0 -mt-10' : 'py-16 px-4'
      } bg-white text-black`}
      id="featured"
    >
      {!isMobile && (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Selected Work
        </h2>
      )}

      <div
        className={`relative max-w-6xl mx-auto transition-all duration-500 ease-in-out ${
          isMobile ? 'w-full h-[60vh] overflow-hidden' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
        }`}
      >
        {projects.map((project, index) => {
          const show = isMobile ? index === current : true;
          return (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className={`block rounded-lg overflow-hidden relative ${
                isMobile && !show ? 'hidden' : ''
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {isMobile && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-2xl font-semibold">
                  {project.title}
                </div>
              )}
            </Link>
          );
        })}

        {/* Arrows - Mobile only */}
        {isMobile && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md z-10"
            >
              &#8592;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md z-10"
            >
              &#8594;
            </button>
          </>
        )}
      </div>
    </section>
  );
};
