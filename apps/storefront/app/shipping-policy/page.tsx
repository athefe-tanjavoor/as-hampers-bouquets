import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@repo/config";
import { Breadcrumbs } from "@repo/ui";

export const metadata: Metadata = {
  title: `Shipping Policy | ${BRAND_CONFIG.name}`,
  description: `Shipping guidelines, dispatch timelines, same-day delivery cutoff hours and delivery attempts for ${BRAND_CONFIG.name}.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/shipping-policy`
  }
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: "Shipping Policy", href: "/shipping-policy" }]} />

        <div className="text-center space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2A2A]">
            Shipping Policy
          </h1>
          <p className="text-xs text-[#7A6868]">Last updated: September 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EEDCDA] shadow-sm space-y-6 text-xs sm:text-sm text-[#3B2A2A] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#8E294D]">1. Dispatch & Delivery Timelines</h2>
            <p className="text-[#7A6868]">
              Perishable fresh flower bouquets are hand-delivered within the selected delivery time slot on the date chosen by the customer. Non-perishable gift hampers and personalized items ordered for outside the primary delivery city are dispatched via express air courier within 24-48 hours.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#8E294D]">2. Delivery Attempts & Recipient Availability</h2>
            <p className="text-[#7A6868]">
              Since bouquets contain fresh, perishable flowers, our delivery associate will make one delivery attempt to the address specified during checkout. If the recipient is unavailable, the order may be left with building security or at the door upon customer instruction.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#8E294D]">3. Delivery Charges</h2>
            <p className="text-[#7A6868]">
              Orders exceeding our free delivery threshold of ₹{BRAND_CONFIG.freeDeliveryThreshold} qualify for free standard delivery. Specific express or midnight delivery slots carry an optional additional surcharge clearly detailed at checkout.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
