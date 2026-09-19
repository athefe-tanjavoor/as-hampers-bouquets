import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/config";

export default function NotFound() {
  return (
    <div className="bg-[#FFF9F5] min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-[#EEDCDA] shadow-md">
        <span className="font-serif text-6xl font-bold text-[#C94F78]">404</span>
        <h1 className="font-serif text-2xl font-bold text-[#3B2A2A]">
          Page Not Found
        </h1>
        <p className="text-xs text-[#7A6868] leading-relaxed">
          The page you are looking for may have moved, expired, or blossomed in a different corner of our garden.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold shadow-md transition-colors"
          >
            Back to Homepage
          </Link>
          <Link
            href="/bouquets"
            className="px-6 py-3 rounded-full border border-[#EEDCDA] bg-[#FFF9F5] text-[#3B2A2A] text-xs font-semibold hover:bg-[#FCEEF2] transition-colors"
          >
            Explore Bouquets
          </Link>
        </div>
      </div>
    </div>
  );
}
