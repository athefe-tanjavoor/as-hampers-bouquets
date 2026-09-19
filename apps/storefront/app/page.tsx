import React from "react";
import type { Metadata } from "next";
import { BRAND_CONFIG } from "@repo/config";
import { api } from "../lib/api";
import { HomeHero } from "../components/home/HomeHero";
import { CategoryRail } from "../components/home/CategoryRail";
import { OccasionGrid } from "../components/home/OccasionGrid";
import { ProductCarousel } from "../components/home/ProductCarousel";
import { PriceCollection } from "../components/home/PriceCollection";
import { PromoBanners } from "../components/home/PromoBanners";
import { TrustSection } from "../components/home/TrustSection";
import { VideoShopping } from "../components/home/VideoShopping";
import { ReviewSection } from "../components/home/ReviewSection";
import { BlogSection } from "../components/home/BlogSection";
import { SeoContent } from "../components/home/SeoContent";
import { NewsletterCta } from "../components/home/NewsletterCta";

export const metadata: Metadata = {
  title: `${BRAND_CONFIG.name} | Bouquets, Flowers & Gift Hampers Online`,
  description: `Shop beautiful bouquets, fresh flowers, handcrafted gift hampers and personalized gifts for birthdays, anniversaries, weddings and every special moment. Order online from ${BRAND_CONFIG.name}.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/`
  }
};

export default async function HomePage() {
  // Fetch initial products and blog posts
  const [bestsellers, blogPosts] = await Promise.all([
    api.getProducts("?bestseller=true"),
    api.getBlogPosts("?limit=3")
  ]);

  // Fallback demo items if API is booting
  const sampleProducts = bestsellers.length > 0 ? bestsellers : [
    {
      _id: "demo-1",
      name: "Blush Garden Rose Bouquet",
      slug: "blush-garden-rose-bouquet",
      sku: "BOUQ-ROSE-001",
      category: { _id: "c1", name: "Bouquets", slug: "bouquets" } as any,
      shortDescription: "A romantic hand-tied bouquet featuring 18 premium blush pink garden roses and eucalyptus.",
      description: "Blush Garden Rose Bouquet is a thoughtfully designed arrangement for special celebrations.",
      images: [
        { url: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80", altText: "Pink roses", isPrimary: true }
      ],
      price: 1499,
      salePrice: 1299,
      stock: 25,
      lowStockThreshold: 5,
      variants: [],
      occasion: ["Anniversary", "Birthday"],
      recipient: ["For Her"],
      status: "ACTIVE" as const,
      featured: true,
      bestseller: true,
      newArrival: false,
      ratingAverage: 4.9,
      reviewCount: 38,
      whatsIncluded: ["18 Pink Garden Roses", "Message Card"],
      whyTheyllLoveIt: ["Farm-fresh blooms"],
      seo: { title: "Blush Rose", description: "Blush Rose Bouquet" },
      faq: [],
      createdAt: "",
      updatedAt: ""
    },
    {
      _id: "demo-2",
      name: "Opulent Celebration Hamper",
      slug: "opulent-celebration-hamper",
      sku: "HAMP-OPUL-002",
      category: { _id: "c2", name: "Hampers", slug: "hampers" } as any,
      shortDescription: "Artisanal Belgian chocolates, soy wax rose candle, and gold keepsake tumbler.",
      description: "An indulgent luxury gift hamper packed in our signature reusable ivory hatbox.",
      images: [
        { url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80", altText: "Luxury gift hamper", isPrimary: true }
      ],
      price: 2499,
      salePrice: 2199,
      stock: 20,
      lowStockThreshold: 4,
      variants: [],
      occasion: ["Birthday", "Corporate"],
      recipient: ["Friends", "Clients"],
      status: "ACTIVE" as const,
      featured: true,
      bestseller: true,
      newArrival: true,
      ratingAverage: 5.0,
      reviewCount: 24,
      whatsIncluded: ["Belgian Chocolates", "Soy Candle", "Insulated Tumbler"],
      whyTheyllLoveIt: ["Complete unboxing experience"],
      seo: { title: "Opulent Hamper", description: "Opulent Hamper" },
      faq: [],
      createdAt: "",
      updatedAt: ""
    },
    {
      _id: "demo-3",
      name: "Vintage Lilies & Carnations Bunch",
      slug: "vintage-lilies-carnations-bunch",
      sku: "FLOW-LILY-003",
      category: { _id: "c3", name: "Flowers", slug: "flowers" } as any,
      shortDescription: "Fragrant oriental white lilies combined with pastel peach carnations in craft paper.",
      description: "An elegant flower arrangement made to bring calm and grandeur to any room.",
      images: [
        { url: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80", altText: "White lilies bunch", isPrimary: true }
      ],
      price: 999,
      salePrice: 899,
      stock: 30,
      lowStockThreshold: 5,
      variants: [],
      occasion: ["Thank You", "Housewarming"],
      recipient: ["Parents"],
      status: "ACTIVE" as const,
      featured: true,
      bestseller: false,
      newArrival: true,
      ratingAverage: 4.8,
      reviewCount: 19,
      whatsIncluded: ["3 Lilies Stems", "8 Carnations"],
      whyTheyllLoveIt: ["Intensely fragrant"],
      seo: { title: "Vintage Lilies", description: "Lilies" },
      faq: [],
      createdAt: "",
      updatedAt: ""
    },
    {
      _id: "demo-4",
      name: "Personalized Memory Keepsake Frame Hamper",
      slug: "personalized-memory-keepsake-frame-hamper",
      sku: "PERS-FRAM-004",
      category: { _id: "c4", name: "Personalized", slug: "personalized-gifts" } as any,
      shortDescription: "Custom framed photograph with personalized names, artisan chocolates and dried flowers.",
      description: "Turn your favourite shared memory into an everlasting decorative keepsake.",
      images: [
        { url: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80", altText: "Personalized frame gift", isPrimary: true }
      ],
      price: 1299,
      salePrice: 1149,
      stock: 25,
      lowStockThreshold: 5,
      variants: [],
      occasion: ["Anniversary", "Wedding"],
      recipient: ["For Partner"],
      status: "ACTIVE" as const,
      featured: true,
      bestseller: true,
      newArrival: false,
      ratingAverage: 4.9,
      reviewCount: 42,
      whatsIncluded: ["Framed Print", "Mini Bud Vase", "Chocolates"],
      whyTheyllLoveIt: ["Personal keepsake"],
      seo: { title: "Memory Frame", description: "Memory Frame" },
      faq: [],
      createdAt: "",
      updatedAt: ""
    }
  ];

  return (
    <>
      <HomeHero />
      <CategoryRail />
      <OccasionGrid />
      <ProductCarousel
        title="Our Most Loved Bouquets & Hampers"
        subtitle="Discover the gifts customers choose when they want to send flowers, warmth and a little extra happiness."
        ctaText="View All Bestsellers"
        ctaUrl="/bestsellers"
        products={sampleProducts}
      />
      <PriceCollection />
      <ProductCarousel
        title="Fresh Flowers, Beautifully Arranged"
        subtitle="From classic roses to elegant lilies and cheerful mixed arrangements, explore flowers designed to bring colour to every celebration."
        ctaText="Shop Fresh Flowers"
        ctaUrl="/flowers"
        products={sampleProducts.slice(1, 4)}
        bg="ivory"
      />
      <PromoBanners />
      <TrustSection />
      <VideoShopping />
      <ReviewSection />
      <BlogSection posts={blogPosts} />
      <SeoContent />
      <NewsletterCta />
    </>
  );
}
