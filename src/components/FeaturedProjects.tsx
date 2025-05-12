// twc/src/components/FeaturedProjects.tsx

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projectData } from '../lib/projectData';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      if (!window.gsap) {
        const script1 = document.createElement('script');
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        document.body.appendChild(script2);

        await new Promise((resolve) => {
          script2.onload = resolve;
        });
      }

      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        const elems = sectionRef.current?.querySelectorAll('.project-tile');
        if (elems) {
          elems.forEach((el: any, i: number) => {
            window.gsap.fromTo(
              el,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: i * 0.15,
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
        }
      }
    };

    loadGSAP();
  }, []);

  const topProjects = projectData.slice(0, 5);

  return (
    <section className="py-16 px-4 bg-white text-black" ref={sectionRef}>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Selected Work</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topProjects.map((project) => (
          <Link
            key={project.slug}
            to={`/project/${project.slug}`}
            className="project-tile block overflow-hidden rounded-lg shadow hover:shadow-xl transition-transform hover:scale-105"
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
    </section>
  );
};
