import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRAND_CONFIG } from "@repo/config";
import { api } from "../../../lib/api";
import { ProductDetailsClient } from "./product-details-client";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await api.getProductBySlug(params.slug);
  if (!data || !data.product) {
    return { title: "Product" };
  }
  const { product } = data;

  const title = product.seo?.title || `${product.name} | Buy Online | ${BRAND_CONFIG.name}`;
  const description =
    product.seo?.description ||
    `Shop ${product.name} from ${BRAND_CONFIG.name}. View price, details, available variants, personalization options and delivery information.`;

  return {
    title,
    description,
    alternates: {
      canonical: product.seo?.canonical || `https://${BRAND_CONFIG.domain}/products/${product.slug}`
    },
    openGraph: {
      title,
      description,
      url: `https://${BRAND_CONFIG.domain}/products/${product.slug}`,
      images: product.images?.[0]
        ? [{ url: product.images[0].url, alt: product.images[0].altText }]
        : []
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const data = await api.getProductBySlug(params.slug);
  if (!data || !data.product) {
    notFound();
  }

  const { product, reviews, relatedProducts } = data;

  const currentPrice = product.salePrice && product.salePrice < product.price ? product.salePrice : product.price;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images?.map((i) => i.url) || [],
    "description": product.shortDescription,
    "sku": product.sku,
    "offers": {
      "@type": "Offer",
      "url": `https://${BRAND_CONFIG.domain}/products/${product.slug}`,
      "priceCurrency": BRAND_CONFIG.currencyCode,
      "price": currentPrice,
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": product.reviewCount > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": product.ratingAverage || 5.0,
      "reviewCount": product.reviewCount
    } : undefined
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetailsClient
          product={product}
          reviews={reviews || []}
          relatedProducts={relatedProducts || []}
        />
      </div>
    </div>
  );
}
