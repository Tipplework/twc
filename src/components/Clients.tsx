
export const Clients = () => {
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
                  <p className="text-lg font-bold">SULA</p>
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <p className="text-lg font-bold">YORK</p>
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <p className="text-lg font-bold">RASA</p>
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <p className="text-lg font-bold">SPACE</p>
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <p className="text-lg font-bold">ELAAN</p>
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
                  <p className="text-lg font-bold">NAAR</p>
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <p className="text-lg font-bold">MOMOLAND</p>
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <p className="text-lg font-bold">COPPER</p>
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <p className="text-lg font-bold">BUNS & SLICES</p>
                </div>
                <div className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  <p className="text-lg font-bold">BB</p>
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
