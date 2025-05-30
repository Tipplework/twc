import { useParams } from "react-router-dom";
import { projectData } from "../lib/projectData";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectData.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Project not found.
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full rounded-xl shadow-xl object-cover"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed max-w-prose">
            {project.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm text-zinc-400">
            <div>
              <span className="uppercase block font-semibold text-white mb-1">Client</span>
              {project.title}
            </div>
            <div>
              <span className="uppercase block font-semibold text-white mb-1">Sector</span>
              Wine, Hospitality
            </div>
            <div>
              <span className="uppercase block font-semibold text-white mb-1">Discipline</span>
              Brand Identity, Campaigns, Systems
            </div>
            <div>
              <span className="uppercase block font-semibold text-white mb-1">Year</span>
              2023–2025
            </div>
          </div>
        </motion.div>
      </section>

      <hr className="my-6 border-white/10" />

      {/* Gallery Section */}
      {project.gallery && (
        <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.gallery.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`Sula Image ${index + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-auto transition duration-300 hover:scale-105"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              loading="lazy"
            />
          ))}
        </section>
      )}

      <Footer />
    </div>
  );
}
