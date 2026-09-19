import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/config";
import { api } from "@/lib/api";
import { CategoryListingTemplate } from "@/components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Birthday Gifts Online | Bouquets, Hampers & Personalized Gifts | ${BRAND_CONFIG.name}`,
  description: `Find thoughtful birthday gifts including bouquets, hampers, flowers and personalized keepsakes for someone special.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/birthday-gifts`
  }
};

export default async function BirthdayGiftsPage() {
  const products = await api.getProducts("?occasion=Birthday");

  const relatedCategories = [
    { name: "Bouquets", slug: "bouquets" },
    { name: "Gift Hampers", slug: "hampers" },
    { name: "Personalized Gifts", slug: "personalized-gifts" },
    { name: "Gifts Under ₹999", slug: "under-999" }
  ];

  return (
    <CategoryListingTemplate
      title="Birthday Gifts Made to Make Them Smile"
      intro={`Make birthday gifts more memorable with a thoughtful gift from ${BRAND_CONFIG.name}. Explore bouquets, flowers, hampers and personalized options selected for the occasion.`}
      bottomH2="Find the Perfect Birthday Surprise"
      bottomContent="Explore our birthday gifts collection, thoughtfully created for celebrations, meaningful surprises and everyday moments. Choose from a range of designs, price points and gifting styles, and find an option that feels personal to the occasion."
      breadcrumbs={[{ label: "Birthday Gifts", href: "/birthday-gifts" }]}
      products={products}
      relatedCategories={relatedCategories}
    />
  );
}
