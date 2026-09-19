import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRAND_CONFIG } from "@/lib/config";
import { api } from "@/lib/api";
import { CategoryListingTemplate } from "@/components/category/CategoryListingTemplate";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await api.getCategoryBySlug(params.slug);
  if (!data || !data.category) {
    return { title: "Category" };
  }
  const { category } = data;

  return {
    title: category.seo?.title || `${category.name} Online | ${BRAND_CONFIG.name}`,
    description: category.seo?.description || `Shop ${category.name} from ${BRAND_CONFIG.name}.`,
    alternates: {
      canonical: category.seo?.canonical || `https://${BRAND_CONFIG.domain}/category/${category.slug}`
    }
  };
}

export default async function DynamicCategoryPage({ params }: Props) {
  const data = await api.getCategoryBySlug(params.slug);
  if (!data || !data.category) {
    notFound();
  }

  const { category, products, relatedCategories } = data;

  return (
    <CategoryListingTemplate
      title={category.h1 || category.name}
      intro={category.intro || `Explore our collection of ${category.name}.`}
      bottomH2={`Find the Right ${category.name} for Every Occasion`}
      bottomContent={category.content}
      breadcrumbs={[{ label: category.name, href: `/category/${category.slug}` }]}
      products={products}
      relatedCategories={relatedCategories}
      faqs={category.faq}
    />
  );
}
