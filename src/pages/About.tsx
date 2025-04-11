
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';

const About = () => {
  useEffect(() => {
    document.title = "About Us | Tipple Works Co.";
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 md:px-10">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">About Us</h1>
          
          <div className="space-y-6 text-lg text-zinc-300">
            <p>
              Tipple Works Co. is a full-service creative marketing agency founded with a clear vision: to bridge the gap between innovative brands and their audiences through exceptional creative strategy and execution.
            </p>
            
            <p>
              We don't just run campaigns—we build brands, drive growth, and shape the future of businesses. What began as a boutique agency has transformed into a strategic marketing partner for brands across industries, delivering impactful, performance-driven marketing solutions that make a real difference.
            </p>
            
            <p>
              Our team comprises experienced professionals from diverse backgrounds, united by our passion for creativity and commitment to delivering tangible results. We believe that great marketing isn't just about aesthetics—it's about understanding business objectives, consumer psychology, and market dynamics to create strategies that drive meaningful engagement and growth.
            </p>
            
            <h2 className="text-3xl font-bold mt-12 mb-4">Our Approach</h2>
            
            <p>
              At Tipple Works Co., we don't believe in one-size-fits-all marketing. We tailor every strategy to fit your brand's unique needs, ensuring that every move is intentional and impactful. Our approach is rooted in creativity, data, and a deep understanding of business growth—giving you more than just marketing, but a roadmap to sustained success.
            </p>
            
            <p>
              We manage everything that falls within your marketing budget—from brand building and digital growth to performance-driven campaigns that fuel business success. But we're not just about marketing; we embed ourselves in your business strategy, ensuring that every marketing move aligns with your company's vision and growth ambitions.
            </p>
            
            <div className="pt-8 text-center">
              <p className="text-2xl font-bold">Marketing That Works. Business That Grows.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
