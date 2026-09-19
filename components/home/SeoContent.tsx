"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/config";

export const SeoContent: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: `What can I order from ${BRAND_CONFIG.name}?`,
      answer: "You can explore bouquets, flowers, gift hampers, personalized gifts, wedding flowers and selected corporate gifting options."
    },
    {
      question: "Can I order flowers online?",
      answer: "Yes. Browse the available flower collections, select a product and check delivery availability for your location during checkout."
    },
    {
      question: "Do you offer personalized gifts?",
      answer: "Selected products can include personalization such as names, messages or photographs. The available options are shown on the product page."
    },
    {
      question: "Can I send a gift directly to someone?",
      answer: "Yes. Enter the recipient's delivery address during checkout and add a gift message when the selected product supports it."
    },
    {
      question: "How do I track my order?",
      answer: "Use the Track Order page and enter the required order details. You can also view order updates from your account."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-16 bg-white border-b border-[#EEDCDA]/60">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* SEO Editorial Content */}
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            Thoughtful Flowers & Handcrafted Gifting
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6868] leading-relaxed text-justify sm:text-center">
            {BRAND_CONFIG.name} brings together beautiful bouquets, fresh flowers, thoughtful gift hampers and personalized gifts for the moments that matter. Whether you are celebrating a birthday, anniversary, wedding, achievement or simply want to make someone&apos;s ordinary day feel special, our collections are designed to make gifting easy and memorable. Explore bouquets in different styles, curated hampers, personalized keepsakes and floral arrangements for celebrations big and small. Choose your favourite design, add a personal message where available and select from the delivery options offered for your location. From elegant flowers to creative handcrafted gifts, discover something meaningful for every person and every occasion.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="pt-6 border-t border-[#EEDCDA]">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3B2A2A] text-center mb-6">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-[#EEDCDA] bg-[#FFF9F5] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-serif text-sm sm:text-base font-semibold text-[#3B2A2A] hover:text-[#C94F78] transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C94F78] transform transition-transform duration-200 flex-shrink-0 ml-4 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-[#7A6868] leading-relaxed animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
