import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG, DEFAULT_DELIVERY_SLOTS } from "@/lib/config";
import { Breadcrumbs } from "@/lib/ui";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: `Delivery Information | ${BRAND_CONFIG.name}`,
  description: `Learn about our same-day delivery slots, coverage areas in ${BRAND_CONFIG.primaryCity}, packaging standards, and delivery terms.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/delivery-information`
  }
};

export default function DeliveryInformationPage() {
  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={[{ label: "Delivery Information", href: "/delivery-information" }]} />

        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block">
            Express & Scheduled Gifting
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B2A2A]">
            Delivery Information & Slots
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6868] max-w-md mx-auto">
            Everything you need to know about our same-day floral delivery promise, express time slots, and careful packaging.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EEDCDA] shadow-sm space-y-8 text-xs sm:text-sm text-[#3B2A2A] leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#8E294D] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#C94F78]" />
              <span>Service Coverage Areas</span>
            </h2>
            <p className="text-[#7A6868]">
              We operate our primary floral studio in {BRAND_CONFIG.primaryCity} and serve all central and suburban pin codes with dedicated temperature-controlled delivery vans and trained delivery associates. Pan-India shipping is available for non-perishable gift hampers and personalized keepsakes via express air courier.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#EEDCDA]">
            <h2 className="font-serif text-xl font-bold text-[#8E294D] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#C94F78]" />
              <span>Available Delivery Slots</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {DEFAULT_DELIVERY_SLOTS.map((slot) => (
                <div key={slot.id} className="p-4 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5]">
                  <div className="font-serif font-bold text-sm text-[#3B2A2A]">{slot.label}</div>
                  <div className="text-[11px] text-[#7A6868] mt-1">
                    Order before cutoff to ensure prompt dispatch.
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#EEDCDA]">
            <h2 className="font-serif text-xl font-bold text-[#8E294D] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C94F78]" />
              <span>Packaging & Freshness Guarantee</span>
            </h2>
            <p className="text-[#7A6868]">
              All fresh flower stems are sealed with mineral water vials before packaging to ensure hydration during transit. Bouquets are hand-delivered in vertical upright gift carriers that prevent petal bruising or crushing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
