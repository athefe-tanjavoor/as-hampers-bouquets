"use client";

import React, { useState } from "react";
import { BRAND_CONFIG } from "@repo/config";
import { Breadcrumbs } from "@repo/ui";
import { api } from "../../lib/api";
import { Briefcase, Check, Send, Award, Gift, Sparkles } from "lucide-react";

export default function CorporateGiftsPage() {
  const [formData, setFormData] = useState({
    company: "",
    contactPerson: "",
    email: "",
    phone: "",
    quantity: "25 - 50 units",
    deliveryCity: BRAND_CONFIG.primaryCity,
    requiredDate: "",
    occasion: "Employee Recognition",
    budgetRange: "₹1,000 - ₹2,000 per hamper",
    customizationRequirements: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.submitCorporateEnquiry(formData);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ label: "Corporate Gifting", href: "/corporate-gifts" }]} />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block">
            Employee & Client Appreciation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3B2A2A]">
            Corporate Gifting, Thoughtfully Presented
          </h1>
          <p className="text-sm sm:text-base text-[#7A6868] leading-relaxed">
            Recognize clients, celebrate employees and mark important business milestones with curated gifts and hampers designed to represent your brand with care.
          </p>
        </div>

        {/* Value pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#EEDCDA] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCEEF2] text-[#C94F78] flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#3B2A2A]">Custom Logo Branding</h3>
            <p className="text-xs text-[#7A6868] leading-relaxed">
              Personalized company logo cards, engraved keepsakes, ribbons, and branded sleeve packaging.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EEDCDA] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCEEF2] text-[#C94F78] flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#3B2A2A]">Pan-India Multi-Address Delivery</h3>
            <p className="text-xs text-[#7A6868] leading-relaxed">
              Direct doorstep courier delivery to remote team members across India with tracking dashboards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EEDCDA] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCEEF2] text-[#C94F78] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#3B2A2A]">Gourmet & Curated Treats</h3>
            <p className="text-xs text-[#7A6868] leading-relaxed">
              Belgian confections, dried flowers, organic teas, luxury scented candles, and high-end drinkware.
            </p>
          </div>
        </div>

        {/* Corporate Quote Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EEDCDA] shadow-md max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block mb-1">
              B2B Bulk Orders
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
              Request a Corporate Gifting Quote
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6868] mt-1">
              Fill out the form below and our corporate gifting account manager will connect with you with a catalog and wholesale pricing.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-[#FCEEF2] rounded-2xl border border-[#F8E1E8] space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#8E294D]">
                Thank You for Your Corporate Enquiry
              </h3>
              <p className="text-xs text-[#7A6868] max-w-md mx-auto">
                Our gifting manager will review your quantity and budget and send a tailored catalog within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    placeholder="e.g. Acme Technologies Pvt Ltd"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    placeholder="e.g. Anand Kumar"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    placeholder="anand@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    placeholder="9876543210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Estimated Quantity *</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  >
                    <option value="10 - 25 units">10 - 25 units</option>
                    <option value="25 - 50 units">25 - 50 units</option>
                    <option value="50 - 100 units">50 - 100 units</option>
                    <option value="100 - 500 units">100 - 500 units</option>
                    <option value="500+ units">500+ units</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Delivery City / Cities *</label>
                  <input
                    type="text"
                    required
                    value={formData.deliveryCity}
                    onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    placeholder="e.g. Chennai / Pan-India"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Occasion / Theme *</label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  >
                    <option value="Employee Recognition">Employee Recognition</option>
                    <option value="Diwali / Festive Gifting">Diwali / Festive Gifting</option>
                    <option value="New Hire Welcome Kit">New Hire Welcome Kit</option>
                    <option value="Client Appreciation">Client Appreciation</option>
                    <option value="Annual Day / Milestones">Annual Day / Milestones</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Budget per Hamper</label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  >
                    <option value="Under ₹1,000">Under ₹1,000</option>
                    <option value="₹1,000 - ₹2,000">₹1,000 - ₹2,000</option>
                    <option value="₹2,000 - ₹3,500">₹2,000 - ₹3,500</option>
                    <option value="₹3,500+ Luxury">₹3,500+ Luxury</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Customization Requirements *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.customizationRequirements}
                  onChange={(e) => setFormData({ ...formData, customizationRequirements: e.target.value })}
                  placeholder="Share details about logo placement, custom items, preferred dispatch timeline..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-full bg-[#8E294D] hover:bg-[#C94F78] text-white text-xs font-semibold shadow-md transition-colors inline-flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? "Submitting..." : "Request Corporate Quote"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
