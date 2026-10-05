import FloatingSocials from "@/components/FloatingSocials";
import { useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { Testimonials } from "@/components/Testimonials";
import { ServicesAccordion } from "@/components/ServicesAccordion";
import { Clients } from "@/components/Clients";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { TwcLockup } from "@/components/brand/TwcLockup";
import { usePointerVars } from "@/components/brand/usePointerVars";

const Index = () => {
  const heroRef = usePointerVars<HTMLDivElement>();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    heroRef.current?.style.setProperty("--spread", String(Math.min(1, value / 0.55)));
  });

  useEffect(() => {
    document.title = "Tipple Works Co. | Creative Marketing Agency";
  }, []);

  return (
    <div className="bg-white text-black min-h-screen grid grid-cols-1">
      <CustomCursor />
      <Navbar />

      <main className="grid grid-cols-1 w-full">
        <div
          ref={heroRef}
          className="twc-hero relative min-h-screen bg-black flex flex-col justify-center items-center overflow-hidden"
        >
          <TwcLockup className="w-[92vw] max-w-[1080px]" />
          <div className="twc-bar absolute bottom-0 left-0 right-0 z-10 flex h-1.5">
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
