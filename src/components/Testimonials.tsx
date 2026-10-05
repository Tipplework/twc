import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/brand/tokens";

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
};

export const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Tipple Works transformed our brand identity with a fresh approach that perfectly captured our essence. Their creative design and strategic thinking exceeded our expectations.",
      author: "Sarah Johnson",
      position: "Marketing Director",
      company: "Estate Monkeys",
    },
    {
      id: 2,
      quote: "Working with Tipple Works was a game-changer for our social media presence. Their content strategy and execution helped us connect with our audience in ways we never thought possible.",
      author: "Michael Chen",
      position: "CEO",
      company: "Matero",
    },
    {
      id: 3,
      quote: "The team at Tipple Works brought our event to life with their exceptional design and attention to detail. They created an immersive experience that our attendees still talk about.",
      author: "Emma Rodriguez",
      position: "Event Manager",
      company: "Space Coffee",
    },
    {
      id: 4,
      quote: "Their hospitality services expertise helped us create a cohesive brand experience across all touchpoints. From menu design to packaging, they delivered outstanding results.",
      author: "David Patel",
      position: "Founder",
      company: "Desi Streat",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () => {
    setCurrent((value) => (value === testimonials.length - 1 ? 0 : value + 1));
  };

  const prevSlide = () => {
    setCurrent((value) => (value === 0 ? testimonials.length - 1 : value - 1));
  };

  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = setInterval(nextSlide, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay, current]);

  const quote = testimonials[current];

  return (
    <section
      className="py-24 md:py-36 px-6 md:px-10 bg-white"
      id="testimonials"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="mx-auto max-w-[1100px]">
        <h2 className="twc-heading mb-10 md:mb-14">What Clients Say</h2>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={quote.id}
            initial={{ opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="twc-statement text-black">“{quote.quote}”</p>
            <footer className="mt-10 md:mt-14">
              <p className="text-base font-medium text-black">{quote.author}</p>
              <p className="twc-micro text-black/50 mt-2">
                {quote.position}, {quote.company}
              </p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="mt-14 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3" role="tablist" aria-label="Testimonials">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrent(index)}
                className={`h-2 w-2 rounded-full ${index === current ? "bg-tipple-red" : "bg-black/20"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-5">
            <button onClick={prevSlide} className="twc-micro text-black/50 hover:text-black" aria-label="Previous testimonial">
              Previous
            </button>
            <button onClick={nextSlide} className="twc-micro text-black/50 hover:text-black" aria-label="Next testimonial">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
