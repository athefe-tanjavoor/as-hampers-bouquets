import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@repo/config";
import { api } from "../../lib/api";
import { CategoryListingTemplate } from "../../components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Anniversary Gifts Online | Flowers & Romantic Gifts | ${BRAND_CONFIG.name}`,
  description: `Celebrate your relationship with beautiful flowers, bouquets, hampers and personalized anniversary gifts.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/anniversary-gifts`
  }
};

export default async function AnniversaryGiftsPage() {
  const products = await api.getProducts("?occasion=Anniversary");

  const relatedCategories = [
    { name: "Bouquets", slug: "bouquets" },
    { name: "Gift Hampers", slug: "hampers" },
    { name: "Personalized Gifts", slug: "personalized-gifts" }
  ];

  return (
    <CategoryListingTemplate
      title="Anniversary Gifts for Meaningful Moments"
      intro={`Make anniversary gifts more memorable with a thoughtful gift from ${BRAND_CONFIG.name}. Explore bouquets, flowers, hampers and personalized options selected for the occasion.`}
      bottomH2="Celebrate Every Chapter of Your Love Story"
      bottomContent="Explore our anniversary gifts collection, thoughtfully created for celebrations, meaningful surprises and everyday moments. Choose from a range of designs, price points and gifting styles, and find an option that feels personal to the occasion."
      breadcrumbs={[{ label: "Anniversary Gifts", href: "/anniversary-gifts" }]}
      products={products}
      relatedCategories={relatedCategories}
    />
  );
}
