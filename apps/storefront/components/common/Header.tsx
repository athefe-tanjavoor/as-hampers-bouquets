"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Heart, ShoppingBag, User, Phone, Menu, X } from "lucide-react";
import { BRAND_CONFIG } from "@repo/config";
import { useCart } from "../../lib/cart-context";

interface HeaderProps {
  onOpenMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav }) => {
  const router = useRouter();
  const { cartCount, wishlist, openCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F5]/95 backdrop-blur-md border-b border-[#EEDCDA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={onOpenMobileNav}
              className="p-2 -ml-2 text-[#3B2A2A] hover:text-[#C94F78] focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 ml-1 text-[#3B2A2A] hover:text-[#C94F78]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-[#8E294D]">
                {BRAND_CONFIG.name}
              </span>
              <span className="block text-[10px] tracking-[0.2em] text-[#C94F78] uppercase font-sans -mt-1">
                Floral & Gifting Studio
              </span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bouquets, flowers, hampers & gifts..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#EEDCDA] text-sm text-[#3B2A2A] placeholder-[#7A6868] focus:outline-none focus:border-[#C94F78] focus:ring-1 focus:ring-[#C94F78] transition-all shadow-sm"
              />
              <Search className="w-4 h-4 text-[#7A6868] absolute left-3.5 top-3.5 pointer-events-none" />
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <a
              href={`tel:${BRAND_CONFIG.supportPhone.replace(/\s+/g, "")}`}
              className="hidden xl:flex items-center text-xs text-[#7A6868] hover:text-[#C94F78] transition-colors"
            >
              <Phone className="w-4 h-4 mr-1.5 text-[#C94F78]" />
              <div>
                <span className="block text-[10px] text-gray-400">Need Help?</span>
                <span className="font-semibold text-[#3B2A2A]">{BRAND_CONFIG.supportPhone}</span>
              </div>
            </a>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-[#3B2A2A] hover:text-[#C94F78] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-[#C94F78] rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#3B2A2A] hover:text-[#C94F78] transition-colors focus:outline-none"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-[#8E294D] rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account */}
            <Link
              href="/track-order"
              className="hidden sm:inline-flex items-center text-xs font-medium text-[#3B2A2A] hover:text-[#C94F78] transition-colors py-2 px-3 rounded-full border border-[#EEDCDA] bg-white shadow-sm"
            >
              <User className="w-3.5 h-3.5 mr-1.5 text-[#C94F78]" />
              Track Order
            </Link>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="py-3 px-1 lg:hidden border-t border-[#EEDCDA]">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bouquets, flowers, hampers & gifts..."
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white border border-[#EEDCDA] text-sm text-[#3B2A2A] focus:outline-none focus:border-[#C94F78]"
                autoFocus
              />
              <Search className="w-4 h-4 text-[#7A6868] absolute left-3.5 top-3.5 pointer-events-none" />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3.5 top-3 text-[#7A6868]"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};
