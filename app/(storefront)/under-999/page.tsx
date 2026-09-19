import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/config";
import { api } from "@/lib/api";
import { CategoryListingTemplate } from "@/components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Gifts Under ₹999 | Affordable Bouquets & Gifts | ${BRAND_CONFIG.name}`,
  description: `Discover beautiful bouquets, hampers and thoughtful gifts under ₹999. Shop affordable gifting options online from ${BRAND_CONFIG.name}.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/under-999`
  }
};

export default async function Under999Page() {
  const products = await api.getProducts("?priceMax=999");

  const relatedCategories = [
    { name: "Gifts Under ₹599", slug: "under-599" },
    { name: "Gifts Under ₹1,499", slug: "under-1499" },
    { name: "Bouquets", slug: "bouquets" },
    { name: "Hampers", slug: "hampers" }
  ];

  return (
    <CategoryListingTemplate
      title="Beautiful Gifts Under ₹999"
      intro="Looking for a thoughtful gift without stretching your budget? Explore our collection of bouquets, hampers and gift ideas priced under ₹999."
      bottomH2="Popular Gifts in This Price Range"
      bottomContent="Find our most popular pocket-friendly gift bouquets and hampers under ₹999."
      breadcrumbs={[{ label: "Gifts Under ₹999", href: "/under-999" }]}
      products={products}
      relatedCategories={relatedCategories}
    />
  );
}
