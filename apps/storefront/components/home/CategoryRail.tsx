import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const CategoryRail: React.FC = () => {
  const categories = [
    {
      heading: "Bouquets",
      copy: "Handcrafted bouquets for every occasion.",
      link: "/bouquets",
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80"
    },
    {
      heading: "Flowers",
      copy: "Fresh flower arrangements made to delight.",
      link: "/flowers",
      image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80"
    },
    {
      heading: "Hampers",
      copy: "Curated gifts, ready to make someone smile.",
      link: "/hampers",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"
    },
    {
      heading: "Personalized",
      copy: "Make their gift truly one of a kind.",
      link: "/personalized-gifts",
      image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=600&q=80"
    },
    {
      heading: "Wedding",
      copy: "Flowers and garlands for beautiful beginnings.",
      link: "/wedding-flowers",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
    },
    {
      heading: "Corporate",
      copy: "Thoughtful gifts for teams and clients.",
      link: "/corporate-gifts",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="py-14 bg-white border-b border-[#EEDCDA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block mb-1">
            Carefully Curated
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            Explore by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.link}
              href={cat.link}
              className="group flex flex-col items-center text-center p-4 rounded-2xl bg-[#FFF9F5] border border-[#EEDCDA] hover:border-[#C94F78] hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 border-2 border-white shadow-sm flex-shrink-0">
                <img
                  src={cat.image}
                  alt={cat.heading}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-base font-bold text-[#3B2A2A] group-hover:text-[#C94F78] transition-colors">
                {cat.heading}
              </h3>
              <p className="text-[11px] text-[#7A6868] mt-1 line-clamp-2">
                {cat.copy}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
