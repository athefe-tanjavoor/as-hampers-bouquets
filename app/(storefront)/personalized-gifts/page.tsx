import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/config";
import { api } from "@/lib/api";
import { CategoryListingTemplate } from "@/components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Personalized Gifts Online | Custom Gifts | ${BRAND_CONFIG.name}`,
  description: `Make gifting more meaningful with personalized gifts featuring names, messages, photographs and special details.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/personalized-gifts`
  }
};

export default async function PersonalizedGiftsPage() {
  const products = await api.getProducts();

  const relatedCategories = [
    { name: "Bouquets", slug: "bouquets" },
    { name: "Gift Hampers", slug: "hampers" },
    { name: "Anniversary Gifts", slug: "anniversary-gifts" },
    { name: "Birthday Gifts", slug: "birthday-gifts" }
  ];

  const faqs = [
    {
      question: "How do I provide custom names or messages?",
      answer: "You can enter your custom text or details directly into the personalization field on the product page before adding it to your cart."
    },
    {
      question: "Does personalization add any delay to dispatch?",
      answer: "No, our personalization team engraves and prints orders same-day to ensure your delivery arrives within your selected slot."
    }
  ];

  return (
    <CategoryListingTemplate
      title="Gifts Made Personal"
      intro="Add a name, message, photograph or special detail and turn a beautiful gift into a meaningful keepsake they can treasure."
      bottomH2="Make It Truly One of a Kind"
      bottomContent="Explore our personalized gifts collection, thoughtfully created for celebrations, meaningful surprises and everyday moments. Choose from a range of designs, price points and gifting styles, and find an option that feels personal to the occasion."
      breadcrumbs={[{ label: "Personalized Gifts", href: "/personalized-gifts" }]}
      products={products}
      relatedCategories={relatedCategories}
      faqs={faqs}
    />
  );
}
