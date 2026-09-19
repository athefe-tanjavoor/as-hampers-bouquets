import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@repo/config";
import { Breadcrumbs } from "@repo/ui";

export const metadata: Metadata = {
  title: `Refund & Cancellation Policy | ${BRAND_CONFIG.name}`,
  description: `Cancellation rules, return guidelines for fresh flowers, and refund processing timelines.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/refund-cancellation`
  }
};

export default function RefundCancellationPage() {
  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: "Refund & Cancellation", href: "/refund-cancellation" }]} />

        <div className="text-center space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2A2A]">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs text-[#7A6868]">Last updated: September 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EEDCDA] shadow-sm space-y-6 text-xs sm:text-sm text-[#3B2A2A] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#8E294D]">1. Order Cancellations</h2>
            <p className="text-[#7A6868]">
              Because fresh flower arrangements are prepared custom to order, cancellations must be communicated at least 24 hours prior to the scheduled delivery date. Orders that have entered the &quot;Processing&quot; or &quot;Packed&quot; stage cannot be cancelled.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#8E294D]">2. Damaged or Unsatisfactory Deliveries</h2>
            <p className="text-[#7A6868]">
              In the unlikely event that your blooms or hamper items arrive damaged, please notify our team within 4 hours of delivery with clear photographs. Upon review, we will dispatch an expedited replacement or issue a full refund to your original payment method.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#8E294D]">3. Refund Processing Timelines</h2>
            <p className="text-[#7A6868]">
              Approved refunds are credited back to the original source (UPI/Credit Card/NetBanking) within 5 to 7 business days via our payment gateway provider Razorpay.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
