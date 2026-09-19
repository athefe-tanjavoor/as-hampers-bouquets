import React from "react";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";

export const PriceCollection: React.FC = () => {
  const tiers = [
    { label: "Gifts Under ₹599", url: "/under-599", subtitle: "Sweet & simple surprises", bg: "bg-[#FCEEF2]", border: "border-[#F8E1E8]", text: "text-[#C94F78]" },
    { label: "Gifts Under ₹999", url: "/under-999", subtitle: "Popular pocket-friendly gifts", bg: "bg-[#FFF9F5]", border: "border-[#EEDCDA]", text: "text-[#8E294D]" },
    { label: "Gifts Under ₹1,499", url: "/under-1499", subtitle: "Lush bouquets & treats", bg: "bg-[#FCEEF2]", border: "border-[#F8E1E8]", text: "text-[#C94F78]" },
    { label: "Gifts Under ₹2,499", url: "/under-2499", subtitle: "Celebration gift hampers", bg: "bg-[#FFF9F5]", border: "border-[#EEDCDA]", text: "text-[#8E294D]" },
    { label: "Premium Gifts", url: "/premium-gifts", subtitle: "Grand luxury floral arrangements", bg: "bg-[#8E294D]", border: "border-[#8E294D]", text: "text-white" }
  ];

  return (
    <section className="py-16 bg-white border-b border-[#EEDCDA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block mb-1">
            Shop by Budget
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            Beautiful Gifts for Every Budget
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tiers.map((tier) => (
            <Link
              key={tier.url}
              href={tier.url}
              className={`p-6 rounded-2xl border ${tier.border} ${tier.bg} flex flex-col justify-between hover:shadow-lg transition-all transform hover:-translate-y-1 group`}
            >
              <div>
                <Tag className={`w-5 h-5 mb-3 ${tier.text === "text-white" ? "text-white" : "text-[#C94F78]"}`} />
                <h3 className={`font-serif text-lg font-bold ${tier.text}`}>
                  {tier.label}
                </h3>
                <p className={`text-xs mt-1 ${tier.text === "text-white" ? "text-gray-200" : "text-[#7A6868]"}`}>
                  {tier.subtitle}
                </p>
              </div>

              <div className={`mt-6 inline-flex items-center text-xs font-semibold ${tier.text === "text-white" ? "text-[#F8E1E8]" : "text-[#C94F78]"} group-hover:translate-x-1 transition-transform`}>
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
