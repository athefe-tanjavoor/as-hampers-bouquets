import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/config";
import { api } from "@/lib/api";
import { CategoryListingTemplate } from "@/components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Our Most Loved Bouquets & Hampers | Bestsellers | ${BRAND_CONFIG.name}`,
  description: `Discover the gifts customers choose when they want to send flowers, warmth and a little extra happiness.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/bestsellers`
  }
};

export default async function BestsellersPage() {
  const products = await api.getProducts("?bestseller=true");

  return (
    <CategoryListingTemplate
      title="Our Most Loved Bouquets & Hampers"
      intro="Discover the gifts customers choose when they want to send flowers, warmth and a little extra happiness."
      bottomH2="Customer Favorites Across All Categories"
      bottomContent="Our bestsellers represent the pinnacle of floral artistry and gifting delight, backed by hundreds of glowing verified reviews."
      breadcrumbs={[{ label: "Bestsellers", href: "/bestsellers" }]}
      products={products}
    />
  );
}
