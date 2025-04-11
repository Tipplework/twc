
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';

const servicesData = [
  {
    id: 1,
    number: "1.",
    title: "Creative Design",
    description: "Let our imaginative team craft your brand identity, design eye-catching packaging, and transform spaces with innovative spatial designs that leave a lasting impression.",
    subServices: ["Spatial Design", "Brand Identity", "Packaging", "Customised Creative Services"]
  },
  {
    id: 2,
    number: "2.",
    title: "Social Media",
    description: "From captivating photo & video content creation to seamless social media page management and strategic content planning, we'll make your brand shine across all platforms.",
    subServices: ["Analytics & Performance", "Page Handling", "Targeted Strategy", "Community Engagement"]
  },
  {
    id: 4,
    number: "4.",
    title: "Digital Marketing",
    description: "Elevate your online presence with performance marketing, expert E-Commerce development, & targeted Google & Meta Ads strategies for maximum impact & growth.",
    subServices: ["Google & META Ads", "SEO & SMO Optimisation", "Website - UI/UX", "Newsletters"]
  },
  {
    id: 5,
    number: "5.",
    title: "Event Services",
    description: "From captivating stage designs to seamless event logistics management, we specialize in crafting immersive experiences. Elevate your events with our expertise.",
    subServices: ["Stage Design, Lights & Production", "Thematic Decor & Set Dressing", "Interactive Experiences & Installations", "Event Logistics & Operations", "On-Site Brand Activation & Technology Integration"]
  },
  {
    id: 6,
    number: "6.",
    title: "Hospitality Services",
    description: "From crafting compelling brand identities to designing visually engaging menus and packaging, we specialize in creating a strong market presence for hospitality brands. Our expertise ensures that every touchpoint—branding, design, and marketing—is seamlessly executed to captivate your audience.",
    subServices: ["Brand Identity & Visual Language", "Packaging & Product Design", "Marketing Collaterals & POS Materials", "Menu Design & Mockups", "Campaigns & Digital Presence"]
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
      
      <main className="pt-32 pb-20 px-6 md:px-10">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-zinc-400 max-w-2xl mb-12">
            We offer comprehensive creative marketing solutions tailored to your business goals.
          </p>
          
          <div className="space-y-20">
            {servicesData.map((service) => (
              <div key={service.id} className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="w-16 h-16 rounded-full bg-black border border-zinc-800 flex items-center justify-center text-3xl font-bold mb-4">
                    {service.number}
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-tipple-yellow">{service.title}</h2>
                  <p className="text-lg text-zinc-300 mb-8">{service.description}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-6">What we offer:</h3>
                  <div className="border-l-2 border-zinc-800 pl-6">
                    <ul className="space-y-4">
                      {service.subServices.map((subService, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-tipple-yellow rounded-full mr-3"></div>
                          <span className="text-lg">{subService}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {service.id !== servicesData.length && (
                  <div className="col-span-full h-px bg-zinc-900 mt-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
