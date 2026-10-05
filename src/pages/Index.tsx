import FloatingSocials from "@/components/FloatingSocials";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { ServicesAccordion } from "@/components/ServicesAccordion";
import { Clients } from "@/components/Clients";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { CustomCursor } from "@/components/CustomCursor";
import { useHomepageSection, usePageSeo } from "@/lib/cms/usePublic";

const Index = () => {
  const hero = useHomepageSection("hero");
  usePageSeo("/");
  useEffect(() => {
    document.title = "Tipple Works Co. | Creative Marketing Agency";
  }, []);
  const showCircles = !hero || hero.settings.circles !== false;
  const intensity = typeof hero?.settings.intensity === "number" ? hero.settings.intensity : undefined;
  const logo = typeof hero?.settings.logo === "string" && hero.settings.logo ? hero.settings.logo : "/twc-logo.png";

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <CustomCursor />

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
          {showCircles && (
            <div className="absolute inset-0" aria-hidden>
              <span className="hero-disc hero-disc-y" style={intensity == null ? undefined : { opacity: intensity }} />
              <span className="hero-disc hero-disc-r" style={intensity == null ? undefined : { opacity: intensity }} />
              <span className="hero-disc hero-disc-p" style={intensity == null ? undefined : { opacity: intensity }} />
            </div>
          )}
          <img
            src={logo}
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
