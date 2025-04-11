
import { useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Clients } from '@/components/Clients';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    // Update the document title
    document.title = "Tipple Works Co. | Creative Marketing Agency";
  }, []);

  // Animation variants
  const socialIconVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (custom: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5 + (custom * 0.1),
        duration: 0.5
      }
    })
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      
      {/* Social Media Icons */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-40">
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
      </div>
      
      <main>
        <Hero />
        <Services />
        <Clients />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
