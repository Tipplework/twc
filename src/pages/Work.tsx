import { useEffect, useState, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { ArrowUpRight, Instagram, Twitter, Linkedin, Plus, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: "Sula Vineyards",
    category: "360 Marketing ",
    image: "/lovable-uploads/SULA.webp",
    fullWidth: true,
    description: "End to End marketing for India's premier winery"
  },
  {
    id: 2,
    title: "YORK Winery",
    category: "Brand Design & Social Media",
    image: "/lovable-uploads/YORK.webp",
    fullWidth: false,
    description: "Digital-first approach for a boutique vineyard"
  },
  {
    id: 3,
    title: "RASA",
    category: "Photography & Collaterals",
    image: "/lovable-uploads/RASA.webp",
    fullWidth: false,
    description: "Crafted Visuals, Curated Gifting"
  },
  {
    id: 4,
    title: "provogue",
    category: "360 Marketing",
    image: "/lovable-uploads/PROVOGUE.webp",
    fullWidth: false,
    description: "360° marketing meets strategic launch"
  },
  {
    id: 5,
    title: "SPACE Coffee",
    category: "Product Design",
    image: "/lovable-uploads/SPACE.webp",
    fullWidth: true,
    description: "Minimalist design system for a premium coffee brand"
  },
  {
    id: 6,
    title: "The Source at Sula",
    category: "Brand Identity & 360 Marketing",
    image: "/lovable-uploads/SOURCE.webp",
    fullWidth: false,
    description: "Integrated destination branding for India's first winery resort"
  },
  {
    id: 7,
    title: "MATERO",
    category: "Brand Identity & Packaging",
    image: "/lovable-uploads/d00b89d1-8228-4501-a953-df6b38da715c.png",
    fullWidth: false,
    description: "Fun packaging for Argentina’s favorite. "
  },
  {
    id: 8,
    title: "Estate Monkeys",
    category: "Brand Identity & Social Media",
    image: "/lovable-uploads/EM.webp",
    fullWidth: false,
    description: "Distinctive character design for a bold coffee brand."
  }
];

