
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { Instagram } from 'lucide-react';

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
              <span>SERVICES OFFERED @</span>
              <span className="uppercase font-bold">TIPLEWORKSCO</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              We offer comprehensive creative marketing solutions tailored to your business goals.
            </p>
          </div>
        </header>
        
        <div className="space-y-0">
          {servicesData.map((service) => (
            <section key={service.id} className="relative py-20 border-t border-zinc-900">
              <div className="container mx-auto px-6 md:px-10">
                <div className="grid md:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className="flex gap-4 items-center mb-6">
                      <div className="text-7xl md:text-9xl font-bold text-white/10">{service.number}</div>
                      <h2 className={`text-3xl md:text-5xl font-bold ${service.titleColor}`}>{service.title}</h2>
                    </div>
                    
                    <p className="text-lg text-zinc-300 mb-10 max-w-xl">
                      {service.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-y-6 gap-x-10 mt-10">
                      {service.subServices.map((subService, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-tipple-yellow rounded-full"></div>
                          <span className="text-sm md:text-base text-zinc-200">{subService}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
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
            </section>
          ))}
        </div>
        
        <div className="container mx-auto px-6 md:px-10 mt-20">
          <div className="bg-zinc-900 p-8 md:p-12 rounded-xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your brand?</h3>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Let's collaborate to create exceptional experiences that elevate your business.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-opacity-90 transition-all duration-300"
            >
              Start a Project
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
