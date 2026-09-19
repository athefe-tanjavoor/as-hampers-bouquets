import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@repo/config";
import { api } from "../../lib/api";
import { CategoryListingTemplate } from "../../components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Gift Hampers Online | Curated Gift Hampers | ${BRAND_CONFIG.name}`,
  description: `Shop thoughtful gift hampers combining flowers, chocolates, keepsakes and more. Find gifting options for birthdays, anniversaries, festive moments and celebrations.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/hampers`
  }
};

export default async function HampersPage() {
  const products = await api.getProducts();

  const relatedCategories = [
    { name: "Bouquets", slug: "bouquets" },
    { name: "Personalized Gifts", slug: "personalized-gifts" },
    { name: "Corporate Gifts", slug: "corporate-gifts" },
    { name: "Birthday Gifts", slug: "birthday-gifts" }
  ];

  const faqs = [
    {
      question: "What items are included inside the curated gift hampers?",
      answer: "Each gift hamper features gourmet confectionery, premium scented candles, personalized keepsakes and floral accents packed in our signature reusable boxes."
    },
    {
      question: "Can I customize the contents of a gift hamper?",
      answer: "For customized bulk or corporate hampers, please reach out via our Corporate Gifting page or contact support directly."
    }
  ];

  return (
    <CategoryListingTemplate
      title="Thoughtful Gift Hampers for Every Celebration"
      intro="Explore carefully curated hampers combining flowers, chocolates, keepsakes, self-care treats and personalized details. Choose a ready-to-gift surprise or create a combination that feels uniquely yours."
      bottomH2="Find the Right Gift Hamper for Every Moment"
      bottomContent="Explore our hampers collection, thoughtfully created for celebrations, meaningful surprises and everyday moments. Choose from a range of designs, price points and gifting styles, and find an option that feels personal to the occasion."
      breadcrumbs={[{ label: "Hampers", href: "/hampers" }]}
      products={products}
      relatedCategories={relatedCategories}
      faqs={faqs}
    />
  );
}
