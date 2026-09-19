import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/config";
import { api } from "@/lib/api";
import { CategoryListingTemplate } from "@/components/category/CategoryListingTemplate";

export const metadata: Metadata = {
  title: `Gifts Under ₹2,499 | Affordable Bouquets & Gifts | ${BRAND_CONFIG.name}`,
  description: `Discover beautiful bouquets, hampers and thoughtful gifts under ₹2,499. Shop affordable gifting options online from ${BRAND_CONFIG.name}.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/under-2499`
  }
};

export default async function Under2499Page() {
  const products = await api.getProducts("?priceMax=2499");

  return (
    <CategoryListingTemplate
      title="Beautiful Gifts Under ₹2,499"
      intro="Looking for a thoughtful gift without stretching your budget? Explore our collection of bouquets, hampers and gift ideas priced under ₹2,499."
      bottomH2="Popular Gifts in This Price Range"
      bottomContent="Discover grand floral bunches, complete relaxation gift boxes, and anniversary hampers under ₹2,499."
      breadcrumbs={[{ label: "Gifts Under ₹2,499", href: "/under-2499" }]}
      products={products}
    />
  );
}
