import React from "react";
import { StarRating, Badge } from "@/lib/ui";
import { BRAND_CONFIG } from "@/lib/config";
import { CheckCircle } from "lucide-react";

export const ReviewSection: React.FC = () => {
  const reviews = [
    {
      name: "Ananya S.",
      location: "Chennai",
      rating: 5,
      product: "Blush Garden Rose Bouquet",
      comment: "The flowers were breathtaking! Ordered for my sister's birthday and the roses stayed fresh and fragrant for a whole week.",
      date: "September 2026"
    },
    {
      name: "Rohan V.",
      location: "Chennai",
      rating: 5,
      product: "Opulent Celebration Hamper",
      comment: "Spectacular presentation! The customized tumbler was sharp and high quality, and the Belgian chocolates were heavenly.",
      date: "September 2026"
    },
    {
      name: "Meera K.",
      location: "Bangalore",
      rating: 5,
      product: "Anniversary Rose Bouquet",
      comment: "The midnight delivery slot arrived right on time at 11:30 PM. Made our celebration truly memorable. Seamless experience!",
      date: "August 2026"
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-[#EEDCDA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block mb-1">
            Real Stories
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            Loved by Customers
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6868] mt-2">
            Real experiences from customers who chose {BRAND_CONFIG.name} for their special moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="p-6 rounded-2xl bg-[#FFF9F5] border border-[#EEDCDA] flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <StarRating rating={rev.rating} showCount={false} />
                  <span className="inline-flex items-center text-[10px] text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-semibold">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified Buyer
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#3B2A2A] italic leading-relaxed">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-[#EEDCDA]/80 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#3B2A2A]">
                    {rev.name}
                  </h3>
                  <span className="text-[11px] text-[#7A6868]">{rev.location} • {rev.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
