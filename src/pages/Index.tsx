
import { useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Clients } from '@/components/Clients';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';

const Index = () => {
  useEffect(() => {
    // Update the document title
    document.title = "Tipple Works Co. | Creative Marketing Agency";
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <CustomCursor />
      <Navbar />
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
