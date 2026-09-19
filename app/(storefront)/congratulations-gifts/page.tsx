import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/config";
import { api } from "@/lib/api";
import { CategoryListingTemplate } from "@/components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Congratulations Gifts Online | Bouquets & Hampers | ${BRAND_CONFIG.name}`,
  description: `Celebrate achievements, new beginnings and happy milestones with beautiful bouquets and thoughtful gifts.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/congratulations-gifts`
  }
};

export default async function CongratulationsGiftsPage() {
  const products = await api.getProducts();

  return (
    <CategoryListingTemplate
      title="Celebrate Their Big Moment"
      intro={`Make congratulations gifts more memorable with a thoughtful gift from ${BRAND_CONFIG.name}. Explore bouquets, flowers, hampers and personalized options selected for the occasion.`}
      bottomH2="Mark Important Milestones"
      bottomContent="Explore our congratulations collection, thoughtfully created for celebrations, promotions, achievements and everyday moments."
      breadcrumbs={[{ label: "Congratulations Gifts", href: "/congratulations-gifts" }]}
      products={products}
    />
  );
}
