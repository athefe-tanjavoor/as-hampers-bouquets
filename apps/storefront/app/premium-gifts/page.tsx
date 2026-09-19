import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@repo/config";
import { api } from "../../lib/api";
import { CategoryListingTemplate } from "../../components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Premium Gifts & Luxury Bouquets | ${BRAND_CONFIG.name}`,
  description: `Experience supreme floral artistry with grand garden roses, exotic lilies, and curated luxury confections.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/premium-gifts`
  }
};

export default async function PremiumGiftsPage() {
  const products = await api.getProducts("?priceMin=2000");

  return (
    <CategoryListingTemplate
      title="Grand & Luxury Floral Gifting"
      intro="Make a profound statement with grand bouquets, imported exotic blossoms, and handcrafted keepsake gift chests."
      bottomH2="Uncompromising Elegance"
      bottomContent="Curated for grand milestones, engagements, and VIP celebrations."
      breadcrumbs={[{ label: "Premium Gifts", href: "/premium-gifts" }]}
      products={products}
    />
  );
}
