import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@repo/types";
import { ProductCard } from "../product/ProductCard";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  products: Product[];
  bg?: "white" | "ivory";
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  ctaText = "View All",
  ctaUrl = "/bouquets",
  products,
  bg = "white"
}) => {
  if (!products || products.length === 0) return null;

  return (
    <section className={`py-16 ${bg === "white" ? "bg-white" : "bg-[#FFF9F5]"} border-b border-[#EEDCDA]/60`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-[#7A6868] mt-1.5 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
          {ctaUrl && (
            <Link
              href={ctaUrl}
              className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-[#C94F78] hover:text-[#8E294D] transition-colors group"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
