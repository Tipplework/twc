import { useParams } from "react-router-dom";
import { projectData } from "@/lib/projectData";
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectData.find((p) => p.slug === slug);

  const [showFullText, setShowFullText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!project) {
    return (
      <div className="flex text-white items-center justify-center min-h-screen">
        <h1>Project not found</h1>
      </div>
    );
  }

  const shouldTruncate =
    project.description && project.description.length > 220;

  return (
    <>
      <Navbar />
      <div className="bg-white text-black">
        <div className="px-6 md:px-12 max-w-7xl mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <img
              src={project.image}
              alt={project.title}
              className="rounded-xl object-cover"
            />
            <div>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <div className="relative">
                <p className="text-lg text-muted-foreground">
                  {showFullText || !shouldTruncate
                    ? project.description
                    : `${project.description?.slice(0, 220).trim()}...`}
                </p>

                {shouldTruncate && (
                  <button
                    onClick={() => setShowFullText(!showFullText)}
                    className="mt-4 inline-block bg-orange-500 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-orange-600 transition"
                  >
                    {showFullText ? "Read Less" : "Read More"}
                  </button>
                )}

                <div className="mt-4">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: project.title,
                          text: project.description?.slice(0, 150),
                          url: window.location.href,
                        });
                      } else {
                        alert("Sharing not supported in this browser.");
                      }
                    }}
                    className="inline-block border border-gray-300 px-4 py-2 text-sm rounded-full text-gray-700 hover:bg-gray-100 transition"
                  >
                    Share this Project
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mt-6">
                {project.client && (
                  <div>
                    <p className="font-semibold text-black">Client</p>
                    <p>{project.client}</p>
                  </div>
                )}
                {project.sector && (
                  <div>
                    <p className="font-semibold text-black">Sector</p>
                    <p>{project.sector}</p>
                  </div>
                )}
                {project.discipline && (
                  <div>
                    <p className="font-semibold text-black">Discipline</p>
                    <p>{project.discipline}</p>
                  </div>
                )}
                {project.year && (
                  <div>
                    <p className="font-semibold text-black">Year</p>
                    <p>{project.year}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {project.gallery?.map((img, i) => (
            <div key={i} className="w-full flex justify-center my-12">
              <img
                src={img}
                alt={`${project.title} Visual ${i + 1}`}
                className="w-full max-w-screen-lg h-auto rounded-xl shadow-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
