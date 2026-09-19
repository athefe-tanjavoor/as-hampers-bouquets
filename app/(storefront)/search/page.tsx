import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { api } from "@/lib/api";
import { Breadcrumbs } from "@/lib/ui";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Search Results",
  robots: {
    index: false,
    follow: true
  }
};

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const { products, suggestions } = query ? await api.search(query) : { products: [], suggestions: [] };

  const suggestedLinks = [
    { label: "Bouquets", href: "/bouquets" },
    { label: "Flowers", href: "/flowers" },
    { label: "Gift Hampers", href: "/hampers" },
    { label: "Birthday Gifts", href: "/birthday-gifts" },
    { label: "Anniversary Gifts", href: "/anniversary-gifts" },
    { label: "Personalized Gifts", href: "/personalized-gifts" }
  ];

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: "Search Results" }]} />

        {/* Search Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2A2A]">
            Search Results {query && `for "${query}"`}
          </h1>

          <form action="/search" method="GET" className="relative w-full">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search bouquets, flowers, hampers & gifts..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#EEDCDA] text-sm text-[#3B2A2A] shadow-sm focus:outline-none focus:border-[#C94F78]"
            />
            <Search className="w-5 h-5 text-[#7A6868] absolute left-4 top-4" />
          </form>
        </div>

        {/* Results or Empty State */}
        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EEDCDA] shadow-sm max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#3B2A2A]">
              We couldn&apos;t find an exact match
            </h2>
            <p className="text-xs text-[#7A6868]">
              Try searching with general floral or gift terms, or explore our most popular categories below.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-2">
              {suggestedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-full bg-[#FFF9F5] border border-[#EEDCDA] text-xs font-semibold text-[#8E294D] hover:bg-[#FCEEF2] hover:border-[#C94F78] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-xs text-[#7A6868] mb-6">
              Showing {products.length} results matching &quot;{query}&quot;
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
