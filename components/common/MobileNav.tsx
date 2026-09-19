"use client";

import React from "react";
import Link from "next/link";
import { X, Home, Grid, Heart, ShoppingBag, Truck, Phone, Gift } from "lucide-react";
import { BRAND_CONFIG, SITE_NAVIGATION } from "@/lib/config";
import { useCart } from "@/lib/cart-context";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { cartCount, wishlist, openCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FFF9F5] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#EEDCDA]">
            <div>
              <span className="font-serif text-xl font-bold text-[#8E294D]">
                {BRAND_CONFIG.name}
              </span>
              <span className="block text-[9px] tracking-widest text-[#C94F78] uppercase">
                Gifting Studio
              </span>
            </div>
            <button onClick={onClose} className="p-2 text-[#7A6868] hover:text-[#3B2A2A]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="py-6 space-y-3">
            {SITE_NAVIGATION.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block text-base font-medium text-[#3B2A2A] hover:text-[#C94F78] py-1.5 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-[#EEDCDA] space-y-2">
              <Link
                href="/under-999"
                onClick={onClose}
                className="block text-sm font-semibold text-[#C94F78]"
              >
                ✨ Gifts Under ₹999
              </Link>
              <Link
                href="/under-1499"
                onClick={onClose}
                className="block text-sm font-semibold text-[#8E294D]"
              >
                🎀 Gifts Under ₹1,499
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-[#EEDCDA] space-y-3 text-xs text-[#7A6868]">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#C94F78]" />
            <span>{BRAND_CONFIG.supportPhone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#C94F78]" />
            <span>{BRAND_CONFIG.deliveryPromise}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MobileBottomNav: React.FC = () => {
  const { cartCount, wishlist, openCart } = useCart();

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#EEDCDA] py-2 px-4 flex items-center justify-around z-40 lg:hidden shadow-lg">
      <Link href="/" className="flex flex-col items-center text-[10px] text-[#3B2A2A] hover:text-[#C94F78]">
        <Home className="w-5 h-5" />
        <span className="mt-1">Home</span>
      </Link>
      <Link href="/bouquets" className="flex flex-col items-center text-[10px] text-[#3B2A2A] hover:text-[#C94F78]">
        <Grid className="w-5 h-5" />
        <span className="mt-1">Shop</span>
      </Link>
      <Link href="/wishlist" className="relative flex flex-col items-center text-[10px] text-[#3B2A2A] hover:text-[#C94F78]">
        <Heart className="w-5 h-5" />
        <span className="mt-1">Wishlist</span>
        {wishlist.length > 0 && (
          <span className="absolute -top-1 right-1 px-1 bg-[#C94F78] text-white text-[8px] font-bold rounded-full">
            {wishlist.length}
          </span>
        )}
      </Link>
      <button onClick={openCart} className="relative flex flex-col items-center text-[10px] text-[#3B2A2A] hover:text-[#C94F78] focus:outline-none">
        <ShoppingBag className="w-5 h-5" />
        <span className="mt-1">Cart</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 right-0 px-1 bg-[#8E294D] text-white text-[8px] font-bold rounded-full">
            {cartCount}
          </span>
        )}
      </button>
      <Link href="/track-order" className="flex flex-col items-center text-[10px] text-[#3B2A2A] hover:text-[#C94F78]">
        <Truck className="w-5 h-5" />
        <span className="mt-1">Track</span>
      </Link>
    </div>
  );
};
