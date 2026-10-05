import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Footer from "@/components/Footer";
import { projectData } from "../lib/projectData";
import { CustomCursor } from "@/components/CustomCursor";

export default function Work() {
  const [filter, setFilter] = useState("all");
  const categories = Array.from(new Set(projectData.map((p) => p.category)));

  const filteredProjects =
    filter === "all" ? projectData : projectData.filter((p) => p.category === filter);

  const filters = ["all", ...categories];

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <CustomCursor />
      <div className="px-6 md:px-10 pt-28 md:pt-36 text-center">
        <h1 className="twc-h1 mb-8">Selected Work</h1>
        <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14">
          {filters.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  active ? "bg-white text-black border-white" : "text-white/80 border-white/30 hover:border-white"
                }`}
              >
                {cat === "all" ? "All Work" : cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-12 px-3 md:px-4 mb-8">
        {filteredProjects.map((project) => (
          <Link key={project.slug} to={`/project/${project.slug}`} className="group block">
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              />
            </div>
            <div className="px-3 pt-4 pb-2">
              <h2 className="text-xl font-medium tracking-[-0.03em]">{project.title}</h2>
              <p className="twc-micro text-white/45 mt-2">{project.category}</p>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}
