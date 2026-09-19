import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/config";
import { Breadcrumbs } from "@/lib/ui";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${BRAND_CONFIG.name}`,
  description: `Terms and conditions for placing floral and gift hamper orders on ${BRAND_CONFIG.name}.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/terms-and-conditions`
  }
};

export default function TermsConditionsPage() {
  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: "Terms & Conditions", href: "/terms-and-conditions" }]} />

        <div className="text-center space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2A2A]">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#7A6868]">Last updated: September 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EEDCDA] shadow-sm space-y-6 text-xs sm:text-sm text-[#3B2A2A] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#8E294D]">1. Product Availability & Substitution</h2>
            <p className="text-[#7A6868]">
              Because flowers are seasonal natural products, occasional regional unavailability of specific flower shades or filler foliage may occur. In such cases, our master florists will substitute with blooms of equal or higher value while strictly maintaining the overall aesthetic color palette.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#8E294D]">2. Pricing & Payments</h2>
            <p className="text-[#7A6868]">
              All prices listed on the site are in Indian Rupees (INR) and inclusive of applicable GST taxes. Orders are considered confirmed only upon successful authorization of payment by Razorpay or selection of eligible COD.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#8E294D]">3. Intellectual Property</h2>
            <p className="text-[#7A6868]">
              All brand photography, copywriting, graphics, logos, and arrangement designs on {BRAND_CONFIG.domain} are the exclusive intellectual property of {BRAND_CONFIG.name}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
