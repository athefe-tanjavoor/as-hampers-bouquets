import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/config";
import { Breadcrumbs } from "@/lib/ui";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND_CONFIG.name}`,
  description: `How ${BRAND_CONFIG.name} collects, protects, and handles customer personal data, contact information, and payments.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/privacy-policy`
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy-policy" }]} />

        <div className="text-center space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2A2A]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#7A6868]">Last updated: September 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EEDCDA] shadow-sm space-y-6 text-xs sm:text-sm text-[#3B2A2A] leading-relaxed">
          <p>
            At {BRAND_CONFIG.name}, we are committed to safeguarding your privacy. This policy details how we handle the customer contact details, delivery addresses, and payment data you provide when ordering our bouquets and gift hampers.
          </p>

          <section className="space-y-2 pt-2">
            <h2 className="font-serif text-lg font-bold text-[#8E294D]">1. Information We Collect</h2>
            <p className="text-[#7A6868]">
              We collect customer name, phone number, email address, delivery address, and optional gift messages solely to process, deliver, and update you regarding your order.
            </p>
          </section>

          <section className="space-y-2 pt-2">
            <h2 className="font-serif text-lg font-bold text-[#8E294D]">2. Payment Security</h2>
            <p className="text-[#7A6868]">
              All card, UPI, and net banking transactions are processed directly through Razorpay&apos;s RBI-compliant, PCI-DSS Level 1 certified gateway. We never store credit card numbers or banking PINs on our servers.
            </p>
          </section>

          <section className="space-y-2 pt-2">
            <h2 className="font-serif text-lg font-bold text-[#8E294D]">3. Non-Disclosure</h2>
            <p className="text-[#7A6868]">
              We never sell or rent your personal information to third parties. Customer contact details are only shared with our assigned delivery associates to facilitate doorstep delivery.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
