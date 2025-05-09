import React from "react";

interface Project {
  id: number;
  title: string;
  description?: string;
  image: string;
}

export const FeaturedProjects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "SulaFest 2025",
      image: "/images/projects/SF25.webp",
    },
    {
      id: 2,
      title: "W-Power 2025",
      image: "/images/projects/FORBES.webp",
    },
    {
      id: 3,
      title: "Zomato",
      image: "/images/projects/ZOMATO.webp",
    },
    {
      id: 4,
      title: "Provogue",
      image: "/images/projects/PROVOGUE.webp",
    },
    {
      id: 5,
      title: "Paul and Mike Chocolates",
      image: "/images/projects/PM.webp",
    },
  ];

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Selected Work
      </h2>

      <div className="w-full max-w-screen-lg mx-auto overflow-hidden relative">
        <div className="flex gap-4 overflow-x-auto snap-x scroll-smooth">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-full snap-center rounded-lg overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover aspect-video rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
