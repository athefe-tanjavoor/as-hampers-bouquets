import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/config";
import { Breadcrumbs } from "@/lib/ui";
import { Heart, Sparkles, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: `About ${BRAND_CONFIG.name} | Thoughtful Flowers, Bouquets & Gifts`,
  description: `Learn about ${BRAND_CONFIG.name}, our approach to thoughtful gifting, handcrafted presentation and creating beautiful moments through flowers and gifts.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/about`
  }
};

export default function AboutPage() {
  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ label: "About Us", href: "/about" }]} />

        {/* Hero */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block">
            Our Story & Values
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3B2A2A]">
            Made With Love. Made for Meaningful Moments.
          </h1>
          <p className="text-sm sm:text-base text-[#7A6868] max-w-2xl mx-auto leading-relaxed">
            {BRAND_CONFIG.name} was created with a simple belief: a thoughtful gift can turn an ordinary moment into a memory.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-3xl overflow-hidden shadow-md border border-[#EEDCDA] aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80"
              alt="Handcrafting fresh rose bouquets"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-md border border-[#EEDCDA] aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
              alt="Luxury curated gift hampers"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Longform Editorial */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EEDCDA] shadow-sm space-y-8 text-sm sm:text-base text-[#3B2A2A] leading-relaxed">
          <p>
            We bring together flowers, bouquets, hampers and personalized gifts that are designed with care and presented beautifully. From choosing the right colour combination to preparing a gift for delivery, we focus on the details that make gifting feel personal.
          </p>

          <div className="space-y-3 pt-4 border-t border-[#EEDCDA]">
            <h2 className="font-serif text-2xl font-bold text-[#8E294D]">What We Believe</h2>
            <p className="text-[#7A6868]">
              Gifting is an emotional gesture. Whether you are celebrating across the city or sending love from halfway across the world, every stem, ribbon, and message should reflect the exact emotion you wish to convey.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#EEDCDA]">
            <h2 className="font-serif text-2xl font-bold text-[#8E294D]">Our Approach to Gifting</h2>
            <p className="text-[#7A6868]">
              Rather than generic mass-produced gifts, we curate every arrangement daily in our dedicated floral studio. We pair farm-fresh greenhouse roses and lilies with bespoke artisanal delicacies and personalized keepsakes.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#EEDCDA]">
            <h2 className="font-serif text-2xl font-bold text-[#8E294D]">Quality & Presentation</h2>
            <p className="text-[#7A6868]">
              Presentation is half the magic. Each bouquet is wrapped in imported matte Korean wrap or rustic jute, secured with matching luxury satin ribbon, and kept hydrated with floral water capsules to guarantee fresh delivery.
            </p>
          </div>

          <div className="pt-6 text-center">
            <Link
              href="/bouquets"
              className="px-8 py-3.5 rounded-full bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold shadow-md transition-colors inline-block"
            >
              Explore Our Collections &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
