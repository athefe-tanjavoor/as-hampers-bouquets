import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface HomeHeroProps {
  heading?: string;
  subheading?: string;
  body?: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaSecondaryText?: string;
  ctaSecondaryUrl?: string;
  desktopImage?: string;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  heading = "Beautiful Bouquets, Thoughtful Hampers & Gifts Made With Love",
  subheading = "Made With Love. Designed to Be Remembered.",
  body = "Celebrate every little and big moment with handcrafted bouquets, elegant flower arrangements, curated gift hampers and personalized keepsakes. Thoughtfully designed, beautifully packed and made to make someone smile.",
  ctaText = "Shop Gifts",
  ctaUrl = "/bouquets",
  ctaSecondaryText = "Explore Bouquets",
  ctaSecondaryUrl = "/flowers",
  desktopImage = "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1800&q=80"
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F5] via-[#FCEEF2]/40 to-[#FFF9F5] py-16 lg:py-24 border-b border-[#EEDCDA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCEEF2] border border-[#F8E1E8] text-xs font-semibold uppercase tracking-wider text-[#C94F78]">
              <Sparkles className="w-3.5 h-3.5 text-[#C94F78]" />
              <span>{subheading}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3B2A2A] leading-[1.18]">
              {heading}
            </h1>

            <p className="text-base sm:text-lg text-[#7A6868] max-w-2xl leading-relaxed">
              {body}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={ctaUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#C94F78] hover:bg-[#8E294D] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <Link
                href={ctaSecondaryUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white hover:bg-[#FCEEF2] text-[#8E294D] border border-[#EEDCDA] font-semibold text-sm shadow-sm transition-all"
              >
                {ctaSecondaryText}
              </Link>
            </div>

            {/* Quick trust metrics under hero */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#EEDCDA]/80 text-center lg:text-left">
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#8E294D]">100%</span>
                <span className="text-[11px] text-[#7A6868] uppercase tracking-wider">Fresh Blooms</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#8E294D]">Same-Day</span>
                <span className="text-[11px] text-[#7A6868] uppercase tracking-wider">Express Slots</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#8E294D]">4.9 / 5</span>
                <span className="text-[11px] text-[#7A6868] uppercase tracking-wider">Customer Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                <img
                  src={desktopImage}
                  alt="Beautiful floral arrangement and gift hamper"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
                  <span className="text-xs uppercase tracking-widest text-[#F8E1E8] font-bold block">
                    Handcrafted Daily
                  </span>
                  <span className="font-serif text-base font-semibold">
                    Wrapped with Italian Paper & Satin Ribbons
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
