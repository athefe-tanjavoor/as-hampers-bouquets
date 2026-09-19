import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@repo/config";
import { api } from "../../lib/api";
import { CategoryListingTemplate } from "../../components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Gifts Under ₹599 | Affordable Bouquets & Gifts | ${BRAND_CONFIG.name}`,
  description: `Discover beautiful bouquets, hampers and thoughtful gifts under ₹599. Shop affordable gifting options online from ${BRAND_CONFIG.name}.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/under-599`
  }
};

export default async function Under599Page() {
  const products = await api.getProducts("?priceMax=599");

  const relatedCategories = [
    { name: "Gifts Under ₹999", slug: "under-999" },
    { name: "Bouquets", slug: "bouquets" },
    { name: "Flowers", slug: "flowers" }
  ];

  const faqs = [
    {
      question: "Are gifts under ₹599 eligible for home delivery?",
      answer: "Yes, all our budget gifting options are eligible for standard and express doorstep delivery."
    }
  ];

  return (
    <CategoryListingTemplate
      title="Beautiful Gifts Under ₹599"
      intro="Looking for a thoughtful gift without stretching your budget? Explore our collection of bouquets, hampers and gift ideas priced under ₹599."
      bottomH2="Popular Gifts in This Price Range"
      bottomContent="Find pocket-friendly sweet surprises that don't compromise on aesthetic charm or heartfelt emotion."
      breadcrumbs={[{ label: "Gifts Under ₹599", href: "/under-599" }]}
      products={products}
      relatedCategories={relatedCategories}
      faqs={faqs}
    />
  );
}
