
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center relative px-6 md:px-10 py-20">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/10 via-black to-black pointer-events-none"></div>

      <div className="container mx-auto relative z-10 mt-10">
        <div className="flex flex-col items-center text-center">
          {/* Animated entry elements */}
          <h1 
            className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Let's Create
          </h1>
          
          <div 
            className="flex flex-col lg:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up" 
            style={{ animationDelay: '0.4s' }}
          >
            <p className="text-lg md:text-xl text-zinc-400">
              +91 9810035669
            </p>
            <span className="hidden lg:block text-zinc-600">•</span>
            <p className="text-lg md:text-xl text-zinc-400">
              srishti.bhatia@tippeworks.com
            </p>
          </div>
          
          <div 
            className="mt-12 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.6s' }}
          >
            <Link 
              to="/contact" 
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-opacity-90 transition-all duration-300"
            >
              Start a Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Colored bar at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex h-1.5">
        <div className="flex-1 bg-tipple-yellow"></div>
        <div className="flex-1 bg-tipple-red"></div>
        <div className="flex-1 bg-tipple-purple"></div>
      </div>
    </section>
  );
};
