import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/config";
import { api } from "@/lib/api";
import { CategoryListingTemplate } from "@/components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Housewarming Gifts Online | Flowers & Hampers | ${BRAND_CONFIG.name}`,
  description: `Celebrate a new home with flowers, hampers, keepsakes and thoughtful housewarming gifts.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/housewarming-gifts`
  }
};

export default async function HousewarmingGiftsPage() {
  const products = await api.getProducts();

  return (
    <CategoryListingTemplate
      title="Warm Wishes for a Beautiful New Home"
      intro={`Make housewarming gifts more memorable with a thoughtful gift from ${BRAND_CONFIG.name}. Explore bouquets, flowers, hampers and personalized options selected for the occasion.`}
      bottomH2="Warmth and Joy for New Beginnings"
      bottomContent="Celebrate a new home and space with aromatic floral arrangements and curated gourmet treat baskets."
      breadcrumbs={[{ label: "Housewarming Gifts", href: "/housewarming-gifts" }]}
      products={products}
    />
  );
}
