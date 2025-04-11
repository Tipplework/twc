
import { useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Clients } from '@/components/Clients';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { Instagram } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Update the document title
    document.title = "Tipple Works Co. | Creative Marketing Agency";
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
