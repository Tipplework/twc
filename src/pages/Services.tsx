
import { useEffect, useState, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import Footer from "@/components/Footer";
import { CustomCursor } from '@/components/CustomCursor';
import { Instagram, Linkedin, Twitter, Sparkles, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const servicesData = [
  {
    id: 1,
    number: "1.",
    title: "Creative Design",
    titleColor: "text-[#ff9500]",
    description: "Let our imaginative team craft your brand identity, design eye-catching packaging, and transform spaces with innovative spatial designs that leave a lasting impression.",
    subServices: ["Spatial Design", "Brand Identity", "Packaging", "Customised Creative Services"],
    image: "/lovable-uploads/e435a642-1def-4cbd-9c72-b4e8341ef138.png"
  },
  {
    id: 2,
    number: "2.",
    title: "Social Media",
    titleColor: "text-[#ff9500]",
    description: "From captivating photo & video content creation to seamless social media page management and strategic content planning, we'll make your brand shine across all platforms.",
    subServices: ["Analytics & Performance", "Page Handling", "Targeted Strategy", "Community Engagement"],
    image: "/lovable-uploads/64fe0cfb-1c5a-4a8b-bf18-cea0769f385d.png"
  },
  {
    id: 3,
    number: "3.",
    title: "Content Creation",
    titleColor: "text-[#ff9500]",
    description: "Our content creation service offers tailored photo and video solutions to elevate your brand's presence. With a dedicated studio space, we develop high-quality photos and engaging reels that capture your unique story and resonate with your audience.",
    subServices: ["Studio Product Photography", "Photo & Video Editing", "Reels & Campaign Videos", "UGC", "Calendar Planning"],
    image: "/lovable-uploads/9f767fa4-8f60-47b0-88f0-8ca45f63520c.png"
  },
  {
    id: 4,
    number: "4.",
    title: "Digital Marketing",
    titleColor: "text-[#ff9500]",
    description: "Elevate your online presence with performance marketing, expert E-Commerce development, & targeted Google & Meta Ads strategies for maximum impact & growth.",
    subServices: ["Google & META Ads", "SEO & SMO Optimisation", "Website - UI/UX", "Newsletters"],
    image: "/lovable-uploads/03284819-4fcb-451f-a00c-35dbc92736b4.png"
  },
  {
    id: 5,
    number: "5.",
    title: "Event Services",
    titleColor: "text-[#ff9500]",
    description: "From captivating stage designs to seamless event logistics management, we specialize in crafting immersive experiences. Elevate your events with our expertise.",
    subServices: ["Stage Design, Lights & Production", "Thematic Decor & Set Dressing", "Interactive Experiences & Installations", "Event Logistics & Operations", "On-Site Brand Activation & Technology Integration"],
    image: "/lovable-uploads/bf2d81f2-ecb1-4ab0-b33a-384d2e60c011.png"
  },
  {
    id: 6,
    number: "6.",
    title: "Hospitality Services",
    titleColor: "text-[#ff9500]",
    description: "From crafting compelling brand identities to designing visually engaging menus and packaging, we specialize in creating a strong market presence for hospitality brands. Our expertise ensures that every touchpoint—branding, design, and marketing—is seamlessly executed to captivate your audience.",
    subServices: ["Brand Identity & Visual Language", "Packaging & Product Design", "Marketing Collaterals & POS Materials", "Menu Design & Mockups", "Campaigns & Digital Presence"],
    image: "/lovable-uploads/05ddaa93-6afe-4b16-ab3e-a6b8be41b977.png"
  }
];

const Services = () => {
  useEffect(() => {
    document.title = "Our Services | Tipple Works Co.";
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const [hoveredService, setHoveredService] = useState(null);

  // Animation variants
  const socialIconVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3 + (custom * 0.1),
        duration: 0.4
      }
    })
  };
return (
  <div className="bg-[#121212] text-white min-h-screen">
    <CustomCursor />
    <Navbar />
<main className="pt-32 pb-20" ref={containerRef}>
  <header className="px-6 md:px-10 mb-20">
    <div className="container mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex gap-2 items-center mb-2 text-gray-400"
      >
        <span> {/* Optional animated element like breadcrumbs */} </span>
      </motion.div>

      <motion.h1 
        className="text-5xl md:text-7xl font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Our Services
      </motion.h1>

      <motion.p 
        className="text-lg text-zinc-400 max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        We offer comprehensive creative marketing solutions tailored to your business goals.
      </motion.p>

      {/* Decorative element */}
      <motion.div 
        className="absolute top-40 right-10 md:right-40 hidden md:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <Star className="text-tipple-yellow w-12 h-12 opacity-40" />
      </motion.div>
    </div>
  </header>
        <div className="space-y-0">
          {servicesData.map((service) => (
            <motion.section 
              key={service.id} 
              className="relative py-20 border-t border-zinc-800"
              initial={{ opacity: 0.5, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="container mx-auto px-6 md:px-10">
                <div className="grid md:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className="flex gap-4 items-center mb-6">
                      <motion.div 
                        className="text-7xl md:text-9xl font-bold text-white/10"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {service.number}
                      </motion.div>
                      
                      <motion.h2 
                        className={`text-3xl md:text-5xl font-bold ${service.titleColor}`}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        {service.title}
                      </motion.h2>
                    </div>
                    
                    <motion.p 
                      className="text-lg text-zinc-300 mb-10 max-w-xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {service.description}
                    </motion.p>
                    
                    <motion.div 
                      className="flex flex-wrap gap-y-6 gap-x-10 mt-10"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {service.subServices.map((subService, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-tipple-yellow rounded-full"></div>
                          <span className="text-sm md:text-base text-zinc-200">{subService}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative overflow-hidden rounded-lg group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-auto object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Colored bar */}
              <div className="absolute bottom-0 left-0 right-0 flex h-1.5">
                <div className="flex-1 bg-tipple-yellow"></div>
                <div className="flex-1 bg-tipple-red"></div>
                <div className="flex-1 bg-tipple-purple"></div>
                <div className="flex-1 bg-tipple-yellow"></div>
                <div className="flex-1 bg-tipple-red"></div>
                <div className="flex-1 bg-tipple-purple"></div>
              </div>
            </motion.section>
          ))}
        </div>
        
        <div className="container mx-auto px-6 md:px-10 mt-20">
          <motion.div 
            className="bg-zinc-900/80 backdrop-blur-sm p-8 md:p-12 rounded-xl text-center border border-white/5 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-orange-500/10 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-yellow-500/20 to-red-500/10 blur-3xl rounded-full"></div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your brand?</h3>
              <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                Let's collaborate to create exceptional experiences that elevate your business.
              </p>
              <motion.a 
                href="/contact" 
                className="inline-block px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-opacity-90 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Start a Project <span className="ml-1 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      {/* Social Media Icons - Moved to bottom */}
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

export default Services;
