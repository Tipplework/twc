import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectData } from '../lib/projectData';

export const FeaturedProjects = () => {
  const [current, setCurrent] = useState(0);
  const projects = projectData.slice(0, 6);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [projects.length]);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % projects.length);
  };

  return (
    <section className="pt-0 -mt-10 pb-4 bg-white" id="featured">
      <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            to={`/project/${project.slug}`}
            className={`absolute transition-opacity duration-500 ease-in-out w-[90%] max-w-5xl h-full rounded-xl overflow-hidden shadow-md ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </Link>
        ))}

        {/* Arrow Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white text-black rounded-full p-3 shadow"
        >
          &#8592;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white text-black rounded-full p-3 shadow"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};
