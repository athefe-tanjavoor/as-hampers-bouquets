"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Breadcrumbs } from "@/lib/ui";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addItem } = useCart();

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: "Wishlist", href: "/wishlist" }]} />

        <div className="flex items-center justify-between pb-4 border-b border-[#EEDCDA]">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            My Wishlist ({wishlist.length})
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#EEDCDA] shadow-sm max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FCEEF2] text-[#C94F78] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#3B2A2A]">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-[#7A6868]">
              Save your favourite bouquets, flowers, and hampers here while browsing our collections.
            </p>
            <div className="pt-2">
              <Link
                href="/bouquets"
                className="px-6 py-3 rounded-full bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold shadow-md transition-colors inline-block"
              >
                Explore Bouquets &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EEDCDA] shadow-sm">
            <p className="text-xs text-[#7A6868] mb-4">
              You have {wishlist.length} item(s) saved in your wishlist.
            </p>
            <div className="flex justify-start">
              <Link
                href="/bouquets"
                className="px-6 py-2.5 rounded-full bg-[#8E294D] text-white text-xs font-semibold hover:bg-[#C94F78] transition-colors"
              >
                Continue Shopping Collections
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
