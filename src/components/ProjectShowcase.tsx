
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
};

export const ProjectShowcase = () => {
  // Sample project data
  const projects: Project[] = [
    {
      id: 1,
      title: "Estate Monkeys",
      description: "Brand identity for luxury real estate platform",
      imageUrl: "/lovable-uploads/1264f900-dda5-4b12-8c00-19b29f188ab5.png",
      category: "Brand Identity"
    },
    {
      id: 2,
      title: "Matero",
      description: "Complete visual identity system & packaging",
      imageUrl: "/lovable-uploads/f99330e1-a20a-4e9f-bba0-495d93a93776.png",
      category: "Packaging"
    },
    {
      id: 3,
      title: "Space Coffee",
      description: "Immersive brand experience & store design",
      imageUrl: "/lovable-uploads/01cc5927-55a8-440c-aebb-ae5d97e0495e.png",
      category: "Brand Experience"
    },
    {
      id: 4,
      title: "Desi Streat",
      description: "Contemporary brand identity for fusion cuisine",
      imageUrl: "/lovable-uploads/b6fed313-87ea-465d-b759-68775fc17809.png",
      category: "Hospitality"
    },
    {
      id: 5,
      title: "Sula Fest",
      description: "Event branding and spatial design",
      imageUrl: "/lovable-uploads/b8e2f36f-0193-4feb-9e85-339d2f7f5c04.png",
      category: "Events"
    },
    {
      id: 6,
      title: "Sprig Gourmet",
      description: "Packaging design system for premium foods",
      imageUrl: "/lovable-uploads/dbb0fa30-3a2d-4b38-8c82-9f8864152a6c.png",
      category: "Packaging"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay, currentIndex]);

  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);

  return (
    <section className="relative py-32 px-6 md:px-10 bg-white" id="projects">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0 md:gap-x-12">
          <div className="md:col-span-4">
            <motion.div 
              className="flex gap-2 items-center mb-6 text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span>FEATURED PROJECTS @</span>
              <span className="uppercase font-bold">TIPPLEWORKSCO</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Selected Work
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore our portfolio of strategic design and marketing solutions for forward-thinking brands.
            </motion.p>
            
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="p-3 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
              
              <button
                onClick={nextSlide}
                className="p-3 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
              
              <div className="flex-1 flex justify-end">
                <p className="text-sm text-gray-400">
                  <span className="text-black font-medium">{currentIndex + 1}</span>
                  <span> / {projects.length}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div 
            className="md:col-span-8 relative overflow-hidden"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                  <img 
                    src={projects[currentIndex].imageUrl} 
                    alt={projects[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-sm uppercase tracking-wider text-white/80">
                    {projects[currentIndex].category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                    {projects[currentIndex].title}
                  </h3>
                  <p className="text-white/90 mt-1">
                    {projects[currentIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-4 right-8 z-10 hidden md:flex gap-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
