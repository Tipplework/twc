import { useParams } from "react-router-dom";
import { projectData } from "@/lib/projectData";
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Separator } from "@/components/ui/separator";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex text-white items-center justify-center min-h-screen">
        <h1>Project not found</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <img
            src={project.image}
            alt={project.title}
            className="rounded-xl object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground">{project.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mt-6">
              <div>
                <p className="font-semibold text-white">Client</p>
                <p>{project.title}</p>
              </div>
              <div>
                <p className="font-semibold text-white">Sector</p>
                <p>Wine, Hospitality</p>
              </div>
              <div>
                <p className="font-semibold text-white">Discipline</p>
                <p>Brand Identity, Campaigns, Systems</p>
              </div>
              <div>
                <p className="font-semibold text-white">Year</p>
                <p>2023–2025</p>
              </div>
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
      <Footer />
    </>
  );
}
