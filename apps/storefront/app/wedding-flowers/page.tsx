"use client";

import React, { useState } from "react";
import { BRAND_CONFIG } from "@repo/config";
import { Breadcrumbs } from "@repo/ui";
import { api } from "../../lib/api";
import { Heart, Sparkles, Check, Send } from "lucide-react";

export default function WeddingFlowersPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventDate: "",
    eventType: "Wedding Ceremony",
    venueCity: BRAND_CONFIG.primaryCity,
    budget: "₹25,000 - ₹50,000",
    requirements: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.submitWeddingEnquiry(formData);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ label: "Wedding Flowers", href: "/wedding-flowers" }]} />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block">
            Auspicious Ceremonies & Celebrations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3B2A2A]">
            Flowers for Beautiful Beginnings
          </h1>
          <p className="text-sm sm:text-base text-[#7A6868] leading-relaxed">
            From traditional garlands to elegant bridal flowers and celebration arrangements, explore floral options designed to complement beautiful wedding moments.
          </p>
        </div>

        {/* Categories Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Wedding Garlands", desc: "Hand-strung fresh rose and orchid varmalas.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80" },
            { title: "Bridal Bouquets", desc: "Refined pastel rose and lily hand-tied posies.", img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80" },
            { title: "Venue & Stage Decor", desc: "Floral backdrops, mandap garlands and table arrangements.", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80" },
            { title: "Engagement Flowers", desc: "Elegant ring-tray flower wreaths and entry decor.", img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=600&q=80" }
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl overflow-hidden border border-[#EEDCDA] shadow-sm group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-base font-bold text-[#3B2A2A] mb-1">{item.title}</h3>
                <p className="text-xs text-[#7A6868]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation Enquiry Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EEDCDA] shadow-md max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block mb-1">
              Custom Requirements
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
              Enquire About Wedding Flowers
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6868] mt-1">
              Share your celebration details and our bridal floral consultants will prepare a customized proposal.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-[#FCEEF2] rounded-2xl border border-[#F8E1E8] space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#8E294D]">
                Thank You for Your Wedding Consultation Enquiry
              </h3>
              <p className="text-xs text-[#7A6868] max-w-md mx-auto">
                Our lead wedding florist will review your requirements and call you back within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    placeholder="e.g. Priya Natarajan"
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
                    placeholder="e.g. 9876543210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    placeholder="priya@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Event Type</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  >
                    <option value="Wedding Ceremony">Wedding Ceremony</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Reception">Reception</option>
                    <option value="Sangeet / Mehendi">Sangeet / Mehendi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Venue & City *</label>
                  <input
                    type="text"
                    required
                    value={formData.venueCity}
                    onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    placeholder="e.g. ITC Grand Chola, Chennai"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Estimated Floral Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  >
                    <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                    <option value="Above ₹1,00,000">Above ₹1,00,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Floral Requirements & Themes *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Describe your color theme, number of garlands, bridal bouquet requirements, etc."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-full bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold shadow-md transition-colors inline-flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? "Submitting..." : "Submit Wedding Enquiry"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
