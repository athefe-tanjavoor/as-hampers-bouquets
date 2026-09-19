import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const PromoBanners: React.FC = () => {
  return (
    <section className="py-16 bg-[#FFF9F5] border-b border-[#EEDCDA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Wedding Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EEDCDA] bg-white grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block">
              Weddings & Celebrations
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#3B2A2A]">
              Flowers for Beautiful Beginnings
            </h2>
            <p className="text-sm sm:text-base text-[#7A6868] leading-relaxed max-w-xl">
              Make weddings, engagements and celebrations more memorable with elegant bouquets, wedding garlands and floral arrangements designed for meaningful moments.
            </p>
            <div className="pt-2">
              <Link
                href="/wedding-flowers"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold shadow-md transition-colors"
              >
                <span>Explore Wedding Flowers</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 h-64 lg:h-full min-h-[340px] relative">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
              alt="Bridal floral bouquets and wedding garland"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Corporate Gifting Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EEDCDA] bg-[#8E294D] text-white grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 h-64 lg:h-full min-h-[340px] relative order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
              alt="Corporate gift hampers and employee recognition boxes"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-4 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-widest text-[#F8E1E8] font-bold block">
              B2B & Bulk Orders
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Thoughtful Corporate Gifts, Beautifully Presented
            </h2>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-xl">
              Celebrate clients, employees, milestones and festive occasions with curated corporate hampers and customized gifting solutions.
            </p>
            <div className="pt-2">
              <Link
                href="/corporate-gifts"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-white hover:bg-[#F8E1E8] text-[#8E294D] text-xs font-semibold shadow-md transition-colors"
              >
                <span>Enquire for Corporate Gifting</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
