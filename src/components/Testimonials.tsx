
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
};

export const Testimonials = () => {
  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Tipple Works transformed our brand identity with a fresh approach that perfectly captured our essence. Their creative design and strategic thinking exceeded our expectations.",
      author: "Sarah Johnson",
      position: "Marketing Director",
      company: "Estate Monkeys"
    },
    {
      id: 2,
      quote: "Working with Tipple Works was a game-changer for our social media presence. Their content strategy and execution helped us connect with our audience in ways we never thought possible.",
      author: "Michael Chen",
      position: "CEO",
      company: "Matero"
    },
    {
      id: 3,
      quote: "The team at Tipple Works brought our event to life with their exceptional design and attention to detail. They created an immersive experience that our attendees still talk about.",
      author: "Emma Rodriguez",
      position: "Event Manager",
      company: "Space Coffee"
    },
    {
      id: 4,
      quote: "Their hospitality services expertise helped us create a cohesive brand experience across all touchpoints. From menu design to packaging, they delivered outstanding results.",
      author: "David Patel",
      position: "Founder",
      company: "Desi Streat"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrent(current => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setCurrent(current => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay, current]);

  // Pause autoplay on hover
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);

  return (
    <section className="py-20 px-6 md:px-10 bg-white" id="testimonials">
      <div className="container mx-auto">
        <motion.div 
          className="flex gap-2 items-center mb-6 text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          What Clients Say
        </motion.h2>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <div className="overflow-hidden">
            <motion.div
              className="relative"
              animate={{ x: `-${current * 100}%` }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0">
                    <div className="px-4 text-center">
                      <p className="text-2xl md:text-3xl mb-8 font-serif italic text-black">
                        "{testimonial.quote}"
                      </p>
                      <div className="mt-8">
                        <p className="font-bold text-black">{testimonial.author}</p>
                        <p className="text-gray-600">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="flex justify-center mt-12 gap-4">
            <button
              onClick={prevSlide}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current ? 'bg-black w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
