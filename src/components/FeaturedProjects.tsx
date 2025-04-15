
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const FeaturedProjects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "SulaFest 2025",
      description: "India's premier wine and music festival",
      image: "/lovable-uploads/Sulafest.jpg"
    },
    {
      id: 2,
      title: "Buns & Slices",
      description: "Brand Identity for k hospitality QSR",
      image: "/lovable-uploads/Bunsandslices.jpg"
    },
    {
      id: 3,
      title: "Brand Photography",
      description: "Spectacular Brand Shots",
      image: "/lovable-uploads/Brandphotos.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  return (
    <section className="py-20 px-6 md:px-10 bg-white" id="featured-projects">
      <div className="container mx-auto">
        <motion.div 
          className="flex gap-2 items-center mb-6 text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="uppercase font-bold">FEATURED PROJECTS @</span>
          <span className="uppercase font-bold">TIPPLEWORKSCO</span>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Selected Work
        </motion.h2>

        <div className="relative">
          {/* Project Carousel */}
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="w-full flex-shrink-0"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
                      <h3 className="text-white text-2xl md:text-3xl font-bold">{project.title}</h3>
                      <p className="text-white/80 text-lg">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center z-10 hover:bg-white transition-colors"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center z-10 hover:bg-white transition-colors"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dot indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-black' : 'bg-gray-300'}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
