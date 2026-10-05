import { useState } from "react";
import { Link } from "react-router-dom";
import { useClients, useHomepageSection } from "@/lib/cms/usePublic";

const fallbackClients = [
    { id: 1, name: "Sula Vineyards", image: "/lovable-uploads/SULA.png", category: "Alco-Bev", slug: "sula-vineyards" },
    { id: 2, name: "YORK WINERY", image: "/lovable-uploads/YORK.png", category: "Alco-Bev", slug: "york-winery" },
    { id: 3, name: "Rasa", image: "/lovable-uploads/RASA.png", category: "Alco-Bev", slug: "rasa" },
    { id: 4, name: "SPACE", image: "/lovable-uploads/space.png", category: "F&B", slug: "space" },
    { id: 5, name: "ELAAN", image: "/lovable-uploads/elaan.png", category: "Alco-Bev", slug: "elaan" },
    { id: 6, name: "MATERO", image: "/lovable-uploads/matero.png", category: "F&B", slug: "matero" },
    { id: 7, name: "Estate Monkeys", image: "/lovable-uploads/estatemonkey.png", category: "F&B", slug: "estate-monkeys" },
    { id: 8, name: "ShakaCan", image: "/lovable-uploads/shakacan.png", category: "Alco-Bev", slug: "shakacan" },
    { id: 9, name: "The Source", image: "/lovable-uploads/thesource.png", category: "Alco-Bev", slug: "the-source" },
    { id: 10, name: "Paul & Mike", image: "/lovable-uploads/paulandmike.png", category: "F&B", slug: "paul-and-mike" },
    { id: 11, name: "KIDDOPIA", image: "/lovable-uploads/kiddopia.png", category: "Lifestyle", slug: "kiddopia" },
    { id: 12, name: "NAAR", image: "/lovable-uploads/Naar.png", category: "Hospitality", slug: "naar" },
    { id: 13, name: "British Brewing Co", image: "/lovable-uploads/Britishbrewingcompany.png", category: "Hospitality", slug: "british-brewing-co" },
    { id: 14, name: "MOMOLAND", image: "/lovable-uploads/momoland.png", category: "Hospitality", slug: "momoland" },
    { id: 15, name: "Buns & Slices", image: "/lovable-uploads/bunsandslices.png", category: "Hospitality", slug: "buns-and-slices" },
    { id: 16, name: "COPPER Grillhouse", image: "/lovable-uploads/coppergrillhouse.png", category: "Hospitality", slug: "copper-grillhouse" },
    { id: 17, name: "BEYOND BY SULA", image: "/lovable-uploads/Beyond.png", category: "Hospitality", slug: "beyond-by-sula" },
    { id: 18, name: "SPRIG", image: "/lovable-uploads/sprig.png", category: "F&B", slug: "sprig" },
    { id: 19, name: "provogue", image: "/lovable-uploads/provogue.png", category: "Lifestyle", slug: "provogue" },
    { id: 20, name: "DSG", image: "/lovable-uploads/DSG.png", category: "Event IP's", slug: "DSG" },
    { id: 21, name: "Zealo", image: "/lovable-uploads/ZEALO.png", category: "F&B", slug: "Zealo" },
    { id: 22, name: "VLIV", image: "/lovable-uploads/VLIV.png", category: "Hospitality", slug: "VLIV" },
    { id: 23, name: "SULAFEST", image: "/lovable-uploads/SULAFEST.png", category: "Event IP's", slug: "sula-fest" },
    { id: 24, name: "FORBES", image: "/lovable-uploads/FORBES.png", category: "Event IP's", slug: "forbes-w-power" },
    { id: 25, name: "ZOMATO", image: "/lovable-uploads/ZOMATO.png", category: "Hospitality", slug: "zomato" },
  ];

export const Clients = () => {
  const [filter, setFilter] = useState<string>("all");
  const section = useHomepageSection("clients");
  const clientData = useClients(fallbackClients);
  if (section && section.visible === false) return null;

  const categories = Array.from(new Set(clientData.map((c) => c.category.trim())));
  const filters = ["all", ...categories];

  const filteredClients =
    filter === "all"
      ? clientData
      : clientData.filter((c) => c.category.trim().toLowerCase() === filter.toLowerCase());

  const logoFit = (ratio: number) => {
    if (ratio >= 6) return { maxHeight: "34%", maxWidth: "90%" };
    if (ratio >= 3.2) return { maxHeight: "42%", maxWidth: "86%" };
    if (ratio >= 2) return { maxHeight: "50%", maxWidth: "80%" };
    if (ratio >= 1.25) return { maxHeight: "58%", maxWidth: "74%" };
    if (ratio >= 0.9) return { maxHeight: "60%", maxWidth: "64%" };
    return { maxHeight: "62%", maxWidth: "48%" };
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-white" id="clients">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-8">
          <div className="md:col-span-4">
            <h2 className="twc-heading mb-6 text-black">{section?.heading || "Our Clients"}</h2>
            <p className="twc-body text-black/70 mb-10 max-w-md">
              {section?.body || "We collaborate with innovative brands across various industries, helping them reach new heights with our creative solutions."}
            </p>
            <div className="flex flex-wrap gap-2">
              {filters.map((category) => {
                const active = filter === category;
                const label = category === "all" ? "All" : category;
                return (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      active ? "bg-black text-white" : "bg-black/5 text-black/60 hover:text-black"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-8">
            {filteredClients.length === 0 ? (
              <p className="text-black/50">No clients found in this category.</p>
            ) : (
              <div key={filter} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
                {filteredClients.map((client) => {
                  const logo = (
                    <img
                      src={client.image}
                      alt={client.name}
                      onLoad={(event) => {
                        const img = event.currentTarget;
                        if (!img.naturalHeight) return;
                        const fit = logoFit(img.naturalWidth / img.naturalHeight);
                        img.style.maxHeight = fit.maxHeight;
                        img.style.maxWidth = fit.maxWidth;
                      }}
                      className="max-h-[52%] max-w-[74%] object-contain grayscale opacity-70 transition duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02]"
                    />
                  );
                  const className = "group flex h-[104px] md:h-[120px] items-center justify-center";
                  if (!client.slug) {
                    return (
                      <div key={client.id} title={client.name} className={className}>
                        {logo}
                      </div>
                    );
                  }
                  return (
                    <Link key={client.id} to={`/project/${client.slug}`} title={client.name} className={className}>
                      {logo}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
