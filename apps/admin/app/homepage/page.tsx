"use client";

import React, { useState, useEffect } from "react";
import { Home, Save, Check, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { BRAND_CONFIG } from "@repo/config";

export default function AdminHomepageCMSPage() {
  const [sections, setSections] = useState<any[]>([
    {
      _id: "sec-1",
      sectionType: "HERO",
      title: "Hero Banner",
      heading: "Beautiful Bouquets, Thoughtful Hampers & Gifts Made With Love",
      subheading: "Made With Love. Designed to Be Remembered.",
      ctaText: "Shop Gifts",
      ctaUrl: "/bouquets",
      ctaSecondaryText: "Explore Bouquets",
      ctaSecondaryUrl: "/flowers",
      isActive: true,
      sortOrder: 1
    },
    {
      _id: "sec-2",
      sectionType: "CATEGORY_RAIL",
      title: "Quick Category Icons",
      isActive: true,
      sortOrder: 2
    },
    {
      _id: "sec-3",
      sectionType: "OCCASION_GRID",
      title: "Shop by Occasion Grid",
      isActive: true,
      sortOrder: 3
    },
    {
      _id: "sec-4",
      sectionType: "PRODUCT_CAROUSEL",
      title: "Bestselling Products Carousel",
      heading: "Our Most Loved Bouquets & Hampers",
      isActive: true,
      sortOrder: 4
    },
    {
      _id: "sec-5",
      sectionType: "PRICE_COLLECTION",
      title: "Shop by Budget Rails",
      isActive: true,
      sortOrder: 5
    },
    {
      _id: "sec-6",
      sectionType: "TRUST_BLOCK",
      title: "Why Choose Us (6 Trust Points)",
      isActive: true,
      sortOrder: 6
    },
    {
      _id: "sec-7",
      sectionType: "SEO_CONTENT",
      title: "Lower SEO Editorial & FAQs Accordion",
      isActive: true,
      sortOrder: 7
    }
  ]);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/homepage")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.length) setSections(json.data);
      })
      .catch((e) => {});
  }, []);

  const handleToggle = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s._id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            Homepage CMS Builder
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Reorder, edit copy, manage visibility, and update promotional hero banners.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm inline-flex items-center gap-1.5"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? "Saved Changes!" : "Publish CMS Changes"}</span>
        </button>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {sections.map((sec, idx) => (
          <div
            key={sec._id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#3B2A2A]">
                    {sec.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono uppercase">
                    TYPE: {sec.sectionType}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggle(sec._id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"
                >
                  {sec.isActive ? (
                    <ToggleRight className="w-6 h-6 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-slate-300" />
                  )}
                  <span>{sec.isActive ? "Published" : "Hidden"}</span>
                </button>
              </div>
            </div>

            {/* Editable Fields for Hero */}
            {sec.sectionType === "HERO" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Hero Heading (H1)</label>
                  <input
                    type="text"
                    value={sec.heading || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSections((prev) =>
                        prev.map((s) => (s._id === sec._id ? { ...s, heading: val } : s))
                      );
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C94F78]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Subheading Eyebrow</label>
                  <input
                    type="text"
                    value={sec.subheading || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSections((prev) =>
                        prev.map((s) => (s._id === sec._id ? { ...s, subheading: val } : s))
                      );
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C94F78]"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
