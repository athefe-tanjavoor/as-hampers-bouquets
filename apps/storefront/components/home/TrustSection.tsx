import React from "react";
import { Sparkles, Award, Heart, Truck, ShieldCheck, Headphones } from "lucide-react";
import { BRAND_CONFIG } from "@repo/config";

export const TrustSection: React.FC = () => {
  const points = [
    {
      icon: Sparkles,
      heading: "Thoughtfully Designed",
      copy: "Every arrangement is curated with attention to colour, presentation and occasion."
    },
    {
      icon: Award,
      heading: "Quality You Can Feel",
      copy: "We focus on careful preparation, neat packaging and consistent presentation."
    },
    {
      icon: Heart,
      heading: "Made for the Moment",
      copy: "From birthdays to weddings, each collection is designed around the feeling you want to create."
    },
    {
      icon: Truck,
      heading: "Convenient Delivery",
      copy: "Choose available delivery options and slots for your location during checkout."
    },
    {
      icon: ShieldCheck,
      heading: "Secure Checkout",
      copy: "Shop with secure payment options and clear order updates."
    },
    {
      icon: Headphones,
      heading: "Customer Support",
      copy: "Need help choosing a gift? Our team is here to assist."
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-[#EEDCDA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block mb-1">
            Our Promise
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            Why Choose {BRAND_CONFIG.name}?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.heading}
                className="p-6 rounded-2xl bg-[#FFF9F5] border border-[#EEDCDA] flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FCEEF2] text-[#C94F78] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#3B2A2A]">
                    {pt.heading}
                  </h3>
                  <p className="text-xs text-[#7A6868] mt-1 leading-relaxed">
                    {pt.copy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
