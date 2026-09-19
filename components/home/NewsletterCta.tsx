"use client";

import React, { useState } from "react";
import { Mail, MessageCircle, Check } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/config";

export const NewsletterCta: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="py-16 bg-[#FCEEF2] border-b border-[#F8E1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#EEDCDA]">
          <div className="lg:col-span-7 space-y-2 text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block">
              Join Our Floral Club
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
              Get ₹150 OFF Your First Order
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6868] max-w-md">
              Receive secret floral offers, seasonal flower guides, and exclusive discounts straight to your inbox.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 rounded-full bg-[#FFF9F5] border border-[#EEDCDA] text-xs text-[#3B2A2A] focus:outline-none focus:border-[#C94F78]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <span>Subscribe</span>}
              </button>
            </form>

            <div className="flex items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-[#7A6868]">
              <span>Need instant gift consultation?</span>
              <a
                href={BRAND_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold text-[#25D366] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
