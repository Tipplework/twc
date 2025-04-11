
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { ArrowUpRight, Instagram, Plus } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: "SULA Vineyards",
    category: "Brand Identity & Packaging",
    image: "/lovable-uploads/b6fed313-87ea-465d-b759-68775fc17809.png",
    fullWidth: true
  },
  {
    id: 2,
    title: "Estate Monkeys",
    category: "Brand Design & Social Media",
    image: "/lovable-uploads/f99330e1-a20a-4e9f-bba0-495d93a93776.png",
    fullWidth: false
  },
  {
    id: 3,
    title: "Matero",
    category: "Brand Identity & Packaging",
    image: "/lovable-uploads/f7f985b7-ba33-4c6c-b690-0298a796a336.png",
    fullWidth: false
  },
  {
    id: 4,
    title: "Shaka Can",
    category: "Brand Design",
    image: "/lovable-uploads/fc373324-94ad-499a-a254-05b6bd6988af.png",
    fullWidth: false
  },
  {
    id: 5,
    title: "Space Coffee",
    category: "Product Design",
    image: "/lovable-uploads/dbb0fa30-3a2d-4b38-8c82-9f8864152a6c.png",
    fullWidth: true
  },
  {
    id: 6,
    title: "The Source at Sula",
    category: "Brand Identity",
    image: "/lovable-uploads/49cb6ca5-df1b-4552-bc62-bae892696195.png",
    fullWidth: false
  }
];

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  useEffect(() => {
    document.title = "Our Work | Tipple Works Co.";
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-40">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-[#ffb13d] via-[#dd3e6d] to-[#9e49dd] p-0.5 rounded-xl"
        >
          <div className="bg-black p-2 rounded-lg">
            <Instagram size={20} className="text-white" />
          </div>
        </a>
        <div className="bg-[#ffff00] p-3 rounded-xl flex items-center justify-center w-10 h-10">
          <div className="w-4 h-4 border-2 border-black rounded-full"></div>
        </div>
      </div>
      
      <main className="pt-32 pb-20">
        <header className="px-6 md:px-10 mb-20">
          <div className="container mx-auto">
            <div className="flex gap-2 items-center mb-2 text-gray-400">
              <span>PROJECTS @</span>
              <span className="uppercase font-bold">TIPLEWORKSCO</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-20">
              <h1 className="text-6xl md:text-8xl font-bold">Work</h1>
              <p className="text-xl text-zinc-400 pb-2">in spotlight</p>
            </div>
          </div>
        </header>
        
        <div className="relative">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.map((project) => (
                <div 
                  key={project.id} 
                  className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${project.fullWidth ? 'md:col-span-2' : ''}`}
                  onClick={() => setSelectedProject(project.id === selectedProject ? null : project.id)}
                >
                  <div className="aspect-video bg-neutral-800 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                    <div className="transform translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p className="text-zinc-400">{project.category}</p>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient overlay at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-10">
          <div className="mt-24 text-center relative">
            <div className="w-24 h-24 rounded-full border border-zinc-800 flex items-center justify-center mx-auto mb-10">
              <Plus className="w-8 h-8" />
            </div>
            <p className="text-xl text-zinc-400">Want to see more of our work?</p>
            <p className="text-lg mt-2">
              <a href="mailto:srishti.bhatia@tippeworks.com" className="hover-link">
                Get in touch for a detailed portfolio
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Work;
