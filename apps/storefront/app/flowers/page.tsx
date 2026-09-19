import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@repo/config";
import { api } from "../../lib/api";
import { CategoryListingTemplate } from "../../components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Fresh Flowers Online | Flower Delivery | ${BRAND_CONFIG.name}`,
  description: `Explore fresh flower arrangements from ${BRAND_CONFIG.name} for birthdays, anniversaries, celebrations and everyday surprises. Check available delivery options online.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/flowers`
  }
};

export default async function FlowersPage() {
  const products = await api.getProducts();

  const relatedCategories = [
    { name: "Bouquets", slug: "bouquets" },
    { name: "Gift Hampers", slug: "hampers" },
    { name: "Wedding Flowers", slug: "wedding-flowers" },
    { name: "Gifts Under ₹1,499", slug: "under-1499" }
  ];

  const faqs = [
    {
      question: "Are your flowers cut fresh each morning?",
      answer: "Yes, our floral team sources fresh blossoms every morning directly from greenhouse growers to ensure peak bloom life."
    },
    {
      question: "Can flowers be delivered with a custom message?",
      answer: "Every arrangement includes a complimentary printed greeting card where you can include your personalized message during checkout."
    }
  ];

  return (
    <CategoryListingTemplate
      title="Fresh Flowers, Beautifully Arranged"
      intro="From classic roses to elegant lilies and cheerful mixed arrangements, explore flowers designed to bring colour and emotion to every celebration."
      bottomH2="Find the Right Flowers for Every Celebration"
      bottomContent="Explore our flowers collection, thoughtfully created for celebrations, meaningful surprises and everyday moments. Choose from a range of designs, price points and gifting styles, and find an option that feels personal to the occasion."
      breadcrumbs={[{ label: "Flowers", href: "/flowers" }]}
      products={products}
      relatedCategories={relatedCategories}
      faqs={faqs}
    />
  );
}