const additionalClients = [
  { 
    name: "Paul & MIke", 
    image: "/lovable-uploads/PM.webp",
    category: "360 Marketing"
  },
  { 
    name: "Kiddopia", 
    image: "/lovable-uploads/b8e2f36f-0193-4feb-9e85-339d2f7f5c04.png",
    category: "Performance Marketing"
  },
  { 
    name: "NAAR", 
    image: "/lovable-uploads/NAAR.webp",
    category: "Social Media"
  },
  { 
    name: "British Brewing Co", 
    image: "/lovable-uploads/c7f0031d-1d1d-4d10-9973-effe4da21829.png",
    category: "Social Media"
  },
  { 
    name: "Momoland", 
    image: "/lovable-uploads/ML.webp",
    category: "Brand Identity"
  },
  { 
    name: "Buns & Slices", 
    image: "/lovable-uploads/BS.webp",
    category: "Brand Identity"
  }
];

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  const socialIconVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5 + (custom * 0.1),
        duration: 0.5
      }
    })
  };
  
  useEffect(() => {
    document.title = "Our Work | Tipple Works Co.";
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen" ref={containerRef}>
      <CustomCursor />
      <Navbar />
      
      <main className="pt-32 pb-20">
        <header className="px-6 md:px-10 mb-20">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex gap-2 items-center mb-2 text-gray-400"
            >
              <span>PROJECTS @</span>
              <span className="uppercase font-bold">TIPLEWORKSCO</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col md:flex-row md:items-end gap-4 md:gap-20"
            >
              <h1 className="text-6xl md:text-8xl font-bold">Work</h1>
              <p className="text-xl text-zinc-400 pb-2">in spotlight</p>
            </motion.div>
          </div>
        </header>
        
        <div className="px-6 md:px-10 mb-20">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full border ${filter === 'all' ? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'} transition-all duration-300`}
              >
                All Work
              </button>
              <button 
                onClick={() => setFilter('Brand Identity')}
                className={`px-6 py-2 rounded-full border ${filter === 'Brand Identity' ? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'} transition-all duration-300`}
              >
                Brand Identity
              </button>
              <button 
                onClick={() => setFilter('Digital')}
                className={`px-6 py-2 rounded-full border ${filter === 'Digital' ? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'} transition-all duration-300`}
              >
                Digital
              </button>
              <button 
                onClick={() => setFilter('Packaging')}
                className={`px-6 py-2 rounded-full border ${filter === 'Packaging' ? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'} transition-all duration-300`}
              >
                Packaging
              </button>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="container mx-auto px-6 md:px-10">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {projectsData.map((project) => (
                <motion.div 
                  key={project.id} 
                  className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${project.fullWidth ? 'md:col-span-2' : ''}`}
                  onClick={() => setSelectedProject(project.id === selectedProject ? null : project.id)}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="aspect-video bg-[#1a1a1a] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-contain filter saturate-75 group-hover:saturate-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
                    <div className="transform group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-zinc-400">{project.category}</p>
                      <p className="text-sm mt-2 max-w-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Plus className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-10 mt-32">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center">
              More Brand Partners <Sparkles className="ml-2 w-5 h-5 text-tipple-yellow" />
            </h2>
            <p className="text-zinc-400">A selection of additional brands we've worked with</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {additionalClients.map((client, index) => (
              <motion.div 
                key={index}
                className="bg-[#1a1a1a] hover:bg-[#252525] rounded-lg p-6 flex items-center justify-center aspect-square transition-all duration-300 border border-zinc-800 hover:border-zinc-700 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={client.image} 
                  alt={client.name}
                  className="max-w-full max-h-full object-contain transition-all duration-500 brightness-90 group-hover:brightness-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-0 right-0 text-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-medium text-white">{client.name}</p>
                  <p className="text-gray-400">{client.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 md:px-10">
          <motion.div 
            className="mt-24 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-24 h-24 rounded-full border border-zinc-800 flex items-center justify-center mx-auto mb-10 group hover:border-white transition-colors duration-300">
              <Plus className="w-8 h-8 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <p className="text-xl text-zinc-400">Want to see more of our work?</p>
            <p className="text-lg mt-2">
              <a href="mailto:srishti.bhatia@tippeworks.com" className="hover-link">
                Get in touch for a detailed portfolio
              </a>
            </p>
          </motion.div>
        </div>
      </main>
      
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-40">
        <motion.a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-[#ffb13d] via-[#dd3e6d] to-[#9e49dd] p-0.5 rounded-xl hover:p-1 transition-all duration-300"
          variants={socialIconVariants}
          initial="initial"
          animate="animate"
          custom={0}
          whileHover={{ scale: 1.1 }}
        >
          <div className="bg-black p-2 rounded-lg">
            <Instagram size={20} className="text-white" />
          </div>
        </motion.a>
        
        <motion.a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#1DA1F2] p-0.5 rounded-xl hover:p-1 transition-all duration-300"
          variants={socialIconVariants}
          initial="initial"
          animate="animate"
          custom={1}
          whileHover={{ scale: 1.1 }}
        >
          <div className="bg-black p-2 rounded-lg">
            <Twitter size={20} className="text-white" />
          </div>
        </motion.a>
        
        <motion.a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#0077B5] p-0.5 rounded-xl hover:p-1 transition-all duration-300"
          variants={socialIconVariants}
          initial="initial"
          animate="animate"
          custom={2}
          whileHover={{ scale: 1.1 }}
        >
          <div className="bg-black p-2 rounded-lg">
            <Linkedin size={20} className="text-white" />
          </div>
        </motion.a>
        
        <motion.div 
          className="bg-[#ffff00] p-3 rounded-xl flex items-center justify-center w-10 h-10 hover:w-12 hover:h-12 transition-all duration-300"
          variants={socialIconVariants}
          initial="initial"
          animate="animate"
          custom={3}
          whileHover={{ 
            scale: 1.1,
            rotate: 90,
            transition: { duration: 0.3 }
          }}
        >
          <div className="w-4 h-4 border-2 border-black rounded-full"></div>
        </motion.div>
        
        <motion.div
          className="absolute -z-10 w-full h-full left-0 top-0 blur-xl"
          style={{ opacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-tipple-yellow/20 to-tipple-purple/20 rounded-full"></div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Work;
