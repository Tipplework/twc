
export const Clients = () => {
  const logoImages = {
    // Row 1
    sula: "/lovable-uploads/b6fed313-87ea-465d-b759-68775fc17809.png",
    york: "/lovable-uploads/27cedf89-27dd-41f8-b628-5df94e76e7fe.png",
    rasa: "/lovable-uploads/d5683dca-130d-4a1d-876b-2a6fe5a88ab1.png",
    space: "/lovable-uploads/dbb0fa30-3a2d-4b38-8c82-9f8864152a6c.png",
    elaan: "/lovable-uploads/60a9c4e0-93d3-47e8-8d8c-b95d4e4231f7.png",
    
    // Row 2
    matero: "/lovable-uploads/f7f985b7-ba33-4c6c-b690-0298a796a336.png",
    estateMonkeys: "/lovable-uploads/f99330e1-a20a-4e9f-bba0-495d93a93776.png",
    shakaCan: "/lovable-uploads/fc373324-94ad-499a-a254-05b6bd6988af.png",
    theSource: "/lovable-uploads/49cb6ca5-df1b-4552-bc62-bae892696195.png",
  };

  return (
    <section className="py-20 px-6 md:px-10 bg-black border-t border-zinc-900" id="clients">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">Our Clients</h2>
        
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, dupeIndex) => (
              <div key={dupeIndex} className="flex items-center justify-around min-w-full">
                {/* Row 1 - Beverages */}
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={logoImages.sula} alt="SULA Vineyards" className="h-16 md:h-20 w-auto object-contain" />
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={logoImages.york} alt="YORK" className="h-12 md:h-16 w-auto object-contain" />
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={logoImages.rasa} alt="RASA" className="h-12 md:h-16 w-auto object-contain" />
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={logoImages.space} alt="SPACE" className="h-12 md:h-16 w-auto object-contain" />
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={logoImages.elaan} alt="ELAAN" className="h-12 md:h-16 w-auto object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="overflow-hidden mt-12">
          <div className="flex animate-marquee whitespace-nowrap" style={{animationDirection: 'reverse'}}>
            {Array.from({ length: 2 }).map((_, dupeIndex) => (
              <div key={dupeIndex} className="flex items-center justify-around min-w-full">
                {/* Row 2 - Restaurants */}
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={logoImages.matero} alt="MATERO" className="h-12 md:h-16 w-auto object-contain" />
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={logoImages.estateMonkeys} alt="Estate Monkeys" className="h-12 md:h-16 w-auto object-contain" />
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={logoImages.shakaCan} alt="Shaka Can" className="h-12 md:h-16 w-auto object-contain" />
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={logoImages.theSource} alt="The Source" className="h-12 md:h-16 w-auto object-contain" />
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={logoImages.elaan} alt="ELAAN" className="h-12 md:h-16 w-auto object-contain" /> 
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl text-zinc-400">...and many more</p>
        </div>
      </div>
    </section>
  );
};
