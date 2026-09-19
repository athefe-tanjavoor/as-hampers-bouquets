"use client";

import React, { useState } from "react";
import { BRAND_CONFIG } from "@/lib/config";
import { Breadcrumbs } from "@/lib/ui";
import { api } from "@/lib/api";
import { Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    subject: "Order Enquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.submitContact(formData);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={[{ label: "Contact Us", href: "/contact" }]} />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block">
            Customer Support & Assistance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B2A2A]">
            We’re Here to Help
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6868] leading-relaxed">
            Have a question about a product, delivery or order? Send us a message and our team will help you with the next step.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#EEDCDA] shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#8E294D]">Get in Touch</h2>

            <div className="space-y-4 text-xs text-[#7A6868]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FCEEF2] text-[#C94F78] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#3B2A2A] block">Customer Support Phone</span>
                  <a href={`tel:${BRAND_CONFIG.supportPhone.replace(/\s+/g, "")}`} className="hover:text-[#C94F78]">
                    {BRAND_CONFIG.supportPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FCEEF2] text-[#C94F78] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#3B2A2A] block">Support Email</span>
                  <a href={`mailto:${BRAND_CONFIG.supportEmail}`} className="hover:text-[#C94F78]">
                    {BRAND_CONFIG.supportEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FCEEF2] text-[#C94F78] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#3B2A2A] block">Business Support Hours</span>
                  <span>Monday – Sunday: 8:00 AM – 10:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FCEEF2] text-[#C94F78] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#3B2A2A] block">Primary Service Area</span>
                  <span>{BRAND_CONFIG.serviceArea}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#EEDCDA] shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#8E294D]">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-xs text-[#7A6868] max-w-sm mx-auto">
                  Your message has been sent to our customer care team. We will reply to your email shortly.
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
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Order Number (If Applicable)</label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="e.g. BB-20260919-4821"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  >
                    <option value="Order Status / Tracking">Order Status / Tracking</option>
                    <option value="Delivery Enquiries">Delivery Enquiries</option>
                    <option value="Personalization Request">Personalization Request</option>
                    <option value="Corporate / Bulk Order">Corporate / Bulk Order</option>
                    <option value="Feedback or Compliment">Feedback or Compliment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist with your order or gifting question?"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-full bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold shadow-md transition-colors inline-flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
