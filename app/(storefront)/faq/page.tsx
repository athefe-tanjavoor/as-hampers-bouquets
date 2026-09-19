"use client";

import React, { useState } from "react";
import { BRAND_CONFIG } from "@/lib/config";
import { Breadcrumbs } from "@/lib/ui";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Choose a product, select available options (such as size, style, or personalization), add it to your cart and complete checkout with your delivery address and payment details."
    },
    {
      question: "How do I know if delivery is available in my area?",
      answer: "Enter the delivery pincode on the product page or at checkout to view instant serviceability, delivery fees, and available delivery slots."
    },
    {
      question: "Can I schedule a specific delivery slot?",
      answer: "Yes! Scheduled delivery is available for products and locations where delivery slots (Morning, Afternoon, Evening, or Midnight) are offered."
    },
    {
      question: "Can I send a gift directly to another person?",
      answer: "Yes. Enter the recipient's delivery details and contact number at checkout. We will never include price receipts inside the gift package."
    },
    {
      question: "Can I add a personal message card?",
      answer: "A complimentary gift message can be added during the cart or product step. It will be printed on our luxury branded card."
    },
    {
      question: "What payment methods are supported?",
      answer: "We support online payments via Razorpay (UPI, Credit/Debit cards, NetBanking, Wallets) as well as Cash on Delivery (COD) for eligible order values and areas."
    },
    {
      question: "How can I track my order?",
      answer: "Use our dedicated Track Order page with your Order Number and phone number to see live status updates from dispatch to doorstep delivery."
    },
    {
      question: "Can I cancel an order?",
      answer: "Cancellation depends on the order preparation stage. Because fresh flowers are cut and prepared on order, cancellations must be requested before preparation begins. Please refer to our Cancellation & Refund Policy."
    },
    {
      question: "What if my product arrives damaged?",
      answer: "Contact support promptly at our customer care email or phone with your order number and photos so our support team can arrange an immediate replacement or refund."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={[{ label: "FAQs", href: "/faq" }]} />

        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block">
            Help & Guidance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B2A2A]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6868] max-w-md mx-auto leading-relaxed">
            Find answers about bouquets, flowers, gift hampers, personalized gifts, delivery, payments and order tracking.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EEDCDA] shadow-sm space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-[#EEDCDA] bg-[#FFF9F5] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-serif text-sm sm:text-base font-semibold text-[#3B2A2A] hover:text-[#C94F78] focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C94F78] transform transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-[#7A6868] leading-relaxed animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
