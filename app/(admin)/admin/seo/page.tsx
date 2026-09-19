"use client";

import React, { useState, useEffect } from "react";
import { Search, Save, Check, Globe, Eye } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/config";

export default function AdminSEOManagerPage() {
  const [pages, setPages] = useState<any[]>([
    {
      _id: "seo-1",
      path: "/",
      h1: "Beautiful Bouquets, Thoughtful Hampers & Gifts Made With Love",
      seo: {
        title: `${BRAND_CONFIG.name} | Bouquets, Flowers & Gift Hampers Online`,
        description: `Shop beautiful bouquets, fresh flowers, handcrafted gift hampers and personalized gifts for birthdays, anniversaries, weddings and every special moment.`,
        canonical: `https://${BRAND_CONFIG.domain}/`,
        robots: "index, follow"
      }
    },
    {
      _id: "seo-2",
      path: "/bouquets",
      h1: "Beautiful Bouquets for Every Moment",
      seo: {
        title: `Buy Bouquets Online | Beautiful Bouquets for Every Occasion | ${BRAND_CONFIG.name}`,
        description: `Shop beautiful bouquets online from ${BRAND_CONFIG.name}. Explore handcrafted, fresh flower and luxury bouquets for birthdays and anniversaries.`,
        canonical: `https://${BRAND_CONFIG.domain}/bouquets`,
        robots: "index, follow"
      }
    },
    {
      _id: "seo-3",
      path: "/under-999",
      h1: "Beautiful Gifts Under ₹999",
      seo: {
        title: `Gifts Under ₹999 | Affordable Bouquets & Gifts | ${BRAND_CONFIG.name}`,
        description: `Discover beautiful bouquets, hampers and thoughtful gifts under ₹999. Shop affordable gifting options online from ${BRAND_CONFIG.name}.`,
        canonical: `https://${BRAND_CONFIG.domain}/under-999`,
        robots: "index, follow"
      }
    }
  ]);

  const [selectedPage, setSelectedPage] = useState<any>(pages[0]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.length) {
          setPages(json.data);
          setSelectedPage(json.data[0]);
        }
      })
      .catch((e) => {});
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            Technical SEO & Metadata Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Audit meta titles, descriptions, canonical tags, and preview Google SERP appearance.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm inline-flex items-center gap-1.5"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? "SEO Updated!" : "Save Metadata"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Pages List */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-2">
          <h2 className="font-serif text-sm font-bold text-[#3B2A2A] pb-2 border-b border-slate-100">
            Indexable Landing Pages
          </h2>
          <div className="space-y-1 max-h-[500px] overflow-y-auto">
            {pages.map((p) => {
              const isSelected = selectedPage?._id === p._id;
              return (
                <button
                  key={p._id}
                  onClick={() => setSelectedPage(p)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-[#FCEEF2] text-[#8E294D] font-bold border border-[#F8E1E8]"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="font-mono">{p.path}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    {p.seo?.robots || "index"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Page SEO Editor & Google SERP Preview */}
        <div className="lg:col-span-8 space-y-6">
          {/* Live Google SERP Snippet Preview */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C94F78] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Google SERP Snippet Preview</span>
            </span>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 font-sans space-y-1">
              <div className="text-xs text-[#202124] truncate">
                https://{BRAND_CONFIG.domain}{selectedPage?.path}
              </div>
              <div className="text-lg text-[#1a0dab] hover:underline font-medium cursor-pointer line-clamp-1">
                {selectedPage?.seo?.title}
              </div>
              <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                {selectedPage?.seo?.description}
              </div>
            </div>
          </div>

          {/* Editor Form */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#3B2A2A] mb-1">
                Page Title Tag (Max 60 chars)
              </label>
              <input
                type="text"
                value={selectedPage?.seo?.title || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedPage({
                    ...selectedPage,
                    seo: { ...selectedPage.seo, title: val }
                  });
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C94F78]"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Length: {selectedPage?.seo?.title?.length || 0} / 60 characters
              </span>
            </div>

            <div>
              <label className="block font-bold text-[#3B2A2A] mb-1">
                Meta Description (Max 160 chars)
              </label>
              <textarea
                rows={3}
                value={selectedPage?.seo?.description || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedPage({
                    ...selectedPage,
                    seo: { ...selectedPage.seo, description: val }
                  });
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C94F78]"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Length: {selectedPage?.seo?.description?.length || 0} / 160 characters
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#3B2A2A] mb-1">H1 Heading</label>
                <input
                  type="text"
                  value={selectedPage?.h1 || ""}
                  onChange={(e) => setSelectedPage({ ...selectedPage, h1: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C94F78]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#3B2A2A] mb-1">Canonical URL</label>
                <input
                  type="text"
                  value={selectedPage?.seo?.canonical || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedPage({
                      ...selectedPage,
                      seo: { ...selectedPage.seo, canonical: val }
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-[11px] focus:outline-none focus:border-[#C94F78]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
