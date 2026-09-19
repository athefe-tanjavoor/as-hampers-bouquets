"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown, Sparkles } from "lucide-react";
import { Product, Category } from "@repo/types";
import { Breadcrumbs } from "@repo/ui";
import { ProductCard } from "../product/ProductCard";

interface CategoryListingTemplateProps {
  title: string;
  intro: string;
  bottomH2?: string;
  bottomContent?: string;
  breadcrumbs: { label: string; href?: string }[];
  products: Product[];
  relatedCategories?: { name: string; slug: string; image?: string }[];
  faqs?: { question: string; answer: string }[];
}

export const CategoryListingTemplate: React.FC<CategoryListingTemplateProps> = ({
  title,
  intro,
  bottomH2 = "Find the Right Choice for Every Occasion",
  bottomContent,
  breadcrumbs,
  products,
  relatedCategories,
  faqs
}) => {
  const [sort, setSort] = useState("bestseller");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filter products client-side
  let filtered = products.filter((p) => {
    const currentPrice = p.salePrice && p.salePrice < p.price ? p.salePrice : p.price;
    if (currentPrice > maxPrice) return false;
    if (selectedOccasion !== "All" && (!p.occasion || !p.occasion.includes(selectedOccasion))) {
      return false;
    }
    return true;
  });

  // Sort products
  filtered = [...filtered].sort((a, b) => {
    const priceA = a.salePrice || a.price;
    const priceB = b.salePrice || b.price;
    if (sort === "price_asc") return priceA - priceB;
    if (sort === "price_desc") return priceB - priceA;
    if (sort === "rating") return (b.ratingAverage || 0) - (a.ratingAverage || 0);
    return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
  });

  const occasions = ["All", "Birthday", "Anniversary", "Wedding", "Congratulations", "Thank You", "Housewarming"];

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto my-8 space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B2A2A]">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-[#7A6868] leading-relaxed">
            {intro}
          </p>
        </div>

        {/* Filters & Sorting Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#EEDCDA] shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Occasion filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {occasions.map((occ) => (
              <button
                key={occ}
                onClick={() => setSelectedOccasion(occ)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedOccasion === occ
                    ? "bg-[#C94F78] text-white"
                    : "bg-[#FFF9F5] text-[#3B2A2A] hover:bg-[#FCEEF2] border border-[#EEDCDA]"
                }`}
              >
                {occ}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs text-[#7A6868] font-medium whitespace-nowrap">Sort By:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#FFF9F5] border border-[#EEDCDA] text-xs font-semibold text-[#3B2A2A] rounded-xl px-3 py-2 focus:outline-none focus:border-[#C94F78]"
            >
              <option value="bestseller">Most Popular / Bestsellers</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-[#EEDCDA]">
            <h3 className="font-serif text-xl font-bold text-[#3B2A2A] mb-2">
              No products found
            </h3>
            <p className="text-xs text-[#7A6868] mb-6">
              Try adjusting your filter options to view available items.
            </p>
            <button
              onClick={() => {
                setSelectedOccasion("All");
                setMaxPrice(5000);
              }}
              className="px-5 py-2.5 rounded-full bg-[#C94F78] text-white text-xs font-semibold hover:bg-[#8E294D] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Related Categories */}
        {relatedCategories && relatedCategories.length > 0 && (
          <div className="py-12 border-t border-[#EEDCDA]">
            <h3 className="font-serif text-xl font-bold text-[#3B2A2A] mb-6">
              Explore Related Collections
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedCategories.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/${rc.slug}`}
                  className="p-4 rounded-xl bg-white border border-[#EEDCDA] hover:border-[#C94F78] hover:shadow-md transition-all text-center group"
                >
                  <span className="font-serif text-sm font-bold text-[#3B2A2A] group-hover:text-[#C94F78] transition-colors block">
                    {rc.name}
                  </span>
                  <span className="text-[10px] text-[#7A6868] uppercase tracking-wider mt-1 block">
                    Explore &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Lower SEO Content & FAQs */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EEDCDA] shadow-sm my-12 space-y-8">
          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#3B2A2A]">
              {bottomH2}
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6868] leading-relaxed">
              {bottomContent ||
                "Whether you are shopping for a birthday, anniversary, wedding, thank-you moment or a simple surprise, our collection offers a range of styles and price points. Explore the collection, compare your options and choose a gift that matches the occasion and the person you are celebrating."}
            </p>
          </div>

          {/* Category FAQs */}
          {faqs && faqs.length > 0 && (
            <div className="pt-6 border-t border-[#EEDCDA]">
              <h3 className="font-serif text-xl font-bold text-[#3B2A2A] mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={faq.question}
                      className="rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full px-5 py-3.5 text-left flex items-center justify-between font-serif text-sm font-semibold text-[#3B2A2A] hover:text-[#C94F78] focus:outline-none"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C94F78] transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-xs text-[#7A6868] leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
