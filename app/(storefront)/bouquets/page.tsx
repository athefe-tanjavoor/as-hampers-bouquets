import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/config";
import { api } from "@/lib/api";
import { CategoryListingTemplate } from "@/components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Buy Bouquets Online | Beautiful Bouquets for Every Occasion | ${BRAND_CONFIG.name}`,
  description: `Shop beautiful bouquets online from ${BRAND_CONFIG.name}. Explore handcrafted, fresh flower and luxury bouquets for birthdays, anniversaries, celebrations and thoughtful surprises.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/bouquets`
  },
  openGraph: {
    title: `Buy Bouquets Online | ${BRAND_CONFIG.name}`,
    description: `Shop beautiful bouquets online from ${BRAND_CONFIG.name}. Explore handcrafted, fresh flower and luxury bouquets for birthdays, anniversaries, celebrations.`,
    url: `https://${BRAND_CONFIG.domain}/bouquets`
  }
};

export default async function BouquetsPage() {
  const products = await api.getProducts();

  const relatedCategories = [
    { name: "Fresh Flowers", slug: "flowers" },
    { name: "Gift Hampers", slug: "hampers" },
    { name: "Birthday Gifts", slug: "birthday-gifts" },
    { name: "Anniversary Gifts", slug: "anniversary-gifts" },
    { name: "Gifts Under ₹999", slug: "under-999" },
    { name: "Wedding Flowers", slug: "wedding-flowers" }
  ];

  const faqs = [
    {
      question: "Can I choose the bouquet wrapping paper and satin ribbon color?",
      answer: "Yes, our florists wrap each bouquet with imported Korean matte paper and matching luxury satin ribbons according to the selected arrangement styling."
    },
    {
      question: "How long do the bouquets remain fresh after delivery?",
      answer: "When placed in a clean vase with water and kept in a cool environment, our garden-fresh roses and blooms stay vibrant for 5 to 7 days."
    },
    {
      question: "Do you offer same-day bouquet delivery?",
      answer: "Yes! Enter your delivery pincode on the product page to view same-day express delivery slots available for your location."
    }
  ];

  return (
    <CategoryListingTemplate
      title="Beautiful Bouquets for Every Moment"
      intro="Explore our bouquets collection, thoughtfully created for celebrations, meaningful surprises and everyday moments. Choose from a range of designs, price points and gifting styles, and find an option that feels personal to the occasion."
      bottomH2="Find the Right Bouquets for Every Occasion"
      bottomContent="Whether you are shopping for a birthday, anniversary, wedding, thank-you moment or a simple surprise, our bouquet collection offers a range of styles and price points. Explore the collection, compare your options and choose a gift that matches the occasion and the person you are celebrating."
      breadcrumbs={[{ label: "Bouquets", href: "/bouquets" }]}
      products={products}
      relatedCategories={relatedCategories}
      faqs={faqs}
    />
  );
}
