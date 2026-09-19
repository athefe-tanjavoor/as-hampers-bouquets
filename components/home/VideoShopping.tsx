import React from "react";
import Link from "next/link";
import { Play, Sparkles } from "lucide-react";

export const VideoShopping: React.FC = () => {
  const videos = [
    {
      title: "Handcrafting the Blush Rose Bouquet",
      tag: "Fresh Bouquet",
      link: "/products/blush-garden-rose-bouquet",
      poster: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Unboxing the Opulent Celebration Box",
      tag: "Gift Hamper",
      link: "/products/opulent-celebration-hamper",
      poster: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Customized Memory Frame Gifting",
      tag: "Personalized",
      link: "/products/personalized-memory-keepsake-frame-hamper",
      poster: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="py-16 bg-[#FFF9F5] border-b border-[#EEDCDA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block mb-1">
            Watch & Shop
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            Watch. Choose. Send Some Love.
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6868] mt-2">
            Discover gift ideas through short videos, behind-the-scenes moments and product highlights. Tap a product to explore details and shop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <Link
              key={vid.title}
              href={vid.link}
              className="group relative rounded-2xl overflow-hidden shadow-md aspect-[9/16] max-h-[480px] bg-black border border-[#EEDCDA] flex flex-col justify-between p-5"
            >
              <img
                src={vid.poster}
                alt={vid.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

              {/* Top tag */}
              <div className="relative z-10">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase">
                  {vid.tag}
                </span>
              </div>

              {/* Play icon center */}
              <div className="relative z-10 self-center w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#C94F78] group-hover:scale-110 transition-all duration-300">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>

              {/* Bottom text */}
              <div className="relative z-10 text-white space-y-1">
                <h3 className="font-serif text-base font-bold">
                  {vid.title}
                </h3>
                <span className="text-xs font-semibold text-[#F8E1E8] underline underline-offset-4">
                  Tap to Shop Product &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
