import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const OccasionGrid: React.FC = () => {
  const occasions = [
    {
      title: "Birthday Gifts",
      cta: "Shop Birthday Gifts",
      url: "/birthday-gifts",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Anniversary Gifts",
      cta: "Shop Anniversary Gifts",
      url: "/anniversary-gifts",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Wedding Flowers & Gifts",
      cta: "Explore Wedding",
      url: "/wedding-flowers",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Congratulations Gifts",
      cta: "Celebrate With Them",
      url: "/congratulations-gifts",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Thank You Gifts",
      cta: "Say Thank You",
      url: "/thank-you-gifts",
      image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Housewarming Gifts",
      cta: "Shop Housewarming",
      url: "/housewarming-gifts",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-16 bg-[#FFF9F5] border-b border-[#EEDCDA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block mb-1">
            Moments Worth Celebrating
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            Gifts for Every Special Moment
          </h2>
          <p className="text-sm text-[#7A6868] mt-2">
            Find a thoughtful gift for birthdays, anniversaries, weddings, congratulations, thank-you moments and everything worth celebrating.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasions.map((occ) => (
            <Link
              key={occ.url}
              href={occ.url}
              className="group relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] flex items-end p-6 border border-[#EEDCDA]"
            >
              <img
                src={occ.image}
                alt={occ.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

              <div className="relative z-10 w-full text-white">
                <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2">
                  {occ.title}
                </h3>
                <span className="inline-flex items-center text-xs font-semibold text-[#F8E1E8] group-hover:text-white group-hover:translate-x-1 transition-all">
                  <span>{occ.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
