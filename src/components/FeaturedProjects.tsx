import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectData } from '../lib/projectData';

export const FeaturedProjects = () => {
  const [current, setCurrent] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const projects = projectData.slice(0, 6); // Adjust as needed

  // Auto-cycle every 3 seconds on mobile
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
    <section className={`relative bg-white ${isMobile ? 'pt-0' : 'py-16 px-4'} text-black`} id="featured">
      {!isMobile && (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Selected Work</h2>
      )}

      <div
        className={`relative max-w-6xl mx-auto grid gap-6 transition-all duration-500 ease-in-out ${
          isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
        }`}
      >
        {projects.map((project, index) => {
          const show = isMobile ? index === current : true;

          return (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className={`block overflow-hidden rounded-lg shadow hover:shadow-lg transition-all duration-500 ease-in-out ${
                isMobile && !show ? 'hidden' : ''
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover aspect-video"
                loading="lazy"
              />
            </Link>
          );
        })}
      </div>

      {isMobile && (
        <div className="flex justify-between items-center mt-6 px-4">
          <button
            onClick={handlePrev}
            className="bg-black text-white p-2 rounded-full"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="bg-black text-white p-2 rounded-full"
          >
            &#8594;
          </button>
        </div>
      )}
    </section>
  );
};
