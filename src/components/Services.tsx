
import { ArrowUpRight } from 'lucide-react';

type Service = {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
};

export const Services = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Creative Design",
      description: "Brand identity, packaging design, and innovative spatial experiences that leave a lasting impression.",
      color: "border-tipple-yellow",
      icon: <div className="w-12 h-12 rounded-full bg-tipple-yellow bg-opacity-20 flex items-center justify-center text-2xl">1.</div>
    },
    {
      id: 2,
      title: "Social Media",
      description: "Captivating content creation, strategic planning, and seamless page management across all platforms.",
      color: "border-tipple-red",
      icon: <div className="w-12 h-12 rounded-full bg-tipple-red bg-opacity-20 flex items-center justify-center text-2xl">2.</div>
    },
    {
      id: 3,
      title: "Digital Marketing",
      description: "Performance marketing, e-commerce development, and targeted ads strategies for maximum growth.",
      color: "border-tipple-purple",
      icon: <div className="w-12 h-12 rounded-full bg-tipple-purple bg-opacity-20 flex items-center justify-center text-2xl">4.</div>
    },
    {
      id: 4,
      title: "Event Services",
      description: "Captivating stage designs, seamless logistics, and immersive brand experiences for memorable events.",
      color: "border-tipple-yellow",
      icon: <div className="w-12 h-12 rounded-full bg-tipple-yellow bg-opacity-20 flex items-center justify-center text-2xl">5.</div>
    },
    {
      id: 5,
      title: "Hospitality Services",
      description: "Brand identities, visual design, and marketing strategies tailored for hospitality businesses.",
      color: "border-tipple-red",
      icon: <div className="w-12 h-12 rounded-full bg-tipple-red bg-opacity-20 flex items-center justify-center text-2xl">6.</div>
    }
  ];

  return (
    <section className="py-20 px-6 md:px-10 bg-black" id="services">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Services</h2>
        <p className="text-zinc-400 max-w-2xl mb-12">
          We offer strategic marketing solutions that drive impact and growth for brands across industries.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`service-card p-6 hover:-translate-y-1 ${service.color}`}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-zinc-400 mb-6">{service.description}</p>
              <div className="flex justify-end">
                <button className="p-2 rounded-full hover:bg-white/10 transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
