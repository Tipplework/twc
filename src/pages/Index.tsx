import FloatingSocials from "@/components/FloatingSocials";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { ServicesAccordion } from "@/components/ServicesAccordion";
import { Clients } from "@/components/Clients";
import { FeaturedProjects } from "@/components/FeaturedProjects";

const Index = () => {
  useEffect(() => {
    document.title = "Tipple Works Co. | Creative Marketing Agency";
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      <main>
        <div
          className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
          onPointerMove={(event) => {
            if (!window.matchMedia("(pointer: fine)").matches) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty("--px", String((event.clientX - bounds.left) / bounds.width - 0.5));
            event.currentTarget.style.setProperty("--py", String((event.clientY - bounds.top) / bounds.height - 0.5));
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--px", "0");
            event.currentTarget.style.setProperty("--py", "0");
          }}
        >
          <div className="absolute inset-0" aria-hidden>
            <span className="hero-disc hero-disc-y" />
            <span className="hero-disc hero-disc-r" />
            <span className="hero-disc hero-disc-p" />
          </div>
          <img
            src="/twc-logo.png"
            alt="Tipple Works Co."
            className="relative z-10 w-[280px] md:w-[380px] lg:w-[480px] max-w-[86vw] h-auto"
          />
          <div className="absolute bottom-0 left-0 right-0 z-10 flex h-1.5">
            <div className="flex-1 bg-tipple-yellow"></div>
            <div className="flex-1 bg-tipple-red"></div>
            <div className="flex-1 bg-tipple-purple"></div>
          </div>
        </div>

        <FeaturedProjects />
        <Clients />
        <Testimonials />
        <ServicesAccordion />
      </main>

      <FloatingSocials />
      <Footer />
    </div>
  );
};

export default Index;
