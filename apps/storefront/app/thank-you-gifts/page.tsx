import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@repo/config";
import { api } from "../../lib/api";
import { CategoryListingTemplate } from "../../components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Thank You Gifts Online | Flowers & Thoughtful Hampers | ${BRAND_CONFIG.name}`,
  description: `Say thank you with flowers, bouquets, hampers and personalized gifts chosen to make gratitude feel special.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/thank-you-gifts`
  }
};

export default async function ThankYouGiftsPage() {
  const products = await api.getProducts();

  return (
    <CategoryListingTemplate
      title="A Little Thank You Goes a Long Way"
      intro={`Make thank you gifts more memorable with a thoughtful gift from ${BRAND_CONFIG.name}. Explore bouquets, flowers, hampers and personalized options selected for the occasion.`}
      bottomH2="Express Heartfelt Appreciation"
      bottomContent="Saying thank you is effortless with our curated collection of blooming flowers and delightful hampers."
      breadcrumbs={[{ label: "Thank You Gifts", href: "/thank-you-gifts" }]}
      products={products}
    />
  );
}
