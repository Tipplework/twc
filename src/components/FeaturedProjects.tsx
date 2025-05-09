import React from "react";

interface Project {
  id: number;
  title: string;
  image: string;
}

export const FeaturedProjects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "SulaFest 2025",
      image: "/lovable-uploads/SF25.webp",
    },
    {
      id: 2,
      title: "W-Power 2025",
      image: "/lovable-uploads/FORBES.webp",
    },
    {
      id: 3,
      title: "Zomato",
      image: "/lovable-uploads/ZOMATO.webp",
    },
    {
      id: 4,
      title: "Provogue",
      image: "/lovable-uploads/PROVOGUE.webp",
    },
    {
      id: 5,
      title: "Paul and Mike",
      image: "/lovable-uploads/PM.webp",
    },
  ];

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Selected Work
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-full overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover aspect-video"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
